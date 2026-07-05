import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

const staticRoutes = new Set([
  "/",
  "/about",
  "/blog",
  "/contact",
  "/contact/submit/success",
  "/privacy",
  "/search",
  "/sitemap",
  "/subscribe",
  "/subscribe/success",
  "/terms",
  "/tools",
  "/tools/bazi-calculator",
  "/tools/i-ching-oracle",
  "/tools/zodiac-compatibility",
]);

function read(relativePath) {
  return readFileSync(new URL(relativePath, `file://${projectRoot}/`), "utf8");
}

function addMatches(set, text, regex, prefix = "") {
  for (const match of text.matchAll(regex)) {
    set.add(`${prefix}${match[1]}`);
  }
}

function addZodiacYearRoutes(set, text, animal, listName) {
  const start = text.indexOf(`const ${listName} = [`);
  if (start === -1) return;

  const end = text.indexOf("];", start);
  const block = end === -1 ? text.slice(start) : text.slice(start, end);
  addMatches(set, block, /year:\s*"(\d+)"/g, `/chinese-zodiac/${animal}/`);
}

function addAllZodiacYearRoutes(set, text) {
  for (const match of text.matchAll(/const\s+([a-z]+)Years\s*=/g)) {
    addZodiacYearRoutes(set, text, match[1], `${match[1]}Years`);
  }
}

function collectPublishedRoutes() {
  const routes = new Set(staticRoutes);

  for (const contentFile of [
    "src/content/bazi/pages.tsx",
    "src/content/blog/posts.tsx",
    "src/content/feng-shui/pages.tsx",
    "src/content/i-ching/pages.tsx",
    "src/content/learn/pages.tsx",
    "src/content/zodiac/pages.tsx",
    "src/content/ziwei/pages.tsx",
  ]) {
    addMatches(routes, read(contentFile), /path:\s*"(\/[^"]+)"/g);
  }

  addMatches(routes, read("src/content/bazi/pages.tsx"), /\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"\]/g, "/bazi/");
  addMatches(routes, read("src/content/i-ching/pages.tsx"), /\{\s*slug:\s*"([^"]+)"/g, "/i-ching/");
  addMatches(routes, read("src/content/ziwei/pages.tsx"), /\{\s*slug:\s*"([^"]+)"/g, "/ziwei/");
  addMatches(
    routes,
    read("src/content/feng-shui/pages.tsx"),
    /\{\s*slug:\s*"([^"]+)"/g,
    "/feng-shui/"
  );
  addMatches(routes, read("src/content/blog/posts.tsx"), /slug:\s*"([^"]+-day-master)"/g, "/blog/");

  const zodiacContent = read("src/content/zodiac/pages.tsx");
  addMatches(routes, zodiacContent, /\{\s*slug:\s*"([^"]+)"/g, "/chinese-zodiac/");
  addAllZodiacYearRoutes(routes, zodiacContent);

  addMatches(routes, read("src/lib/i-ching/index.ts"), /number:\s*(\d+)/g, "/i-ching/hexagram-");

  return routes;
}

function normalizePath(href) {
  const withoutQuery = href.split("?")[0].split("#")[0];
  if (withoutQuery.length > 1) return withoutQuery.replace(/\/$/, "");
  return withoutQuery || "/";
}

function shouldIgnore(href) {
  return (
    href.startsWith("/api/") ||
    href.startsWith("/rss.xml") ||
    href.startsWith("/sitemap.xml") ||
    href.startsWith("/llms") ||
    href.startsWith("/logo") ||
    href.startsWith("/_next/")
  );
}

function listSourceFiles(directory, files = []) {
  for (const entry of readdirSync(new URL(`${directory}/`, `file://${projectRoot}/`))) {
    const relativePath = `${directory}/${entry}`;
    const absoluteUrl = new URL(relativePath, `file://${projectRoot}/`);
    const stat = statSync(absoluteUrl);

    if (stat.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry)) continue;
      listSourceFiles(relativePath, files);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(relativePath);
    }
  }

  return files;
}

const publishedRoutes = collectPublishedRoutes();
const sourceFiles = listSourceFiles("src");

const hrefPatterns = [
  /href=\"(\/[^"]+)\"/g,
  /href:\s*\"(\/[^"]+)\"/g,
];

const missing = [];

for (const sourceFile of sourceFiles) {
  const contents = read(sourceFile);
  for (const pattern of hrefPatterns) {
    for (const match of contents.matchAll(pattern)) {
      const href = match[1];
      if (shouldIgnore(href)) continue;

      const normalized = normalizePath(href);
      if (!publishedRoutes.has(normalized)) {
        missing.push({ href, normalized, sourceFile });
      }
    }
  }
}

if (missing.length > 0) {
  console.error("Internal link audit failed. Missing routes:");
  for (const item of missing) {
    console.error(`- ${item.href} -> ${item.normalized} in ${item.sourceFile}`);
  }
  process.exit(1);
}

console.log(`Internal link audit passed: ${publishedRoutes.size} known routes, ${sourceFiles.length} source files scanned.`);
