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

### Indexing recovery cohort B — submitted 2026-08-07

The aggregate Page indexing report is not current enough to drive URL-level decisions: it still reports data through 2026-07-24, with 24 indexed and 34 not indexed URLs, including 27 marked "Discovered — currently not indexed." Use individual URL Inspection results for this cohort until the aggregate report catches up.

The current published inventory contains 244 routes and 36 index-eligible routes. At cohort-selection time, a quality-gate audit found no finished page that should be added to the index allowlist. `/learn/resources` was the nearest candidate at a score of 79, but its 299 words were below the 650-word minimum, so it was excluded from this indexing batch.

`/bazi/earthly-branches` returned "URL is on Google" and was excluded from submission. The six URLs below returned 200, appear in the production sitemap, declare a self-referencing canonical and `index, follow`, expose six JSON-LD blocks, and have 13–23 source-level internal links each. All six indexing requests were accepted into Google's priority crawl queue on 2026-08-07 without a quota error.

| URL | Latest URL Inspection state before submission | Action |
| --- | --- | --- |
| `/tools/zodiac-compatibility` | Discovered — currently not indexed | Request accepted |
| `/bazi/heavenly-stems` | Discovered — currently not indexed | Request accepted |
| `/bazi/ten-gods` | Discovered — currently not indexed | Request accepted |
| `/bazi/luck-pillars` | Google does not know this URL | Request accepted; discovery watch |
| `/feng-shui` | Discovered — currently not indexed | Request accepted |
| `/ziwei` | Google does not know this URL | Request accepted; discovery watch |

Do not resubmit these URLs merely because the state is unchanged; Search Console explicitly notes that repeat requests do not alter queue order or priority. Keep the allowlist and sitemap stable while this batch is measured.

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

## GA4 engagement baseline

GA4 is the production source of truth for custom events because Vercel's current Hobby plan does not expose custom-event reporting.

For 2026-07-31 through 2026-08-06, GA4 reports 80 total users, 78 active users, 86 sessions, 132 page views, and 77 new users. Acquisition was led by 46 Direct sessions, 18 AI Assistant sessions, and 15 Organic Search sessions. ChatGPT accounted for 15 active users, compared with eight from Google and three from Bing. The Bazi calculator remained the leading page with 44 views, followed by the homepage with 22 and the Dragon page with five.

Seven-day engagement events:

- `calculator_completed`: 38 events from 21 users.
- `calculator_started`: 30 events from 23 users.
- `related_content_clicked`: six events from three users, or 3.75% of the 80 users in the event report.
- `share_card_clicked`: ten events from four users.
- `page_scroll_75`: 15 events from 13 users.
- No `subscribe_clicked`, `subscribe_requested`, or `subscribe_confirmed` event was recorded in this seven-day window.

For the trailing 28 days through 2026-08-06, 405 users generated 963 calculator completions from 207 users, 80 related-content clicks from 43 users, 208 share-card clicks from 71 users, two subscription clicks from two users, one subscription request, and one confirmed subscriber. This pre-registration baseline combines all tools; because custom dimensions are not retroactive, do not make tool-specific conversion claims from this window.

### Same-day measurement readiness checkpoint

The 2026-08-07 follow-up did not add another complete GSC day: Search Console remains current through 2026-08-04, so the 7-day and 28-day search baselines are unchanged. Do not interpret same-day traffic as a result of the new snippets or indexing requests.

Vercel's rolling windows moved modestly during the day:

- Seven days: 107 visitors, 213 page views, and 66% bounce rate, compared with 103, 191, and 69% at the initial checkpoint.
- Thirty days: 609 visitors, 1,255 page views, and 67% bounce rate, compared with 605, 1,233, and 68% at the initial checkpoint.
- The 30-day referrer mix is stable: Google 131 visitors, ChatGPT 63, Bing 22, DuckDuckGo 14, and Copilot three. The change is too small and the windows overlap, so it is confirmation of direction rather than a new experiment result.

The GA4 property is now linked to the verified `sc-domain:mingliatlas.com` Search Console property and the production website stream. Event-scoped custom dimensions are registered for `tool_name`, `target`, `source`, `link_rank`, `result_state`, `day_master`, and `action`. These definitions apply only to events collected after registration on 2026-08-07; wait 24–48 hours for processing before using the new breakdowns.

