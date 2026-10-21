// Builds the English and Brazilian Portuguese landing pages from index.html and the
// dictionaries in script.js, so /en/ and /pt/ serve fully translated HTML before
// any JavaScript runs (crawlers, link previews, no-JS visitors).
//
//   node tools/build-language-pages.mjs <outDir>   ->  <outDir>/en/index.html, <outDir>/pt/index.html
//
// No dependencies. The transform mirrors applyLanguage() in script.js:
//   data-i18n             -> element text (escaped, like textContent)
//   data-i18n-html        -> element inner HTML (raw, like innerHTML)
//   data-i18n-aria-label  -> aria-label attribute
//   data-i18n-alt         -> alt attribute
// A key with an empty or missing value leaves the Spanish source in place, as the
// script does (`if (dictionary[key])`).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://scapder.com";

const LANGS = {
	en: { htmlLang: "en", path: "/en/", locale: "en_US" },
	pt: { htmlLang: "pt-BR", path: "/pt/", locale: "pt_BR" },
};
const LOCALES = ["es_LA", "en_US", "pt_BR"];

// The dictionaries are one object literal at the top of script.js. Evaluate that
// literal alone in an empty sandbox: no regex over individual strings, and no
// access to anything else in the script.
export function loadTranslations(scriptSource) {
	const start = scriptSource.indexOf("const translations = ");
	if (start < 0) throw new Error("script.js: `const translations = ` not found");
	const open = scriptSource.indexOf("{", start);
	const end = scriptSource.indexOf("\n};", open);
	if (open < 0 || end < 0) throw new Error("script.js: translations literal not terminated");
	return vm.runInNewContext("(" + scriptSource.slice(open, end + 2) + ")", Object.create(null), { timeout: 1000 });
}

const escText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (value) => escText(value).replace(/"/g, "&quot;");

// Replace the single match of `pattern`. With capture groups (prefix, suffix) the
// value goes between them; without groups it replaces the whole match.
function replaceOnce(html, pattern, value, label) {
	if (!pattern.test(html)) throw new Error(`index.html: ${label} not found`);
	return html.replace(pattern, (...m) => (typeof m[1] === "string" ? m[1] + value + (typeof m[2] === "string" ? m[2] : "") : value));
}

function getAttr(attrs, name) {
	const match = new RegExp(`(?:^|\\s)${name}="([^"]*)"`).exec(attrs);
	return match ? match[1] : null;
}

function setAttr(attrs, name, value) {
	const pattern = new RegExp(`((?:^|\\s)${name}=)"[^"]*"`);
	return pattern.test(attrs) ? attrs.replace(pattern, (_, prefix) => `${prefix}"${value}"`) : `${attrs} ${name}="${value}"`;
}

// End index (exclusive) of the element whose content starts at `from`, counting
// nested elements of the same name.
function closingTagRange(html, name, from) {
	const tags = new RegExp(`<(/?)${name}\\b[^>]*>`, "gi");
	tags.lastIndex = from;
	let depth = 1;
	for (let tag = tags.exec(html); tag; tag = tags.exec(html)) {
		depth += tag[1] ? -1 : /\/>$/.test(tag[0]) ? 0 : 1;
		if (depth === 0) return { contentEnd: tag.index, end: tag.index + tag[0].length };
	}
	throw new Error(`index.html: <${name}> is never closed`);
}

function translateBody(html, lang, dictionary) {
	const openTag = /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s[^<>]*)?)(\/?)>/g;
	let out = "";
	let cursor = 0;
	for (let match = openTag.exec(html); match; match = openTag.exec(html)) {
		const [whole, name, rawAttrs, selfClose] = match;
		if (!/data-i18n|language-option|data-bandada-fullscreen/.test(rawAttrs)) continue;

		let attrs = rawAttrs;
		const ariaKey = getAttr(attrs, "data-i18n-aria-label");
		if (ariaKey && dictionary[ariaKey]) attrs = setAttr(attrs, "aria-label", escAttr(dictionary[ariaKey]));
		const altKey = getAttr(attrs, "data-i18n-alt");
		if (altKey && dictionary[altKey]) attrs = setAttr(attrs, "alt", escAttr(dictionary[altKey]));

		if (/(?:^|\s)class="[^"]*\blanguage-option\b/.test(attrs) && getAttr(attrs, "data-lang")) {
			const active = getAttr(attrs, "data-lang") === lang;
			const classes = getAttr(attrs, "class").split(/\s+/).filter((c) => c && c !== "is-active");
			if (active) classes.push("is-active");
			attrs = setAttr(setAttr(attrs, "class", classes.join(" ")), "aria-pressed", String(active));
		}
		if (/(?:^|\s)data-bandada-fullscreen(?:\s|=|$)/.test(attrs)) {
			attrs = setAttr(attrs, "href", `https://bandada.scapder.com/?lang=${encodeURIComponent(lang)}`);
		}

		const textKey = getAttr(attrs, "data-i18n");
		const htmlKey = getAttr(attrs, "data-i18n-html");
		const textValue = textKey && dictionary[textKey];
		const htmlValue = htmlKey && dictionary[htmlKey];
		const tag = `<${name}${attrs}${selfClose}>`;

		out += html.slice(cursor, match.index);
		if ((textValue || htmlValue) && !selfClose) {
			const range = closingTagRange(html, name, match.index + whole.length);
			// applyLanguage sets textContent first and innerHTML second; the later one wins.
			out += tag + (htmlValue ? dictionary[htmlKey] : escText(dictionary[textKey])) + html.slice(range.contentEnd, range.end);
			cursor = range.end;
			openTag.lastIndex = range.end;
		} else {
			out += tag;
			cursor = match.index + whole.length;
		}
	}
	return out + html.slice(cursor);
}

