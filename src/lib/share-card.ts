import { calculateBaziChart, type BaziChart } from "@/lib/bazi";
import { castIChingReading, getHexagramByNumber, type IChingReading } from "@/lib/i-ching";
import { calculateZodiacCompatibility, ZODIAC_SIGNS, type ZodiacCompatibilityResult, type ZodiacSign } from "@/lib/zodiac";

export type ShareTool = "bazi" | "i-ching" | "zodiac";

export interface ShareCardUrlOptions {
  baseUrl?: string;
  tool: ShareTool;
  params: Record<string, string | number | boolean | null | undefined>;
}

export interface ShareCardData {
  tool: ShareTool;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  disclaimer: string;
  isFallback: boolean;
}

const DEFAULT_BASE_URL = "https://chinesemetaphysics.com";
const SHARE_CARD_PATH = "/api/share-card";
const SUMMARY_MAX_LENGTH = 180;
const QUERY_VALUE_MAX_LENGTH = 80;
const ALLOWED_GENDERS = new Set(["female", "male", "not-specified"]);
const ZODIAC_SIGN_SLUGS = new Set<string>(ZODIAC_SIGNS.map((sign) => sign.slug));

export function buildShareCardUrl({ baseUrl = DEFAULT_BASE_URL, tool, params }: ShareCardUrlOptions): string {
  const url = new URL(SHARE_CARD_PATH, normalizeBaseUrl(baseUrl));
  url.searchParams.set("tool", tool);

  for (const [key, value] of Object.entries(params)) {
    const encoded = encodeShareParam(value);
    if (encoded) {
      url.searchParams.set(key, encoded);
    }
  }

  return url.toString();
}

export function shapeShareCardData(searchParams: URLSearchParams): ShareCardData {
  const tool = searchParams.get("tool");

  if (tool === "bazi") {
    return shapeBaziShareCard(searchParams);
  }

  if (tool === "i-ching") {
    return shapeIChingShareCard(searchParams);
  }

  if (tool === "zodiac") {
    return shapeZodiacShareCard(searchParams);
  }

  return buildFallbackCard("Eastern Blueprint Tools", "Generate a local metaphysics result and share a privacy-safe preview.");
}

export function encodeShareParam(value: string | number | boolean | null | undefined): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return sanitizeShareText(String(value), QUERY_VALUE_MAX_LENGTH) || undefined;
}

export function sanitizeShareText(value: string, maxLength = SUMMARY_MAX_LENGTH): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function buildBaziShareParams(chart: BaziChart): Record<string, string | number> {
  return {
    y: chart.input.year,
    m: chart.input.month,
    d: chart.input.day,
    h: chart.input.hour,
    min: chart.input.minute,
    g: chart.input.gender ?? "not-specified",
    tz: chart.input.timezone,
  };
}

export function buildIChingShareParams(reading: IChingReading): Record<string, string | number> {
  return {
    hex: reading.primary.number,
    rel: reading.relating?.number ?? "",
    lines: reading.changingLines.join(","),
  };
}

export function buildZodiacShareParams(result: ZodiacCompatibilityResult): Record<string, string> {
  return {
    a: result.signA.slug,
    b: result.signB.slug,
  };
}

function shapeBaziShareCard(searchParams: URLSearchParams): ShareCardData {
  const year = parseIntegerParam(searchParams, "y");
  const month = parseIntegerParam(searchParams, "m");
  const day = parseIntegerParam(searchParams, "d");
  const hour = parseIntegerParam(searchParams, "h");
  const minute = parseIntegerParam(searchParams, "min") ?? 0;
  const genderParam = sanitizeShareText(searchParams.get("g") ?? "not-specified", 20);
  const gender = ALLOWED_GENDERS.has(genderParam) ? (genderParam as "female" | "male" | "not-specified") : "not-specified";
  const timezone = sanitizeShareText(searchParams.get("tz") ?? "Local civil time", 48) || "Local civil time";

  if (year === undefined || month === undefined || day === undefined || hour === undefined) {
    return buildFallbackCard("Bazi Share Card", "Add a birth date and time to generate a Four Pillars preview.");
  }

  try {
    const chart = calculateBaziChart({ year, month, day, hour, minute, gender, timezone });
    const pillars = chart.pillars.map((pillar) => pillar.ganZhi).join(" · ");

    return {
      tool: "bazi",
      eyebrow: "Bazi Four Pillars",
      title: `${chart.dayMaster.name} Day Master`,
      subtitle: pillars,
      summary: `Dominant element: ${chart.dominantElement.element}. Lunar date: ${chart.lunarDate.monthName} ${chart.lunarDate.dayName}.`,
      highlights: [
        `${chart.input.year}-${String(chart.input.month).padStart(2, "0")}-${String(chart.input.day).padStart(2, "0")} ${String(chart.input.hour).padStart(2, "0")}:${String(chart.input.minute).padStart(2, "0")}`,
        `Strongest signal: ${chart.dominantElement.chinese} ${chart.dominantElement.element}`,
        `${chart.dayMaster.pinyin} ${chart.dayMaster.chinese}`,
      ],
      disclaimer: "Preview generated from URL parameters only. No birth data is stored.",
      isFallback: false,
    };
  } catch {
    return buildFallbackCard("Bazi Share Card", "The supplied birth details were incomplete or outside the supported range.");
  }
}

