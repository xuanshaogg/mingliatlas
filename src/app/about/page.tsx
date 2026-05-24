import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "About",
  description: "About mingliatlas, its editorial mission, and content standards.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="Company"
      title="About mingliatlas"
      description="mingliatlas is built to make Chinese metaphysics understandable to Western readers through clear explanations, structured guides, and practical tools."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]}
      sections={[
        {
          heading: "Mission",
          content: (
            <p>
              Making Chinese metaphysics accessible to the Western world means translating the system faithfully, not flattening it into fortune-telling language. The site focuses on Bazi, Chinese zodiac, I Ching, Feng Shui, and related learning paths.
            </p>
          ),
        },
        {
          heading: "Editorial approach",
          content: (
            <p>
              Every page is written for education and self-reflection. Where possible, we use direct answers, concrete numbers, and consistent terminology so readers can compare concepts without confusion.
            </p>
          ),
        },
        {
          heading: "Disclaimer",
          content: (
            <p>
              Content is provided for entertainment and self-reflection purposes only. It does not replace professional medical, legal, financial, or mental health advice.
            </p>
          ),
        },
      ]}
    />
  );
}
