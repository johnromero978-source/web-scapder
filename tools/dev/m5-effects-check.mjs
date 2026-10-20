import pw from "playwright-core";
const OUT = "./m5";
const mode = process.argv[2] || "desktop";
const URL = "http://localhost:8766/?nc=" + Date.now();
let fail = 0;
const ok = (n, c, x = "") => { if (!c) fail++; console.log((c ? "PASS " : "FAIL ") + n + (x ? " -> " + x : "")); };
const clsInit = () => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); };
const scrollToEl = (p, sel, frac = 0.35) => p.evaluate(([sel, frac]) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect(); document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, window.scrollY + r.top - innerHeight * frac); }, [sel, frac]);
// real heading text without the decode layer
const realTexts = (p) => p.evaluate(() => [...document.querySelectorAll(".hero .system-line, main section h2")].map((h) => { const c = h.cloneNode(true); c.querySelectorAll(".decode-layer").forEach((n) => n.remove()); return { id: h.id || "tagline", text: c.textContent.replace(/\s+/g, " ").trim() }; }));
const names = async (p, list) => { const res = []; for (const { id, text } of list) { if (id === "tagline") continue; res.push(await p.getByRole("heading", { name: text, exact: true }).count()); } return res; };

const b = await pw.chromium.launch({ headless: false, executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe" });
try {
  const ctxOpts = {
    desktop: { viewport: { width: 1440, height: 900 } },
    mobile: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    lite: { viewport: { width: 1440, height: 900 } },
    reduced: { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
    nojs: { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false },
  }[mode];
  const ctx = await b.newContext(ctxOpts);
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(String(e)));
  if (mode !== "nojs") await p.addInitScript(clsInit);
  if (mode === "lite") await p.addInitScript(() => Object.defineProperty(Navigator.prototype, "deviceMemory", { get: () => 2 }));
  await p.goto(URL, { waitUntil: "load" }); await p.bringToFront();

  if (mode === "desktop" || mode === "mobile") {
    // tagline mid-decode right after load
    await p.waitForTimeout(150);
    const tag = await p.evaluate(() => { const t = document.querySelector(".system-line"); const l = t.querySelector(".decode-layer"); return { decoding: t.classList.contains("is-decoding"), layer: l?.textContent.trim() }; });
    ok(`${mode}: hero tagline decodes on load (layer differs from real text)`, tag.decoding && tag.layer && tag.layer !== "Your Data has a Voice", JSON.stringify(tag));
    ok(`${mode}: H1 never decodes`, await p.evaluate(() => !document.querySelector("#hero-title .decode-layer") && !document.querySelector("#hero-title.is-decoding")));
    await p.screenshot({ path: `${OUT}/${mode}-hero-decode.png`, clip: mode === "desktop" ? { x: 0, y: 300, width: 900, height: 600 } : undefined });
    await p.waitForTimeout(1000);
    const real = await realTexts(p);
    ok(`${mode}: tagline final text exact`, await p.evaluate(() => { const t = document.querySelector(".system-line"); return !t.querySelector(".decode-layer") && !t.classList.contains("is-decoding") && t.textContent.trim() === "Your Data has a Voice"; }));
    const armed = await p.evaluate(() => [...document.querySelectorAll("main section h2")].filter((h) => h.classList.contains("is-decoding")).length);
    ok(`${mode}: below-fold h2s are armed (encoded until read)`, armed >= 6, String(armed));
    ok(`${mode}: accessible names == real text while armed`, (await names(p, real)).every((n) => n === 1));
    // heading box before
    const box0 = await p.evaluate(() => { const h = document.querySelector("#cases-title"); const r = h.getBoundingClientRect(); const l = h.querySelector(".decode-layer").getBoundingClientRect(); return { h: r.height, w: r.width, lh: l.height }; });
    ok(`${mode}: layer box equals heading box`, Math.abs(box0.h - box0.lh) < 1, JSON.stringify(box0));
    await scrollToEl(p, "#cases-title", 0.3);
    await p.waitForTimeout(280);
    const mid = await p.evaluate(() => { const h = document.querySelector("#cases-title"); const l = h.querySelector(".decode-layer"); const real = [...h.childNodes].filter((n) => n !== l).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim(); return { decoding: h.classList.contains("is-decoding"), layer: l?.textContent.replace(/\s+/g, " ").trim(), real, fill: getComputedStyle(h).webkitTextFillColor, h: h.getBoundingClientRect().height }; });
    ok(`${mode}: cases h2 mid-scramble (layer partially decoded, real text untouched)`, mid.decoding && mid.layer !== mid.real && mid.real === "Casos documentados en datos reales.", JSON.stringify(mid));
    ok(`${mode}: accessible names == real text during scramble`, (await names(p, real)).every((n) => n === 1));
    await p.screenshot({ path: `${OUT}/${mode}-h2-mid-scramble.png` });
    await p.waitForTimeout(900);
    const done = await p.evaluate(() => { const h = document.querySelector("#cases-title"); return { decoding: h.classList.contains("is-decoding"), layer: !!h.querySelector(".decode-layer"), text: h.textContent.replace(/\s+/g, " ").trim(), h: h.getBoundingClientRect().height, fill: getComputedStyle(h).webkitTextFillColor }; });
    ok(`${mode}: scramble completes with exact text and same box`, !done.decoding && !done.layer && done.text === "Casos documentados en datos reales." && Math.abs(done.h - box0.h) < 0.5, JSON.stringify(done));
    ok(`${mode}: accessible names == real text after`, (await names(p, real)).every((n) => n === 1));

    // metric scan
    await scrollToEl(p, ".case-card .case-metrics", 0.6);
    await p.waitForTimeout(330);
    const scan = await p.evaluate(() => { const c = document.querySelector(".case-card"); const ul = c.querySelector(".case-metrics"); const t = getComputedStyle(ul, "::before").transform; return { inn: c.classList.contains("metrics-in"), t, nums: [...ul.querySelectorAll("strong")].map((s) => s.textContent) }; });
    ok(`${mode}: metric scan running (cover mid-sweep), numbers are real text`, scan.inn && scan.t !== "none" && scan.nums.join("|") === "20,000+|300|5", JSON.stringify(scan));
    await p.locator(".case-card").first().screenshot({ path: `${OUT}/${mode}-metric-mid-scan.png` });
    await p.waitForTimeout(900);
    const scanDone = await p.evaluate(() => { const c = document.querySelector(".case-card"); return { done: c.classList.contains("metrics-done"), before: getComputedStyle(c.querySelector(".case-metrics"), "::before").content }; });
    ok(`${mode}: scan finishes and the cover is removed`, scanDone.done && scanDone.before === "none", JSON.stringify(scanDone));

    // signal line
    const sig = async () => p.evaluate(() => { const l = document.querySelector(".signal-line"); if (!l) return null; const fills = [...l.querySelectorAll(".signal-fill")].map((f) => { const m = /matrix\(([^)]+)\)/.exec(getComputedStyle(f).transform); return m ? +m[1].split(",")[3] : 0; }); return { display: getComputedStyle(l).display, segs: fills.length, sum: +fills.reduce((a, b) => a + b, 0).toFixed(3), reached: l.querySelectorAll(".signal-tap.is-reached").length, labels: document.querySelectorAll(".section-index.is-reached").length }; });
    const s1 = await sig();
    if (mode === "desktop") {
      await scrollToEl(p, "#edgesight-title", 0.3); await p.waitForTimeout(400);
      const s2 = await sig();
      ok("desktop: signal line progresses with scroll", s1 && s2 && s2.sum > s1.sum && s2.reached > s1.reached && s2.labels === s2.reached, JSON.stringify([s1, s2]));
      await p.screenshot({ path: `${OUT}/desktop-signal-line.png`, clip: { x: 0, y: 0, width: 520, height: 900 } });
    } else {
      ok("mobile: signal line hidden at 375", !s1 || s1.display === "none", JSON.stringify(s1));
      ok("mobile: no horizontal scroll", await p.evaluate(() => document.documentElement.scrollWidth <= 375), String(await p.evaluate(() => document.documentElement.scrollWidth)));
    }

    // Edge Sight + reticle
    await scrollToEl(p, "[data-edge-stage]", 0.2); await p.waitForTimeout(2200);
    const playing = await p.evaluate(() => { const v = document.querySelector("[data-edge-stage] video"); return !v.paused && v.currentTime > 0; });
    ok(`${mode}: Edge Sight demo plays when visible`, playing);
    if (mode === "desktop") {
      const r = await p.locator("[data-edge-stage]").boundingBox();
      await p.mouse.move(r.x + 10, r.y + 10);
      await p.mouse.move(r.x + r.width * 0.42, r.y + r.height * 0.61, { steps: 8 });
      await p.waitForTimeout(400);
      const ret = await p.evaluate(() => { const s = document.querySelector("[data-edge-stage]"); const t = s.querySelector(".edge-reticle"); const m = /matrix\(([^)]+)\)/.exec(getComputedStyle(t).transform); const v = m ? m[1].split(",").map(Number) : []; return { on: t.classList.contains("is-on"), op: getComputedStyle(t).opacity, cursor: getComputedStyle(s).cursor, pe: getComputedStyle(t).pointerEvents, x: v[4], y: v[5], w: s.clientWidth, h: s.clientHeight, text: t.textContent }; });
      ok("desktop: reticle follows the pointer over the stage", ret.on && Math.abs(ret.x - ret.w * 0.42) < 2 && Math.abs(ret.y - ret.h * 0.61) < 2 && ret.cursor === "none" && ret.pe === "none" && /x 0\.4[12] · y 0\.6[01]/.test(ret.text), JSON.stringify(ret));
      await p.waitForTimeout(200);
      await p.locator(".comparison-card").screenshot({ path: `${OUT}/desktop-reticle.png` });
      // a click through the reticle lands on the stage, not the reticle
      const hit = await p.evaluate(([x, y]) => document.elementFromPoint(x, y)?.className || "", [r.x + r.width * 0.42, r.y + r.height * 0.61]);
      ok("desktop: reticle never takes hits", !String(hit).includes("edge-reticle"), String(hit));
      // slider still works
      const range = await p.locator("[data-comparison-range]").boundingBox();
      await p.mouse.move(range.x + range.width * 0.5, range.y + range.height / 2);
      const off = await p.evaluate(() => ({ on: document.querySelector(".edge-reticle").classList.contains("is-on"), cursor: getComputedStyle(document.querySelector("[data-comparison-range]")).cursor }));
      await p.mouse.down(); await p.mouse.move(range.x + range.width * 0.85, range.y + range.height / 2, { steps: 6 }); await p.mouse.up();
      const val = await p.evaluate(() => [Number(document.querySelector("[data-comparison-range]").value), document.querySelector("[data-comparison]").style.getPropertyValue("--comparison")]);
      ok("desktop: leaving the stage hides the reticle; slider drag still works", !off.on && val[0] > 70, JSON.stringify([off, val]));
      const tg = p.locator("[data-edge-toggle]");
      if (await tg.isVisible()) {
        const before = await p.evaluate(() => document.querySelector("[data-edge-stage] video").paused);
        await tg.click(); await p.waitForTimeout(300);
        const after = await p.evaluate(() => document.querySelector("[data-edge-stage] video").paused);
        ok("desktop: play/pause button still works", before !== after, `${before}->${after}`);
        await tg.click();
      } else ok("desktop: play/pause button (hidden while autoplaying, skipped)", true);
      // nav underline + button fill on hover
      await scrollToEl(p, "#contact-title", 0.3); await p.waitForTimeout(300);
      const link = p.locator('.nav a[href="#cases"]');
      await link.hover(); await p.waitForTimeout(300);
      const ul = await p.evaluate(() => getComputedStyle(document.querySelector('.nav a[href="#cases"]'), "::after").transform);
      const cta = p.locator(".header-cta"); await cta.hover(); await p.waitForTimeout(300);
      const fillT = await p.evaluate(() => getComputedStyle(document.querySelector(".header-cta"), "::before").transform);
      ok("desktop: nav underline drawn and primary fill on hover", /matrix\(1, 0, 0, 1/.test(ul) && /matrix\(1, 0, 0, 1/.test(fillT), `${ul} | ${fillT}`);
      await p.screenshot({ path: `${OUT}/desktop-header-hover.png`, clip: { x: 0, y: 0, width: 1440, height: 90 } });
      // robot gaze
      await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
      ok("desktop: robot gaze layer present", await p.evaluate(() => !!document.querySelector(".hero-gaze")));
      // Sentientum modal
      await p.locator('[data-modal-open="sentientum-modal"]').first().scrollIntoViewIfNeeded();
      await p.locator('[data-modal-open="sentientum-modal"]').first().click(); await p.waitForTimeout(400);
      const open = await p.evaluate(() => !document.getElementById("sentientum-modal").hidden);
      await p.keyboard.press("Escape"); await p.waitForTimeout(300);
      const closed = await p.evaluate(() => document.getElementById("sentientum-modal").hidden);
      ok("desktop: Sentientum modal opens and closes", open && closed);
      // language switch releases decodes
      await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
      await p.locator('.language-option[data-lang="en"]').click(); await p.waitForTimeout(200);
      const lang = await p.evaluate(() => ({ decoding: document.querySelectorAll(".is-decoding").length, layers: document.querySelectorAll(".decode-layer").length }));
      ok("desktop: language switch shows every heading final", lang.decoding === 0 && lang.layers === 0, JSON.stringify(lang));
      await p.locator('.language-option[data-lang="es"]').click();
    } else {
      ok("mobile: no reticle on touch", await p.evaluate(() => !document.querySelector(".edge-reticle")));
    }
    // decode everything by scrolling through, then CLS
    for (let y = 0; y < 14; y++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(120); }
    await p.waitForTimeout(1200);
    ok(`${mode}: all headings resolved after scrolling through`, await p.evaluate(() => document.querySelectorAll(".decode-layer").length === 0));
    const cls = await p.evaluate(() => window.__cls);
    ok(`${mode}: CLS < 0.05`, cls < 0.05, cls.toFixed(4));
    ok(`${mode}: lite stayed off`, await p.evaluate(() => !document.documentElement.classList.contains("motion-lite")));
  } else {
    // calm versions
    await p.waitForTimeout(800);
    const st = await p.evaluate(() => ({ motion: document.documentElement.className, layers: document.querySelectorAll(".decode-layer").length, decoding: document.querySelectorAll(".is-decoding").length, line: document.querySelectorAll(".signal-line").length, reticle: document.querySelectorAll(".edge-reticle").length, armed: document.querySelectorAll(".metrics-armed").length }));
    ok(`${mode}: no decode, line, reticle or armed metrics`, st.layers === 0 && st.decoding === 0 && st.line === 0 && st.reticle === 0 && st.armed === 0, JSON.stringify(st));
    await scrollToEl(p, "#cases-title", 0.15); await p.waitForTimeout(500);
    const vis = await p.evaluate(() => { const h = document.querySelector("#cases-title"); const m = document.querySelector(".case-metrics"); return { text: h.textContent.replace(/\s+/g, " ").trim(), fill: getComputedStyle(h).webkitTextFillColor, cover: getComputedStyle(m, "::before").content, op: getComputedStyle(m.querySelector("li")).opacity }; });
    ok(`${mode}: headings and metrics in final state`, vis.text === "Casos documentados en datos reales." && vis.fill !== "rgba(0, 0, 0, 0)" && vis.cover === "none" && vis.op === "1", JSON.stringify(vis));
    await p.screenshot({ path: `${OUT}/${mode}-calm-cases.png` });
    await scrollToEl(p, "[data-edge-stage]", 0.2); await p.waitForTimeout(600);
    const r = await p.locator("[data-edge-stage]").boundingBox();
    await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.waitForTimeout(200);
    ok(`${mode}: native cursor over the video`, await p.evaluate(() => getComputedStyle(document.querySelector("[data-edge-stage]")).cursor !== "none"));
    if (mode !== "nojs") {
      const cls = await p.evaluate(() => window.__cls);
      ok(`${mode}: CLS < 0.05`, cls < 0.05, cls.toFixed(4));
    }
  }
  ok(`${mode}: no page errors`, errors.length === 0, errors.join(" | "));
} finally {
  await b.close();
}
console.log(fail ? `${mode}: ${fail} FAILED` : `${mode}: all passed`);
process.exit(fail ? 1 : 0);
