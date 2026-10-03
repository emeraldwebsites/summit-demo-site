// Build script: generates the static site into ./dist
// Run with: node build.mjs      (no npm install needed)
import { mkdir, writeFile, cp, rm, readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import cfg from "./site.config.mjs";
import { layout } from "./src/layout.mjs";
import { pages } from "./src/pages.mjs";

const OUT = "dist";
const start = Date.now();

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// 1. Copy everything in /public as-is
await cp("public", OUT, { recursive: true });

// 2. Render pages
const all = pages(cfg);
for (const p of all) {
  const file = p.path.endsWith(".html") ? p.path : join(p.path, "index.html");
  const dest = join(OUT, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, layout(cfg, p));
}

// 3. Sitemap (skip noindex pages and 404)
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .filter((p) => !p.noindex && !p.path.endsWith(".html"))
  .map((p) => `  <url><loc>${cfg.site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === "/" ? "1.0" : "0.8"}</priority></url>`)
  .join("\n")}
</urlset>`;
await writeFile(join(OUT, "sitemap.xml"), sitemap);

// 4. robots.txt
await writeFile(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${cfg.site.url}/sitemap.xml\n`);

// 5. Report
const count = async (dir) => {
  let n = 0;
  for (const e of await readdir(dir)) {
    const s = await stat(join(dir, e));
    n += s.isDirectory() ? await count(join(dir, e)) : 1;
  }
  return n;
};
console.log(`Built ${all.length} pages (${await count(OUT)} files) for ${cfg.business.name} in ${Date.now() - start} ms → ./${OUT}`);
