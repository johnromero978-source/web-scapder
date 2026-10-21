# Feature: en-pt-copy-refresh

## Objective
Refine the English and Brazilian Portuguese copy the same way the Spanish copy was refined (`odd/tasks/es-copy-refresh.md`), and give the hard-coded shared strings their own translation keys.

## Problem / why
Owner request 2026-10-21. Read-only reviews (session scratchpad `copy-en-review.md`: 164 strings, 42 proposals; `copy-pt-review.md`: 163 strings, 36 proposals) found calques from Spanish, Spanish words in PT ("5 pasos"), English Title Case, PT lagging behind the refined ES, and strings hard-coded in `index.html` that show the same text in every language.

## Scope
- In: `en` and `pt` dictionaries and EN/PT JS strings in `script.js`; new i18n keys for the hard-coded shared strings in `index.html` (`On-Premise`, `Computer Vision · Edge AI`, the remaining hard-coded aria labels such as the brand link and proof strip); `tools/verify-landing.mjs`.
- Out: Spanish visible copy (only gains keys with its current text), numbers in the metric tiles, every claim and figure, the tagline `Your Data has a Voice`, layout, per-language URLs (next feature).

## Decisions (owner-approved 2026-10-21, "si dale" to the recommendations)
- Apply the style proposals of both reviews; do not change claims or figures (Legis, Panama "fuel"/"combustível", F1 lists) until `docs/Scapder_Overview.pdf` exists.
- New keys for shared hard-coded strings: EN uses "on-premises"; ES keeps "On-Premise"; PT "On-premise".
- PT: always "a scapder" with the article; "Assessoria jurídica" (neutral); keep "varejo"; "Ver a bandada"; "E-mail"; prose "mais de 20 mil".
- Keep: tagline, no contractions in EN, metric tile numbers, "caixas de detecção" in PT.
- Longer labels ("Knowledge transfer", "Do laboratório à produção", etc.) are applied and checked at 375px; revert any that breaks the layout.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs`.

## Tasks
- [x] C2 Apply the approved EN and PT copy changes and add i18n keys for the shared hard-coded strings, with verifier checks. Route: delegated writer (2 non-trivial files).

## Acceptance
- ES visible text unchanged; EN/PT changes as approved; every former hard-coded string switches language.
- Verifier green; no horizontal scroll at 375 in EN and PT; long labels fit.

## Progress
- 2026-10-21: branch `copy/en-pt-refresh` from main `902fbeb`.
- 2026-10-21 C2 done (uncommitted, parent commits). RED: 6 new checks failed (en leftovers, pt leftovers, owner decisions, shared strings keyed, every aria-label keyed, es refresh text). GREEN: `node tools/verify-landing.mjs` -> passed (86 checks); `node --check script.js` ok. Changed 42 `en` keys, 30 `pt` keys, added 5 new keys per language (navMainAria, brandAria, proofAria, edgeCategory, edgePillarOne); 5 HTML elements got data-i18n / data-i18n-aria-label (header, brand link, proof strip, product-category, On-Premise li). ES unchanged: 0 pre-existing `es` values differ from HEAD, and index.html visible text nodes are identical to HEAD. Skipped: `edgeLogMachine` en/pt (ES still says en movimiento; touches a claim), Legis/Panama/F1 claims, number-format rows, `20,000+`/`4.7/5` tiles, meta description length. Check at 375px: methodTwoTitle (+125%), heroPanelTwoValue (+40%), heroPanelThreeValue (+17%), mlspecPillarThree EN (~+15%), caseCeleusTitle PT (+20%), sentientumDemoCta PT (+18%), mlspecPillarOne PT (+85%).
- 2026-10-21 parent check: verifier 86 green. Brave 375 and 1440 in EN and PT (reduced motion): no horizontal scroll, no page errors, html lang en / pt-BR; "On-premises", "Computer vision · Edge AI", "Do laboratório à produção", "Ver a bandada", "Agents and humans" on one line; PT caseCeleusTitle 4 lines at 375; EN "Knowledge transfer" wraps to 2 lines at 1440 like its neighbour "Internal capability" (cards stay even). Hero panel values are hidden at 375 by design. All aria labels switch language (PT "Abrir ..." is Portuguese). Commit: see `git log` (fix(copy) on copy/en-pt-refresh).
