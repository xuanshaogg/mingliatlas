# Audit Summary — Content Quality Baseline

Generated: 2026-05-26

## Discovery Results

| Item | Value |
|------|-------|
| Content files scanned | 7 |
| Analyzed content pages | 114 |
| Average quality score | 75 |
| High-risk pages | 75 |
| Priority pages needing work | 19 |
| sitePages.ts exists | true |
| termMap.ts (camelCase) | true |
| term-map.ts (kebab-case) | true |

## Section Summary

- Bazi: 15 pages, 6 priority, average score 84, 1 high-risk
- Blog: 33 pages, 0 priority, average score 76, 20 high-risk
- Chinese Zodiac: 3 pages, 3 priority, average score 69, 0 high-risk
- Feng Shui: 19 pages, 3 priority, average score 72, 18 high-risk
- I Ching: 1 pages, 1 priority, average score 76, 0 high-risk
- Learn: 6 pages, 2 priority, average score 74, 0 high-risk
- Ziwei: 37 pages, 4 priority, average score 71, 36 high-risk

## Top Action Items

- /feng-shui/home/bedroom (Feng Shui, C/64): expand — word count 455/1200; high template risk
- /feng-shui/home/front-door (Feng Shui, C/64): expand — word count 455/1200; high template risk
- /ziwei/major-stars (Ziwei, C/64): expand — word count 438/1200; high template risk
- /ziwei/twelve-palaces (Ziwei, C/64): expand — word count 439/1200; high template risk
- /ziwei/ziwei-vs-bazi (Ziwei, C/64): expand — word count 438/1200; high template risk
- /chinese-zodiac/compatibility (Chinese Zodiac, C/66): expand — word count 739/1200
- /chinese-zodiac (Chinese Zodiac, C/68): expand — word count 1039/1500
- /learn/which-system (Learn, B/70): expand — word count 324/1200
- /chinese-zodiac/2026-forecast (Chinese Zodiac, B/72): expand — word count 924/1200
- /feng-shui/home/kitchen (Feng Shui, B/72): expand — word count 453/650; high template risk
- /feng-shui/office/company-entrance (Feng Shui, B/72): expand — word count 453/650; high template risk
- /feng-shui/office/meeting-room (Feng Shui, B/72): expand — word count 453/650; high template risk
- /feng-shui/yin-yang-balance (Feng Shui, B/72): expand — word count 453/650; high template risk
- /ziwei/body-palace (Ziwei, B/72): expand — word count 441/650; high template risk
- /ziwei/four-transformations (Ziwei, B/72): expand — word count 438/650; high template risk

## Notes

- The audit estimates rendered text from content source blocks, JSX paragraphs, stats, FAQs, and links. It is stricter than the current GEO unit test because it highlights thin or highly templated pages even when required fields exist.
- Generic citations are counted separately from named classical texts, books, or specific authors. Priority pages should move toward named, verifiable sources.
- `term-map.ts` currently re-exports `termMap.ts`; keep it as a compatibility wrapper unless imports are consolidated.
