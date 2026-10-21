# Feature: metric-number-format

## Objective
Show the case metric numbers in each language's own number format, so no reader misreads a figure.

## Problem / why
The metric tiles are hard-coded in English format for every language. In ES and PT the comma is the decimal mark, so `20,000+` reads as twenty and `1,435M` (Panama Canal satellite records, 1,435 million) reads as 1.4 million, a thousand times smaller. Owner chose "each language's norm" on 2026-10-21.

## Scope
- In: the numbers in `.case-metrics` tiles (`index.html`), their dictionary keys in `script.js` (ES, EN, PT), the Spanish Celeus copy, `tools/verify-landing.mjs`, `tools/dev/m5-effects-check.mjs` expectations.
- Out: the values themselves (no claim changes), other copy, layout.

## Design
| Tile | EN | ES (RAE) | PT-BR |
|---|---|---|---|
| Celeus records | 20,000+ | 20 000+ | 20.000+ |
| Legis accessibility | 4.7/5 | 4.7/5 | 4,7/5 |
| Legis precision | 4.4/5 | 4.4/5 | 4,4/5 |
| Puppis clients | 6,000 | 6000 | 6.000 |
| Canal satellite | 1,435M | 1435 M | 1,435 bi |
| Canal every 15 min | 20M | 20 M | 20 mi |

- Spaces inside numbers are non-breaking (U+00A0) so a figure never wraps.
- Translated through `data-i18n` keys on the `<strong>` elements, like `caseCanalM3Strong`; numbers stay real text (no JS formatting, no `toLocaleString`).
- ES Celeus copy: "procesó más de 20 000 registros". EN and PT copy unchanged.
- Unchanged in every language: 300, 5, 5%, 15, 100%.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs`; generated pages via `node tools/build-language-pages.mjs`.

## Tasks
- [x] N1 Translation keys and per-language values for the metric numbers, ES copy, verifier checks (RED first), generated EN/PT pages carry the right values. Route: delegated writer (index.html, script.js, verifier, dev check: several non-trivial files).
- [x] N2 Browser check: `/`, `/en/`, `/pt/` show the table's values, the language switch updates them, no wrap or overflow at 375. Route: parent (inline).

## Acceptance
- Each language shows exactly the values in the Design table, before JS (generated pages) and after switching.
- Verifier green.

## Delivery
- Strategy: ask-on-risk. Forecast well under 400 authored lines: one PR.

## Progress
- 2026-10-21: branch `feat/metric-number-format` from main `dc04f76`.
- 2026-10-21 N1 (delegated writer): RED observed before implementing: check "metric numbers use each language's own format (es, en, pt-BR), as real text" failed (all 18 dict/page cells plus ES Celeus copy). GREEN: `node tools/verify-landing.mjs` passed (104 checks, old format check split into a values check plus the new per-language check), `node --check script.js` OK, `node tools/build-language-pages.mjs .` OK; generated en/ and pt/ carry the table values with U+00A0 where required. `tools/dev/m5-effects-check.mjs` expectation updated to `20 000+|300|5` (not run, needs a browser). Files: index.html, script.js, tools/verify-landing.mjs, tools/dev/m5-effects-check.mjs. Not committed.
- 2026-10-21 N1 committed `b302159`.
- 2026-10-21 N2 (parent, inline). Headless Brave on the local build (scratchpad n2.mjs): `/`, `/en/`, `/pt/` show the exact Design-table values with JS off (generated HTML) and on; selector switch es -> en -> pt -> es updates them; at 375 no horizontal scroll and no wrapped or overflowing number. Screenshots of the Canal tiles after the metric scan read "1435 M / 20 M" (ES) and "1,435 bi / 20 mi" (PT). `tools/dev/m5-effects-check.mjs` not run.