Desktop Speed Insights now reports RES 92 from 194 data points, FCP 2.66s, LCP 2.70s, INP 72ms, CLS 0.01, FID 16ms, and TTFB 0.99s. The Bazi calculator has RES 90 from 49 route data points, LCP 2.76s, and TTFB 0.78s. Its mobile path remains healthy at RES 99, LCP 1.37s, INP 144ms, CLS 0.09, and TTFB 0.75s. The desktop LCP signal is now large enough to watch seriously, but this same-day checkpoint overlaps the original window; wait for the next independent seven-day review before opening a performance change.

### Live monitoring checkpoint — 2026-08-07 10:59 CST

Search Console still has no newer complete reporting day: the seven-day and 28-day windows remain current through 2026-08-04, so their 13 clicks / 2,298 impressions and 38 clicks / 6,990 impressions baselines are unchanged. The separate hourly report for the trailing 24 hours shows one click from 588 impressions, 0.2% CTR, and average position 15.4. `/i-ching` earned the click from 23 impressions; `/chinese-zodiac/dragon` remained the largest zero-click page with 173 impressions. Treat this as an early directional snapshot only, not as evidence for changing either page before the full experiment window closes.

Vercel's rolling seven-day cards remain at 107 visitors, 213 page views, and 66% bounce rate. The 30-day cards remain at 609 visitors, 1,255 page views, and 67% bounce rate, while the Bazi calculator advanced from 359 to 361 visitors. The source mix is unchanged at Google 131, ChatGPT 63, Bing 22, DuckDuckGo 14, and Copilot three, so AI discovery remains material but has not moved enough for a new content decision.

GA4's latest processed seven-day cards remain at 78 active users, 77 new users, 484 events, 132 page views, and 86 sessions. The post-registration custom-dimension window is still too young for placement-level conversion rates. Keep collecting `tool_name`, `source`, `link_rank`, and `result_state` without mixing in pre-registration events.

Mobile Speed Insights strengthened to an aggregate RES of 100 with LCP 1.54s, INP 144ms, CLS 0.06, and TTFB 0.65s. The Bazi calculator remains healthy at RES 99 from 60 route data points. Desktop remains unchanged at RES 92, LCP 2.70s, and TTFB 0.99s. This reinforces the current decision: preserve the mobile result flow and wait for a second independent desktop window before changing performance code.

The HTML `/sitemap` route shows 538 historical 28-day impressions, 0 clicks, and average position 16.3, but it is already `noindex, follow`. Treat that as a recrawl lag, not a snippet opportunity; keep its discovery links intact and do not optimize it for clicks.

The same-day quality pass upgraded `/learn/resources` into a source-evaluation guide covering primary texts, translations, calendar references, claim verification, teachers, communities, and calculator reproducibility. The read-only audit now estimates 1,083 words and scores it 92/A, up from 299 words and 79/B. Keep it `noindex, follow` despite the improvement: content readiness does not override the cohort B gate, and the page should not enter a third recovery batch before the indexing decision rules below are satisfied.

The internal decision hub `/learn/which-system` was also upgraded because it is a shared CTA destination and appeared in URL Inspection as a discovery source for `/bazi/heavenly-stems`. Its new comparison matrix separates five systems by question, required input, output, missing-data constraints, and first exercise. The audit now estimates 1,267 words and scores it 92/A, up from 341 words and 74/B. It also remains `noindex, follow`; stronger internal navigation value is not permission to expand the current indexing cohort.

The core `/learn/beginners-guide` now provides a four-week sequence for shared vocabulary, calendar boundaries, one-system selection, a bounded first exercise, tool verification, source notes, and stopping conditions. The audit estimates 1,289 words and scores it 92/A, up from 559 words and 75/B. It remains `noindex, follow` alongside the other staged Learn pages; the cluster is being made quality-ready before any future indexing decision, not used to bypass cohort B measurement.

The `/learn` entry page now acts as a real topic hub for the staged cluster: it defines the umbrella scope, shared stem-branch foundation, five system outputs, recommended site route, traceable practice loop, and quality boundaries. After correcting the audit to classify `/learn` as a hub, it measures 1,081 words against a 1,000-word minimum and scores 92/A, up from 353 words and 75/B. The hub and its three core child guides are now quality-ready but remain `noindex, follow` until cohort B satisfies the expansion gate.

