import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Compass,
  Hexagon,
  Orbit,
  Sparkles,
  Stars,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";
import {
  buildDefinedTermSchema,
  buildFAQPageSchema,
  buildItemListSchema,
  JsonLd,
} from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Mingli Meaning & Free Bazi Calculator",
    description:
      "Mingli (ming li) means life-pattern principles. Explore Chinese metaphysics, build a Bazi chart, compare zodiac signs, and learn with step-by-step guides.",
    path: "/",
  }),
  title: { absolute: "Mingli Meaning & Free Bazi Calculator | Mingli Atlas" },
};

const systems = [
  {
    title: "Bazi",
    href: "/bazi",
    icon: CalendarDays,
    description: "Four Pillars, Day Master, Ten Gods, elements, and life-pattern timing.",
  },
  {
    title: "Ziwei Doushu",
    href: "/ziwei",
    icon: Stars,
    description: "Palaces, major stars, transformations, and chart-based life areas.",
  },
  {
    title: "I Ching",
    href: "/i-ching",
    icon: Hexagon,
    description: "Hexagrams, changing lines, trigrams, and structured reflection.",
  },
  {
    title: "Feng Shui",
    href: "/feng-shui",
    icon: Compass,
    description: "Qi flow, front doors, bedrooms, desks, and practical space reading.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    icon: Orbit,
    description: "Twelve signs, yearly cycles, harmony, and clashes.",
  },
  {
    title: "Free Tools",
    href: "/tools",
    icon: Sparkles,
    description: "Bazi calculator, I Ching oracle, and zodiac compatibility workflows.",
  },
];

const toolPaths = [
  {
    title: "Calculate a Bazi chart",
    href: "/tools/bazi-calculator",
    label: "Birth chart",
    description: "Generate Four Pillars, Day Master, hidden stems, Ten Gods, and element balance.",
  },
  {
    title: "Ask the I Ching",
    href: "/tools/i-ching-oracle",
    label: "Reflection",
    description: "Cast a six-line hexagram with changing lines and a relating hexagram.",
  },
  {
    title: "Compare zodiac signs",
    href: "/tools/zodiac-compatibility",
    label: "Compatibility",
    description: "Check harmony pairs, triads, clashes, strengths, and watchouts.",
  },
];

const searchIntentLinks = [
  {
    title: "Free Bazi calculator",
    href: "/tools/bazi-calculator",
    description:
      "Generate Four Pillars, Day Master, Ten Gods, hidden stems, and Five Element balance.",
  },
  {
    title: "Five Elements explained",
    href: "/bazi/five-elements",
    description:
      "Learn how Wood, Fire, Earth, Metal, and Water support, control, and transform one another.",
  },
  {
    title: "Chinese zodiac years list",
    href: "/chinese-zodiac",
    description:
      "Find the 12 animal signs, year boundaries, elements, and the 2026 Fire Horse context.",
  },
  {
    title: "Year of the Dragon",
    href: "/chinese-zodiac/dragon",
    description:
      "Check Dragon years, personality, compatibility, Five Element types, and 2026 guidance.",
  },
  {
    title: "Chinese zodiac compatibility chart",
    href: "/blog/chinese-zodiac-compatibility-chart",
    description: "Compare harmony pairs, triads, and clash pairs across all 12 animal signs.",
  },
];

const mingliMeaningPoints = [
  {
    label: "Ming",
    value: "命",
    description: "life, fate, timing, and the conditions a chart describes.",
  },
  {
    label: "Li",
    value: "理",
    description: "principle, pattern, structure, and the logic used to read those conditions.",
  },
  {
    label: "Mingli",
    value: "命理",
    description:
      "the study of life patterns through systems such as Bazi, Ziwei Doushu, and the zodiac calendar.",
  },
];

const posts = [
  {
    title: "What Is Bazi? A Beginner's Guide to the Four Pillars",
    href: "/bazi/what-is-bazi",
    category: "Bazi guide",
    excerpt:
      "A practical introduction to year, month, day, and hour pillars for readers new to Chinese metaphysics.",
  },
  {
    title: "Bazi Day Master Is the Day Stem: Meaning & Sources",
    href: "/blog/day-master-bazi-complete-guide",
    category: "Bazi guide",
    excerpt:
      "Learn how the Day Master is read through season, strength, Ten Gods, and useful elements.",
  },
  {
    title: "Chinese Zodiac Compatibility Chart",
    href: "/blog/chinese-zodiac-compatibility-chart",
    category: "Zodiac guide",
    excerpt:
      "A complete compatibility chart with triads, harmony pairs, and clash pairs for all 12 animal signs.",
  },
];

