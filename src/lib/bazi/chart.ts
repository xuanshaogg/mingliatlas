import {
  calculateGanZhi,
  getLunarDayName,
  getLunarMonthName,
  solarToLunar,
  type GanZhiPillar,
} from "@/lib/calendar";

export type FiveElement = "Wood" | "Fire" | "Earth" | "Metal" | "Water";
export type YinYang = "Yang" | "Yin";
export type PillarKey = "year" | "month" | "day" | "hour";

export interface StemMeta {
  chinese: string;
  pinyin: string;
  name: string;
  element: FiveElement;
  yinYang: YinYang;
}

export interface HiddenStem {
  stem: StemMeta;
  weight: number;
  tenGod: TenGod;
}

export interface BranchMeta {
  chinese: string;
  pinyin: string;
  animal: string;
  element: FiveElement;
  yinYang: YinYang;
  hiddenStems: Array<{ stem: string; weight: number }>;
}

export interface TenGod {
  key: string;
  name: string;
  chinese: string;
  description: string;
}

export interface BaziChartPillar {
  key: PillarKey;
  label: string;
  focus: string;
  ganZhi: string;
  stem: StemMeta;
  branch: BranchMeta;
  stemTenGod: TenGod;
  hiddenStems: HiddenStem[];
}

export interface ElementScore {
  element: FiveElement;
  chinese: string;
  score: number;
  percentage: number;
}

export interface BaziChartInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
  timezone?: string;
  gender?: "female" | "male" | "not-specified";
}

export interface BaziChart {
  input: Required<Omit<BaziChartInput, "gender">> & Pick<BaziChartInput, "gender">;
  pillars: BaziChartPillar[];
  dayMaster: StemMeta;
  lunarDate: {
    year: number;
    month: number;
    day: number;
    monthName: string;
    dayName: string;
    isLeapMonth: boolean;
  };
  elementBalance: ElementScore[];
  dominantElement: ElementScore;
  missingElements: FiveElement[];
  readingHighlights: string[];
  notices: string[];
}

const ELEMENTS: FiveElement[] = ["Wood", "Fire", "Earth", "Metal", "Water"];

const ELEMENT_CHINESE: Record<FiveElement, string> = {
  Wood: "木",
  Fire: "火",
  Earth: "土",
  Metal: "金",
  Water: "水",
};

export const STEMS: Record<string, StemMeta> = {
  "甲": { chinese: "甲", pinyin: "Jia", name: "Yang Wood", element: "Wood", yinYang: "Yang" },
  "乙": { chinese: "乙", pinyin: "Yi", name: "Yin Wood", element: "Wood", yinYang: "Yin" },
  "丙": { chinese: "丙", pinyin: "Bing", name: "Yang Fire", element: "Fire", yinYang: "Yang" },
  "丁": { chinese: "丁", pinyin: "Ding", name: "Yin Fire", element: "Fire", yinYang: "Yin" },
  "戊": { chinese: "戊", pinyin: "Wu", name: "Yang Earth", element: "Earth", yinYang: "Yang" },
  "己": { chinese: "己", pinyin: "Ji", name: "Yin Earth", element: "Earth", yinYang: "Yin" },
  "庚": { chinese: "庚", pinyin: "Geng", name: "Yang Metal", element: "Metal", yinYang: "Yang" },
  "辛": { chinese: "辛", pinyin: "Xin", name: "Yin Metal", element: "Metal", yinYang: "Yin" },
  "壬": { chinese: "壬", pinyin: "Ren", name: "Yang Water", element: "Water", yinYang: "Yang" },
  "癸": { chinese: "癸", pinyin: "Gui", name: "Yin Water", element: "Water", yinYang: "Yin" },
};

