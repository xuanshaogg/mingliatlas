import { describe, expect, it } from "vitest";
import { calculateBaziChart, calculateTenGod } from "../../src/lib/bazi";

describe("Bazi chart calculation", () => {
  it("builds the known 1990-01-01 12:00 chart", () => {
    const chart = calculateBaziChart({
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      timezone: "Asia/Shanghai",
    });

    expect(chart.pillars.map((pillar) => pillar.ganZhi)).toEqual(["己巳", "丙子", "丙寅", "甲午"]);
    expect(chart.dayMaster.chinese).toBe("丙");
    expect(chart.dayMaster.element).toBe("Fire");
    expect(chart.lunarDate.year).toBe(1989);
    expect(chart.pillars.find((pillar) => pillar.key === "day")?.stemTenGod.name).toBe(
      "Day Master"
    );
  });

  it("builds the known 1984-02-02 08:00 chart with the Li Chun year boundary", () => {
    // Lunar New Year 1984 fell on Feb 2, but Li Chun was on Feb 4/5, so the
    // Bazi year pillar is still Gui-Hai (癸亥) rather than Jia-Zi (甲子).
    const chart = calculateBaziChart({ year: 1984, month: 2, day: 2, hour: 8 });

    expect(chart.pillars.map((pillar) => pillar.ganZhi)).toEqual(["癸亥", "乙丑", "丙寅", "壬辰"]);
    expect(chart.dayMaster.name).toBe("Yang Fire");
  });

  it("changes the year and month pillars at the exact Li Chun and Jie moments", () => {
    // Li Chun 1988: 1988-02-04 22:42 China Standard Time.
    const before = calculateBaziChart({ year: 1988, month: 2, day: 4, hour: 22, minute: 30 });
    const after = calculateBaziChart({ year: 1988, month: 2, day: 4, hour: 22, minute: 50 });
    expect(before.pillars.slice(0, 2).map((pillar) => pillar.ganZhi)).toEqual(["丁卯", "癸丑"]);
    expect(after.pillars.slice(0, 2).map((pillar) => pillar.ganZhi)).toEqual(["戊辰", "甲寅"]);

    // Between Li Chun and Lunar New Year (1988-02-17) the year pillar is already Wu-Chen.
    const lateFebruary = calculateBaziChart({
      year: 1988,
      month: 2,
      day: 10,
      hour: 14,
      minute: 30,
    });
    expect(lateFebruary.pillars[0].ganZhi).toBe("戊辰");

    // Jing Zhe 2025 fell late in the morning of March 5, so 10:00 is still the Wu-Yin month.
    const jingZhe = calculateBaziChart({ year: 2025, month: 3, day: 5, hour: 10 });
    expect(jingZhe.pillars[1].ganZhi).toBe("戊寅");
  });

  it("keeps Da Yun direction consistent with the displayed year stem", () => {
    // Wu (戊) is a Yang stem: Yang-year male runs forward, female reverse.
    const male = calculateBaziChart({
      year: 1988,
      month: 2,
      day: 10,
      hour: 14,
      minute: 30,
      gender: "male",
    });
    const female = calculateBaziChart({
      year: 1988,
      month: 2,
      day: 10,
      hour: 14,
      minute: 30,
      gender: "female",
    });
    expect(male.pillars[0].ganZhi).toBe("戊辰");
    expect(male.luckPillarDirection).toBe("forward");
    expect(female.luckPillarDirection).toBe("reverse");
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
    const percentageTotal = chart.elementBalance.reduce(
      (sum, element) => sum + element.percentage,
      0
    );

    expect(chart.elementBalance).toHaveLength(5);
    expect(percentageTotal).toBeGreaterThanOrEqual(99);
    expect(percentageTotal).toBeLessThanOrEqual(101);
    expect(chart.dominantElement.score).toBeGreaterThan(0);
  });

  it("rejects impossible dates", () => {
    expect(() => calculateBaziChart({ year: 2024, month: 2, day: 31, hour: 10 })).toThrow(
      "Birth day is not valid"
    );
  });

  it("adds traditional luck pillars when gender is provided", () => {
    const chart = calculateBaziChart({
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      gender: "female",
      timezone: "Asia/Shanghai",
    });

    expect(chart.luckPillarDirection).toBe("forward");
    expect(chart.luckPillars.slice(0, 3).map((pillar) => pillar.ganZhi)).toEqual([
      "丁丑",
      "戊寅",
      "己卯",
    ]);
    expect(chart.luckPillars[0].startYear).toBe(1991);
    expect(chart.luckPillarStart).toBe("1991-06-21");
  });

  it("reverses the sequence for a male birth in the same yin-stem year", () => {
    // Ji is yin: male reverses from Bing-Zi, female advances (fixture above).
    const chart = calculateBaziChart({
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      gender: "male",
      timezone: "Asia/Shanghai",
    });
    expect(chart.luckPillarDirection).toBe("reverse");
    expect(chart.luckPillars.slice(0, 3).map((pillar) => pillar.ganZhi)).toEqual([
      "乙亥",
      "甲戌",
      "癸酉",
    ]);
    expect(chart.luckPillars).toHaveLength(8);
  });

  it("keeps luck pillars empty when the direction rule is underspecified", () => {
    const chart = calculateBaziChart({ year: 1990, month: 1, day: 1, hour: 12 });

    expect(chart.luckPillars).toEqual([]);
    expect(chart.luckPillarDirection).toBeUndefined();
  });

  it("applies true solar time correction and preserves the calculation details", () => {
    const chart = calculateBaziChart({
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      timezone: "Asia/Shanghai",
      longitude: 121.47,
      timeBasis: "true-solar",
    });

    expect(chart.calculation.basis).toBe("true-solar");
    expect(chart.calculation.timezoneOffsetMinutes).toBe(480);
    expect(chart.calculation.correctionMinutes).toBe(2);
    expect(chart.calculation.effectiveTime.minute).toBe(2);
  });

  it("requires a valid timezone and longitude for true solar time", () => {
    expect(() =>
      calculateBaziChart({
        year: 1990,
        month: 1,
        day: 1,
        hour: 12,
        timeBasis: "true-solar",
        longitude: 121.47,
      })
    ).toThrow("valid IANA time zone");
    expect(() =>
      calculateBaziChart({
        year: 1990,
        month: 1,
        day: 1,
        hour: 12,
        timezone: "Asia/Shanghai",
        timeBasis: "true-solar",
      })
    ).toThrow("requires a birthplace longitude");
  });
});
