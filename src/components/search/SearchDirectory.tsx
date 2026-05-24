"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { SitePage } from "@/lib/content/sitePages";

interface SearchDirectoryProps {
  pages: SitePage[];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export default function SearchDirectory({ pages }: SearchDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [section, setSection] = useState("All");

  const sections = useMemo(() => ["All", ...Array.from(new Set(pages.map((page) => page.section)))], [pages]);
  const normalizedQuery = normalize(query);

  function updateQuery(nextQuery: string): void {
    setQuery(nextQuery);

    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    } else {
      params.delete("q");
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchesSection = section === "All" || page.section === section;
      const searchableText = normalize(`${page.title} ${page.description} ${page.section}`);
      return matchesSection && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [normalizedQuery, pages, section]);

  return (
    <div className="mt-10">
      <label htmlFor="site-search" className="sr-only">
        Search guides and tools
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
          aria-hidden="true"
        />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Search Bazi, I Ching, zodiac, tools..."
          className="h-14 w-full rounded-lg border border-ink-200 bg-white pl-12 pr-12 text-base text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-paper"
        />
        {query ? (
          <button
            type="button"
            onClick={() => updateQuery("")}
            className="absolute right-4 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-paper"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter results by section">
        {sections.map((item) => {
          const active = item === section;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setSection(item)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                active
                  ? "border-brand-primary bg-brand-primary text-white dark:border-gold-300 dark:bg-gold-300 dark:text-ink-950"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-gold hover:text-brand-primary dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:text-gold-200"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-ink-500 dark:text-ink-400" aria-live="polite">
        Showing {filteredPages.length} of {pages.length} pages
      </p>

      {filteredPages.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {filteredPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-lg border border-ink-200 bg-white px-4 py-4 transition hover:border-brand-gold hover:shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-sm font-semibold text-brand-primary dark:text-gold-300">{page.section}</div>
              <div className="mt-1 text-base font-semibold text-ink-950 dark:text-paper">{page.title}</div>
              <div className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{page.description}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xl font-semibold tracking-tight text-ink-950 dark:text-paper">No matching pages</h2>
          <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
            Try a broader term such as Bazi, zodiac, element, hexagram, or compatibility.
          </p>
          <button
            type="button"
            onClick={() => {
              updateQuery("");
              setSection("All");
            }}
            className="mt-4 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Reset search
          </button>
        </div>
      )}
    </div>
  );
}
