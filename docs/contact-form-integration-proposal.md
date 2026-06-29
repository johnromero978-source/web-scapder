# Contact form integration proposal

Goal: make the contact form truly functional without pretending GitHub Pages has a backend.

## Current state

- The form is static.
- Visitor actions open email or WhatsApp from the visitor device.
- This is useful for a lightweight landing page, but it is not real server-side delivery.

## Recommendation

| Area | Decision |
| --- | --- |
| Email | Add a small serverless endpoint or lightweight API and send messages through a provider such as Resend. |
| WhatsApp | Keep the prefilled WhatsApp flow for now. |
| Later WhatsApp | Consider WhatsApp Cloud API or Twilio only if approved and the business case justifies it. |

## Why not now

- GitHub Pages does not provide a backend.
- WhatsApp automation has Business/API/template constraints.
- Adding full automation now increases setup, approvals, and operational risk.

## Phases

1. Replace the current mailto flow with real email delivery.
2. Keep the WhatsApp button as a manual handoff.
3. Review automation only after approval and clear usage needs.

## Risks

- Delivery failures if the provider is misconfigured.
- Spam/abuse if the endpoint lacks basic validation.
- WhatsApp automation complexity if approved too early.

## Approval needed

- Approve moving email delivery to a backendless/serverless integration.
- Confirm whether WhatsApp should remain manual or move to an official API later.
