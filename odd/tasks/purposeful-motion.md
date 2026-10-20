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

## Acceptance
- Each animation runs once; nothing animates under `prefers-reduced-motion: reduce` and the page is fully visible without JS.
- No layout shift, no horizontal scroll at 375px, content never hidden if JS fails.
- Verifier and Playwright pass; motion values within the amended `system.md`.

## Progress
- 2026-10-20: branch `feat/purposeful-motion` from `9e8aded`.
- 2026-10-20 M1 done (route: delegated writer). system.md Motion widened (`.interface-design/system.md` is a pointer, unchanged). Head gate adds `html.motion` only for `prefers-reduced-motion: no-preference`. Hero: opacity + 8px translate, 400ms each, staggered 0/80/160/240/320ms (ends 720ms), cubic-bezier(0.2,0.8,0.2,1). Robot focus: blur(8px)+scale(1.03) to sharp, 900ms, same easing. Slider demo: 50 to 65 (400ms), to 35 (500ms), back (500ms), ease-in-out, rAF, starts at 50% visible, cancelled by pointerdown/keydown/focus/input or <10% visible, no events fired. Case metrics: card armed by JS, IntersectionObserver 0.3, 360ms opacity + 6px, 80ms stagger, no text changes. Evidence: RED 5 failing checks, GREEN `node tools/verify-landing.mjs` 37 checks; Playwright at 1440 and 375 all pass (CLS 0.008 / 0.017, reduced-motion and no-JS fully visible, modal ok); detector 27 findings, same as baseline.

## Next step
Review/PR decision (user).
