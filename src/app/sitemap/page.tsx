import Link from "next/link";
import type { Metadata } from "next";
import { groupPagesBySection, publishedSitePages } from "@/lib/content/sitePages";

export const metadata: Metadata = {
  title: "HTML Sitemap",
  description: "Human-readable sitemap for all published pages.",
  alternates: {
    canonical: "/sitemap",
  },
  // Navigation aid only: keep it crawlable (follow) so bots discover pages,
  // but out of the index so it stops competing with real content pages for
  // impressions (GSC 2026-07-05: /sitemap had 188 impressions, rank 16.8).
  robots: {
    index: false,
    follow: true,
  },
};

export default function HtmlSitemapPage() {
  const grouped = groupPagesBySection(publishedSitePages);

  return (
    <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
          HTML Sitemap
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
          Site map
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-600 dark:text-ink-300">
          A human-readable index of the published site structure.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {Array.from(grouped.entries()).map(([section, pages]) => (
            <section key={section} className="rounded-[1.25rem] border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper">{section}</h2>
              <ul className="mt-4 space-y-4">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-base font-semibold text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">
                      {page.title}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{page.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
