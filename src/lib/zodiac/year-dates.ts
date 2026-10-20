import { Lunar } from "lunar-typescript";

/**
 * Exact boundaries of a Chinese zodiac year, computed with lunar-typescript
 * (the same calendar library behind the Bazi calculator). Dates are civil
 * dates in China Standard Time (UTC+8), the convention used by Chinese
 * almanacs; the Lunar New Year can fall one day earlier in the Americas.
 */
export interface ZodiacYearDates {
  year: number;
  /** Stem-branch name in Chinese, e.g. 甲辰 */
  ganZhi: string;
  /** Stem-branch name in pinyin, e.g. Jia-Chen */
  pinyin: string;
  /** Element of the year stem, e.g. Wood */
  element: string;
  /** First day of the zodiac year (Lunar New Year), YYYY-MM-DD */
  lunarNewYear: string;
  /** Last day of the zodiac year (eve of the next Lunar New Year), YYYY-MM-DD */
  lastDay: string;
  /** Date of Li Chun (立春), the solar-term year boundary used by many Bazi schools, YYYY-MM-DD */
  liChun: string;
  /** Clock time of Li Chun in China Standard Time, HH:mm */
  liChunTime: string;
}

const STEMS: Record<string, [string, string]> = {
  甲: ["Jia", "Wood"],
  乙: ["Yi", "Wood"],
  丙: ["Bing", "Fire"],
  丁: ["Ding", "Fire"],
  戊: ["Wu", "Earth"],
  己: ["Ji", "Earth"],
  庚: ["Geng", "Metal"],
  辛: ["Xin", "Metal"],
  壬: ["Ren", "Water"],
  癸: ["Gui", "Water"],
};

const BRANCHES: Record<string, string> = {
  子: "Zi",
  丑: "Chou",
  寅: "Yin",
  卯: "Mao",
  辰: "Chen",
  巳: "Si",
  午: "Wu",
  未: "Wei",
  申: "Shen",
  酉: "You",
  戌: "Xu",
  亥: "Hai",
};

export function getZodiacYearDates(year: number): ZodiacYearDates {
  const firstDay = Lunar.fromYmd(year, 1, 1);
  const ganZhi = firstDay.getYearInGanZhi();
  const [stemPinyin, element] = STEMS[ganZhi.charAt(0)];
  const liChun = firstDay.getJieQiTable()["立春"];

  return {
    year,
    ganZhi,
    pinyin: `${stemPinyin}-${BRANCHES[ganZhi.charAt(1)]}`,
    element,
    lunarNewYear: firstDay.getSolar().toYmd(),
    lastDay: Lunar.fromYmd(year + 1, 1, 1)
      .getSolar()
      .next(-1)
      .toYmd(),
    liChun: liChun.toYmd(),
    liChunTime: liChun.toYmdHms().slice(11, 16),
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-02-10" -> "February 10, 2024" */
export function formatLongDate(ymd: string): string {
  return dateFormatter.format(new Date(`${ymd}T00:00:00Z`));
}

/** "2024-02-10" -> "Feb 10, 2024" */
export function formatShortDate(ymd: string): string {
  return shortDateFormatter.format(new Date(`${ymd}T00:00:00Z`));
}

/** One-sentence, quotable description of a zodiac year's exact span. */
export function describeZodiacYearSpan(animalName: string, dates: ZodiacYearDates): string {
  return `The ${dates.year} Year of the ${animalName} (${dates.element} ${animalName}, ${dates.pinyin} ${dates.ganZhi}) runs from ${formatLongDate(dates.lunarNewYear)} to ${formatLongDate(dates.lastDay)}, while Li Chun, the year-pillar boundary used by many Bazi schools, falls on ${formatLongDate(dates.liChun)}.`;
}
