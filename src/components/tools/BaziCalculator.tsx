"use client";

import { useRef, useState, type ReactNode } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import BaziChartResult from "@/components/tools/BaziChartResult";
import { calculateBaziChart, type BaziChart, type BaziChartInput } from "@/lib/bazi";
import { trackEvent } from "@/lib/analytics";

interface FormState {
  birthDate: string;
  birthTime: string;
  timezone: string;
  gender: "female" | "male" | "not-specified";
}

const DEFAULT_INPUT: FormState = {
  birthDate: "1990-01-01",
  birthTime: "12:00",
  timezone: "Local civil time",
  gender: "not-specified",
};

interface BaziCalculatorProps {
  mobileIntro?: ReactNode;
}

function parseInput(state: FormState): BaziChartInput {
  const [year, month, day] = state.birthDate.split("-").map(Number);
  const [hour, minute] = state.birthTime.split(":").map(Number);

  return {
    year,
    month,
    day,
    hour,
    minute,
    timezone: state.timezone,
    gender: state.gender,
  };
}

function buildDefaultChart(): BaziChart {
  return calculateBaziChart(parseInput(DEFAULT_INPUT));
}

export default function BaziCalculator({ mobileIntro }: BaziCalculatorProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_INPUT);
  const [chart, setChart] = useState<BaziChart>(() => buildDefaultChart());
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  function markStarted(): void {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("calculator_started", { tool_name: "bazi" });
  }

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]): void {
    markStarted();
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Fallback: if the user submits defaults without editing, still count as started.
    markStarted();

    try {
      const nextChart = calculateBaziChart(parseInput(form));
      setChart(nextChart);
      setError(null);
      trackEvent("calculator_completed", { tool_name: "bazi" });
    } catch (chartError) {
      setError(chartError instanceof Error ? chartError.message : "Unable to calculate this chart.");
    }
  }

  function resetForm(): void {
    setForm(DEFAULT_INPUT);
    setChart(buildDefaultChart());
    setError(null);
    startedRef.current = false;
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="order-1 rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/5 sm:p-6 lg:order-1"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white dark:bg-gold-400 dark:text-ink-950">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">Birth Details</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">Civil date and local birth time.</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5">
            <label className="block min-w-0">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Birth date</span>
              <input
                type="date"
                min="1900-01-01"
                max="2100-12-31"
                value={form.birthDate}
                onChange={(event) => updateForm("birthDate", event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
                required
              />
            </label>

            <label className="block min-w-0">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Birth time</span>
              <input
                type="time"
                value={form.birthTime}
                onChange={(event) => updateForm("birthTime", event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
                required
              />
            </label>

          </div>

          <details className="mt-5 border-t border-ink-100 pt-4 dark:border-white/10">
            <summary className="cursor-pointer text-sm font-semibold text-brand-primary dark:text-gold-300">
              Optional chart labels
            </summary>
            <div className="mt-4 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-ink-900 dark:text-paper">Birthplace or time zone note</span>
                <input
                  type="text"
                  value={form.timezone}
                  onChange={(event) => updateForm("timezone", event.target.value)}
                  placeholder="Example: New York local time"
                  className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
                />
                <span className="mt-2 block text-xs leading-5 text-ink-500 dark:text-ink-400">
                  Enter local civil time. This note labels the chart and does not convert time zones.
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-900 dark:text-paper">Gender (optional)</span>
                <select
                  value={form.gender}
                  onChange={(event) => updateForm("gender", event.target.value as FormState["gender"])}
                  className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
                >
                  <option value="not-specified">Not specified</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </label>
            </div>
          </details>

          {error ? (
            <p className="mt-5 rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-5 text-sm font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300"
            >
              Calculate chart
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-800 transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:text-ink-200 dark:hover:border-gold-300 dark:hover:text-gold-200"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>

        {mobileIntro ? <div className="order-2 lg:hidden">{mobileIntro}</div> : null}

        <div className="order-3 self-start rounded-lg border border-ink-200 bg-paper-100 p-6 dark:border-white/10 dark:bg-ink-900 lg:order-2">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">What this calculator returns</h2>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-ink-700 dark:text-ink-200 md:grid-cols-2">
            <p>Four Gan-Zhi pillars for year, month, day, and hour from the local civil date-time you enter.</p>
            <p>Day Master, stem and branch metadata, hidden stems, and Ten Gods relative to the Day Master.</p>
            <p>Weighted Five Element balance from visible stems and branch hidden-stem structure.</p>
            <p>Reading cues that stay deterministic and separate calculation from AI interpretation.</p>
          </div>
        </div>
      </section>

      <BaziChartResult chart={chart} />
    </div>
  );
}
