import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy covering analytics, cookies, and contact form data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains how the site handles analytics, cookies, and contact submissions."
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
              Analytics may be provided by Vercel Analytics, Speed Insights, Plausible, or GA4 depending on the environment variables configured for the deployment.
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
