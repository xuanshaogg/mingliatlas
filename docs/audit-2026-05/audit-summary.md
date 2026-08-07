# Audit Summary — Content Quality Baseline

Generated: 2026-08-07

## Discovery Results

| Item | Value |
|------|-------|
| Content files scanned | 7 |
| Analyzed content pages | 106 |
| Average quality score | 69 |
| High-risk pages | 74 |
| Priority pages needing work | 13 |
| Indexable content pages | 15 |
| Indexable average quality score | 87 |
| Indexable pages below A | 3 |
| sitePages.ts exists | true |
| termMap.ts (camelCase) | true |
| term-map.ts (kebab-case) | true |

## Section Summary

- Bazi: 7 pages, 5 priority, average score 85, 0 high-risk
- Blog: 33 pages, 0 priority, average score 64, 20 high-risk
- Chinese Zodiac: 3 pages, 3 priority, average score 86, 0 high-risk
- Feng Shui: 19 pages, 3 priority, average score 66, 18 high-risk
- I Ching: 1 pages, 1 priority, average score 88, 0 high-risk
- Learn: 6 pages, 2 priority, average score 92, 0 high-risk
- Ziwei: 37 pages, 4 priority, average score 65, 36 high-risk

## Top Action Items

- /blog/chinese-zodiac-compatibility-guide (Blog, C/58): expand — word count 303/800; generic citations; medium template risk
- /blog/day-master-meaning (Blog, C/59): expand — word count 322/800; generic citations; medium template risk
- /feng-shui/home/bedroom (Feng Shui, C/59): expand — word count 392/1200; high template risk
- /feng-shui/home/front-door (Feng Shui, C/59): expand — word count 392/1200; high template risk
- /ziwei/major-stars (Ziwei, C/59): expand — word count 369/1200; high template risk
- /ziwei/twelve-palaces (Ziwei, C/59): expand — word count 370/1200; high template risk
- /ziwei/ziwei-vs-bazi (Ziwei, C/59): expand — word count 369/1200; high template risk
- /blog/bedroom-feng-shui-rest (Blog, C/60): expand — word count 640/800; generic citations; high template risk
- /blog/earthly-branches-hidden-stems (Blog, C/60): expand — word count 638/800; generic citations; high template risk
- /blog/eight-trigrams-meaning (Blog, C/60): expand — word count 644/800; generic citations; high template risk
- /blog/feng-shui-home-basics (Blog, C/60): expand — word count 642/800; generic citations; high template risk
- /blog/fire-element-visibility (Blog, C/60): expand — word count 638/800; generic citations; high template risk
- /blog/front-door-feng-shui (Blog, C/60): expand — word count 644/800; generic citations; high template risk
- /blog/heavenly-stems-beginner-guide (Blog, C/60): expand — word count 643/800; generic citations; high template risk
- /blog/hexagram-1-creative-modern-reading (Blog, C/60): expand — word count 639/800; generic citations; high template risk

## Notes

- The audit estimates rendered text from content source blocks, JSX paragraphs, stats, FAQs, and links. It is stricter than the current GEO unit test because it highlights thin or highly templated pages even when required fields exist.
- Generic citations are counted separately from named classical texts, books, or specific authors. Priority pages should move toward named, verifiable sources.
- `term-map.ts` currently re-exports `termMap.ts`; keep it as a compatibility wrapper unless imports are consolidated.