The final two Learn guides are now quality-ready as well. `/learn/chinese-vs-western-astrology` separates calculation foundations, the two different twelve-part cycles, chart components, timing methods, birth-data requirements, and a safe comparison workflow; the audit estimates 1,328 words and 92/A, up from 318 words and 75/B. `/learn/common-misconceptions` now addresses single-symbol reduction, calendar boundaries, Five Phase literalism, deterministic natal claims, decorative Feng Shui, yes/no I Ching use, source-layer confusion, and unverified calculator or AI output; it measures 1,269 words and 92/A, up from 303 words and 71/B. All six Learn pages now score 92/A and remain `noindex, follow`, outside the XML Sitemap and 36-route allowlist. The production audit covers the full six-page cluster so future changes cannot silently alter its canonical, H1, links, structured data, or staging status.

### Earthly Branches quality refresh — demand-led selection

The next content refresh targets `/bazi/earthly-branches`, an already indexed page with observable demand: Search Console reports 67 impressions in the current comparison window, and Vercel reports 77 visitors over 30 days. The two alternatives did not clear the same evidence threshold: `/blog/i-ching-beginners-reading-guide` has only five impressions at average position 34.4, while `/chinese-zodiac/2026-forecast` has no impressions. Improving the proven route is therefore more useful than expanding low-demand pages or creating another indexing variable.

The refresh adds two named references, cautious historical language, stable links into the Bazi learning path, and a six-step reproducible reading sequence. The read-only audit now estimates 1,525 words across six sections and scores the page 92/A, up from 1,225 words and 88/A. Its exact title and direct answer are held stable so the change measures content depth and GEO traceability rather than starting a new snippet experiment. The page remains `index, follow`, in the 36-route allowlist and XML Sitemap, and outside recovery cohort B; do not resubmit it because URL Inspection already reports that it is on Google.

### Post-deployment traffic decision — 2026-08-07 11:05 CST

The newest complete Search Console day is still 2026-08-04, so the seven-day and 28-day baselines remain unchanged. The rolling 24-hour report advanced from 588 to 627 impressions while holding at one click, 0.2% CTR, and average position 15.8. `/i-ching` still owns the click from 25 impressions; the largest zero-click pages in this directional window are Dragon at 178 impressions, the homepage at 89, the Chinese Zodiac hub at 64, the compatibility article at 54, and the Day Master article at 48.

The 28-day URL scan does not justify opening a fourth snippet experiment. The homepage and About page already clear the CTR guardrail at 1.8% and 1.6%. The three pages that materially exceed 100 impressions with weak CTR are the existing frozen experiments, while the HTML Sitemap is intentionally `noindex, follow`. `/chinese-zodiac` is the nearest new candidate at 97 impressions, 0% CTR, and position 16.3, but it remains below the 100-impression decision threshold; `/bazi/earthly-branches` has 67 impressions at position 12.0 and has just received the quality-only refresh above.

Vercel remains stable at 107 visitors, 213 page views, and 66% bounce rate over seven days, with seven visitors to Earthly Branches; the 30-day view remains 609 visitors, 1,255 page views, 67% bounce rate, and 77 Earthly Branches visitors. GA4 still processes through 2026-08-06 and therefore cannot yet evaluate the newly registered dimensions or the result-guide experiment. Desktop Speed Insights is also unchanged at RES 92, LCP 2.70s, and TTFB 0.99s from 194 data points. Preserve the current experiments and wait for an independent data window rather than changing another title, direct answer, or performance path today.

### About entity trust refresh — demand-backed, snippet-neutral

The About page is an indexable company/entity route with 123 GSC impressions, two clicks, 1.6% CTR, and average position 9.5 in the 28-day URL report. Its search snippet is already above the current CTR guardrail, so the refresh leaves the title and description unchanged and strengthens the page's GEO trust layer instead: named source records now expose direct URLs, the visible source map links to the source-evaluation guide, and calendar-sensitive readers get a reproducible calculator plus Hong Kong Observatory conversion workflow. The Organization JSON-LD now identifies the editorial team, links all three anchor works, and carries dateModified 2026-08-07; the About route is also covered by the local production audit. This is a site-quality improvement, not a new indexing or title experiment.

