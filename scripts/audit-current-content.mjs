import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const outDir = join(ROOT, "docs/audit-2026-05");

const contentFiles = [
  { section: "Bazi", rel: "src/content/bazi/pages.tsx", prefix: "/bazi" },
  { section: "Blog", rel: "src/content/blog/posts.tsx", prefix: "/blog" },
  { section: "Feng Shui", rel: "src/content/feng-shui/pages.tsx", prefix: "/feng-shui" },
  { section: "I Ching", rel: "src/content/i-ching/pages.tsx", prefix: "/i-ching" },
  { section: "Learn", rel: "src/content/learn/pages.tsx", prefix: "/learn" },
  { section: "Chinese Zodiac", rel: "src/content/zodiac/pages.tsx", prefix: "/chinese-zodiac" },
  { section: "Ziwei", rel: "src/content/ziwei/pages.tsx", prefix: "/ziwei" },
];

const termMapCamelExists = existsSync(join(ROOT, "src/lib/content/termMap.ts"));
const termMapKebabExists = existsSync(join(ROOT, "src/lib/content/term-map.ts"));
const sitePagesExists = existsSync(join(ROOT, "src/lib/content/sitePages.ts"));

const priorityPaths = new Set([
  "/bazi",
  "/bazi/what-is-bazi",
  "/bazi/five-elements",
  "/bazi/ten-gods",
  "/bazi/luck-pillars",
  "/bazi/free-calculator",
  "/tools/bazi-calculator",
  "/i-ching",
  "/i-ching/hexagram-1",
  "/i-ching/hexagram-2",
  "/i-ching/how-to-cast",
  "/learn/beginners-guide",
  "/learn/which-system",
  "/chinese-zodiac",
  "/chinese-zodiac/dragon",
  "/chinese-zodiac/compatibility",
  "/chinese-zodiac/2026-forecast",
  "/feng-shui",
  "/feng-shui/home/bedroom",
  "/feng-shui/home/front-door",
  "/ziwei",
  "/ziwei/ziwei-vs-bazi",
  "/ziwei/twelve-palaces",
  "/ziwei/major-stars",
]);

const genericCitationLabels = [
  "bazi tradition",
  "chinese calendar tradition",
  "chinese metaphysics tradition",
  "classical four pillars practice",
  "earthly branch tradition",
  "feng shui tradition",
  "form school tradition",
  "compass school tradition",
  "i ching tradition",
  "i ching commentarial tradition",
  "coin method tradition",
  "heavenly stem theory",
];

const placeholderPhrases = [
  "seed article",
  "mvp page",
  "later editorial pass",
  "placeholder",
  "content library",
];

const csv = (rows) =>
  rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

async function readSrc(rel) {
  return readFile(join(ROOT, rel), "utf8").catch(() => "");
}

function stripJsx(text) {
  return text
    .replace(/<Link\b[^>]*>([\s\S]*?)<\/Link>/g, "$1")
    .replace(/<TermLink\b[^>]*>([\s\S]*?)<\/TermLink>/g, "$1")
    .replace(/<cite\b[^>]*>([\s\S]*?)<\/cite>/g, "$1")
    .replace(/<em\b[^>]*>([\s\S]*?)<\/em>/g, "$1")
    .replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[{}]/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  return stripJsx(text).split(/\s+/).filter(Boolean).length;
}

