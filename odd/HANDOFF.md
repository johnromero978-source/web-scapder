# Handoff — 2026-10-21 (main `242bc7a`, everything is live)

Live on scapder.com. Nothing is waiting on a branch.

## Shipped 2026-10-21
| PR | Merge | What |
|---|---|---|
| #7 | `291104a` | Motion-lite (calm version for slow devices), Edge Sight demo with real YOLOv8 detections, M5 effects "La señal de los datos" (heading decode, signal line on a CSS scroll timeline, metric scan, reticle, hover fills), opaque sticky header. |
| #8 | `902fbeb` | Spanish copy refresh: neutral Spanish, tuteo, anglicisms and Title Case removed. |
| #9 | `b78424f` | English and Brazilian Portuguese copy refresh; 5 hard-coded shared strings got translation keys. |
| #10 | `4c0f797` | `/en/` and `/pt/` as real pages (generated in the Pages workflow), hreflang + canonicals, sitemap with alternates, the switch updates the URL. |
| #12 | `d51ca8e` | Metric numbers in each language's format: ES per RAE (`20 000+`, `6000`, `1435 M`), PT-BR (`20.000+`, `4,7/5`, `1,435 bi`), EN unchanged. |
| #13 | `e138155` | Removed unused keys `contactEmailLabel` and `contactWhatsAppLabel`; the verifier fails on any unread key. Fixed the canonical check, which depended on line endings (false fail on LF checkouts, no-op on CRLF). |
| #14 | `e4962d3` | The H1 says what scapder does: wordmark plus a smaller descriptor line taken from the meta titles. |
| #16 | `242bc7a` | The Pages workflow runs `tools/verify-landing.mjs` before uploading; a failing check stops the deploy. |

Details per feature: `odd/tasks/purposeful-motion.md`, `es-copy-refresh.md`, `en-pt-copy-refresh.md`, `language-urls.md`, `metric-number-format.md`, `descriptive-h1.md`.

## Pending
Owner / client:
1. `docs/Scapder_Overview.pdf` is needed to validate claims. `docs/` is gitignored, so the PDF must be shared another way. Waiting on it: Legis "mínimo operativo documentado" next to the 5% tile; Panama Canal "consumo en tránsito" (ES/PT) vs "fuel consumption" (EN); Edge Sight log "en movimiento"; the case figures listed as unverifiable in the copy reviews.
2. Google Search Console (on hold): use a company Google account; prefer a Domain property (DNS TXT record). Open question: who has DNS access for scapder.com.
3. Legal check of the contact consent wording.

Decisions not taken yet:
4. Dedicated pages for Edge Sight AI, Sentientum and the cases (need PDF content).

Accepted, not pending: M5 costs ~3 points more slow frames than before at desktop CPU 4x (17.8 vs 16.4% median); motion-lite takes over on those machines.

## How to test locally
1. `node tools/build-language-pages.mjs .` (writes the gitignored `en/` and `pt/`)
2. `node tools/dev/serve-range.mjs`, then open http://localhost:8766, `/en/` or `/pt/` (Range support is required for the videos).
3. Verifier: `node tools/verify-landing.mjs` (107 checks, green; the Pages workflow runs it before every deploy and stops on failure). Browser helpers: `tools/dev/` (needs `playwright-core` in a scratch folder; see its README).
4. Verifier changes: also run them on an LF worktree (`git -c core.autocrlf=false worktree add <dir> main --detach`), since this Windows clone checks out CRLF and CI does not.

## Accounts / rules
Push/PR with the `johnromero978-source` account (`~/.gh-personal/bin/gits` / `ghs`), never switch the global gh (johnromero-613). Merging to main deploys to scapder.com through Pages. The owner wants Claude to do the merges itself (squash, delete branch) once the work is verified.
