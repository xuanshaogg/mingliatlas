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
import { buildFAQPageSchema, buildItemListSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: `Mingli Atlas — Free Bazi Calculator (Ming Li) & Chinese Zodiac Guide`,
  description:
    "Mingli Atlas (Ming Li) is a free Bazi calculator and Chinese metaphysics guide: build your Four Pillars and Day Master chart, read the Chinese Zodiac compatibility chart, cast the I Ching, and learn Ziwei Doushu and Feng Shui — no sign-up.",
  alternates: { canonical: "/" },
};

const systems = [
  { title: "Bazi", href: "/bazi", number: "01", icon: CalendarDays, description: "Four Pillars, Day Master, Ten Gods, elements, and life-pattern timing." },
  { title: "Ziwei Doushu", href: "/ziwei", number: "02", icon: Stars, description: "Palaces, major stars, transformations, and chart-based life areas." },
  { title: "I Ching", href: "/i-ching", number: "03", icon: Hexagon, description: "Hexagrams, changing lines, trigrams, and structured reflection." },
  { title: "Feng Shui", href: "/feng-shui", number: "04", icon: Compass, description: "Qi flow, front doors, bedrooms, desks, and practical space reading." },
  { title: "Chinese Zodiac", href: "/chinese-zodiac", number: "05", icon: Orbit, description: "Twelve signs, yearly cycles, harmony, and clashes." },
  { title: "Free Tools", href: "/tools", number: "06", icon: Sparkles, description: "Bazi calculator, I Ching oracle, and zodiac compatibility workflows." },
];

const toolPaths = [
  { title: "Calculate a Bazi chart", href: "/tools/bazi-calculator", label: "Birth chart", description: "Generate Four Pillars, Day Master, hidden stems, Ten Gods, and element balance." },
  { title: "Ask the I Ching", href: "/tools/i-ching-oracle", label: "Reflection", description: "Cast a six-line hexagram with changing lines and a relating hexagram." },
  { title: "Compare zodiac signs", href: "/tools/zodiac-compatibility", label: "Compatibility", description: "Check harmony pairs, triads, clashes, strengths, and watchouts." },
];

const searchIntentLinks = [
  { title: "Free Bazi calculator", href: "/tools/bazi-calculator", description: "Generate Four Pillars, Day Master, Ten Gods, hidden stems, and Five Element balance." },
  { title: "Chinese zodiac years list", href: "/chinese-zodiac", description: "Find the 12 animal signs, year boundaries, elements, and the 2026 Fire Horse context." },
  { title: "Year of the Dragon", href: "/chinese-zodiac/dragon", description: "Check Dragon years, personality, compatibility, Five Element types, and 2026 guidance." },
  { title: "Chinese zodiac compatibility chart", href: "/blog/chinese-zodiac-compatibility-chart", description: "Compare harmony pairs, triads, and clash pairs across all 12 animal signs." },
];

const posts = [
  { title: "What Is Bazi? A Beginner's Guide to the Four Pillars", href: "/bazi/what-is-bazi", category: "Bazi guide", excerpt: "A practical introduction to year, month, day, and hour pillars for readers new to Chinese metaphysics." },
  { title: "Day Master Is the Day Stem — Complete Guide", href: "/blog/day-master-bazi-complete-guide", category: "Bazi guide", excerpt: "Learn how the Day Master is read through season, strength, Ten Gods, and useful elements." },
  { title: "Chinese Zodiac Compatibility Chart", href: "/blog/chinese-zodiac-compatibility-chart", category: "Zodiac guide", excerpt: "A complete compatibility chart with triads, harmony pairs, and clash pairs for all 12 animal signs." },
];

