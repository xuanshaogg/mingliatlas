import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Mingli Atlas",
  description:
    "Get in touch with the Mingli Atlas team for content corrections, partnership inquiries, feedback on the free tools, or general support questions.",
  path: "/contact",
});

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
            <form className="atlas-surface grid gap-4 p-5" action="/api/contact" method="post">
              {hasValidationError ? (
                <p
                  role="alert"
                  className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
                >
                  Please enter your name, a valid email address, and a message before sending.
                </p>
              ) : null}
              {isUnavailable ? (
                <p
                  role="alert"
                  className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
                >
                  Your message could not be saved. Please try again later.
                </p>
              ) : null}
              {isRateLimited ? (
                <p
                  role="alert"
                  className="border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100 rounded-lg border px-4 py-3 text-sm leading-6"
                >
                  Too many messages were submitted from this connection. Please wait before trying
                  again.
                </p>
              ) : null}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label
                className="text-ink-900 dark:text-paper grid gap-2 text-sm font-medium"
                htmlFor="contact-name"
              >
                Name
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Your name"
                  className="atlas-input min-h-12 py-3"
                />
              </label>
              <label
                className="text-ink-900 dark:text-paper grid gap-2 text-sm font-medium"
                htmlFor="contact-email"
              >
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  className="atlas-input min-h-12 py-3"
                />
              </label>
              <label
                className="text-ink-900 dark:text-paper grid gap-2 text-sm font-medium"
                htmlFor="contact-message"
              >
                Message
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  maxLength={5000}
                  placeholder="Message"
                  className="atlas-input min-h-12 py-3"
                />
              </label>
              <button type="submit" className="atlas-button-primary w-fit">
                Send message
              </button>
            </form>
          ),
        },
        {
          heading: "Response time",
          content: (
            <p>
              Messages are reviewed as editorial capacity allows. For content corrections, include
              the page URL, the exact claim, and a verifiable source so the issue can be assessed
              efficiently.
            </p>
          ),
        },
      ]}
    />
  );
}
