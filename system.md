# Scapder Landing Design System

Use this file as the source of truth for all Scapder landing page design, copy, and implementation work.

## Direction
Scapder is a technical AI/data-intelligence company. The landing should feel precise, industrial, calm, and editorial — not like a generic AI SaaS template.

**Personality:** monochrome, robotic, exact, quietly authoritative.
**Visual reference:** `docs/stitch_scapder_robot_redesign/code.html` and `screen.png`.
**Content reference:** `docs/Scapder_Overview.pdf` and repo-provided Scapder documents.
**Primary language:** Spanish.
**Secondary language:** English via header selector.
**Tertiary language:** Portuguese (Brazil) via header selector.

## Source Hierarchy
1. User decisions in the current session.
2. This `system.md`.
3. `docs/Scapder_Overview.pdf` for business/product facts.
4. `docs/stitch_scapder_robot_redesign/gu_a_de_estilo_scapder_ai.md` for Scapder-specific visual notes.
5. `docs/stitch_scapder_robot_redesign/DESIGN.md` for Stitch token extraction.
6. External design skills as guardrails only: Uncodixfy, UI/UX Pro Max, Awesome DESIGN.md, Interface Design.

## Canonical Decisions
- **Font:** Geist Mono across headings, body, labels, nav, buttons, and UI text.
- **Palette:** strict monochrome/off-white/charcoal. No blue/purple AI SaaS palette.
- **Heading treatment:** title shadow may be used on H1/H2/H3 only.
- **Body/support text:** no text shadow.
- **Visual hero:** use the robot/background direction first; do not introduce extra imagery unless approved.
- **Partners/companies:** only use companies found in source documents. If unsure, omit.
- **Build mode:** local only until user asks for Git/repo/deploy.

## Tokens

### Color Tokens
```css
--scapder-canvas: #f9f9f9;
--scapder-paper: #ffffff;
--scapder-surface: #eeeeee;
--scapder-surface-raised: #e8e8e8;
--scapder-surface-dim: #dadada;
--scapder-ink: #1a1c1c;
--scapder-ink-soft: #444748;
--scapder-ink-muted: #646868;
--scapder-border: #c4c7c7;
--scapder-border-strong: #1a1c1c;
--scapder-inverse: #1c1b1b;
--scapder-inverse-ink: #ffffff;
--scapder-error: #ba1a1a;
```

### Typography
- `font-family`: `'Geist Mono', monospace`.
- Hero: `clamp(56px, 10vw, 140px)`, weight 700, line-height 0.9–1.0, tight tracking.
- Section heading: `clamp(36px, 5vw, 72px)`, weight 650–750.
- Subheading/body lead: 18–20px, line-height 1.5.
- Body: 15–16px, line-height 1.55–1.7.
- Labels/nav: 12–14px. Avoid decorative all-caps eyebrow overload.

### Spacing & Grid
- Base scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 120 / 160.
- Container: `min(1440px, calc(100vw - 48px))` on desktop.
- Mobile gutters: 20–24px.
- Desktop sections: 96–160px vertical separation depending on content density.
- Use predictable sections and strong hierarchy. Avoid clever asymmetry that creates dead space.

### Radius & Depth
- Buttons/inputs: 4px.
- Cards/media/large containers: 8px max.
- Avoid 20–32px radii.
- Depth strategy: tonal layering and 1px borders. No glass, blur haze, colored glows, or dramatic shadows.

### Motion
- 150–250ms ease for hover/focus only.
- Avoid bounce/spring/large transform effects.
- Respect `prefers-reduced-motion`.

## Layout Architecture
Recommended marketing structure:
1. Header: Scapder brand, primary nav, ES/EN selector, one CTA.
2. Hero: Scapder-first message, robot visual, concise value proposition, CTA.
3. Proof/Context: source-backed companies/contexts only; omit if not confirmed.
4. What Scapder does: data intelligence, AI products, automation, decision support.
5. Product ecosystem: Edge Sight AI, Sentientum, ML Spec if validated from PDF.
6. Edge Sight AI spotlight/demo: detection/heatmap/security intelligence using existing realistic camera assets only where relevant.
7. Process/capability model: how Scapder turns data into intelligence.
8. Contact/final CTA with a form that launches email and WhatsApp actions.
9. Footer: company/product/legal/contact.

## Copy Rules
- Spanish first; English variant stored in `script.js`/data attributes when implemented.
- No Lorem ipsum.
- No generic startup copy like “future of automation” unless backed by the PDF and rewritten specifically.
- No fake metrics, fake chart labels, fake logos, fake partners, or invented claims.
- Prefer concrete nouns from Scapder's world: data, intelligence, monitoring, detection, automation, models, operations, real-time analysis.

## Uncodixfy Constraint
Do **not** use generic AI UI patterns:
- no glassmorphism;
- no soft corporate gradients;
- no cyan/blue SaaS glow;
- no over-rounded pills;
- no decorative badges/status dots;
- no fake dashboards/charts to fill space;
- no bento grid unless each block has a real content purpose;
- no ornamental labels like “live pulse”, “command center”, “operator checklist” unless directly grounded in product language;
- no decorative animation or hover lift as a taste substitute.

Interpret Uncodixfy's “no headlines” rule for this marketing site as: no generic eyebrow/headline wrapper templates. Real H1/H2/H3 hierarchy is required.

## UI/UX Pro Max Guardrails
Use these checks when expanding or validating sections:
- one clear primary CTA path;
- readable hierarchy at 375, 768, 1024, and 1440px;
- 4.5:1 contrast for normal text;
- 44px minimum touch targets;
- visible keyboard focus;
- no horizontal mobile scroll;
- below-fold images lazy-load and dimensions are reserved;
- content order remains logical without CSS.

## Stitch Workflow
Current Stitch artifact is the export in `docs/stitch_scapder_robot_redesign/`. It is a visual reference, not production content.

When generating a new Stitch prompt, include:
- Scapder-first company landing;
- Geist Mono;
- monochrome neo-minimalist;
- robot/AI intelligence visual direction;
- industrial 4px/8px radius;
- no gradients/glass/glows;
- no fake partner logos;
- Spanish primary copy placeholders only if source copy is not ready.

## Validation Plan
When implementation starts:
1. Run local static server.
2. Validate with Playwright/browser at 375, 768, 1024, 1440 widths.
3. Check contrast/focus/navigation manually or with browser inspection.
4. Confirm no Lorem ipsum or invented companies remain.
5. Confirm `system.md` decisions are reflected in `index.html`, `styles.css`, and `script.js`.
