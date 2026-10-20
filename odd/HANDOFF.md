# Handoff — 2026-10-20 (branch `perf/motion-lite`, NOT merged, nothing new is live)

Live site (main `fc637b2`): Bandada, SEO, robot head-turn video scrub, scroll fix, mobile header order.

## On this branch, unpublished
| Commit | What | State |
|---|---|---|
| `cf6fa88` + `b159480` | Motion-lite: calm version for slow devices (deviceMemory <= 2 / Save-Data up front, or >= 25% slow frames during the visitor's first scroll). Hover borders made compositor-friendly. | Verified in headed Brave (normal machine stays full motion, CLS 0.007; phone/reduced/no-JS OK) |
| `d83750b` | Edge Sight demo: AI-generated construction-site clip (Higgsfield/Kling) + REAL YOLOv8 detections drawn by the page, event log, slider, honest caption. Old stills moved to `assets-src/hero/`. | Verified; scroll through #edgesight borderline (2–3.6% frames > 20 ms vs 3% target) |
| `ad1fb99` | M5 effects pass "La señal de los datos": decoding headings, scroll signal line, metric scan, Edge Sight reticle, hover fills. | **WIP** — see below |
| (this commit) | `tools/dev/` measurement helpers + this handoff | — |

## Pending before publishing (M5)
1. Accessible-name check for headings failed in the browser (3 checks) — likely the test, not confirmed. Check with DevTools > Accessibility that each h2's name equals its real text during and after the scramble.
2. Not yet run: 375 touch, motion-lite, reduced motion, no-JS, scroll smoothness at 1440 (target ≤ 3% frames > 20 ms), impeccable detector.
3. Review screenshots/visual quality; then the user decides on push/PR/merge.
Details and exact next steps: `odd/tasks/purposeful-motion.md` (M4, E1, M5 entries).

## How to test locally
`node tools/dev/serve-range.mjs` then open http://localhost:8766 (Range support is required for the videos).
Verifier: `node tools/verify-landing.mjs` (75 checks, green).

## Accounts / rules
Push/PR with the `johnromero978-source` account (`~/.gh-personal/bin/gits` / `ghs`), never switch the global gh (johnromero-613). Higgsfield credits used today on this branch: ~18 (Edge Sight).
