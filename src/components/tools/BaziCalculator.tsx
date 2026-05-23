"use client";

import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import BaziChartResult from "@/components/tools/BaziChartResult";
import { calculateBaziChart, type BaziChart, type BaziChartInput } from "@/lib/bazi";

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

export default function BaziCalculator() {
  const [form, setForm] = useState<FormState>(DEFAULT_INPUT);
  const [chart, setChart] = useState<BaziChart>(() => buildDefaultChart());
  const [error, setError] = useState<string | null>(null);

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      const nextChart = calculateBaziChart(parseInput(form));
      setChart(nextChart);
      setError(null);
    } catch (chartError) {
      setError(chartError instanceof Error ? chartError.message : "Unable to calculate this chart.");
    }
  }

  function resetForm(): void {
    setForm(DEFAULT_INPUT);
    setChart(buildDefaultChart());
    setError(null);
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5"
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

          <div className="mt-6 space-y-5">
            <label className="block">
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

            <label className="block">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Birth time</span>
              <input
                type="time"
                value={form.birthTime}
                onChange={(event) => updateForm("birthTime", event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Time zone label</span>
              <input
                type="text"
                value={form.timezone}
                onChange={(event) => updateForm("timezone", event.target.value)}
                placeholder="Example: America/New_York"
                className="mt-2 h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-900 dark:text-paper">Gender for later luck-cycle logic</span>
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

        <div className="rounded-lg border border-ink-200 bg-paper-100 p-6 dark:border-white/10 dark:bg-ink-900">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">What this MVP calculates</h2>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-ink-700 dark:text-ink-200 md:grid-cols-2">
            <p>Four Gan-Zhi pillars for year, month, day, and hour using the existing Chinese calendar module.</p>
            <p>Day Master, stem and branch metadata, hidden stems, and Ten Gods relative to the Day Master.</p>
            <p>Weighted Five Element balance from visible stems and branch hidden-stem structure.</p>
            <p>Basic reading cues that stay deterministic and avoid unsupported AI claims.</p>
          </div>
        </div>
      </section>

      <BaziChartResult chart={chart} />
    </div>
  );
}
