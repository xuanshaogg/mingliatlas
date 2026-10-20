import { isPreviewDeployment } from "@/lib/seo/environment";
import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mingli Atlas handles analytics cookies, contact messages, newsletter subscriptions, and technical logs.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: !isPreviewDeployment,
  },
};

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains how the site handles analytics, contact submissions, newsletter subscriptions, and technical logs."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy", href: "/privacy" },
      ]}
      sections={[
        {
          heading: "Data we collect",
          content: (
            <p>
              We collect basic usage analytics, contact messages that you choose to submit, newsletter email addresses, and technical logs needed to keep the site secure and functional. We do not intentionally collect birth details through the contact or subscription forms, and the Bazi calculator runs in the browser without storing birth data.
            </p>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies and analytics",
          content: (
            <>
              <p>
                The site uses three measurement services: Google Analytics 4 (GA4), Vercel Web Analytics, and Vercel Speed Insights. They process device type, browser, approximate location derived from the IP address, referring page, and the pages and interactions on this site, and report them to us in aggregate.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <strong>Google Analytics 4</strong> sets first-party cookies (typically named <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>) to distinguish returning browsers. Google describes these cookies and their lifetimes in its own documentation.
                </li>
                <li>
                  <strong>Vercel Web Analytics and Speed Insights</strong> measure page views and loading performance. Vercel states that Web Analytics does not use cookies.
                </li>
                <li>
                  <strong>Session storage:</strong> the interactive tools keep a small record of tool progress in your browser&rsquo;s session storage so that funnel events are not counted twice. It is cleared when the tab closes and is not sent to us as a separate record.
                </li>
              </ul>
              <p className="mt-4">
                The site does not currently show a cookie consent banner. You can block or delete cookies in your browser settings, use a content blocker, or install Google&rsquo;s Analytics opt-out browser add-on. Blocking analytics does not affect the guides or tools.
              </p>
            </>
          ),
        },
        {
          heading: "Contact messages and subscriptions",
          content: (
            <>
              <p>
                Contact messages are stored so the editorial team can review and respond to the request. When configured, a transactional email provider sends a notification to the editorial inbox and uses the submitted address only as a reply-to address. Newsletter email addresses are stored to provide site updates; subscriptions use a signed confirmation link and signed unsubscribe links. We keep these records only while they are needed to answer a request or send the updates you asked for, or where the law requires us to keep them. You can unsubscribe at any time from the link in any newsletter email, or ask us to delete a contact message through the contact page.
              </p>
              <p className="mt-4">
                <strong>Advertising.</strong> The site does not currently display advertising. If ads are introduced (for example through Google AdSense), third-party vendors including Google may use cookies to serve ads based on prior visits to this and other websites. This policy will be updated, and any consent controls required in your region will be added, before ad serving begins.
              </p>
            </>
          ),
        },
        {
          heading: "Third-party services",
          content: (
            <>
              <p>
                The current deployment uses the following infrastructure and analytics providers, each operating under its own privacy terms:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <strong>Google Analytics / GA4</strong> — aggregate site traffic and interaction analysis
                </li>
                <li>
                  <strong>Vercel</strong> — hosting, page performance, and aggregate visit counts
                </li>
                <li>
                  <strong>Supabase</strong> — database infrastructure for contact messages and subscriptions
                </li>
                <li>
                  <strong>Resend</strong> — transactional subscription confirmations, welcome emails, contact notifications, and delivery events when email delivery is enabled
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal data to any third party. Third-party vendors on this site are bound by their own privacy policies and applicable law.
              </p>
            </>
          ),
        },
        {
          heading: "Children’s privacy",
          content: (
            <p>
              This site is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us via the{" "}
              <a href="/contact" className="underline">contact page</a> and we will promptly delete it.
            </p>
          ),
        },
        {
          heading: "Your rights",
          content: (
            <p>
              If you are in a region covered by GDPR or CCPA, you may request access, correction, deletion, or restriction where applicable. Use the contact page to reach us.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          content: (
            <p>
              When the services listed here change, this page is updated before the new processing starts. Last updated: October 20, 2026.
            </p>
          ),
        },
      ]}
    />
  );
}
