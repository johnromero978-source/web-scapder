# AGENTS.md — Scapder Landing Project Architecture

## Project Mission
Build the Scapder marketing landing page locally first. The page must present Scapder as the company/primary brand and ground all business/content claims in `docs/Scapder_Overview.pdf` or other repo-provided Scapder documents.

## Non-Negotiable Working Rules
- **No Git/repo/deploy work** unless the user explicitly asks for it.
- **Use `system.md` as the source of truth** for visual, UX, copy, and implementation decisions.
- Keep technical artifacts in English unless the user requests otherwise; the site content is bilingual with Spanish primary and English available via header selector.
- Do not invent partners, customers, metrics, certifications, or product capabilities.
- Prefer small local steps with visible checkpoints. Prior large delegated implementation attempts timed out.

## Current Local Architecture
- `index.html` — static landing markup.
- `styles.css` — static visual system and responsive styling.
- `script.js` — language selector/interactions.
- `design-spec.md` — legacy/current implementation notes; update after the redesign or supersede with `system.md`.
- `system.md` — canonical design governance for the redesign.
- `.interface-design/system.md` — memory/governance pointer for design consistency.
- `.pi/skills/scapder-design-governance/SKILL.md` — project-local skill adapter for future Pi sessions.
- `docs/Scapder_Overview.pdf` — primary content source.
- `docs/stitch_scapder_robot_redesign/code.html` — Stitch-generated visual reference; do not copy its fake copy/partners.
- `docs/stitch_scapder_robot_redesign/DESIGN.md` — Stitch DESIGN.md reference.
- `docs/stitch_scapder_robot_redesign/gu_a_de_estilo_scapder_ai.md` — Scapder-specific Stitch style notes.

## Design Source Stack
1. **Stitch** — visual prototype/reference. Use existing `docs/stitch_scapder_robot_redesign/code.html` and `screen.png` as the current Stitch artifact. If new Stitch screens are needed, generate a prompt/spec first; the user must run/export Stitch manually if account/UI access is required.
2. **system.md** — canonical source of truth after extracting and resolving Stitch rules.
3. **Uncodixfy** — anti-generic-AI guardrails. Ban template SaaS habits: glassmorphism, gradients, fake dashboards, over-rounded pills, decorative telemetry, fake logos, generic startup copy.
4. **UI/UX Pro Max** — use for expansion and validation of complex screens/sections: accessibility, responsive behavior, CTA clarity, information hierarchy. Do not let it override Scapder's monochrome system.
5. **Awesome DESIGN.md** — reference model for Markdown-based design systems; do not import another brand style unless explicitly chosen.
6. **Interface Design** — useful only for design memory, tokens, hierarchy, and consistency. Its own scope says it is not for marketing sites, so do not use it to redesign the whole landing.

## Canonical Phase Plan
- **Fase 0 — Architecture:** maintain this `AGENTS.md`, `system.md`, and local skill adapter.
- **Fase 1 — Stitch screen(s):** use the existing Stitch export as visual reference; if needed, create prompt variants for additional Stitch screens.
- **Fase 2 — System extraction:** formalize rules into `system.md`.
- **Fase 3 — Build requests:** every implementation prompt must include: `Use system.md as the source of truth.`
- **Fase 4 — Uncodixfy constraint:** enforce `no generic AI UI patterns` in markup, CSS, copy, and interactions.
- **Fase 5 — Complex expansion:** use UI/UX Pro Max only to expand unresolved complex sections, not to change the whole visual direction.
- **Fase 6 — Validate:** use Playwright/local browser validation when implementation starts.

## Implementation Acceptance
- Content is traceable to repo documents.
- Typography uses Geist Mono as the canonical font unless the user reverses this decision.
- Full monochrome palette; no blue/purple SaaS accent system.
- Heading shadows only on headings; secondary/body text has no shadow.
- Radius stays industrial: 4px controls, 8px large cards/media max.
- No invented companies; replace Stitch fake logos with PDF-backed entities or remove proof strip.
- Responsive: no horizontal scroll at 375px; readable at 768px, 1024px, 1440px.
- Accessibility: visible focus states, 4.5:1 text contrast, 44px touch targets.
