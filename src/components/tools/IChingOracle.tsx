"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, Coins, RotateCcw } from "lucide-react";
import ShareCardControls from "@/components/tools/ShareCardControls";
import { castIChingReading, createCoinCast, type IChingReading } from "@/lib/i-ching";
import { useToolFunnelTracker } from "@/lib/analytics/tool-funnel";
import { trackAnalyticsEvent as trackEvent } from "@/lib/analytics/track";
import { buildIChingShareParams } from "@/lib/share-card-params";

function buildReading(question: string): IChingReading {
  return castIChingReading({ question, coins: createCoinCast(Date.now()) });
}

export default function IChingOracle() {
  const [question, setQuestion] = useState("What pattern should I pay attention to?");
  const [hasCast, setHasCast] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const [reading, setReading] = useState<IChingReading>(() =>
    castIChingReading({ question: "Open reflection", coins: createCoinCast(20260523) })
  );

  const funnel = useToolFunnelTracker("i-ching");

  const lineText = useMemo(
    () =>
      reading.lines
        .slice()
        .reverse()
        .map(
          (line) =>
            `${line.position}: ${line.isYang ? "yang" : "yin"}${line.changing ? " changing" : ""}`
        )
        .join(" / "),
    [reading.lines]
  );

  function markStarted(): void {
    funnel.markStarted();
  }

  function castReading(): void {
    if (!question.trim()) {
      setError("Enter a question or choose a prompt below before casting.");
      questionRef.current?.focus();
      return;
    }
    // Fallback: a default-prompt cast still creates a started session.
    funnel.markCompleted();
    setReading(buildReading(question.trim()));
    setHasCast(true);
    setError("");
    requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function resetReading(): void {
    setHasCast(false);
    setError("");
    setQuestion("What pattern should I pay attention to?");
    setReading(castIChingReading({ question: "Open reflection", coins: createCoinCast(20260523) }));
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[24rem_minmax(0,1fr)]">
        <div id="oracle-input" className="atlas-surface p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="bg-brand-primary dark:bg-gold-400 dark:text-ink-950 flex h-10 w-10 items-center justify-center rounded-full text-white">
              <Coins className="h-5 w-5 shrink-0" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
                Ask a question
              </h2>
              <p className="text-ink-500 dark:text-ink-400 text-sm">
                Six coin lines are generated locally.
              </p>
            </div>
          </div>

          <label className="mt-6 block">
            <span className="text-ink-900 dark:text-paper text-sm font-medium">
              Reflection prompt
            </span>
            <textarea
              ref={questionRef}
              maxLength={500}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "oracle-question-error" : undefined}
              value={question}
              onChange={(event) => {
                markStarted();
                setQuestion(event.target.value);
                setError("");
              }}
              className="atlas-input mt-2 min-h-32 py-3 leading-7"
            />
          </label>

          {error ? (
            <p
              id="oracle-question-error"
              role="alert"
              className="text-brand-primary dark:text-gold-300 mt-2 text-sm"
            >
              {error}
            </p>
          ) : null}
          <div className="mt-3">
            <p className="text-ink-500 text-xs font-medium">Need a starting point?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                {
                  label: "A decision",
                  prompt: "What should I consider before making this decision?",
                },
                {
                  label: "A challenge",
                  prompt: "How can I approach this challenge with more clarity?",
                },
              ].map(({ label, prompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    markStarted();
                    setQuestion(prompt);
                    setError("");
                    questionRef.current?.focus();
                  }}
                  className="border-ink-200 text-ink-600 hover:border-brand-primary hover:text-brand-primary dark:text-ink-300 min-h-10 rounded-lg border px-3 text-xs font-medium transition dark:border-white/15"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={castReading} className="atlas-button-primary flex-1">
              Cast hexagram
            </button>
            <button type="button" onClick={resetReading} className="atlas-button-secondary">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-4 text-xs leading-5">
            Your question stays in this browser and is excluded from share cards.
          </p>
        </div>

        <div className="bg-paper-100 dark:bg-ink-900 rounded-2xl p-6">
          <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
            How to read this result
          </h2>
          <div className="text-ink-700 dark:text-ink-200 mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2">
            <p>The primary hexagram describes the present pattern around your question.</p>
            <p>
              Changing lines point to pressure, movement, or the part of the situation most ready to
              shift.
            </p>
            <p>The relating hexagram appears only when at least one line changes.</p>
            <p>Use the result for structured reflection, not as a command or fixed forecast.</p>
          </div>
          <div className="border-ink-200 mt-5 border-t pt-5 dark:border-white/10">
            <p className="text-ink-900 dark:text-paper text-sm font-semibold">
              How to ask a good question
            </p>
            <ul className="text-ink-600 dark:text-ink-300 mt-3 space-y-1.5 text-sm leading-6">
              <li>
                Be specific: "What should I pay attention to in this decision?" not "Will I
                succeed?"
              </li>
              <li>
                Ask once — cast once. Repeated casts for the same question produce confusion, not
                clarity.
              </li>
              <li>
                Focus on your role: "How can I approach this?" rather than "What will the other
                person do?"
              </li>
            </ul>
          </div>
        </div>
      </section>

      <p role="status" className="sr-only">
        {hasCast ? `Reading ready: ${reading.primary.name}.` : "Showing a sample reading."}
      </p>
      <div
        ref={resultRef}
        role="region"
        tabIndex={-1}
        aria-label={hasCast ? "Your I Ching reading" : "Sample I Ching reading"}
        className="space-y-6 outline-none"
      >
        <div className="border-ink-200 flex flex-wrap items-center justify-between gap-3 border-b pb-4 dark:border-white/10">
          <p className="text-brand-primary dark:text-gold-300 text-xs font-semibold tracking-normal">
            {hasCast ? "Your reading" : "Sample reading · cast to begin"}
          </p>
          <a
            href="#oracle-input"
            onClick={(event) => {
              event.preventDefault();
              questionRef.current?.focus({ preventScroll: true });
              document.getElementById("oracle-input")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
                block: "start",
              });
            }}
            className="atlas-button-secondary"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" /> Edit question
          </a>
        </div>
        {hasCast ? (
          <p className="border-gold-400 text-ink-700 dark:text-ink-200 border-l-2 pl-4 text-base leading-7 break-words">
            {reading.question}
          </p>
        ) : null}
        {hasCast && question.trim() !== reading.question ? (
          <p className="border-gold-300 bg-gold-50 text-gold-900 rounded-xl border p-4 text-sm">
            Your prompt has changed. Cast again to begin a new reading.
          </p>
        ) : null}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <article className="atlas-surface p-5 sm:p-6">
            <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-normal">
              Primary Hexagram
            </p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-ink-950 dark:text-paper text-3xl font-semibold tracking-tight">
                  {reading.primary.number}. {reading.primary.name}
                </h2>
                <p className="text-brand-primary dark:text-gold-300 mt-2 font-serif text-5xl">
                  {reading.primary.chinese}
                </p>
              </div>
              {reading.relating ? (
                <div className="bg-gold-50 text-gold-900 dark:bg-gold-500/10 dark:text-gold-200 rounded-lg px-4 py-3 text-sm">
                  <span className="block font-semibold">Relating</span>
                  {reading.relating.number}. {reading.relating.name}
                </div>
              ) : null}
            </div>
            <p className="text-ink-700 dark:text-ink-200 mt-5 text-base leading-8">
              {reading.summary}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-ink-500 dark:text-ink-400 text-sm font-semibold tracking-normal">
                  Judgment
                </h3>
                <p className="text-ink-700 dark:text-ink-200 mt-2 text-sm leading-6">
                  {reading.primary.judgment}
                </p>
              </div>
              <div>
                <h3 className="text-ink-500 dark:text-ink-400 text-sm font-semibold tracking-normal">
                  Image
                </h3>
                <p className="text-ink-700 dark:text-ink-200 mt-2 text-sm leading-6">
                  {reading.primary.image}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/i-ching/hexagram-${reading.primary.number}`}
                onClick={() =>
                  trackEvent("related_content_clicked", {
                    tool_name: "i-ching",
                    target: `hexagram-${reading.primary.number}`,
                  })
                }
                className="border-brand-primary text-brand-primary hover:bg-brand-primary dark:border-gold-400 dark:text-gold-300 dark:hover:bg-gold-400 dark:hover:text-ink-950 inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition hover:text-white"
              >
                Read Hexagram {reading.primary.number} in full →
              </Link>
              {reading.relating ? (
                <Link
                  href={`/i-ching/hexagram-${reading.relating.number}`}
                  onClick={() => {
                    const n = reading.relating?.number;
                    if (n)
                      trackEvent("related_content_clicked", {
                        tool_name: "i-ching",
                        target: `hexagram-${n}`,
                      });
                  }}
                  className="border-ink-200 text-ink-700 hover:border-brand-primary hover:text-brand-primary dark:text-ink-300 dark:hover:border-gold-400 dark:hover:text-gold-300 inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition dark:border-white/10"
                >
                  Relating: Hexagram {reading.relating.number} →
                </Link>
              ) : null}
            </div>
          </article>

          <aside className="atlas-surface p-6">
            <h2 className="text-ink-950 dark:text-paper text-xl font-semibold tracking-tight">
              Lines
            </h2>
            <div className="mt-5 space-y-2" aria-label={lineText}>
              {reading.lines
                .slice()
                .reverse()
                .map((line) => (
                  <div
                    key={line.position}
                    className="grid grid-cols-[2rem_minmax(0,1fr)_4rem] items-center gap-3"
                  >
                    <span className="text-ink-500 dark:text-ink-400 text-xs font-semibold">
                      {line.position}
                    </span>
                    <span className="flex h-5 items-center gap-1">
                      {line.isYang ? (
                        <span className="bg-ink-950 dark:bg-paper h-1.5 w-full rounded-full" />
                      ) : (
                        <>
                          <span className="bg-ink-950 dark:bg-paper h-1.5 flex-1 rounded-full" />
                          <span className="bg-ink-950 dark:bg-paper h-1.5 flex-1 rounded-full" />
                        </>
                      )}
                    </span>
                    <span className="text-ink-500 dark:text-ink-400 text-xs">
                      {line.changing ? "change" : ""}
                    </span>
                  </div>
                ))}
            </div>
            <ul className="text-ink-700 dark:text-ink-200 mt-6 space-y-3 text-sm leading-6">
              {reading.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </aside>
        </section>
        <ShareCardControls
          tool="i-ching"
          params={buildIChingShareParams(reading)}
          label="i-ching-share-card"
        />
      </div>
    </div>
  );
}
