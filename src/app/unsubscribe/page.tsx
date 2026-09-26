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
    <section className="bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="atlas-eyebrow">Newsletter</p>
        <h1 className="atlas-page-title mt-5">Unsubscribe</h1>
        <p className="atlas-page-intro mt-5">
          Remove an address from the mingliatlas update list. This does not affect access to the
          knowledge base or tools.
        </p>

        {completed ? (
          <div
            className="border-gold-400 text-ink-700 dark:text-ink-200 mt-10 border-l-2 pl-5 text-base leading-7"
            role="status"
          >
            The address has been removed if it was on the list. You can subscribe again at any time.
          </div>
        ) : (
          <form
            className="atlas-surface mt-10 grid gap-4 p-6"
            action="/api/subscribe/unsubscribe"
            method="post"
          >
            {unavailable ? (
              <p role="alert" className="text-brand-900 dark:text-brand-100 text-sm">
                The request could not be completed. Please try again later.
              </p>
            ) : null}
            {rateLimited ? (
              <p role="alert" className="text-brand-900 dark:text-brand-100 text-sm">
                Too many attempts. Please wait before trying again.
              </p>
            ) : null}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="unsubscribe-website">Website</label>
              <input
                id="unsubscribe-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <label
              className="text-ink-900 dark:text-paper grid gap-2 text-sm font-medium"
              htmlFor="unsubscribe-email"
            >
              Email address
              <input
                id="unsubscribe-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="atlas-input min-h-12 py-3"
              />
            </label>
            <button type="submit" className="atlas-button-primary w-fit">
              Remove me
            </button>
          </form>
        )}

        <p className="text-ink-500 dark:text-ink-400 mt-6 text-sm leading-6">
          Return to the{" "}
          <Link
            href="/subscribe"
            className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
          >
            subscription page
          </Link>{" "}
          or{" "}
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
