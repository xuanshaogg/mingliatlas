import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact mingliatlas for content corrections, partnerships, or support.",
  alternates: {
    canonical: "/contact",
  },
};

interface ContactPageProps {
  searchParams?: Promise<{ error?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const hasValidationError = params?.error === "invalid";
  const isUnavailable = params?.error === "unavailable";
  const isRateLimited = params?.error === "rate_limited";

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
              {hasValidationError ? (
                <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
                  Please enter your name, a valid email address, and a message before sending.
                </p>
              ) : null}
              {isUnavailable ? (
                <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
                  Your message could not be saved. Please try again later.
                </p>
              ) : null}
              {isRateLimited ? (
                <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100">
                  Too many messages were submitted from this connection. Please wait before trying again.
                </p>
              ) : null}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-name">
                Name
                <input id="contact-name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-email">
                Email
                <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="Email address" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink-900 dark:text-paper" htmlFor="contact-message">
                Message
                <textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={5000} placeholder="Message" className="rounded-md border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-ink-900 dark:text-paper" />
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
              Messages are reviewed as editorial capacity allows. For content corrections, include the page URL, the exact claim, and a verifiable source so the issue can be assessed efficiently.
            </p>
          ),
        },
      ]}
    />
  );
}
