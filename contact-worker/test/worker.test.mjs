import assert from "node:assert/strict";
import test from "node:test";

import { createContactHandler } from "../src/worker.mjs";

const NOW = 1_800_000_000_000;
const ORIGIN = "https://scapder.com";
const env = {
	ALLOWED_ORIGINS: ORIGIN,
	CONTACT_FROM_EMAIL: "contact@send.scapder.com",
	CONTACT_RECIPIENTS: "first@example.com, second@example.com",
	RESEND_API_KEY: "test-key",
	CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};

function submission(overrides = {}) {
	return {
		name: "Ada Lovelace",
		email: "ada@example.com",
		phone: "+57 300 000 0000",
		message: "Please contact me about a data project.",
		website: "",
		consent: true,
		formStartedAt: NOW - 5000,
		language: "en",
		submissionId: "4f3f2f60-78c2-4a1f-8bb9-77cc4e709d6e",
		...overrides,
	};
}

function request(body = submission(), origin = ORIGIN) {
	const headers = { "Content-Type": "application/json", "CF-Connecting-IP": "203.0.113.10" };
	if (origin) headers.Origin = origin;
	return new Request("https://contact.example.workers.dev", {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});
}

async function responseBody(response) {
	return JSON.parse(await response.text());
}

test("sends a normalized message through Resend", async () => {
	let providerRequest;
	const handler = createContactHandler({
		now: () => NOW,
		fetchImpl: async (url, options) => {
			providerRequest = { url, options };
			return new Response(JSON.stringify({ id: "provider-id" }), { status: 200 });
		},
	});

	const response = await handler(request(), env);
	const providerBody = JSON.parse(providerRequest.options.body);

	assert.equal(response.status, 200);
	assert.deepEqual(await responseBody(response), { ok: true, status: "sent" });
	assert.equal(providerRequest.url, "https://api.resend.com/emails");
	assert.deepEqual(providerBody.to, ["first@example.com", "second@example.com"]);
	assert.equal(providerBody.reply_to, "ada@example.com");
	assert.match(providerRequest.options.headers.Authorization, /^Bearer /);
	assert.equal(providerRequest.options.headers["Idempotency-Key"], submission().submissionId);
	assert.ok(providerRequest.options.signal instanceof AbortSignal);
});

test("rejects invalid fields and missing consent", async () => {
	const handler = createContactHandler({ now: () => NOW });
	const response = await handler(request(submission({ consent: false })), env);

	assert.equal(response.status, 400);
	assert.equal((await responseBody(response)).error.code, "invalid_submission");
});

test("rejects an invalid submission ID", async () => {
	const response = await createContactHandler({ now: () => NOW })(
		request(submission({ submissionId: "not-a-uuid" })), env,
	);

	assert.equal(response.status, 400);
	assert.equal((await responseBody(response)).error.code, "invalid_submission");
});

test("rejects requests from unconfigured origins", async () => {
	const handler = createContactHandler({ now: () => NOW });
	const response = await handler(request(submission(), "https://attacker.example"), env);

	assert.equal(response.status, 403);
	assert.equal((await responseBody(response)).error.code, "cors_rejected");
	assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
});

test("rejects POST requests without Origin", async () => {
	const response = await createContactHandler({ now: () => NOW })(request(submission(), null), env);

	assert.equal(response.status, 403);
	assert.equal((await responseBody(response)).error.code, "cors_rejected");
});

test("rate limits by Cloudflare client IP before delivery", async () => {
	let rateLimitKey;
	const limitedEnv = {
		...env,
		CONTACT_RATE_LIMITER: { limit: async ({ key }) => (rateLimitKey = key, { success: false }) },
	};
	const response = await createContactHandler({ now: () => NOW })(request(), limitedEnv);

	assert.equal(response.status, 429);
	assert.equal((await responseBody(response)).error.code, "rate_limited");
	assert.equal(rateLimitKey, "203.0.113.10");
});

test("rejects a completed honeypot", async () => {
	const handler = createContactHandler({ now: () => NOW });
	const response = await handler(request(submission({ website: "spam.example" })), env);

	assert.equal(response.status, 400);
	assert.equal((await responseBody(response)).error.code, "invalid_submission");
});

test("rejects submissions completed too quickly", async () => {
	const handler = createContactHandler({ now: () => NOW });
	const response = await handler(request(submission({ formStartedAt: NOW - 1000 })), env);

	assert.equal(response.status, 400);
	assert.equal((await responseBody(response)).error.code, "invalid_submission");
});

test("maps missing server configuration to a stable error", async () => {
	const handler = createContactHandler({ now: () => NOW });
	const response = await handler(request(), { ...env, RESEND_API_KEY: "" });

	assert.equal(response.status, 500);
	assert.equal((await responseBody(response)).error.code, "config_error");
});

test("fails closed when the rate limiting binding is missing", async () => {
	const { CONTACT_RATE_LIMITER, ...missingBindingEnv } = env;
	const response = await createContactHandler({ now: () => NOW })(request(), missingBindingEnv);

	assert.equal(response.status, 500);
	assert.equal((await responseBody(response)).error.code, "config_error");
});

test("maps Resend failures without exposing provider details", async () => {
	const handler = createContactHandler({
		now: () => NOW,
		fetchImpl: async () => new Response("provider diagnostics", { status: 422 }),
	});
	const response = await handler(request(), env);
	const body = await responseBody(response);

	assert.equal(response.status, 502);
	assert.equal(body.error.code, "delivery_unavailable");
	assert.doesNotMatch(JSON.stringify(body), /provider diagnostics/);
});

test("maps a Resend timeout to the stable provider failure", async () => {
	const handler = createContactHandler({
		now: () => NOW,
		fetchImpl: async () => { throw new DOMException("Timed out", "TimeoutError"); },
	});
	const response = await handler(request(), env);

	assert.equal(response.status, 502);
	assert.equal((await responseBody(response)).error.code, "delivery_unavailable");
});
