import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Info, Mail, ShieldCheck, SunMedium } from "lucide-react";
import ShareCardControls from "@/components/tools/ShareCardControls";
import type { BaziChart, BaziChartPillar, ElementScore } from "@/lib/bazi";
import { trackEvent } from "@/lib/analytics";
import { buildBaziShareParams } from "@/lib/share-card-params";

interface BaziChartResultProps {
  chart: BaziChart;
  isSample?: boolean;
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatDateTime(time: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}): string {
  return `${time.year}-${String(time.month).padStart(2, "0")}-${String(time.day).padStart(2, "0")} ${formatTime(time.hour, time.minute)}`;
}

function PillarPanel({ pillar }: { pillar: BaziChartPillar }) {
  return (
    <article className="atlas-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-ink-500 dark:text-ink-400 text-sm font-semibold tracking-normal">
            {pillar.label}
          </h3>
          <p className="text-ink-950 dark:text-paper mt-3 font-serif text-4xl font-semibold">
            {pillar.ganZhi}
          </p>
        </div>
        <span className="bg-gold-100 text-gold-800 dark:bg-gold-500/15 dark:text-gold-200 rounded-full px-3 py-1 text-xs font-semibold">
          {pillar.branch.animal}
        </span>
      </div>
      <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">{pillar.focus}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="border-ink-100 flex justify-between gap-4 border-t pt-3 dark:border-white/10">
          <dt className="text-ink-500 dark:text-ink-400">Stem</dt>
          <dd className="text-ink-900 dark:text-paper text-right font-medium">
            {pillar.stem.pinyin} / {pillar.stem.name}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-500 dark:text-ink-400">Ten God</dt>
          <dd className="text-ink-900 dark:text-paper text-right font-medium">
            {pillar.stemTenGod.name} ({pillar.stemTenGod.chinese})
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-500 dark:text-ink-400">Branch</dt>
          <dd className="text-ink-900 dark:text-paper text-right font-medium">
            {pillar.branch.pinyin} / {pillar.branch.element}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {pillar.hiddenStems.map((hiddenStem) => (
          <span
            key={`${pillar.key}-${hiddenStem.stem.chinese}-${hiddenStem.weight}`}
            className="border-ink-200 text-ink-600 dark:text-ink-300 rounded-full border px-2.5 py-1 text-xs dark:border-white/10"
          >
            {hiddenStem.stem.chinese} {hiddenStem.tenGod.chinese}
          </span>
        ))}
      </div>
    </article>
  );
}

function ElementBar({ element }: { element: ElementScore }) {
  const colors: Record<ElementScore["element"], string> = {
    Wood: "bg-emerald-700 dark:bg-emerald-400",
    Fire: "bg-brand-primary dark:bg-brand-400",
    Earth: "bg-amber-600 dark:bg-amber-400",
    Metal: "bg-slate-500 dark:bg-slate-300",
    Water: "bg-sky-700 dark:bg-sky-400",
  };
  return (
    <div className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)_4rem] sm:items-center">
      <div className="text-ink-900 dark:text-paper flex items-center gap-2 text-sm font-medium">
        <span className="font-serif text-lg">{element.chinese}</span>
        <span>{element.element}</span>
      </div>
      <div
        className="bg-ink-100 h-3 overflow-hidden rounded-full dark:bg-white/10"
        aria-hidden="true"
      >
        <div
          className={`h-full rounded-full ${colors[element.element]}`}
          style={{ width: `${Math.min(100, Math.max(element.percentage, 0))}%` }}
        />
      </div>
      <div className="text-ink-700 dark:text-ink-200 text-sm font-semibold">
        {element.percentage}%
      </div>
    </div>
  );
}

