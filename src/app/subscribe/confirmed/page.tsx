import Link from "next/link";
import type { Metadata } from "next";
import AnalyticsEvent from "@/components/analytics/AnalyticsEvent";

export const metadata: Metadata = {
  title: "Subscription Confirmed",
  description: "Confirm a mingliatlas newsletter subscription.",
  alternates: { canonical: "/subscribe/confirmed" },
  robots: { index: false, follow: false },
};

interface ConfirmedPageProps {
  searchParams?: Promise<{ status?: string }>;
}

export default async function ConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const status = (await searchParams)?.status;
  const confirmed = status === "confirmed" || status === "confirmed-no-email";
  const heading = confirmed ? "Subscription confirmed" : "Confirmation link unavailable";
  const message =
    status === "confirmed"
      ? "You are now subscribed to mingliatlas updates."
      : status === "confirmed-no-email"
        ? "Your subscription is confirmed. The welcome email could not be sent, but future updates remain enabled."
        : "This link is invalid, expired, or the address has already been removed from the list.";

  return (
    <>
      {confirmed ? <AnalyticsEvent eventName="subscribe_confirmed" /> : null}
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-[0.24em] uppercase">
          Newsletter
        </p>
        <h1 className="atlas-page-title mt-5">{heading}</h1>
        <p className="text-ink-600 dark:text-ink-300 mt-4 text-lg leading-8">{message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/unsubscribe"
            className="border-ink-200 text-ink-800 dark:text-ink-200 rounded-full border px-5 py-3 text-sm font-semibold dark:border-white/10"
          >
            Unsubscribe
          </Link>
          <Link
            href="/"
            className="bg-brand-primary rounded-full px-5 py-3 text-sm font-semibold text-white"
          >
            Explore the site
          </Link>
        </div>
      </section>
    </>
  );
}
