// Existing permanent redirects. Navigation should link straight to the destination.
export const CONTENT_REDIRECTS = [
  { source: "/blog/what-is-bazi", destination: "/bazi/what-is-bazi" },
  { source: "/bazi/free-calculator", destination: "/tools/bazi-calculator" },
  {
    source: "/chinese-zodiac/compatibility",
    destination: "/blog/chinese-zodiac-compatibility-chart",
  },
  // Retired 2026-10-20: placeholder "case study" pages about real people that
  // contained no case material.
  { source: "/bazi/celebrity/elon-musk", destination: "/bazi" },
  { source: "/bazi/celebrity/taylor-swift", destination: "/bazi" },
// Template pages consolidated on 2026-10-20. Each had under ~200 words of
// page-specific text; the destination covers the same topic in full.
  { source: "/ziwei/body-palace", destination: "/ziwei" },
  { source: "/ziwei/four-transformations", destination: "/ziwei" },
  { source: "/ziwei/life-palace", destination: "/ziwei" },
  { source: "/ziwei/major-stars", destination: "/ziwei" },
  { source: "/ziwei/major-stars/jumen", destination: "/ziwei" },
  { source: "/ziwei/major-stars/lianzhen", destination: "/ziwei" },
  { source: "/ziwei/major-stars/pojun", destination: "/ziwei" },
  { source: "/ziwei/major-stars/qisha", destination: "/ziwei" },
  { source: "/ziwei/major-stars/taiyang", destination: "/ziwei" },
  { source: "/ziwei/major-stars/taiyin", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tanlang", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tianfu", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tianji", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tianliang", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tiantong", destination: "/ziwei" },
  { source: "/ziwei/major-stars/tianxiang", destination: "/ziwei" },
  { source: "/ziwei/major-stars/wuqu", destination: "/ziwei" },
  { source: "/ziwei/major-stars/ziwei-star", destination: "/ziwei" },
  { source: "/ziwei/minor-stars", destination: "/ziwei" },
  { source: "/ziwei/palaces/career-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/children-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/friends-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/health-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/life-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/mental-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/parents-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/property-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/siblings-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/spouse-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/travel-palace", destination: "/ziwei" },
  { source: "/ziwei/palaces/wealth-palace", destination: "/ziwei" },
  { source: "/ziwei/reading-chart", destination: "/ziwei" },
  { source: "/ziwei/twelve-palaces", destination: "/ziwei" },
  { source: "/ziwei/what-is-ziwei-doushu", destination: "/ziwei" },
  { source: "/ziwei/ziwei-compatibility", destination: "/ziwei" },
  { source: "/ziwei/ziwei-vs-bazi", destination: "/ziwei" },
  { source: "/feng-shui/bagua-map", destination: "/feng-shui" },
  { source: "/feng-shui/eight-mansions", destination: "/feng-shui" },
  { source: "/feng-shui/five-elements", destination: "/feng-shui" },
  { source: "/feng-shui/flying-stars", destination: "/feng-shui" },
  { source: "/feng-shui/home/bedroom", destination: "/feng-shui" },
  { source: "/feng-shui/home/front-door", destination: "/feng-shui" },
  { source: "/feng-shui/home/garden", destination: "/feng-shui" },
  { source: "/feng-shui/home/kitchen", destination: "/feng-shui" },
  { source: "/feng-shui/home/living-room", destination: "/feng-shui" },
  { source: "/feng-shui/home/study", destination: "/feng-shui" },
  { source: "/feng-shui/luo-pan-compass", destination: "/feng-shui" },
  { source: "/feng-shui/office/company-entrance", destination: "/feng-shui" },
  { source: "/feng-shui/office/desk", destination: "/feng-shui" },
  { source: "/feng-shui/office/meeting-room", destination: "/feng-shui" },
  { source: "/feng-shui/office/wealth-corner", destination: "/feng-shui" },
  { source: "/feng-shui/qi-flow", destination: "/feng-shui" },
  { source: "/feng-shui/what-is-feng-shui", destination: "/feng-shui" },
  { source: "/feng-shui/yin-yang-balance", destination: "/feng-shui" },
  { source: "/bazi/career", destination: "/bazi" },
  { source: "/bazi/health", destination: "/bazi" },
  { source: "/bazi/relationships", destination: "/bazi" },
  { source: "/blog/heavenly-stems-beginner-guide", destination: "/bazi/heavenly-stems" },
  { source: "/blog/earthly-branches-hidden-stems", destination: "/bazi/earthly-branches" },
  { source: "/blog/ten-gods-bazi-relationships", destination: "/bazi/ten-gods" },
  { source: "/blog/luck-pillars-life-cycles", destination: "/bazi/luck-pillars" },
  { source: "/blog/eight-trigrams-meaning", destination: "/i-ching/eight-trigrams" },
  { source: "/blog/how-to-cast-i-ching-coins", destination: "/i-ching/how-to-cast" },
  { source: "/blog/hexagram-1-creative-modern-reading", destination: "/i-ching/hexagram-1" },
  { source: "/blog/hexagram-2-receptive-modern-reading", destination: "/i-ching/hexagram-2" },
  { source: "/blog/ziwei-doushu-beginners", destination: "/ziwei" },
  { source: "/blog/ziwei-12-palaces", destination: "/ziwei" },
  { source: "/blog/ziwei-major-stars-overview", destination: "/ziwei" },
  { source: "/blog/ziwei-life-palace-meaning", destination: "/ziwei" },
  { source: "/blog/feng-shui-home-basics", destination: "/feng-shui" },
  { source: "/blog/front-door-feng-shui", destination: "/feng-shui" },
  { source: "/blog/bedroom-feng-shui-rest", destination: "/feng-shui" },
  { source: "/blog/year-of-the-horse-2026-guide", destination: "/chinese-zodiac/2026-forecast" },
  { source: "/blog/rat-and-horse-clash", destination: "/blog/chinese-zodiac-compatibility-chart" },
  { source: "/blog/wood-element-career-style", destination: "/bazi/five-elements" },
  { source: "/blog/fire-element-visibility", destination: "/bazi/five-elements" },
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
