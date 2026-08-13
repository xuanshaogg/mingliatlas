import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { allZodiacPages } from "@/content/zodiac/pages";

function pageAt(path: string) {
  const page = allZodiacPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Missing zodiac page: ${path}`);
  return page;
}

describe("zodiac content-to-tool path", () => {
  it("gives the Chinese Zodiac hub one measurable Bazi CTA and three contextual next steps", () => {
    const page = pageAt("/chinese-zodiac");
    const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));

    expect(page.data.cta).toMatchObject({
      href: "/tools/bazi-calculator",
      tracking: { source: "zodiac_hub_primary_cta" },
    });
    expect(page.data.nextSteps?.map((link) => link.href)).toEqual([
      "/chinese-zodiac/dragon",
      "/chinese-zodiac/2026-forecast",
      "/blog/chinese-zodiac-compatibility-chart",
    ]);
    expect(page.data.nextStepsTracking).toEqual({ source: "zodiac_hub_next_steps" });
    expect(markup.match(/data-content-role="next-step"/g)).toHaveLength(3);
    expect(markup).toContain('data-content-role="primary-content-cta"');
  });

  it("keeps the Dragon guide focused on one Bazi CTA and three non-duplicative follow-ups", () => {
    const page = pageAt("/chinese-zodiac/dragon");
    const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));

    expect(page.data.cta).toMatchObject({
      href: "/tools/bazi-calculator",
      tracking: { source: "dragon_primary_cta" },
    });
    expect(page.data.nextSteps?.map((link) => link.href)).toEqual([
      "/bazi/earthly-branches",
      "/chinese-zodiac",
      "/chinese-zodiac/2026-forecast",
    ]);
    expect(page.data.nextStepsTracking).toEqual({ source: "dragon_next_steps" });
    expect(markup.match(/data-content-role="next-step"/g)).toHaveLength(3);
    expect(markup).toContain('data-content-role="primary-content-cta"');
  });
});
