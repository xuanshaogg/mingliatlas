import type { Metadata } from "next";
import StaticPage from "@/components/templates/StaticPage";
import { JsonLd } from "@/lib/seo/jsonLd";
import { AUTHOR, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About mingliatlas, its editorial mission, content standards, and the team behind the site.",
  alternates: {
    canonical: "/about",
  },
};

const editorialTeamSchema = {
  "@context": "https://schema.org" as const,
  "@type": "Organization" as const,
  name: AUTHOR.name,
  url: AUTHOR.url,
  description: AUTHOR.description,
  foundingDate: AUTHOR.foundingDate,
  knowsAbout: AUTHOR.knowsAbout,
  parentOrganization: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
  citation: AUTHOR.sources.map((entry) => ({
    "@type": "CreativeWork",
    name: entry.label,
    description: entry.note,
  })),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={editorialTeamSchema} />
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
              <>
                <p>
                  Chinese metaphysics — Bazi (Four Pillars of Destiny), I Ching (Book of Changes), Feng Shui,
                  Ziwei Doushu (Purple Star Astrology), and the Chinese Zodiac — is a set of structured
                  analytical systems that has guided decision-making in East Asia for over two thousand years.
                  Yet for most Western readers, access to these systems has been filtered through either
                  over-simplified pop astrology or dense academic translations aimed at specialists.
                </p>
                <p>
                  mingliatlas exists to close that gap. Our mission is to explain each system faithfully —
                  preserving its internal logic and classical terminology — while writing in plain, modern
                  English that a curious reader can follow without prior background. We do not flatten these
                  traditions into fortune-telling language, and we do not invent meanings that the classical
                  texts do not support.
                </p>
              </>
            ),
          },
          {
            heading: "What we cover",
            content: (
              <>
                <p>
                  The site is organized around five pillars:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>
                    <strong>Bazi (四柱命理)</strong> — the Four Pillars system built from birth date and time,
                    covering Day Masters, Heavenly Stems, Earthly Branches, Ten Gods, and the Five Elements
                    (Wu Xing 五行).
                  </li>
                  <li>
                    <strong>I Ching (易经)</strong> — the Book of Changes, including all 64 hexagrams, their
                    line statements, and practical guidance on how to consult the oracle.
                  </li>
                  <li>
                    <strong>Chinese Zodiac (生肖)</strong> — the twelve animal signs with compatibility
                    analysis grounded in the Liu He (六合), San He (三合), and Liu Chong (六冲) relationships.
                  </li>
                  <li>
                    <strong>Feng Shui (风水)</strong> — spatial harmony principles for homes and workspaces,
                    explained through directional theory and Five Elements logic.
                  </li>
                  <li>
                    <strong>Ziwei Doushu (紫微斗数)</strong> — Purple Star Astrology, a chart-based system
                    distinct from Bazi that maps life sectors onto a twelve-palace grid.
                  </li>
                </ul>
                <p className="mt-4">
                  Each section includes both reference knowledge pages and free interactive tools such as
                  the Bazi calculator and I Ching oracle.
                </p>
              </>
            ),
          },
          {
            heading: "Editorial process",
            content: (
              <>
                <p>
                  Every page on mingliatlas is written by researchers who work directly from classical
                  source texts — including the <em>Yuan Hai Zi Ping</em> (渊海子平), the <em>San Ming Tong Hui</em> (三命通会),
                  the Wilhelm/Baynes translation of the I Ching, and peer-reviewed sinology journals — and
                  cross-referenced against contemporary practitioners such as Joey Yap and Alfred Huang.
                </p>
                <p>
                  Our editorial standards:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Claims are tied to a named classical source or a verifiable practitioner consensus.</li>
                  <li>Chinese terms are given with hanzi, pinyin, and an English gloss on first use.</li>
                  <li>Numerical claims (e.g. stem–branch cycle lengths, hexagram counts) are stated precisely.</li>
                  <li>Pages carry a published date and are reviewed for accuracy when new scholarship emerges.</li>
                </ul>
              </>
            ),
          },
          {
            heading: "Source policy",
            content: (
              <>
                <p>
                  We separate source types so readers can see where a claim comes from. Classical source notes
                  explain inherited concepts, modern practitioner sources explain contemporary usage, and academic
                  or historical references help with context. Editorial notes explain how mingliatlas applies those
                  sources for beginner-friendly education.
                </p>
                <p>
                  A strong knowledge page should not rely on a single generic tradition label. When a page covers a
                  core entity such as Bazi, Wu Xing, I Ching, Feng Shui, Ziwei Doushu, or the Chinese Zodiac, we aim
                  to include named sources and clear boundaries around interpretation.
                </p>
              </>
            ),
          },
          {
            heading: "Review workflow",
            content: (
              <>
                <p>
                  New and revised pages are reviewed against four checks before publication: factual consistency,
                  terminology consistency, source quality, and reader safety. We check that Chinese terms are used
                  consistently across the site, that claims match the stated source layer, and that practical advice
                  stays within education and self-reflection.
                </p>
                <p>
                  We also run technical quality checks for canonical URLs, structured data, sitemap inclusion,
                  internal links, and AI-readable discovery files such as <code>llms.txt</code> and{" "}
                  <code>llms-full.txt</code>.
                </p>
              </>
            ),
          },
          {
            heading: "Content update policy",
            content: (
              <p>
                Knowledge pages are reviewed on a rolling basis. When classical scholarship, new
                practitioner consensus, or reader corrections indicate that a page needs revision, we
                update it and refresh the <code>dateModified</code> timestamp in the page metadata.
                If you believe a factual error exists on any page, please use the{" "}
                <a href="/contact" className="font-medium underline">contact form</a> to reach us with
                the specific claim and the source you believe is more accurate. We respond to all
                substantive corrections within seven business days.
              </p>
            ),
          },
          {
            heading: "Disclaimer",
            content: (
              <p>
                Content on mingliatlas is provided for educational, entertainment, and self-reflection
                purposes only. The interpretations and frameworks described represent classical Chinese
                metaphysical traditions and do not constitute professional medical, psychological, legal,
                or financial advice. Readers are encouraged to consult qualified professionals for
                decisions in those domains. The site does not claim that any metaphysical system can
                predict the future with certainty.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
