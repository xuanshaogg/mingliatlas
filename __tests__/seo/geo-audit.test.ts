import { describe, expect, it } from "vitest";
import { createElement, Fragment, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import robots from "@/app/robots";
import { allBaziPages } from "@/content/bazi/pages";
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
];
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

      const markup = sectionMarkup(page);
      const totalSectionStats = page.data.sections.reduce(
        (count, section) => count + (section.stats?.length ?? 0),
        0,
      );
      const totalQuotes = page.data.sections.reduce(
        (count, section) => count + (section.quotes?.length ?? 0),
        0,
      );

      expect(wordCount(page.data.directAnswer), path).toBeGreaterThanOrEqual(40);
      expect(wordCount(page.data.directAnswer), path).toBeLessThanOrEqual(75);
      expect(page.data.sections.length, path).toBeGreaterThanOrEqual(4);
      expect(page.data.stats.length + totalSectionStats, path).toBeGreaterThanOrEqual(3);
      expect(totalQuotes, path).toBeGreaterThanOrEqual(1);
      expect(page.data.citations.length, path).toBeGreaterThanOrEqual(2);
      expect(inlineCitationSignalCount(markup), path).toBeGreaterThanOrEqual(2);
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
