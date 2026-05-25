import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy covering analytics, cookies, advertising, and contact form data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains how the site handles analytics, cookies, advertising, and contact submissions."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy", href: "/privacy" },
      ]}
      sections={[
        {
          heading: "Data we collect",
          content: (
            <p>
              We may collect basic analytics, contact form submissions, and technical logs needed to keep the site secure and functional. We do not intentionally collect sensitive personal data.
            </p>
          ),
        },
        {
          heading: "Cookies and analytics",
          content: (
            <p>
              Analytics may be provided by Vercel Analytics, Speed Insights, Plausible, or GA4 depending on the environment variables configured for the deployment. We use cookies to measure site performance and understand how visitors use our content. You may disable cookies in your browser settings at any time; however, some site features may not function correctly without them.
            </p>
          ),
        },
        {
          heading: "Advertising",
          content: (
            <>
              <p>
                We use Google AdSense to display advertisements on this site. Google AdSense uses cookies and similar tracking technologies to serve ads that are relevant to your interests based on your browsing activity across websites that use Google services.
              </p>
              <p className="mt-4">
                Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet. You may opt out of personalised advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google Ads Settings
                </a>{" "}
                or by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  www.aboutads.info
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: "Third-party services",
          content: (
            <>
              <p>
                This site may use the following third-party services, each of which may collect data under their own privacy policies:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <strong>Google AdSense</strong> — advertising delivery and measurement (
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Google Privacy Policy</a>
                  )
                </li>
                <li>
                  <strong>Google Analytics / GA4</strong> — aggregated site traffic analysis
                </li>
                <li>
                  <strong>Vercel Analytics</strong> — page performance and visit counts
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
