import { describe, expect, it } from "vitest";
import { createElement, Fragment, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "@/app/sitemap";
import { GET as getLlmsFullTxt } from "@/app/llms-full.txt/route";
import { GET as getLlmsTxt } from "@/app/llms.txt/route";
import robots from "@/app/robots";
import { GET as getRssFeed } from "@/app/rss.xml/route";
import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { allFengShuiPages } from "@/content/feng-shui/pages";
import { allIChingPages } from "@/content/i-ching/pages";
import { allLearnPages } from "@/content/learn/pages";
import { allZodiacPages } from "@/content/zodiac/pages";
import { allZiweiPages } from "@/content/ziwei/pages";
import { filterIndexablePages } from "@/lib/content/indexing";
import { publishedSitePages } from "@/lib/content/sitePages";
import { AUTHOR, SITE } from "@/lib/constants";
import {
  buildArticleDefinedTermSchema,
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  buildWebApplicationSchema,
} from "@/lib/seo/jsonLd";

const priorityContentQualityUrls = [
  "/bazi",
  "/bazi/what-is-bazi",
  "/bazi/five-elements",
  "/bazi/heavenly-stems",
  "/bazi/earthly-branches",
  "/bazi/ten-gods",
  "/bazi/luck-pillars",
  "/bazi/career",
  "/bazi/relationships",
  "/bazi/health",
  "/bazi/faq",
  "/bazi/glossary",
  "/chinese-zodiac",
  "/i-ching",
  "/feng-shui",
  "/ziwei",
  "/learn",
  "/learn/beginners-guide",
  "/learn/chinese-vs-western-astrology",
  "/learn/common-misconceptions",
  "/learn/which-system",
  "/learn/resources",
];

const priorityBlogQualityUrls = [
  "/blog/how-to-read-a-bazi-chart",
  "/blog/day-master-meaning",
  "/blog/ren-water-day-master",
  "/blog/i-ching-for-beginners",
  "/blog/changing-lines-i-ching",
  "/blog/chinese-zodiac-compatibility-guide",
];

const priorityBaziQualityUrls = [
  "/bazi/ten-gods",
  "/bazi/luck-pillars",
  "/bazi/career",
  "/bazi/relationships",
  "/bazi/health",
  "/bazi/faq",
  "/bazi/glossary",
];

const placeholderPhrases = ["seed article", "later editorial pass", "MVP page"];
const classicalCitationSignals = [
  "Yuan Hai Zi Ping",
  "San Ming Tong Hui",
  "Huangdi Neijing",
  "Earthly Branch tradition",
  "Chinese calendar tradition",
];

const knowledgePages = [
  ...allBaziPages,
  ...allFengShuiPages,
  ...allIChingPages,
  ...allLearnPages,
  ...allZodiacPages,
  ...allZiweiPages,
];

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeEntityText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\btwelve\b/g, "12")
    .replace(/\bsixty-four\b/g, "64")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sharesEntityToken(title: string, entityName: string): boolean {
  const titleTokens = normalizeEntityText(title).split(" ");
  const entityTokens = normalizeEntityText(entityName)
    .split(" ")
    .filter((token) => token.length >= 3);

  return entityTokens.some((entityToken) =>
    titleTokens.some(
      (titleToken) =>
        titleToken === entityToken ||
        titleToken.startsWith(entityToken.slice(0, 4)) ||
        entityToken.startsWith(titleToken.slice(0, 4))
    )
  );
}

