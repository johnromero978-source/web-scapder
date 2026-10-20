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
- [x] T2 SEO: meta/canonical/hreflang strategy, OG/Twitter, JSON-LD Organization, favicon, robots.txt, sitemap.xml, `html lang` + title/description follow language, image weight (webp + width/height + lazy), `defer`, workflow copy list. Route: delegated writer.
- [x] T2b Header shows the scapder wordmark (user request 2026-10-20). Route: inline (1 asset + 2 small edits).
- [x] T3 Design review: critique against `system.md` (impeccable) scored 21/32 with 5 priority issues; user chose all 5, shortened consent (drop only the "provisional" sentence) and kept the hero. Fixes applied by one delegated writer (focus on dark surfaces, valid product-card markup with real CTAs, form font + consent trust + hit areas, system.md violations, 44px targets).

## Acceptance
- Card opens a modal with Bandada embedded; language switch updates the iframe; Escape/close tears it down; focus trap works; no horizontal scroll at 375px.
- Verifier passes; Playwright checks pass locally.
- Lighthouse-style basics: all SEO tags present; no page image > ~300 KB.

## Progress
- 2026-10-20: exploration done, branch created from `e30cabe`.
- 2026-10-20: T1 done (delegated writer, strict TDD). RED: `node tools/verify-landing.mjs` failed 3 new checks (video plumbing gone, Bandada iframe contract, no hover lift). GREEN: verifier passes (14 checks); `node --check script.js` ok; Playwright (scratchpad check.mjs) ALL PASS at 1440x900 and 375x812: no iframe before open, src `?lang=es` on open, switch to en updates src and fullscreen href, Escape and close button remove the iframe, focus returns to card, focus never on iframe, scrollWidth <= 375 open and closed. Also removed the generic card `translateY(-2px)` hover. Commit: see `git log` (feat(portfolio): the Sentientum card opens the Bandada experience in-page).

- 2026-10-20: T2 done (delegated writer, strict TDD). RED: verifier failed 8 new checks (canonical/robots/theme-color, OG+Twitter, JSON-LD, favicon, robots+sitemap in pages.yml, applyLanguage title/description, image weight, img width/height). GREEN: `node tools/verify-landing.mjs` passes (22 checks); `node --check script.js` ok; JSON-LD parses (Organization + WebSite); Playwright (scratchpad seo-check.mjs) ALL PASS: no 4xx requests, EN -> `html lang=en` + EN title/description, PT -> `pt-BR`, Bandada modal opens/closes, scrollWidth <= 375. Image bytes on initial load at 1440x900: 9628 KB -> 103 KB; after scrolling the whole page: 13553 KB -> 339 KB. Hero, team and slider screenshots match the previous look (mean abs pixel diff 0.40 / 0.65 / 3.41 of 255). Canonical host is https://scapder.com/ (www 301s to it). `og:locale` is `es_LA` (Facebook's Latin American Spanish code; no country stated in repo). No company `sameAs` profile exists in the repo, so JSON-LD omits it rather than inventing one. Favicon and OG art are derived from `img/logo/logosimbolo_scapder.png` flattened to monochrome. Originals are untouched; new files sit beside them (`*.webp`, `linkedin-icon-64.png`, `img/og-scapder.jpg`).

## Follow-ups
- Separate indexable URLs per language (`/en/`, `/pt/`) with `hreflang` alternates; today EN/PT are a JS swap on one URL, so only Spanish is indexable.
- Add a company LinkedIn (or other) profile to JSON-LD `sameAs` once the user provides the URL.
- Google Fonts stylesheet is still render-blocking (self-host Geist Mono if the user agrees to add the font files).
- Delete or stop shipping the unreferenced multi-MB files under `img/` (the Pages job copies the whole folder).

- 2026-10-20: T2b done inline. Asset img/logo/scapder-wordmark-ink.png built from logo_scapder.png (luminance alpha, ink #1a1c1c). RED: verifier failed "header brand is the monochrome scapder wordmark". GREEN: verifier 23 checks pass; Playwright: logo loads 75x28 at 1440, 65x24 at 375, scrollWidth 1440/375.

- 2026-10-20: T3 done (delegated writer, strict TDD). RED: verifier failed 8 new checks. GREEN: `node tools/verify-landing.mjs` passes (31 checks); `node --check script.js` ok; Playwright (scratchpad t3/t3.mjs) ALL PASS at 1440x900 and 375x812: hero and Sentientum CTA outline white on #1c1b1b/#242424 (17.19 / 15.52:1), Edge CTA ink outline on its white card, modal close and fullscreen focus visible, Escape removes the iframe and focus returns to the CTA button, `.language-option` 56x44 (48x44 at 375, 13px), consent row >=44 with a 24px box, textarea Geist Mono, `.btn` hover/active transform none, EN/PT strings and no "provisional", scrollWidth <= viewport. Impeccable detector: 27 findings, same split as baseline. Decisions: heading shadow kept as `2px 2px 10px` (system.md allows heading shadow, prescribes none; only the 40px glow went); comparison handle is now 4px-radius (system.md: no pills) with no drop shadow; scroll reveal and hero panel entrance removed with their JS and `data-reveal` attributes. Commit: see `git log`.

- 2026-10-20: T3 follow-up inline: stacked product cards (<=1120px) lost the desktop row-alignment padding (empty gap under ML SPEC Kit) and the text touched the pillar list. Card heights 375: 404/430/310, 1440: 420x3; scrollWidth ok; verifier 31 pass.

## Next step
User decides on push/PR/deploy (source account via gits/ghs).
