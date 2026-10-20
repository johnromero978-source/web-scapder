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

## Progress
- 2026-10-20: branch `feat/sentientum-brand-robot-gaze` from 1b6ba23.
- 2026-10-20 S1 done (delegated writer): whole card opens the modal (stretched ::after on the real button, card-level focus ring, fine-pointer border hover); card wears Bandada identity (img/sentientum/bandada-card.webp 10.7 KB + flat 0.44 scrim, palette #15122e/#efeaff/#cfc6f5/#b9a6f7/#ff9fd6, Martian Mono 800 wordmark + by scapder); system.md sub-brand exception added. RED 4 failed checks -> GREEN 48/48. Playwright 1440x900 + 375x812 all pass: click on text opens modal, focus returns to button, ring contrast 9.15:1, worst text contrast 5.16:1 (sampled pixels), CTA 8.52:1, card heights 420/420/420 and pillars aligned at 1440, no horizontal scroll, other cards unchanged.

- 2026-10-20 R2 done (delegated writer). Clip: 1928x1076, 24fps, 121 frames; diff vs frame 0 starts moving at frame 10 and plateaus at 45 (frontal pose). 18 frames used: clip indices 0,11,13,15,17,19,21,23,25,27,29,31,33,35,38,41,43,45 saved as img/hero/robot-gaze-00..17.webp (q88, color; CSS grayscale filter unchanged). Sizes: 00 = 66.8 KB (new hero bg + preload), 01-17 = 1.04 MB total. Renderer: canvas.hero-gaze appended inside .hero-robot (inherits filter, opacity, entrance), same cover + position math, built only after load + all frames decoded + lens focus finished, html.motion + fine pointer only. Mapping: pointer x in hero <=35% -> frame 0, >=75% -> frame 17, linear between, rAF lerp 0.12, back to 0 on pointerleave, paused off-screen. M3 pupils removed; system.md exception reworded. RED 4 failing checks -> GREEN 51/51. Playwright 1440/1920/1024: frames load after load, 10%/55%/90% map to frame 0/middle/peak, leave returns to 0, CLS <=0.007, no h-scroll, LCP = robot-gaze-00.webp; touch, reduced-motion, no-JS download no gaze-01+ and show frame 0; canvas vs photo diff mean 0.08/255; M1, M2, Sentientum modal fine. Detector 27 findings, same rules.

- 2026-10-20 R3 done (delegated writer). Causes: (1) only 18 frames drawn with Math.round(current) -> visible steps; (2) lerp 0.12 per frame -> head trailed the pointer ~0.5-0.8 s; (3) a canvas up to 2400 px wide lived inside .hero-robot (CSS filter + opacity), so each canvas change re-rasterized a filtered hero-sized layer, plus getComputedStyle per paint. Fix: 37 frames (clip 0 + 10..45) in img/hero/gaze/00-36.webp, 1760 px wide, grayscale + contrast(1.06) baked into the pixels, q84, 1.19 MB total (old robot-gaze-01..17 removed; robot-gaze-00 stays as bg/preload/LCP, filtered by CSS); canvas is a sibling right after .hero-robot (no filter, opacity 0.82, 200 ms fade-in, then the photo bg is dropped via .is-replaced); canvas bitmap = frame size, drawn 1:1, cover scaling by CSS object-fit/object-position (no per-draw scaling, no getComputedStyle, no resize geometry); createImageBitmap frames; alpha:false context; globalAlpha crossfade of floor/ceil frames; skip draws < 0.01 frame; dt-based easing 1-(1-0.25)^(dt/16.67), settle 0.01. Measured (Playwright, Brave 1920x1080@1 / 1440x900@2, 3 L-R-L cycles, unthrottled -> 4x CPU): before p95 17.1/17.2 ms (4x: 17.1/18.4), >20 ms frames 0.3%/0% (4x: 4.7%/5%), long tasks 0 (4x: 15/17, max 69/61 ms), settle lag 482/739 ms; after p95 16.9/17.2 ms (4x: 17.0/17.0), >20 ms 0%/0% (4x: 2.2%/1.9%), long tasks 0 everywhere, settle lag 235/231 ms. Headless Chromium without GPU (software compositing) is worse after (p50 33 ms at 1920 because every frame now changes; before it only changed on 18 discrete steps) - no long tasks, main thread free. Correctness: canvas vs CSS photo mean abs diff 0.40/0.27 per 255, 10/55/90% screenshots read correctly at 1440 and 1920, CLS <= 0.007, no h-scroll, touch/reduced-motion/no-JS fetch no gaze frames, modal + page scroll fine. RED 4 failing checks -> GREEN 53/53.
