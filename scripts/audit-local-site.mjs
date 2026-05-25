const baseUrl = process.env.AUDIT_BASE_URL ?? "http://localhost:3107";

const htmlPages = [
  { path: "/", expectedTitle: "mingliatlas", expectedH1: "Chinese metaphysics guides and free tools", minJsonLd: 3 },
  { path: "/tools", expectedTitle: "Tools", expectedH1: "Free tools", minJsonLd: 2 },
  { path: "/tools/bazi-calculator", expectedTitle: "Free Bazi Calculator", expectedH1: "Free Bazi Calculator", minJsonLd: 3 },
  { path: "/tools/i-ching-oracle", expectedTitle: "Free I Ching Oracle", expectedH1: "Free I Ching Oracle", minJsonLd: 3 },
  { path: "/tools/zodiac-compatibility", expectedTitle: "Chinese Zodiac Compatibility", expectedH1: "Chinese Zodiac Compatibility Calculator", minJsonLd: 3 },
  { path: "/bazi", expectedTitle: "Bazi", expectedH1: "Bazi (Four Pillars of Destiny): Complete Guide", minJsonLd: 3 },
  { path: "/bazi/what-is-bazi", expectedTitle: "What Is Bazi", expectedH1: "What Is Bazi? Four Pillars of Destiny Explained", minJsonLd: 3 },
  { path: "/bazi/ten-gods", expectedTitle: "Ten Gods", expectedH1: "The Ten Gods (Shi Shen): Bazi Relationship Stars", minJsonLd: 3 },
  { path: "/i-ching", expectedTitle: "I Ching", expectedH1: "I Ching (Book of Changes): Complete Guide", minJsonLd: 3 },
  { path: "/i-ching/hexagram-64", expectedTitle: "Hexagram 64", expectedH1: "Hexagram 64: Before Completion (未济)", minJsonLd: 3 },
  { path: "/feng-shui", expectedTitle: "Feng Shui", expectedH1: "Feng Shui: Complete Beginner Guide", minJsonLd: 3 },
  { path: "/ziwei", expectedTitle: "Ziwei", expectedH1: "Ziwei Doushu: Purple Star Astrology Guide", minJsonLd: 3 },
  { path: "/chinese-zodiac", expectedTitle: "Chinese Zodiac", expectedH1: "Chinese Zodiac: 12 Animal Signs, Meanings, and 2026 Guide", minJsonLd: 3 },
  { path: "/learn/beginners-guide", expectedTitle: "Beginner", expectedH1: "Chinese Metaphysics Beginner's Guide", minJsonLd: 3 },
  { path: "/search?q=bazi", expectedTitle: "Search", expectedH1: "Search the knowledge base", minJsonLd: 2 },
  { path: "/sitemap", expectedTitle: "HTML Sitemap", expectedH1: "Site map", minJsonLd: 2 },
];

const machineFiles = [
  {
    path: "/robots.txt",
    expectedContentType: "text/plain",
    requiredText: ["User-Agent: GPTBot", "User-Agent: PerplexityBot", "User-Agent: Google-Extended", "Disallow: /api/"],
  },
  {
    path: "/sitemap.xml",
    expectedContentType: "xml",
    requiredText: ["<urlset", "https://mingliatlas.com/", "https://mingliatlas.com/tools/bazi-calculator", "https://mingliatlas.com/i-ching/hexagram-64"],
  },
  {
    path: "/llms.txt",
    expectedContentType: "text/plain",
    requiredText: ["# mingliatlas", "Full LLM index", "https://mingliatlas.com/tools/bazi-calculator", "not deterministic forecasts"],
  },
  {
    path: "/llms-full.txt",
    expectedContentType: "text/plain",
    requiredText: ["# mingliatlas Full Page Index", "## Bazi", "https://mingliatlas.com/i-ching/hexagram-64"],
  },
  {
    path: "/rss.xml",
    expectedContentType: "application/rss+xml",
    requiredText: ["<rss", "<atom:link", "<guid isPermaLink=\"true\">", "<lastBuildDate>"],
  },
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function extract(text, regex) {
  return text.match(regex)?.[1]?.trim() ?? "";
}

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  const text = await response.text();
  return { response, text };
}

function countJsonLd(html) {
  return (html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>/gi) ?? []).length;
}

function stripTags(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/&#x27;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

console.log(`Auditing local site at ${baseUrl}`);

for (const page of htmlPages) {
  const { response, text } = await fetchText(page.path);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200) fail(`${page.path} expected 200, got ${response.status}`);
  if (!contentType.includes("text/html")) fail(`${page.path} expected HTML, got ${contentType}`);

  const title = stripTags(extract(text, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const h1 = stripTags(extract(text, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const jsonLdCount = countJsonLd(text);
  const canonical = extract(text, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);

  if (!title.includes(page.expectedTitle)) fail(`${page.path} title mismatch: ${title}`);
  if (h1 !== page.expectedH1) fail(`${page.path} h1 mismatch: ${h1}`);
  if (jsonLdCount < page.minJsonLd) fail(`${page.path} JSON-LD count ${jsonLdCount} below ${page.minJsonLd}`);
  if (!canonical) fail(`${page.path} missing canonical link`);

  console.log(`PASS html ${page.path} | h1=${h1} | jsonLd=${jsonLdCount}`);
}

for (const file of machineFiles) {
  const { response, text } = await fetchText(file.path);
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200) fail(`${file.path} expected 200, got ${response.status}`);
  if (!contentType.includes(file.expectedContentType)) fail(`${file.path} expected ${file.expectedContentType}, got ${contentType}`);

  for (const required of file.requiredText) {
    if (!text.includes(required)) fail(`${file.path} missing required text: ${required}`);
  }

  console.log(`PASS machine ${file.path} | content-type=${contentType}`);
}

if (process.exitCode) {
  console.error("Local site audit failed.");
  process.exit(process.exitCode);
}

console.log("Local site audit passed.");
