// Turns the single-page build into one static HTML page per language so search engines
// can read every page without running JavaScript. Runs after `vite build` (see package.json).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");
const { render, headTags, LANGS, PATHS, SITE_URL } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);

const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = (SITE_URL || process.env.SITE_URL || (vercel ? `https://${vercel}` : "")).replace(/\/$/, "");
if (!site) console.warn("[prerender] No site URL set: canonical/hreflang use relative paths and sitemap.xml is skipped. Set SITE_URL in src/config.ts.");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
for (const lang of LANGS) {
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"`)
    .replace("<!--head-->", headTags(lang, site))
    .replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`);
  const out = path.join(dist, PATHS[lang], "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`[prerender] ${PATHS[lang]} -> ${path.relative(root, out)}`);
}

const robots = ["User-agent: *", "Allow: /", ...(site ? [`Sitemap: ${site}/sitemap.xml`] : [])].join("\n") + "\n";
fs.writeFileSync(path.join(dist, "robots.txt"), robots);

if (site) {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}${PATHS[l]}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${PATHS.en}"/>`).join("\n");
  const urls = LANGS.map(l => `  <url>\n    <loc>${site}${PATHS[l]}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`).join("\n");
  fs.writeFileSync(path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
}

fs.rmSync(serverDir, { recursive: true, force: true });
