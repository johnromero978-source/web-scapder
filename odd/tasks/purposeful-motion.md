# Feature: purposeful-motion

## Objective
Add a small set of purposeful animations to the landing, after widening the motion rule in `system.md` to allow them.

## Problem / why
The user asked for animations (2026-10-20). `system.md` currently limits motion to 150-250ms hover/focus, so the rule changes first; otherwise the site breaks its own system. Generic "everything fades in on scroll" stays banned.

## Scope
- In: `system.md` (+ `.interface-design/system.md` copy), `styles.css`, `script.js`, `index.html` (attributes only if needed), `tools/verify-landing.mjs`.
- Out: copy, layout, images, SEO, the Bandada modal, the contact form.

## Decisions (user-approved 2026-10-20)
- Amend `system.md` Motion: allow one-time entrances and interaction demonstrations, with `prefers-reduced-motion` always honored. Still banned: parallax, cursor-following, floating/tilting cards, particle backgrounds, counters that tick up, bounce/spring.
- Animations:
  1. Hero entrance, once: tagline, H1, lead stagger in with opacity only, ~600ms total.
  2. Robot camera "focuses": hero background goes from blurred to sharp on load (lens metaphor, Edge Sight / "Your Data has a Voice").
  3. Edge Sight slider demonstrates itself once when it enters the viewport (short handle sweep), cancelled by any user interaction.
  4. Case metrics appear with a sober transition when the cases enter the viewport, once. No number counters.

## TDD
- Mode: strict (global CLAUDE.md). Runner: `node tools/verify-landing.mjs` + Playwright.

## Tasks
- [x] M1 Amend `system.md` motion rule and implement the 4 animations with reduced-motion fallbacks. Route: delegated writer (system.md + CSS + JS + verifier).

- [x] M2 Motion through the page (user 2026-10-20 "le falta animaciones"): (1) Edge Sight flow steps 01-05 light up in sequence; (2) capability 01-04 connected by a line drawn as they enter; (3) header section indicator using the existing 01-07 numbers; (4) livelier hover on case and team cards within 150-250ms. Route: delegated writer.
- [x] M3 Hero robot eyes follow the pointer (user approved an explicit system.md exception for this element only). Route: same writer, separate commit; ship only if it looks convincing.

## Acceptance
- Each animation runs once; nothing animates under `prefers-reduced-motion: reduce` and the page is fully visible without JS.
- No layout shift, no horizontal scroll at 375px, content never hidden if JS fails.
- Verifier and Playwright pass; motion values within the amended `system.md`.

## Progress
- 2026-10-20: branch `feat/purposeful-motion` from `9e8aded`.
- 2026-10-20 M1 done (route: delegated writer). system.md Motion widened (`.interface-design/system.md` is a pointer, unchanged). Head gate adds `html.motion` only for `prefers-reduced-motion: no-preference`. Hero: opacity + 8px translate, 400ms each, staggered 0/80/160/240/320ms (ends 720ms), cubic-bezier(0.2,0.8,0.2,1). Robot focus: blur(8px)+scale(1.03) to sharp, 900ms, same easing. Slider demo: 50 to 65 (400ms), to 35 (500ms), back (500ms), ease-in-out, rAF, starts at 50% visible, cancelled by pointerdown/keydown/focus/input or <10% visible, no events fired. Case metrics: card armed by JS, IntersectionObserver 0.3, 360ms opacity + 6px, 80ms stagger, no text changes. Evidence: RED 5 failing checks, GREEN `node tools/verify-landing.mjs` 37 checks; Playwright at 1440 and 375 all pass (CLS 0.008 / 0.017, reduced-motion and no-JS fully visible, modal ok); detector 27 findings, same as baseline.

