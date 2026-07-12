import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Remove an email address from the mingliatlas update list.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: false },
};

interface UnsubscribePageProps {
  searchParams?: Promise<{ status?: string }>;
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const status = (await searchParams)?.status;
  const completed = status === "done";
  const unavailable = status === "unavailable";
  const rateLimited = status === "rate_limited";

  return (
    <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">Newsletter</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">Unsubscribe</h1>
        <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
          Remove an address from the mingliatlas update list. This does not affect access to the knowledge base or tools.
        </p>

        {completed ? (
          <div className="mt-10 border-l-2 border-gold-400 pl-5 text-base leading-7 text-ink-700 dark:text-ink-200" role="status">
            The address has been removed if it was on the list. You can subscribe again at any time.
          </div>
        ) : (
          <form className="mt-10 grid gap-4 rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5" action="/api/subscribe/unsubscribe" method="post">
            {unavailable ? <p role="alert" className="text-sm text-brand-900 dark:text-brand-100">The request could not be completed. Please try again later.</p> : null}
            {rateLimited ? <p role="alert" className="text-sm text-brand-900 dark:text-brand-100">Too many attempts. Please wait before trying again.</p> : null}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="unsubscribe-website">Website</label>
              <input id="unsubscribe-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="unsubscribe-email">
              Email address
              <input id="unsubscribe-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
            </label>
            <button type="submit" className="inline-flex w-fit rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">Remove me</button>
          </form>
        )}

        <p className="mt-6 text-sm leading-6 text-ink-500 dark:text-ink-400">
          Return to the <Link href="/subscribe" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">subscription page</Link> or <Link href="/" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">home</Link>.
        </p>
      </div>
    </main>
  );
}
