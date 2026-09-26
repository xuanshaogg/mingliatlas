"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { SitePage } from "@/lib/content/sitePages";
import { searchPages } from "@/lib/search";

const PAGE_SIZE = 12;
const suggestions = ["Day Master", "Five Elements", "I Ching", "Compatibility"];

export default function SearchDirectory({ pages }: { pages: SitePage[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const sections = useMemo(
    () => ["All", ...Array.from(new Set(pages.map((page) => page.section)))],
    [pages]
  );
  const requestedSection = searchParams.get("section") ?? "All";
  const section = sections.includes(requestedSection) ? requestedSection : "All";
  const [pagination, setPagination] = useState({ key: "", count: PAGE_SIZE });
  const inputRef = useRef<HTMLInputElement>(null);
  const resultKey = query + "\u0000" + section;
  const visibleCount = pagination.key === resultKey ? pagination.count : PAGE_SIZE;
  const matches = useMemo(() => searchPages(pages, query), [pages, query]);
  const filtered = matches.filter((page) => section === "All" || page.section === section);
  const counts = new Map(
    sections.map((item) => [
      item,
      item === "All" ? matches.length : matches.filter((page) => page.section === item).length,
    ])
  );
  const visiblePages = filtered.slice(0, visibleCount);

  function updateSearch(nextQuery: string, nextSection: string, push = false): void {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) params.set("q", nextQuery);
    else params.delete("q");
    if (nextSection !== "All") params.set("section", nextSection);
    else params.delete("section");
    const url = params.size ? pathname + "?" + params : pathname;
    if (push) window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
    setPagination({ key: "", count: PAGE_SIZE });
  }

  function reset(): void {
    updateSearch("", "All");
    inputRef.current?.focus();
  }

  return (
    <div className="mt-8">
      <div className="atlas-surface p-4 sm:p-6">
        <label htmlFor="site-search" className="text-ink-900 dark:text-paper text-sm font-semibold">
          Search guides and tools
        </label>
        <div className="relative mt-3">
          <Search
            className="text-brand-primary pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            maxLength={160}
            onChange={(event) => updateSearch(event.target.value, section)}
            placeholder="Try “Bazi Day Master”"
            className="atlas-input h-14 pr-14 pl-12 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                updateSearch("", section);
                inputRef.current?.focus();
              }}
              className="text-ink-500 hover:bg-paper-100 absolute top-1/2 right-1.5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        {!query ? (
          <div className="text-ink-500 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span>Popular:</span>
            {suggestions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => updateSearch(value, "All")}
                className="text-brand-primary decoration-brand-200 hover:decoration-brand-primary dark:text-gold-300 min-h-9 font-medium underline underline-offset-4"
              >
                {value}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-[12rem_minmax(0,1fr)]">
        <div>
          <label
            htmlFor="search-section"
            className="text-ink-500 flex items-center gap-2 text-xs font-semibold tracking-normal"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Browse by topic
          </label>
          <select
            id="search-section"
            value={section}
            onChange={(event) => updateSearch(query, event.target.value, true)}
            className="atlas-input mt-3 h-12 md:hidden"
          >
            {sections.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All topics" : item} ({counts.get(item)})
              </option>
            ))}
          </select>
          <div
            className="mt-3 hidden space-y-1 md:block"
            role="group"
            aria-label="Filter results by section"
          >
            {sections.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={section === item}
                onClick={() => updateSearch(query, item, true)}
                className={
                  "flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-sm transition " +
                  (section === item
                    ? "bg-brand-primary font-semibold text-white"
                    : "text-ink-600 dark:text-ink-300 hover:bg-white dark:hover:bg-white/5")
                }
              >
                <span>{item === "All" ? "All topics" : item}</span>
                <span
                  className={
                    "text-xs tabular-nums " + (section === item ? "text-white/80" : "text-ink-500")
                  }
                >
                  {counts.get(item)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="border-ink-200 mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3 dark:border-white/10">
            <p
              className="text-ink-600 dark:text-ink-300 max-w-full min-w-0 text-sm [overflow-wrap:anywhere]"
              role="status"
            >
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
              {query.trim()
                ? " for “" + query.trim() + "”"
                : " across " + (section === "All" ? "the atlas" : section)}
            </p>
            {query || section !== "All" ? (
              <button
                type="button"
                onClick={reset}
                className="text-brand-primary dark:text-gold-300 min-h-9 text-xs font-semibold"
              >
                Clear filters
              </button>
            ) : null}
          </div>
          {filtered.length ? (
            <>
              <div id="search-results" className="grid gap-3">
                {visiblePages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    prefetch={false}
                    className="atlas-surface group hover:border-brand-200 flex gap-4 p-5 transition hover:shadow-md"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-brand-primary dark:text-gold-300 text-[0.68rem] font-semibold tracking-normal">
                        {page.section}
                      </span>
                      <h2 className="text-ink-950 group-hover:text-brand-primary dark:text-paper mt-2 text-lg leading-7 font-semibold tracking-tight">
                        {page.title}
                      </h2>
                      <p className="text-ink-600 dark:text-ink-300 mt-2 line-clamp-3 text-sm leading-6">
                        {page.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="text-brand-primary mt-2 h-4 w-4 shrink-0 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-ink-500 text-xs" aria-live="polite">
                  Showing {visiblePages.length} of {filtered.length}
                </p>
                {visibleCount < filtered.length ? (
                  <button
                    type="button"
                    aria-controls="search-results"
                    onClick={() => {
                      setPagination({ key: resultKey, count: visibleCount + PAGE_SIZE });
                      requestAnimationFrame(() => {
                        const firstNewResult =
                          document.querySelectorAll<HTMLAnchorElement>("#search-results > a")[
                            visibleCount
                          ];
                        firstNewResult?.focus({ preventScroll: true });
                      });
                    }}
                    className="atlas-button-secondary"
                  >
                    Show {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more results
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div className="atlas-surface px-5 py-10 text-center">
              <Search className="text-ink-400 mx-auto h-8 w-8" aria-hidden="true" />
              <h2 className="text-ink-950 dark:text-paper mt-4 text-xl font-semibold">
                No matching pages
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mx-auto mt-2 max-w-sm text-sm leading-6">
                Try fewer words or choose another topic. You can also explore the atlas from the
                beginning.
              </p>
              <button type="button" onClick={reset} className="atlas-button-primary mt-5">
                Reset search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
