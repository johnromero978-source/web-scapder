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
- [ ] R1 Robot frame consistency test (2-3 frames). Route: inline (generation tool).
- [ ] R2 Full frame grid + gaze implementation, remove M3 pupils. Route: delegated writer after R1 approval.

## Progress
- 2026-10-20: branch `feat/sentientum-brand-robot-gaze` from 1b6ba23.
- 2026-10-20 S1 done (delegated writer): whole card opens the modal (stretched ::after on the real button, card-level focus ring, fine-pointer border hover); card wears Bandada identity (img/sentientum/bandada-card.webp 10.7 KB + flat 0.44 scrim, palette #15122e/#efeaff/#cfc6f5/#b9a6f7/#ff9fd6, Martian Mono 800 wordmark + by scapder); system.md sub-brand exception added. RED 4 failed checks -> GREEN 48/48. Playwright 1440x900 + 375x812 all pass: click on text opens modal, focus returns to button, ring contrast 9.15:1, worst text contrast 5.16:1 (sampled pixels), CTA 8.52:1, card heights 420/420/420 and pillars aligned at 1440, no horizontal scroll, other cards unchanged.
