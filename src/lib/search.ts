import type { SitePage } from "@/lib/content/sitePages";

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function searchPages(pages: SitePage[], query: string): SitePage[] {
  const normalized = normalizeSearch(query);
  const tokens = [...new Set(normalized.split(/\s+/).filter(Boolean))];

  return pages
    .map((page, index) => {
      const title = normalizeSearch(page.title);
      const haystack = `${title} ${normalizeSearch(page.description)} ${normalizeSearch(page.section)}`;
      if (!tokens.every((token) => haystack.includes(token))) return null;
      const score = !normalized
        ? page.section === "Tools"
          ? 10
          : 0
        : (title === normalized ? 100 : 0) +
          (title.startsWith(normalized) ? 40 : 0) +
          (title.includes(normalized) ? 20 : 0) +
          tokens.filter((token) => title.includes(token)).length * 5;
      return { page, score, index };
    })
    .filter((match): match is { page: SitePage; score: number; index: number } => match !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ page }) => page);
}
