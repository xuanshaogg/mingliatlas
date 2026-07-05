"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Coins, RotateCcw } from "lucide-react";
import ShareCardControls from "@/components/tools/ShareCardControls";
import { castIChingReading, createCoinCast, type IChingReading } from "@/lib/i-ching";
import { trackEvent } from "@/lib/analytics";
import { buildIChingShareParams } from "@/lib/share-card";

function buildReading(question: string): IChingReading {
  return castIChingReading({ question, coins: createCoinCast(Date.now()) });
}

export default function IChingOracle() {
  const [question, setQuestion] = useState("What pattern should I pay attention to?");
  const [reading, setReading] = useState<IChingReading>(() =>
    castIChingReading({ question: "Open reflection", coins: createCoinCast(20260523) }),
  );

  const startedRef = useRef(false);

  const lineText = useMemo(
    () =>
      reading.lines
        .slice()
        .reverse()
        .map((line) => `${line.position}: ${line.isYang ? "yang" : "yin"}${line.changing ? " changing" : ""}`)
        .join(" / "),
    [reading.lines],
  );

  function markStarted(): void {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("calculator_started", { tool: "i-ching" });
  }

  function castReading(): void {
    // Fallback: if the user casts without editing the prompt, still count as started.
    markStarted();
    trackEvent("calculator_completed", { tool: "i-ching" });
    setReading(buildReading(question));
  }

  function resetReading(): void {
    setQuestion("What pattern should I pay attention to?");
    setReading(castIChingReading({ question: "Open reflection", coins: createCoinCast(20260523) }));
    startedRef.current = false;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white dark:bg-gold-400 dark:text-ink-950">
              <Coins className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">Ask a question</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">Six coin lines are generated locally.</p>
            </div>
          </div>

          <label className="mt-6 block">
            <span className="text-sm font-medium text-ink-900 dark:text-paper">Reflection prompt</span>
            <textarea
              value={question}
              onChange={(event) => {
                markStarted();
                setQuestion(event.target.value);
              }}
              className="mt-2 min-h-28 w-full rounded-md border border-ink-200 bg-white px-3 py-3 text-sm text-ink-950 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-ink-950 dark:text-paper"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={castReading}
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-5 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300"
            >
              Cast hexagram
            </button>
            <button
              type="button"
              onClick={resetReading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink-200 px-5 text-sm font-semibold text-ink-800 transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:text-ink-200"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-ink-200 bg-paper-100 p-6 dark:border-white/10 dark:bg-ink-900">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">How to read this result</h2>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-ink-700 dark:text-ink-200 md:grid-cols-2">
            <p>The primary hexagram describes the present pattern around your question.</p>
            <p>Changing lines point to pressure, movement, or the part of the situation most ready to shift.</p>
            <p>The relating hexagram appears only when at least one line changes.</p>
            <p>Use the result for structured reflection, not as a command or fixed forecast.</p>
          </div>
          <div className="mt-5 border-t border-ink-200 pt-5 dark:border-white/10">
            <p className="text-sm font-semibold text-ink-900 dark:text-paper">How to ask a good question</p>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-ink-600 dark:text-ink-300">
              <li>Be specific: "What should I pay attention to in this decision?" not "Will I succeed?"</li>
              <li>Ask once — cast once. Repeated casts for the same question produce confusion, not clarity.</li>
              <li>Focus on your role: "How can I approach this?" rather than "What will the other person do?"</li>
            </ul>
          </div>
        </div>
      </section>

      <ShareCardControls tool="i-ching" params={buildIChingShareParams(reading)} label="i-ching-share-card" />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-gold-300">
            Primary Hexagram
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                {reading.primary.number}. {reading.primary.name}
              </h2>
              <p className="mt-2 font-serif text-5xl text-brand-primary dark:text-gold-300">{reading.primary.chinese}</p>
            </div>
            {reading.relating ? (
              <div className="rounded-lg bg-gold-50 px-4 py-3 text-sm text-gold-900 dark:bg-gold-500/10 dark:text-gold-200">
                <span className="block font-semibold">Relating</span>
                {reading.relating.number}. {reading.relating.name}
              </div>
            ) : null}
          </div>
          <p className="mt-5 text-base leading-8 text-ink-700 dark:text-ink-200">{reading.summary}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Judgment</h3>
              <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-200">{reading.primary.judgment}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Image</h3>
              <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-200">{reading.primary.image}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/i-ching/hexagram-${reading.primary.number}`}
              onClick={() => trackEvent("related_content_clicked", { tool: "i-ching", target: `hexagram-${reading.primary.number}` })}
              className="inline-flex h-9 items-center justify-center rounded-full border border-brand-primary px-4 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white dark:border-gold-400 dark:text-gold-300 dark:hover:bg-gold-400 dark:hover:text-ink-950"
            >
              Read Hexagram {reading.primary.number} in full →
            </Link>
            {reading.relating ? (
              <Link
                href={`/i-ching/hexagram-${reading.relating.number}`}
                onClick={() => { const n = reading.relating?.number; if (n) trackEvent("related_content_clicked", { tool: "i-ching", target: `hexagram-${n}` }); }}
                className="inline-flex h-9 items-center justify-center rounded-full border border-ink-200 px-4 text-sm font-semibold text-ink-700 transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:text-ink-300 dark:hover:border-gold-400 dark:hover:text-gold-300"
              >
                Relating: Hexagram {reading.relating.number} →
              </Link>
            ) : null}
          </div>
        </article>

        <aside className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">Lines</h2>
          <div className="mt-5 space-y-2" aria-label={lineText}>
            {reading.lines
              .slice()
              .reverse()
              .map((line) => (
                <div key={line.position} className="grid grid-cols-[2rem_minmax(0,1fr)_4rem] items-center gap-3">
                  <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">{line.position}</span>
                  <span className="flex h-5 items-center gap-1">
                    {line.isYang ? (
                      <span className="h-1.5 w-full rounded-full bg-ink-950 dark:bg-paper" />
                    ) : (
                      <>
                        <span className="h-1.5 flex-1 rounded-full bg-ink-950 dark:bg-paper" />
                        <span className="h-1.5 flex-1 rounded-full bg-ink-950 dark:bg-paper" />
                      </>
                    )}
                  </span>
                  <span className="text-xs text-ink-500 dark:text-ink-400">{line.changing ? "change" : ""}</span>
                </div>
              ))}
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-ink-700 dark:text-ink-200">
            {reading.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
