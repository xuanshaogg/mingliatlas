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
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold tracking-[0.24em] uppercase">
        Contact
      </p>
      <h1 className="atlas-page-title mt-5">Message received</h1>
      <p className="text-ink-600 dark:text-ink-300 mt-4 text-lg leading-8">
        Thanks for reaching out. Your message has been saved for editorial review.
      </p>
      <Link
        href="/contact"
        className="bg-brand-primary mt-8 rounded-full px-5 py-3 text-sm font-semibold text-white"
      >
        Back to contact
      </Link>
    </section>
  );
}