const homepageFaqs = [
  {
    question: "What does Mingli mean?",
    answer:
      "Mingli, often written Ming Li, is 命理 in Chinese. Ming means life, fate, or timing; li means principle or pattern. In practice, mingli refers to Chinese life-pattern analysis systems such as Bazi, Ziwei Doushu, and zodiac calendar reading.",
  },
  {
    question: "What should I start with if I am new to Chinese metaphysics?",
    answer:
      "Start with the beginner guide for yin-yang, Five Elements, and zodiac basics. If you want something personalized quickly, the Bazi calculator is the clearest first tool because it turns a birth date into a concrete chart structure.",
  },
  {
    question: "What is the difference between Bazi, I Ching, and Chinese Zodiac?",
    answer:
      "Bazi is a birth-chart system based on year, month, day, and hour pillars. I Ching is a question-based reflection system built around hexagrams and changing lines. Chinese Zodiac is the 12-animal cycle and works best as cultural context rather than a full chart-reading substitute.",
  },
  {
    question: "Can I use the free tools without knowing any Chinese terms?",
    answer:
      "Yes. The site explains core terms like Day Master, Ten Gods, trigrams, and harmony pairs in plain English and links deeper guides from the tool results so you can learn only the terms relevant to your question.",
  },
];

const featuredToolsSchema = buildItemListSchema({
  id: `${SITE.url}/#featured-tools`,
  itemType: "WebApplication",
  name: "Featured Chinese Metaphysics Tools",
  description:
    "Free Chinese metaphysics tools for Bazi charts, I Ching reflection, and zodiac compatibility.",
  url: SITE.url,
  items: toolPaths.map((tool) => ({
    name: tool.title,
    description: tool.description,
    url: `${SITE.url}${tool.href}`,
  })),
});
const homepageFaqSchema = buildFAQPageSchema(homepageFaqs);
const mingliEntitySchema = buildDefinedTermSchema({
  name: "Mingli (命理)",
  alternateName: ["Ming Li", "Chinese life-pattern principles"],
  description:
    "Mingli (命理), also written Ming Li, means life-pattern principles: the study of timing, temperament, and recurring patterns through Bazi and related Chinese metaphysics systems.",
  url: SITE.url,
  definedTermSet: {
    name: "Mingli Atlas Chinese Metaphysics Glossary",
    url: `${SITE.url}/bazi/glossary`,
  },
});
const searchIntentSchema = buildItemListSchema({
  id: `${SITE.url}/#popular-guides`,
  name: "Popular Chinese Metaphysics Searches",
  description:
    "High-intent entry points for Bazi, Chinese zodiac years, Dragon zodiac, and compatibility.",
  url: SITE.url,
  items: searchIntentLinks.map((item) => ({
    name: item.title,
    description: item.description,
    url: `${SITE.url}${item.href}`,
  })),
});

