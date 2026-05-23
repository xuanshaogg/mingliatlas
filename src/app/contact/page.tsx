import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Eastern Blueprint for content corrections, partnerships, or support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="Contact"
      description="Send a message for content corrections, partnership inquiries, or general support."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact" },
      ]}
      sections={[
        {
          heading: "Contact form",
          content: (
            <form className="grid gap-4 rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/5" action="/api/contact" method="post">
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-name">
                Name
                <input id="contact-name" name="name" placeholder="Your name" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-email">
                Email
                <input id="contact-email" name="email" type="email" placeholder="Email address" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-message">
                Message
                <textarea id="contact-message" name="message" rows={6} placeholder="Message" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
              </label>
              <button type="submit" className="inline-flex w-fit rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Send message
              </button>
            </form>
          ),
        },
        {
          heading: "Response time",
          content: (
            <p>
              We usually respond within 2-3 business days. For urgent content corrections, include the page URL and the issue in the first sentence.
            </p>
          ),
        },
      ]}
    />
  );
}
