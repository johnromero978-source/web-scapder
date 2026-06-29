import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), "utf8");

const indexHtml = read("index.html");
const scriptJs = read("script.js");

const waMeLinks = [...scriptJs.matchAll(/wa\.me\/(\d+)/g)].map((match) => match[1]);

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
    name: "contact endpoints are present in form routing",
    pass:
      scriptJs.includes('john.romero@scapder.org') &&
      scriptJs.includes('3001234567') &&
      scriptJs.includes('wa.me/573001234567') &&
      waMeLinks.length > 0 &&
      waMeLinks.every((phone) => phone === '573001234567') &&
      !indexHtml.includes('wa.me/'),
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
