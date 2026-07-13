import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy covering analytics, contact messages, subscriptions, and technical logs.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: true,
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
          heading: "Cookies and analytics",
          content: (
            <p>
              The site currently uses Vercel Analytics, Speed Insights, and Google Analytics 4 to measure performance and understand aggregate usage. These services may process device, referral, and interaction data and may use cookies or similar browser storage. You can restrict analytics through browser privacy controls or supported consent settings.
            </p>
          ),
        },
        {
          heading: "Contact messages and subscriptions",
          content: (
            <>
              <p>
                Contact messages are stored so the editorial team can review and respond to the request. When configured, a transactional email provider sends a notification to the editorial inbox and uses the submitted address only as a reply-to address. Newsletter email addresses are stored to provide site updates; subscriptions use a signed confirmation link and signed unsubscribe links. We retain these records only while they are operationally useful or legally required.
              </p>
              <p className="mt-4">
                The site does not currently display personalized advertising. If advertising is introduced, this policy and any required consent controls will be updated before that data processing begins.
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
          heading: "Children&apos;s privacy",
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
      ]}
    />
  );
}
