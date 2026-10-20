import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { allZodiacPages } from "@/content/zodiac/pages";
import { buildLlmsText } from "@/lib/seo/llms";
import { getZodiacYearDates } from "@/lib/zodiac/year-dates";

function visibleText(markup: string): string {
  return markup
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

describe("zodiac year dates", () => {
  it("matches published Lunar New Year and Li Chun dates", () => {
    expect(getZodiacYearDates(1988)).toMatchObject({
      ganZhi: "戊辰",
      pinyin: "Wu-Chen",
      element: "Earth",
      lunarNewYear: "1988-02-17",
      lastDay: "1989-02-05",
      liChun: "1988-02-04",
      liChunTime: "22:42",
    });
    expect(getZodiacYearDates(2024)).toMatchObject({
      ganZhi: "甲辰",
      lunarNewYear: "2024-02-10",
      lastDay: "2025-01-28",
    });
    expect(getZodiacYearDates(2026)).toMatchObject({
      ganZhi: "丙午",
      lunarNewYear: "2026-02-17",
      lastDay: "2027-02-05",
      liChun: "2026-02-04",
    });
    expect(getZodiacYearDates(2036).lunarNewYear).toBe("2036-01-28");
  });

  it("keeps every year page's stem-branch label consistent with the calendar", () => {
    const yearPages = allZodiacPages.filter((page) => /^[a-z]+\/\d{4}$/.test(page.slug));
    expect(yearPages.length).toBeGreaterThan(20);

    for (const page of yearPages) {
      const year = Number(page.slug.split("/")[1]);
      const dates = getZodiacYearDates(year);
      const stemBranchStat = page.data.stats.find((stat) => stat.label === "Stem-branch pair");
      expect(stemBranchStat?.value, page.path).toContain(dates.ganZhi);
      expect(page.data.stats[0].value, page.path).toBe(dates.element);
    }
  });

  it("renders zodiac pages without template artifacts and with exact dates", () => {
    for (const page of allZodiacPages) {
      const markup = renderToStaticMarkup(createElement(KnowledgePage, page.data));
      const text = visibleText(markup);
      expect(text, page.path).not.toMatch(/\$\s?[A-Z0-9]/);
      expect(markup, page.path).not.toContain("&amp;rsquo;");
      expect(text, page.path).not.toMatch(/\ba (Earth|Ox|Earthly Branch year)\b/);
      expect(text, page.path).not.toMatch(/[a-z]\.\.\s/);
      expect(page.data.directAnswer, page.path).not.toMatch(/&[a-z]+;/);
    }

    const dragon = allZodiacPages.find((page) => page.path === "/chinese-zodiac/dragon")!;
    const dragonText = visibleText(renderToStaticMarkup(createElement(KnowledgePage, dragon.data)));
    expect(dragon.data.directAnswer).toContain("February 10, 2024 to January 28, 2025");
    expect(dragonText).toContain("Feb 17, 1988 – Feb 5, 1989");
    expect(dragon.data.faqs.map((faq) => faq.question)).toContain(
      "When was the last Year of the Dragon?"
    );

    const rat = allZodiacPages.find((page) => page.path === "/chinese-zodiac/rat")!;
    expect(rat.data.sections.map((section) => section.heading)).toContain(
      "Year of the Rat dates: when each year starts and ends"
    );

    const dragon1988 = allZodiacPages.find((page) => page.path === "/chinese-zodiac/dragon/1988")!;
    expect(dragon1988.data.directAnswer).toMatch(
      /^1988 is an Earth Dragon year .* running from February 17, 1988 to February 5, 1989\./
    );
  });

  it("exposes the date facts in llms.txt", () => {
    const text = buildLlmsText();
    expect(text).toContain("the last Dragon year ran February 10, 2024 to January 28, 2025");
    expect(text).toContain("2026 Fire Horse year: February 17, 2026 to February 5, 2027");
  });
});
