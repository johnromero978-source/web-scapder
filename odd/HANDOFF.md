# Handoff — 2026-10-20 (branch `perf/motion-lite`, NOT merged, nothing new is live)

Live site (main `fc637b2`): Bandada, SEO, robot head-turn video scrub, scroll fix, mobile header order.

## On this branch, unpublished
| Commit | What | State |
|---|---|---|
| `cf6fa88` + `b159480` | Motion-lite: calm version for slow devices (deviceMemory <= 2 / Save-Data up front, or >= 25% slow frames during the visitor's first scroll). Hover borders made compositor-friendly. | Verified in headed Brave (normal machine stays full motion, CLS 0.007; phone/reduced/no-JS OK) |
| `d83750b` | Edge Sight demo: AI-generated construction-site clip (Higgsfield/Kling) + REAL YOLOv8 detections drawn by the page, event log, slider, honest caption. Old stills moved to `assets-src/hero/`. | Verified; scroll through #edgesight borderline (2–3.6% frames > 20 ms vs 3% target) |
| `ad1fb99` | M5 effects pass "La señal de los datos": decoding headings, scroll signal line, metric scan, Edge Sight reticle, hover fills. | **WIP** — see below |
| (this commit) | `tools/dev/` measurement helpers + this handoff | — |

## Pending before publishing (M5) — updated 2026-10-21
1. ~~Accessible-name check~~ DONE: it was a test bug, the AX names are correct.
2. ~~375 touch, lite, reduced, no-JS~~ DONE, all green. Scroll smoothness at normal CPU: target met (1-3%). **Still open:** desktop CPU 4x. The signal line's forced layout (scrollY read per frame) was found and fixed 2026-10-21 (CSS scroll timeline + IntersectionObserver, uncommitted); the remaining gap is render cost and the host was too loaded to measure it cleanly. Re-run on an idle machine.
3. Not yet run: impeccable detector (baseline 27).
4. Review screenshots/visual quality; then the user decides on push/PR/merge.
Details and exact next steps: `odd/tasks/purposeful-motion.md` (M4, E1, M5 entries).

## How to test locally
`node tools/dev/serve-range.mjs` then open http://localhost:8766 (Range support is required for the videos).
Verifier: `node tools/verify-landing.mjs` (75 checks, green).

## Accounts / rules
Push/PR with the `johnromero978-source` account (`~/.gh-personal/bin/gits` / `ghs`), never switch the global gh (johnromero-613). Higgsfield credits used today on this branch: ~18 (Edge Sight).
