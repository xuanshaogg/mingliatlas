import type { Metadata } from "next";
import SearchDirectory from "@/components/search/SearchDirectory";
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
          Type a topic, system, tool, or keyword to find the most useful guide.
        </p>

        <SearchDirectory pages={publishedSitePages} />
      </div>
    </main>
  );
}
