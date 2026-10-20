# Feature: bandada-seo-redesign

## Objective
1. Replace the Sentientum showcase (card + modal with YouTube walkthrough) with the Bandada experience (https://bandada.scapder.com/) embedded in-page, the same way the video was.
2. SEO pass on scapder.com.
3. Design review pass on the landing, within `system.md`.

## Problem / why
- Scapder now presents Sentientum through Bandada; the old walkthrough is a raw Teams recording.
- SEO is near-empty: no canonical, OG/Twitter, JSON-LD, favicon, robots.txt, sitemap.xml; EN/PT only JS-swapped; page images are 0.7-3.2 MB each (LinkedIn icon 1.4 MB loaded 4x).

## Scope
- In: `index.html`, `styles.css`, `script.js`, `tools/verify-landing.mjs`, `.github/workflows/pages.yml` (copy list for new root files), new `robots.txt`, `sitemap.xml`, favicon, optimized images under `img/`.
- Out: the Bandada app itself (lives in `C:\Projects\sentientum`), the contact worker, other sections' content (no invented copy).

## Constraints
- `system.md` is the source of truth; monochrome, Geist Mono, 4/8px radius, no hover lift, no generic AI UI.
- Copy traceable to repo docs or to bandada.scapder.com's own copy.
- Technical artifacts in English; site copy ES primary, EN + PT.
- Git: local commits on `feat/bandada-seo-redesign` only. Push/PR/deploy need the user's explicit OK, and use the `johnromero978-source` account via `~/.gh-personal/bin/{ghs,gits}` (never switch the global `johnromero-613`).

## Decisions
- 2026-10-20: Bandada replaces only Sentientum (user). Rest of the landing stays.
- 2026-10-20: Bandada is embedded in-page like the video (user). Iframe mounted on modal open, torn down on close; `?lang=es|en|pt` follows the landing's language (Bandada reads `lang` from the query string). Headers allow framing (no X-Frame-Options / CSP).

## TDD
- Mode: strict (source: global CLAUDE.md "Strict TDD Mode: enabled").
- Runner: `node tools/verify-landing.mjs` (static assertions) + Playwright browser checks for behavior.
- Known base failure: "walkthrough link is per language and falls back honestly" fails on `e30cabe` (stale `data-video-link` check). T1 replaces it.

## Tasks
- [x] T1 Bandada embed replaces Sentientum modal content (iframe facade, lang sync, teardown, remove YouTube/steps/facts code and unused i18n keys, update card copy, update verifier). Route: delegated writer (3+ non-trivial files).
- [ ] T2 SEO: meta/canonical/hreflang strategy, OG/Twitter, JSON-LD Organization, favicon, robots.txt, sitemap.xml, `html lang` + title/description follow language, image weight (webp + width/height + lazy), `defer`, workflow copy list. Route: delegated writer.
- [ ] T3 Design review: critique against `system.md` (impeccable), agree fixes with user, apply. Route: TBD after critique.

## Acceptance
- Card opens a modal with Bandada embedded; language switch updates the iframe; Escape/close tears it down; focus trap works; no horizontal scroll at 375px.
- Verifier passes; Playwright checks pass locally.
- Lighthouse-style basics: all SEO tags present; no page image > ~300 KB.

## Progress
- 2026-10-20: exploration done, branch created from `e30cabe`.
- 2026-10-20: T1 done (delegated writer, strict TDD). RED: `node tools/verify-landing.mjs` failed 3 new checks (video plumbing gone, Bandada iframe contract, no hover lift). GREEN: verifier passes (14 checks); `node --check script.js` ok; Playwright (scratchpad check.mjs) ALL PASS at 1440x900 and 375x812: no iframe before open, src `?lang=es` on open, switch to en updates src and fullscreen href, Escape and close button remove the iframe, focus returns to card, focus never on iframe, scrollWidth <= 375 open and closed. Also removed the generic card `translateY(-2px)` hover. Commit: see `git log` (feat(portfolio): the Sentientum card opens the Bandada experience in-page).

## Next step
T2.
