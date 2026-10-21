# tools/dev — measurement helpers (not deployed)

Scratch tools used on 2026-10-20 to measure motion and scroll performance in a real, headed Brave.
They are not part of the site and the Pages job does not copy them.

- `serve-range.mjs` — static server for the repo root on http://localhost:8766 **with HTTP Range support**.
  Needed for the hero gaze and Edge Sight videos: Chrome cannot seek a video served without Range (206).
- `brave-scroll.mjs <url...>` — scroll smoothness (frames > 20 ms, long animation frames) at desktop, desktop CPU 4x and phone CPU 4x.
- `brave-gaze.mjs <url...>` — hero head-turn smoothness and settle lag with real mouse sweeps.
- `m5-effects-check.mjs` — correctness checks for the M5 effects pass (decode, signal line, metric scan, reticle).
- `edgesight-track.py` / `edgesight-events.py` — YOLOv8m + ByteTrack on the Edge Sight clip -> `img/edgesight/edgesight-tracks.json`.

Setup: `npm i -D playwright-core` in a scratch folder (or here, without committing node_modules), Brave at
`C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe`. Python tools need a venv with `ultralytics`
in a short path (Windows MAX_PATH breaks torch installs in long paths), e.g. `~/.venvs/scapder-cv`.
Some scripts still reference paths from the original session; adjust before running.
Close every browser after each run (they are RAM-heavy).

Before serving locally, build the `/en/` and `/pt/` pages with `node tools/build-language-pages.mjs .` and then `node tools/dev/serve-range.mjs` (the folders are gitignored).
