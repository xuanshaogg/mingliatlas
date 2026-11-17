// Decorative Chinese glyph shown behind a knowledge page title. Purely visual:
// it is rendered aria-hidden and never enters titles, metadata, or schema.
const zodiacGlyphs: Record<string, string> = {
  rat: "鼠",
  ox: "牛",
  tiger: "虎",
  rabbit: "兔",
  dragon: "龍",
  snake: "蛇",
  horse: "馬",
  goat: "羊",
  monkey: "猴",
  rooster: "雞",
  dog: "狗",
  pig: "豬",
};

const sectionGlyphs: Record<string, string> = {
  bazi: "命",
  ziwei: "紫",
  "i-ching": "易",
  "feng-shui": "風",
  "chinese-zodiac": "肖",
  learn: "學",
  blog: "文",
};

export function pageGlyph(pathname: string): string | undefined {
  const [section, slug] = pathname.split("/").filter(Boolean);
  if (!section) return undefined;
  if (section === "chinese-zodiac" && slug && zodiacGlyphs[slug]) return zodiacGlyphs[slug];
  return sectionGlyphs[section];
}
