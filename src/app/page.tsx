import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  Hexagon,
  Mountain,
  Orbit,
  Sparkles,
  Stars,
} from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Chinese Metaphysics Guides and Free Tools",
  description:
    "Discover Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese Zodiac through modern guides, structured explanations, and free tools.",
  alternates: {
    canonical: "/",
  },
};

const sections = [
  {
    title: "Bazi",
    href: "/bazi",
    icon: CalendarDays,
    description: "Understand Four Pillars of Destiny through stems, branches, elements, and life cycles.",
  },
  {
    title: "Ziwei Doushu",
    href: "/ziwei",
    icon: Stars,
    description: "Explore Purple Star Astrology palaces, stars, and personality patterns with clear examples.",
  },
  {
    title: "I Ching",
    href: "/i-ching",
    icon: Hexagon,
    description: "Learn the Book of Changes through 64 hexagrams, changing lines, and reflective questions.",
  },
  {
    title: "Feng Shui",
    href: "/feng-shui",
    icon: Compass,
    description: "Apply spatial harmony principles to homes, desks, doors, and everyday environments.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    icon: Orbit,
    description: "Decode twelve animal signs, yearly cycles, and cultural symbolism without oversimplification.",
  },
  {
    title: "Free Tools",
    href: "/tools",
    icon: Sparkles,
    description: "Try calculators and guided workflows for Bazi charts, elements, compatibility, and more.",
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

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,#f4e8c4,transparent_32%),linear-gradient(135deg,#fdfbf7_0%,#f7efe3_45%,#fff_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.22),transparent_32%),linear-gradient(135deg,#111110_0%,#1a1a2e_60%,#111110_100%)]">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full border border-brand-gold/40" />
          <div className="absolute right-8 top-28 h-48 w-48 rounded-full border border-brand-primary/20" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-paper to-transparent dark:from-ink-950" />
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="inline-flex items-center rounded-full border border-brand-gold/40 bg-white/70 px-4 py-2 text-sm font-medium text-brand-primary shadow-sm dark:bg-white/10 dark:text-gold-200">
              {SITE.tagline}
            </p>
            <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-6xl lg:text-7xl">
              Discover Your Life Blueprint Through Ancient Chinese Wisdom
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-700 dark:text-ink-200 sm:text-xl">
              Explore Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese Zodiac with modern explanations, structured guides, and free tools designed for clear self-reflection.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/bazi-calculator"
                className="inline-flex items-center justify-center rounded-full border border-ink-300 bg-white/70 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-brand-gold hover:text-brand-primary dark:border-white/15 dark:bg-white/10 dark:text-paper"
              >
                Try Our Free Tools
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-brand-primary/10 backdrop-blur dark:border-white/10 dark:bg-white/10">
              <div className="aspect-square rounded-[1.5rem] bg-[conic-gradient(from_180deg,#8B0000,#C9A84C,#2D5A27,#1A1A2E,#8B0000)] p-[1px]">
                <div className="flex h-full flex-col justify-between rounded-[1.45rem] bg-paper p-6 dark:bg-ink-950">
                  <Mountain className="h-12 w-12 text-brand-gold" aria-hidden="true" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-ink-500 dark:text-ink-300">
                      Five Phases
                    </p>
                    <p className="mt-4 text-3xl font-semibold text-ink-950 dark:text-paper">
                      Wood · Fire · Earth · Metal · Water
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-ink-600 dark:text-ink-300">
                    A modern visual language for classical cycles, built for readers who want context before conclusions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-20 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
              Explore the system
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-4xl">
              Six entry points into Chinese metaphysics
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Each section is written for Western readers who want cultural accuracy, practical structure, and accessible language.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group rounded-[1.5rem] border border-ink-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-gold hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                >
                  <Icon className="h-8 w-8 text-brand-primary dark:text-gold-300" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-ink-950 dark:text-paper">{section.title}</h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-ink-600 dark:text-ink-300">
                    {section.description}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 dark:bg-ink-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
                Latest guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-4xl">
                Start with the foundations
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
              View all articles
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.href} className="rounded-[1.5rem] border border-ink-200 bg-paper p-6 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-gold-300">
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
      </section>

      <section className="bg-brand-primary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <BookOpen className="h-9 w-9 text-gold-300" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Try Our Free Bazi Calculator</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-50">
              Generate a structured Four Pillars chart and learn how classical Chinese texts organize time, elements, and life patterns.
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