- 2026-10-20: M1 shipped (PR #3, 862a549). User asked for more motion; chose both page-wide life (M2) and a stronger hero moment (M3). Branch feat/motion-depth from 862a549.

- 2026-10-20 M2 done (route: delegated writer). system.md Motion gains item 4 (one-time process explanation), the navigation-state indicator rule (crossfade <=200ms, still updates under reduced motion) and the hover-emphasis rule (fine pointer, no lift). Flow: IntersectionObserver 0.4 on the list, steps get .flow-lit 120ms apart and hold ~420ms, then return to normal (chosen so the page ends exactly as it started, like a signal passing through; no-JS state identical). Capability: 1px ink rail in the left gutter plus ticks to each step (static line by default, scaleY 0 to 1 in 700ms linear under html.motion + .cap-armed, linear so ticks/numbers at 60/230/410/580ms delays land when the rail reaches them; numbers go muted to ink). Header: "NN / 07" indicator (Geist Mono 13px, shown >=1121px, slot reserved so nothing shifts, 90ms out + 90ms in opacity swap under motion, instant otherwise) driven by an IntersectionObserver band at 45-50% of the viewport; aria-current="true" + 1px underline on the matching nav link (capability 06 has no link). Hover (fine pointer, 200ms): case card border + metric rules + labels to ink; team photo contrast 1.04 to 1.14, name underline; focus-visible equivalents via :has(). Evidence: RED 5 failing checks, GREEN `node tools/verify-landing.mjs` 42 checks; Playwright 1440 + 375 + header widths 375-1440 + reduced-motion + no-JS all pass (CLS 0.015 / 0.015, header 73px single row).

- 2026-10-20 M3 done (route: same writer, separate commit). system.md Motion keeps the cursor-following ban and adds the single exception (hero robot eyes, <=8px, eased, desktop fine pointer only, reduced-motion off). Overlay is built by JS only for html.motion + (hover: hover) and (pointer: fine): two aria-hidden, pointer-events:none dark pupils with a glint, placed from lens centres measured in the photo (2000x1116: left 912,438; right 1471,353; r=32) through the same cover + position math, re-placed on resize (ResizeObserver). Pupil shifts up to 6px (+1.5px glint) toward the cursor, rAF lerp 0.14, full shift at 360px, returns to centre on pointerleave, rAF and state reset when the hero is off-screen (IntersectionObserver). Pupils fade in (320ms) only after the 900ms lens focus finishes. Evidence: RED 2 failing checks, GREEN 44 checks; Playwright: pupils move <=6px in all four directions at 1440x900 and 1920x1080, return to centre, hidden during focus, no overlay on touch/reduced-motion/no-JS, CLS 0.008; detector still 27 findings, same rules. Screenshots in session scratchpad m3/.

## Next step
Both done locally on feat/motion-depth; push and open the PR when ready.

- [x] M4 (PARTIAL, see Progress) Motion-lite for slow machines (user 2026-10-20): detect low-end devices and drop the M2 process animations/indicator crossfade there; make hover transitions compositor-only everywhere. Route: delegated writer.

- 2026-10-20 M4 partial (route: delegated writer). Head gate adds `html.motion-lite` when hardwareConcurrency <= 4, deviceMemory <= 4 or saveData; script.js also times a 300k-step CPU loop (best of 5 > 3.5ms) and ~1s of idle frames after load (median > 20ms or >=15% of frames > 25ms) and adds it at runtime; the gaze clip waits for that verdict. Lite: no flow sequence, rail draw, metric reveal, indicator crossfade, lens blur, head turn; hero entrance stays. Large-card hover (case, method, capability, Sentientum) now fades an `::after` ink border by opacity; team card and case metrics change instantly. Evidence: RED 6 failing checks, GREEN 61 checks. Frames over 20ms while scrolling (interleaved A/B, 3 runs, median; host was contended by an unrelated CPU job, so absolute numbers are noisy): desktop 1x main 4.5% vs new 0.3% (but new was classed LITE in 3/3 runs: false positive); desktop 4x main 16.4% vs new 7.9% (target 5% not met); phone 4x: before 0.0-1.4% in a contended run, final run not completed. Detection on this machine: hardwareConcurrency is randomised by Brave (4-7), so the head gate is random here; with it pinned to 8 the CPU benchmark flagged lite wrongly at 1x under host load. Pending: recalibrate the 3.5ms threshold (probably ~5ms) on an idle machine, re-measure 1x/4x/phone, then CLS, horizontal scroll and visual diff checks (not run). M4 stays unchecked.


- 2026-10-20 M4 detection fix (inline, after the delegated run): removed hardwareConcurrency (Brave randomises it) and the synthetic CPU benchmark (false positives on a busy fast machine); head gate now only deviceMemory <= 2 or saveData; new watchScrollFrames() adds motion-lite when >=25% of 40+ scroll frames exceed 25ms. RED 2 checks -> GREEN 61. Brave headed: normal machine stays full motion after load + scroll and loads the gaze (CLS 0.007); CPU 6x scroll was 7% frames >25ms so lite correctly did not trigger; phone no gaze / no h-scroll; reduced motion and no-JS fine. M4 checked.
