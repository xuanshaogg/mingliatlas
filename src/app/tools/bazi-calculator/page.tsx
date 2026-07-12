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
  title: "Free Bazi Calculator: Generate Your Four Pillars & Day Master Chart",
  description:
    "Free Bazi calculator — enter your birth date to get a complete Four Pillars chart with Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance. Deterministic, no sign-up needed.",
  alternates: {
    canonical: "/tools/bazi-calculator",
  },
  openGraph: {
    title: "Free Bazi Calculator: Generate Your Four Pillars & Day Master Chart",
    description:
      "Enter your birth date to get a complete Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
    url: "/tools/bazi-calculator",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bazi Calculator: Generate Your Four Pillars & Day Master Chart",
    description:
      "Enter your birth date to get a complete Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
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
  alternateName: ["Ming Li Bazi Calculator", "Four Pillars Calculator"],
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
  {
    question: "How accurate is the Bazi calculator?",
    answer:
      "The same entered date and time always produce the same chart. This browser version uses the local civil date and time you enter; it does not automatically convert time zones, birthplace longitude, or true solar time. Verify births close to a day or two-hour boundary with a qualified practitioner.",
  },
  {
    question: "Does Five Element balance show whether a chart is strong or weak?",
    answer:
      "Not by itself. Element counts are an overview. Day Master strength also depends on season, the month branch, root support, combinations, and the position of each stem and branch.",
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
  { title: "Heavenly Stems", href: "/bazi/heavenly-stems", description: "Read the visible stem layer shown in each pillar." },
  { title: "Earthly Branches", href: "/bazi/earthly-branches", description: "Understand branches, hidden stems, and seasonal context." },
  { title: "Luck Pillars", href: "/bazi/luck-pillars", description: "Add the 10-year timing layer after the natal chart." },
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
              Generate a deterministic Four Pillars chart from a birth date and local civil time. This Ming Li tool
              returns the Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance without storing birth data.
            </p>
            <div className="mt-8">
              <DirectAnswer answer="The free Bazi calculator creates a Four Pillars reference chart from the birth date and local civil birth time you enter. It separates deterministic chart calculation from interpretation, so the pillars stay stable while reading guidance remains educational." />
            </div>
          </header>
          <div className="mt-10">
            <BaziCalculator />
          </div>
          <section className="mt-14 grid gap-8 lg:grid-cols-3">
            <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">What the chart calculates</h2>
              <p className="mt-3 text-sm leading-7 text-ink-600 dark:text-ink-300">
                The calculator maps a birth date and local civil time into the Chinese stem-branch calendar. It returns
                the year, month, day, and hour pillars, then marks the Day Master from the day stem so the rest of the
                chart can be read in relation to that anchor.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">How to read it first</h2>
              <p className="mt-3 text-sm leading-7 text-ink-600 dark:text-ink-300">
                Start with the Day Master, then check the month branch for season, visible stems for expression, hidden
                stems for stored energy, and Ten Gods for relationship roles. Element balance is a helpful overview,
                but it should be read after season and Day Master context.
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">What it should not do</h2>
              <p className="mt-3 text-sm leading-7 text-ink-600 dark:text-ink-300">
                A Bazi chart is not a medical, legal, financial, or mental health diagnosis. Use the result as a
                structured learning reference. For real-world decisions, combine chart reflection with practical
                judgment and qualified professional advice where needed.
              </p>
            </div>
          </section>
          <section className="mt-14 border-y border-ink-200 py-10 dark:border-white/10">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                Calculation method and limits
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-ink-700 dark:text-ink-200">
                <p>
                  The calculator converts the entered civil date and time into year, month, day, and hour stem-branch
                  pillars, then derives the Day Master, hidden stems, Ten Gods, lunar date, and an element-count overview.
                  Repeating the same inputs produces the same chart.
                </p>
                <p>
                  The birthplace and time-zone fields are labels in this version; they do not automatically shift the
                  entered hour or apply longitude-based true solar time. Births close to midnight, a two-hour branch
                  boundary, daylight-saving changes, or a solar-term boundary deserve an independent check.
                </p>
                <p>
                  Element percentages are not a complete strength judgment. Read them after the birth season, month
                  branch, root support, combinations, and the placement of each symbol. The calculator constructs the
                  chart; the linked guides explain how to interpret it without reducing the result to a single score.
                </p>
              </div>
            </div>
          </section>
          <section className="mt-14 rounded-lg border border-gold-300/70 bg-gold-50 p-6 dark:border-gold-500/30 dark:bg-gold-500/10">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">
              Recommended Bazi reading order
            </h2>
            <ol className="mt-5 grid gap-4 text-sm leading-7 text-ink-700 dark:text-ink-200 md:grid-cols-2">
              <li><strong>1. Day Master:</strong> find the self-reference point in the day stem.</li>
              <li><strong>2. Month branch:</strong> check season and element strength before judging balance.</li>
              <li><strong>3. Stems and branches:</strong> compare visible expression with hidden stored energy.</li>
              <li><strong>4. Ten Gods:</strong> translate elements into resource, peer, output, wealth, and authority roles.</li>
              <li><strong>5. Luck Pillars:</strong> add 10-year timing only after the natal chart is clear.</li>
              <li><strong>6. Practical reflection:</strong> connect chart themes to lived choices without treating them as fixed outcomes.</li>
            </ol>
          </section>
          <FAQSection faqs={baziCalculatorFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </main>
    </>
  );
}
