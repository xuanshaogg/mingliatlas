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
  const message = delivery === "confirmation-sent"
    ? "Check your inbox to confirm the subscription. The confirmation link expires in 7 days."
    : delivery === "active"
      ? "This address is already confirmed and remains on the update list."
      : "Your request has been recorded. Email confirmation is not available until the sending service is configured.";

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
        Newsletter
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper">
        Subscription received
      </h1>
      <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">
        {message}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/unsubscribe" className="rounded-full border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 dark:border-white/10 dark:text-ink-200">Unsubscribe</Link>
        <Link href="/subscribe" className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Back to subscribe</Link>
      </div>
    </main>
  );
}
