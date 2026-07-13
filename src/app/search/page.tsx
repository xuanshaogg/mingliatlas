import type { Metadata } from "next";
import { Suspense } from "react";
import SearchDirectory from "@/components/search/SearchDirectory";
import { publishedSitePages } from "@/lib/content/sitePages";

export const metadata: Metadata = {
  title: "Search",
  description: "Find guides, tools, and learning resources across the site.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
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
          Type a topic, system, tool, or keyword to find the most useful guide.
        </p>

        <Suspense
          fallback={
            <div className="mt-10 rounded-lg border border-ink-200 bg-white p-6 text-sm text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
              Loading search directory...
            </div>
          }
        >
          <SearchDirectory pages={publishedSitePages} />
        </Suspense>
      </div>
    </main>
  );
}
