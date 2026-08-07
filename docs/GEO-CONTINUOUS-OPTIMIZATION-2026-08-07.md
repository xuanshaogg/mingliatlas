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

## Real-user performance baseline

Vercel Speed Insights currently exposes a seven-day maximum on this project, so the performance baseline below is a rolling seven-day view rather than a 30-day view.

### Desktop

- Overall: RES 93 from 184 route-level data points, FCP 2.57s, LCP 2.57s, INP 64ms, CLS 0.01, FID 16ms, and TTFB 1.06s.
- Interaction and visual stability are healthy. The two watch metrics are LCP, which is 0.07s over the good threshold, and TTFB, which is 0.26s over the good threshold.
- `/tools/bazi-calculator`: RES 81 from 43 data points; LCP 2.76s from 13 LCP samples and TTFB 0.74s from 17 TTFB samples. The good TTFB and slightly slow LCP make initial client/page weight a plausible future experiment, but the current sample is too small for an immediate redesign.
- `/blog/[slug]`: RES 88 from 36 data points; LCP 2.98s from 11 samples and TTFB 0.99s from 13 samples. Continue observing before making template-wide changes.
- `/`: RES 78 from 22 data points; LCP 4.88s and TTFB 0.67s, each from only six samples. If the LCP result persists after at least 25 samples, inspect the hero, font/CSS arrival, and above-the-fold rendering.
- `/chinese-zodiac/[...slug]`: RES 96 from 25 data points and LCP 2.10s from nine samples, despite TTFB 2.09s from eight samples. This mixed result and the regional pattern below argue against rewriting the route template now.
- One-to-four-sample poor scores on Feng Shui, the Chinese Zodiac hub, and the compatibility tool are observations, not decision-grade evidence.

Country data is highly uneven: Singapore measured 0.54s TTFB and 2.00s LCP, while the United States measured 4.67s TTFB and 5.79s LCP. The production pages are statically prerendered and a live Singapore edge-cache check returned `x-vercel-cache: HIT`, with warm TTFB between 0.27s and 0.56s across the principal routes. Treat the current desktop gap primarily as a geography/cache-distribution signal until route samples are larger.

### Mobile

The mobile aggregate cards currently show no value, even though the route table contains about 110 data points. Use route-level RES until Vercel provides a stable aggregate:

- `/tools/bazi-calculator`: RES 99 from 58 data points.
- `/`: RES 97 from 26 data points.
- `/blog/[slug]`: RES 98 from 23 data points.
- `/i-ching`: RES 100 from four data points.

These results do not support a broad mobile or calculator redesign.

## Phased plan after indexing recovery

### Phase 1 — hold and measure through 2026-08-21

- Keep the three 2026-08-07 snippet experiments unchanged for 14 days: Dragon years, Day Master/day stem, and Zodiac Compatibility triads/clashes.
- Do not resubmit the seven recovered URLs unless Google reports a new indexing or canonical problem.
- Record GSC page/query deltas after 7 and 14 days, but make the first success/failure decision only after the full 14-day hold.
- Confirm `calculator_completed`, `related_content_clicked`, and `subscribe_clicked` counts in Vercel Analytics before adding any new retention component; the production event adapter now sends the same event taxonomy to Vercel, GA4, and Plausible when configured.

### Phase 2 — select no more than three evidence-backed experiments

1. **CTR:** keep a page eligible when it has at least 100 impressions, average position 5–20, and CTR below 1%. Prioritize the Dragon, Day Master, and compatibility cohorts already selected.
2. **Visit depth:** if the calculator still dominates landings and bounce remains above 65%, optimize the existing result-to-guide path first. Judge it by related-content click rate, not by adding generic homepage modules.
3. **Performance:** only open a route-level performance change when the route has at least 25 metric samples and exceeds the relevant threshold in two consecutive seven-day reviews. For the Bazi calculator, the first candidate is to defer the sample chart/calculation payload while preserving the immediately usable form and answer-first content. For the homepage, inspect the hero only if LCP remains above 2.5s with good TTFB.

### Phase 3 — expand the winning pattern

- Apply a snippet pattern to adjacent pages only after the original cohort improves CTR without losing ranking.
- Apply a calculator performance change to other tools only after it improves LCP without reducing `calculator_completed`.
- Preserve citations, direct answers, schema, canonicals, `llms.txt`, and stable URLs in every expansion.

## Measurement cadence and decision rules

- Every 7 days: record GSC 7-day clicks, impressions, CTR, average position, and the top ten pages and queries; record Vercel visitors, page views, bounce rate, top pages, and AI/search referrers.
- Every 28 days: compare against this baseline and select at most three snippet/content experiments.
- Prioritize URLs with at least 100 impressions, positions 5–20, and CTR below 1%.
- Hold title and answer changes for 14 days unless indexing or rendering is broken; avoid daily rewrites that prevent attribution.
- Preserve or improve citations, direct answers, canonical URLs, structured data, and internal reading paths in every experiment.
- Treat route-level Speed Insights rows with fewer than 25 samples as directional only.
- Open a performance experiment after two consecutive seven-day windows above LCP 2.5s or TTFB 0.8s, not after a single outlier window.
- If LCP is slow while TTFB is good, investigate above-the-fold payload/rendering. If both are slow and the country split is large, investigate edge geography and cache behavior before changing page code.

## Next review targets

- Raise sitewide 7-day CTR from 0.6% toward 0.9% while maintaining or improving average position.
- Earn the first clicks for the Dragon years cluster without losing its top-ten query positions.
- Reduce 7-day bounce rate from 69% toward 65% by improving result-to-guide continuation rather than adding intrusive prompts.
- Keep AI referrers at or above 10% of measured visitors and monitor whether ChatGPT/Copilot traffic grows after citation-focused pages are refreshed.
- Keep desktop RES at or above 90 while moving LCP below 2.5s and TTFB below 0.8s on decision-grade samples.
- Preserve the current route-level mobile RES of at least 95 on the homepage, Bazi calculator, and blog template.
