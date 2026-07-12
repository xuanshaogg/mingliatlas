import Link from "next/link";
import { CalendarDays, Clock3, Info, Mail, ShieldCheck, SunMedium } from "lucide-react";
import ShareCardControls from "@/components/tools/ShareCardControls";
import type { BaziChart, BaziChartPillar, ElementScore } from "@/lib/bazi";
import { trackEvent } from "@/lib/analytics";
import { buildBaziShareParams } from "@/lib/share-card";

const NEXT_READS = [
  { href: "/blog/day-master-bazi-complete-guide", label: "Your Day Master", description: "Read all 10 Day Masters — the day stem your chart is built around." },
  { href: "/bazi/ten-gods", label: "Ten Gods", description: "Decode the relationship roles around the Day Master." },
  { href: "/bazi/five-elements", label: "Five Elements", description: "Read the element balance in depth." },
  { href: "/bazi/luck-pillars", label: "Luck Pillars", description: "See how timing cycles layer over the natal chart." },
];

interface BaziChartResultProps {
  chart: BaziChart;
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatDateTime(time: { year: number; month: number; day: number; hour: number; minute: number }): string {
  return `${time.year}-${String(time.month).padStart(2, "0")}-${String(time.day).padStart(2, "0")} ${formatTime(time.hour, time.minute)}`;
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
  const currentYear = new Date().getFullYear();

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
          <div className="mt-5 grid gap-3 border-t border-ink-100 pt-4 text-sm dark:border-white/10 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              {chart.calculation.basis === "true-solar" ? (
                <SunMedium className="mt-0.5 h-4 w-4 flex-none text-brand-primary dark:text-gold-300" aria-hidden="true" />
              ) : (
                <Clock3 className="mt-0.5 h-4 w-4 flex-none text-brand-primary dark:text-gold-300" aria-hidden="true" />
              )}
              <span>
                <span className="block font-semibold text-ink-900 dark:text-paper">
                  {chart.calculation.basis === "true-solar" ? "True solar time" : "Civil time"}
                </span>
                <span className="text-ink-600 dark:text-ink-300">
                  Calculated as {formatDateTime(chart.calculation.effectiveTime)}
                  {chart.calculation.correctionMinutes !== 0
                    ? ` (${chart.calculation.correctionMinutes > 0 ? "+" : ""}${chart.calculation.correctionMinutes} min)`
                    : ""}
                </span>
              </span>
            </div>
            <div className="text-ink-600 dark:text-ink-300">
              {chart.input.birthplace ? `Birthplace note: ${chart.input.birthplace}` : "No birthplace note supplied"}
              {chart.input.longitude !== undefined ? ` · ${chart.input.longitude.toFixed(2)}° longitude` : ""}
            </div>
          </div>
          {chart.calculation.warnings.length > 0 ? (
            <ul className="mt-4 space-y-2 border-l-2 border-gold-400 pl-4 text-xs leading-5 text-ink-600 dark:text-ink-300">
              {chart.calculation.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-lg border border-gold-300/70 bg-gold-50 p-6 dark:border-gold-500/30 dark:bg-gold-500/10">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-200">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Privacy
          </div>
          <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            This calculator runs in the browser and does not save your birth details to a server.
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            Use the birth time already adjusted to the birthplace&apos;s local civil time before reading the pillars.
          </p>
        </div>
      </div>

      <section className="border-y border-brand-200 bg-brand-50 px-1 py-5 dark:border-gold-500/30 dark:bg-gold-500/10 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 flex-none text-brand-primary dark:text-gold-300" aria-hidden="true" />
            <div>
              <h2 className="text-base font-semibold text-ink-950 dark:text-paper">Keep learning from your chart</h2>
              <p className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">
                Get one concise Bazi concept or chart-reading prompt each week. No predictions or spam.
              </p>
            </div>
          </div>
          <Link
            href="/subscribe"
            onClick={() => trackEvent("subscribe_clicked", { tool_name: "bazi", source: "chart_summary" })}
            className="inline-flex h-11 flex-none items-center justify-center rounded-full bg-brand-primary px-6 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300"
          >
            Get the weekly note
          </Link>
        </div>
      </section>

      <ShareCardControls tool="bazi" params={buildBaziShareParams(chart)} label="bazi-share-card" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {chart.pillars.map((pillar) => (
          <PillarPanel key={pillar.key} pillar={pillar} />
        ))}
      </div>

      <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">10-year Luck Pillars</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600 dark:text-ink-300">
              Traditional Da Yun cycles are shown as a timing reference after the natal chart. Direction and start age depend on the selected gender rule; they are not predictions.
            </p>
          </div>
          {chart.luckPillarDirection ? (
            <div className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-900 dark:bg-gold-500/10 dark:text-gold-200">
              <span className="block font-semibold">{chart.luckPillarDirection === "forward" ? "Forward" : "Reverse"} direction</span>
              <span>{chart.luckPillarStart ? `Starts ${chart.luckPillarStart}` : "Start date calculated"}</span>
            </div>
          ) : null}
        </div>

        {chart.luckPillars.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-xs uppercase tracking-[0.14em] text-ink-500 dark:border-white/10 dark:text-ink-400">
                  <th className="px-3 py-3 font-semibold">Cycle</th>
                  <th className="px-3 py-3 font-semibold">Years</th>
                  <th className="px-3 py-3 font-semibold">Nominal age</th>
                  <th className="px-3 py-3 font-semibold">Stem / Ten God</th>
                  <th className="px-3 py-3 font-semibold">Branch</th>
                </tr>
              </thead>
              <tbody>
                {chart.luckPillars.map((pillar) => {
                  const current = currentYear >= pillar.startYear && currentYear <= pillar.endYear;
                  return (
                    <tr
                      key={pillar.index}
                      className={`border-b border-ink-100 last:border-0 dark:border-white/10 ${current ? "bg-gold-50/70 dark:bg-gold-500/10" : ""}`}
                    >
                      <td className="px-3 py-4 font-serif text-2xl font-semibold text-ink-950 dark:text-paper">
                        {pillar.ganZhi}
                        {current ? <span className="ml-2 align-middle text-xs font-sans font-semibold text-gold-800 dark:text-gold-200">Current</span> : null}
                      </td>
                      <td className="px-3 py-4 text-ink-700 dark:text-ink-200">{pillar.startYear}–{pillar.endYear}</td>
                      <td className="px-3 py-4 text-ink-700 dark:text-ink-200">{pillar.startAge}–{pillar.endAge}</td>
                      <td className="px-3 py-4 text-ink-700 dark:text-ink-200">{pillar.stem.name} · {pillar.stemTenGod.name}</td>
                      <td className="px-3 py-4 text-ink-700 dark:text-ink-200">{pillar.branch.pinyin} {pillar.branch.element}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 border-l-2 border-ink-200 pl-4 text-sm leading-6 text-ink-600 dark:border-white/10 dark:text-ink-300">
            Select male or female in the optional chart labels to calculate the traditional Da Yun direction. The natal chart itself does not require this field.
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Five Element Balance</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
            Weighted from visible heavenly stems and branch hidden stems. This is a practical signal, not a full
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

      <section className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">Read next</h2>
        <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
          Deepen your understanding of the chart you just calculated.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {NEXT_READS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => trackEvent("related_content_clicked", { tool_name: "bazi", target: item.href })}
              className="group rounded-lg border border-ink-200 p-4 transition hover:border-brand-primary dark:border-white/10 dark:hover:border-gold-400"
            >
              <p className="font-semibold text-ink-950 group-hover:text-brand-primary dark:text-paper dark:group-hover:text-gold-300">
                {item.label}
              </p>
              <p className="mt-1 text-sm leading-5 text-ink-500 dark:text-ink-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

    </section>
  );
}
