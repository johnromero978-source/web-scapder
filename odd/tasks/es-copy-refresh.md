# Feature: es-copy-refresh

## Objective
Refine the Spanish copy of the landing: neutral Spanish, tuteo, no emojis, correct spelling and style, no unnecessary anglicisms. No new claims.

## Problem / why
The owner asked (2026-10-21) for a full review of the Spanish texts. A read-only review (184 strings, 50 proposed changes) found no voseo or "usted" and the HTML in sync with the `es` dictionary, but anglicisms, English Title Case, calques and some grammar issues.

## Scope
- In: Spanish strings in `index.html` (default markup, meta, alt, aria) and the `es` dictionary plus Spanish JS strings in `script.js`; `tools/verify-landing.mjs`.
- Out: EN and PT strings, numbers and their format, any claim or figure, layout, new i18n keys.

## Decisions (owner-approved 2026-10-21, "si dale" to the recommendations)
- Apply the style changes from the review: anglicisms (overview, retail -> comercio minorista, Machine Learning -> aprendizaje automático, Email, Footer, AI Agents, Computer Vision, English team role titles), sentence case instead of Title Case, calques and grammar, `co-creación` -> `cocreación`, the `contactFormHelp` mixed-voice fix.
- Do not change numbers or their format (`20,000+` stays: the metric numbers are shared by ES/EN/PT markup).
- Do not touch claims or figures until `docs/Scapder_Overview.pdf` is available (it is not in the repo): Legis "mínimo operativo documentado" vs 5%, Panamá "consumo en tránsito" vs EN "fuel consumption", and the rest of review flag F1.
- Keep: `On-Premise`, `demo` on the buttons, `Your Data has a Voice`, `by scapder`, lower-case `scapder`, `Portafolio`, `video`.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs`.

## Tasks
- [x] C1 Apply the approved Spanish copy changes in `index.html` and the `es` dictionary of `script.js`, keeping both in sync, with verifier checks. Route: delegated writer (2 non-trivial files).

## Acceptance
- Every approved change appears identically in the HTML default and the `es` dictionary; EN/PT untouched.
- No voseo, no anglicisms from the list, no English Title Case in ES; numbers unchanged.
- Verifier green; no horizontal scroll at 375 and headings still fit.

## Progress
- 2026-10-21: branch `copy/es-refresh` from main `291104a`. Review file: session scratchpad `copy-es-review.md`.
- 2026-10-21 C1 done (uncommitted, parent commits). RED: new check "Spanish copy has none of the removed anglicisms, Title Case forms or calques" failed (html/es sync and metric-number checks passed as guards). GREEN: `node tools/verify-landing.mjs` -> Landing verification passed (80 checks); `node --check script.js` ok. Changed 38 `es` dictionary keys and ~45 occurrences in index.html (incl. meta/OG/Twitter/JSON-LD x4, aria, 2x sentientumCategory); en/pt dictionaries byte-identical to HEAD (JSON compare); metric numbers and `20,000+`/`76%`/`seis mil`/`5 perfiles` unchanged. Skipped: brand aria `scapder inicio` (needs new key), `Computer Vision · Edge AI` and `On-Premise` (hard-coded, shared by all languages), number-format rows (D3), `edgeLogMachine` (touches a claim, not in approved list), dead key `contactEmailLabel`. Flags for visual check at 375px: caseCeleusTitle (+20%), comparisonBaseLabel (+22%), mlspecPillarOne (+~70%), proofThree/casePuppisDomain.
- 2026-10-21 parent check: verifier 80 green; changed hard-coded aria labels carry data-i18n-aria-label keys (EN/PT unaffected). Brave 375 and 1440 (reduced motion): no horizontal scroll; "Del laboratorio a producción", "Sin recuadros ni texto", "comercio minorista" and the edge pillars stay on one line; caseCeleusTitle wraps to 4 lines at 375 (2 at 1440) without overflow. Commit: see `git log` (copy(es) on copy/es-refresh).
