# Contact form integration

Goal: make the contact form truly functional without pretending GitHub Pages has a backend.

## Implemented local architecture

- GitHub Pages remains the static landing host.
- The form submits JSON to a configurable Cloudflare `workers.dev` endpoint.
- The Worker validates requests and calls the Resend REST API.
- Recipients, sender configuration, and credentials stay server-side.

## Configuration boundary

| Area | Decision |
| --- | --- |
| Public landing | Worker endpoint URL only. |
| Worker variables | Exact allowed origins and verified sender. |
| Worker secrets | Resend API key and comma-separated recipients. |

## Privacy and abuse baseline

- Explicit consent is required before submission.
- The concise notice is provisional and identifies `haroldsthid@scapder.com` for privacy inquiries in the Colombia/Law 1581 of 2012 context. It does not claim complete compliance while responsible-party identity and phone details remain unavailable.
- Cloudflare's server-side Rate Limiting binding limits requests per client IP before delivery.
- Honeypot, minimum submission age, strict validation, body limits, and exact-origin CORS are defense in depth; CORS alone is not abuse protection.

## Remaining manual steps

1. Configure Worker variables and secrets.
2. Deploy the Worker when explicitly approved.
3. Add the resulting public endpoint to the landing meta configuration.
4. Run the activation verifier documented in `contact-worker/README.md`; an empty endpoint is a deployment-time blocker, not a placeholder for an invented URL.
5. Perform a real end-to-end delivery check and monitor abuse.
