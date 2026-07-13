import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { publishedSitePages } from "../src/lib/content/sitePages.ts";
import { filterIndexablePages } from "../src/lib/content/indexing.ts";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const publishedRoutes = new Set(publishedSitePages.map((page) => page.href));
const indexableRoutes = new Set(filterIndexablePages(publishedSitePages).map((page) => page.href));

function read(relativePath) {
  return readFileSync(new URL(relativePath, `file://${projectRoot}/`), "utf8");
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
    href.startsWith("/unsubscribe") ||
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
      if (["node_modules", ".next", ".git", "generated"].includes(entry)) continue;
      listSourceFiles(relativePath, files);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(relativePath);
    }
  }

  return files;
}

const sourceFiles = listSourceFiles("src");
const hrefPatterns = [/href="(\/[^\"]+)"/g, /href:\s*"(\/[^\"]+)"/g];
const missing = [];

for (const sourceFile of sourceFiles) {
  const contents = read(sourceFile);
  for (const pattern of hrefPatterns) {
    for (const match of contents.matchAll(pattern)) {
      const href = match[1];
      if (shouldIgnore(href)) continue;

      const normalized = normalizePath(href);
      if (!publishedRoutes.has(normalized)) missing.push({ href, normalized, sourceFile });
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

console.log(
  `Internal link audit passed: ${publishedRoutes.size} published routes, ${indexableRoutes.size} indexable routes, ${sourceFiles.length} source files scanned.`,
);
