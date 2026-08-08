import type { BaziChart } from "@/lib/bazi";
import type { IChingReading } from "@/lib/i-ching";
import type { ZodiacCompatibilityResult } from "@/lib/zodiac";

/**
 * Client-safe parameter builders for share-card links.
 *
 * Keep these tiny helpers separate from the server-side share-card shaping
 * logic so interactive tools do not ship the Bazi/I Ching card renderer to
 * the browser just to build a URL.
 */
export function buildBaziShareParams(chart: BaziChart): Record<string, string | number> {
  const params: Record<string, string | number> = {
    y: chart.input.year,
    m: chart.input.month,
    d: chart.input.day,
    h: chart.input.hour,
    min: chart.input.minute,
    g: chart.input.gender ?? "not-specified",
    tz: chart.input.timezone,
  };

  if (chart.input.timeBasis === "true-solar" && chart.input.longitude !== undefined) {
    params.tb = "true-solar";
    params.lon = chart.input.longitude;
  }

  return params;
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
