# Growth foundation — 2026-09-23

## Changes

CTA locations previously sent as `source` now reach GA as `content_placement`. Plausible keeps its existing property. GA acquisition reports contain values such as `result_secondary / (not set)`; this change removes the ambiguous campaign field but does not retroactively repair attribution or prove every historical anomaly's cause.

The Luck Pillars guide, FAQ/JSON-LD, CTA and llms.txt now reflect the existing calculator: selecting male or female enables the traditional direction rule and Da Yun cycles; omitting it leaves the natal chart available without cycles. The selected page's modification date changes to 2026-09-23. Search titles, descriptions and the 36-route indexing registry stay stable.

## Reproducible synthetic checks

Enter 1990-01-01, 12:00, Asia/Shanghai, civil time, with each optional gender choice:

| Choice | Expected direction | First three cycles | Start date |
|---|---|---|---|
| Female | Forward | 丁丑, 戊寅, 己卯 | 1991-06-21 |
| Male | Reverse | 乙亥, 甲戌, 癸酉 | Compare displayed method; start-date fixture not independently validated |
| Not specified | None | No cycles | None |

These are deterministic regression examples of the library's traditional rule, not independent validation of all calendrical conventions or predictions.

## Validation

- Isolated release branch: 109 tests across 16 files pass; changed files pass ESLint.
- Prisma generation and TypeScript check pass.
- Standard Next 16.2.6 Turbopack production build passes (261 generated pages).
- Strict local site audit passes: 36 sitemap entries, 36 full-llms entries, 4 RSS entries, 2 homepage font preloads; compatibility initial JavaScript 686,677 bytes below 750,000 ceiling.
- Served HTML, FAQ JSON-LD and llms.txt agree on the conditional support. llms-full.txt is a description index and contains no contradictory support claim.
- An exploratory webpack build hits a preexisting share-card route export validation error; standard project build passes. No unrelated route change is included.

## Release and measurement

Register an event-scoped GA4 custom dimension whose event parameter is `content_placement`. The current read-only API credentials cannot perform that admin action; report generation clearly marks the dimension unavailable until it exists and has processed data.

Record the actual production deployment time as the migration boundary; 2026-09-23 is the code preparation date, not evidence of deployment. Confirm a GA request contains `content_placement` and omits `source` after deployment, then inspect processed data 24–48 hours later. Keep legacy and new dimension reports separate and do not add their user/session counts.

This release excludes preexisting advertising/privacy work in the original checkout. Production deployment and resulting traffic/indexing changes are not asserted by this document.
