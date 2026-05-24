import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import DirectAnswer from "@/components/shared/DirectAnswer";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import RelatedLinks from "@/components/shared/RelatedLinks";
import BaziCalculator from "@/components/tools/BaziCalculator";
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
  tool: "bazi",
  params: {
    y: 1990,
    m: 1,
    d: 1,
    h: 12,
    min: 0,
    g: "not-specified",
    tz: "Asia/Shanghai",
  },
});

export const metadata: Metadata = {
  title: "Free Bazi Calculator: Four Pillars Chart",
  description:
    "Calculate a deterministic Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance.",
  alternates: {
    canonical: "/tools/bazi-calculator",
  },
  openGraph: {
    title: "Free Bazi Calculator: Four Pillars Chart",
    description:
      "Calculate a deterministic Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance.",
    url: "/tools/bazi-calculator",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bazi Calculator: Four Pillars Chart",
    description:
      "Calculate a deterministic Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance.",
    images: [shareCardImage],
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Free Bazi Calculator", href: "/tools/bazi-calculator" },
];

const softwareSchema = buildWebApplicationSchema({
  name: "Free Bazi Calculator",
  url: `${SITE.url}/tools/bazi-calculator`,
  description:
    "A browser-based Bazi calculator for Four Pillars, Day Master, Ten Gods, hidden stems, and Five Element balance.",
  featureList: ["Four Pillars chart", "Day Master", "Ten Gods", "hidden stems", "Five Element balance"],
});

const baziCalculatorFaqs: FAQ[] = [
  {
    question: "What does the free Bazi calculator show?",
    answer:
      "It shows the year, month, day, and hour pillars, the Day Master, Ten Gods, hidden stems, lunar date, Five Element balance, and deterministic reading cues.",
  },
  {
    question: "Should I enter local time or convert to another time zone?",
    answer:
      "Enter the birth time as local civil time at the birthplace. The time-zone note labels the chart and does not convert the date or hour.",
  },
  {
    question: "Does the calculator save my birth details?",
    answer:
      "No. The chart is calculated in the browser session and the page does not save birth details to a user profile.",
  },
  {
    question: "Is the result a fixed prediction?",
    answer:
      "No. The chart is a structured reference for self-reflection and learning. It should not replace practical judgment or professional advice.",
  },
];

const baziHowToSchema = buildHowToSchema({
  name: "How to use the free Bazi calculator",
  description: "Enter birth details, calculate the chart, review the pillars, and read the element balance responsibly.",
  url: `${SITE.url}/tools/bazi-calculator`,
  steps: [
    "Enter the birth date and the birth time as local civil time at the birthplace.",
    "Add an optional birthplace or time-zone note so the chart label stays clear.",
    "Calculate the Four Pillars chart and review the Day Master, Ten Gods, and hidden stems.",
    "Use the Five Element balance and reading cues as learning context, not as a fixed prediction.",
  ],
});

const relatedLinks = [
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "Understand the Four Pillars before reading a chart." },
  { title: "The Five Elements", href: "/bazi/five-elements", description: "Learn Wood, Fire, Earth, Metal, and Water in Bazi." },
  { title: "Ten Gods", href: "/bazi/ten-gods", description: "Decode the relationship roles around the Day Master." },
];

export default function BaziCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareSchema,
          baziHowToSchema,
          buildFAQPageSchema(baziCalculatorFaqs),
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
              Free Bazi Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Generate a deterministic Four Pillars chart from a birth date and time. The calculator returns the
              Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance without storing birth data.
            </p>
            <div className="mt-8">
              <DirectAnswer answer="The free Bazi calculator creates a Four Pillars reference chart from the birth date and local civil birth time you enter. It separates deterministic chart calculation from interpretation, so the pillars stay stable while reading guidance remains educational." />
            </div>
          </header>
          <div className="mt-10">
            <BaziCalculator />
          </div>
          <FAQSection faqs={baziCalculatorFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </main>
    </>
  );
}
