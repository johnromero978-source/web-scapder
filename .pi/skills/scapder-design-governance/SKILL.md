---
name: scapder-design-governance
description: Use when designing, implementing, reviewing, or validating the Scapder landing page. Enforces system.md, Stitch visual extraction, Uncodixfy anti-generic UI rules, UI/UX Pro Max validation checks, and local-only workflow.
---

# Scapder Design Governance

Before any Scapder landing page design or implementation work:

1. Read `AGENTS.md`.
2. Read `system.md`.
3. Treat `system.md` as the source of truth.
4. If reviewing Stitch direction, read:
   - `docs/stitch_scapder_robot_redesign/code.html`
   - `docs/stitch_scapder_robot_redesign/DESIGN.md`
   - `docs/stitch_scapder_robot_redesign/gu_a_de_estilo_scapder_ai.md`
5. If extracting content, use `docs/Scapder_Overview.pdf` and repo-provided documents only.

## Hard Rules
- Local work only unless user explicitly asks for Git/repo/deploy.
- Spanish primary, English secondary.
- Geist Mono everywhere.
- Monochrome only.
- Heading shadows only on headings.
- No body/support text shadows.
- 4px controls, 8px large containers max.
- No fake partners, fake metrics, fake dashboards, or fake claims.
- No generic AI UI patterns: glassmorphism, gradients, glows, over-rounded pills, decorative telemetry, decorative badges.

## Validation
When implementation starts, validate with Playwright/local browser at 375, 768, 1024, and 1440 widths. Check contrast, focus, touch targets, no horizontal scroll, and no Lorem ipsum/fake companies.
