import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Received",
  description: "Confirmation page for a submitted newsletter subscription.",
  alternates: {
    canonical: "/subscribe/success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

interface SubscribeSuccessPageProps {
  searchParams?: Promise<{ delivery?: string }>;
}

export default async function SubscribeSuccessPage({ searchParams }: SubscribeSuccessPageProps) {
  const delivery = (await searchParams)?.delivery;
  const message =
    delivery === "confirmation-sent"
      ? "Check your inbox to confirm the subscription. The confirmation link expires in 7 days."
      : delivery === "active"
        ? "This address is already confirmed and remains on the update list."
        : "Your request has been recorded. Email confirmation is not available until the sending service is configured.";

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-[0.24em] uppercase">
        Newsletter
      </p>
      <h1 className="atlas-page-title mt-5">Subscription received</h1>
      <p className="text-ink-600 dark:text-ink-300 mt-4 text-lg leading-8">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/unsubscribe"
          className="border-ink-200 text-ink-800 dark:text-ink-200 rounded-full border px-5 py-3 text-sm font-semibold dark:border-white/10"
        >
          Unsubscribe
        </Link>
        <Link
          href="/subscribe"
          className="bg-brand-primary rounded-full px-5 py-3 text-sm font-semibold text-white"
        >
          Back to subscribe
        </Link>
      </div>
    </section>
  );
}
