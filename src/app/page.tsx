import { buildPageMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
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
    number: "01",
    icon: CalendarDays,
    description: "Four Pillars, Day Master, Ten Gods, elements, and life-pattern timing.",
  },
  {
    title: "Ziwei Doushu",
    href: "/ziwei",
    number: "02",
    icon: Stars,
    description: "Palaces, major stars, transformations, and chart-based life areas.",
  },
  {
    title: "I Ching",
    href: "/i-ching",
    number: "03",
    icon: Hexagon,
    description: "Hexagrams, changing lines, trigrams, and structured reflection.",
  },
  {
    title: "Feng Shui",
    href: "/feng-shui",
    number: "04",
    icon: Compass,
    description: "Qi flow, front doors, bedrooms, desks, and practical space reading.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    number: "05",
    icon: Orbit,
    description: "Twelve signs, yearly cycles, harmony, and clashes.",
  },
  {
    title: "Free Tools",
    href: "/tools",
    number: "06",
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
    title: "Day Master Is the Day Stem — Complete Guide",
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

function HeroMark() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(231,203,189,0.45)_0%,rgba(239,242,236,0.5)_48%,transparent_72%)] lg:ml-auto"
    >
      <div className="absolute inset-5 rounded-full border border-white/90" />
      <div className="border-brand-200/50 absolute inset-[16%] rounded-full border" />
      <div className="absolute inset-[31%] rounded-full border border-white" />
      <span className="bg-brand-300 absolute top-[24%] left-[15%] h-3 w-3 rounded-full ring-8 ring-white/60" />
      <span className="bg-ink-400 absolute right-[12%] bottom-[26%] h-2 w-2 rounded-full ring-8 ring-white/60" />
      <div className="absolute top-[45%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[2.25rem] border border-white bg-white/90 px-8 py-7 shadow-[0_20px_60px_-24px_rgb(83_74_54_/_0.22)] sm:px-10 sm:py-9">
        <Image
          src="/logo-icon.svg"
          alt=""
          width={120}
          height={120}
          priority
          className="h-24 w-24 sm:h-28 sm:w-28"
        />
        <span className="text-brand-primary mt-4 text-2xl font-medium tracking-[0.18em]">命理</span>
      </div>
      <span className="text-ink-600 absolute top-[17%] right-[2%] rounded-full border border-white bg-white/90 px-4 py-2.5 text-xs font-medium shadow-sm sm:text-sm">
        Five Elements
      </span>
      <span className="text-ink-600 absolute bottom-[24%] left-0 rounded-full border border-white bg-white/90 px-4 py-2.5 text-xs font-medium shadow-sm sm:text-sm">
        Four Pillars
      </span>
      <div className="text-ink-500 absolute inset-x-0 bottom-[5%] flex justify-center gap-2 text-xs">
        <span>Pattern</span>
        <span aria-hidden="true">·</span>
        <span>Timing</span>
        <span aria-hidden="true">·</span>
        <span>Context</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={featuredToolsSchema} />
      <JsonLd data={homepageFaqSchema} />
      <JsonLd data={mingliEntitySchema} />
      <JsonLd data={searchIntentSchema} />

      <section className="from-paper-100 via-paper-50 to-brand-50 relative mx-3 overflow-hidden rounded-[2rem] bg-gradient-to-br sm:mx-6 sm:rounded-[2.5rem]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-12 lg:py-14">
          <div className="relative z-10 max-w-2xl">
            <p className="home-reveal text-brand-primary inline-flex rounded-full bg-white/80 px-3.5 py-2 text-xs leading-5 font-semibold">
              Free Bazi, I Ching &amp; Chinese Zodiac tools
            </p>
            <h1 className="home-reveal home-reveal-delay text-ink-950 mt-5 max-w-2xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.12] font-semibold tracking-[-0.055em] sm:mt-6">
              Mingli Atlas
            </h1>
            <p className="home-reveal home-reveal-delay-2 text-ink-600 mt-7 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              Build a free Four Pillars chart, find your Day Master, compare Chinese zodiac signs,
              or cast the I Ching with clear English guidance and no sign-up.
            </p>
            <div className="home-reveal home-reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools/bazi-calculator" className="atlas-button-primary group">
                Build your Bazi chart{" "}
                <ArrowUpRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/learn/beginners-guide" className="atlas-button-secondary">
                Start with the basics
              </Link>
            </div>
            <div className="text-ink-500 mt-8 flex items-center gap-3 text-xs leading-6">
              <span className="bg-brand-300 h-1.5 w-1.5 shrink-0 rounded-full" />
              {SITE.tagline}
            </div>
          </div>
          <div className="home-reveal home-reveal-delay-2 relative z-10 hidden sm:block">
            <HeroMark />
          </div>
        </div>
      </section>

      <section className="px-5 pt-6 sm:px-8 lg:px-10" aria-label="Popular starting points">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          {toolPaths.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="atlas-surface group hover:border-brand-200 flex items-center justify-between gap-4 p-5 transition-colors sm:p-6"
            >
              <span>
                <span className="text-ink-500 block text-xs font-medium">
                  0{index + 1} / {tool.label}
                </span>
                <span className="text-ink-950 mt-2 block text-lg font-semibold tracking-tight">
                  {tool.title}
                </span>
              </span>
              <ArrowRight
                className="text-brand-primary h-4 w-4 flex-none transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="mingli-meaning">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="atlas-eyebrow">Mingli meaning</p>
            <h2 id="mingli-meaning" className="atlas-section-title mt-5 max-w-lg">
              Mingli means life-pattern principles.
            </h2>
          </div>
          <div>
            <p className="text-ink-650 max-w-3xl text-base leading-8">
              Mingli, also searched as Ming Li, is the Chinese term 命理. It describes the
              principles used to read timing, temperament, and recurring life patterns through Bazi,
              Ziwei Doushu, the Chinese zodiac calendar, and related classical systems.
            </p>
            <Link
              href="/bazi/glossary"
              className="text-brand-primary decoration-brand-300 hover:text-brand-700 mt-5 inline-flex items-center text-sm font-semibold underline underline-offset-8 transition"
            >
              Explore the Chinese metaphysics glossary{" "}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {mingliMeaningPoints.map((point) => (
                <div key={point.label} className="bg-paper-100/70 rounded-2xl p-5">
                  <p className="text-ink-500 text-xs font-medium">{point.label}</p>
                  <p className="text-ink-950 mt-3 text-3xl font-medium">{point.value}</p>
                  <p className="text-ink-600 mt-3 text-sm leading-6">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="atlas-eyebrow">Start with a question</p>
            <h2 className="atlas-section-title mt-5 max-w-md">
              Useful answers, before the jargon.
            </h2>
            <p className="text-ink-600 mt-5 max-w-md text-base leading-7">
              Choose a practical entry point and learn only the vocabulary you need next.
            </p>
            <Link
              href="/search"
              className="text-brand-primary decoration-brand-300 hover:text-brand-700 mt-8 inline-flex items-center text-sm font-semibold underline underline-offset-8 transition"
            >
              Search the atlas <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="border-ink-200 border-t">
            {searchIntentLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border-ink-200 grid gap-4 border-b py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:gap-6"
              >
                <span className="text-brand-primary font-mono text-xs tracking-[0.16em]">
                  0{index + 1}
                </span>
                <span>
                  <span className="text-ink-950 group-hover:text-brand-primary block text-xl font-semibold tracking-tight transition-colors">
                    {item.title}
                  </span>
                  <span className="text-ink-600 mt-2 block max-w-xl text-sm leading-6">
                    {item.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="text-ink-400 group-hover:text-brand-primary mt-1 h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-100/70 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end">
            <div>
              <p className="atlas-eyebrow">The knowledge map</p>
              <h2 className="atlas-section-title mt-5 max-w-2xl">
                Six traditions, one clear starting point.
              </h2>
            </div>
            <p className="text-ink-600 max-w-sm text-sm leading-6">
              Each system answers a different kind of question. Explore the one that fits yours.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <Link
                  key={system.href}
                  href={system.href}
                  className="atlas-surface group hover:border-brand-200 p-6 transition-colors sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="text-brand-primary h-6 w-6" aria-hidden="true" />
                    <span className="text-ink-400 font-mono text-xs tracking-[0.15em]">
                      {system.number}
                    </span>
                  </div>
                  <h3 className="text-ink-950 group-hover:text-brand-primary mt-6 text-2xl font-semibold tracking-tight transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-ink-600 mt-3 max-w-xs text-sm leading-6">
                    {system.description}
                  </p>
                  <span className="text-brand-primary mt-5 inline-flex items-center text-sm font-semibold">
                    Explore{" "}
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

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="atlas-eyebrow">Latest guides</p>
            <h2 className="atlas-section-title mt-5 max-w-md">A better first read.</h2>
            <Link
              href="/blog"
              className="text-brand-primary decoration-brand-300 hover:text-brand-700 mt-8 inline-flex items-center text-sm font-semibold underline underline-offset-8 transition"
            >
              View all articles <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <article key={post.href} className="atlas-surface p-6">
                <p className="text-brand-primary text-xs font-medium">
                  0{index + 1} / {post.category}
                </p>
                <h3 className="text-ink-950 mt-3 text-xl leading-snug font-semibold">
                  <Link href={post.href} className="hover:text-brand-primary transition">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-ink-600 mt-4 text-sm leading-6">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 text-paper mx-3 rounded-3xl px-6 py-12 sm:mx-6 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <BookOpen className="text-gold-300 h-8 w-8" aria-hidden="true" />
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
              Turn a birth date into a readable chart.
            </h2>
          </div>
          <Link
            href="/tools/bazi-calculator"
            className="group text-ink-900 hover:bg-paper-200 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold transition-colors"
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
