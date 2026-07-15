const RESEND_URL = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 16 * 1024;
const MIN_FORM_AGE_MS = 3000;
const RESEND_TIMEOUT_MS = 10000;

const ERROR_MESSAGES = {
	bad_request: "The request could not be processed.",
	config_error: "The contact service is not configured.",
	cors_rejected: "This origin is not allowed.",
	delivery_unavailable: "The message could not be delivered.",
	invalid_submission: "The submitted form is invalid.",
	method_not_allowed: "This method is not supported.",
	payload_too_large: "The request body is too large.",
	rate_limited: "Too many contact requests. Please try again later.",
	unsupported_media_type: "Content-Type must be application/json.",
};

function jsonResponse(status, body, corsHeaders = {}) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
			...corsHeaders,
		},
	});
}

function errorResponse(status, code, corsHeaders = {}) {
	return jsonResponse(
		status,
		{ ok: false, error: { code, message: ERROR_MESSAGES[code] } },
		corsHeaders,
	);
}

function parseAllowedOrigins(value) {
	return String(value || "")
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
}

function corsHeadersFor(request, env) {
	const origin = request.headers.get("Origin");
	if (!origin) return { allowed: false, headers: { Vary: "Origin" } };

	const allowed = parseAllowedOrigins(env.ALLOWED_ORIGINS).includes(origin);
	return {
		allowed,
		headers: allowed
			? {
					"Access-Control-Allow-Origin": origin,
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Methods": "POST, OPTIONS",
					"Access-Control-Max-Age": "86400",
					Vary: "Origin",
				}
			: { Vary: "Origin" },
	};
}

function isEmail(value) {
	return (
		typeof value === "string" &&
		value.length <= 254 &&
		!/[\r\n]/.test(value) &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
	);
}

function isSender(value) {
	if (isEmail(value)) return true;
	const match = /^([^<>\r\n]{1,80}) <([^<>]+)>$/.exec(value);
	return Boolean(match && isEmail(match[2]));
}

function getConfig(env) {
	const recipients = String(env.CONTACT_RECIPIENTS || "")
		.split(",")
		.map((recipient) => recipient.trim())
		.filter(Boolean);
	const from = String(env.CONTACT_FROM_EMAIL || "").trim();
	const origins = parseAllowedOrigins(env.ALLOWED_ORIGINS);

	if (
		!env.RESEND_API_KEY ||
		recipients.length === 0 ||
		recipients.length > 20 ||
		!recipients.every(isEmail) ||
		!isSender(from) ||
		origins.length === 0 ||
		typeof env.CONTACT_RATE_LIMITER?.limit !== "function"
	) {
		return null;
	}

	return { recipients, from };
}

function normalizedString(value, maxLength, required = true) {
	if (typeof value !== "string") return null;
	const normalized = value.trim();
	if ((required && !normalized) || normalized.length > maxLength) return null;
	return normalized;
}

function validateSubmission(value, now) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;

	const name = normalizedString(value.name, 120);
	const email = normalizedString(value.email, 254);
	const phone = normalizedString(value.phone, 40, false);
	const message = normalizedString(value.message, 5000);
	const website = normalizedString(value.website, 200, false);
	const language = normalizedString(value.language, 5, false) || "es";
	const submissionId = normalizedString(value.submissionId, 36);
	const formStartedAt = value.formStartedAt;

	if (
		!name ||
		!email ||
		phone === null ||
		!message ||
		website === null ||
		website !== "" ||
		!submissionId ||
		!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId) ||
		value.consent !== true ||
		!isEmail(email) ||
		/[\u0000-\u001f\u007f]/.test(name) ||
		/[\u0000-\u001f\u007f]/.test(phone) ||
		!Number.isFinite(formStartedAt) ||
		now - formStartedAt < MIN_FORM_AGE_MS ||
		!['es', 'en', 'pt'].includes(language)
	) {
		return null;
	}

	return { name, email, phone, message, language, submissionId };
}

function escapeHtml(value) {
	return value.replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	})[character]);
}

function emailContent(submission) {
	const phone = submission.phone || "Not provided";
	const text = [
		"New scapder contact request",
		`Name: ${submission.name}`,
		`Email: ${submission.email}`,
		`Phone: ${phone}`,
		`Language: ${submission.language}`,
		"",
		submission.message,
	].join("\n");
	const html = `<h1>New scapder contact request</h1>
<p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
<p><strong>Language:</strong> ${escapeHtml(submission.language)}</p>
<p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`;

	return { text, html };
}

async function readJson(request) {
	const contentLength = Number(request.headers.get("Content-Length") || 0);
	if (contentLength > MAX_BODY_BYTES) return { error: "payload_too_large" };

	const text = await request.text();
	if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
		return { error: "payload_too_large" };
	}

	try {
		return { value: JSON.parse(text) };
	} catch {
		return { error: "bad_request" };
	}
}

export function createContactHandler({ fetchImpl = fetch, now = Date.now } = {}) {
	return async function handleContactRequest(request, env) {
		const cors = corsHeadersFor(request, env);
		if (!cors.allowed) return errorResponse(403, "cors_rejected", cors.headers);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: cors.headers });
		}
		if (request.method !== "POST") {
			return errorResponse(405, "method_not_allowed", cors.headers);
		}
		if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
			return errorResponse(415, "unsupported_media_type", cors.headers);
		}

		const config = getConfig(env);
		if (!config) return errorResponse(500, "config_error", cors.headers);

		let parsed;
		try {
			parsed = await readJson(request);
		} catch {
			return errorResponse(400, "bad_request", cors.headers);
		}
		if (parsed.error) {
			const status = parsed.error === "payload_too_large" ? 413 : 400;
			return errorResponse(status, parsed.error, cors.headers);
		}

		const submission = validateSubmission(parsed.value, now());
		if (!submission) return errorResponse(400, "invalid_submission", cors.headers);

		const clientIp = request.headers.get("CF-Connecting-IP");
		if (!clientIp) return errorResponse(400, "bad_request", cors.headers);
		try {
			const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: clientIp });
			if (!success) return errorResponse(429, "rate_limited", cors.headers);
		} catch {
			return errorResponse(500, "config_error", cors.headers);
		}

		const content = emailContent(submission);
		let providerResponse;
		try {
			providerResponse = await fetchImpl(RESEND_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
					"Idempotency-Key": submission.submissionId,
				},
				signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
				body: JSON.stringify({
					from: config.from,
					to: config.recipients,
					reply_to: submission.email,
					subject: `Website contact: ${submission.name}`,
					text: content.text,
					html: content.html,
				}),
			});
		} catch {
			return errorResponse(502, "delivery_unavailable", cors.headers);
		}

		if (!providerResponse.ok) {
			return errorResponse(502, "delivery_unavailable", cors.headers);
		}

		return jsonResponse(200, { ok: true, status: "sent" }, cors.headers);
	};
}

const handleContactRequest = createContactHandler();

export default {
	fetch(request, env) {
		return handleContactRequest(request, env);
	},
};
