import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Check, Coins, HeartHandshake } from "lucide-react";
import DirectAnswer from "@/components/shared/DirectAnswer";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import RelatedLinks from "@/components/shared/RelatedLinks";
import { SITE } from "@/lib/constants";
import { buildFAQPageSchema, buildCollectionPageSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Bazi, I Ching & Zodiac Tools",
  description:
    "Free browser tools for Chinese metaphysics: a Bazi Four Pillars calculator, an I Ching coin oracle, and a Chinese zodiac compatibility checker.",
  path: "/tools",
});

const toolsFaqs: FAQ[] = [
  {
    question: "Are the Chinese metaphysics tools free?",
    answer:
      "Yes. The Bazi calculator, I Ching oracle, and zodiac compatibility calculator are free browser-based tools for learning and self-reflection.",
  },
  {
    question: "Do the tools store birth details or questions?",
    answer:
      "The browser tools are designed to return a result without saving birth details or I Ching questions to a user profile.",
  },
  {
    question: "Which tool should a beginner try first?",
    answer:
      "Start with the Bazi calculator if you have a birth date and time, the I Ching oracle for a specific decision question, or zodiac compatibility for a quick relationship context.",
  },
  {
    question: "Are these tools a replacement for professional advice?",
    answer:
      "No. They are educational tools for symbolic reflection and should not replace medical, legal, financial, or mental health guidance.",
  },
];

const relatedLinks = [
  {
    title: "Bazi Overview",
    href: "/bazi",
    description: "Learn the Four Pillars vocabulary behind the calculator.",
  },
  {
    title: "I Ching Guide",
    href: "/i-ching",
    description: "Understand hexagrams, changing lines, and reflective use.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    description: "Read the 12-animal cycle before comparing signs.",
  },
];

export default function ToolsPage() {
  const tools = [
    {
      title: "Free Bazi Calculator",
      href: "/tools/bazi-calculator",
      description:
        "Generate a Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
      icon: Calculator,
      need: "Birth date and local birth time",
      purpose: "Understand your chart",
      guide: "/bazi/what-is-bazi",
      guideLabel: "Learn how Bazi works",
      action: "Build your chart",
    },
    {
      title: "I Ching Oracle",
      href: "/tools/i-ching-oracle",
      description:
        "Cast a six-line hexagram with changing lines and a relating hexagram when the cast moves.",
      icon: Coins,
      need: "One specific question",
      purpose: "Reflect on a decision",
      guide: "/i-ching/what-is-i-ching",
      guideLabel: "Learn how to ask",
      action: "Cast a hexagram",
    },
    {
      title: "Zodiac Compatibility",
      href: "/tools/zodiac-compatibility",
      description:
        "Compare two zodiac signs through harmony pairs, triads, clashes, strengths, and watchouts.",
      icon: HeartHandshake,
      need: "Two Chinese zodiac signs",
      purpose: "Explore a relationship",
      guide: "/chinese-zodiac",
      guideLabel: "Find your zodiac sign",
      action: "Compare signs",
    },
  ];
  const itemListSchema = buildCollectionPageSchema({
    itemType: "WebApplication",
    name: "Free Chinese Metaphysics Tools",
    description: "Free calculators and guided workflows for Bazi, I Ching, and Chinese Zodiac.",
    url: `${SITE.url}/tools`,
    items: tools.map((tool) => ({
      name: tool.title,
      description: tool.description,
      url: `${SITE.url}${tool.href}`,
    })),
  });

  return (
    <>
      <JsonLd data={[itemListSchema, buildFAQPageSchema(toolsFaqs)]} />
      <section className="atlas-tool-shell bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="atlas-eyebrow">Tools</p>
          <h1 className="atlas-page-title mt-5">Free tools</h1>
          <p className="atlas-page-intro mt-5 max-w-3xl">
            Use these browser-friendly workflows for quick charts, I Ching reflection, and zodiac
            compatibility checks.
          </p>
          <div className="text-ink-600 dark:text-ink-300 mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium">
            {["Free to use", "No account needed", "Clear reading guides"].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <Check className="text-brand-primary h-4 w-4" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.href}
                  className="atlas-surface flex flex-col p-5 sm:p-6 md:p-4 lg:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-brand-primary dark:bg-gold-500/10 dark:text-gold-300 bg-brand-50 flex h-14 w-14 items-center justify-center rounded-full">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-ink-400 text-xs tabular-nums">0{index + 1}</span>
                  </div>
                  <div className="flex flex-1 flex-col pt-7">
                    <p className="text-ink-500 dark:text-ink-300 text-xs font-medium">
                      {tool.purpose}
                    </p>
                    <h2 className="text-ink-950 dark:text-paper mt-3 text-2xl leading-snug font-semibold tracking-tight">
                      {tool.title}
                    </h2>
                    <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                      {tool.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="text-ink-500 pt-4 text-xs font-medium">What you need</p>
                      <p className="text-ink-700 dark:text-ink-200 mt-1 text-sm">{tool.need}</p>
                      <Link href={tool.href} className="atlas-button-primary mt-5 w-full">
                        {tool.action}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href={tool.guide}
                        className="text-ink-600 hover:text-brand-primary dark:text-ink-300 mt-2 flex min-h-11 items-center justify-center gap-2 text-xs font-medium"
                      >
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        {tool.guideLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 max-w-4xl">
            <DirectAnswer answer="The free tools turn Chinese metaphysics concepts into practical workflows: calculate a Bazi chart, cast an I Ching hexagram, or compare two Chinese zodiac signs. Use them as structured learning aids before reading deeper guides." />
          </div>
          <FAQSection faqs={toolsFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </section>
    </>
  );
}
