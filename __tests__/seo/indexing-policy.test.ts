import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { allFengShuiPages } from "@/content/feng-shui/pages";
import { allIChingPages } from "@/content/i-ching/pages";
import { allLearnPages } from "@/content/learn/pages";
import { allZodiacPages } from "@/content/zodiac/pages";
import { allZiweiPages } from "@/content/ziwei/pages";
import { INDEXABLE_PATHS, isIndexablePath } from "@/lib/content/indexing";
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

  it("marks non-approved knowledge pages noindex while preserving follow", () => {
    const metadata = buildKnowledgePageMetadata({
      title: "Thin draft",
      description: "Draft page retained for readers.",
      path: "/ziwei/major-stars/jumen",
      data: { schema: { url: `${SITE.url}/ziwei/major-stars/jumen` } },
    });

    expect(metadata.robots).toEqual({ index: false, follow: true });
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
