import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Compass,
  Hexagon,
  Layers3,
  Orbit,
  Search,
  ShieldCheck,
  Sparkles,
  Stars,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";
import { buildFAQPageSchema, buildItemListSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: `Mingli Atlas — Free Bazi Calculator (Ming Li) & Chinese Zodiac Guide`,
  description:
    "Mingli Atlas (Ming Li) is a free Bazi calculator and Chinese metaphysics guide: build your Four Pillars and Day Master chart, read the Chinese Zodiac compatibility chart, cast the I Ching, and learn Ziwei Doushu and Feng Shui — no sign-up.",
  alternates: {
    canonical: "/",
  },
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
    description: "Twelve signs, yearly cycles, compatibility, harmony, and clashes.",
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
    label: "Most useful first tool",
    description: "Generate Four Pillars, Day Master, hidden stems, Ten Gods, and element balance.",
  },
  {
    title: "Ask the I Ching",
    href: "/tools/i-ching-oracle",
    label: "Reflection workflow",
    description: "Cast a six-line hexagram with changing lines and a relating hexagram.",
  },
  {
    title: "Compare zodiac signs",
    href: "/tools/zodiac-compatibility",
    label: "Quick relationship context",
    description: "Check harmony pairs, triads, clashes, strengths, and watchouts.",
  },
];

