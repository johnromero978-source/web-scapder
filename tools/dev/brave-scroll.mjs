import pw from "playwright-core";
const browser = await pw.chromium.launch({ headless: false, executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", args: ["--window-size=1920,1080", "--window-position=0,0"] });
const configs = [
  { name: "desktop", ctx: { viewport: { width: 1904, height: 960 } }, cpu: 1 },
  { name: "desktop-cpu4x", ctx: { viewport: { width: 1904, height: 960 } }, cpu: 4 },
  { name: "phone-cpu4x", ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, cpu: 4 },
];
const urls = process.argv.slice(2);
for (const cfg of configs) for (const url of urls) {
  const runs = [];
  for (let k = 0; k < 2; k++) {
    const ctx = await browser.newContext(cfg.ctx); const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
    await page.goto(url + "?nc=" + Date.now(), { waitUntil: "load" }); await page.bringToFront(); await page.waitForTimeout(2500);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: cfg.cpu });
    await page.evaluate(() => { window.__d = []; window.__loaf = []; let last = performance.now(); const f = t => { window.__d.push(t - last); last = t; window.__raf = requestAnimationFrame(f); }; window.__raf = requestAnimationFrame(f);
      try { new PerformanceObserver(l => l.getEntries().forEach(e => window.__loaf.push(Math.round(e.duration)))).observe({ type: "long-animation-frame" }); } catch {} });
    const H = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const vw = cfg.ctx.viewport.width, vh = cfg.ctx.viewport.height;
    await cdp.send("Input.synthesizeScrollGesture", { x: vw / 2, y: vh / 2, yDistance: -Math.min(H, 6000), speed: 2500, gestureSourceType: cfg.ctx.hasTouch ? "touch" : "mouse", repeatCount: 1 });
    await cdp.send("Input.synthesizeScrollGesture", { x: vw / 2, y: vh / 2, yDistance: Math.min(H, 6000), speed: 2500, gestureSourceType: cfg.ctx.hasTouch ? "touch" : "mouse", repeatCount: 1 });
    const r = await page.evaluate(() => { cancelAnimationFrame(window.__raf); const s = window.__d.slice(2).sort((a, b) => a - b); return { n: s.length, p95: s[Math.floor(s.length * .95)], worst: s[s.length - 1], over20: s.filter(x => x > 20).length / s.length, loaf: window.__loaf }; });
    runs.push(r); await ctx.close();
  }
  const med = k => runs.map(r => r[k]).sort((a, b) => a - b)[0];
  console.log(cfg.name.padEnd(14), url.padEnd(24), `over20 ${Math.round(100 * Math.min(...runs.map(r => r.over20)))}-${Math.round(100 * Math.max(...runs.map(r => r.over20)))}%  p95 ${Math.round(Math.min(...runs.map(r => r.p95)))}-${Math.round(Math.max(...runs.map(r => r.p95)))}ms  worst ${Math.round(Math.max(...runs.map(r => r.worst)))}ms  loaf ${JSON.stringify(runs.map(r => r.loaf))}`);
}
await browser.close();
