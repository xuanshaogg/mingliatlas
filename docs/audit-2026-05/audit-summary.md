# Audit Summary — Content Quality Baseline

Generated: 2026-07-12

## Discovery Results

| Item | Value |
|------|-------|
| Content files scanned | 7 |
| Analyzed content pages | 113 |
| Average quality score | 69 |
| High-risk pages | 81 |
| Priority pages needing work | 18 |
| sitePages.ts exists | true |
| termMap.ts (camelCase) | true |
| term-map.ts (kebab-case) | true |

## Section Summary

- Bazi: 14 pages, 5 priority, average score 75, 7 high-risk
- Blog: 33 pages, 0 priority, average score 65, 20 high-risk
- Chinese Zodiac: 3 pages, 3 priority, average score 71, 0 high-risk
- Feng Shui: 19 pages, 3 priority, average score 70, 18 high-risk
- I Ching: 1 pages, 1 priority, average score 76, 0 high-risk
- Learn: 6 pages, 2 priority, average score 75, 0 high-risk
- Ziwei: 37 pages, 4 priority, average score 69, 36 high-risk

## Top Action Items

- /blog/bedroom-feng-shui-rest (Blog, C/63): expand — word count 640/800; high template risk
- /blog/earthly-branches-hidden-stems (Blog, C/63): expand — word count 638/800; high template risk
- /blog/eight-trigrams-meaning (Blog, C/63): expand — word count 644/800; high template risk
- /blog/feng-shui-home-basics (Blog, C/63): expand — word count 642/800; high template risk
- /blog/fire-element-visibility (Blog, C/63): expand — word count 638/800; high template risk
- /blog/front-door-feng-shui (Blog, C/63): expand — word count 644/800; high template risk
- /blog/heavenly-stems-beginner-guide (Blog, C/63): expand — word count 643/800; high template risk
- /blog/hexagram-1-creative-modern-reading (Blog, C/63): expand — word count 639/800; high template risk
- /blog/hexagram-2-receptive-modern-reading (Blog, C/63): expand — word count 639/800; high template risk
- /blog/how-to-cast-i-ching-coins (Blog, C/63): expand — word count 643/800; high template risk
- /blog/luck-pillars-life-cycles (Blog, C/63): expand — word count 640/800; high template risk
- /blog/office-desk-feng-shui (Blog, C/63): expand — word count 642/800; high template risk
- /blog/rat-and-horse-clash (Blog, C/63): expand — word count 642/800; high template risk
- /blog/ten-gods-bazi-relationships (Blog, C/63): expand — word count 641/800; high template risk
- /blog/wood-element-career-style (Blog, C/63): expand — word count 640/800; high template risk

## Notes

- The audit estimates rendered text from content source blocks, JSX paragraphs, stats, FAQs, and links. It is stricter than the current GEO unit test because it highlights thin or highly templated pages even when required fields exist.
- Generic citations are counted separately from named classical texts, books, or specific authors. Priority pages should move toward named, verifiable sources.
- `term-map.ts` currently re-exports `termMap.ts`; keep it as a compatibility wrapper unless imports are consolidated.
