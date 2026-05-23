import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to the Eastern Blueprint newsletter.",
  alternates: {
    canonical: "/subscribe",
  },
};

export default function SubscribePage() {
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
          <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="subscribe-email">
            Email address
            <input
              id="subscribe-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper"
            />
          </label>
          <button type="submit" className="inline-flex w-fit rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm leading-6 text-ink-500 dark:text-ink-400">
          Already subscribed? Use the rest of the site to explore the knowledge base, or return <Link href="/" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">home</Link>.
        </p>
      </div>
    </main>
  );
}
