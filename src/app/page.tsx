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
import { SITE } from "@/lib/constants";
import { buildItemListSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Chinese Metaphysics Guides and Free Tools",
  description:
    "Discover Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese Zodiac through modern guides, structured explanations, and free tools.",
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
  description: "Free Chinese metaphysics tools for Bazi charts, I Ching reflection, and zodiac compatibility.",
  url: SITE.url,
  items: toolPaths.map((tool) => ({
    name: tool.title,
    description: tool.description,
    url: `${SITE.url}${tool.href}`,
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
];

function HeroAtlasPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="absolute -left-8 top-8 hidden h-32 w-32 border-l border-t border-gold-300/50 lg:block" />
      <div className="absolute -right-6 bottom-10 hidden h-32 w-32 border-b border-r border-brand-primary/30 lg:block" />

      <div className="relative overflow-hidden rounded-lg border border-ink-200 bg-white shadow-2xl shadow-ink-950/10 dark:border-white/10 dark:bg-ink-900">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink-950 dark:text-paper">
            <Layers3 className="h-4 w-4 text-brand-primary dark:text-gold-300" aria-hidden="true" />
            Mingli Atlas workspace
          </div>
          <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800 dark:bg-gold-500/15 dark:text-gold-200">
            Free tools
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-ink-100 p-5 dark:border-white/10 lg:border-b-0 lg:border-r">
            <div className="rounded-lg border border-ink-200 bg-paper px-4 py-3 dark:border-white/10 dark:bg-ink-950">
              <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
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
                  <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white dark:bg-gold-300 dark:text-ink-950">
                    {label.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-primary dark:text-gold-300">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink-700 dark:text-ink-200">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper-50 p-5 dark:bg-ink-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-brand-primary dark:text-gold-300">
                  Bazi preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink-950 dark:text-paper">
                  Yang Fire Day Master
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  A structured chart reference before interpretation.
                </p>
              </div>
              <ShieldCheck className="h-6 w-6 text-brand-primary dark:text-gold-300" aria-hidden="true" />
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
                  className="rounded-lg border border-ink-200 bg-white px-2 py-3 text-center dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs font-semibold uppercase text-ink-500 dark:text-ink-400">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-ink-950 dark:text-paper">{pillar}</p>
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
                <div key={element} className="grid grid-cols-[4.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm">
                  <span className="font-medium text-ink-800 dark:text-ink-100">{element}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                    <span className="block h-full rounded-full bg-brand-primary dark:bg-gold-300" style={{ width: value }} />
                  </span>
                  <span className="text-right font-semibold text-ink-600 dark:text-ink-300">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-ink-950 p-4 text-paper dark:bg-white dark:text-ink-950">
              <p className="text-xs font-semibold uppercase text-gold-300 dark:text-brand-primary">
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
      <section className="relative isolate overflow-hidden border-b border-ink-100 bg-paper dark:border-white/10 dark:bg-ink-950">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(139,0,0,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-14 lg:pt-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-brand-primary dark:text-gold-300">
              {SITE.name}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold text-ink-950 dark:text-paper sm:text-6xl lg:text-7xl">
              Chinese metaphysics guides and free tools
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-ink-700 dark:text-ink-200">
              Learn Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese Zodiac with clear explanations, structured charts, and practical reflection tools.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/bazi-calculator"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Calculate your Bazi chart
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/learn/beginners-guide"
                className="inline-flex items-center justify-center rounded-full border border-ink-300 bg-white/80 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-brand-gold hover:text-brand-primary dark:border-white/15 dark:bg-white/10 dark:text-paper"
              >
                Start learning
              </Link>
            </div>

            <div className="mt-8 max-w-xl border-l-2 border-brand-primary bg-white/70 px-4 py-3 text-sm leading-6 text-ink-700 shadow-sm dark:bg-white/5 dark:text-ink-200">
              <strong className="text-ink-950 dark:text-paper">Quick answer:</strong> start with Five Elements and the Chinese Zodiac, then use Bazi for birth-chart structure, I Ching for decisions, and Feng Shui for space.
            </div>
          </div>

          <HeroAtlasPreview />
        </div>
      </section>

      <section className="bg-white px-4 py-5 dark:bg-ink-900 sm:px-6 lg:px-8" aria-label="Popular starting points">
        <div className="mx-auto grid max-w-7xl gap-3 text-sm sm:grid-cols-3">
          {toolPaths.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center justify-between gap-4 border-b border-ink-200 py-4 text-ink-900 transition hover:border-brand-gold hover:text-brand-primary dark:border-white/10 dark:text-paper dark:hover:text-gold-200 sm:border-b-0"
            >
              <span>
                <span className="block text-xs font-semibold uppercase text-brand-primary dark:text-gold-300">
                  {tool.label}
                </span>
                <span className="mt-1 block font-semibold">{tool.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 flex-none transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper px-4 py-20 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-primary dark:text-gold-300">
                Choose your path
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink-950 dark:text-paper sm:text-4xl">
                Find the system that matches your question
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">
                Each guide is written for Western readers who want cultural context, useful vocabulary, and less vague prediction language.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {learningPaths.map((path) => (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group border-l border-ink-200 bg-white px-5 py-5 transition hover:border-brand-gold hover:shadow-lg hover:shadow-ink-950/5 dark:border-white/10 dark:bg-white/5"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-primary dark:text-gold-300" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-ink-950 dark:text-paper">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{path.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
                    Open guide
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 dark:bg-ink-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-primary dark:text-gold-300">
                Knowledge map
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink-950 dark:text-paper sm:text-4xl">
                Six entry points into Chinese metaphysics
              </h2>
            </div>
            <Link href="/search" className="inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
              Search the knowledge base
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <Link key={system.href} href={system.href} className="group border-t border-ink-200 pt-6 dark:border-white/10">
                  <Icon className="h-7 w-7 text-brand-primary dark:text-gold-300" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-ink-950 dark:text-paper">{system.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{system.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-20 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-primary dark:text-gold-300">
                Latest guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink-950 dark:text-paper sm:text-4xl">
                Start with the foundations
              </h2>
              <Link href="/blog" className="mt-6 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.href} className="border-t border-ink-200 bg-white px-5 py-6 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase text-brand-primary dark:text-gold-300">
                    {post.category}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold leading-7 text-ink-950 dark:text-paper">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <BookOpen className="h-9 w-9 text-gold-300" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold">Try the free Bazi calculator</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-50">
              Generate a structured Four Pillars chart and use it as a clear reference before deeper interpretation.
            </p>
          </div>
          <Link
            href="/tools/bazi-calculator"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:bg-gold-100"
          >
            Open the calculator
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
