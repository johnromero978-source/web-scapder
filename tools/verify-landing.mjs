import { readFileSync } from "node:fs";
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
    pass:
      indexHtml.includes('<span class="brand-name">scapder</span>') &&
      indexHtml.includes('<h1 id="hero-title" data-i18n="heroTitle">scapder</h1>'),
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
];

const failed = checks.filter((check) => !check.pass);

if (failed.length > 0) {
  console.error('Verification failed:');
  for (const check of failed) console.error(`- ${check.name}`);
  process.exit(1);
}

console.log(`Landing verification passed (${checks.length} checks).`);