export const BRANCHES: Record<string, BranchMeta> = {
  "子": { chinese: "子", pinyin: "Zi", animal: "Rat", element: "Water", yinYang: "Yang", hiddenStems: [{ stem: "癸", weight: 1 }] },
  "丑": { chinese: "丑", pinyin: "Chou", animal: "Ox", element: "Earth", yinYang: "Yin", hiddenStems: [{ stem: "己", weight: 0.6 }, { stem: "癸", weight: 0.3 }, { stem: "辛", weight: 0.1 }] },
  "寅": { chinese: "寅", pinyin: "Yin", animal: "Tiger", element: "Wood", yinYang: "Yang", hiddenStems: [{ stem: "甲", weight: 0.6 }, { stem: "丙", weight: 0.3 }, { stem: "戊", weight: 0.1 }] },
  "卯": { chinese: "卯", pinyin: "Mao", animal: "Rabbit", element: "Wood", yinYang: "Yin", hiddenStems: [{ stem: "乙", weight: 1 }] },
  "辰": { chinese: "辰", pinyin: "Chen", animal: "Dragon", element: "Earth", yinYang: "Yang", hiddenStems: [{ stem: "戊", weight: 0.6 }, { stem: "乙", weight: 0.3 }, { stem: "癸", weight: 0.1 }] },
  "巳": { chinese: "巳", pinyin: "Si", animal: "Snake", element: "Fire", yinYang: "Yin", hiddenStems: [{ stem: "丙", weight: 0.6 }, { stem: "戊", weight: 0.3 }, { stem: "庚", weight: 0.1 }] },
  "午": { chinese: "午", pinyin: "Wu", animal: "Horse", element: "Fire", yinYang: "Yang", hiddenStems: [{ stem: "丁", weight: 0.7 }, { stem: "己", weight: 0.3 }] },
  "未": { chinese: "未", pinyin: "Wei", animal: "Goat", element: "Earth", yinYang: "Yin", hiddenStems: [{ stem: "己", weight: 0.6 }, { stem: "丁", weight: 0.3 }, { stem: "乙", weight: 0.1 }] },
  "申": { chinese: "申", pinyin: "Shen", animal: "Monkey", element: "Metal", yinYang: "Yang", hiddenStems: [{ stem: "庚", weight: 0.6 }, { stem: "壬", weight: 0.3 }, { stem: "戊", weight: 0.1 }] },
  "酉": { chinese: "酉", pinyin: "You", animal: "Rooster", element: "Metal", yinYang: "Yin", hiddenStems: [{ stem: "辛", weight: 1 }] },
  "戌": { chinese: "戌", pinyin: "Xu", animal: "Dog", element: "Earth", yinYang: "Yang", hiddenStems: [{ stem: "戊", weight: 0.6 }, { stem: "辛", weight: 0.3 }, { stem: "丁", weight: 0.1 }] },
  "亥": { chinese: "亥", pinyin: "Hai", animal: "Pig", element: "Water", yinYang: "Yin", hiddenStems: [{ stem: "壬", weight: 0.7 }, { stem: "甲", weight: 0.3 }] },
};

const TEN_GODS: Record<string, TenGod> = {
  dayMaster: { key: "dayMaster", name: "Day Master", chinese: "日主", description: "The self-reference point for the whole chart." },
  friend: { key: "friend", name: "Friend", chinese: "比肩", description: "Peer energy, autonomy, and self-directed action." },
  robWealth: { key: "robWealth", name: "Rob Wealth", chinese: "劫财", description: "Competition, collaboration pressure, and shared resources." },
  eatingGod: { key: "eatingGod", name: "Eating God", chinese: "食神", description: "Expression, craft, ease, and steady creative output." },
  hurtingOfficer: { key: "hurtingOfficer", name: "Hurting Officer", chinese: "伤官", description: "Challenge, originality, critique, and rule-breaking expression." },
  indirectWealth: { key: "indirectWealth", name: "Indirect Wealth", chinese: "偏财", description: "Opportunity, initiative, markets, and flexible resource handling." },
  directWealth: { key: "directWealth", name: "Direct Wealth", chinese: "正财", description: "Stability, responsibility, assets, and practical management." },
  sevenKillings: { key: "sevenKillings", name: "Seven Killings", chinese: "七杀", description: "Pressure, urgency, courage, and high-stakes discipline." },
  directOfficer: { key: "directOfficer", name: "Direct Officer", chinese: "正官", description: "Order, duty, standards, reputation, and formal authority." },
  indirectResource: { key: "indirectResource", name: "Indirect Resource", chinese: "偏印", description: "Pattern recognition, intuition, unconventional learning, and strategy." },
  directResource: { key: "directResource", name: "Direct Resource", chinese: "正印", description: "Support, study, protection, credentials, and trusted knowledge." },
};