function translateHead(html, lang, dictionary) {
	const { htmlLang, path, locale } = LANGS[lang];
	const url = SITE + path;
	const title = escAttr(dictionary.metaTitle);
	const description = escAttr(dictionary.metaDescription);

	let out = html;
	out = replaceOnce(out, /<html lang="[^"]*">/, `<html lang="${htmlLang}">`, "<html lang>");
	out = replaceOnce(out, /<title>[^<]*<\/title>/, `<title>${escText(dictionary.metaTitle)}</title>`, "<title>");
	out = replaceOnce(out, /(<meta\s+name="description"\s+content=")[^"]*(")/, description, "meta description");
	out = replaceOnce(out, /(<link rel="canonical" href=")[^"]*(")/, url, "canonical");
	out = replaceOnce(out, /(<meta property="og:title" content=")[^"]*(")/, title, "og:title");
	out = replaceOnce(out, /(<meta property="og:description" content=")[^"]*(")/, description, "og:description");
	out = replaceOnce(out, /(<meta property="og:url" content=")[^"]*(")/, url, "og:url");
	out = replaceOnce(out, /(<meta name="twitter:title" content=")[^"]*(")/, title, "twitter:title");
	out = replaceOnce(out, /(<meta name="twitter:description" content=")[^"]*(")/, description, "twitter:description");
	out = replaceOnce(
		out,
		/<meta property="og:locale" content="[^"]*" \/>(?:\s*<meta property="og:locale:alternate" content="[^"]*" \/>)+/,
		[
			`<meta property="og:locale" content="${locale}" />`,
			...LOCALES.filter((l) => l !== locale).map((l) => `<meta property="og:locale:alternate" content="${l}" />`),
		].join("\n    "),
		"og:locale block",
	);
	// JSON-LD: the Organization description, as a JSON string.
	out = replaceOnce(out, /("description": )"(?:[^"\\]|\\.)*"/, JSON.stringify(dictionary.metaDescription), "JSON-LD description");
	return out;
}

export function buildLanguagePage(indexHtml, translations, lang) {
	const dictionary = translations[lang];
	if (!dictionary) throw new Error(`no dictionary for "${lang}"`);
	const bodyStart = indexHtml.indexOf("<body");
	if (bodyStart < 0) throw new Error("index.html: <body> not found");
	const head = translateHead(indexHtml.slice(0, bodyStart), lang, dictionary);
	return head + translateBody(indexHtml.slice(bodyStart), lang, dictionary);
}

function main() {
	const outDir = process.argv[2];
	if (!outDir) {
		console.error("usage: node tools/build-language-pages.mjs <outDir>");
		process.exit(2);
	}
	const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
	const translations = loadTranslations(readFileSync(resolve(root, "script.js"), "utf8"));
	for (const lang of Object.keys(LANGS)) {
		const target = resolve(outDir, lang, "index.html");
		mkdirSync(dirname(target), { recursive: true });
		writeFileSync(target, buildLanguagePage(indexHtml, translations, lang));
		console.log(`wrote ${lang}/index.html`);
	}
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
