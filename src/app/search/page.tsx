import { isPreviewDeployment } from "@/lib/seo/environment";
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
    follow: !isPreviewDeployment,
  },
};

export default function SearchPage() {
  return (
    <section className="bg-paper dark:bg-ink-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="atlas-eyebrow">Search</p>
        <h1 className="atlas-page-title mt-5">Search the knowledge base</h1>
        <p className="atlas-page-intro mt-5 max-w-3xl">
          Type a topic, system, tool, or keyword to find the most useful guide.
        </p>

        <Suspense
          fallback={
            <div className="border-ink-200 text-ink-600 dark:text-ink-300 mt-10 rounded-lg border bg-white p-6 text-sm dark:border-white/10 dark:bg-white/5">
              Loading search directory...
            </div>
          }
        >
          <SearchDirectory pages={publishedSitePages} />
        </Suspense>
      </div>
    </section>
  );
}
