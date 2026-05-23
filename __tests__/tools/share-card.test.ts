import { describe, expect, it } from "vitest";
import { calculateBaziChart } from "../../src/lib/bazi";
import { castIChingReading } from "../../src/lib/i-ching";
import { calculateZodiacCompatibility } from "../../src/lib/zodiac";
import {
  buildBaziShareParams,
  buildIChingShareParams,
  buildShareCardUrl,
  buildZodiacShareParams,
  shapeShareCardData,
} from "../../src/lib/share-card";

describe("share-card helpers", () => {
  it("buildShareCardUrl sanitizes and encodes params while omitting empty and null values", () => {
    const url = new URL(
      buildShareCardUrl({
        baseUrl: "https://example.test/base",
        tool: "zodiac",
        params: {
          a: " rat<script> ",
          b: "ox & dragon",
          empty: "   ",
          nil: null,
          missing: undefined,
          zero: 0,
          enabled: true,
        },
      }),
    );

    expect(url.origin).toBe("https://example.test");
    expect(url.pathname).toBe("/api/share-card");
    expect(url.searchParams.get("tool")).toBe("zodiac");
    expect(url.searchParams.get("a")).toBe("ratscript");
    expect(url.searchParams.get("b")).toBe("ox & dragon");
    expect(url.search).toContain("b=ox+%26+dragon");
    expect(url.searchParams.has("empty")).toBe(false);
    expect(url.searchParams.has("nil")).toBe(false);
    expect(url.searchParams.has("missing")).toBe(false);
    expect(url.searchParams.get("zero")).toBe("0");
    expect(url.searchParams.get("enabled")).toBe("true");
  });

  it("shapeShareCardData falls back for invalid tools and invalid parameter shapes", () => {
    expect(shapeShareCardData(new URLSearchParams("tool=not-a-tool")).isFallback).toBe(true);
    expect(shapeShareCardData(new URLSearchParams("tool=zodiac&a=rat&b=phoenix")).isFallback).toBe(true);
    expect(shapeShareCardData(new URLSearchParams("tool=i-ching&hex=999")).isFallback).toBe(true);
    expect(shapeShareCardData(new URLSearchParams("tool=bazi&y=2024&m=2&d=31&h=10")).isFallback).toBe(true);
  });

  it("shapes valid zodiac params into a non-fallback card", () => {
    const params = new URLSearchParams({ tool: "zodiac", ...buildZodiacShareParams(calculateZodiacCompatibility("rat", "ox")) });
    const card = shapeShareCardData(params);

    expect(card.isFallback).toBe(false);
    expect(card.tool).toBe("zodiac");
    expect(card.title).toBe("Rat + Ox");
    expect(card.subtitle).toContain("92/100");
    expect(card.highlights).toHaveLength(3);
  });

  it("shapes valid I Ching params into a non-fallback card without including the original question", () => {
    const originalQuestion = "Will this private launch question be exposed?";
    const reading = castIChingReading({
      question: originalQuestion,
      coins: [
        [3, 3, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
      ],
    });
    const params = new URLSearchParams({ tool: "i-ching", ...buildIChingShareParams(reading) });
    const card = shapeShareCardData(params);
    const serializedCard = JSON.stringify(card);
    const serializedParams = params.toString();

    expect(card.isFallback).toBe(false);
    expect(card.tool).toBe("i-ching");
    expect(card.title).toBe("1. The Creative");
    expect(card.subtitle).toContain("→");
    expect(card.disclaimer).toContain("original question is not included");
    expect(serializedCard).not.toContain(originalQuestion);
    expect(serializedParams).not.toContain(originalQuestion);
  });

  it("shapes valid Bazi params into a non-fallback card and excludes names or free text from share params", () => {
    const chart = calculateBaziChart({
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      minute: 30,
      gender: "female",
      timezone: "Asia/Shanghai",
    });
    const shareParams = buildBaziShareParams(chart);
    const params = new URLSearchParams({ tool: "bazi", ...Object.fromEntries(Object.entries(shareParams).map(([key, value]) => [key, String(value)])) });
    const card = shapeShareCardData(params);

    expect(Object.keys(shareParams).sort()).toEqual(["d", "g", "h", "m", "min", "tz", "y"]);
    expect(Object.keys(shareParams)).not.toEqual(expect.arrayContaining(["name", "question", "notes", "text"]));
    expect(Object.values(shareParams)).not.toEqual(expect.arrayContaining(["Ada Lovelace", "birth notes"]));
    expect(card.isFallback).toBe(false);
    expect(card.tool).toBe("bazi");
    expect(card.title).toBe("Yang Fire Day Master");
    expect(card.subtitle).toBe("己巳 · 丙子 · 丙寅 · 甲午");
    expect(card.highlights).toContain("1990-01-01 12:30");
  });
});