const homepageFaqs = [
  { question: "What should I start with if I am new to Chinese metaphysics?", answer: "Start with the beginner guide for yin-yang, Five Elements, and zodiac basics. If you want something personalized quickly, the Bazi calculator is the clearest first tool because it turns a birth date into a concrete chart structure." },
  { question: "What is the difference between Bazi, I Ching, and Chinese Zodiac?", answer: "Bazi is a birth-chart system based on year, month, day, and hour pillars. I Ching is a question-based reflection system built around hexagrams and changing lines. Chinese Zodiac is the 12-animal cycle and works best as cultural context rather than a full chart-reading substitute." },
  { question: "Can I use the free tools without knowing any Chinese terms?", answer: "Yes. The site explains core terms like Day Master, Ten Gods, trigrams, and harmony pairs in plain English and links deeper guides from the tool results so you can learn only the terms relevant to your question." },
];

const featuredToolsSchema = buildItemListSchema({
  name: "Featured Chinese Metaphysics Tools",
  description: "Free Chinese metaphysics tools for Bazi charts, I Ching reflection, and zodiac compatibility.",
  url: SITE.url,
  items: toolPaths.map((tool) => ({ name: tool.title, description: tool.description, url: `${SITE.url}${tool.href}` })),
});
const homepageFaqSchema = buildFAQPageSchema(homepageFaqs);
const searchIntentSchema = buildItemListSchema({
  name: "Popular Chinese Metaphysics Searches",
  description: "High-intent entry points for Bazi, Chinese zodiac years, Dragon zodiac, and compatibility.",
  url: SITE.url,
  items: searchIntentLinks.map((item) => ({ name: item.title, description: item.description, url: `${SITE.url}${item.href}` })),
});