export default function Home() {
  return (
    <>
      <JsonLd data={featuredToolsSchema} />
      <JsonLd data={homepageFaqSchema} />
      <JsonLd data={mingliEntitySchema} />
      <JsonLd data={searchIntentSchema} />

      <section className="border-ink-200 border-b px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16 lg:py-20">
          <div className="home-reveal max-w-2xl">
            <p className="atlas-eyebrow">Chinese metaphysics, explained in English</p>
            <h1 className="text-ink-950 font-display mt-5 text-[clamp(3rem,7vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.025em]">
              Mingli Atlas
            </h1>
            <p className="text-ink-800 font-display mt-6 max-w-xl text-[clamp(1.375rem,2.4vw,1.75rem)] leading-snug">
              A reference to Bazi, the Chinese zodiac, and the I Ching: what the terms mean, where
              they come from, and how to read your own chart.
            </p>
            <p className="text-ink-700 mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              Build a free Four Pillars chart, find your Day Master, compare Chinese zodiac signs,
              or cast the I Ching with clear English guidance and no sign-up.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools/bazi-calculator" className="atlas-button-primary group">
                Build your Bazi chart{" "}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/learn/beginners-guide" className="atlas-button-secondary">
                Start with the basics
              </Link>
            </div>
            <p className="text-ink-600 mt-8 text-sm leading-6">{SITE.tagline}</p>
          </div>

          <section
            className="home-reveal home-reveal-delay lg:pt-2"
            aria-labelledby="free-tools-heading"
          >
            <h2
              id="free-tools-heading"
              className="text-ink-950 font-sans text-xs font-semibold tracking-[0.14em] uppercase"
            >
              Free tools
            </h2>
            <ul className="border-ink-200 divide-ink-200 mt-4 divide-y border-y">
              {toolPaths.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex items-start justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="text-brand-700 block text-xs font-semibold tracking-wide">
                        {tool.label}
                      </span>
                      <span className="text-ink-950 group-hover:text-brand-primary font-display mt-1 block text-2xl leading-tight transition-colors">
                        {tool.title}
                      </span>
                      <span className="text-ink-650 mt-2 block text-sm leading-6">
                        {tool.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="text-brand-primary mt-6 h-4 w-4 flex-none transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="mingli-meaning">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <div>
            <p className="atlas-eyebrow">Mingli meaning</p>
            <h2 id="mingli-meaning" className="atlas-section-title mt-4 max-w-lg">
              Mingli means life-pattern principles.
            </h2>
          </div>
          <div>
            <p className="text-ink-800 max-w-3xl text-[1.0625rem] leading-8">
              Mingli, also searched as Ming Li, is the Chinese term 命理. It describes the
              principles used to read timing, temperament, and recurring life patterns through Bazi,
              Ziwei Doushu, the Chinese zodiac calendar, and related classical systems.
            </p>
            <dl className="border-ink-200 mt-8 grid border-y sm:grid-cols-3">
              {mingliMeaningPoints.map((point) => (
                <div
                  key={point.label}
                  className="border-ink-200 border-b py-5 last:border-b-0 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt>
                    <span className="text-ink-950 font-display block text-4xl leading-none">
                      {point.value}
                    </span>
                    <span className="text-brand-700 mt-3 block text-xs font-semibold tracking-[0.14em] uppercase">
                      {point.label}
                    </span>
                  </dt>
                  <dd className="text-ink-700 mt-2 text-sm leading-6">{point.description}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/bazi/glossary"
              className="text-brand-primary decoration-brand-300 hover:decoration-brand-primary mt-6 inline-flex items-center text-sm font-semibold underline underline-offset-[6px] transition"
            >
              Explore the Chinese metaphysics glossary{" "}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="atlas-eyebrow">Start with a question</p>
            <h2 className="atlas-section-title mt-4 max-w-md">
              Useful answers, before the jargon.
            </h2>
            <p className="text-ink-700 mt-5 max-w-md text-base leading-7">
              Choose a practical entry point and learn only the vocabulary you need next.
            </p>
            <Link
              href="/search"
              className="text-brand-primary decoration-brand-300 hover:decoration-brand-primary mt-6 inline-flex items-center text-sm font-semibold underline underline-offset-[6px] transition"
            >
              Search the atlas <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="border-ink-200 border-t">
            {searchIntentLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group border-ink-200 flex items-start justify-between gap-6 border-b py-6"
                >
                  <span>
                    <span className="text-ink-950 group-hover:text-brand-primary font-display block text-[1.625rem] leading-tight transition-colors">
                      {item.title}
                    </span>
                    <span className="text-ink-700 mt-2 block max-w-xl text-[0.9375rem] leading-7">
                      {item.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="text-ink-500 group-hover:text-brand-primary mt-1.5 h-5 w-5 flex-none transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="knowledge-map">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 pb-10 md:flex-row md:items-end">
            <div>
              <p className="atlas-eyebrow">The knowledge map</p>
              <h2 id="knowledge-map" className="atlas-section-title mt-4 max-w-2xl">
                Six traditions, one clear starting point.
              </h2>
            </div>
            <p className="text-ink-700 max-w-sm text-[0.9375rem] leading-7">
              Each system answers a different kind of question. Explore the one that fits yours.
            </p>
          </div>
          <div className="border-ink-200 grid gap-px overflow-hidden rounded-xl border bg-[var(--color-ink-200)] sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <Link
                  key={system.href}
                  href={system.href}
                  className="group hover:bg-paper-50 flex flex-col bg-white p-6 transition-colors sm:p-8"
                >
                  <Icon className="text-brand-primary h-5 w-5" aria-hidden="true" />
                  <h3 className="text-ink-950 group-hover:text-brand-primary mt-5 text-[1.75rem] leading-tight transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-ink-700 mt-3 max-w-xs text-[0.9375rem] leading-7">
                    {system.description}
                  </p>
                  <span className="text-brand-primary mt-auto inline-flex items-center pt-5 text-sm font-semibold">
                    Explore {system.title}
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-ink-200 border-t px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="atlas-eyebrow">Latest guides</p>
            <h2 className="atlas-section-title mt-4 max-w-md">A better first read.</h2>
            <Link
              href="/blog"
              className="text-brand-primary decoration-brand-300 hover:decoration-brand-primary mt-6 inline-flex items-center text-sm font-semibold underline underline-offset-[6px] transition"
            >
              View all articles <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="border-ink-200 divide-ink-200 divide-y border-y">
            {posts.map((post) => (
              <article key={post.href} className="py-6">
                <p className="text-brand-700 text-xs font-semibold tracking-wide">
                  {post.category}
                </p>
                <h3 className="text-ink-950 mt-2 text-[1.625rem] leading-tight">
                  <Link href={post.href} className="hover:text-brand-primary transition">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-ink-700 mt-3 text-[0.9375rem] leading-7">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-10">
        <div className="bg-ink-900 text-paper mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-xl px-6 py-12 sm:px-10 md:flex-row md:items-end lg:px-14 lg:py-14">
          <div>
            <p className="text-gold-300 text-xs font-semibold tracking-[0.14em] uppercase">
              Bazi calculator
            </p>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight">
              Turn a birth date into a readable chart.
            </h2>
          </div>
          <Link
            href="/tools/bazi-calculator"
            className="group text-ink-900 hover:bg-paper-200 inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold transition-colors"
          >
            Open the free calculator{" "}
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <FAQSection faqs={homepageFaqs} />
        </div>
      </section>
    </>
  );
}
