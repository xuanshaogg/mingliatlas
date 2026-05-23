import { describe, expect, it } from "vitest";
import { createElement, Fragment, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import robots from "@/app/robots";
import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { allFengShuiPages } from "@/content/feng-shui/pages";
import { allIChingPages } from "@/content/i-ching/pages";
import { allLearnPages } from "@/content/learn/pages";
import { allZodiacPages } from "@/content/zodiac/pages";
import { allZiweiPages } from "@/content/ziwei/pages";
import { publishedSitePages } from "@/lib/content/sitePages";
import { SITE } from "@/lib/constants";
import {
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  buildWebApplicationSchema,
} from "@/lib/seo/jsonLd";

const priorityContentQualityUrls = [
  "/bazi",
  "/bazi/what-is-bazi",
  "/bazi/five-elements",
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
  "/blog/i-ching-for-beginners",
  "/blog/changing-lines-i-ching",
  "/blog/chinese-zodiac-compatibility-guide",
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
        entityToken.startsWith(titleToken.slice(0, 4)),
    ),
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

function qualitySignals(page: { data: { sections: Array<{ content: ReactNode; stats?: unknown[]; quotes?: unknown[] }> } }) {
  const markup = sectionMarkup(page);
  const totalSectionStats = page.data.sections.reduce(
    (count, section) => count + (section.stats?.length ?? 0),
    0,
  );
  const totalQuotes = page.data.sections.reduce(
    (count, section) => count + (section.quotes?.length ?? 0),
    0,
  );

  return { markup, totalSectionStats, totalQuotes };
}

function expectPriorityQuality(page: { title: string; description: string; path: string; data: { directAnswer: string; sections: Array<{ content: ReactNode; stats?: unknown[]; quotes?: unknown[] }>; stats: unknown[]; faqs: unknown[]; relatedLinks: unknown[]; citations: unknown[]; schema: { url: string; datePublished?: string; dateModified?: string } } }, path: string) {
  const { markup, totalSectionStats, totalQuotes } = qualitySignals(page);
  const pageText = `${page.title} ${page.description} ${page.data.directAnswer} ${markup}`.toLowerCase();

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
    expect(pageText, `${path} contains placeholder phrase: ${phrase}`).not.toContain(phrase.toLowerCase());
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
    const priorityBots = ["GPTBot", "PerplexityBot", "Google-Extended"];

    for (const bot of priorityBots) {
      expect(robotRules).toContainEqual({
        userAgent: bot,
        allow: "/",
      });
    }
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
      description: "A browser-based Bazi chart calculator.",
      url: `${SITE.url}/tools/bazi-calculator`,
    });

    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(breadcrumbSchema["@type"]).toBe("BreadcrumbList");
    expect(applicationSchema["@type"]).toEqual(["WebApplication", "SoftwareApplication"]);
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
