import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Coins, HeartHandshake } from "lucide-react";
import { SITE } from "@/lib/constants";
import { buildItemListSchema, JsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Tools",
  description: "Free calculators and guided workflows for Bazi, Chinese Zodiac, I Ching, and Chinese metaphysics.",
  alternates: {
    canonical: "/tools",
  },
};

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
      <JsonLd data={itemListSchema} />
      <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">Tools</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
            Free tools
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-600 dark:text-ink-300">
            Use these browser-friendly workflows for quick charts, I Ching reflection, and zodiac compatibility checks.
          </p>

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
        </div>
      </main>
    </>
  );
}
