import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { allBlogPosts } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on Bazi, I Ching, Ziwei Doushu, Feng Shui, Chinese zodiac, and comparative metaphysics.",
  alternates: {
    canonical: "/blog",
  },
};

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
    <section className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
            Chinese metaphysics articles and practical guides
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
            Browse focused explainers on Bazi, I Ching, Ziwei Doushu, Feng Shui, Chinese zodiac, yearly cycles, and practical self-reflection.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categoryOrder
            .filter((category) => allBlogPosts.some((post) => post.category === category))
            .map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-gold hover:text-brand-primary dark:border-white/10 dark:bg-white/5 dark:text-ink-200"
              >
                {category}
              </a>
            ))}
        </div>

        <div className="mt-12 space-y-12">
          {categoryOrder
            .filter((category) => sortedPosts.some((post) => post.category === category))
            .map((category) => (
              <section key={category} id={category.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">{category}</h2>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {sortedPosts
                    .filter((post) => post.category === category)
                    .map((post) => (
                      <article key={post.path} className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-gold-300">
                          {post.category}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">
                          <Link href={post.path}>{post.title}</Link>
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{post.description}</p>
                        <Link href={post.path} className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
                          Read article
                          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </article>
                    ))}
                </div>
              </section>
            ))}
        </div>

        <div className="mt-12 rounded-[1.25rem] border border-gold-300/70 bg-gold-50 p-6 dark:border-gold-500/30 dark:bg-gold-500/10">
          <BookOpen className="h-6 w-6 text-brand-primary dark:text-gold-300" aria-hidden="true" />
          <p className="mt-3 text-sm leading-7 text-ink-700 dark:text-ink-200">
            Articles are kept focused and practical, with source notes and internal links that help you move from definitions to tools and deeper learning paths.
          </p>
        </div>
      </div>
    </section>
  );
}
