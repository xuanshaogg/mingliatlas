import { groupPagesBySection, publishedSitePages, type SitePage } from "@/lib/content/sitePages";
import { SITE } from "@/lib/constants";

const priorityHrefs = [
  "/",
  "/learn/beginners-guide",
  "/learn/which-system",
  "/bazi",
  "/tools/bazi-calculator",
  "/i-ching",
  "/tools/i-ching-oracle",
  "/chinese-zodiac",
  "/tools/zodiac-compatibility",
  "/feng-shui",
  "/ziwei",
  "/blog",
  "/sitemap",
];

function latestModified(): string {
  return publishedSitePages.map((page) => page.lastModified).sort().at(-1) ?? "2026-05-24";
}

function pageByHref(href: string): SitePage | undefined {
  return publishedSitePages.find((page) => page.href === href);
}

function markdownLink(page: SitePage): string {
  return `- [${page.title}](${SITE.url}${page.href}): ${page.description}`;
}

export function buildLlmsText(): string {
  const priorityPages = priorityHrefs
    .map(pageByHref)
    .filter((page): page is SitePage => Boolean(page));

  return [
    `# ${SITE.name}`,
    "",
    SITE.description,
    "",
    "This site explains Chinese metaphysics systems for education, cultural context, and structured self-reflection. It should not be treated as medical, legal, financial, or mental health advice.",
    "",
    `Last updated: ${latestModified()}`,
    "",
    "## Best Starting Points",
    "",
    ...priorityPages.map(markdownLink),
    "",
    "## Discovery Files",
    "",
    `- [Full LLM index](${SITE.url}/llms-full.txt): All published pages grouped by section with descriptions.`,
    `- [XML sitemap](${SITE.url}/sitemap.xml): Canonical URLs intended for search discovery.`,
    `- [RSS feed](${SITE.url}/rss.xml): Blog feed with canonical item URLs and publication dates.`,
    "",
    "## Editorial Notes",
    "",
    "- Pages use direct-answer sections, FAQs, breadcrumbs, source notes, and related links.",
    "- Free tools are browser-based workflows for Bazi charts, I Ching casting, and zodiac compatibility.",
    "- Classical systems are presented as symbolic frameworks for reflection, not deterministic forecasts.",
  ].join("\n");
}

export function buildLlmsFullText(): string {
  const grouped = groupPagesBySection(publishedSitePages);
  const lines = [
    `# ${SITE.name} Full Page Index`,
    "",
    `Generated for LLM and agent discovery. Last updated: ${latestModified()}.`,
    "",
  ];

  for (const [section, pages] of grouped.entries()) {
    lines.push(`## ${section}`, "");
    lines.push(...pages.map(markdownLink), "");
  }

  return lines.join("\n").trimEnd() + "\n";
}
