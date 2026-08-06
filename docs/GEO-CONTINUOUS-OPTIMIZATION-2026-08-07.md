# GEO continuous optimization baseline — 2026-08-07

## Current traffic baseline

Google Search Console was last updated about 6.5 hours before this review and reports data through 2026-08-04.

- Last 7 days: 13 clicks, 2,298 impressions, 0.6% CTR, average position 17.4.
- Last 28 days: 38 clicks, 6,990 impressions, 0.5% CTR, average position 18.9.
- The primary constraint is click-through rate, not discovery: impressions and rankings are already emerging.

Vercel Web Analytics reports:

- Last 7 days: 103 visitors (+34%), 191 page views (+4%), 69% bounce rate (+7%).
- Last 30 days: 605 visitors (+187%), 1,233 page views (+235%), 68% bounce rate (-4%).
- Last 30 days referrers: Google 131 visitors, ChatGPT 63, Bing 22, DuckDuckGo 14, Copilot 3.
- The Bazi calculator is the main landing experience: 359 visitors in 30 days and 40 in 7 days.

## Evidence-led priorities

The seven-page indexing recovery cohort submitted on 2026-08-03 is now fully indexed in Google: the Bazi calculator, Bazi hub, What Is Bazi, Five Elements, I Ching hub, I Ching Oracle, and Chinese Zodiac hub all returned "URL is on Google" during this review. Do not resubmit them; shift the next sprint from discovery work to CTR and engagement quality.

### 1. Improve search-result CTR on pages that already rank

- `/chinese-zodiac/dragon`: 2,984 impressions and 0 clicks in 28 days. The query `year of the dragon years list` averaged position 9.6 over 28 days and 8.4 over 7 days, but earned no clicks. Replace the repetitive title, lead with the exact years answer, and preserve the detailed cited content.
- `/blog/day-master-bazi-complete-guide`: 554 impressions and 0 clicks in 28 days. Several source-oriented queries rank between positions 6.8 and 8.9. State the Day Master/day stem equivalence directly in the title and answer block.
- `/blog/chinese-zodiac-compatibility-chart`: 604 impressions, one click, and average position 12.9 in 28 days. Surface the page's strongest differentiators—triads and clashes—in the title.

### 2. Protect the GEO channel that is already working

ChatGPT delivered 63 visitors in 30 days, making it the second-largest measured referrer. Keep answer-first summaries, named classical sources, stable canonical URLs, FAQ coverage, and `llms.txt` discovery intact. Avoid broad rewrites of cited pages without query evidence.

### 3. Improve post-landing depth without obscuring the tools

The calculator should remain fast and task-focused. Use its existing result-specific reading path and tracked related-content links as the primary retention mechanism. Evaluate `calculator_completed`, `related_content_clicked`, and `subscribe_clicked` in GA4/Plausible before adding more interface weight.

## Measurement cadence and decision rules

- Every 7 days: record GSC 7-day clicks, impressions, CTR, average position, and the top ten pages and queries; record Vercel visitors, page views, bounce rate, top pages, and AI/search referrers.
- Every 28 days: compare against this baseline and select at most three snippet/content experiments.
- Prioritize URLs with at least 100 impressions, positions 5–20, and CTR below 1%.
- Hold title and answer changes for 14 days unless indexing or rendering is broken; avoid daily rewrites that prevent attribution.
- Preserve or improve citations, direct answers, canonical URLs, structured data, and internal reading paths in every experiment.

## Next review targets

- Raise sitewide 7-day CTR from 0.6% toward 0.9% while maintaining or improving average position.
- Earn the first clicks for the Dragon years cluster without losing its top-ten query positions.
- Reduce 7-day bounce rate from 69% toward 65% by improving result-to-guide continuation rather than adding intrusive prompts.
- Keep AI referrers at or above 10% of measured visitors and monitor whether ChatGPT/Copilot traffic grows after citation-focused pages are refreshed.