const featuredToolsSchema = buildItemListSchema({
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

const homepageFaqs = [
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

const homepageFaqSchema = buildFAQPageSchema(homepageFaqs);

const searchIntentLinks = [
  {
    title: "Free Bazi calculator",
    href: "/tools/bazi-calculator",
    description:
      "Generate Four Pillars, Day Master, Ten Gods, hidden stems, and Five Element balance.",
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

const searchIntentSchema = buildItemListSchema({
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

const learningPaths = [
  {
    title: "New to Chinese metaphysics",
    href: "/learn/beginners-guide",
    description: "Start with yin-yang, Five Elements, zodiac signs, and Bazi basics.",
  },
  {
    title: "Choosing a system",
    href: "/learn/which-system",
    description: "Pick Bazi, Ziwei, I Ching, Feng Shui, or zodiac based on your question.",
  },
  {
    title: "Comparing traditions",
    href: "/learn/chinese-vs-western-astrology",
    description: "Understand how Chinese chart logic differs from Western astrology.",
  },
];

const posts = [
  {
    title: "What Is Bazi? A Beginner's Guide to the Four Pillars",
    href: "/blog/what-is-bazi",
    category: "Bazi Guide",
    excerpt:
      "A practical introduction to year, month, day, and hour pillars for readers new to Chinese metaphysics.",
  },
  {
    title: "Day Master Is the Day Stem — Complete Guide to Bazi Day Master",
    href: "/blog/day-master-bazi-complete-guide",
    category: "Bazi Guide",
    excerpt:
      "The Day Master is the day stem (heavenly stem of day pillar). Complete guide to the 10 Heavenly Stems and your Bazi day master source.",
  },
  {
    title: "Jia Wood Day Master: The Tall Tree — Personality & Meaning",
    href: "/blog/jia-wood-day-master",
    category: "Bazi Guide",
    excerpt:
      "Jia Wood (甲) is the Yang Wood Day Master — the tall tree. A complete guide to Jia Wood personality, career, relationships, and elemental strengths.",
  },
  {
    title: "Chinese Zodiac Compatibility Chart: Triads, Harmony Pairs & Clashes",
    href: "/blog/chinese-zodiac-compatibility-chart",
    category: "Zodiac Guide",
    excerpt:
      "A complete compatibility chart with triads, harmony pairs, and clash pairs for all 12 animal signs.",
  },
  {
    title: "Chinese Zodiac 2026 Forecast: What to Expect for All 12 Animals",
    href: "/blog/chinese-zodiac-2026-forecast",
    category: "Yearly Forecast",
    excerpt:
      "A structured year overview that treats the zodiac as context rather than a literal prediction machine.",
  },
  {
    title: "Bazi vs Western Astrology: Which System Is More Accurate?",
    href: "/blog/bazi-vs-western-astrology",
    category: "Comparison",
    excerpt:
      "A side-by-side comparison of symbolic systems without flattening either into the other.",
  },
  {
    title: "How to Read a Bazi Chart Without Getting Overwhelmed",
    href: "/blog/how-to-read-a-bazi-chart",
    category: "Bazi Guide",
    excerpt:
      "A step-by-step reading order for turning a Four Pillars chart into useful questions about timing and tendencies.",
  },
];

const intentPaths = [
  {
    title: "I want a personal reading",
    href: "/tools/bazi-calculator",
    description:
      "Generate a Four Pillars chart, then read Day Master, element balance, and Ten Gods.",
  },
  {
    title: "I have a question and need guidance",
    href: "/tools/i-ching-oracle",
    description: "Cast a hexagram, review changing lines, and open the related hexagram guides.",
  },
  {
    title: "I want relationship compatibility",
    href: "/tools/zodiac-compatibility",
    description: "Check harmony, clashes, and sign dynamics before diving into deeper chart work.",
  },
  {
    title: "I just need the basics first",
    href: "/learn/beginners-guide",
    description:
      "Start with a structured introduction to key ideas, terms, and when to use each system.",
  },
];

function HeroAtlasPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="border-gold-300/50 absolute top-8 -left-8 hidden h-32 w-32 border-t border-l lg:block" />
      <div className="border-brand-primary/30 absolute -right-6 bottom-10 hidden h-32 w-32 border-r border-b lg:block" />

      <div className="border-ink-200 shadow-ink-950/10 dark:bg-ink-900 relative overflow-hidden rounded-lg border bg-white shadow-2xl dark:border-white/10">
        <div className="border-ink-100 flex items-center justify-between border-b px-5 py-4 dark:border-white/10">
          <div className="text-ink-950 dark:text-paper flex items-center gap-2 text-sm font-semibold">
            <Layers3 className="text-brand-primary dark:text-gold-300 h-4 w-4" aria-hidden="true" />
            {SITE.name} workspace
          </div>
          <span className="bg-gold-100 text-gold-800 dark:bg-gold-500/15 dark:text-gold-200 rounded-full px-3 py-1 text-xs font-semibold">
            Free tools
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-ink-100 border-b p-5 lg:border-r lg:border-b-0 dark:border-white/10">
            <div className="border-ink-200 bg-paper dark:bg-ink-950 rounded-lg border px-4 py-3 dark:border-white/10">
              <div className="text-ink-500 dark:text-ink-300 flex items-center gap-2 text-sm">
                <Search className="h-4 w-4" aria-hidden="true" />
                bazi day master meaning
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Start", "Five Elements and Chinese Zodiac"],
                ["Chart", "Bazi Day Master and Ten Gods"],
                ["Reflect", "I Ching hexagrams and lines"],
              ].map(([label, text]) => (
                <div key={label} className="flex gap-3">
                  <span className="bg-brand-primary dark:bg-gold-300 dark:text-ink-950 mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-semibold text-white">
                    {label.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-brand-primary dark:text-gold-300 text-xs font-semibold uppercase">
                      {label}
                    </p>
                    <p className="text-ink-700 dark:text-ink-200 mt-1 text-sm leading-6">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper-50 dark:bg-ink-950 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-brand-primary dark:text-gold-300 text-xs font-semibold uppercase">
                  Bazi preview
                </p>
                <h2 className="text-ink-950 dark:text-paper mt-2 text-2xl font-semibold">
                  Yang Fire Day Master
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
                  A structured chart reference before interpretation.
                </p>
              </div>
              <ShieldCheck
                className="text-brand-primary dark:text-gold-300 h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {[
                ["Year", "己巳"],
                ["Month", "丙子"],
                ["Day", "丙寅"],
                ["Hour", "甲午"],
              ].map(([label, pillar]) => (
                <div
                  key={label}
                  className="border-ink-200 rounded-lg border bg-white px-2 py-3 text-center dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-ink-500 dark:text-ink-400 text-xs font-semibold uppercase">
                    {label}
                  </p>
                  <p className="text-ink-950 dark:text-paper mt-2 font-serif text-2xl font-semibold">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["Fire", "45%"],
                ["Earth", "21%"],
                ["Wood", "20%"],
                ["Water", "13%"],
              ].map(([element, value]) => (
                <div
                  key={element}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm"
                >
                  <span className="text-ink-800 dark:text-ink-100 font-medium">{element}</span>
                  <span className="bg-ink-100 h-2 overflow-hidden rounded-full dark:bg-white/10">
                    <span
                      className="bg-brand-primary dark:bg-gold-300 block h-full rounded-full"
                      style={{ width: value }}
                    />
                  </span>
                  <span className="text-ink-600 dark:text-ink-300 text-right font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-ink-950 text-paper dark:text-ink-950 mt-6 rounded-lg p-4 dark:bg-white">
              <p className="text-gold-300 dark:text-brand-primary text-xs font-semibold uppercase">
                Direct answer
              </p>
              <p className="mt-2 text-sm leading-6">
                Begin with elements, then use tools to turn symbols into a readable chart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={featuredToolsSchema} />
      <JsonLd data={homepageFaqSchema} />
      <JsonLd data={searchIntentSchema} />
      <section className="border-ink-100 bg-paper dark:bg-ink-950 relative isolate overflow-hidden border-b dark:border-white/10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(139,0,0,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-16 lg:pb-14">
          <div className="max-w-2xl">
            <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold uppercase">
              {SITE.name}
            </p>
            <h1 className="text-ink-950 dark:text-paper mt-5 text-4xl font-semibold text-balance sm:text-6xl lg:text-7xl">
              Chinese metaphysics guides and free tools
            </h1>
            <p className="text-ink-700 dark:text-ink-200 mt-6 max-w-xl text-lg leading-8 text-pretty">
              Mingli Atlas (Ming Li, 命理) is a free Bazi calculator and guide to Chinese
              metaphysics. Learn Bazi, Ziwei Doushu, I Ching, Feng Shui, and the Chinese Zodiac with
              clear explanations, structured charts, and practical reflection tools.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/bazi-calculator"
                className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-700 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Calculate your Bazi chart
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/learn/beginners-guide"
                className="border-ink-300 text-ink-900 hover:border-brand-gold hover:text-brand-primary dark:text-paper inline-flex items-center justify-center rounded-full border bg-white/80 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/10"
              >
                Start learning
              </Link>
            </div>

            <div className="border-brand-primary text-ink-700 dark:text-ink-200 mt-8 max-w-xl border-l-2 bg-white/70 px-4 py-3 text-sm leading-6 shadow-sm dark:bg-white/5">
              <strong className="text-ink-950 dark:text-paper">Quick answer:</strong> start with{" "}
              <Link href="/blog/what-is-bazi" className="font-semibold underline">
                What Is Bazi
              </Link>{" "}
              and Five Elements, then use Bazi for birth-chart structure, I Ching for decisions, and
              Feng Shui for space.
            </div>

            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
              <Link
                href="/tools/bazi-calculator"
                className="border-ink-200 text-ink-900 hover:border-brand-primary hover:text-brand-primary dark:text-paper rounded-lg border bg-white px-4 py-3 text-center text-sm font-semibold transition dark:border-white/10 dark:bg-white/5"
              >
                Calculate Bazi
              </Link>
              <Link
                href="/tools/i-ching-oracle"
                className="border-ink-200 text-ink-900 hover:border-brand-primary hover:text-brand-primary dark:text-paper rounded-lg border bg-white px-4 py-3 text-center text-sm font-semibold transition dark:border-white/10 dark:bg-white/5"
              >
                Ask I Ching
              </Link>
              <Link
                href="/tools/zodiac-compatibility"
                className="border-ink-200 text-ink-900 hover:border-brand-primary hover:text-brand-primary dark:text-paper rounded-lg border bg-white px-4 py-3 text-center text-sm font-semibold transition dark:border-white/10 dark:bg-white/5"
              >
                Zodiac Match
              </Link>
            </div>
          </div>

          <HeroAtlasPreview />
        </div>
      </section>

      <section
        className="dark:bg-ink-900 bg-white px-4 py-5 sm:px-6 lg:px-8"
        aria-label="Popular starting points"
      >
        <div className="mx-auto grid max-w-7xl gap-3 text-sm sm:grid-cols-3">
          {toolPaths.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group border-ink-200 text-ink-900 hover:border-brand-gold hover:text-brand-primary dark:text-paper dark:hover:text-gold-200 flex items-center justify-between gap-4 border-b py-4 transition sm:border-b-0 dark:border-white/10"
            >
              <span>
                <span className="text-brand-primary dark:text-gold-300 block text-xs font-semibold uppercase">
                  {tool.label}
                </span>
                <span className="mt-1 block font-semibold">{tool.title}</span>
              </span>
              <ArrowRight
                className="h-4 w-4 flex-none transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <section
        className="border-ink-200 dark:bg-ink-900 border-y bg-white px-4 py-12 sm:px-6 lg:px-8 dark:border-white/10"
        aria-label="Popular search answers"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold uppercase">
              Popular answers
            </p>
            <h2 className="text-ink-950 dark:text-paper mt-3 text-3xl font-semibold">
              Start from the search intent you already have
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-4 text-base leading-7">
              These are the fastest paths for common Google searches: calculate a chart, find a
              zodiac year, read the Dragon guide, or compare compatibility.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {searchIntentLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border-ink-200 bg-paper hover:border-brand-primary hover:bg-gold-50 dark:hover:border-gold-300 border-l px-5 py-5 transition dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <h3 className="text-ink-950 dark:text-paper text-lg font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                  {item.description}
                </p>
                <span className="text-brand-primary dark:text-gold-300 mt-4 inline-flex items-center text-sm font-semibold">
                  Open answer
                  <ArrowRight
                    className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper dark:bg-ink-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="border-ink-200 grid gap-4 border-b pb-10 lg:grid-cols-4 dark:border-white/10">
            {intentPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group border-ink-200 hover:border-brand-gold hover:shadow-ink-950/5 rounded-lg border bg-white px-5 py-5 transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-ink-950 dark:text-paper text-sm font-semibold">{path.title}</p>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                  {path.description}
                </p>
                <span className="text-brand-primary dark:text-gold-300 mt-4 inline-flex items-center text-sm font-semibold">
                  Go there
                  <ArrowRight
                    className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold uppercase">
                Choose your path
              </p>
              <h2 className="text-ink-950 dark:text-paper mt-3 text-3xl font-semibold sm:text-4xl">
                Find the system that matches your question
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-lg leading-8">
                Each guide is written for Western readers who want cultural context, useful
                vocabulary, and less vague prediction language.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {learningPaths.map((path) => (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group border-ink-200 hover:border-brand-gold hover:shadow-ink-950/5 border-l bg-white px-5 py-5 transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                >
                  <CheckCircle2
                    className="text-brand-primary dark:text-gold-300 h-5 w-5"
                    aria-hidden="true"
                  />
                  <h3 className="text-ink-950 dark:text-paper mt-4 text-xl font-semibold">
                    {path.title}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {path.description}
                  </p>
                  <span className="text-brand-primary dark:text-gold-300 mt-5 inline-flex items-center text-sm font-semibold">
                    Open guide
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-ink-900 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold uppercase">
                Knowledge map
              </p>
              <h2 className="text-ink-950 dark:text-paper mt-3 text-3xl font-semibold sm:text-4xl">
                Six entry points into Chinese metaphysics
              </h2>
            </div>
            <Link
              href="/search"
              className="text-brand-primary dark:text-gold-300 inline-flex items-center text-sm font-semibold"
            >
              Search the knowledge base
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <Link
                  key={system.href}
                  href={system.href}
                  className="group border-ink-200 border-t pt-6 dark:border-white/10"
                >
                  <Icon
                    className="text-brand-primary dark:text-gold-300 h-7 w-7"
                    aria-hidden="true"
                  />
                  <h3 className="text-ink-950 dark:text-paper mt-4 text-xl font-semibold">
                    {system.title}
                  </h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {system.description}
                  </p>
                  <span className="text-brand-primary dark:text-gold-300 mt-4 inline-flex items-center text-sm font-semibold">
                    Learn more
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper dark:bg-ink-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold uppercase">
                Latest guides
              </p>
              <h2 className="text-ink-950 dark:text-paper mt-3 text-3xl font-semibold sm:text-4xl">
                Start with the foundations
              </h2>
              <Link
                href="/blog"
                className="text-brand-primary dark:text-gold-300 mt-6 inline-flex items-center text-sm font-semibold"
              >
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.href}
                  className="border-ink-200 border-t bg-white px-5 py-6 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-brand-primary dark:text-gold-300 text-xs font-semibold uppercase">
                    {post.category}
                  </p>
                  <h3 className="text-ink-950 dark:text-paper mt-4 text-xl leading-7 font-semibold">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <BookOpen className="text-gold-300 h-9 w-9" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold">Try the free Bazi calculator</h2>
            <p className="text-brand-50 mt-3 max-w-2xl text-base leading-7">
              Generate a structured Four Pillars chart and use it as a clear reference before deeper
              interpretation.
            </p>
          </div>
          <Link
            href="/tools/bazi-calculator"
            className="text-brand-primary hover:bg-gold-100 inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            Open the calculator
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-paper dark:bg-ink-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FAQSection faqs={homepageFaqs} />
        </div>
      </section>
    </>
  );
}
