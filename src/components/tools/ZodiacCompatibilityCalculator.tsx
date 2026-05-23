"use client";

import { useMemo, useState } from "react";
import { HeartHandshake } from "lucide-react";
import ShareCardControls from "@/components/tools/ShareCardControls";
import { ZODIAC_SIGNS, calculateZodiacCompatibility, type ZodiacSign } from "@/lib/zodiac";
import { buildZodiacShareParams } from "@/lib/share-card";

export default function ZodiacCompatibilityCalculator() {
  const [first, setFirst] = useState<ZodiacSign>("rat");
  const [second, setSecond] = useState<ZodiacSign>("ox");
  const result = useMemo(() => calculateZodiacCompatibility(first, second), [first, second]);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white dark:bg-gold-400 dark:text-ink-950">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">Compare two signs</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">Year-sign compatibility for quick reflection.</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">First sign</span>
              <select
                value={first}
                onChange={(event) => setFirst(event.target.value as ZodiacSign)}
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
              >
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign.slug} value={sign.slug}>
                    {sign.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Second sign</span>
              <select
                value={second}
                onChange={(event) => setSecond(event.target.value as ZodiacSign)}
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
              >
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign.slug} value={sign.slug}>
                    {sign.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <article className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-gold-300">
            Compatibility Result
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                {result.signA.name} + {result.signB.name}
              </h2>
              <p className="mt-2 text-lg font-semibold text-brand-primary dark:text-gold-300">{result.label}</p>
            </div>
            <div className="rounded-lg bg-brand-50 px-5 py-4 text-center text-brand-900 dark:bg-gold-500/10 dark:text-gold-200">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em]">Score</span>
              <span className="text-4xl font-semibold">{result.score}</span>
            </div>
          </div>
          <p className="mt-5 text-base leading-8 text-ink-700 dark:text-ink-200">{result.summary}</p>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-500 dark:text-ink-400">Pattern</dt>
              <dd className="mt-1 font-semibold text-ink-950 dark:text-paper">{result.relationship}</dd>
            </div>
            <div>
              <dt className="text-ink-500 dark:text-ink-400">{result.signA.name}</dt>
              <dd className="mt-1 font-semibold text-ink-950 dark:text-paper">
                {result.signA.branch}, {result.signA.element}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500 dark:text-ink-400">{result.signB.name}</dt>
              <dd className="mt-1 font-semibold text-ink-950 dark:text-paper">
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
        <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Strengths</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            {result.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Watchouts</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            {result.watchouts.map((watchout) => (
              <li key={watchout}>{watchout}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-ink-500 dark:text-ink-400">
            For entertainment and self-reflection purposes.
          </p>
        </div>
      </section>
    </div>
  );
}
