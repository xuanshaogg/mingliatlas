import { isPreviewDeployment } from "@/lib/seo/environment";
import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/templates/StaticPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using Mingli Atlas: the educational and entertainment scope of the content, limits of the calculators, content rights, and liability.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
    follow: !isPreviewDeployment,
  },
};

const linkClass = "underline";

export default function TermsPage() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Terms of Service"
      description="These terms apply to anyone who reads the guides or uses the tools on mingliatlas.com. By using the site you accept them."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms", href: "/terms" },
      ]}
      sections={[
        {
          id: "disclaimer",
          heading: "Disclaimer: educational and entertainment use",
          content: (
            <>
              <p>
                Mingli Atlas explains Chinese metaphysical traditions (Bazi, Ziwei Doushu, the I Ching, Feng Shui, and the Chinese zodiac) as cultural and interpretive systems. The guides, readings, and tool results are for education, entertainment, and self-reflection.
              </p>
              <p className="mt-4">
                Nothing on the site is medical, psychological, legal, financial, or investment advice, and none of it predicts specific events. Do not use a reading to delay or replace advice from a qualified professional, or as the only basis for decisions about health, money, relationships, or employment.
              </p>
            </>
          ),
        },
        {
          heading: "Calculators and tool results",
          content: (
            <p>
              The calculators follow the conventions stated on each tool page (for example, Li Chun as the Bazi year boundary and China Standard Time for solar terms). Other schools and software use different conventions, so results can differ. Results depend on the date, time, and place you enter. We check the calculations against published calendar tables, but we do not guarantee that every result is free of error.
            </p>
          ),
        },
        {
          heading: "Age and responsibility",
          content: (
            <p>
              The site is intended for adults. Users under 18 should use it with the guidance of a parent or guardian. You are responsible for how you interpret and act on the information.
            </p>
          ),
        },
        {
          heading: "Acceptable use",
          content: (
            <ul className="list-disc space-y-1 pl-5">
              <li>Do not submit unlawful, abusive, or misleading content through the contact or subscription forms.</li>
              <li>Do not attempt to disrupt the site, probe it for vulnerabilities, or bypass rate limits.</li>
              <li>Do not scrape or republish the content at a scale that substitutes for the site, or present it as your own.</li>
            </ul>
          ),
        },
        {
          heading: "Content rights",
          content: (
            <p>
              The site&rsquo;s text, tables, illustrations, and code are protected by copyright. You may quote short passages with a link to the source page. Classical texts quoted on the site, such as the I Ching, are in the public domain; our translations, summaries, and commentary are not. Drafts may be prepared with AI assistance and are edited before publication, as described in the{" "}
              <Link href="/about#editorial-standards" className={linkClass}>
                editorial standards
              </Link>
              .
            </p>
          ),
        },
        {
          heading: "External links",
          content: (
            <p>
              Pages link to outside sources such as calendar references and classical texts. We do not control those sites and are not responsible for their content or privacy practices.
            </p>
          ),
        },
        {
          heading: "No warranty and limitation of liability",
          content: (
            <p>
              The site and its tools are provided &ldquo;as is&rdquo; without warranties of any kind. To the extent the law allows, Mingli Atlas is not liable for any loss or damage arising from use of, or reliance on, the content or tool results. Some jurisdictions do not allow these limits, in which case they apply only as far as permitted.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          content: (
            <p>
              We may update these terms when the site changes; the date below shows the latest version. Questions about these terms can be sent through the{" "}
              <Link href="/contact" className={linkClass}>
                contact page
              </Link>
              . Last updated: October 20, 2026.
            </p>
          ),
        },
      ]}
    />
  );
}
