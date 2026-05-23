import { CalendarDays, Info, ShieldCheck } from "lucide-react";
import type { BaziChart, BaziChartPillar, ElementScore } from "@/lib/bazi";

interface BaziChartResultProps {
  chart: BaziChart;
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function PillarPanel({ pillar }: { pillar: BaziChartPillar }) {
  return (
    <article className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
            {pillar.label}
          </h3>
          <p className="mt-3 font-serif text-4xl font-semibold text-ink-950 dark:text-paper">{pillar.ganZhi}</p>
        </div>
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-500/15 dark:text-gold-200">
          {pillar.branch.animal}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">{pillar.focus}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-t border-ink-100 pt-3 dark:border-white/10">
          <dt className="text-ink-500 dark:text-ink-400">Stem</dt>
          <dd className="text-right font-medium text-ink-900 dark:text-paper">
            {pillar.stem.pinyin} / {pillar.stem.name}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-500 dark:text-ink-400">Ten God</dt>
          <dd className="text-right font-medium text-ink-900 dark:text-paper">
            {pillar.stemTenGod.name} ({pillar.stemTenGod.chinese})
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-500 dark:text-ink-400">Branch</dt>
          <dd className="text-right font-medium text-ink-900 dark:text-paper">
            {pillar.branch.pinyin} / {pillar.branch.element}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {pillar.hiddenStems.map((hiddenStem) => (
          <span
            key={`${pillar.key}-${hiddenStem.stem.chinese}-${hiddenStem.weight}`}
            className="rounded-full border border-ink-200 px-2.5 py-1 text-xs text-ink-600 dark:border-white/10 dark:text-ink-300"
          >
            {hiddenStem.stem.chinese} {hiddenStem.tenGod.chinese}
          </span>
        ))}
      </div>
    </article>
  );
}

function ElementBar({ element }: { element: ElementScore }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)_4rem] sm:items-center">
      <div className="flex items-center gap-2 text-sm font-medium text-ink-900 dark:text-paper">
        <span className="font-serif text-lg">{element.chinese}</span>
        <span>{element.element}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-brand-primary dark:bg-gold-400"
          style={{ width: `${Math.max(element.percentage, 4)}%` }}
        />
      </div>
      <div className="text-sm font-semibold text-ink-700 dark:text-ink-200">{element.percentage}%</div>
    </div>
  );
}

export default function BaziChartResult({ chart }: BaziChartResultProps) {
  return (
    <section className="space-y-8" aria-live="polite">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-gold-300">
                Chart Summary
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                {chart.dayMaster.name} Day Master
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">
                Four Pillars generated from the local civil birth time you entered. Use this as a structured chart
                reference before any interpretive reading.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900 dark:bg-gold-500/10 dark:text-gold-200">
              <span className="block font-semibold">Day Master</span>
              <span className="font-serif text-3xl">{chart.dayMaster.chinese}</span>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-ink-700 dark:text-ink-200 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-primary dark:text-gold-300" aria-hidden="true" />
              {chart.input.year}-{String(chart.input.month).padStart(2, "0")}-
              {String(chart.input.day).padStart(2, "0")} {formatTime(chart.input.hour, chart.input.minute)}
            </div>
            <div>Lunar {chart.lunarDate.year}, {chart.lunarDate.monthName} {chart.lunarDate.dayName}</div>
            <div>{chart.input.timezone}</div>
          </div>
        </div>

        <div className="rounded-lg border border-gold-300/70 bg-gold-50 p-6 dark:border-gold-500/30 dark:bg-gold-500/10">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-200">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Privacy
          </div>
          <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            This MVP calculates in the browser and does not save your birth details to a server.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {chart.pillars.map((pillar) => (
          <PillarPanel key={pillar.key} pillar={pillar} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Five Element Balance</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
            Weighted from visible heavenly stems and branch hidden stems. This is a practical MVP signal, not a full
            strength judgment.
          </p>
          <div className="mt-6 space-y-4">
            {chart.elementBalance.map((element) => (
              <ElementBar key={element.element} element={element} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Reading Cues</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-ink-700 dark:text-ink-200">
            {chart.readingHighlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <Info className="mt-1 h-4 w-4 flex-none text-brand-primary dark:text-gold-300" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Calculation Notes</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-ink-700 dark:text-ink-200 md:grid-cols-3">
          {chart.notices.map((notice) => (
            <li key={notice}>{notice}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-6 text-ink-500 dark:text-ink-400">
          For entertainment and self-reflection purposes.
        </p>
      </section>
    </section>
  );
}
