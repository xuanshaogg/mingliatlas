// Existing permanent redirects. Navigation should link straight to the destination.
export const CONTENT_REDIRECTS = [
  { source: "/blog/what-is-bazi", destination: "/bazi/what-is-bazi" },
  { source: "/bazi/free-calculator", destination: "/tools/bazi-calculator" },
  {
    source: "/chinese-zodiac/compatibility",
    destination: "/blog/chinese-zodiac-compatibility-chart",
  },
] as const;

const CONTENT_ALIASES = new Map<string, string>(
  CONTENT_REDIRECTS.map(({ source, destination }) => [source, destination])
);

export function canonicalContentPath(path: string): string {
  const suffixIndex = path.search(/[?#]/);
  const pathname = (suffixIndex < 0 ? path : path.slice(0, suffixIndex)).replace(/\/+$/, "") || "/";
  const suffix = suffixIndex < 0 ? "" : path.slice(suffixIndex);
  return (CONTENT_ALIASES.get(pathname) ?? pathname) + suffix;
}

export function isCanonicalContentPath(path: string): boolean {
  return canonicalContentPath(path) === path;
}

export function uniqueContentLinks<T extends { href: string }>(
  links: readonly T[],
  currentPath?: string
): T[] {
  const seen = new Set<string>();
  return links
    .map((link) => ({ ...link, href: canonicalContentPath(link.href) }))
    .filter((link) => {
      if (link.href === currentPath || seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    });
}
