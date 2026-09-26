"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowUp, Calculator, Clock3, MapPin, RotateCcw, SunMedium } from "lucide-react";
import BaziChartResult from "@/components/tools/BaziChartResult";
import {
  calculateBaziChart,
  type BaziChart,
  type BaziChartInput,
  type BaziTimeBasis,
} from "@/lib/bazi";
import { useToolFunnelTracker } from "@/lib/analytics/tool-funnel";

interface FormState {
  birthDate: string;
  birthTime: string;
  timezone: string;
  gender: "female" | "male" | "not-specified";
  birthplace: string;
  longitude: string;
  timeBasis: BaziTimeBasis;
}

const DEFAULT_INPUT: FormState = {
  birthDate: "1990-01-01",
  birthTime: "12:00",
  timezone: "Local civil time",
  gender: "not-specified",
  birthplace: "",
  longitude: "",
  timeBasis: "civil",
};

interface BaziCalculatorProps {
  mobileIntro?: ReactNode;
}

function parseInput(state: FormState): BaziChartInput {
  const [year, month, day] = state.birthDate.split("-").map(Number);
  const [hour, minute] = state.birthTime.split(":").map(Number);
  const longitude = state.longitude.trim() ? Number(state.longitude) : undefined;

  return {
    year,
    month,
    day,
    hour,
    minute,
    timezone: state.timezone,
    gender: state.gender,
    birthplace: state.birthplace,
    longitude,
    timeBasis: state.timeBasis,
  };
}

function buildDefaultChart(): BaziChart {
  return calculateBaziChart(parseInput(DEFAULT_INPUT));
}

