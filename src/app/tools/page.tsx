import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Coins, HeartHandshake } from "lucide-react";
import DirectAnswer from "@/components/shared/DirectAnswer";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import RelatedLinks from "@/components/shared/RelatedLinks";
import { SITE } from "@/lib/constants";
import { buildFAQPageSchema, buildItemListSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Tools",
  description: "Free calculators and guided workflows for Bazi, Chinese Zodiac, I Ching, and Chinese metaphysics.",
  alternates: {
    canonical: "/tools",
  },
};

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
  { title: "Bazi Overview", href: "/bazi", description: "Learn the Four Pillars vocabulary behind the calculator." },
  { title: "I Ching Guide", href: "/i-ching", description: "Understand hexagrams, changing lines, and reflective use." },
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Read the 12-animal cycle before comparing signs." },
];

export default function ToolsPage() {
  const tools = [
    {
      title: "Free Bazi Calculator",
      href: "/tools/bazi-calculator",
      description: "Generate a Four Pillars chart with Day Master, Ten Gods, hidden stems, and Five Element balance.",
      icon: Calculator,
      status: "Live",
    },
    {
      title: "I Ching Oracle",
      href: "/tools/i-ching-oracle",
      description: "Cast a six-line hexagram with changing lines and a relating hexagram when the cast moves.",
      icon: Coins,
      status: "Live",
    },
    {
      title: "Zodiac Compatibility",
      href: "/tools/zodiac-compatibility",
      description: "Compare two zodiac signs through harmony pairs, triads, clashes, strengths, and watchouts.",
      icon: HeartHandshake,
      status: "Live",
    },
  ];
  const itemListSchema = buildItemListSchema({
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
      <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">Tools</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
            Free tools
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-600 dark:text-ink-300">
            Use these browser-friendly workflows for quick charts, I Ching reflection, and zodiac compatibility checks.
          </p>
          <div className="mt-8 max-w-4xl">
            <DirectAnswer answer="The free tools turn Chinese metaphysics concepts into practical workflows: calculate a Bazi chart, cast an I Ching hexagram, or compare two Chinese zodiac signs. Use them as structured learning aids before reading deeper guides." />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-lg border border-ink-200 bg-white p-6 transition hover:border-brand-gold dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-primary dark:bg-gold-500/10 dark:text-gold-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-500/15 dark:text-gold-200">
                      {tool.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                    {tool.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{tool.description}</p>
                </Link>
              );
            })}
          </div>
          <FAQSection faqs={toolsFaqs} />
          <RelatedLinks links={relatedLinks} />
        </div>
      </main>
    </>
  );
}
