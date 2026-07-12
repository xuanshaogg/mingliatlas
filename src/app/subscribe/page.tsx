import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to the mingliatlas newsletter.",
  alternates: {
    canonical: "/subscribe",
  },
};

interface SubscribePageProps {
  searchParams?: Promise<{ error?: string }>;
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const params = await searchParams;
  const hasValidationError = params?.error === "invalid";
  const isUnavailable = params?.error === "unavailable";
  const isRateLimited = params?.error === "rate_limited";

  return (
    <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
          Newsletter
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
          Subscribe
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
          Get practical explainers on Chinese metaphysics, seasonal cycles, and new free tools.
        </p>

        <form className="mt-10 grid gap-4 rounded-[1.25rem] border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5" action="/api/subscribe" method="post">
          {hasValidationError ? (
            <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
              Please enter a valid email address before subscribing.
            </p>
          ) : null}
          {isUnavailable ? (
            <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
              Your subscription could not be saved. Please try again later.
            </p>
          ) : null}
          {isRateLimited ? (
            <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
              Too many subscription attempts were submitted from this connection. Please wait before trying again.
            </p>
          ) : null}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="subscribe-website">Website</label>
            <input id="subscribe-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="subscribe-email">
            Email address
            <input
              id="subscribe-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper"
            />
          </label>
          <button type="submit" className="inline-flex w-fit rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm leading-6 text-ink-500 dark:text-ink-400">
          We store your email only for site updates. You can <Link href="/unsubscribe" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">unsubscribe at any time</Link>, or return <Link href="/" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">home</Link>.
        </p>
      </div>
    </main>
  );
}