function countMatches(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

function stringField(block, name) {
  const quoted = block.match(new RegExp(`${name}\\s*:\\s*"([^"]*)"`, "m"));
  if (quoted) return quoted[1];

  const conditionalQuoted = block.match(new RegExp(`${name}\\s*:[\\s\\S]{0,240}\\?\\s*"([^"]*)"`, "m"));
  if (conditionalQuoted) return conditionalQuoted[1];

  const template = block.match(new RegExp(`${name}\\s*:\\s*` + "`" + `([^` + "`" + `]*)` + "`", "m"));
  if (template) return template[1];

  return "";
}

function extractBlocks(src, startPattern) {
  const starts = [];
  for (const match of src.matchAll(startPattern)) {
    starts.push(match.index ?? 0);
  }

  return starts.map((start, index) => {
    const end = starts[index + 1] ?? src.length;
    return src.slice(start, end);
  });
}

function pageType(path, section) {
  if (section === "Blog") return "blog";
  if (path === "/bazi" || path === "/i-ching" || path === "/feng-shui" || path === "/ziwei" || path === "/chinese-zodiac") {
    return "hub";
  }
  if (path.startsWith("/tools/") || path.endsWith("/free-calculator")) return "tool";
  return "knowledge";
}

function minimumWords(type, priority) {
  if (type === "hub") return priority ? 1500 : 1000;
  if (type === "blog") return priority ? 1400 : 800;
  if (type === "tool") return priority ? 900 : 600;
  return priority ? 1200 : 650;
}

function targetWords(type) {
  if (type === "hub") return "2500-3500";
  if (type === "blog") return "1800-2800";
  if (type === "tool") return "1200-1800";
  return "1200-2500";
}

function qualityGrade(score) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

function scorePage(metrics) {
  let score = 0;
  score += Math.min(25, Math.round((metrics.wordCount / metrics.minimumWords) * 25));
  score += metrics.directAnswerWords >= 40 && metrics.directAnswerWords <= 75 ? 15 : metrics.directAnswerWords >= 30 ? 8 : 0;
  score += Math.min(12, metrics.sectionCount * 3);
  score += Math.min(12, metrics.faqCount * 3);
  score += Math.min(12, metrics.citationCount * 4);
  score += Math.min(8, metrics.statCount * 2);
  score += Math.min(8, metrics.internalLinkCount * 2);
  score += metrics.genericCitationCount >= metrics.citationCount && metrics.citationCount > 0 ? -8 : 0;
  score += metrics.templateRisk === "high" ? -10 : metrics.templateRisk === "medium" ? -4 : 0;
  score += metrics.placeholderRisk ? -10 : 0;
  return Math.max(0, Math.min(100, score));
}

function slugRowsFromArray(src, section, prefix, arrayName) {
  const rows = [];
  const arrayMatch = src.match(new RegExp(`const\\s+${arrayName}\\s*[^=]*=\\s*\\[([\\s\\S]*?)\\];`));
  if (!arrayMatch) return rows;
  const generatorTemplate = src.match(new RegExp(`function\\s+create[A-Za-z]+\\([^)]*\\)[\\s\\S]*?(?=\\n(?:const|export|function)\\s)`, "m"))?.[0] ?? "";

  for (const object of arrayMatch[1].matchAll(/\{([\s\S]*?)\}/g)) {
    const block = object[1];
    const slug = stringField(block, "slug");
    const title = stringField(block, "title");
    const description = stringField(block, "description");
    if (!slug || !title) continue;

    rows.push({
      section,
      file: `${arrayName}[]`,
      path: `${prefix}/${slug}`,
      slug,
      title,
      description,
      sourceBlock: `${block}\n${generatorTemplate}`,
      generated: true,
    });
  }

  return rows;
}

function analyzePage(page) {
  const block = page.sourceBlock;
  const type = pageType(page.path, page.section);
  const priority = priorityPaths.has(page.path);
  const minimum = minimumWords(type, priority);
  const directAnswer = stringField(block, "directAnswer");
  const citationLabels = [...block.matchAll(/label:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((label) => !["Home", "Bazi", "Blog", "Tools", "I Ching", "Feng Shui", "Ziwei", "Chinese Zodiac", "Learn"].includes(label));
  const genericCitationCount = citationLabels.filter((label) =>
    genericCitationLabels.includes(label.toLowerCase()),
  ).length;
  const sectionsArray = block.match(/sections:\s*\[([\s\S]*?)\],\s*faqs:/)?.[1] ?? "";
  const relatedArray = block.match(/relatedLinks:\s*\[([\s\S]*?)\],\s*cta:/)?.[1] ?? "";
  const faqsValue = block.match(/faqs:\s*([^,\n]+)/)?.[1] ?? "";
  const faqCount = faqsValue.includes("defaultFaqs") || faqsValue.includes("baseFaqs")
    ? 4
    : countMatches(block, /question:\s*"/g);
  const statsCount = countMatches(block, /value:\s*"/g);
  const internalLinkCount = countMatches(block, /href="\/[^"]+"/g) + countMatches(block, /href:\s*"\/[^"]+"/g);
  const sectionCount = countMatches(sectionsArray, /heading:\s*/g);
  const quoteCount = countMatches(block, /quotes:\s*\[/g) + (block.includes("withEditorialQuote") ? 1 : 0);
  const text = [page.title, page.description, directAnswer, sectionsArray, relatedArray].join(" ");
  const textWords = wordCount(text);
  const templateRisk =
    page.generated && textWords < minimum ? "high" :
    page.generated || genericCitationCount >= Math.max(2, citationLabels.length) ? "medium" :
    "low";
  const placeholderRisk = placeholderPhrases.some((phrase) => text.toLowerCase().includes(phrase));

  const metrics = {
    ...page,
    type,
    priority,
    wordCount: textWords,
    minimumWords: minimum,
    targetWords: targetWords(type),
    directAnswerWords: wordCount(directAnswer),
    sectionCount,
    faqCount,
    citationCount: Math.max(0, citationLabels.length),
    genericCitationCount,
    statCount: statsCount,
    quoteCount,
    internalLinkCount,
    templateRisk,
    placeholderRisk,
  };
  const score = scorePage(metrics);

  return {
    ...metrics,
    score,
    grade: qualityGrade(score),
    action:
      score < 55 ? "rewrite" :
      metrics.wordCount < metrics.minimumWords ? "expand" :
      metrics.genericCitationCount >= metrics.citationCount && metrics.citationCount > 0 ? "upgrade citations" :
      "monitor",
  };
}

const pages = [];

for (const file of contentFiles) {
  const src = await readSrc(file.rel);
  const buildBlocks = extractBlocks(src, /buildPage\(\{/g);

  for (const block of buildBlocks) {
    const explicitPath = stringField(block, "path");
    const explicitSlug = stringField(block, "slug");
    const title = stringField(block, "title");
    const description = stringField(block, "description");

    if (!explicitPath || explicitPath.includes("${") || !title) continue;

    pages.push({
      section: file.section,
      file: file.rel,
      path: explicitPath,
      slug: explicitSlug,
      title,
      description,
      sourceBlock: block,
      generated: false,
    });
  }

  if (file.section === "Bazi") {
    const topicMatch = src.match(/const briefTopics = \[([\s\S]*?)\] as const;/);
    const generatedTemplate = src.match(/const generatedBriefPages =[\s\S]*?(?=\nexport const allBaziPages)/)?.[0] ?? "";
    if (topicMatch) {
      for (const row of topicMatch[1].matchAll(/\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]/g)) {
        const [, slug, title, description] = row;
        pages.push({
          section: file.section,
          file: "briefTopics[]",
          path: `${file.prefix}/${slug}`,
          slug,
          title,
          description,
          sourceBlock: `${row[0]}\n${generatedTemplate}`,
          generated: true,
        });
      }
    }
  }

  if (file.section === "Blog") {
    const seedRows = slugRowsFromArray(src, file.section, file.prefix, "editorialSeeds");
    const highIntentSlugs = new Set(
      [...src.matchAll(/slug:\s*"([^"]+)"/g)]
        .map((match) => match[1])
        .filter((slug, index, all) => all.indexOf(slug) !== index),
    );
    pages.push(...seedRows.filter((row) => !highIntentSlugs.has(row.slug)));
  }

  if (file.section === "Feng Shui") {
    pages.push(...slugRowsFromArray(src, file.section, file.prefix, "topics"));
  }

  if (file.section === "Ziwei") {
    pages.push(...slugRowsFromArray(src, file.section, file.prefix, "topics"));
  }

  if (file.section === "Chinese Zodiac") {
    pages.push(...slugRowsFromArray(src, file.section, file.prefix, "animals"));
  }
}

const seen = new Set();
const analyzed = pages
  .filter((page) => {
    if (seen.has(page.path)) return false;
    seen.add(page.path);
    return true;
  })
  .map(analyzePage)
  .sort((a, b) => a.path.localeCompare(b.path));

const qualityRows = [[
  "path",
  "section",
  "type",
  "priority",
  "title",
  "wordCount",
  "minimumWords",
  "targetWords",
  "directAnswerWords",
  "sections",
  "faqs",
  "citations",
  "genericCitations",
  "stats",
  "quotes",
  "internalLinks",
  "templateRisk",
  "placeholderRisk",
  "score",
  "grade",
  "action",
]];

for (const page of analyzed) {
  qualityRows.push([
    page.path,
    page.section,
    page.type,
    page.priority ? "yes" : "no",
    page.title,
    page.wordCount,
    page.minimumWords,
    page.targetWords,
    page.directAnswerWords,
    page.sectionCount,
    page.faqCount,
    page.citationCount,
    page.genericCitationCount,
    page.statCount,
    page.quoteCount,
    page.internalLinkCount,
    page.templateRisk,
    page.placeholderRisk ? "yes" : "no",
    page.score,
    page.grade,
    page.action,
  ]);
}

const priorityRows = [["path", "section", "title", "score", "grade", "action", "reason"]];
for (const page of analyzed
  .filter((page) => page.priority || page.score < 60 || page.templateRisk === "high")
  .sort((a, b) => a.score - b.score || a.path.localeCompare(b.path))
  .slice(0, 80)) {
  const reasons = [];
  if (page.wordCount < page.minimumWords) reasons.push(`word count ${page.wordCount}/${page.minimumWords}`);
  if (page.genericCitationCount >= page.citationCount && page.citationCount > 0) reasons.push("generic citations");
  if (page.templateRisk !== "low") reasons.push(`${page.templateRisk} template risk`);
  if (page.placeholderRisk) reasons.push("placeholder phrase");
  if (page.directAnswerWords < 40 || page.directAnswerWords > 75) reasons.push(`direct answer ${page.directAnswerWords} words`);

  priorityRows.push([page.path, page.section, page.title, page.score, page.grade, page.action, reasons.join("; ") || "priority page"]);
}

const entityRows = [["source_file", "term", "slug", "dual_source_risk"]];
const risk = termMapCamelExists && termMapKebabExists ? "HIGH - both files exist" : "none";
if (termMapCamelExists) {
  const src = await readSrc("src/lib/content/termMap.ts");
  for (const [, term, slug] of src.matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
    entityRows.push(["termMap.ts", term, slug, risk]);
  }
}
if (termMapKebabExists && termMapCamelExists) {
  entityRows.push(["term-map.ts", "(re-export of termMap.ts)", "", risk]);
}

const intentRows = [
  ["gap_id", "intent_hypothesis", "category", "status", "basis"],
  ["IG-01", "What is Bazi / Four Pillars?", "bazi", "covered-needs-depth", "/bazi and /bazi/what-is-bazi exist"],
  ["IG-02", "How to read a Bazi chart step by step", "bazi", "partial", "/blog/how-to-read-a-bazi-chart exists; knowledge-page landing still recommended"],
  ["IG-03", "Bazi compatibility between two people", "bazi", "partial", "/bazi/relationships exists; dedicated compatibility page still recommended"],
  ["IG-04", "What is I Ching and how to use it", "i-ching", "covered-needs-depth", "/i-ching and /i-ching/how-to-cast exist"],
  ["IG-05", "I Ching hexagram meanings lookup", "i-ching", "partial", "/i-ching/sixty-four-hexagrams exists; strengthen index UX and copy"],
  ["IG-06", "Feng Shui basics for beginners", "feng-shui", "covered-needs-depth", "/feng-shui exists; home subcluster needs depth"],
  ["IG-07", "Chinese Zodiac compatibility", "zodiac", "covered", "/chinese-zodiac/compatibility and tool exist"],
  ["IG-08", "Ziwei Doushu vs Bazi comparison", "ziwei", "covered-needs-depth", "/ziwei/ziwei-vs-bazi exists"],
  ["IG-09", "Free Chinese astrology tools", "tools", "covered", "/tools and three tool pages exist"],
  ["IG-10", "Learn which Chinese metaphysics system to use", "learn", "covered", "/learn/which-system exists"],
];

const bySection = new Map();
for (const page of analyzed) {
  const stats = bySection.get(page.section) ?? { pages: 0, avgScore: 0, highRisk: 0, priority: 0 };
  stats.pages += 1;
  stats.avgScore += page.score;
  if (page.templateRisk === "high" || page.grade === "D") stats.highRisk += 1;
  if (page.priority) stats.priority += 1;
  bySection.set(page.section, stats);
}

const summaryRows = [["section", "pages", "priorityPages", "averageScore", "highRiskPages"]];
for (const [section, stats] of [...bySection.entries()].sort()) {
  summaryRows.push([
    section,
    stats.pages,
    stats.priority,
    Math.round(stats.avgScore / stats.pages),
    stats.highRisk,
  ]);
}

await mkdir(outDir, { recursive: true });

const outputs = {
  "content-quality-baseline.csv": qualityRows,
  "priority-action-list.csv": priorityRows,
  "entity-coverage.csv": entityRows,
  "intent-gap-list.csv": intentRows,
  "section-quality-summary.csv": summaryRows,
};

for (const [name, rows] of Object.entries(outputs)) {
  await writeFile(join(outDir, name), csv(rows), "utf8");
  console.log(`✅ docs/audit-2026-05/${name} (${rows.length - 1} data rows)`);
}

const totalPages = analyzed.length;
const averageScore = Math.round(analyzed.reduce((sum, page) => sum + page.score, 0) / totalPages);
const highRiskPages = analyzed.filter((page) => page.templateRisk === "high" || page.grade === "D");
const priorityNeedsWork = analyzed.filter((page) => page.priority && page.action !== "monitor");

const md = `# Audit Summary — Content Quality Baseline

Generated: ${new Date().toISOString().slice(0, 10)}

## Discovery Results

| Item | Value |
|------|-------|
| Content files scanned | ${contentFiles.length} |
| Analyzed content pages | ${totalPages} |
| Average quality score | ${averageScore} |
| High-risk pages | ${highRiskPages.length} |
| Priority pages needing work | ${priorityNeedsWork.length} |
| sitePages.ts exists | ${sitePagesExists} |
| termMap.ts (camelCase) | ${termMapCamelExists} |
| term-map.ts (kebab-case) | ${termMapKebabExists} |

## Section Summary

${summaryRows.slice(1).map(([section, pages, priority, avg, highRisk]) => `- ${section}: ${pages} pages, ${priority} priority, average score ${avg}, ${highRisk} high-risk`).join("\n")}

## Top Action Items

${priorityRows.slice(1, 16).map(([path, section, _title, score, grade, action, reason]) => `- ${path} (${section}, ${grade}/${score}): ${action} — ${reason}`).join("\n")}

## Notes

- The audit estimates rendered text from content source blocks, JSX paragraphs, stats, FAQs, and links. It is stricter than the current GEO unit test because it highlights thin or highly templated pages even when required fields exist.
- Generic citations are counted separately from named classical texts, books, or specific authors. Priority pages should move toward named, verifiable sources.
- \`term-map.ts\` currently re-exports \`termMap.ts\`; keep it as a compatibility wrapper unless imports are consolidated.
`;

await writeFile(join(outDir, "audit-summary.md"), md, "utf8");
console.log("✅ docs/audit-2026-05/audit-summary.md updated");