function HeroMark() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden border border-ink-300 bg-paper-100 p-7 sm:p-10 lg:mx-0 lg:ml-auto">
      <div className="absolute inset-7 border border-ink-300 sm:inset-10" />
      <div className="absolute inset-14 rounded-full border border-brand-primary/35 sm:inset-20" />
      <div className="absolute inset-[28%] rounded-full border border-ink-300" />
      <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
      <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-primary" />
      <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
      <div className="absolute right-0 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
      <Image src="/logo-icon.svg" alt="" width={240} height={240} priority className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52" />
      <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between border-t border-ink-300 pt-4 text-xs uppercase tracking-[0.18em] text-ink-500 sm:bottom-10 sm:left-10 sm:right-10">
        <span>Pattern / timing / context</span>
        <span className="font-serif text-3xl normal-case tracking-normal text-brand-primary">命理</span>
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

      <section className="relative overflow-hidden border-b border-ink-200 bg-paper">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l border-ink-200 lg:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-10 lg:py-12">
          <div className="relative z-10 max-w-2xl">
            <p className="home-reveal text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">Free Bazi, I Ching &amp; Chinese Zodiac tools</p>
            <h1 className="home-reveal home-reveal-delay mt-6 max-w-2xl font-display text-5xl leading-[0.96] tracking-normal text-ink-950 sm:text-7xl lg:text-[5rem]">Mingli Atlas</h1>
            <p className="home-reveal home-reveal-delay-2 mt-7 max-w-xl text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">Build a free Four Pillars chart, find your Day Master, compare Chinese zodiac signs, or cast the I Ching with clear English guidance and no sign-up.</p>
            <div className="home-reveal home-reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools/bazi-calculator" className="group inline-flex items-center justify-center bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700">Build your Bazi chart <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></Link>
              <Link href="/learn/beginners-guide" className="inline-flex items-center justify-center border border-ink-300 px-6 py-3.5 text-sm font-semibold text-ink-800 transition hover:border-brand-primary hover:text-brand-primary">Start with the basics</Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-ink-500"><span className="h-px w-10 bg-brand-primary" />{SITE.tagline}</div>
          </div>
          <div className="home-reveal home-reveal-delay-2 relative z-10"><HeroMark /></div>
        </div>
      </section>

      <section className="border-b border-ink-200 bg-white" aria-label="Popular starting points">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          {toolPaths.map((tool, index) => (
            <Link key={tool.href} href={tool.href} className="group flex items-center justify-between gap-5 border-ink-200 px-5 py-5 transition hover:bg-paper-100 sm:px-7 sm:py-6 sm:[&+a]:border-l">
              <span><span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-primary">0{index + 1} / {tool.label}</span><span className="mt-1 block font-serif text-xl text-ink-950">{tool.title}</span></span>
              <ArrowRight className="h-4 w-4 flex-none text-brand-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Start with a question</p>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-ink-950 sm:text-5xl">Useful answers, before the jargon.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-600">Choose a practical entry point and learn only the vocabulary you need next.</p>
            <Link href="/search" className="mt-8 inline-flex items-center text-sm font-semibold text-brand-primary underline decoration-brand-300 underline-offset-8 transition hover:text-brand-700">Search the atlas <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="border-t border-ink-200">
            {searchIntentLinks.map((item, index) => (
              <Link key={item.href} href={item.href} className="group grid gap-4 border-b border-ink-200 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:gap-6">
                <span className="font-mono text-xs tracking-[0.16em] text-brand-primary">0{index + 1}</span>
                <span><span className="block font-serif text-2xl text-ink-950 transition group-hover:text-brand-primary">{item.title}</span><span className="mt-2 block max-w-xl text-sm leading-6 text-ink-600">{item.description}</span></span>
                <ArrowUpRight className="mt-1 h-5 w-5 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-paper-100 px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 border-b border-ink-200 pb-10 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">The knowledge map</p><h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink-950 sm:text-5xl">Six traditions, one clear starting point.</h2></div><p className="max-w-sm text-sm leading-6 text-ink-600">Each system answers a different kind of question. Explore the one that fits yours.</p></div>
          <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => { const Icon = system.icon; return <Link key={system.href} href={system.href} className="group border-b border-ink-200 py-8 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:px-7 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l"><div className="flex items-start justify-between gap-4"><Icon className="h-6 w-6 text-brand-primary transition-transform group-hover:-translate-y-1" aria-hidden="true" /><span className="font-mono text-xs tracking-[0.15em] text-ink-400">{system.number}</span></div><h3 className="mt-7 font-serif text-3xl text-ink-950 transition group-hover:text-brand-primary">{system.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-ink-600">{system.description}</p><span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary">Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>; })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Latest guides</p><h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-ink-950 sm:text-5xl">A better first read.</h2><Link href="/blog" className="mt-8 inline-flex items-center text-sm font-semibold text-brand-primary underline decoration-brand-300 underline-offset-8 transition hover:text-brand-700">View all articles <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></div><div className="grid gap-8 border-t border-ink-200 lg:grid-cols-3 lg:gap-6">{posts.map((post, index) => <article key={post.href} className="border-b border-ink-200 py-6 lg:border-b-0 lg:border-l lg:pl-6"><p className="font-mono text-xs tracking-[0.15em] text-brand-primary">0{index + 1} / {post.category}</p><h3 className="mt-5 font-serif text-2xl leading-tight text-ink-950"><Link href={post.href} className="transition hover:text-brand-primary">{post.title}</Link></h3><p className="mt-4 text-sm leading-6 text-ink-600">{post.excerpt}</p></article>)}</div></div>
      </section>

      <section className="bg-ink-900 px-5 py-16 text-paper sm:px-8 lg:px-10 lg:py-20"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end"><div><BookOpen className="h-8 w-8 text-gold-300" aria-hidden="true" /><h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight sm:text-6xl">Turn a birth date into a readable chart.</h2></div><Link href="/tools/bazi-calculator" className="group inline-flex shrink-0 items-center border border-white/40 px-6 py-3.5 text-sm font-semibold transition hover:border-gold-300 hover:bg-white hover:text-ink-900">Open the free calculator <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></div></section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="mx-auto max-w-4xl"><FAQSection faqs={homepageFaqs} /></div></section>
    </>
  );
}
