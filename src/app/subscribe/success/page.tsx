import Link from "next/link";

export default function SubscribeSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
        Newsletter
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper">
        Subscription received
      </h1>
      <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">
        The newsletter form is connected and now returns a confirmation page.
      </p>
      <Link href="/subscribe" className="mt-8 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">
        Back to subscribe
      </Link>
    </main>
  );
}