### Indexable quality-gate calibration

The source audit previously treated reusable FAQ expressions and named FAQ arrays as zero questions, while counting unrelated label fields from stats and navigation as citations. That combination mislabeled the Chinese Zodiac hub as 80/B even though its runtime page exposes five FAQs and four source records. The audit now resolves reusable FAQ arrays and factories conservatively and counts citation labels only inside the citation block. Regression tests cover both the Zodiac factory and a named blog FAQ array.

After recalculation, /chinese-zodiac is 92/A with 1,536 estimated words, five FAQs, four citations, and the existing title and direct answer unchanged. Of the 15 indexable content pages represented by the source audit, 12 now grade A. The remaining three B pages are /bazi/heavenly-stems, /bazi/ten-gods, and /bazi/luck-pillars, all members of active recovery cohort B; preserve them through the observation window instead of changing content to satisfy an audit score. The sitewide average changed from 71 to 69 because citation inflation was removed, not because published content regressed. Keep the 74 high-risk staged/generated pages outside the indexing allowlist and use the corrected metrics for future quality batches.

The read-only audit CLI now reports the indexable subset separately: 15 content pages, average quality score 87, and three pages below A. This prevents the 74 high-risk staged/generated pages from obscuring the quality signal used for indexing decisions; the full-site average remains useful for backlog management, while the indexable average is the decision metric for new cohorts.

### Machine-discovery set parity

The AI discovery audit confirms that llms-full.txt, XML Sitemap, and RSS now expose only their intended quality-approved sets: llms-full.txt must equal the 36-route indexable registry exactly, and RSS must equal the indexable blog subset exactly. The short llms.txt entrypoint now points agents to the About editorial team, named source map, review workflow, and reproducibility policy, while noindex Learn paths are no longer configured as priority entries. This keeps the GEO trust layer discoverable without allowing the 74 staged/generated high-risk pages to compete in machine-readable discovery files.

The engagement evidence supports improving the existing result-to-guide continuation before adding more newsletter surface area. Related reading has measurable use, while the seven-day subscription funnel has no activity.

### Engagement experiment A — one primary result guide

Launched on 2026-08-07 for the Bazi calculator result path only. The chart-specific Day Master guide is the single high-emphasis next step; Ten Gods, Five Elements, and Luck Pillars remain available as ordered secondary links. The experiment does not add a module, move the subscription prompt, or change any search snippet.

- Baseline: `related_content_clicked` recorded six events from three users in the seven days through 2026-08-06.
- Primary measure: unique users triggering the new `primary_guide_clicked` event divided directionally by unique users triggering `calculator_completed` over the same full seven-day window.
- Initial success threshold: at least 25% after a minimum of 25 calculator-completion users. Do not judge the experiment before both conditions are met.
- Guardrails: calculator completions must not fall by more than 10%, mobile route RES must remain at least 95, and no new layout-shift regression may appear.
- Build guardrail: the JavaScript referenced by the generated calculator HTML increased from 320,851 to 320,991 gzip bytes (+140 bytes, 0.04%), so the experiment does not materially increase the initial transfer budget.
- Attribution: the primary and secondary links continue to emit `related_content_clicked`; use `source`, `link_rank`, and `result_state` on post-registration events to distinguish placement.

## Phased plan after indexing recovery

### Phase 1 — hold and measure through 2026-08-21

- Keep the three 2026-08-07 snippet experiments unchanged for 14 days: Dragon years, Day Master/day stem, and Zodiac Compatibility triads/clashes.
- Do not resubmit the seven recovered URLs unless Google reports a new indexing or canonical problem.
- Hold cohort B unchanged after its 2026-08-07 submissions. On 2026-08-10, recheck only `/bazi/luck-pillars` and `/ziwei` to confirm Google now recognizes them; on 2026-08-14 and 2026-08-21, inspect all six URLs individually.
- Record GSC page/query deltas after 7 and 14 days, but make the first success/failure decision only after the full 14-day hold.
- From 2026-08-09 onward, use the newly registered GA4 dimensions to split `calculator_completed`, `related_content_clicked`, `primary_guide_clicked`, and `share_card_clicked` by tool and placement. Do not mix pre-registration events into dimension-level rates.
- Use GA4 to confirm the subscription funnel before adding any new retention component. Vercel's Hobby dashboard cannot expose custom events.
- At the 2026-08-14 review, open a narrow calculator performance experiment only if desktop LCP remains above 2.5s with at least 25 route data points and TTFB remains at or below 0.8s. Preserve the current mobile result path and do not run the change before the CTR and indexing checkpoints can be separated analytically.