function shapeIChingShareCard(searchParams: URLSearchParams): ShareCardData {
  const primaryNumber = parseIntegerParam(searchParams, "hex");

  if (primaryNumber === undefined) {
    return buildFallbackCard("I Ching Share Card", "Cast a hexagram to create a reflective preview card.");
  }

  try {
    const primary = getHexagramByNumber(primaryNumber);
    const relatingNumber = parseIntegerParam(searchParams, "rel");
    const relating = relatingNumber ? getHexagramByNumber(relatingNumber) : undefined;
    const changingLines = parseLineList(searchParams.get("lines"));
    const reading = castIChingReading({
      question: "Shared reflection",
      coins: binaryToStableCoins(primary.binary, changingLines),
    });
    const summary = relating
      ? `${primary.name} changes toward ${relating.name}. Read it as present pattern and direction of change.`
      : reading.summary;

    return {
      tool: "i-ching",
      eyebrow: "I Ching Oracle",
      title: `${primary.number}. ${primary.name}`,
      subtitle: `${primary.chinese}${relating ? ` → ${relating.chinese}` : ""}`,
      summary,
      highlights: [
        `Judgment: ${primary.judgment}`,
        relating ? `Relating: ${relating.number}. ${relating.name}` : "No changing lines",
        changingLines.length ? `Changing lines: ${changingLines.join(", ")}` : "Stable hexagram",
      ],
      disclaimer: "Reflective preview only. The original question is not included.",
      isFallback: false,
    };
  } catch {
    return buildFallbackCard("I Ching Share Card", "The supplied hexagram parameters were invalid.");
  }
}

function shapeZodiacShareCard(searchParams: URLSearchParams): ShareCardData {
  const first = sanitizeShareText(searchParams.get("a") ?? "", 20);
  const second = sanitizeShareText(searchParams.get("b") ?? "", 20);

  if (!isZodiacSign(first) || !isZodiacSign(second)) {
    return buildFallbackCard("Zodiac Compatibility", "Choose two zodiac signs to generate a compatibility preview.");
  }

  const result = calculateZodiacCompatibility(first, second);

  return {
    tool: "zodiac",
    eyebrow: "Chinese Zodiac Compatibility",
    title: `${result.signA.name} + ${result.signB.name}`,
    subtitle: `${result.score}/100 · ${result.label}`,
    summary: result.summary,
    highlights: [result.relationship, result.strengths[0], result.watchouts[0]],
    disclaimer: "For entertainment and self-reflection purposes.",
    isFallback: false,
  };
}

function buildFallbackCard(title: string, summary: string): ShareCardData {
  return {
    tool: "bazi",
    eyebrow: "Eastern Blueprint",
    title,
    subtitle: "Privacy-safe local tools",
    summary,
    highlights: ["Bazi", "I Ching", "Chinese Zodiac"],
    disclaimer: "Open a tool result to generate a complete share card.",
    isFallback: true,
  };
}

function normalizeBaseUrl(baseUrl: string): string {
  try {
    return new URL(baseUrl).toString();
  } catch {
    return DEFAULT_BASE_URL;
  }
}

function parseIntegerParam(searchParams: URLSearchParams, key: string): number | undefined {
  const value = searchParams.get(key);
  if (!value || !/^\d+$/.test(value)) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

function parseLineList(value: string | null): number[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => Number(item))
    .filter((line) => Number.isInteger(line) && line >= 1 && line <= 6)
    .filter((line, index, lines) => lines.indexOf(line) === index);
}

function binaryToStableCoins(binary: string, changingLines: number[]): Array<[number, number, number]> {
  return binary.split("").map((bit, index) => {
    const position = index + 1;
    const changing = changingLines.includes(position);

    if (bit === "1") {
      return changing ? [3, 3, 3] : [3, 2, 2];
    }

    return changing ? [2, 2, 2] : [2, 3, 3];
  });
}

function isZodiacSign(value: string): value is ZodiacSign {
  return ZODIAC_SIGN_SLUGS.has(value);
}
