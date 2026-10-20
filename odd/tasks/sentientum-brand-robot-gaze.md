# Feature: sentientum-brand-robot-gaze

## Objective
1. The whole Sentientum card opens the Bandada modal, and the card wears Sentientum/Bandada's own branding.
2. Replace the M3 pupil overlay (looks fake) with "camino 2": the hero robot turns its whole head toward the pointer using a grid of AI-generated frames of the same robot.

## Why
- User 2026-10-20: the M3 pupils look fake. Diagnosis: camera lenses have no pupils (a disc + dot reads as a cartoon sticker), the moving glint contradicts the photo's fixed studio reflections, and the head does not move.
- User wants the Sentientum card fully clickable and branded like bandada.scapder.com.

## Decisions
- system.md gets a scoped exception: the Sentientum card carries its sub-brand identity (Bandada palette/wordmark/imagery); the rest of the site stays monochrome.
- Whole-card click via the stretched-link pattern on the real `<button>` (valid markup, h3 stays a heading).
- Robot gaze: test 2-3 generated frames for consistency before generating the full grid (credits). M3 overlay is removed when the frame grid ships.

## TDD
Strict; `node tools/verify-landing.mjs` + Playwright.

## Tasks
- [x] S1 Sentientum card: stretched click + Bandada branding (+ system.md exception). Route: delegated writer.
- [x] R1 Robot frame consistency test. Route: inline (generation tool). Outcome: frame grid rejected (inconsistent robot between frames); Seedance video rejected (reinvented the scene); Kling keyframe-locked clip chosen (first/last frame = hero photo).
- [x] R2 Head turn from the Kling clip frames + canvas renderer, M3 pupils removed. Route: delegated writer.
- [x] R3 Perf fix: head turn followed the cursor laggy/stuttery. Route: delegated writer (single).
- [x] R4 Head turn still laggy after R3 (measured in the user's headed Brave): benchmark canvas / video scrub / stacked img in real Brave and ship the winner. Route: delegated writer (single).
- [x] R5 Scroll felt heavy (desktop) / phone check: trace + bisect in headed Brave, fix the real culprit. Route: delegated writer (single). Outcome: partial (desktop CPU 4x target not met).

## Progress
- 2026-10-20: branch `feat/sentientum-brand-robot-gaze` from 1b6ba23.
- 2026-10-20 S1 done (delegated writer): whole card opens the modal (stretched ::after on the real button, card-level focus ring, fine-pointer border hover); card wears Bandada identity (img/sentientum/bandada-card.webp 10.7 KB + flat 0.44 scrim, palette #15122e/#efeaff/#cfc6f5/#b9a6f7/#ff9fd6, Martian Mono 800 wordmark + by scapder); system.md sub-brand exception added. RED 4 failed checks -> GREEN 48/48. Playwright 1440x900 + 375x812 all pass: click on text opens modal, focus returns to button, ring contrast 9.15:1, worst text contrast 5.16:1 (sampled pixels), CTA 8.52:1, card heights 420/420/420 and pillars aligned at 1440, no horizontal scroll, other cards unchanged.

- 2026-10-20 R2 done (delegated writer). Clip: 1928x1076, 24fps, 121 frames; diff vs frame 0 starts moving at frame 10 and plateaus at 45 (frontal pose). 18 frames used: clip indices 0,11,13,15,17,19,21,23,25,27,29,31,33,35,38,41,43,45 saved as img/hero/robot-gaze-00..17.webp (q88, color; CSS grayscale filter unchanged). Sizes: 00 = 66.8 KB (new hero bg + preload), 01-17 = 1.04 MB total. Renderer: canvas.hero-gaze appended inside .hero-robot (inherits filter, opacity, entrance), same cover + position math, built only after load + all frames decoded + lens focus finished, html.motion + fine pointer only. Mapping: pointer x in hero <=35% -> frame 0, >=75% -> frame 17, linear between, rAF lerp 0.12, back to 0 on pointerleave, paused off-screen. M3 pupils removed; system.md exception reworded. RED 4 failing checks -> GREEN 51/51. Playwright 1440/1920/1024: frames load after load, 10%/55%/90% map to frame 0/middle/peak, leave returns to 0, CLS <=0.007, no h-scroll, LCP = robot-gaze-00.webp; touch, reduced-motion, no-JS download no gaze-01+ and show frame 0; canvas vs photo diff mean 0.08/255; M1, M2, Sentientum modal fine. Detector 27 findings, same rules.

- 2026-10-20 R3 done (delegated writer). Causes: (1) only 18 frames drawn with Math.round(current) -> visible steps; (2) lerp 0.12 per frame -> head trailed the pointer ~0.5-0.8 s; (3) a canvas up to 2400 px wide lived inside .hero-robot (CSS filter + opacity), so each canvas change re-rasterized a filtered hero-sized layer, plus getComputedStyle per paint. Fix: 37 frames (clip 0 + 10..45) in img/hero/gaze/00-36.webp, 1760 px wide, grayscale + contrast(1.06) baked into the pixels, q84, 1.19 MB total (old robot-gaze-01..17 removed; robot-gaze-00 stays as bg/preload/LCP, filtered by CSS); canvas is a sibling right after .hero-robot (no filter, opacity 0.82, 200 ms fade-in, then the photo bg is dropped via .is-replaced); canvas bitmap = frame size, drawn 1:1, cover scaling by CSS object-fit/object-position (no per-draw scaling, no getComputedStyle, no resize geometry); createImageBitmap frames; alpha:false context; globalAlpha crossfade of floor/ceil frames; skip draws < 0.01 frame; dt-based easing 1-(1-0.25)^(dt/16.67), settle 0.01. Measured (Playwright, Brave 1920x1080@1 / 1440x900@2, 3 L-R-L cycles, unthrottled -> 4x CPU): before p95 17.1/17.2 ms (4x: 17.1/18.4), >20 ms frames 0.3%/0% (4x: 4.7%/5%), long tasks 0 (4x: 15/17, max 69/61 ms), settle lag 482/739 ms; after p95 16.9/17.2 ms (4x: 17.0/17.0), >20 ms 0%/0% (4x: 2.2%/1.9%), long tasks 0 everywhere, settle lag 235/231 ms. Headless Chromium without GPU (software compositing) is worse after (p50 33 ms at 1920 because every frame now changes; before it only changed on 18 discrete steps) - no long tasks, main thread free. Correctness: canvas vs CSS photo mean abs diff 0.40/0.27 per 255, 10/55/90% screenshots read correctly at 1440 and 1920, CLS <= 0.007, no h-scroll, touch/reduced-motion/no-JS fetch no gaze frames, modal + page scroll fine. RED 4 failing checks -> GREEN 53/53.
- 2026-10-20 R4 done (delegated writer). User report: R3 (55844d6) still laggy and late. Benchmarked 4 techniques in the user's headed Brave (GPU, persistent profile with Energy Saver off, AC power; real `page.mouse.move` sweeps at ~1 move/frame, 8 sweeps, rAF interval probe, LoAF observer, settle lag = real mouse jump 10%->90% until the frontal frame is shown; median of 3 runs). Note: on battery Brave's Energy Saver caps rendering at 30 fps (100% of frames >20 ms for every variant, including the effect switched off), so on-battery numbers are not comparable.

  | Variant | viewport | frames >20 ms | p95 | worst | LoAF | settle lag | active after load | bytes |
  |---|---|---|---|---|---|---|---|---|
  | effect off (control) | 1904x960 | 0% | 16.9 | 18 | none | - | - | 0 |
  | A canvas crossfade (55844d6) | 1904x960 | 24.8% | 33.4 | 50 | 66 ms x2 (1 run) | 236 ms | 780 ms | 1227 KB |
  | B canvas, nearest frame, single draw, 1600w, ease 20 ms | 1904x960 | 4.8% | 17.7 | 34 | none | 74 ms | 795 ms | 960 KB |
  | C video scrub, all-intra H.264 1600w, ease 20 ms | 1904x960 | 0% | 16.8 | 18 | none | 93 ms | 827 ms | 992 KB |
  | D stacked img + opacity (will-change), 1600w, ease 20 ms | 1904x960 | 6.2% | 33.3 | 34 | none | 78 ms | 918 ms | 960 KB (~328 MB layer textures) |
  | effect off (control) | 1440x900 | 0.1% | 16.8 | 29 | none | - | - | 0 |
  | A | 1440x900 | 0% | 16.8 | 18 | none | 231 ms | 771 ms | 1227 KB |
  | B | 1440x900 | 0% | 16.8 | 17 | none | 81 ms | 761 ms | 960 KB |
  | C | 1440x900 | 0.3% | 16.8 | 33 | none | 97 ms | 830 ms | 992 KB |
  | D | 1440x900 | 2.6% | 16.8 | 50 | none | 79 ms | 1171 ms | 960 KB (~234 MB layer textures) |
  | shipped (C, final code) | 1904x960 | 0% | 16.9 | 18 | none | 96 ms | 783 ms | 992 KB |
  | shipped (C, final code) | 1440x900 | 0% | 16.9 | 18 | none | 95 ms | 735 ms | 992 KB |

  Winner: C. It is the only variant that holds 60 fps on the 1904 px hero (the canvas variants pay a script-side texture upload per frame change; stacked imgs need ~37 hero-sized composited layers), seek latency p50 1-10 ms / p95 4-46 ms with one seek in flight, settle ~95 ms. A 5-run repeat at 1904 gave 0% >20 ms, worst 17-31 ms. JS heap ~2 MB in every variant. Implementation: img/hero/gaze.mp4 (clip frames 0,10..45 = 37 frames at 24 fps, grayscale + contrast(1.06) baked in, 1600x894, libx264 High, crf 23, -g 1 all-intra, yuv420p bt709, +faststart, 992 KB); `<video class="hero-gaze">` muted/playsinline/aria-hidden, never played, created after `load`, shown after canplaythrough + lens focus, sibling after .hero-robot (same CSS rule as before: no filter, opacity 0.82, object-fit cover, 42% center); nearest frame = Math.round of the eased position, seek to (index + 0.5) / 24, the newest wanted frame is applied on `seeked`; ease 1 - exp(-dt / 20 ms); browsers that cannot play H.264 (canPlayType) keep the photo. img/hero/gaze/00-36.webp removed (1.19 MB). system.md wording unchanged (still pre-rendered frames from the clip, eased). RED: 4 failing checks (3 new R4 checks + updated R2 gating check) -> GREEN 53/53. Correctness in Brave 1440/1904: frame 0 vs CSS-filtered photo mean abs diff 0.33/0.29 per 255, 10/55/90% -> frames 0/19/36 and 0/18/36, pointerleave -> 0, CLS 0.007/0.004, no h-scroll, LCP = robot-gaze-00.webp, Sentientum modal opens/closes, html.motion (M1) present, M2 metric reveals run, no page errors; touch 375, reduced-motion and no-JS fetch nothing beyond robot-gaze-00 and create no video.
- 2026-10-20 R5 scroll perf (delegated writer, single). Status: partial (desktop 1904 and phone targets met; desktop CPU 4x not met).
  Harness (scratchpad, not committed): headed Brave (GPU), CDP Input.synthesizeScrollGesture down 6000 px then back up at 2500 px/s, rAF frame deltas + long-animation-frame (LoAF) observer, CDP Tracing during one run. Each browser is closed after every run.
  Trace findings (desktop 1904, before): the renderer main thread is light (BeginMainFrame max 12 ms, style + layout + paint < 6 ms/frame) and LoAFs of 60-430 ms carry no script and ~1-3 ms of render. The frame gaps are compositor-side: the compositor kept drawing but sent no BeginMainFrame for up to 333 ms because the pending tree could not activate (`activate_tile_tasks_completed: false`); the GPU main thread spent 285 of those 335 ms blocked in `DXGISwapChainImageBacking::Present` (~14 ms each), starving tile raster. Average Present cost: 4.0 ms with the gaze video + filtered photo, 1.9 ms with no video, 0.8 ms with the video but no filter on `.hero-robot`. Image decode (one 76 ms YUV decode) and GPU raster flushes (up to 51 ms) are secondary.
  Bisect (desktop 1904, % frames > 20 ms per run; noisy: the user's own Brave was running alongside):
  | variant | runs | result |
  |---|---|---|
  | base | 5 | 14.7 / 16.2 / 15.9 / 48.8 / 17.1, worst 283-350 ms |
  | all CSS `filter` off | 5 | 2.4 / 1 / 1 / 1.7 / 4.3, worst 25-85 ms |
  | `.hero-robot` filter off | 5 | 4.1 / 0 / 0.3 / 0 / 0, worst 17-58 ms |
  | media-card img filter off | 5 | 4.8 / 13.4 / 14.2 / 13.7 / 1.4 (no effect) |
  | team photo filter off | 5 | 10.3 / 1 / 28.4 / 46.1 / 20.6 (no effect) |
  | no gaze video (canPlayType "") | 5 | 0.7 / 0 / 0.3 / 0 / 0 |
  | reduced motion (no video, no M1/M2) | 5 | 2.4 / 5.4 / 1 / 0 / 0 |
  | heading text-shadow off, opaque header, Sentientum bg off, hero-shade off, scroll-behavior auto, content-visibility:auto, fonts blocked | 3 each | no consistent effect |
  Culprit: the CSS filter on the hero photo layer that sits under the gaze video (the lens-focus animation, fill `both`, kept `grayscale contrast blur(0)` on it even after the photo was dropped).
  Fix: grayscale + contrast(1.06) baked into img/hero/robot-gaze-00.webp (from the clip's frame 0 PNG, same luma/contrast math as gaze.mp4, q88, 66.8 KB -> 51.3 KB); `.hero-robot` has no `filter`; robot-focus animates `blur(8px) -> blur(0)` + scale only, with fill `backwards`, so after the entrance nothing filtered or transformed remains under the video. Team/media/Sentientum images unchanged (bisect showed no effect).
  Before / after (headed Brave, 3 runs each, % frames > 20 ms, median):
  | config | before | after |
  |---|---|---|
  | desktop 1904 | 2.7% (runs 2.7/11.3/0.7; 16 runs pooled across the session: median ~10.7%, LoAF > 100 ms in most runs, worst 300-430 ms) | 0.7% (runs 4.4/0.7/0.7; 8 runs pooled: median 1.3%, LoAF > 100 ms in 2 of 8 runs, 111/114 ms) |
  | desktop 1904, CPU 4x | 14.9% | 52.7% in a heavily loaded session; interleaved A/B in the same session: HEAD 64/59.8/54.8% vs fix 62.4/71.6/63.8% (no change; not met) |
  | phone 390x844 DPR3 touch, CPU 4x | 0.3%, load 2.7-3.6 s | 0.6%, load 3.1-3.4 s |
  Desktop CPU 4x is main-thread bound: ~20 ms BeginMainFrame per frame, mostly style recalc and repaint from CSS transitions on non-composited properties (M2 flow/capability color + border transitions, the header indicator crossfade, hover border/color transitions as cards pass under the pointer). Disabling all transitions gave 5.6/9.5/6.3%; changing them would change the designed motion, so it is left for a product decision.
  Phone: the 30 s `load` timeout did not reproduce; with CPU 4x set before navigation the page reaches `load` in ~3 s (DOMContentLoaded ~6 s in the first cold diagnostic run). Likely cause: the old harness throttled/brought the tab to front after navigation in a headed window that was not focused. Bytes on touch: ~229 KB (HTML 36 KB, CSS 38 KB, JS 51 KB, hero photo 51 KB, wordmark 7 KB, Sentientum card 11 KB, fonts 35 KB); no gaze video is requested on touch.
  Checks: RED 1 new R5 check (no `filter` in any `.hero-robot` rule, robot-focus blur-only, fill `backwards`) -> GREEN 54/54. Correctness (Brave 1440/1904): gaze video present and replaces the photo, video frame 0 vs photo diff 0.455/0.434 per 255, 10/55/90% -> frames 0/19/36 and 0/18/36, pointerleave -> 0, CLS 0.007/0.004, no h-scroll, LCP robot-gaze-00.webp, Sentientum modal opens/closes, M1 present, M2 reveals run, no page errors; touch/reduced-motion/no-JS: nothing beyond robot-gaze-00, no video, CLS <= 0.015. Visual diff vs before (full page, reduced motion): hero 0.23/255 mean at 1440 and 1904 (max 9), 0.16 at 375 (max 4); every other section 0.00; motion hero (video) 0.00 desktop, 0.26 at 375. Impeccable detector: 27 findings (baseline 27).