#### Cohort B decision rules

- Discovery gate, 2026-08-10: if `/bazi/luck-pillars` or `/ziwei` still returns "Google does not know this URL," verify the submitted sitemap is healthy and run a live URL test. Do not rewrite the page or refresh `lastmod` without a real content change.
- First cohort check, 2026-08-14: record each URL as indexed, crawled but not indexed, discovered but not indexed, or unknown. A move from unknown to any recognized state counts as discovery progress, not indexing success.
- Decision check, 2026-08-21: target at least four of six indexed and all six recognized by Google. If an unknown URL persists, add two or three contextually relevant links from already-indexed hub or guide pages, then request indexing once after that material discovery-path change.
- For URLs that remain discovered or crawled but not indexed on 2026-08-21, compare their unique answer coverage, query demand, and overlap with indexed pages before changing content. Consolidate a genuinely duplicative page; strengthen a useful but thin page; do not use bulk resubmission as the remedy.
- Do not start a third recovery batch or expand the 36-route allowlist before cohort B reaches at least four indexed URLs, unless the 28-day review on 2026-09-04 shows a clear technical cause affecting the wider site.

### Phase 2 — select no more than three evidence-backed experiments

1. **CTR:** keep a page eligible when it has at least 100 impressions, average position 5–20, and CTR below 1%. Prioritize the Dragon, Day Master, and compatibility cohorts already selected.
2. **Visit depth:** if the calculator still dominates landings and bounce remains above 65%, optimize the existing result-to-guide path first. Judge it by related-content click rate, not by adding generic homepage modules.
3. **Performance:** only open a route-level performance change when the route has at least 25 metric samples and exceeds the relevant threshold in two consecutive seven-day reviews. For the Bazi calculator, the first candidate is to defer the sample chart/calculation payload while preserving the immediately usable form and answer-first content. For the homepage, inspect the hero only if LCP remains above 2.5s with good TTFB.

### Phase 3 — expand the winning pattern

- Apply a snippet pattern to adjacent pages only after the original cohort improves CTR without losing ranking.
- Apply a calculator performance change to other tools only after it improves LCP without reducing `calculator_completed`.
- Preserve citations, direct answers, schema, canonicals, `llms.txt`, and stable URLs in every expansion.

## Measurement cadence and decision rules

- Every 7 days: record GSC clicks, impressions, CTR, average position, and the top ten pages and queries; record Vercel visitors, page views, bounce rate, top pages, and AI/search referrers; record GA4 acquisition channels and the user counts for calculator, related-reading, share, and subscription events.
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
- Raise the seven-day share of users triggering `related_content_clicked` from 3.75% toward 8% before expanding newsletter promotion.
- Keep AI referrers at or above 10% of measured visitors and monitor whether ChatGPT/Copilot traffic grows after citation-focused pages are refreshed.
- Keep desktop RES at or above 90 while moving LCP below 2.5s and TTFB below 0.8s on decision-grade samples.
- Preserve the current route-level mobile RES of at least 95 on the homepage, Bazi calculator, and blog template.

### Live dashboard checkpoint — 2026-08-07 11:46 CST

The signed-in production dashboards were rechecked after the initial same-day checkpoint. Search Console's performance report was refreshed 7.5 hours earlier and still has 2026-08-04 as its latest complete day:

- Seven days (2026-07-29 through 2026-08-04): 13 clicks, 2,298 impressions, 0.6% CTR, average position 17.4.
- Twenty-eight days (2026-07-08 through 2026-08-04): 38 clicks, 6,990 impressions, 0.5% CTR, average position 18.9.
- The current 28-day page leaders are the homepage (36 clicks / 1,962 impressions), About (2 / 123), the compatibility chart (1 / 604), Dragon (0 / 2,984), the Day Master guide (0 / 554), and the intentionally noindex HTML sitemap (0 / 538). Chinese Zodiac is the nearest new CTR candidate at 97 impressions and zero clicks, still below the 100-impression gate.
- The aggregate indexing report remains a lagging snapshot through 2026-07-24: 24 indexed, 34 not indexed, with 27 in “Discovered — currently not indexed,” four excluded by noindex, three redirects, and zero “Crawled — currently not indexed.” Use URL Inspection for the submitted cohort instead of treating those aggregate counts as current URL states.