const GENERATES: Record<FiveElement, FiveElement> = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

const CONTROLS: Record<FiveElement, FiveElement> = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

const PILLAR_LABELS: Record<PillarKey, { label: string; focus: string }> = {
  year: { label: "Year Pillar", focus: "Ancestry, public context, and early environment" },
  month: { label: "Month Pillar", focus: "Season, work style, family system, and social role" },
  day: { label: "Day Pillar", focus: "Day Master, intimate self, and close relationships" },
  hour: { label: "Hour Pillar", focus: "Late-life themes, ambitions, ideas, and output" },
};

const ELEMENT_MEANINGS: Record<FiveElement, string> = {
  Wood: "growth, planning, learning, and long-range development",
  Fire: "visibility, warmth, expression, and momentum",
  Earth: "stability, trust, mediation, and practical responsibility",
  Metal: "structure, precision, standards, and refinement",
  Water: "adaptability, research, communication, and strategic movement",
};

export function calculateTenGod(dayStem: string, targetStem: string): TenGod {
  const day = getStemMeta(dayStem);
  const target = getStemMeta(targetStem);
  const samePolarity = day.yinYang === target.yinYang;

  if (day.element === target.element) {
    return samePolarity ? TEN_GODS.friend : TEN_GODS.robWealth;
  }

  if (GENERATES[day.element] === target.element) {
    return samePolarity ? TEN_GODS.eatingGod : TEN_GODS.hurtingOfficer;
  }

  if (CONTROLS[day.element] === target.element) {
    return samePolarity ? TEN_GODS.indirectWealth : TEN_GODS.directWealth;
  }

  if (CONTROLS[target.element] === day.element) {
    return samePolarity ? TEN_GODS.sevenKillings : TEN_GODS.directOfficer;
  }

  if (GENERATES[target.element] === day.element) {
    return samePolarity ? TEN_GODS.indirectResource : TEN_GODS.directResource;
  }

  throw new Error(`Unable to calculate Ten God for ${dayStem} against ${targetStem}.`);
}

export function calculateBaziChart(input: BaziChartInput): BaziChart {
  validateChartInput(input);

  const minute = input.minute ?? 0;
  const timezone = input.timezone?.trim() || "Local civil time";
  const gender = input.gender ?? "not-specified";
  const ganZhi = calculateGanZhi(input.year, input.month, input.day, input.hour);
  const lunarDate = solarToLunar({ year: input.year, month: input.month, day: input.day, hour: input.hour });
  const dayMaster = getStemMeta(ganZhi.day.stem);
  const pillars = buildPillars(ganZhi, dayMaster.chinese);
  const elementBalance = calculateElementBalance(pillars);
  const dominantElement = [...elementBalance].sort((a, b) => b.score - a.score)[0];
  const missingElements = elementBalance.filter((score) => score.score === 0).map((score) => score.element);

  return {
    input: { ...input, minute, timezone, gender },
    pillars,
    dayMaster,
    lunarDate: {
      year: lunarDate.year,
      month: lunarDate.month,
      day: lunarDate.day,
      monthName: getLunarMonthName(lunarDate.month, lunarDate.isLeapMonth),
      dayName: getLunarDayName(lunarDate.day),
      isLeapMonth: lunarDate.isLeapMonth,
    },
    elementBalance,
    dominantElement,
    missingElements,
    readingHighlights: buildReadingHighlights(dayMaster, dominantElement, elementBalance, pillars),
    notices: [
      "This chart uses deterministic Gan-Zhi and lunar calendar conversion from the supplied civil birth time.",
      "No birth data is stored by this page; calculation runs in the browser session.",
      "Solar-term boundary correction and AI interpretation are intentionally kept separate from this browser chart.",
    ],
  };
}

