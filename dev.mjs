// Local preview: builds the site, serves ./dist on http://localhost:4000,
// and rebuilds whenever a file changes. Run with: node dev.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { join, extname } from "node:path";
import { spawn } from "node:child_process";

const PORT = process.env.PORT || 4000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain",
  ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2",
};

let building = null;
const build = () => {
  if (building) return building;
  building = new Promise((resolve) => {
    const p = spawn(process.execPath, ["build.mjs"], { stdio: "inherit" });
    p.on("exit", () => { building = null; resolve(); });
  });
  return building;
};

await build();
for (const dir of ["src", "public"]) watch(dir, { recursive: true }, () => build());
watch("site.config.mjs", () => build());

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  let file = join("dist", path);
  try {
    const s = await stat(file);
    if (s.isDirectory()) { res.writeHead(301, { Location: path + "/" }); return res.end(); }
  } catch {
    file = join("dist", "404.html");
  }
  // Mimic the Cloudflare Pages Function locally so the form can be tested
  if (req.method === "POST" && path === "/api/contact") {
    let body = ""; req.on("data", (c) => (body += c));
    req.on("end", () => { console.log("Form submission (dev):", Object.fromEntries(new URLSearchParams(body))); res.writeHead(303, { Location: "/thank-you/" }); res.end(); });
    return;
  }
  try {
    const data = await readFile(file);
    res.writeHead(file.endsWith("404.html") ? 404 : 200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}  (watching for changes)`));
