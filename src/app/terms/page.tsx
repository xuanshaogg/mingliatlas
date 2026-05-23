import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service, entertainment disclaimer, and content usage policy.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms of Service"
      description="By using this site, you agree to the entertainment-only scope of the content and the terms below."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms", href: "/terms" },
      ]}
      sections={[
        {
          heading: "Entertainment disclaimer",
          content: (
            <p>
              The content on this site is provided for entertainment and self-reflection purposes only. It is not medical, legal, financial, or mental health advice.
            </p>
          ),
        },
        {
          heading: "Age and responsibility",
          content: (
            <p>
              Users should be 18 or older, or use the site with the guidance of a responsible adult. You are responsible for how you interpret and use the information.
            </p>
          ),
        },
        {
          heading: "Content rights",
          content: (
            <p>
              Site text, structure, and original assets are protected content. AI-assisted drafts may be edited before publication, and final interpretations remain educational in scope.
            </p>
          ),
        },
      ]}
    />
  );
}
