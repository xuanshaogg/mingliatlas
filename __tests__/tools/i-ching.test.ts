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

  it("produces moving lines and all 64 hexagrams across deterministic seeds", () => {
    const counts = new Map([
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ]);
    const hexagrams = new Set<number>();
    const samples = 8192;
    for (let seed = 0; seed < samples; seed++) {
      const coins = createCoinCast(seed);
      hexagrams.add(castIChingReading({ coins }).primary.number);
      for (const line of coins) {
        expect(line.every((coin) => coin === 2 || coin === 3)).toBe(true);
        const sum = line.reduce((total, coin) => total + coin, 0);
        counts.set(sum, (counts.get(sum) ?? 0) + 1);
      }
    }
    expect(hexagrams.size).toBe(64);
    // Regression guard for the former alternating-lowest-bit generator;
    // this deterministic smoke sample is not a proof of random quality.
    for (const [sum, probability] of [
      [6, 0.125],
      [7, 0.375],
      [8, 0.375],
      [9, 0.125],
    ]) {
      expect(Math.abs((counts.get(sum) ?? 0) / (samples * 6) - probability)).toBeLessThan(0.03);
    }
  });

  it("looks up hexagrams by number", () => {
    expect(getHexagramByNumber(64).name).toBe("Before Completion");
  });
});
