export const termMap = {
  "Wu Xing": "/bazi/five-elements",
  "Five Elements": "/bazi/five-elements",
  "Tian Gan": "/bazi/heavenly-stems",
  "Heavenly Stems": "/bazi/heavenly-stems",
  "Di Zhi": "/bazi/earthly-branches",
  "Earthly Branches": "/bazi/earthly-branches",
  "Shi Shen": "/bazi/ten-gods",
  "Ten Gods": "/bazi/ten-gods",
  "Luck Pillars": "/bazi/luck-pillars",
  Bazi: "/bazi",
  "Chinese Zodiac": "/chinese-zodiac",
  "I Ching": "/i-ching",
  "Feng Shui": "/feng-shui",
  "Ziwei Doushu": "/ziwei",
} as const;

export type KnownTerm = keyof typeof termMap;
