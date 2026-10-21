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
    <section className="bg-paper dark:bg-ink-950 px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
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
          <h1 className="atlas-page-title mt-4">
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
          className="border-ink-200 -mx-5 mt-10 flex flex-nowrap gap-2 overflow-x-auto border-y px-5 py-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 dark:border-white/10"
        >
          {categoryOrder
            .filter((category) => allBlogPosts.some((post) => post.category === category))
            .map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
                className="text-ink-700 hover:text-brand-primary dark:text-ink-200 inline-flex min-h-11 shrink-0 items-center rounded-lg px-3 text-sm font-semibold transition hover:bg-white dark:hover:bg-white/5"
              >
                {category}
              </a>
            ))}
        </div>

        <div className="mt-12 space-y-14">
          {categoryOrder
            .filter((category) => sortedPosts.some((post) => post.category === category))
            .map((category) => (
              <section
                key={category}
                id={category.toLowerCase().replaceAll(" ", "-")}
                className="scroll-mt-4 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12"
              >
                <h2 className="atlas-section-title lg:pt-5 lg:text-[1.75rem]">{category}</h2>
                <div className="border-ink-200 mt-5 grid gap-x-10 border-t sm:grid-cols-2 lg:mt-0 dark:border-white/10">
                  {sortedPosts
                    .filter((post) => post.category === category)
                    .map((post) => (
                      <article
                        key={post.path}
                        className="group border-ink-200 relative border-b py-5 dark:border-white/10"
                      >
                        <h3 className="text-ink-950 dark:text-paper group-hover:text-brand-primary text-[1.375rem] leading-snug transition-colors">
                          <Link
                            href={canonicalContentPath(post.path)}
                            className="after:absolute after:inset-0"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-ink-700 dark:text-ink-300 mt-2 text-[0.9375rem] leading-7">
                          {post.description}
                        </p>
                        <span
                          aria-hidden="true"
                          className="text-brand-primary dark:text-gold-300 mt-3 inline-flex items-center text-sm font-semibold"
                        >
                          Read article
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </article>
                    ))}
                </div>
              </section>
            ))}
        </div>

        <div className="border-ink-200 mt-14 flex gap-4 border-t pt-6 dark:border-white/10">
          <BookOpen
            className="text-brand-primary dark:text-gold-300 mt-1 h-5 w-5 flex-none"
            aria-hidden="true"
          />
          <p className="text-ink-700 dark:text-ink-200 max-w-3xl text-sm leading-7">
            Articles are kept focused and practical, with source notes and internal links that help
            you move from definitions to tools and deeper learning paths.
          </p>
        </div>
      </div>
    </section>
  );
}