export default function BaziCalculator({ mobileIntro }: BaziCalculatorProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_INPUT);
  const [chart, setChart] = useState<BaziChart>(() => buildDefaultChart());
  const [hasCalculated, setHasCalculated] = useState(false);
  const [calculatedInput, setCalculatedInput] = useState<FormState>(DEFAULT_INPUT);
  const [error, setError] = useState<string | null>(null);
  const funnel = useToolFunnelTracker("bazi");
  const resultRef = useRef<HTMLDivElement>(null);
  const isDirty = JSON.stringify(form) !== JSON.stringify(calculatedInput);

  function markStarted(): void {
    funnel.markStarted();
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
      setCalculatedInput({ ...form });
      setHasCalculated(true);
      setError(null);
      funnel.markCompleted();

      requestAnimationFrame(() => {
        const result = resultRef.current;
        if (!result) return;

        result.focus({ preventScroll: true });
        result.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    } catch (chartError) {
      setError(
        chartError instanceof Error ? chartError.message : "Unable to calculate this chart."
      );
    }
  }

  function resetForm(): void {
    setForm(DEFAULT_INPUT);
    setChart(buildDefaultChart());
    setCalculatedInput(DEFAULT_INPUT);
    setHasCalculated(false);
    setError(null);
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <form
          id="bazi-input"
          onSubmit={handleSubmit}
          className="atlas-surface order-1 p-5 sm:p-6 lg:order-1"
        >
          <div className="flex items-center gap-3">
            <span className="bg-brand-primary dark:bg-gold-400 dark:text-ink-950 flex h-10 w-10 items-center justify-center rounded-full text-white">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
                Birth Details
              </h2>
              <p className="text-ink-500 dark:text-ink-400 mt-1 text-sm">
                Step 1 · Enter your local birth time
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:mt-6 sm:gap-5">
            <label className="block min-w-0">
              <span className="text-ink-900 dark:text-paper text-sm font-medium">Birth date</span>
              <input
                type="date"
                min="1900-01-01"
                max="2100-12-31"
                value={form.birthDate}
                onChange={(event) => updateForm("birthDate", event.target.value)}
                className="atlas-input mt-2 h-12"
                required
              />
            </label>

            <label className="block min-w-0">
              <span className="text-ink-900 dark:text-paper text-sm font-medium">Birth time</span>
              <input
                type="time"
                value={form.birthTime}
                onChange={(event) => updateForm("birthTime", event.target.value)}
                className="atlas-input mt-2 h-12"
                required
              />
            </label>
          </div>

          <details className="border-ink-100 mt-5 border-t pt-4 dark:border-white/10">
            <summary className="text-brand-primary dark:text-gold-300 min-h-11 cursor-pointer py-3 text-sm font-semibold">
              Precision settings
            </summary>
            <div className="mt-4 space-y-5">
              <label className="block">
                <span className="text-ink-900 dark:text-paper flex items-center gap-2 text-sm font-medium">
                  <MapPin
                    className="text-brand-primary dark:text-gold-300 h-4 w-4"
                    aria-hidden="true"
                  />
                  Birthplace note
                </span>
                <input
                  type="text"
                  value={form.birthplace}
                  onChange={(event) => updateForm("birthplace", event.target.value)}
                  placeholder="Example: New York"
                  maxLength={80}
                  className="atlas-input mt-2 h-12"
                />
              </label>

              <label className="block">
                <span className="text-ink-900 dark:text-paper flex items-center gap-2 text-sm font-medium">
                  <Clock3
                    className="text-brand-primary dark:text-gold-300 h-4 w-4"
                    aria-hidden="true"
                  />
                  IANA time zone
                </span>
                <input
                  type="text"
                  list="bazi-time-zones"
                  value={form.timezone}
                  onChange={(event) => updateForm("timezone", event.target.value)}
                  placeholder="Example: America/New_York"
                  maxLength={80}
                  className="atlas-input mt-2 h-12"
                />
                <span className="text-ink-500 dark:text-ink-400 mt-2 block text-xs leading-5">
                  Use an IANA name when applying true solar time. Civil time itself is always read
                  as the local clock time you entered.
                </span>
              </label>

              <div>
                <span className="text-ink-900 dark:text-paper flex items-center gap-2 text-sm font-medium">
                  <SunMedium
                    className="text-brand-primary dark:text-gold-300 h-4 w-4"
                    aria-hidden="true"
                  />
                  Time basis
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Time basis">
                  {(
                    [
                      ["civil", "Civil time"],
                      ["true-solar", "True solar time"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={form.timeBasis === value}
                      onClick={() => updateForm("timeBasis", value)}
                      className={`min-h-11 rounded-full border px-3 text-sm font-semibold transition-colors ${
                        form.timeBasis === value
                          ? "border-brand-primary bg-brand-primary dark:border-gold-400 dark:bg-gold-400 dark:text-ink-950 text-white"
                          : "border-ink-200 text-ink-700 hover:border-brand-primary hover:text-brand-primary dark:text-ink-200 dark:hover:border-gold-300 dark:hover:text-gold-200 dark:border-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs leading-5">
                  Civil time is the default. True solar time uses longitude and the time-zone offset
                  to correct the entered clock time.
                </p>
              </div>

              {form.timeBasis === "true-solar" ? (
                <label className="block">
                  <span className="text-ink-900 dark:text-paper text-sm font-medium">
                    Birthplace longitude
                  </span>
                  <input
                    type="number"
                    min={-180}
                    max={180}
                    step={0.01}
                    value={form.longitude}
                    onChange={(event) => updateForm("longitude", event.target.value)}
                    placeholder="Example: -74.01"
                    className="atlas-input mt-2 h-12"
                    required
                  />
                  <span className="text-ink-500 dark:text-ink-400 mt-2 block text-xs leading-5">
                    East longitudes are positive and west longitudes are negative. The result will
                    show the exact correction applied.
                  </span>
                </label>
              ) : null}

              <label className="block">
                <span className="text-ink-900 dark:text-paper text-sm font-medium">
                  Gender (optional)
                </span>
                <select
                  value={form.gender}
                  onChange={(event) =>
                    updateForm("gender", event.target.value as FormState["gender"])
                  }
                  className="atlas-input mt-2 h-12"
                >
                  <option value="not-specified">Not specified</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </label>
            </div>
          </details>

          <datalist id="bazi-time-zones">
            <option value="Asia/Shanghai" />
            <option value="Asia/Hong_Kong" />
            <option value="Asia/Taipei" />
            <option value="Asia/Tokyo" />
            <option value="Asia/Singapore" />
            <option value="Asia/Kolkata" />
            <option value="Europe/London" />
            <option value="Europe/Paris" />
            <option value="America/New_York" />
            <option value="America/Chicago" />
            <option value="America/Denver" />
            <option value="America/Los_Angeles" />
            <option value="Australia/Sydney" />
            <option value="Pacific/Auckland" />
          </datalist>

          {error ? (
            <p
              role="alert"
              className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 mt-5 rounded-md border px-3 py-2 text-sm"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="atlas-button-primary flex-1">
              {hasCalculated && isDirty ? "Update chart" : "Calculate chart"}
            </button>
            <button type="button" onClick={resetForm} className="atlas-button-secondary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-5">
            Birth details stay in this browser during calculation.
          </p>
        </form>

        {mobileIntro ? <div className="order-2 lg:hidden">{mobileIntro}</div> : null}

        <div className="bg-paper-100 dark:bg-ink-900 order-3 self-start rounded-2xl p-6 lg:order-2">
          <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
            What this calculator returns
          </h2>
          <div className="text-ink-700 dark:text-ink-200 mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2">
            <p>
              Four Gan-Zhi pillars for year, month, day, and hour from the local civil date-time you
              enter.
            </p>
            <p>
              Day Master, stem and branch metadata, hidden stems, and Ten Gods relative to the Day
              Master.
            </p>
            <p>
              Weighted Five Element balance from visible stems and branch hidden-stem structure.
            </p>
            <p>
              Reading cues that stay deterministic and separate calculation from AI interpretation.
            </p>
          </div>
        </div>
      </section>

      <p role="status" className="sr-only">
        {hasCalculated
          ? isDirty
            ? "Birth details changed. Update the chart to use them."
            : "Your chart is ready."
          : "Showing an example chart."}
      </p>
      <div
        ref={resultRef}
        role="region"
        tabIndex={-1}
        aria-label={hasCalculated ? "Your Bazi chart" : "Sample Bazi chart"}
        className="outline-none"
      >
        <div className="mb-4 flex justify-end">
          <a
            href="#bazi-input"
            className="atlas-button-secondary"
            onClick={(event) => {
              event.preventDefault();
              const formElement = document.getElementById("bazi-input");
              formElement
                ?.querySelector<HTMLInputElement>('input[type="date"]')
                ?.focus({ preventScroll: true });
              formElement?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
                block: "start",
              });
            }}
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" /> Edit birth details
          </a>
        </div>
        {hasCalculated && isDirty ? (
          <div className="border-gold-300 bg-gold-50 text-gold-900 mb-5 rounded-xl border p-4 text-sm">
            <p>Birth details changed. This chart still shows your previous calculation.</p>
          </div>
        ) : null}
        <BaziChartResult chart={chart} isSample={!hasCalculated} />
      </div>
    </div>
  );
}
