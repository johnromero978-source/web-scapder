# Scapder contact Worker

Cloudflare Worker endpoint for the static GitHub Pages contact form. It validates submissions and sends email through the Resend REST API. No frontend recipient or provider credential is required.

## Contract

- `POST` with `application/json`: UUID `submissionId`, `name`, `email`, optional `phone`, `message`, `consent: true`, empty `website`, numeric `formStartedAt`, and `language` (`es`, `en`, or `pt`).
- `OPTIONS` supports browser CORS preflight.
- Success: `200 { "ok": true, "status": "sent" }`.
- Errors use `{ "ok": false, "error": { "code": "...", "message": "..." } }` without Resend diagnostics.
- Requests are limited to 16 KiB. The honeypot must be empty and the form must be open for at least three seconds.

Cloudflare's server-side Rate Limiting binding enforces five requests per minute per client IP before Resend delivery. The other controls are defense in depth; exact-origin CORS alone is not abuse protection.

## Server configuration

| Name | Storage | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Wrangler secret | Resend bearer credential. |
| `CONTACT_RECIPIENTS` | Wrangler secret | Comma-separated recipient list. |
| `CONTACT_FROM_EMAIL` | Worker variable | Verified Resend sender, for example `contact@send.scapder.com`. |
| `ALLOWED_ORIGINS` | Worker variable | Comma-separated exact browser origins; no paths or wildcards. |

Keep real values out of `.dev.vars` in version control. The included file is only a shape example.

## Manual setup

Do not run the Wrangler secret or deployment commands until deployment is explicitly approved. Current Wrangler behavior may deploy a Worker version when `wrangler secret put` is used.

1. Review `wrangler.toml` origins against the actual GitHub Pages production origin.
2. From `contact-worker`, run `npx wrangler secret put RESEND_API_KEY` and enter the key only at the prompt.
3. Run `npx wrangler secret put CONTACT_RECIPIENTS` and enter the initial recipient list only at the prompt.
4. Run `npx wrangler deploy` only when deployment is approved.
5. Put the resulting `https://...workers.dev` URL in the root `index.html` meta element named `scapder-contact-endpoint`.
6. Run `$env:SCAPDER_REQUIRE_CONTACT_ENDPOINT="1"; node tools/verify-landing.mjs` from the repository root. An empty endpoint is a deployment-time blocker once activation is intended.
7. Verify a real submission, recipient delivery, reply-to behavior, and allowed/rejected origins.

No custom Worker domain or DNS change is needed for the initial `workers.dev` architecture.

## Local tests

```sh
node --test test/worker.test.mjs
```

Tests mock Resend and make no external request.
