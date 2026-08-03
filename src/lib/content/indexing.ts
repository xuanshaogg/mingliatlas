const INDEXABLE_PATH_LIST = [
  "/",
  "/about",
  "/contact",
  "/tools",
  "/tools/bazi-calculator",
  "/tools/i-ching-oracle",
  "/tools/zodiac-compatibility",
  "/blog",
  "/blog/day-master-bazi-complete-guide",
  "/blog/chinese-zodiac-compatibility-chart",
  "/blog/i-ching-beginners-reading-guide",
  "/blog/ren-water-day-master",
  "/bazi",
  "/bazi/what-is-bazi",
  "/bazi/five-elements",
  "/bazi/heavenly-stems",
  "/bazi/earthly-branches",
  "/bazi/ten-gods",
  "/bazi/luck-pillars",
  "/chinese-zodiac",
  "/chinese-zodiac/rat",
  "/chinese-zodiac/tiger",
  "/chinese-zodiac/dragon",
  "/chinese-zodiac/2026-forecast",
  "/i-ching",
  "/i-ching/eight-trigrams",
  "/i-ching/how-to-cast",
  "/i-ching/sixty-four-hexagrams",
  "/i-ching/hexagram-1",
  "/i-ching/hexagram-2",
  "/i-ching/hexagram-29",
  "/i-ching/hexagram-30",
  "/i-ching/hexagram-63",
  "/i-ching/hexagram-64",
  "/feng-shui",
  "/ziwei",
] as const;

export const INDEXABLE_PATHS: readonly string[] = INDEXABLE_PATH_LIST;

// First recovery cohort after the 2026-07-24 GSC coverage snapshot showed
// 27 sitemap URLs as "Discovered - currently not indexed". Keep this list
// small enough to monitor URL by URL before expanding to the next cluster.
export const INDEXING_PRIORITY_PATHS = [
  "/tools/bazi-calculator",
  "/bazi",
  "/bazi/what-is-bazi",
  "/bazi/five-elements",
  "/i-ching",
  "/tools/i-ching-oracle",
  "/chinese-zodiac",
] as const;

const indexablePathSet = new Set<string>(INDEXABLE_PATH_LIST);

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isIndexablePath(path: string): boolean {
  return indexablePathSet.has(normalizePath(path));
}

export function filterIndexablePages<T extends { href: string }>(pages: readonly T[]): T[] {
  return pages.filter((page) => isIndexablePath(page.href));
}
