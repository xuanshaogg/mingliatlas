# Analytics and Monitoring

This project supports Plausible Analytics and GA4 for custom-event measurement, Vercel Analytics for traffic measurement, and Speed Insights for Vercel-hosted performance metrics.

## Local configuration

Analytics IDs are optional so local builds work without external dashboard setup.

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Leave either variable unset to skip loading that provider's script.

## Custom events

Use `trackAnalyticsEvent` from `src/lib/analytics/track.ts` for these events:

- `calculator_started`
- `calculator_completed`
- `share_card_clicked`
- `ai_interpretation_requested`
- `subscribe_clicked`
- `subscribe_requested`
- `subscribe_confirmed`
- `primary_guide_clicked`
- `related_content_clicked`
- `page_scroll_75`

`page_scroll_75` is tracked automatically once per page load by `ScrollDepthTracker`.

Each event is sent to Plausible and GA4 when the corresponding public environment variable is configured. The production GA4 stream is configured and currently receives the event taxonomy below. Vercel page views remain enabled, but its custom-event report is unavailable on the current Hobby plan.

## Setup checklist

### Plausible

- Create or select the production site in Plausible.
- Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to the exact domain configured in Plausible.
- Confirm realtime visitors appear after production deployment.
- Confirm custom events appear for the supported event names.

### GA4

- Create or select a GA4 web data stream.
- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the stream measurement ID.
- Confirm page views and custom events appear after production deployment.

### Production measurement status — 2026-08-07

- The production GA4 web stream is active and receives page views and the documented custom events.
- The verified `sc-domain:mingliatlas.com` Search Console property is linked to the `https://mingliatlas.com` web stream. Use the resulting Google organic search query and landing-page reports after Google finishes processing the link.
- The following event-scoped custom dimensions are registered: `tool_name`, `target`, `source`, `link_rank`, `result_state`, `day_master`, and `action`.
- GA4 custom dimensions are not retroactive. Use events collected after 2026-08-07 for tool-, destination-, placement-, result-, and share-action breakdowns, and allow 24–48 hours before treating a missing dimension value as an instrumentation defect.

### Vercel Analytics

- Enable Web Analytics in the Vercel project dashboard.
- Confirm page view data appears after deployment.
- Do not use its custom-event section as the engagement source of truth while the project remains on Hobby; the dashboard requires a Pro team for that feature.

### Production source of truth

- Use GA4 Events for `calculator_completed`, `primary_guide_clicked`, `related_content_clicked`, `share_card_clicked`, and the subscription funnel.
- Use the registered `tool_name`, `target`, and `source` dimensions when comparing individual tools, destinations, or placements. Use `link_rank`, `result_state`, and `day_master` for the Bazi result-guide experiment, and `action` for share-card behavior.
- Treat Vercel and GA4 visitor totals as separate measurement systems because their attribution, consent, and blocker behavior differ.

### Vercel Speed Insights

- Enable Speed Insights in the Vercel project dashboard if required for the plan/project.
- Confirm Core Web Vitals appear after production traffic is available.

## Dashboard-only operations

These items require account/dashboard access and cannot be completed from the local build alone:

- Plausible account/site creation and realtime visitor verification.
- Any future GA4 custom-definition, Search Console link, or data-retention change.
- Vercel Analytics and Speed Insights plan or dashboard changes. Both production dashboards are enabled; Vercel custom-event reporting remains unavailable on Hobby.
- Measuring production analytics script impact against the `<50ms` budget.
