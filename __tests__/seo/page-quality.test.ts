import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { allBaziPages } from "@/content/bazi/pages";
import { allBlogPosts } from "@/content/blog/posts";
import { baziGlossaryTerms } from "@/content/bazi/glossary";
import { isIndexablePath } from "@/lib/content/indexing";
import { canonicalContentPath } from "@/lib/content/urls";
import { publishedSitePages } from "@/lib/content/sitePages";
import { buildLlmsText } from "@/lib/seo/llms";

const internalPhrases = ["answer-first structure", "structured data", "A practical number used"];

describe("page quality guards", () => {
  it("keeps internal SEO wording and unsupported counts off Bazi brief pages", () => {
    const briefPaths = ["/bazi/faq", "/bazi/glossary", "/bazi/career"];
    for (const path of briefPaths) {
      const page = allBaziPages.find((candidate) => candidate.path === path)!;
      const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));
      for (const phrase of internalPhrases) expect(markup, path).not.toContain(phrase);
      expect(page.data.subtitle).toBe(page.description);
      expect(page.data.stats.map((stat) => stat.label)).not.toContain("Core questions");
      expect(page.data.stats.map((stat) => stat.label)).not.toContain("Terms");
    }
  });

  it("does not render escaped HTML entities as visible text in headings", () => {
    for (const page of [...allBaziPages, ...allBlogPosts]) {
      for (const section of page.data.sections) {
        expect(section.heading, page.path).not.toMatch(/&[a-z]+;/);
      }
    }
  });

  it("emits BreadcrumbList JSON-LD on static pages and keeps one complementary landmark level", () => {
    const markup = renderToStaticMarkup(createElement(AboutPage));
    expect(markup).toContain('"@type":"BreadcrumbList"');

    const page = allBaziPages.find((candidate) => candidate.path === "/bazi")!;
    const knowledgeMarkup = renderToStaticMarkup(createElement(KnowledgePage, page.data));
    expect(knowledgeMarkup).not.toContain("<aside");
  });

  it("publishes the glossary as an indexable DefinedTermSet with every term linked", () => {
    const page = allBaziPages.find((candidate) => candidate.path === "/bazi/glossary")!;
    const jsonLd = page.data.schema.jsonLd as unknown as {
      "@type": string;
      hasDefinedTerm: unknown[];
    };
    expect(isIndexablePath("/bazi/glossary")).toBe(true);
    expect(jsonLd["@type"]).toBe("DefinedTermSet");
    expect(jsonLd.hasDefinedTerm).toHaveLength(baziGlossaryTerms.length);
    expect(page.data.directAnswer).toContain(`${baziGlossaryTerms.length} core Four Pillars terms`);
    const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));
    for (const term of baziGlossaryTerms)
      expect(markup, term.term).toContain(`<dfn class="not-italic">${term.term}</dfn>`);
  });

  it("keeps the FAQ hub noindex and links every group to its source guide", () => {
    const page = allBaziPages.find((candidate) => candidate.path === "/bazi/faq")!;
    expect(isIndexablePath("/bazi/faq")).toBe(false);
    const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));
    expect(markup.match(/Source: <a/g)?.length).toBe(page.data.sections.length - 1);
  });

  it("retires the celebrity placeholder pages with permanent redirects", () => {
    for (const path of ["/bazi/celebrity/elon-musk", "/bazi/celebrity/taylor-swift"]) {
      expect(canonicalContentPath(path)).toBe("/bazi");
      expect(publishedSitePages.some((page) => page.href === path)).toBe(false);
      expect(allBaziPages.some((page) => page.path === path)).toBe(false);
    }
  });

  it("states the calculator's Li Chun year boundary consistently", () => {
    expect(buildLlmsText()).toContain("the year pillar changes at the exact Li Chun moment");
  });
});