Vercel Analytics now shows the exact production windows:

- Seven days (2026-07-31 through 2026-08-07): 107 visitors (+39%), 213 page views (+16%), and 66% bounce rate (+4%). The leading pages were `/tools/bazi-calculator` (42 visitors), `/` (18), `/bazi/earthly-branches` (7), and `/chinese-zodiac/dragon` (7). Referrers were Google 23, Bing 3, ChatGPT 3, DuckDuckGo 3, and Ecosia 1.
- Thirty days (2026-07-08 through 2026-08-07): 609 visitors (+189%), 1,255 page views (+241%), and 67% bounce rate (-5%). The leading pages were the Bazi calculator (361), homepage (106), Earthly Branches (77), Ten Gods (30), Luck Pillars (29), Day Master guide (23), and Dragon (22). Referrers were Google 131, ChatGPT 63, Bing 22, DuckDuckGo 14, Yahoo 4, Copilot 3, and Ecosia 2. Devices were 51% mobile, 48% desktop, and 1% tablet.
- Vercel's Hobby dashboard still exposes no custom-event counts; GA4 remains the source of truth for calculator and reading-path events.

Most importantly, individual URL Inspection now reports **“URL is on Google” for all six Cohort B URLs**: `/tools/zodiac-compatibility`, `/bazi/heavenly-stems`, `/bazi/ten-gods`, `/bazi/luck-pillars`, `/feng-shui`, and `/ziwei`. This achieves the cohort target early (6/6 indexed and recognized), but the pages remain frozen through 2026-08-21 so the indexing result and the existing CTR experiments retain a clean observation window. Do not resubmit them.

The next decision therefore changes from recovery to post-index quality:

1. Keep the three existing snippet experiments unchanged through 2026-08-21; do not open a fourth title experiment while the current candidates are still being attributed.
2. On 2026-08-14 and 2026-08-21, record query/page deltas for the six newly indexed URLs. A newly indexed page with no impressions is a crawl success but not yet a demand signal.
3. After the freeze, shortlist at most three new experiments from pages with at least 100 impressions, positions 5–20, and CTR below 1%. If no new page clears that gate, improve the calculator result-to-guide path and citation/source traceability instead of expanding the indexable registry.
4. Keep the 36-route Sitemap/LLM registry and six staged Learn pages unchanged until the post-index review confirms that adding another cohort will not dilute the quality or discovery signal.

### Post-index demand check — 2026-08-07 11:51 CST

The filtered Search Console report still has no newer complete day and confirms that indexing has not yet become meaningful search demand for most of Cohort B. In the 28-day window through 2026-08-04:

- `/feng-shui`: 0 clicks, 6 impressions, average position 3.0.
- `/ziwei`: 0 clicks, 6 impressions, average position 3.0.
- `/tools/zodiac-compatibility`, `/bazi/heavenly-stems`, `/bazi/ten-gods`, and `/bazi/luck-pillars`: 0 clicks and 0 impressions in the filtered report.
- The six impressions for both Feng Shui and Ziwei came from the same two branded queries (`mingli bazi` and `bazi mingli`), so this is an early discovery signal, not enough evidence for a title or direct-answer change.

Decision: keep all six newly indexed pages stable through 2026-08-21. At the next review, treat impressions from non-branded, page-specific queries as the demand signal for any post-index CTR experiment; do not optimize against six branded impressions or expand the registry solely because URL Inspection is green.

### Post-freeze quality shortlist

The quality audit and traffic split identify two content-depth candidates for the first post-freeze review. These are not title experiments and must not be edited before 2026-08-21:

1. `/bazi/ten-gods`: 841 estimated words against the 1,200-word priority minimum, 81/B, 30 Vercel visitors in 30 days, and no GSC impressions. If the direct/AI traffic persists, strengthen the page with a reproducible Day-Master-to-Ten-Gods lookup workflow, one worked relationship example, and direct source URLs while preserving its title and direct answer.
2. `/bazi/luck-pillars`: 768 estimated words against the 1,200-word priority minimum, 79/B, 29 Vercel visitors in 30 days, and no GSC impressions. If the traffic persists, add an explicit input/boundary checklist, one worked cycle example, calculator limitations, and direct source URLs without changing the current snippet.

