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
    <section className="bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="atlas-eyebrow">HTML Sitemap</p>
        <h1 className="atlas-page-title mt-5">Site map</h1>
        <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-3xl text-lg leading-8">
          A human-readable index of the published site structure.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {Array.from(grouped.entries()).map(([section, pages]) => (
            <section key={section} className="atlas-surface p-6">
              <h2 className="text-ink-950 dark:text-paper text-2xl font-semibold tracking-tight">
                {section}
              </h2>
              <ul className="mt-4 space-y-4">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 text-base font-semibold underline"
                    >
                      {page.title}
                    </Link>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm leading-6">
                      {page.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