function buildPillars(ganZhi: Record<PillarKey, GanZhiPillar>, dayStem: string): BaziChartPillar[] {
  return (["year", "month", "day", "hour"] as PillarKey[]).map((key) => {
    const pillar = ganZhi[key];
    const branch = getBranchMeta(pillar.branch);
    const label = PILLAR_LABELS[key];

    return {
      key,
      label: label.label,
      focus: label.focus,
      ganZhi: pillar.chinese,
      stem: getStemMeta(pillar.stem),
      branch,
      stemTenGod: key === "day" ? TEN_GODS.dayMaster : calculateTenGod(dayStem, pillar.stem),
      hiddenStems: branch.hiddenStems.map((hiddenStem) => ({
        stem: getStemMeta(hiddenStem.stem),
        weight: hiddenStem.weight,
        tenGod: calculateTenGod(dayStem, hiddenStem.stem),
      })),
    };
  });
}

function calculateElementBalance(pillars: BaziChartPillar[]): ElementScore[] {
  const scores = new Map<FiveElement, number>(ELEMENTS.map((element) => [element, 0]));

  for (const pillar of pillars) {
    scores.set(pillar.stem.element, (scores.get(pillar.stem.element) ?? 0) + 1);

    for (const hiddenStem of pillar.hiddenStems) {
      scores.set(hiddenStem.stem.element, (scores.get(hiddenStem.stem.element) ?? 0) + hiddenStem.weight);
    }
  }

  const total = Array.from(scores.values()).reduce((sum, score) => sum + score, 0);

  return ELEMENTS.map((element) => {
    const score = roundToOneDecimal(scores.get(element) ?? 0);

    return {
      element,
      chinese: ELEMENT_CHINESE[element],
      score,
      percentage: Math.round((score / total) * 100),
    };
  });
}

function buildReadingHighlights(
  dayMaster: StemMeta,
  dominantElement: ElementScore,
  elementBalance: ElementScore[],
  pillars: BaziChartPillar[],
): string[] {
  const monthPillar = pillars.find((pillar) => pillar.key === "month");
  const lowestElements = [...elementBalance].sort((a, b) => a.score - b.score).slice(0, 2);

  return [
    `Your Day Master is ${dayMaster.pinyin} ${dayMaster.chinese}, ${dayMaster.name}. In Bazi, this is the reference point for identity, decision style, and self-expression.`,
    `${dominantElement.element} is the strongest weighted signal in this chart. Read it as an emphasis on ${ELEMENT_MEANINGS[dominantElement.element]}.`,
    monthPillar
      ? `The Month Pillar is ${monthPillar.ganZhi}, placing ${monthPillar.branch.element} seasonality near the center of the chart's practical reading.`
      : "The Month Pillar is the main seasonal anchor for interpreting chart strength.",
    `The lightest element signals are ${lowestElements.map((item) => item.element).join(" and ")}. In a full reading, these areas deserve context before being labeled as weak or missing.`,
  ];
}

function validateChartInput(input: BaziChartInput): void {
  if (!Number.isInteger(input.year) || input.year < 1900 || input.year > 2100) {
    throw new Error("Birth year must be a whole number from 1900 to 2100.");
  }

  if (!Number.isInteger(input.month) || input.month < 1 || input.month > 12) {
    throw new Error("Birth month must be from 1 to 12.");
  }

  const maxDay = new Date(Date.UTC(input.year, input.month, 0)).getUTCDate();
  if (!Number.isInteger(input.day) || input.day < 1 || input.day > maxDay) {
    throw new Error("Birth day is not valid for the selected month.");
  }

  if (!Number.isInteger(input.hour) || input.hour < 0 || input.hour > 23) {
    throw new Error("Birth hour must be from 0 to 23.");
  }

  if (input.minute !== undefined && (!Number.isInteger(input.minute) || input.minute < 0 || input.minute > 59)) {
    throw new Error("Birth minute must be from 0 to 59.");
  }
}

function getStemMeta(stem: string): StemMeta {
  const meta = STEMS[stem];
  if (!meta) {
    throw new Error(`Unknown heavenly stem: ${stem}`);
  }

  return meta;
}

function getBranchMeta(branch: string): BranchMeta {
  const meta = BRANCHES[branch];
  if (!meta) {
    throw new Error(`Unknown earthly branch: ${branch}`);
  }

  return meta;
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