export default function BaziChartResult({ chart, isSample = false }: BaziChartResultProps) {
  const currentYear = new Date().getFullYear();
  const dayMasterLabel = `${chart.dayMaster.pinyin} ${chart.dayMaster.element}`;
  const nextReads = [
    {
      href: `/blog/${chart.dayMaster.pinyin.toLowerCase()}-${chart.dayMaster.element.toLowerCase()}-day-master`,
      label: `${dayMasterLabel} Day Master`,
      description: `Start with the dedicated guide for the ${dayMasterLabel} day stem in this chart.`,
    },
    {
      href: "/bazi/ten-gods",
      label: "Ten Gods",
      description: "Decode the relationship roles around the Day Master.",
    },
    {
      href: "/bazi/five-elements",
      label: "Five Elements",
      description: "Read the element balance in depth.",
    },
    {
      href: "/bazi/luck-pillars",
      label: "Luck Pillars",
      description: "See how timing cycles layer over the natal chart.",
    },
  ];
  const [primaryRead, ...secondaryReads] = nextReads;

  function trackReadingClick(item: (typeof nextReads)[number], index: number): void {
    const properties = {
      tool_name: "bazi",
      target: item.href,
      day_master: dayMasterLabel,
      source: index === 0 ? "result_primary" : "result_secondary",
      link_rank: index + 1,
      result_state: isSample ? "sample" : "calculated",
    };

    trackEvent("related_content_clicked", properties);

    if (index === 0) {
      trackEvent("primary_guide_clicked", properties);
    }
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="atlas-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-normal">
                {isSample ? "Sample Chart" : "Your Chart"}
              </p>
              <h2 className="text-ink-950 dark:text-paper mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {dayMasterLabel} Day Master
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-6">
                {isSample
                  ? "This example uses the default birth details above. Enter your own date and time, then calculate to generate your chart."
                  : "Four Pillars generated from the local civil birth time you entered. Use this as a structured chart reference before any interpretive reading."}
              </p>
            </div>
            <div className="bg-brand-50 text-brand-900 dark:bg-gold-500/10 dark:text-gold-200 rounded-lg px-4 py-3 text-sm">
              <span className="block font-semibold">Day Master</span>
              <span className="font-serif text-3xl">{chart.dayMaster.chinese}</span>
            </div>
          </div>
          <div className="text-ink-700 dark:text-ink-200 mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CalendarDays
                className="text-brand-primary dark:text-gold-300 h-4 w-4"
                aria-hidden="true"
              />
              {chart.input.year}-{String(chart.input.month).padStart(2, "0")}-
              {String(chart.input.day).padStart(2, "0")}{" "}
              {formatTime(chart.input.hour, chart.input.minute)}
            </div>
            <div>
              Lunar {chart.lunarDate.year}, {chart.lunarDate.monthName} {chart.lunarDate.dayName}
            </div>
            <div>{chart.input.timezone}</div>
          </div>
          <div className="border-ink-100 mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2 dark:border-white/10">
            <div className="flex items-start gap-2">
              {chart.calculation.basis === "true-solar" ? (
                <SunMedium
                  className="text-brand-primary dark:text-gold-300 mt-0.5 h-4 w-4 flex-none"
                  aria-hidden="true"
                />
              ) : (
                <Clock3
                  className="text-brand-primary dark:text-gold-300 mt-0.5 h-4 w-4 flex-none"
                  aria-hidden="true"
                />
              )}
              <span>
                <span className="text-ink-900 dark:text-paper block font-semibold">
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
              {chart.input.birthplace
                ? `Birthplace note: ${chart.input.birthplace}`
                : "No birthplace note supplied"}
              {chart.input.longitude !== undefined
                ? ` · ${chart.input.longitude.toFixed(2)}° longitude`
                : ""}
            </div>
          </div>
          {chart.calculation.warnings.length > 0 ? (
            <ul className="border-gold-400 text-ink-600 dark:text-ink-300 mt-4 space-y-2 border-l-2 pl-4 text-xs leading-5">
              {chart.calculation.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="border-gold-300/70 bg-gold-50 dark:border-gold-500/30 dark:bg-gold-500/10 rounded-lg border p-6">
          <div className="text-gold-800 dark:text-gold-200 flex items-center gap-2 text-sm font-semibold tracking-normal">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Privacy
          </div>
          <p className="text-ink-700 dark:text-ink-200 mt-3 text-sm leading-6">
            This calculator runs in the browser and does not save your birth details to a server.
          </p>
          <p className="text-ink-700 dark:text-ink-200 mt-3 text-sm leading-6">
            Use the birth time already adjusted to the birthplace&apos;s local civil time before
            reading the pillars.
          </p>
        </div>
      </div>

      <section className="bg-brand-50 dark:bg-gold-500/10 rounded-2xl p-5 sm:p-6">
        <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-normal">
          {isSample ? "Example reading path" : "Your next reading"}
        </p>
        <h2 className="text-ink-950 dark:text-paper mt-2 text-2xl font-semibold tracking-tight">
          Your chart starts with the {dayMasterLabel} Day Master
        </h2>
        <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-3xl text-sm leading-6">
          Read the day stem first, then use Ten Gods, Five Elements, and Luck Pillars to add context
          in that order.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Link
            data-content-role="primary-guide"
            href={primaryRead.href}
            onClick={() => trackReadingClick(primaryRead, 0)}
            className="group bg-brand-primary hover:bg-brand-800 focus-visible:ring-brand-primary dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300 dark:focus-visible:ring-gold-300 dark:focus-visible:ring-offset-ink-950 flex min-h-40 flex-col justify-between rounded-lg p-5 text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-6"
          >
            <span>
              <span className="dark:text-ink-700 text-xs font-semibold tracking-normal text-white/75">
                Recommended first · Step 1
              </span>
              <span className="mt-3 block text-xl font-semibold tracking-tight sm:text-2xl">
                Read your {primaryRead.label} guide
              </span>
              <span className="dark:text-ink-800 mt-2 block max-w-xl text-sm leading-6 text-white/80">
                {primaryRead.description}
              </span>
            </span>
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
              Open your Day Master guide
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </span>
          </Link>

          <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1" start={2}>
            {secondaryReads.map((item, secondaryIndex) => {
              const index = secondaryIndex + 1;

              return (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={() => trackReadingClick(item, index)}
                    className="group border-ink-200 hover:border-brand-primary focus-visible:ring-brand-primary dark:hover:border-gold-400 dark:focus-visible:ring-gold-300 dark:focus-visible:ring-offset-ink-950 flex h-full min-h-11 items-start gap-3 rounded-lg border bg-white p-3 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="bg-brand-50 text-brand-primary dark:bg-gold-500/15 dark:text-gold-300 flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span>
                      <span className="text-ink-950 group-hover:text-brand-primary dark:text-paper dark:group-hover:text-gold-300 block font-semibold">
                        {item.label}
                      </span>
                      <span className="text-ink-500 dark:text-ink-400 mt-1 block text-sm leading-5">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-brand-200 bg-brand-50 dark:border-gold-500/30 dark:bg-gold-500/10 border-y px-1 py-5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-start gap-3">
            <Mail
              className="text-brand-primary dark:text-gold-300 mt-1 h-5 w-5 flex-none"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-ink-950 dark:text-paper text-base font-semibold">
                Keep learning from your chart
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm leading-6">
                Get one concise Bazi concept or chart-reading prompt each week. No predictions or
                spam.
              </p>
            </div>
          </div>
          <Link
            href="/subscribe"
            onClick={() =>
              trackEvent("subscribe_clicked", { tool_name: "bazi", source: "chart_summary" })
            }
            className="bg-brand-primary hover:bg-brand-800 dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300 inline-flex h-11 flex-none items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition"
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

      <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
              10-year Luck Pillars
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-3xl text-sm leading-6">
              Traditional Da Yun cycles are shown as a timing reference after the natal chart.
              Direction and start age depend on the selected gender rule; they are not predictions.
            </p>
          </div>
          {chart.luckPillarDirection ? (
            <div className="bg-brand-50 text-brand-900 dark:bg-gold-500/10 dark:text-gold-200 rounded-md px-4 py-3 text-sm">
              <span className="block font-semibold">
                {chart.luckPillarDirection === "forward" ? "Forward" : "Reverse"} direction
              </span>
              <span>
                {chart.luckPillarStart
                  ? `Starts ${chart.luckPillarStart}`
                  : "Start date calculated"}
              </span>
            </div>
          ) : null}
        </div>

        {chart.luckPillars.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-ink-200 text-ink-500 dark:text-ink-400 border-b text-xs tracking-normal dark:border-white/10">
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
                      className={`border-ink-100 border-b last:border-0 dark:border-white/10 ${current ? "bg-gold-50/70 dark:bg-gold-500/10" : ""}`}
                    >
                      <td className="text-ink-950 dark:text-paper px-3 py-4 font-serif text-2xl font-semibold">
                        {pillar.ganZhi}
                        {current ? (
                          <span className="text-gold-800 dark:text-gold-200 ml-2 align-middle font-sans text-xs font-semibold">
                            Current
                          </span>
                        ) : null}
                      </td>
                      <td className="text-ink-700 dark:text-ink-200 px-3 py-4">
                        {pillar.startYear}–{pillar.endYear}
                      </td>
                      <td className="text-ink-700 dark:text-ink-200 px-3 py-4">
                        {pillar.startAge}–{pillar.endAge}
                      </td>
                      <td className="text-ink-700 dark:text-ink-200 px-3 py-4">
                        {pillar.stem.name} · {pillar.stemTenGod.name}
                      </td>
                      <td className="text-ink-700 dark:text-ink-200 px-3 py-4">
                        {pillar.branch.pinyin} {pillar.branch.element}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border-ink-200 text-ink-600 dark:text-ink-300 mt-6 border-l-2 pl-4 text-sm leading-6 dark:border-white/10">
            Select male or female in the optional chart labels to calculate the traditional Da Yun
            direction. The natal chart itself does not require this field.
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
            Five Element Balance
          </h2>
          <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
            Weighted from visible heavenly stems and branch hidden stems. This is a practical
            signal, not a full strength judgment.
          </p>
          <div className="mt-6 space-y-4">
            {chart.elementBalance.map((element) => (
              <ElementBar key={element.element} element={element} />
            ))}
          </div>
        </section>

        <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
            Reading Cues
          </h2>
          <ul className="text-ink-700 dark:text-ink-200 mt-5 space-y-4 text-sm leading-6">
            {chart.readingHighlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <Info
                  className="text-brand-primary dark:text-gold-300 mt-1 h-4 w-4 flex-none"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="border-ink-200 rounded-lg border bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
          Calculation Notes
        </h2>
        <ul className="text-ink-700 dark:text-ink-200 mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">
          {chart.notices.map((notice) => (
            <li key={notice}>{notice}</li>
          ))}
        </ul>
        <p className="text-ink-500 dark:text-ink-400 mt-5 text-sm leading-6">
          For entertainment and self-reflection purposes.
        </p>
      </section>
    </section>
  );
}
