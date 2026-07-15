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
    name: "Sentientum demo URL is present",
    pass: indexHtml.includes('https://sentientum-demo.fly.dev/'),
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