function sourceFile(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function sectionMarkup(page: { data: { sections: Array<{ content: ReactNode }> } }): string {
  return page.data.sections
    .map((section) => renderToStaticMarkup(createElement(Fragment, null, section.content)))
    .join(" ");
}

function inlineCitationSignalCount(markup: string): number {
  const citeTagCount = (markup.match(/<cite\b/gi) ?? []).length;
  const sourceNameCount = classicalCitationSignals.reduce((count, sourceName) => {
    const escapedSourceName = sourceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return count + (markup.match(new RegExp(escapedSourceName, "gi")) ?? []).length;
  }, 0);

  return Math.max(citeTagCount, sourceNameCount);
}

function qualitySignals(page: {
  data: { sections: Array<{ content: ReactNode; stats?: unknown[]; quotes?: unknown[] }> };
}) {
  const markup = sectionMarkup(page);
  const totalSectionStats = page.data.sections.reduce(
    (count, section) => count + (section.stats?.length ?? 0),
    0
  );
  const totalQuotes = page.data.sections.reduce(
    (count, section) => count + (section.quotes?.length ?? 0),
    0
  );

  return { markup, totalSectionStats, totalQuotes };
}

function expectPriorityQuality(
  page: {
    title: string;
    description: string;
    path: string;
    data: {
      directAnswer: string;
      sections: Array<{ content: ReactNode; stats?: unknown[]; quotes?: unknown[] }>;
      stats: unknown[];
      faqs: unknown[];
      relatedLinks: unknown[];
      citations: unknown[];
      schema: { url: string; datePublished?: string; dateModified?: string };
    };
  },
  path: string
) {
  const { markup, totalSectionStats, totalQuotes } = qualitySignals(page);
  const pageText =
    `${page.title} ${page.description} ${page.data.directAnswer} ${markup}`.toLowerCase();

  expect(wordCount(page.data.directAnswer), path).toBeGreaterThanOrEqual(40);
  expect(wordCount(page.data.directAnswer), path).toBeLessThanOrEqual(75);
  expect(page.data.sections.length, path).toBeGreaterThanOrEqual(4);
  expect(page.data.stats.length + totalSectionStats, path).toBeGreaterThanOrEqual(3);
  expect(totalQuotes, path).toBeGreaterThanOrEqual(1);
  expect(page.data.citations.length, path).toBeGreaterThanOrEqual(2);
  expect(inlineCitationSignalCount(markup), path).toBeGreaterThanOrEqual(2);
  expect(page.data.faqs.length, path).toBeGreaterThanOrEqual(4);
  expect(page.data.relatedLinks.length, path).toBeGreaterThanOrEqual(3);
  expect(page.data.schema.url, path).toBe(`${SITE.url}${path}`);
  expect(page.data.schema.datePublished, path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(page.data.schema.dateModified, path).toMatch(/^\d{4}-\d{2}-\d{2}$/);

  for (const phrase of placeholderPhrases) {
    expect(pageText, `${path} contains placeholder phrase: ${phrase}`).not.toContain(
      phrase.toLowerCase()
    );
  }
}

describe("GEO audit", () => {
  it("keeps the published URL inventory large and unique", () => {
    const hrefs = publishedSitePages.map((page) => page.href);
    const uniqueHrefs = new Set(hrefs);

    expect(publishedSitePages.length).toBeGreaterThanOrEqual(200);
    expect(uniqueHrefs.size).toBe(hrefs.length);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/tools/bazi-calculator");
    expect(hrefs).not.toContain("/bazi/free-calculator");
    expect(hrefs).toContain("/i-ching/hexagram-64");
  });

  it("keeps knowledge pages in answer-first GEO shape", () => {
    expect(knowledgePages.length).toBeGreaterThanOrEqual(150);

    for (const page of knowledgePages) {
      const directAnswerLength = wordCount(page.data.directAnswer);

      expect(sharesEntityToken(page.title, page.data.entityName), page.path).toBe(true);
      expect(directAnswerLength, page.path).toBeGreaterThanOrEqual(30);
      expect(directAnswerLength, page.path).toBeLessThanOrEqual(95);
      expect(page.data.faqs.length, page.path).toBeGreaterThanOrEqual(4);
      expect(page.data.relatedLinks.length, page.path).toBeGreaterThanOrEqual(3);
      expect(page.data.citations.length, page.path).toBeGreaterThanOrEqual(2);
      expect(page.data.breadcrumbs.length, page.path).toBeGreaterThanOrEqual(2);
      expect(page.data.schema.url, page.path).toBe(`${SITE.url}${page.path}`);
      expect(page.data.schema.datePublished, page.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(page.data.schema.dateModified, page.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("keeps priority knowledge pages in the content-quality slice", () => {
    for (const path of priorityContentQualityUrls) {
      const page = knowledgePages.find((candidate) => candidate.path === path);

      expect(page, path).toBeDefined();
      if (!page) continue;

      expectPriorityQuality(page, path);
    }
  });

  it("keeps the Bazi expansion batch in the content-quality slice", () => {
    for (const path of priorityBaziQualityUrls) {
      const page = knowledgePages.find((candidate) => candidate.path === path);

      expect(page, path).toBeDefined();
      if (!page) continue;

      expectPriorityQuality(page, path);
    }
  });

  it("keeps priority blog pages in the content-quality slice", () => {
    for (const path of priorityBlogQualityUrls) {
      const page = allBlogPosts.find((candidate) => candidate.path === path);

      expect(page, path).toBeDefined();
      if (!page) continue;

      expectPriorityQuality(page, path);
    }
  });

  it("allows priority AI crawlers in robots.txt", () => {
    const robotRules = robots().rules;
    const priorityBots = [
      "GPTBot",
      "OAI-SearchBot",
      "ChatGPT-User",
      "PerplexityBot",
      "ClaudeBot",
      "Claude-SearchBot",
      "anthropic-ai",
      "CCBot",
      "Google-Extended",
    ];

    for (const bot of priorityBots) {
      expect(robotRules).toContainEqual({
        userAgent: bot,
        allow: "/",
      });
    }
  });

  it("keeps XML sitemap entries canonical and stable", () => {
    const sitemapEntries = sitemap();
    const entriesByUrl = new Map(sitemapEntries.map((entry) => [entry.url, entry]));
    const indexablePages = filterIndexablePages(publishedSitePages);

    expect(sitemapEntries.length).toBe(indexablePages.length);
    expect(entriesByUrl.size).toBe(sitemapEntries.length);
    expect(entriesByUrl.has(`${SITE.url}/contact/submit/success`)).toBe(false);
    expect(entriesByUrl.has(`${SITE.url}/subscribe/success`)).toBe(false);
    expect(entriesByUrl.has(`${SITE.url}/sitemap`)).toBe(false);
    expect(entriesByUrl.has(`${SITE.url}/bazi/free-calculator`)).toBe(false);

    for (const page of indexablePages) {
      const entry = entriesByUrl.get(`${SITE.url}${page.href}`);

      expect(entry, page.href).toBeDefined();
      expect(entry?.lastModified, page.href).toBe(page.lastModified);
      expect(entry?.changeFrequency, page.href).toBeTruthy();
      expect(entry?.priority, page.href).toBeGreaterThan(0);
    }
  });

  it("exposes AI-readable discovery files", async () => {
    const llms = await getLlmsTxt().text();
    const fullLlms = await getLlmsFullTxt().text();

    expect(llms).toContain(`# ${SITE.name}`);
    expect(llms).toContain(`${SITE.url}/llms-full.txt`);
    expect(llms).toContain(`${SITE.url}/tools/bazi-calculator`);
    expect(llms).toContain("## Core Entities");
    expect(llms).toContain("## Canonical Entity Pages");
    expect(llms).toContain(`${SITE.url}/bazi/five-elements`);
    expect(llms).toContain("## Citation Policy");
    expect(fullLlms).toContain(`# ${SITE.name} Full Page Index`);
    expect(fullLlms).toContain("## Bazi");
    expect(fullLlms).toContain(`${SITE.url}/i-ching/hexagram-64`);
    expect(llms).toContain(`${SITE.url}/blog/ren-water-day-master`);
    expect(llms).toContain(`${SITE.url}/bazi/ten-gods`);
    expect(llms).toContain(`${SITE.url}/bazi/luck-pillars`);
  });

  it("keeps RSS feed machine-readable for blog discovery", async () => {
    const rss = await getRssFeed().text();

    expect(rss).toContain('<atom:link href="');
    expect(rss).toContain('<guid isPermaLink="true">');
    expect(rss).toContain("<pubDate>");
    expect(rss).toContain("<lastBuildDate>");
  });

  it("builds schema required by the GEO matrix", () => {
    const faqSchema = buildFAQPageSchema([
      {
        question: "What is Bazi?",
        answer: "Bazi is a Chinese Four Pillars birth-chart system.",
      },
    ]);
    const breadcrumbSchema = buildBreadcrumbListSchema([
      { label: "Home", href: "/" },
      { label: "Tools", href: "/tools" },
    ]);
    const applicationSchema = buildWebApplicationSchema({
      name: "Free Bazi Calculator",
      alternateName: ["Ming Li Bazi Calculator"],
      description: "A browser-based Bazi chart calculator.",
      url: `${SITE.url}/tools/bazi-calculator`,
    });
    const articleSchema = buildArticleDefinedTermSchema({
      headline: "The Five Elements",
      description: "A guide to Wu Xing.",
      url: `${SITE.url}/bazi/five-elements`,
      entityName: "Five Elements",
      entityType: "DefinedTerm",
      citations: [
        {
          label: "San Ming Tong Hui",
          source: "Classical Bazi reference.",
        },
      ],
      mentions: [
        {
          name: "Bazi",
          url: "/bazi",
        },
      ],
    });

    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(breadcrumbSchema["@type"]).toBe("BreadcrumbList");
    expect(applicationSchema["@type"]).toEqual(["WebApplication", "SoftwareApplication"]);
    expect(applicationSchema.alternateName).toEqual(["Ming Li Bazi Calculator"]);
    expect(articleSchema.isPartOf).toMatchObject({ "@type": "WebSite", name: SITE.name });
    expect(articleSchema.about).toMatchObject({ "@type": "DefinedTerm", name: "Five Elements" });
    expect(articleSchema.citation).toEqual([
      {
        "@type": "Book",
        name: "San Ming Tong Hui",
        description: "Classical Bazi reference.",
      },
    ]);
    expect(articleSchema.mentions).toEqual([
      {
        "@type": "DefinedTerm",
        name: "Bazi",
        url: `${SITE.url}/bazi`,
      },
    ]);
    expect(articleSchema.author).toMatchObject({
      "@type": "Organization",
      name: AUTHOR.name,
      url: AUTHOR.url,
    });
  });

  it("consolidates the retired Bazi calculator route", () => {
    const config = sourceFile("next.config.ts");

    expect(config).toContain('source: "/bazi/free-calculator"');
    expect(config).toContain('destination: "https://mingliatlas.com/tools/bazi-calculator"');
  });

  it("keeps high-impression pages aligned with current search intent", () => {
    const dragon = allZodiacPages.find((page) => page.path === "/chinese-zodiac/dragon");
    const dayMaster = allBlogPosts.find(
      (page) => page.path === "/blog/day-master-bazi-complete-guide"
    );

    expect(dragon?.title).toContain("1940–2036");
    expect(dragon?.title).toContain("Years List");
    expect(dragon?.data.schema.dateModified).toBe("2026-07-14");
    expect(
      allZodiacPages
        .filter((page) => page.data.stats.some((stat) => stat.label === "Cycle rank"))
        .every((page) => page.title.includes("Years List"))
    ).toBe(true);
    expect(dayMaster?.title).toContain("Classical Sources");
    expect(dayMaster?.data.schema.dateModified).toBe("2026-07-13");
    expect(dayMaster?.data.citations.every((citation) => Boolean(citation.url))).toBe(true);
  });

  it("keeps the second indexing batch concrete and source-backed", () => {
    const tenGods = allBaziPages.find((page) => page.path === "/bazi/ten-gods");
    const luckPillars = allBaziPages.find((page) => page.path === "/bazi/luck-pillars");
    const renWater = allBlogPosts.find((page) => page.path === "/blog/ren-water-day-master");

    expect(tenGods?.data.sections.some((section) => section.heading.includes("Jia Wood"))).toBe(
      true
    );
    expect(tenGods?.data.schema.dateModified).toBe("2026-07-12");
    expect(tenGods?.data.citations.every((citation) => Boolean(citation.url))).toBe(true);
    expect(
      luckPillars?.data.sections.some((section) => section.heading.includes("Geng-Shen"))
    ).toBe(true);
    expect(luckPillars?.data.schema.dateModified).toBe("2026-07-12");
    expect(sectionMarkup(luckPillars!)).toContain("does not generate Luck Pillars");
    expect(
      renWater?.data.sections.some((section) => section.heading.includes("Ren Water vs Gui Water"))
    ).toBe(true);
    expect(renWater?.data.schema.dateModified).toBe("2026-07-12");
    expect(renWater?.data.citations.every((citation) => Boolean(citation.url))).toBe(true);
  });

  it("keeps the third high-opportunity batch query-aligned and source-backed", () => {
    const earthlyBranches = allBaziPages.find((page) => page.path === "/bazi/earthly-branches");
    const compatibilityChart = allBlogPosts.find(
      (page) => page.path === "/blog/chinese-zodiac-compatibility-chart"
    );

    expect(earthlyBranches?.title).toContain("12 Earthly Branches");
    expect(earthlyBranches?.title).toContain("Hidden Stems");
    expect(earthlyBranches?.data.schema.dateModified).toBe("2026-07-12");
    expect(
      earthlyBranches?.data.sections.some((section) =>
        section.heading.includes("Earthly Branches reference table")
      )
    ).toBe(true);
    expect(earthlyBranches?.data.citations.every((citation) => Boolean(citation.url))).toBe(true);

    expect(compatibilityChart?.title).toContain("Chinese Zodiac Compatibility Chart");
    expect(compatibilityChart?.title).toContain("All 12 Signs");
    expect(compatibilityChart?.data.schema.dateModified).toBe("2026-07-13");
    expect(
      compatibilityChart?.data.sections.some((section) =>
        section.heading.includes("compatibility chart for all 12 signs")
      )
    ).toBe(true);
    expect(compatibilityChart?.data.citations.every((citation) => Boolean(citation.url))).toBe(
      true
    );
  });

  it("renders Day Master templates without interpolation artifacts", () => {
    const dayMasterPages = allBlogPosts.filter((page) =>
      /^(jia|yi|bing|ding|wu|ji|geng|xin|ren|gui)-.+-day-master$/.test(page.slug)
    );

    expect(dayMasterPages).toHaveLength(10);
    for (const page of dayMasterPages) {
      const markup = sectionMarkup(page);

      expect(markup, page.path).not.toContain("$");
      expect(inlineCitationSignalCount(markup), page.path).toBeGreaterThanOrEqual(2);
      expect(
        page.data.citations.every((citation) => Boolean(citation.url)),
        page.path
      ).toBe(true);
    }
  });

  it("keeps tool pages covered by WebApplication schema", () => {
    const toolPageFiles = [
      "src/app/tools/bazi-calculator/page.tsx",
      "src/app/tools/i-ching-oracle/page.tsx",
      "src/app/tools/zodiac-compatibility/page.tsx",
    ];

    for (const path of toolPageFiles) {
      const contents = sourceFile(path);

      expect(contents, path).toContain("buildWebApplicationSchema");
      expect(contents, path).toContain("buildBreadcrumbListSchema");
      expect(contents, path).toContain("<JsonLd");
    }

    expect(sourceFile("src/app/tools/page.tsx")).toContain("buildItemListSchema");
  });
});