`/bazi/heavenly-stems` is lower priority at 1,028 words and 84/B; it already clears the normal knowledge-page word floor and has only five visitors in the current seven-day Vercel table with no GSC impressions. `/feng-shui` (88/A) and `/ziwei` (86/A) already clear the quality grade and have only six branded impressions each, so neither needs a content or snippet change now. `/chinese-zodiac` remains 92/A and stays below the CTR experiment gate at 97 impressions.

This shortlist keeps the next quality work tied to observed use rather than to audit score alone. Re-run the quality and traffic checks on 2026-08-21 and proceed with at most one of the two depth refreshes at a time so its effect remains attributable.

The prepared acceptance gate for whichever page wins on 2026-08-21 is:

- add at least 350 words of unique, non-predictive explanation;
- add one worked calculation/reading example and one explicit input or boundary checklist;
- retain at least two direct classical-source URLs and add only contextually relevant internal links;
- keep the existing title, direct answer, canonical, JSON-LD type, and index registry stable;
- update `dateModified` only with the real content change and require the content audit to reach 85/A or better;
- run the focused SEO tests, full test suite, lint, build, link audit, and production audit before any deployment or one-time reinspection request.

### Incremental dashboard check — 2026-08-07 11:58 CST

Search Console refreshed again (5.5 hours ago) but still reports 2026-08-04 as the latest complete day. The 7-day, 28-day, query, and page metrics are unchanged. Vercel's 2026-07-31–2026-08-07 window is also unchanged at 107 visitors, 213 page views, and 66% bounce rate. This is a no-change checkpoint: keep the current experiments and post-index freeze intact rather than treating a dashboard refresh as new evidence.

### Live dashboard delta — 2026-08-07 22:39 CST

Search Console has now processed one additional complete day through 2026-08-05. The latest windows are:

- Seven days (2026-07-30 through 2026-08-05): 14 clicks, 2,359 impressions, 0.6% CTR, average position 17.3.
- Twenty-eight days (2026-07-09 through 2026-08-05): 41 clicks, 7,197 impressions, 0.6% CTR, average position 18.6.
- Page leaders in the new 28-day table are the homepage (37 clicks / 2,046 impressions), About (2 / 127), the compatibility chart (1 / 604), Bazi Calculator (1 / 37), and I Ching beginners (1 / 6). Dragon remains the largest zero-click page (3,035 impressions), followed by the Day Master guide (564) and the HTML sitemap (544).
- `/chinese-zodiac` crossed the CTR eligibility threshold at 102 impressions, 0 clicks, and average position 16.4. The visible query rows only expose four branded impressions (`mingli bazi` and `bazi mingli`), so intent is not yet sufficiently clear for an immediate title change.

Vercel also moved modestly: the seven-day window is 113 visitors, 225 page views, and 65% bounce rate; the 30-day window is 615 visitors, 1,267 page views, and 67% bounce rate. The 30-day top pages are Bazi Calculator (362), homepage (106), Earthly Branches (78), Ten Gods (30), Luck Pillars (29), Day Master guide (23), and Dragon (23). ChatGPT reached 64 visitors in the 30-day referrer list.

Decision update: keep the three existing snippet experiments and Cohort B freeze intact through 2026-08-21, but add `/chinese-zodiac` to the next-review shortlist. If it still has 100+ impressions and position 5–20 at review time, use the query mix to choose between a narrowly scoped snippet test and a snippet-neutral source/answer refresh; do not change it solely because it crossed 100 impressions once.

### Final same-day verification — 2026-08-07 22:51 CST

The signed-in Search Console report was checked again at the end of the day. It still shows 2026-08-05 as the latest complete performance date and the same 7-day (14 clicks / 2,359 impressions / 0.6% CTR / position 17.3) and 28-day (41 / 7,197 / 0.6% / 18.6) totals. The `/chinese-zodiac` page remains at 102 impressions, zero clicks, position 16.4, with only the branded queries `mingli bazi` and `bazi mingli` visible.

