import Link from "next/link";
import type { Metadata } from "next";
import { publishedSitePages } from "@/lib/content/sitePages";

export const metadata: Metadata = {
  title: "Search",
  description: "Find guides, tools, and learning resources across the site.",
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  return (
    <main className="bg-paper px-4 py-12 dark:bg-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">Search</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
          Search the knowledge base
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
          This is a lightweight directory while the full indexed search tool is still in development.
        </p>

        <div className="mt-10 grid gap-3">
          {publishedSitePages.slice(0, 18).map((page) => (
            <Link key={page.href} href={page.href} className="rounded-lg border border-ink-200 bg-white px-4 py-4 transition hover:border-brand-gold dark:border-white/10 dark:bg-white/5">
              <div className="text-sm font-semibold text-brand-primary dark:text-gold-300">{page.section}</div>
              <div className="mt-1 text-base font-semibold text-ink-950 dark:text-paper">{page.title}</div>
              <div className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{page.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
