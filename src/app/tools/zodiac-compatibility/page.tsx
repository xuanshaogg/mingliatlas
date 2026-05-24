import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import DirectAnswer from "@/components/shared/DirectAnswer";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import RelatedLinks from "@/components/shared/RelatedLinks";
import ZodiacCompatibilityCalculator from "@/components/tools/ZodiacCompatibilityCalculator";
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
  tool: "zodiac",
  params: {
    a: "rat",
    b: "ox",
  },
});

export const metadata: Metadata = {
  title: "Chinese Zodiac Compatibility Calculator",
  description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
  alternates: {
    canonical: "/tools/zodiac-compatibility",
  },
  openGraph: {
    title: "Chinese Zodiac Compatibility Calculator",
    description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
    url: "/tools/zodiac-compatibility",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Zodiac Compatibility Calculator",
    description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
    images: [shareCardImage],
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Zodiac Compatibility", href: "/tools/zodiac-compatibility" },
];

const softwareSchema = buildWebApplicationSchema({
  name: "Chinese Zodiac Compatibility Calculator",
  url: `${SITE.url}/tools/zodiac-compatibility`,
  description: "A browser-based Chinese zodiac compatibility calculator for harmony, triad, and clash patterns.",
  featureList: ["Liu He harmony pairs", "three-harmony groups", "clash patterns", "strengths", "watchouts"],
});

const zodiacCompatibilityFaqs: FAQ[] = [
  {
    question: "What does zodiac compatibility compare?",
    answer:
      "It compares two Chinese zodiac signs through harmony pairs, three-harmony groups, clash patterns, strengths, and watchouts.",
  },
  {
    question: "Is zodiac compatibility enough for a full relationship reading?",
    answer:
      "No. The year animal is only one layer. A full Chinese metaphysics reading would also consider Bazi, timing, personal context, and lived behavior.",
  },
  {
    question: "Can two clash signs still have a good relationship?",
    answer:
      "Yes. A clash describes contrast, pacing, or friction points. It does not decide whether a relationship can work.",
  },
  {
    question: "Does the calculator store the signs I compare?",
    answer:
      "No. The comparison is a browser-based learning workflow and does not save relationship details to a user profile.",
  },
];

const zodiacHowToSchema = buildHowToSchema({
  name: "How to use the Chinese zodiac compatibility calculator",
  description: "Choose two zodiac animals and compare harmony, triad, clash, strengths, and watchouts.",
  url: `${SITE.url}/tools/zodiac-compatibility`,
  steps: [
    "Choose the first Chinese zodiac animal.",
    "Choose the second Chinese zodiac animal.",
    "Review harmony pairs, three-harmony groups, and clash patterns.",
    "Use the strengths and watchouts as conversation context, not as a fixed relationship verdict.",
  ],
});

const relatedLinks = [
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Learn the 12 animal cycle and yearly context." },
  { title: "Zodiac Compatibility Guide", href: "/chinese-zodiac/compatibility", description: "Read harmony, triads, and clash pairs in detail." },
  { title: "Bazi Relationships", href: "/bazi/relationships", description: "Compare zodiac context with a deeper Four Pillars approach." },
];

export default function ZodiacCompatibilityPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareSchema,
          zodiacHowToSchema,
          buildFAQPageSchema(zodiacCompatibilityFaqs),
          buildBreadcrumbListSchema(breadcrumbs),
        ]}
      />
      <main className="bg-paper px-4 py-10 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbs} />
          <header className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
              Tools
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
              Chinese Zodiac Compatibility Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Compare two zodiac signs through Liu He harmony pairs, three-harmony groups, and clash patterns. Use
              the result as a conversation aid, not a fixed relationship verdict.
            </p>
            <div className="mt-8">
              <DirectAnswer answer="The Chinese zodiac compatibility calculator compares two animal signs through traditional harmony, triad, and clash relationships. It gives quick relationship context, but it does not replace a full Bazi chart or real-world communication." />
            </div>
          </header>
          <div className="mt-10">
            <ZodiacCompatibilityCalculator />
          </div>
          <FAQSection faqs={zodiacCompatibilityFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </main>
    </>
  );
}