The indexing report remains the 2026-07-24 aggregate snapshot (24 indexed, 34 not indexed: 27 discovered but not indexed, four noindex, three redirects, and zero crawled-but-not-indexed). This lagging aggregate is consistent with the successful 2026-08-03 sitemap read of all 36 submitted URLs; it is not evidence that another recovery submission is needed. Keep the 36-route Sitemap/LLM registry, the six-page Learn noindex boundary, the three snippet experiments, and Cohort B unchanged through 2026-08-21.

This is a no-change checkpoint. At the next review, compare non-branded query growth and page-specific impressions for Cohort B and `/chinese-zodiac`; use those signals to select at most one content-depth refresh or one narrow snippet test.

The same dashboard surfaced a short-term lift for `/blog/chinese-zodiac-compatibility-chart` (258 impressions, one click, average position 11.3 for 2026-07-27 through 2026-08-02). Its visible query mix is page-specific (`chinese zodiac compatibility chart`, `chinese zodiac triads`, `triangle of affinity`, and related chart variants), which is a stronger demand signal than the branded-only `/chinese-zodiac` rows; nevertheless, the page remains frozen until 2026-08-21 so the existing experiment can be evaluated without a content confounder.

### Performance checkpoint and low-risk optimization — 2026-08-07 23:04 CST

Vercel Analytics now reports the exact local-time windows:

- Last 7 days (2026-07-31 22:00 through 2026-08-07 22:59): 114 visitors (+48%), 226 page views (+23%), and 66% bounce rate (+4%). The leading pages are `/tools/bazi-calculator` (43), `/` (18), `/chinese-zodiac/dragon` (9), `/bazi/earthly-branches` (8), and `/bazi/heavenly-stems` (6). Referrers include Google (23), DuckDuckGo (5), ChatGPT (4), Bing (3), and Ecosia (1).
- Last 30 days (2026-07-08 22:00 through 2026-08-07 22:59): 616 visitors (+192%), 1,268 page views (+245%), and 67% bounce rate (-5%). The leading pages are the Bazi calculator (362), homepage (106), Earthly Branches (78), Ten Gods (30), Luck Pillars (29), Dragon (24), and Day Master guide (23). Referrers include Google (131), ChatGPT (64), Bing (22), DuckDuckGo (16), Yahoo (4), Copilot (3), and Ecosia (2). Mobile accounts for 51% of visitors and desktop 48%.

Speed Insights identifies a desktop-only quality gap on the same 7-day window: RES 85 from 219 data points, FCP 2.98 s, LCP 3.32 s, and TTFB 1.52 s; INP is 72 ms and CLS 0.01. Mobile remains healthy at RES 100, FCP 1.51 s, LCP 1.54 s, TTFB 0.65 s, INP 144 ms, and CLS 0.02 from 125 data points. Desktop route cohorts with the weakest RES are `/tools/zodiac-compatibility` (41), `/feng-shui/[...slug]` (35), and `/chinese-zodiac` (37), but all are frozen content routes during this observation window.

The global layout was therefore optimized without touching content or indexing policy: Inter and Playfair remain the initial font preloads, while the below-the-fold Cormorant and Geist Mono fonts now load on demand. The production build confirms that the homepage emits two, rather than four, font preloads. Recheck Speed Insights after the next meaningful 7-day sample; the acceptance target remains desktop RES ≥ 90, LCP < 2.5 s, and TTFB < 0.8 s while preserving mobile RES ≥ 95.

The Vercel project overview was checked after pushing commit `32baa88`. It still offers “Connect Git” and identifies production source `3b725e7`, so the performance change is present on GitHub but not yet deployed to `mingliatlas.com`. Do not attribute a future Speed Insights change to this optimization until Vercel is connected to the repository or an authorized production deployment is run; no project upload or deployment-setting change was made during this checkpoint.

### Incremental performance dashboard check — 2026-08-07 23:08 CST

The Vercel Analytics 7-day window advanced to 2026-07-31 23:00 through the current 2026-08-07 snapshot: 115 visitors (+49%), 227 page views (+24%), and 66% bounce rate (+4%). The Bazi calculator remains the leading page at 43 visitors, followed by the homepage at 19 and Dragon at 9. Search Console has not processed a new complete day, and the production Speed Insights values remain unchanged because the active deployment is still `3b725e7`.
