import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), "utf8");

const indexHtml = read("index.html");
const scriptJs = read("script.js");
const workerJs = read("contact-worker/src/worker.mjs");
const endpoint = /<meta name="scapder-contact-endpoint" content="([^"]*)"/.exec(indexHtml)?.[1].trim();
const contactActivationRequired = process.env.SCAPDER_REQUIRE_CONTACT_ENDPOINT === "1";

const checks = [
  {
    name: "hero tagline stays English in Spanish UI",
    pass: scriptJs.includes('heroSystem: "Your Data has a Voice"'),
  },
  {
    name: "lowercase scapder branding in visible core copy",
    pass: indexHtml.includes('<h1 id="hero-title" data-i18n="heroTitle">scapder</h1>'),
  },
  {
    name: "header brand is the monochrome scapder wordmark",
    pass:
      /<a class="brand"[^>]*>\s*<img class="brand-logo" src="img\/logo\/scapder-wordmark-ink\.png"[^>]*alt="scapder"[^>]*width="\d+"[^>]*height="\d+"/s.test(indexHtml) &&
      existsSync(resolve(root, "img/logo/scapder-wordmark-ink.png")),
  },
  {
    name: "mobile menu button comes before the brand (visual and tab order)",
    pass: /<div class="container header-inner">\s*<button\s+class="hamburger"[\s\S]*?<\/button>\s*<a class="brand"/.test(indexHtml),
  },
  {
    name: "contact form uses the API without private routing data",
    pass:
      indexHtml.includes('name="scapder-contact-endpoint"') &&
      indexHtml.includes('name="consent"') &&
      indexHtml.includes('name="website"') &&
      indexHtml.includes('data-form-started-at') &&
      scriptJs.includes('fetch(endpoint') &&
      scriptJs.includes('submissionId: crypto.randomUUID()') &&
      scriptJs.includes('signal: AbortSignal.timeout(') &&
      !scriptJs.includes('mailto:') &&
      !scriptJs.includes('wa.me/') &&
      !scriptJs.includes('CONTACT_RECIPIENTS'),
  },
  {
    name: "contact worker keeps delivery configuration server-side",
    pass:
      workerJs.includes("env.RESEND_API_KEY") &&
      workerJs.includes("env.CONTACT_RECIPIENTS") &&
      workerJs.includes("env.CONTACT_FROM_EMAIL") &&
      workerJs.includes("env.ALLOWED_ORIGINS") &&
      workerJs.includes("env.CONTACT_RATE_LIMITER.limit") &&
      workerJs.includes('"Idempotency-Key"') &&
      workerJs.includes("AbortSignal.timeout("),
  },
  {
    name: "contact endpoint is configured when deployment activation is required",
    pass: !contactActivationRequired || Boolean(endpoint),
  },
  {
    name: "pt-BR support is wired",
    pass:
      indexHtml.includes('data-lang="pt"') &&
      /<button class="language-option" type="button" data-lang="pt">\s*BR\s*<\/button>/.test(indexHtml) &&
      scriptJs.includes('lang === "pt" ? "pt-BR" : lang'),
  },
  {
    // Was an assertion on the fly.io demo URL. The card now opens an in-page
    // dialog instead of leaving the site, so the thing worth pinning moved.
    name: "Sentientum card opens the detail dialog",
    pass:
      indexHtml.includes('data-modal-open="sentientum-modal"') &&
      indexHtml.includes('id="sentientum-modal"') &&
      indexHtml.includes('aria-modal="true"') &&
      scriptJs.includes("[data-modal-open]"),
  },
  {
    // A dialog you cannot close with the keyboard, or that lets Tab wander
    // into the page behind it, is not a dialog.
    name: "detail dialog is keyboard operable",
    pass:
      indexHtml.includes("data-modal-close") &&
      scriptJs.includes('event.key === "Escape"') &&
      scriptJs.includes('event.key !== "Tab"'),
  },
  {
    // The card used to open a YouTube walkthrough. Bandada replaced it, so the
    // old plumbing must be gone rather than lingering as dead code.
    name: "video walkthrough plumbing is gone",
    pass:
      !/youtube|ytimg|sentientumVideos|fly\.dev|data-video|btn-youtube/i.test(indexHtml) &&
      !/youtube|ytimg|sentientumVideos|fly\.dev|data-video|playSentientumVideo/i.test(scriptJs),
  },
  {
    name: "Bandada iframe is mounted on open with a per-language URL, not in the HTML",
    pass:
      scriptJs.includes("bandada.scapder.com/?lang=") &&
      !/<iframe/i.test(indexHtml) &&
      indexHtml.includes("data-bandada-frame") &&
      indexHtml.includes("data-bandada-fullscreen"),
  },
  {
    // A cross-origin iframe in the dialog must be reachable by the Tab trap,
    // and must never take programmatic focus (it would swallow Escape).
    name: "focus trap covers the iframe and never focuses it directly",
    pass:
      /querySelectorAll\('[^']*iframe[^']*'\)/.test(scriptJs) &&
      !/iframe\.focus\(/.test(scriptJs),
  },
  {
    name: "no hover lift (system.md)",
    pass: !read("styles.css").includes("translateY(-2px)"),
  },
  {
    // Every string the page renders must exist in all three dictionaries, or
    // switching language silently leaves the previous one on screen.
    name: "every rendered string exists in es, en and pt",
    pass: (() => {
      const keys = new Set(
        [...indexHtml.matchAll(/data-i18n(?:-html|-aria-label|-alt)?="([^"]+)"/g)].map((m) => m[1]),
      );
      const dictionaries = ["es", "en", "pt"].map((lang) => {
        const start = scriptJs.indexOf(`\t${lang}: {`);
        return scriptJs.slice(start, scriptJs.indexOf("\n\t},", start));
      });
      return [...keys].every((key) => dictionaries.every((d) => d.includes(`${key}:`)));
    })(),
  },
  {
    name: "Edge Sight comparison slider hooks exist",
    pass:
      indexHtml.includes('data-comparison') &&
      indexHtml.includes('data-comparison-range') &&
      scriptJs.includes('document.querySelector("[data-comparison]")') &&
      scriptJs.includes('document.querySelector("[data-comparison-range]")'),
  },
  {
    name: "head carries canonical, robots and theme-color",
    pass:
      /<link rel="canonical" href="https:\/\/scapder\.com\/"/.test(indexHtml) &&
      /<meta name="robots" content="index,follow"/.test(indexHtml) &&
      /<meta name="theme-color" content="#[0-9a-f]{6}"/i.test(indexHtml),
  },
  {
    name: "Open Graph and Twitter card tags are present with an absolute image",
    pass:
      ["og:title", "og:description", "og:url", "og:type", "og:site_name"].every((p) =>
        indexHtml.includes(`property="${p}"`),
      ) &&
      /property="og:image" content="https:\/\/scapder\.com\/img\/og-scapder\.jpg"/.test(indexHtml) &&
      indexHtml.includes('property="og:image:width"') &&
      indexHtml.includes('property="og:image:alt"') &&
      indexHtml.includes('name="twitter:card" content="summary_large_image"') &&
      existsSync(resolve(root, "img/og-scapder.jpg")),
  },
  {
    name: "JSON-LD Organization parses and only links profiles the repo owns",
    pass: (() => {
      const m = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(indexHtml);
      if (!m) return false;
      try {
        const data = JSON.parse(m[1]);
        const nodes = data["@graph"] || [data];
        const org = nodes.find((n) => n["@type"] === "Organization");
        return Boolean(org && org.name === "scapder" && org.url === "https://scapder.com/");
      } catch {
        return false;
      }
    })(),
  },
  {
    name: "favicon set is linked and exists",
    pass:
      /<link rel="icon"[^>]*href="favicon\.ico"/.test(indexHtml) &&
      indexHtml.includes('rel="apple-touch-icon"') &&
      ["favicon.ico", "favicon-32.png", "apple-touch-icon.png"].every((f) => existsSync(resolve(root, f))),
  },
  {
    name: "robots.txt and sitemap.xml exist and ship with the Pages artifact",
    pass: (() => {
      const workflow = read(".github/workflows/pages.yml");
      return (
        existsSync(resolve(root, "robots.txt")) &&
        existsSync(resolve(root, "sitemap.xml")) &&
        /Sitemap: https:\/\/scapder\.com\/sitemap\.xml/.test(read("robots.txt")) &&
        ["robots.txt", "sitemap.xml", "favicon.ico", "favicon-32.png", "apple-touch-icon.png"].every((f) =>
          workflow.includes(f),
        )
      );
    })(),
  },
  {
    name: "language switch updates html lang, title and meta description in all languages",
    pass:
      scriptJs.includes("document.documentElement.lang") &&
      scriptJs.includes("document.title") &&
      scriptJs.includes('meta[name="description"]') &&
      ["es", "en", "pt"].every((lang) => {
        const start = scriptJs.indexOf(`\t${lang}: {`);
        const dict = scriptJs.slice(start, scriptJs.indexOf("\n\t},", start));
        return dict.includes("metaTitle:") && dict.includes("metaDescription:");
      }),
  },
  {
    // Weight is a ranking signal: no image the page asks for may exceed 300 KB (video clips have their own size checks).
    name: "no page image is heavier than 300 KB",
    pass: (() => {
      const urls = [
        ...[...indexHtml.matchAll(/(?:src|srcset|imagesrcset)="([^"]*img\/[^"]*)"/g)].flatMap((m) =>
          m[1].split(",").map((part) => part.trim().split(/\s+/)[0]),
        ),
        ...[...read("styles.css").matchAll(/url\("([^"]*img\/[^"]*)"\)/g)].map((m) => m[1]),
      ];
      return (
        urls.length > 0 &&
        urls.filter((u) => !/\.mp4$/.test(u)).every((u) => {
          const file = resolve(root, decodeURIComponent(u));
          return existsSync(file) && statSync(file).size <= 300 * 1024;
        })
      );
    })(),
  },
  {
    name: "every img has explicit width and height",
    pass: [...indexHtml.matchAll(/<img\b[^>]*>/g)].every((m) => /\swidth="\d+"/.test(m[0]) && /\sheight="\d+"/.test(m[0])),
  },
  {
    // Cards are articles; a <button> wrapping headings and lists is invalid
    // content model and flattens the h3 for assistive tech.
    name: "product cards are articles and no button wraps a heading",
    pass:
      (indexHtml.match(/<article class="product-card[^"]*"/g) || []).length === 3 &&
      !/<button(?:(?!<\/button>)[\s\S])*<h3/i.test(indexHtml),
  },
  {
    name: "Sentientum CTA is a real button inside its article",
    pass: /<article class="product-card[^"]*"[^>]*>(?:(?!<\/article>)[\s\S])*<button[^>]*data-modal-open="sentientum-modal"/.test(indexHtml),
  },
  {
    name: "Edge Sight card links to the #edgesight section",
    pass: /<article class="product-card[^"]*"[^>]*>(?:(?!<\/article>)[\s\S])*<a[^>]*href="#edgesight"[^>]*data-i18n="edgeCardCta"/.test(indexHtml),
  },
  {
    name: "form controls inherit the page font (textarea, select)",
    pass: /button,\s*a,\s*input,\s*textarea,\s*select\s*\{\s*font:\s*inherit/.test(read("styles.css")),
  },
  {
    name: "consent text no longer calls the policy provisional",
    pass: !/provisional|provisória/i.test(indexHtml) && !/provisional|provisória/i.test(scriptJs),
  },
  {
    name: "no hover lift, press scale or glow left in styles (system.md)",
    pass: (() => {
      const css = read("styles.css");
      return !css.includes("translateY(-1px)") && !/:active[^{]*\{[^}]*scale\(/.test(css) && !css.includes("0 0 40px");
    })(),
  },
  {
    name: "footer links to Edge Sight AI and the capability section has an id",
    pass:
      /<nav\s+class="footer-links"[\s\S]*?href="#edgesight"[\s\S]*?<\/nav>/.test(indexHtml) &&
      /id="capability"/.test(indexHtml),
  },
  {
    name: "focus is visible on dark surfaces",
    pass: /\.section-inverse[^{]*:focus-visible|\.hero[^{]*:focus-visible/.test(read("styles.css")),
  },
  {
    // Motion is allowed only with a purpose, once, and never at the cost of
    // reduced-motion users or the no-JS reader. The rule lives in system.md.
    name: "system.md Motion allows purposeful one-time motion and keeps the bans",
    pass: (() => {
      const system = read("system.md");
      const start = system.indexOf("### Motion");
      const motion = system.slice(start, system.indexOf("\n## ", start)).toLowerCase();
      return (
        start > -1 &&
        motion.includes("prefers-reduced-motion") &&
        motion.includes("once") &&
        motion.includes("without javascript") &&
        ["parallax", "counter", "cursor", "particle", "looping"].every((word) => motion.includes(word))
      );
    })(),
  },
  {
    // The gate must run before first paint (head, not end of body) and only
    // opt in when the visitor has not asked for reduced motion.
    name: "head carries the inline motion gate keyed on prefers-reduced-motion",
    pass: (() => {
      const head = indexHtml.slice(indexHtml.indexOf("<head>"), indexHtml.indexOf("</head>"));
      const inline = [...head.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
      return (
        inline.includes("prefers-reduced-motion: no-preference") &&
        inline.includes("classList.add") &&
        inline.includes("motion")
      );
    })(),
  },
  {
    // Content must be visible by default. A zero-opacity rule is only legal as
    // a keyframe start or behind html.motion (set by the head gate or by JS).
    name: "styles only hide initial animation states behind html.motion",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
      const hides = blocks.filter(([, , body]) => /(?:^|[;\s])opacity:\s*0\s*(?:;|$)/.test(body));
      return (
        hides.length > 0 &&
        hides.every(
          ([, selector]) =>
            /^\s*(?:from|0%)\s*$/.test(selector) ||
            /html\.motion/.test(selector) ||
            // decorative hover overlays (empty ::after boxes), never content
            selector.split(",").every((part) => /::after\s*$/.test(part.trim())),
        )
      );
    })(),
  },
  {
    name: "script.js runs the Edge Sight slider demo once and cancels on user input",
    pass:
      scriptJs.includes("demonstrateComparison") &&
      scriptJs.includes("requestAnimationFrame") &&
      ["pointerdown", "keydown", "focus", "input"].every((type) => scriptJs.includes(`"${type}"`)) &&
      scriptJs.includes("IntersectionObserver") &&
      scriptJs.includes("prefers-reduced-motion"),
  },
  {
    name: "case metrics appear via IntersectionObserver without rewriting their text",
    pass: (() => {
      const start = scriptJs.indexOf("function revealCaseMetrics");
      const end = start + scriptJs.slice(start).search(/\r?\n\}\r?\n/);
      const body = scriptJs.slice(start, end);
      return start > -1 && body.includes("IntersectionObserver") && body.includes("unobserve") && !body.includes("textContent");
    })(),
  },
  {
    name: "M2 flow list lights up in sequence once, gated by motion",
    pass: (() => {
      const css = read("styles.css");
      return (
        scriptJs.includes("function lightFlowSteps") &&
        scriptJs.includes("flow-lit") &&
        scriptJs.includes("unobserve") &&
        /html\.motion\s+\.flow-list/.test(css) &&
        css.includes(".flow-list li.flow-lit")
      );
    })(),
  },
  {
    name: "M2 capability connector is decorative, static by default, drawn under motion",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      return (
        /\.capability-list::before[^{}]*\{[^}]*content:\s*""/.test(css) &&
        /\.capability-list::before[^{}]*\{[^}]*pointer-events:\s*none/.test(css) &&
        /html\.motion\s+\.capability-list\.cap-armed:not\(\.cap-in\)::before\s*\{[^}]*scaleY\(0\)/.test(css) &&
        scriptJs.includes("function drawCapabilityLine") &&
        scriptJs.includes("cap-in")
      );
    })(),
  },
  {
    name: "M2 header shows the current section number and marks the nav link",
    pass: (() => {
      const css = read("styles.css");
      return (
        /class="section-indicator"[^>]*aria-hidden="true"/.test(indexHtml) &&
        scriptJs.includes("function trackCurrentSection") &&
        scriptJs.includes('"aria-current"') &&
        css.includes('.nav a[aria-current="true"]') &&
        css.includes(".section-indicator")
      );
    })(),
  },
  {
    name: "M2 card hover emphasis is pointer-fine only and adds no lift",
    pass: (() => {
      const css = read("styles.css");
      const at = css.indexOf("(hover: hover) and (pointer: fine)");
      if (at < 0) return false;
      const block = css.slice(at, at + css.slice(at).search(/\r?\n\}/));
      return (
        block.includes(".case-card:hover .case-metrics li") &&
        block.includes(".team-card:hover .team-card-media img") &&
        block.includes(".team-card:hover .team-card-name") &&
        !/translate|\bscale\(/.test(block)
      );
    })(),
  },
  {
    name: "system.md Motion names the M2 moments (process explanation, section indicator)",
    pass: (() => {
      const system = read("system.md");
      const start = system.indexOf("### Motion");
      const motion = system.slice(start, system.indexOf("\n## ", start)).toLowerCase();
      return motion.includes("process") && motion.includes("section indicator");
    })(),
  },
  {
    name: "R2 system.md allows pointer-following only for the hero robot head turn and keeps the general ban",
    pass: (() => {
      const system = read("system.md");
      const start = system.indexOf("### Motion");
      const motion = system.slice(start, system.indexOf("\n## ", start));
      return (
        motion.includes("Pointer-following is banned except the hero robot's head turn (pre-rendered frames from a keyframe-locked clip, eased, desktop fine pointer only, reduced-motion off).") &&
        !motion.includes("robot's eyes") &&
        /Still banned:[^\n]*cursor-following/.test(motion)
      );
    })(),
  },
  {
    name: "R2 the M3 pupil overlay is gone (no .hero-eye in html/css/js)",
    pass: !/hero-eye|followHeroEyes/.test(indexHtml + read("styles.css") + scriptJs),
  },
  {
    name: "R2 hero background and preload use robot-gaze-00.webp (<250 KB, exists)",
    pass:
      read("styles.css").includes('url("img/hero/robot-gaze-00.webp")') &&
      indexHtml.includes('rel="preload" as="image" href="img/hero/robot-gaze-00.webp"') &&
      existsSync(resolve(root, "img/hero/robot-gaze-00.webp")) &&
      statSync(resolve(root, "img/hero/robot-gaze-00.webp")).size < 250 * 1024,
  },
  {
    name: "R4 gaze video: img/hero/gaze.mp4 is all-intra H.264 with faststart, under 1.5 MB; frame files and robot-gaze-01+ are gone",
    pass: (() => {
      const file = resolve(root, "img/hero/gaze.mp4");
      if (!existsSync(file)) {
        return false;
      }
      const video = readFileSync(file);
      const text = video.toString("latin1");
      const stale = readdirSync(resolve(root, "img/hero")).filter((name) => /^robot-gaze-(?!00)\d\d\.webp$/.test(name));
      return (
        video.length < 1.5 * 1024 * 1024 &&
        text.includes("avc1") &&
        / keyint=1 /.test(text) &&
        text.indexOf("moov") > -1 &&
        text.indexOf("moov") < text.indexOf("mdat") &&
        !existsSync(resolve(root, "img/hero/gaze")) &&
        stale.length === 0
      );
    })(),
  },
  {
    name: "R4 gaze video is a muted, inline sibling layer after .hero-robot, no CSS filter on .hero-gaze, same opacity and position as the photo",
    pass: (() => {
      const start = scriptJs.indexOf("function turnHeroHead");
      const end = start + scriptJs.slice(start).search(/\r?\n\}\r?\n/);
      const body = scriptJs.slice(start, end);
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const rule = (css.match(/\.hero-gaze\s*\{[^}]*\}/) || [""])[0];
      return (
        /createElement\("video"\)/.test(body) &&
        /\.muted = true/.test(body) &&
        /\.playsInline = true/.test(body) &&
        /robot\.after\(\s*video/.test(body) &&
        !/robot\.append\(/.test(body) &&
        rule.length > 0 &&
        !/filter\s*:/.test(rule) &&
        /opacity:\s*0\.82/.test(rule) &&
        /object-fit:\s*cover/.test(rule) &&
        /object-position:\s*42% center/.test(rule)
      );
    })(),
  },
  {
    name: "R5 hero photo has no CSS filter at rest (grayscale + contrast baked into robot-gaze-00.webp); the lens focus animates blur only and leaves no filter behind",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const rules = css.match(/[^{}]*\.hero-robot\b[^{}]*\{[^}]*\}/g) || [];
      const focus = (css.match(/@keyframes robot-focus\s*\{[\s\S]*?\}\s*\}/) || [""])[0];
      const anim = (css.match(/html\.motion \.hero-robot\s*\{[^}]*\}/) || [""])[0];
      return (
        rules.length > 0 &&
        rules.every((rule) => !/[\s;{]filter\s*:/.test(rule.slice(rule.indexOf("{")))) &&
        focus.includes("blur(8px)") &&
        !/grayscale|contrast/.test(focus) &&
        /robot-focus[^;]*\bbackwards\b/.test(anim)
      );
    })(),
  },
  {
    name: "R4 renderer: seeks currentTime by nearest frame, one seek in flight, short frame-rate-independent ease, no canvas",
    pass: (() => {
      const start = scriptJs.indexOf("function turnHeroHead");
      const end = start + scriptJs.slice(start).search(/\r?\n\}\r?\n/);
      const body = scriptJs.slice(start, end);
      return (
        body.includes("currentTime") &&
        body.includes('"seeked"') &&
        body.includes("Math.round(") &&
        body.includes("Math.exp(") &&
        body.includes("ResizeObserver") &&
        !/canvas|drawImage|globalAlpha|createImageBitmap|getComputedStyle/.test(body)
      );
    })(),
  },
  {
    name: "R2 head turn: gated by motion + fine pointer, loads after load, video aria-hidden, IntersectionObserver, rAF eased",
    pass: (() => {
      const start = scriptJs.indexOf("function turnHeroHead");
      const end = start + scriptJs.slice(start).search(/\r?\n\}\r?\n/);
      const body = scriptJs.slice(start, end);
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      return (
        start > -1 &&
        body.includes("motionEnabled()") &&
        body.includes("(hover: hover) and (pointer: fine)") &&
        body.includes('"load"') &&
        body.includes("img/hero/gaze.mp4") &&
        body.includes('"canplaythrough"') &&
        body.includes('"aria-hidden", "true"') &&
        body.includes("pointermove") &&
        body.includes("pointerleave") &&
        body.includes("requestAnimationFrame") &&
        body.includes("cancelAnimationFrame") &&
        body.includes("IntersectionObserver") &&
        /\.hero-gaze\s*\{[^}]*pointer-events:\s*none/.test(css)
      );
    })(),
  },
  {
    name: "Sentientum card: article with the modal button, no heading inside a button",
    pass:
      /<article class="product-card product-card-sentientum"[^>]*>(?:(?!<\/article>)[\s\S])*<button[^>]*data-modal-open="sentientum-modal"/.test(indexHtml) &&
      !/<button(?:(?!<\/button>)[\s\S])*<h3/i.test(indexHtml),
  },
  {
    name: "Sentientum card: whole card opens the modal via a stretched ::after on the CTA",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const rule = /\.product-card-sentientum\s+\.product-card-action::after\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
      const card = /\.product-card-sentientum\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
      return (
        /position:\s*absolute/.test(rule) &&
        (/inset:\s*0\b/.test(rule) || /top:\s*0[\s\S]*right:\s*0[\s\S]*bottom:\s*0[\s\S]*left:\s*0/.test(rule)) &&
        /position:\s*relative/.test(card) &&
        /cursor:\s*pointer/.test(card)
      );
    })(),
  },
  {
    name: "Sentientum card background is an optimized (<150 KB WebP in img/sentientum)",
    pass:
      existsSync(resolve(root, "img/sentientum/bandada-card.webp")) &&
      statSync(resolve(root, "img/sentientum/bandada-card.webp")).size < 150 * 1024 &&
      read("styles.css").includes("img/sentientum/bandada-card.webp"),
  },
  {
    name: "system.md documents the narrow Sentientum sub-brand exception",
    pass: read("system.md").includes(
      "Sub-brand exception: the Sentientum product card carries Sentientum's own identity (Bandada palette, wordmark lockup, flock imagery) so it reads as the product it opens. Everything else stays monochrome.",
    ),
  },
  {
    // M4: slow machines get the calm version. Detection starts in the head gate.
    // Brave randomises hardwareConcurrency, so core count must not decide; only very
    // low memory or the data saver mark a device as slow up front.
    name: "M4 head gate adds html.motion-lite only for deviceMemory <= 2 or saveData",
    pass: (() => {
      const head = indexHtml.slice(indexHtml.indexOf("<head>"), indexHtml.indexOf("</head>"));
      const inline = [...head.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
      return (
        inline.includes("motion-lite") &&
        !inline.includes("hardwareConcurrency") &&
        /deviceMemory\s*<=\s*2/.test(inline) &&
        inline.includes("saveData")
      );
    })(),
  },
  {
    // No synthetic CPU benchmark (false positives on a busy fast machine); slowness is
    // measured on the visitor's own scrolling and idle frames.
    name: "M4 script.js adds motion-lite from real idle and scroll frames, without a CPU benchmark",
    pass: (() => {
      const fnBody = (name) => {
        const start = scriptJs.indexOf(`function ${name}`);
        if (start < 0) return "";
        return scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      };
      const idle = fnBody("sampleFrameRate");
      const scroll = fnBody("watchScrollFrames");
      return (
        !scriptJs.includes("300000") &&
        idle.includes("requestAnimationFrame") &&
        idle.includes('"motion-lite"') &&
        scroll.includes('"scroll"') &&
        scroll.includes("passive: true") &&
        scroll.includes("0.25") &&
        scroll.includes('"motion-lite"') &&
        scriptJs.includes("watchScrollFrames()")
      );
    })(),
  },
  {
    name: "M4 styles neutralise the flow, capability rail, metric reveal and indicator crossfade under .motion-lite",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const lite = [...css.matchAll(/([^{}]*\.motion-lite[^{}]*)\{([^{}]*)\}/g)];
      const has = (needle, prop) =>
        lite.some(([, selector, body]) => selector.includes(needle) && prop.test(body));
      return (
        has(".flow-list", /transition:\s*none/) &&
        has(".capability-list", /transition:\s*none/) &&
        has(".capability-list", /transform:\s*none/) &&
        has(".section-indicator", /transition:\s*none/) &&
        has(".case-metrics::before", /display:\s*none/) &&
        has(".hero-robot", /animation:\s*none/)
      );
    })(),
  },
  {
    name: "M4 gaze video, flow, rail, metrics and indicator swap are skipped under motion-lite",
    pass: (() => {
      const fn = (name) => {
        const start = scriptJs.indexOf(`function ${name}`);
        return scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      };
      return (
        scriptJs.includes("function isLite") &&
        ["turnHeroHead", "lightFlowSteps", "drawCapabilityLine", "revealCaseMetrics", "trackCurrentSection"].every(
          (name) => fn(name).includes("isLite()"),
        )
      );
    })(),
  },
  {
    // Hover emphasis on large cards must not repaint during scroll: no colour
    // transitions on them; an opacity overlay (or an instant change) instead.
    name: "M4 large cards have no border/colour transitions (opacity overlay or instant)",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const large = new Set([
        ".case-card",
        ".team-card",
        ".method-grid article",
        ".capability-list li",
        ".product-card-sentientum",
        ".case-metrics li",
        ".case-metrics span",
        ".team-card-name",
      ]);
      const offenders = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(([, selector, body]) => {
        const transition = /transition(?:-property)?:\s*([^;]*)/.exec(body)?.[1] ?? "";
        return (
          /border|color|background/.test(transition) &&
          selector.split(",").some((part) => large.has(part.trim()))
        );
      });
      return offenders.length === 0 && /\.case-card::after[\s\S]*?opacity/.test(css);
    })(),
  },
  {
    name: "system.md Motion documents motion-lite",
    pass: read("system.md").includes(
      "On low-end devices (`motion-lite`), process explanations and the head turn are skipped and states are shown instantly.",
    ),
  },
  {
    name: "E1 Edge Sight demo: video + poster in the page, old AI stills gone from page, css, script and img/hero",
    pass: (() => {
      const css = read("styles.css");
      return (
        indexHtml.includes("img/edgesight/edgesight-site.mp4") &&
        indexHtml.includes('poster="img/edgesight/edgesight-poster.webp"') &&
        /<video[^>]*\smuted[^>]*\splaysinline|<video[^>]*\splaysinline[^>]*\smuted/.test(indexHtml) &&
        [indexHtml, css, scriptJs].every((t) => !/imagen-filtro-calor|imagen-camara-1/.test(t)) &&
        !existsSync(resolve(root, "img/hero/imagen-filtro-calor.webp")) &&
        !existsSync(resolve(root, "img/hero/imagen-camara-1.webp")) &&
        existsSync(resolve(root, "assets-src/hero/imagen-filtro-calor.webp")) &&
        existsSync(resolve(root, "assets-src/hero/imagen-camara-1.webp"))
      );
    })(),
  },
  {
    name: "E1 Edge Sight assets exist and the clip stays under 1.2 MB",
    pass:
      ["edgesight-site.mp4", "edgesight-poster.webp", "edgesight-tracks.json"].every((f) =>
        existsSync(resolve(root, "img/edgesight", f)),
      ) && statSync(resolve(root, "img/edgesight/edgesight-site.mp4")).size < 1.2 * 1024 * 1024,
  },
  {
    name: "E1 demo script: loads the tracks JSON, syncs by requestVideoFrameCallback with an rAF fallback, builds the log from JSON events",
    pass: (() => {
      const start = scriptJs.indexOf("function initEdgeSightDemo");
      const end = scriptJs.indexOf("// end Edge Sight demo");
      const body = start >= 0 && end > start ? scriptJs.slice(start, end) : "";
      return (
        body.includes("img/edgesight/edgesight-tracks.json") &&
        body.includes("requestVideoFrameCallback") &&
        body.includes("requestAnimationFrame") &&
        /tracks\.events/.test(body) &&
        /Math\.round\([^)]*fps\)/.test(body)
      );
    })(),
  },
  {
    name: "E1 demo script: autoplay is gated on motion-lite, reduced motion and saveData; loads near the viewport only",
    pass: (() => {
      const start = scriptJs.indexOf("function initEdgeSightDemo");
      const end = scriptJs.indexOf("// end Edge Sight demo");
      const body = start >= 0 && end > start ? scriptJs.slice(start, end) : "";
      return (
        /isLite\(\)/.test(body) &&
        body.includes("prefers-reduced-motion: reduce") &&
        body.includes("saveData") &&
        /rootMargin:\s*"200px/.test(body) &&
        body.includes("IntersectionObserver")
      );
    })(),
  },
  {
    name: "E1 caption and demo strings exist in es, en and pt and never claim helmet/vest (PPE) detection",
    pass: (() => {
      const keys = ["edgeCaption", "edgeDesc", "edgeStageLabel", "edgeCountLabel", "edgePlay", "edgePause", "edgeLogScene", "edgeLogPeople", "edgeLogMachine", "edgeLabelPerson", "edgeLabelMachine"];
      const dictionaries = ["es", "en", "pt"].map((lang) => {
        const start = scriptJs.indexOf(`\t${lang}: {`);
        return scriptJs.slice(start, scriptJs.indexOf("\n\t},", start));
      });
      const ppe = /\b(casco|cascos|helmets?|capacetes?|chalecos?|vests?|coletes?|ppe)\b/i;
      return (
        dictionaries.every((d) => keys.every((k) => d.includes(`${k}:`))) &&
        dictionaries.every((d) => !ppe.test(d)) &&
        !ppe.test(indexHtml.slice(indexHtml.indexOf('id="edgesight"'), indexHtml.indexOf('id="capability"')))
      );
    })(),
  },
  // ── M5 effects pass: "Your Data has a Voice" — the page decodes its data. ──
  {
    name: "M5 system.md Motion names the four new effects as narrow exceptions, skipped under motion-lite",
    pass: (() => {
      const system = read("system.md");
      const start = system.indexOf("### Motion");
      const motion = system.slice(start, system.indexOf("\n## ", start)).toLowerCase();
      return (
        motion.includes("decod") &&
        motion.includes("signal line") &&
        motion.includes("metric scan") &&
        motion.includes("reticle") &&
        /motion-lite[^\n]*(decod|signal line|reticle)/.test(motion)
      );
    })(),
  },
  {
    // The scramble is a separate aria-hidden layer; the heading's own text is
    // never replaced, so screen readers and search always read the real words.
    name: "M5 decoding headings: aria-hidden cloned layer, real text never rewritten, h2 + tagline only (not the H1)",
    pass: (() => {
      const start = scriptJs.indexOf("function decodeHeadings");
      const body = start < 0 ? "" : scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      return (
        body.includes('"aria-hidden", "true"') &&
        body.includes("cloneNode(true)") &&
        body.includes(".system-line") &&
        body.includes("h2") &&
        !/\bh1\b|hero-title/.test(body) &&
        !/heading\.(textContent|innerHTML|innerText)\s*=/.test(body) &&
        !/\.innerHTML\s*=/.test(body) &&
        body.includes("DECODE_GLYPHS") &&
        scriptJs.includes("decodeHeadings()")
      );
    })(),
  },
  {
    name: "M5 decoding runs one capped rAF loop that stops when done, skips lite and releases on language change",
    pass: (() => {
      const start = scriptJs.indexOf("function decodeHeadings");
      const body = start < 0 ? "" : scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      return (
        body.includes("motionEnabled()") &&
        body.includes("isLite()") &&
        body.includes("MAX_ACTIVE_DECODES") &&
        body.includes("requestAnimationFrame") &&
        body.includes("IntersectionObserver") &&
        body.includes('"scapder:language"') &&
        // glyphs that never add a line-break opportunity (no / \ - [ ] | +)
        /const DECODE_GLYPHS = "[^"/\\\-\[\]|+ ]+"/.test(scriptJs)
      );
    })(),
  },
  {
    // A signal travelling down the page: transform only, never top/height.
    name: "M5 signal line: scroll-linked scaleY via one passive listener + rAF, gated, no top/height animation",
    pass: (() => {
      const start = scriptJs.indexOf("function drawSignalLine");
      const body = start < 0 ? "" : scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const rules = [...css.matchAll(/([^{}]*\.signal-[^{}]*)\{([^{}]*)\}/g)];
      return (
        body.includes("scaleY(") &&
        body.includes('"scroll"') &&
        body.includes("passive: true") &&
        body.includes("requestAnimationFrame") &&
        body.includes("motionEnabled()") &&
        body.includes("isLite()") &&
        body.includes('"aria-hidden", "true"') &&
        scriptJs.includes("drawSignalLine()") &&
        rules.length > 0 &&
        rules.some(([, , b]) => /transform-origin:\s*(50% 0|top|center top)/.test(b)) &&
        rules.every(([, , b]) => !/transition:[^;]*\b(top|height)\b/.test(b) && (!/animation:/.test(b) || /animation-timeline:\s*scroll\(/.test(b)))
      );
    })(),
  },
  {
    // Reading scrollY every frame forces a layout in Chromium (measured 2026-10-21:
    // ~90% of the line's frame cost at CPU 4x). Where CSS scroll timelines exist the
    // fill runs off the main thread and the taps flip from an IntersectionObserver.
    name: "M5 signal line: CSS scroll timeline where supported, taps via IntersectionObserver, rAF fallback only otherwise",
    pass: (() => {
      const start = scriptJs.indexOf("function drawSignalLine");
      const body = start < 0 ? "" : scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const supports = (css.match(/@supports\s*\(animation-timeline:\s*scroll\(\)\)\s*\{[\s\S]*?\n\}/) || [""])[0];
      return (
        body.includes('CSS.supports("animation-timeline: scroll()")') &&
        body.includes("new IntersectionObserver(") &&
        body.includes("--fill-from") &&
        body.includes("--fill-to") &&
        /animation-timeline:\s*scroll\(root\)/.test(supports) &&
        /animation-range:\s*var\(--fill-from\)\s+var\(--fill-to\)/.test(supports) &&
        /@keyframes\s+signal-fill\s*\{[^}]*scaleY\(0\)[\s\S]*?scaleY\(1\)/.test(css)
      );
    })(),
  },
  {
    // The scan replaces the M1 fade: one effect, transform-based mask, real numbers.
    name: "M5 metric scan: transform-masked sweep replaces the M1 fade, text never rewritten",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const scan = (css.match(/@keyframes metric-scan\s*\{[\s\S]*?\}\s*\}/) || [""])[0];
      const start = scriptJs.indexOf("function revealCaseMetrics");
      const body = scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      return (
        /translateX\(|clip-path/.test(scan) &&
        /\.metrics-in \.case-metrics::before\s*\{[^}]*animation:\s*metric-scan/.test(css) &&
        !css.includes("metric-enter") &&
        !/\.case-metrics li\s*\{[^}]*opacity:\s*0/.test(css) &&
        !body.includes("textContent")
      );
    })(),
  },
  {
    name: "M5 Edge Sight reticle: fine pointer + motion + not lite, pointer-events none, cursor restored over controls",
    pass: (() => {
      const start = scriptJs.indexOf("function aimEdgeReticle");
      const body = start < 0 ? "" : scriptJs.slice(start, start + scriptJs.slice(start).search(/\r?\n\}\r?\n/));
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const reticle = (css.match(/\.edge-reticle\s*\{[^}]*\}/) || [""])[0];
      return (
        body.includes("(hover: hover) and (pointer: fine)") &&
        body.includes("motionEnabled()") &&
        body.includes("isLite()") &&
        body.includes("pointermove") &&
        body.includes("pointerleave") &&
        body.includes("requestAnimationFrame") &&
        body.includes('"aria-hidden", "true"') &&
        scriptJs.includes("aimEdgeReticle(") &&
        /pointer-events:\s*none/.test(reticle) &&
        /\.has-reticle\s*\{[^}]*cursor:\s*none/.test(css) &&
        /\.has-reticle[^{]*(button|input|a)[^{]*\{[^}]*cursor:\s*(auto|pointer|default)/.test(css)
      );
    })(),
  },
  {
    name: "M5 styles neutralise decode, signal line, metric scan and reticle under .motion-lite",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const lite = [...css.matchAll(/([^{}]*\.motion-lite[^{}]*)\{([^{}]*)\}/g)];
      const has = (needle, prop) => lite.some(([, selector, body]) => selector.includes(needle) && prop.test(body));
      return (
        has(".decode-layer", /display:\s*none/) &&
        has(".signal-line", /display:\s*none/) &&
        has(".case-metrics::before", /display:\s*none/) &&
        has(".edge-reticle", /display:\s*none/) &&
        // the transparent-text state only exists outside lite
        /html\.motion:not\(\.motion-lite\)\s+\.is-decoding\s*\{[^}]*-webkit-text-fill-color:\s*transparent/.test(css)
      );
    })(),
  },
  {
    // Hover/focus feedback: an ink fill and a drawn underline, transform only, no lift.
    name: "M5 micro-interactions: primary button data fill and nav underline draw from the left (scaleX), focus-visible too",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const fill = (css.match(/\.btn-primary::before\s*\{[^}]*\}/) || [""])[0];
      const line = (css.match(/\.nav a::after\s*\{[^}]*\}/) || [""])[0];
      return (
        /transform:\s*scaleX\(0\)/.test(fill) &&
        /transform-origin:\s*(left|0)/.test(fill) &&
        /transition:\s*transform\s+(1[5-9]\d|2[0-5]\d)ms/.test(fill) &&
        /transform:\s*scaleX\(0\)/.test(line) &&
        /transform-origin:\s*(left|0)/.test(line) &&
        /\.btn-primary:focus-visible::before/.test(css) &&
        /\.nav a:focus-visible::after/.test(css) &&
        /\.nav a\[aria-current="true"\]::after/.test(css) &&
        !/\.btn-primary:hover\s*\{[^}]*background/.test(css)
      );
    })(),
  },
  {
    name: "M5 still no ticking counters (no setInterval, no number formatting, metric text never written)",
    pass:
      !scriptJs.includes("setInterval") &&
      !scriptJs.includes("toLocaleString") &&
      !/case-metrics[\s\S]{0,200}?\.textContent\s*=/.test(scriptJs),
  },
  {
    name: "generic scroll reveal stays removed (no data-reveal)",
    pass: !indexHtml.includes("data-reveal") && !scriptJs.includes("data-reveal") && !read("styles.css").includes("data-reveal"),
  },
  {
    // A see-through sticky header lets the proof strip's text show behind the logo.
    name: "sticky header background is opaque (no transparency, no blur)",
    pass: (() => {
      const css = read("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
      const rules = [...css.matchAll(/(?:^|\})\s*\.site-header\s*\{([^{}]*)\}/g)].map(([, body]) => body);
      return (
        rules.some((body) => /background:\s*var\(--scapder-canvas\)\s*;/.test(body)) &&
        rules.every((body) => !/transparent|rgba\(|backdrop-filter/.test(body))
      );
    })(),
  },
];

const failed = checks.filter((check) => !check.pass);

if (failed.length > 0) {
  console.error('Verification failed:');
  for (const check of failed) console.error(`- ${check.name}`);
  process.exit(1);
}

console.log(`Landing verification passed (${checks.length} checks).`);
