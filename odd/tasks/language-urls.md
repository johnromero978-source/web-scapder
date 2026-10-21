# Feature: language-urls

## Objective
Give English and Portuguese their own indexable URLs (`/en/`, `/pt/`) so search engines index all three languages, without changing how the language switch feels.

## Problem / why
Today there is one URL. EN and PT are swapped in by JavaScript after load, so crawlers only see Spanish, a shared link always opens in Spanish, and there is no hreflang. Owner approved 2026-10-21 ("si dale") after the explanation: instant switch kept, address updates.

## Scope
- In: a Node generator (no dependencies) that builds `en/index.html` and `pt/index.html` from `index.html` + the dictionaries in `script.js`; `script.js` language init and switch; `index.html` head (hreflang); `sitemap.xml`; `.github/workflows/pages.yml`; `.gitignore`; `tools/verify-landing.mjs`.
- Out: copy changes, layout, new content pages, Search Console (needs the owner's Google account).

## Design
- URLs: `/` Spanish (unchanged), `/en/` English, `/pt/` Brazilian Portuguese. hreflang `es`, `en`, `pt-BR`, `x-default` -> `/`, on all three pages; each page's canonical points to itself.
- Generated pages are the real thing for crawlers and no-JS: `html lang`, every `data-i18n*` text/attribute, `<title>`, meta description, OG/Twitter title/description/url/locale, JSON-LD description, the language selector's active state.
- Asset and fetch paths must work from `/en/` and `/pt/`: root-absolute paths (`/styles.css`, `/img/...`, the gaze video, the Edge Sight tracks JSON). In-page anchors (`#cases`) stay relative so they never jump to another language.
- Generated files are built in the Pages workflow (not committed; `/en/` and `/pt/` gitignored); locally the generator is run before serving. The verifier runs the generator into a temp dir and checks its output.
- Language at load: the path decides on `/en/` and `/pt/`. On `/` a saved choice (localStorage `scapder-language`) still switches the text, as today. Choosing a language in the selector switches instantly (current behaviour) and updates the address with `history.replaceState` to `/`, `/en/` or `/pt/`, keeping the hash. No forced redirect based on browser language.
- Sitemap lists the three URLs with `xhtml:link` alternates.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs` + Brave/Playwright checks.

## Tasks
- [x] L1 Generator + head/sitemap/workflow/gitignore + script.js path init and URL update + absolute asset paths, with verifier checks. Route: delegated writer (several non-trivial files).
- [x] L2 Browser verification on a local build: `/`, `/en/`, `/pt/` render in their language with JS on and off, assets/video/tracks load, switch updates the URL, anchors stay on the page, no horizontal scroll at 375. Route: parent (inline).

## Acceptance
- `/en/` and `/pt/` serve fully translated HTML before any JS runs; all assets load from them.
- hreflang and canonicals correct on the three pages; sitemap lists all three.
- The switch is instant and the address follows it; Spanish `/` is unchanged for visitors.
- Verifier green; live deploy serves `/en/` and `/pt/`.

## Progress
- 2026-10-21: branch `feat/language-urls` from main `b78424f`. Note: `docs/` is gitignored, which is why `docs/Scapder_Overview.pdf` is not in the repo.
- 2026-10-21: L1 done (uncommitted, parent commits). RED: 17 new checks failed (hreflang, root-absolute index.html, script.js paths/init, sitemap, workflow, gitignore/README, 5 per language for generated pages). GREEN: `node tools/verify-landing.mjs` 103 checks pass (86 + 17; 6 older checks updated to root-absolute paths), `node --check script.js` clean, `node tools/build-language-pages.mjs .` wrote en/ and pt/ index.html (gitignored). Browser checks pending in L2.
- 2026-10-21 L2 done (parent, inline). The local dev server returned 404 for `/en/` (it only mapped `/` to index.html); `tools/dev/serve-range.mjs` now serves `index.html` for any path ending in `/`, as GitHub Pages does. Brave, local build: `/`, `/en/`, `/pt/` all pass (scratchpad bench/l2.mjs): no-JS html lang es / en / pt-BR, cases heading in the right language, canonical = own URL, 4 hreflang links, no broken images; with JS the language stays the path's language, decode effects armed (14), Edge Sight plays from `/img/...`, `#cases` anchor stays on the same path, the selector switches to `/en/#cases`, `/pt/#cases`, `/#cases`, no 4xx/5xx, no page errors; 375 no horizontal scroll; saved `pt` still switches `/`, and visiting `/en/` keeps the saved choice. Workflow: `actions/setup-node@v4` (node20 runtime, being retired) changed to `@v7` with Node 24 (same major the generator was tested on). Verifier 103 green.
