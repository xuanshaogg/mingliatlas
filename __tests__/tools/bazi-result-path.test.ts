import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import BaziChartResult from "@/components/tools/BaziChartResult";
import { calculateBaziChart } from "@/lib/bazi";

function renderResultPath(): string {
  const chart = calculateBaziChart({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    timezone: "Local civil time",
    gender: "not-specified",
    birthplace: "",
    timeBasis: "civil",
  });

  return renderToStaticMarkup(createElement(BaziChartResult, { chart }));
}

describe("Bazi result reading path", () => {
  it("presents the chart-specific Day Master guide as the single primary next step", () => {
    const markup = renderResultPath();

    expect(markup).toContain('data-content-role="primary-guide"');
    expect(markup).toContain('href="/blog/bing-fire-day-master"');
    expect(markup).toContain("Read your Bing Fire Day Master guide");
    expect(markup.match(/data-content-role="primary-guide"/g)).toHaveLength(1);
  });

  it("keeps the remaining reading sequence available as three secondary links", () => {
    const markup = renderResultPath();

    expect(markup).toContain('href="/bazi/ten-gods"');
    expect(markup).toContain('href="/bazi/five-elements"');
    expect(markup).toContain('href="/bazi/luck-pillars"');
    expect(markup).toContain('start="2"');
  });
});
