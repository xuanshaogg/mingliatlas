import { buildCollectionPageSchema, JsonLd } from "@/lib/seo/jsonLd";
import { SITE } from "@/lib/constants";
import { canonicalContentPath } from "@/lib/content/urls";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { allBlogPosts } from "@/content/blog/posts";

export const metadata: Metadata = buildPageMetadata({
  title: "Bazi, I Ching & Chinese Zodiac Guides",
  description:
    "Practical articles on Bazi (Four Pillars), I Ching readings, Ziwei Doushu, Feng Shui, and Chinese zodiac — clear guides that skip the jargon.",
  path: "/blog",
});

const categoryOrder = [
  "Bazi Guide",
  "I Ching Guide",
  "Ziwei Guide",
  "Feng Shui Guide",
  "Zodiac Guide",
  "Yearly Forecast",
  "Comparison",
  "Career Story",
  "Self-Check",
];

export default function BlogIndexPage() {
  const sortedPosts = [...allBlogPosts].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  return (
    <section className="bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={buildCollectionPageSchema({
          name: "Chinese metaphysics articles and practical guides",
          description: "Guides organized by Bazi, I Ching, Feng Shui, Ziwei and Chinese Zodiac.",
          url: `${SITE.url}/blog`,
          items: sortedPosts.map((post) => ({
            name: post.title,
            description: post.description,
            url: `${SITE.url}${canonicalContentPath(post.path)}`,
          })),
        })}
      />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="atlas-eyebrow">Blog</p>
          <h1 className="atlas-page-title mt-5">
            Chinese metaphysics articles and practical guides
          </h1>
          <p className="atlas-page-intro mt-5 max-w-3xl">
            Browse focused explainers on Bazi, I Ching, Ziwei Doushu, Feng Shui, Chinese zodiac,
            yearly cycles, and practical self-reflection.
          </p>
        </div>

        <div
          role="group"
          aria-label="Browse article categories"
          className="-mx-4 mt-8 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {categoryOrder
            .filter((category) => allBlogPosts.some((post) => post.category === category))
            .map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
                className="border-ink-200 text-ink-700 hover:border-brand-gold hover:text-brand-primary dark:text-ink-200 min-h-11 shrink-0 rounded-full border bg-white px-4 py-2 text-sm font-semibold transition dark:border-white/10 dark:bg-white/5"
              >
                {category}
              </a>
            ))}
        </div>

        <div className="mt-12 space-y-12">
          {categoryOrder
            .filter((category) => sortedPosts.some((post) => post.category === category))
            .map((category) => (
              <section
                key={category}
                id={category.toLowerCase().replaceAll(" ", "-")}
                className="scroll-mt-4"
              >
                <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
                  {category}
                </h2>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {sortedPosts
                    .filter((post) => post.category === category)
                    .map((post) => (
                      <article
                        key={post.path}
                        className="atlas-surface hover:border-brand-200 p-5 transition-colors sm:p-6"
                      >
                        <p className="text-brand-primary dark:text-gold-300 text-xs font-semibold tracking-normal">
                          {post.category}
                        </p>
                        <h3 className="text-ink-950 dark:text-paper mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                          <Link href={canonicalContentPath(post.path)}>{post.title}</Link>
                        </h3>
                        <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                          {post.description}
                        </p>
                        <Link
                          href={canonicalContentPath(post.path)}
                          className="text-brand-primary dark:text-gold-300 mt-5 inline-flex items-center text-sm font-semibold"
                        >
                          Read article
                          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </article>
                    ))}
                </div>
              </section>
            ))}
        </div>

        <div className="border-gold-300/70 bg-gold-50 dark:border-gold-500/30 dark:bg-gold-500/10 mt-12 rounded-[1.25rem] border p-6">
          <BookOpen className="text-brand-primary dark:text-gold-300 h-6 w-6" aria-hidden="true" />
          <p className="text-ink-700 dark:text-ink-200 mt-3 text-sm leading-7">
            Articles are kept focused and practical, with source notes and internal links that help
            you move from definitions to tools and deeper learning paths.
          </p>
        </div>
      </div>
    </section>
  );
}
