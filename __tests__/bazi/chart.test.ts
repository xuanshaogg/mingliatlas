import { describe, expect, it } from "vitest";
import { calculateBaziChart, calculateTenGod } from "../../src/lib/bazi";

describe("Bazi chart calculation", () => {
  it("builds the known 1990-01-01 12:00 chart", () => {
    const chart = calculateBaziChart({ year: 1990, month: 1, day: 1, hour: 12, timezone: "Asia/Shanghai" });

    expect(chart.pillars.map((pillar) => pillar.ganZhi)).toEqual(["己巳", "丙子", "丙寅", "甲午"]);
    expect(chart.dayMaster.chinese).toBe("丙");
    expect(chart.dayMaster.element).toBe("Fire");
    expect(chart.lunarDate.year).toBe(1989);
    expect(chart.pillars.find((pillar) => pillar.key === "day")?.stemTenGod.name).toBe("Day Master");
  });

  it("builds the known 1984-02-02 08:00 chart", () => {
    const chart = calculateBaziChart({ year: 1984, month: 2, day: 2, hour: 8 });

    expect(chart.pillars.map((pillar) => pillar.ganZhi)).toEqual(["甲子", "乙丑", "丙寅", "壬辰"]);
    expect(chart.dayMaster.name).toBe("Yang Fire");
  });

  it("builds the known 2000-03-15 16:30 chart", () => {
    const chart = calculateBaziChart({ year: 2000, month: 3, day: 15, hour: 16, minute: 30 });

    expect(chart.pillars.map((pillar) => pillar.ganZhi)).toEqual(["庚辰", "己卯", "壬申", "戊申"]);
    expect(chart.dayMaster.name).toBe("Yang Water");
  });

  it("calculates ten gods relative to the day master", () => {
    expect(calculateTenGod("丙", "丙").name).toBe("Friend");
    expect(calculateTenGod("丙", "丁").name).toBe("Rob Wealth");
    expect(calculateTenGod("丙", "甲").name).toBe("Indirect Resource");
    expect(calculateTenGod("丙", "癸").name).toBe("Direct Officer");
    expect(calculateTenGod("丙", "庚").name).toBe("Indirect Wealth");
  });

  it("returns a five-element balance that sums near 100 percent", () => {
    const chart = calculateBaziChart({ year: 1990, month: 1, day: 1, hour: 12 });
    const percentageTotal = chart.elementBalance.reduce((sum, element) => sum + element.percentage, 0);

    expect(chart.elementBalance).toHaveLength(5);
    expect(percentageTotal).toBeGreaterThanOrEqual(99);
    expect(percentageTotal).toBeLessThanOrEqual(101);
    expect(chart.dominantElement.score).toBeGreaterThan(0);
  });

  it("rejects impossible dates", () => {
    expect(() => calculateBaziChart({ year: 2024, month: 2, day: 31, hour: 10 })).toThrow(
      "Birth day is not valid",
    );
  });
});
