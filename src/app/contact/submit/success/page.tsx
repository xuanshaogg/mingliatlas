import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message Received",
  description: "Confirmation page for a submitted contact message.",
  alternates: {
    canonical: "/contact/submit/success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">Contact</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper">Message received</h1>
      <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">
        Thanks for reaching out. The contact endpoint is live and now returns a confirmation page after submission.
      </p>
      <Link href="/contact" className="mt-8 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">
        Back to contact
      </Link>
    </main>
  );
}
