"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const CALCULATOR_PATH = "/tools/bazi-calculator";

/**
 * Compact in-article path from a reading page to the Bazi calculator.
 * Uses a paragraph, not a heading, so the article outline stays unchanged.
 */
export default function InlineChartPrompt({
  source,
  zodiac = false,
}: {
  source: string;
  zodiac?: boolean;
}) {
  return (
    <aside
      aria-label="Free Bazi calculator"
      className="bg-ink-950 text-paper-50 relative mt-10 overflow-hidden rounded-xl p-5 sm:p-7"
    >
      <span
        className="atlas-hanzi text-paper-50/[0.07] pointer-events-none absolute -top-3 right-2 text-[7.5rem] select-none"
        aria-hidden="true"
      >
        命
      </span>
      <p className="text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
        Free Bazi calculator
      </p>
      <p className="font-display relative mt-2 max-w-md text-[1.375rem] leading-snug sm:text-2xl">
        {zodiac
          ? "The year animal is one pillar of four. See your whole chart."
          : "See these ideas applied to your own Four Pillars chart."}
      </p>
      <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={CALCULATOR_PATH}
          data-content-role="inline-chart-prompt"
          onClick={() =>
            trackEvent("related_content_clicked", {
              source,
              target: CALCULATOR_PATH,
              link_rank: 1,
            })
          }
          className="bg-brand-primary hover:bg-brand-500 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition-colors"
        >
          Build my free Bazi chart
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <span className="text-ink-300 text-[0.8125rem]">No sign-up. Nothing is stored.</span>
      </div>
    </aside>
  );
}
