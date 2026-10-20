import pw from "playwright-core";
const browser = await pw.chromium.launch({ headless: false, executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", args: ["--window-size=1920,1080", "--window-position=0,0"] });
const targets = process.argv.slice(2);
for (const url of targets) {
  const page = await browser.newPage({ viewport: { width: 1904, height: 960 } });
  await page.goto(url + "?nocache=" + Date.now(), { waitUntil: "load" });
  await page.bringToFront();
  const t0 = Date.now(); await page.waitForSelector("canvas.hero-gaze", { timeout: 20000 }).catch(() => {});
  const activeAfterLoad = Date.now() - t0;
  await page.waitForTimeout(1000);
  await page.evaluate(() => { window.__d = []; window.__loaf = []; let last = performance.now(); const f = t => { window.__d.push(t - last); last = t; window.__raf = requestAnimationFrame(f); }; window.__raf = requestAnimationFrame(f);
    try { new PerformanceObserver(l => l.getEntries().forEach(e => window.__loaf.push(Math.round(e.duration)))).observe({ type: "long-animation-frame" }); } catch {} });
  const box = await page.evaluate(() => { const r = (document.querySelector(".hero") || document.querySelector("canvas.hero-gaze").parentElement).getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const y = box.y + box.h * 0.5;
  for (let i = 0; i < 3; i++) {
    await page.mouse.move(box.x + box.w * 0.1, y); await page.mouse.move(box.x + box.w * 0.9, y, { steps: 45 });
    await page.mouse.move(box.x + box.w * 0.1, y, { steps: 45 });
  }
  // settle lag: jump to right, sample a canvas patch each frame until it stops changing
  const settle = await page.evaluate(async () => {
    const c = document.querySelector("canvas.hero-gaze"); if (!c) return null; const ctx = c.getContext("2d");
    const hero = document.querySelector(".hero") || c.parentElement; const r = hero.getBoundingClientRect();
    hero.dispatchEvent(new PointerEvent("pointermove", { clientX: r.left + r.width * 0.9, clientY: r.top + r.height / 2, pointerType: "mouse", bubbles: true }));
    const start = performance.now(); let prev = "", stableSince = start;
    while (performance.now() - start < 3000) { await new Promise(requestAnimationFrame);
      const d = ctx.getImageData(c.width * 0.45 | 0, c.height * 0.4 | 0, 6, 6).data.join(); if (d !== prev) { prev = d; stableSince = performance.now(); } else if (performance.now() - stableSince > 250) break; }
    return Math.round(stableSince - start);
  });
  const r = await page.evaluate(() => { cancelAnimationFrame(window.__raf); const d = window.__d.slice(3).sort((a, b) => a - b); const q = p => Math.round(d[Math.floor(d.length * p)] * 10) / 10; return { frames: d.length, p50: q(.5), p95: q(.95), max: Math.round(d[d.length - 1]), over20: Math.round(100 * d.filter(x => x > 20).length / d.length) + "%", loaf: window.__loaf, mem: performance.memory && Math.round(performance.memory.usedJSHeapSize / 1e6) }; });
  console.log(url, JSON.stringify({ activeAfterLoadMs: activeAfterLoad, settleMs: settle, ...r }));
  await page.close();
}
await browser.close();
