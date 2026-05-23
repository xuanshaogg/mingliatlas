import { describe, expect, it } from "vitest";
import { calculateZodiacCompatibility } from "../../src/lib/zodiac";

describe("zodiac compatibility", () => {
  it("scores Liu He harmony pairs highly", () => {
    const result = calculateZodiacCompatibility("rat", "ox");

    expect(result.score).toBe(92);
    expect(result.label).toBe("Strong Harmony");
    expect(result.relationship).toContain("Liu He");
  });

  it("recognizes three-harmony groups", () => {
    const result = calculateZodiacCompatibility("rat", "dragon");

    expect(result.score).toBe(86);
    expect(result.relationship).toContain("Rat, Dragon, Monkey");
  });

  it("recognizes clash pairs without making absolute claims", () => {
    const result = calculateZodiacCompatibility("rat", "horse");

    expect(result.score).toBe(42);
    expect(result.label).toBe("Growth Through Contrast");
    expect(result.summary).toContain("can also clarify");
  });

  it("handles same-sign mirror patterns", () => {
    const result = calculateZodiacCompatibility("snake", "snake");

    expect(result.relationship).toBe("Same sign");
    expect(result.score).toBe(78);
  });
});
