import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { allFengShuiPages } from "@/content/feng-shui/pages";
import { allIChingPages } from "@/content/i-ching/pages";
import { allLearnPages } from "@/content/learn/pages";
import { allZodiacPages } from "@/content/zodiac/pages";
import { allZiweiPages } from "@/content/ziwei/pages";
import { INDEXABLE_PATHS, INDEXING_PRIORITY_PATHS, isIndexablePath } from "@/lib/content/indexing";
import { resolveCitationUrls } from "@/lib/content/citations";
import { publishedSitePages } from "@/lib/content/sitePages";
import { SITE } from "@/lib/constants";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";
import nextConfig from "../../next.config";

const contentPages = [
  ...allBaziPages,
  ...allBlogPosts,
  ...allFengShuiPages,
  ...allIChingPages,
  ...allLearnPages,
  ...allZodiacPages,
  ...allZiweiPages,
];

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

describe("indexing policy", () => {
  it("keeps the indexable registry unique and backed by published routes", () => {
    const publishedPaths = new Set(publishedSitePages.map((page) => page.href));
    expect(new Set(INDEXABLE_PATHS).size).toBe(INDEXABLE_PATHS.length);
    for (const path of INDEXABLE_PATHS) expect(publishedPaths.has(path), path).toBe(true);
  });

  it("limits the XML sitemap to the quality-approved registry", () => {
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(new Set(sitemapPaths)).toEqual(new Set(INDEXABLE_PATHS));
    expect(sitemapPaths.length).toBeLessThan(publishedSitePages.length / 2);
  });

  it("keeps the first indexing-recovery cohort approved and in the sitemap", () => {
    const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));

    expect(INDEXING_PRIORITY_PATHS).toHaveLength(7);
    for (const path of INDEXING_PRIORITY_PATHS) {
      expect(isIndexablePath(path), path).toBe(true);
      expect(sitemapPaths.has(path), path).toBe(true);
    }
  });

  it("keeps high-opportunity pages indexable and utility pages out", () => {
    for (const path of [
      "/chinese-zodiac/dragon",
      "/blog/day-master-bazi-complete-guide",
      "/blog/chinese-zodiac-compatibility-chart",
      "/tools/bazi-calculator",
    ]) {
      expect(isIndexablePath(path), path).toBe(true);
    }

    for (const path of [
      "/search",
      "/subscribe",
      "/sitemap",
      "/blog/what-is-bazi",
      "/blog/how-to-read-a-bazi-chart",
      "/chinese-zodiac/compatibility",
      "/learn",
      "/learn/beginners-guide",
      "/learn/which-system",
      "/learn/resources",
      "/privacy",
      "/terms",
      "/ziwei/four-transformations",
      "/ziwei/major-stars/jumen",
    ]) {
      expect(isIndexablePath(path), path).toBe(false);
    }
  });

  it("keeps high-impression search snippets aligned with observed queries", () => {
    const dragon = allZodiacPages.find((page) => page.path === "/chinese-zodiac/dragon");
    const dayMaster = allBlogPosts.find(
      (page) => page.path === "/blog/day-master-bazi-complete-guide"
    );
    const compatibility = allBlogPosts.find(
      (page) => page.path === "/blog/chinese-zodiac-compatibility-chart"
    );

    expect(dragon?.title).toBe("Year of the Dragon: Complete Years List (1940–2036)");
    expect(dragon?.data.directAnswer).toMatch(
      /^Dragon years are 1940, 1952, 1964, 1976, 1988, 2000, 2012, and 2024;/
    );
    expect(dragon?.data.schema.dateModified).toBe("2026-08-07");

    expect(dayMaster?.title).toBe("Bazi Day Master Is the Day Stem: Meaning & Sources");
    expect(dayMaster?.data.directAnswer).toMatch(
      /^Yes\. In Bazi, the Day Master is the heavenly stem/
    );
    expect(dayMaster?.data.schema.dateModified).toBe("2026-08-07");

    expect(compatibility?.title).toBe("Chinese Zodiac Compatibility Chart: Triads & Clashes");
    expect(compatibility?.data.schema.dateModified).toBe("2026-08-07");
  });

  it("marks non-approved knowledge pages noindex while preserving follow", () => {
    const metadata = buildKnowledgePageMetadata({
      title: "Thin draft",
      description: "Draft page retained for readers.",
      path: "/ziwei/major-stars/jumen",
      data: { schema: { url: `${SITE.url}/ziwei/major-stars/jumen` } },
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it("maps named zodiac bibliography to relevant source records", () => {
    const citations = resolveCitationUrls<{ label: string; url?: string }>([
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac (1986)" },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols (1986)" },
    ]);

    expect(
      citations.every((citation) => citation.url?.startsWith("https://books.google.com/"))
    ).toBe(true);
  });

  it("permanently consolidates the duplicate What Is Bazi article", async () => {
    const redirects = await nextConfig.redirects?.();
    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/blog/what-is-bazi",
          destination: `${SITE.url}/bazi/what-is-bazi`,
          permanent: true,
        },
        {
          source: "/chinese-zodiac/compatibility",
          destination: `${SITE.url}/blog/chinese-zodiac-compatibility-chart`,
          permanent: true,
        },
      ])
    );
  });

  it("enforces core answer and evidence signals for approved content", () => {
    const approvedContent = contentPages.filter((page) => isIndexablePath(page.path));
    expect(approvedContent.length).toBeGreaterThan(25);

    for (const page of approvedContent) {
      expect(wordCount(page.data.directAnswer), page.path).toBeGreaterThanOrEqual(30);
      expect(wordCount(page.data.directAnswer), page.path).toBeLessThanOrEqual(95);
      expect(page.data.sections.length, page.path).toBeGreaterThanOrEqual(3);
      expect(page.data.faqs.length, page.path).toBeGreaterThanOrEqual(4);
      expect(page.data.citations.length, page.path).toBeGreaterThanOrEqual(2);
      expect(
        resolveCitationUrls(page.data.citations).some((citation) => Boolean(citation.url)),
        page.path
      ).toBe(true);
    }
  });
});
