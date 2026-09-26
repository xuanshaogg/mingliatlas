"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowLeftRight, HeartHandshake } from "lucide-react";
import { ZODIAC_SIGNS, calculateZodiacCompatibility, type ZodiacSign } from "@/lib/zodiac";
import { useToolFunnelTracker } from "@/lib/analytics/tool-funnel";
import { trackAnalyticsEvent as trackEvent } from "@/lib/analytics/track";
import { buildZodiacShareParams } from "@/lib/share-card-params";

const ShareCardControls = dynamic(() => import("@/components/tools/ShareCardControls"), {
  ssr: false,
  loading: () => (
    <div className="border-ink-200 bg-paper-100 h-[7.25rem] rounded-lg border" aria-hidden="true" />
  ),
});

export default function ZodiacCompatibilityCalculator() {
  const [first, setFirst] = useState<ZodiacSign>("rat");
  const [second, setSecond] = useState<ZodiacSign>("ox");
  const result = useMemo(() => calculateZodiacCompatibility(first, second), [first, second]);
  const funnel = useToolFunnelTracker("zodiac");
  const resultRef = useRef<HTMLElement>(null);

  function showResult(): void {
    funnel.markStarted();
    funnel.markCompleted();
    resultRef.current?.focus({ preventScroll: true });
    resultRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  // The result is computed reactively as the selects change. Keep only the
  // first comparison in the acquisition funnel; later comparisons are useful
  // product-use telemetry rather than additional funnel completions.
  function handleSelect(setter: (sign: ZodiacSign) => void, value: ZodiacSign): void {
    funnel.markStarted();
    setter(value);
    funnel.markCompleted();
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <div className="atlas-surface self-start p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="bg-brand-primary dark:bg-gold-400 dark:text-ink-950 flex h-10 w-10 items-center justify-center rounded-full text-white">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
                Compare two signs
              </h2>
              <p className="text-ink-500 dark:text-ink-400 text-sm">
                Year-sign compatibility for quick reflection.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-ink-900 dark:text-paper text-sm font-medium">First sign</span>
              <select
                value={first}
                onChange={(event) => handleSelect(setFirst, event.target.value as ZodiacSign)}
                className="atlas-input mt-2 h-12"
              >
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign.slug} value={sign.slug}>
                    {sign.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-ink-900 dark:text-paper text-sm font-medium">Second sign</span>
              <select
                value={second}
                onChange={(event) => handleSelect(setSecond, event.target.value as ZodiacSign)}
                className="atlas-input mt-2 h-12"
              >
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign.slug} value={sign.slug}>
                    {sign.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="border-ink-100 mt-5 flex flex-wrap gap-2 border-t pt-5 dark:border-white/10">
            <button type="button" onClick={showResult} className="atlas-button-primary flex-1">
              View comparison <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                funnel.markStarted();
                setFirst(second);
                setSecond(first);
                funnel.markCompleted();
              }}
              className="atlas-button-secondary"
              aria-label="Swap signs"
            >
              <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
              <span>Swap</span>
            </button>
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-5">
            Results update as you choose. Born in January or February?{" "}
            <Link
              href="/chinese-zodiac"
              className="text-brand-primary dark:text-gold-300 underline"
            >
              Check the zodiac year boundary.
            </Link>
          </p>
        </div>

        <article
          ref={resultRef}
          tabIndex={-1}
          aria-label="Zodiac compatibility result"
          className="atlas-surface p-5 outline-none sm:p-6"
        >
          <p role="status" className="sr-only">
            {result.signA.name} and {result.signB.name}: {result.label}.
          </p>
          <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-normal">
            Compatibility Result
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-ink-950 dark:text-paper text-3xl font-semibold tracking-tight">
                {result.signA.name} + {result.signB.name}
              </h2>
              <p className="text-brand-primary dark:text-gold-300 mt-2 text-lg font-semibold">
                {result.label}
              </p>
            </div>
            <div className="bg-brand-50 text-brand-900 dark:bg-gold-500/10 dark:text-gold-200 rounded-lg px-5 py-4 text-center">
              <span className="block text-[0.65rem] font-semibold tracking-normal">
                Pattern score
              </span>
              <span className="text-4xl font-semibold tabular-nums">
                {result.score}
                <span className="text-sm font-normal"> / 100</span>
              </span>
            </div>
          </div>
          <p className="text-ink-700 dark:text-ink-200 mt-5 text-base leading-8">
            {result.summary}
          </p>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-500 dark:text-ink-400">Pattern</dt>
              <dd className="text-ink-950 dark:text-paper mt-1 font-semibold">
                {result.relationship}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500 dark:text-ink-400">{result.signA.name}</dt>
              <dd className="text-ink-950 dark:text-paper mt-1 font-semibold">
                {result.signA.branch}, {result.signA.element}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500 dark:text-ink-400">{result.signB.name}</dt>
              <dd className="text-ink-950 dark:text-paper mt-1 font-semibold">
                {result.signB.branch}, {result.signB.element}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <ShareCardControls
              tool="zodiac"
              params={buildZodiacShareParams(result)}
              label="zodiac-compatibility-share-card"
            />
          </div>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
            Strengths
          </h2>
          <ul className="text-ink-700 dark:text-ink-200 mt-5 space-y-3 text-sm leading-6">
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
            Watchouts
          </h2>
          <ul className="text-ink-700 dark:text-ink-200 mt-5 space-y-3 text-sm leading-6">
            {result.watchouts.map((watchout) => (
              <li key={watchout}>{watchout}</li>
            ))}
          </ul>
          <p className="text-ink-500 dark:text-ink-400 mt-5 text-sm leading-6">
            For entertainment and self-reflection purposes.
          </p>
        </div>
      </section>

      {result.conversationPrompts && result.conversationPrompts.length > 0 ? (
        <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
            Conversation prompts
          </h2>
          <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
            Questions to explore together — not conclusions about the relationship.
          </p>
          <ul className="text-ink-700 dark:text-ink-200 mt-5 grid gap-3 text-sm leading-6 sm:grid-cols-2">
            {result.conversationPrompts.map((prompt) => (
              <li
                key={prompt}
                className="border-ink-100 rounded-md border px-4 py-3 dark:border-white/10"
              >
                {prompt}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
          Explore each sign
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/chinese-zodiac/${result.signA.slug}`}
            onClick={() =>
              trackEvent("related_content_clicked", {
                tool_name: "zodiac",
                target: result.signA.slug,
              })
            }
            className="border-brand-primary text-brand-primary hover:bg-brand-primary dark:border-gold-400 dark:text-gold-300 dark:hover:bg-gold-400 dark:hover:text-ink-950 inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition hover:text-white"
          >
            {result.signA.name} guide →
          </Link>
          <Link
            href={`/chinese-zodiac/${result.signB.slug}`}
            onClick={() =>
              trackEvent("related_content_clicked", {
                tool_name: "zodiac",
                target: result.signB.slug,
              })
            }
            className="border-ink-200 text-ink-700 hover:border-brand-primary hover:text-brand-primary dark:text-ink-300 dark:hover:border-gold-400 dark:hover:text-gold-300 inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition dark:border-white/10"
          >
            {result.signB.name} guide →
          </Link>
        </div>
      </section>
    </div>
  );
}
