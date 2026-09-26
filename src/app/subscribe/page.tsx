import type { Metadata } from "next";
import Link from "next/link";
import TrackedForm from "@/components/analytics/TrackedForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to the mingliatlas newsletter.",
  alternates: {
    canonical: "/subscribe",
  },
  robots: {
    index: false,
    follow: true,
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
    <section className="bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="atlas-eyebrow">Newsletter</p>
        <h1 className="atlas-page-title mt-5">Subscribe</h1>
        <p className="atlas-page-intro mt-5">
          Get practical explainers on Chinese metaphysics, seasonal cycles, and new free tools.
        </p>

        <TrackedForm
          className="atlas-surface mt-10 grid gap-4 p-6"
          action="/api/subscribe"
          method="post"
          eventName="subscribe_requested"
          properties={{ source: "subscribe_page" }}
        >
          <input type="hidden" name="source" value="subscribe_page" />
          {hasValidationError ? (
            <p
              role="alert"
              className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
            >
              Please enter a valid email address before subscribing.
            </p>
          ) : null}
          {isUnavailable ? (
            <p
              role="alert"
              className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
            >
              Your subscription could not be saved. Please try again later.
            </p>
          ) : null}
          {isRateLimited ? (
            <p
              role="alert"
              className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
            >
              Too many subscription attempts were submitted from this connection. Please wait before
              trying again.
            </p>
          ) : null}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="subscribe-website">Website</label>
            <input
              id="subscribe-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label
            className="text-ink-900 dark:text-paper grid gap-2 text-sm font-medium"
            htmlFor="subscribe-email"
          >
            Email address
            <input
              id="subscribe-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="atlas-input min-h-12 py-3"
            />
          </label>
          <button type="submit" className="atlas-button-primary w-fit">
            Subscribe
          </button>
        </TrackedForm>

        <p className="text-ink-500 dark:text-ink-400 mt-6 text-sm leading-6">
          We store your email only for site updates. You can{" "}
          <Link
            href="/unsubscribe"
            className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
          >
            unsubscribe at any time
          </Link>
          , or return{" "}
          <Link
            href="/"
            className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
          >
            home
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
