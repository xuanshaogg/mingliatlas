import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import DirectAnswer from "@/components/shared/DirectAnswer";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import RelatedLinks from "@/components/shared/RelatedLinks";
import IChingOracle from "@/components/tools/IChingOracle";
import { SITE } from "@/lib/constants";
import {
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  buildHowToSchema,
  buildWebApplicationSchema,
  JsonLd,
} from "@/lib/seo/jsonLd";
import { buildShareCardUrl } from "@/lib/share-card";

const shareCardImage = buildShareCardUrl({
  baseUrl: SITE.url,
  tool: "i-ching",
  params: {
    hex: 1,
  },
});

export const metadata: Metadata = {
  title: "Free I Ching Oracle",
  description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
  alternates: {
    canonical: "/tools/i-ching-oracle",
  },
  openGraph: {
    title: "Free I Ching Oracle",
    description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
    url: "/tools/i-ching-oracle",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free I Ching Oracle",
    description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
    images: [shareCardImage],
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "I Ching Oracle", href: "/tools/i-ching-oracle" },
];

const softwareSchema = buildWebApplicationSchema({
  name: "Free I Ching Oracle",
  url: `${SITE.url}/tools/i-ching-oracle`,
  description: "A browser-based I Ching oracle for six-line hexagram casting and reflective interpretation.",
  featureList: ["six-line casting", "changing lines", "primary hexagram", "relating hexagram"],
});

const iChingOracleFaqs: FAQ[] = [
  {
    question: "What does the I Ching oracle do?",
    answer:
      "It casts six lines, identifies the primary hexagram, marks changing lines, and shows a relating hexagram when the cast changes.",
  },
  {
    question: "What kind of question should I ask?",
    answer:
      "Ask a clear reflection question about a situation, choice, or timing issue. The I Ching works best when the question is specific and open-ended.",
  },
  {
    question: "Is the oracle a prediction tool?",
    answer:
      "No. Use the result as symbolic guidance for reflection, not as a guaranteed forecast or substitute for professional advice.",
  },
  {
    question: "Does the oracle save my question?",
    answer:
      "No. The oracle workflow is browser-based and does not save your question to a user profile.",
  },
];

const iChingHowToSchema = buildHowToSchema({
  name: "How to use the free I Ching oracle",
  description: "Ask a clear question, cast six lines, review the primary hexagram, and compare changing lines.",
  url: `${SITE.url}/tools/i-ching-oracle`,
  steps: [
    "Write or hold one clear question about a current situation.",
    "Cast the oracle to generate six yin or yang lines.",
    "Read the primary hexagram and any changing lines.",
    "Compare the relating hexagram when change is present and turn the result into a practical reflection.",
  ],
});

const relatedLinks = [
  { title: "What Is the I Ching?", href: "/i-ching/what-is-i-ching", description: "Learn the Book of Changes before casting." },
  { title: "Changing Lines", href: "/i-ching/changing-lines", description: "Understand how moving lines shape a reading." },
  { title: "64 Hexagrams", href: "/i-ching/sixty-four-hexagrams", description: "Browse the full hexagram structure." },
];

export default function IChingOraclePage() {
  return (
    <>
      <JsonLd
        data={[
          softwareSchema,
          iChingHowToSchema,
          buildFAQPageSchema(iChingOracleFaqs),
          buildBreadcrumbListSchema(breadcrumbs),
        ]}
      />
      <main className="atlas-tool-shell bg-paper px-4 py-10 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbs} />
          <header className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
              Tools
            </p>
            <h1 className="mt-4 text-balance font-display text-5xl tracking-tight text-ink-950 dark:text-paper sm:text-6xl">
              Free I Ching Oracle
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Cast a six-line hexagram locally in your browser. The result shows the primary hexagram, changing
              lines, and relating hexagram when change is present.
            </p>
            <div className="mt-8">
              <DirectAnswer answer="The free I Ching oracle casts a six-line hexagram for a specific question and shows how changing lines move the reading toward a relating hexagram. Use it to clarify a situation and choose a better next question or action." />
            </div>
          </header>
          <div className="mt-10">
            <IChingOracle />
          </div>
          <FAQSection faqs={iChingOracleFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </main>
    </>
  );
}
