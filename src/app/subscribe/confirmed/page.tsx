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
  const message = status === "confirmed"
    ? "You are now subscribed to mingliatlas updates."
    : status === "confirmed-no-email"
      ? "Your subscription is confirmed. The welcome email could not be sent, but future updates remain enabled."
      : "This link is invalid, expired, or the address has already been removed from the list.";

  return (
    <>
      {confirmed ? <AnalyticsEvent eventName="subscribe_confirmed" /> : null}
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">Newsletter</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper">{heading}</h1>
      <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/unsubscribe" className="rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 dark:border-white/10 dark:text-ink-200">Unsubscribe</Link>
        <Link href="/" className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Explore the site</Link>
      </div>
      </main>
    </>
  );
}
