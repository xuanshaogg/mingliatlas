import { describe, expect, it } from "vitest";
import { castIChingReading, createCoinCast, getHexagramByNumber } from "../../src/lib/i-ching";

describe("I Ching oracle", () => {
  it("casts Hexagram 1 with all young yang lines", () => {
    const reading = castIChingReading({
      question: "What pattern is present?",
      coins: [
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
      ],
    });

    expect(reading.primary.number).toBe(1);
    expect(reading.primary.name).toBe("The Creative");
    expect(reading.relating).toBeUndefined();
    expect(reading.changingLines).toEqual([]);
  });

  it("casts changing lines and a relating hexagram", () => {
    const reading = castIChingReading({
      coins: [
        [3, 3, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
        [2, 2, 3],
      ],
    });

    expect(reading.primary.number).toBe(1);
    expect(reading.changingLines).toEqual([1]);
    expect(reading.relating?.number).toBe(44);
  });

  it("creates deterministic seeded casts", () => {
    expect(createCoinCast(2026)).toEqual(createCoinCast(2026));
    expect(createCoinCast(2026)).toHaveLength(6);
  });

  it("looks up hexagrams by number", () => {
    expect(getHexagramByNumber(64).name).toBe("Before Completion");
  });
});
