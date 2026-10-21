# Feature: descriptive-h1

## Objective
The page's H1 says what scapder does, not only its name, without changing the hero's look.

## Problem / why
The H1 is only "scapder". Search engines and screen readers get no description from the main heading. Owner chose option A on 2026-10-21: keep the big wordmark, add a smaller descriptor line inside the same H1.

## Scope
- In: hero H1 markup (`index.html`), a new `heroDescriptor` key in the ES, EN and PT dictionaries (`script.js`), descriptor styles (`styles.css`), `tools/verify-landing.mjs`.
- Out: the title tag, meta description, any other copy, the hero layout and panel.

## Design
- Markup: `<h1 id="hero-title"><span class="hero-wordmark" data-i18n="heroTitle">scapder</span> <span class="hero-descriptor" data-i18n="heroDescriptor">…</span></h1>`. The space between the spans keeps the accessible name readable ("scapder inteligencia…").
- Descriptor copy reuses the existing meta titles (no new claims):
  - ES: "inteligencia accionable desde datos reales"
  - EN: "actionable intelligence from real data"
  - PT: "inteligência acionável a partir de dados reais"
- Wordmark keeps the current H1 size, weight and shadow. The descriptor is a block line under it: clearly smaller (about clamp(20px, 2.6vw, 34px)), lighter weight, normal tracking, same color and heading shadow (system.md: shadows only on headings), Geist Mono.
- The heading decode effect already skips the H1; it must stay that way.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs`; generated pages via `node tools/build-language-pages.mjs`.

## Tasks
- [x] D1 Markup, dictionary key in 3 languages, styles, verifier checks (RED first), generated EN/PT pages carry the descriptor. Route: delegated writer (index.html, script.js, styles.css, verifier).
- [ ] D2 Browser check: `/`, `/en/`, `/pt/` at 375, 768, 1440: descriptor visible and in the right language, wordmark unchanged, no horizontal scroll, hero entrance animation still runs, contrast over the hero image. Route: parent (inline).

## Acceptance
- H1 text in each language is "scapder" + the descriptor, before JS and after switching.
- The hero looks the same apart from the descriptor line.
- Verifier green.

## Delivery
- Strategy: ask-on-risk. Small: one PR, independent of #12 and #13.

## Progress
- 2026-10-21: branch `feat/descriptive-h1` from main `dc04f76`.
- 2026-10-21: D1 done (writer). RED: failing checks were "lowercase scapder branding in visible core copy" and "hero H1 carries a descriptor in es, en and pt (index, generated pages, styles)". GREEN: node tools/verify-landing.mjs passed (104 checks); node --check script.js ok; build-language-pages output has the EN/PT descriptor inside the h1. Commit pending (parent).
