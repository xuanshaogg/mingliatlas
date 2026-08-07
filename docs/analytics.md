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

### Vercel Analytics

- Enable Web Analytics in the Vercel project dashboard.
- Confirm page view data appears after deployment.
- Do not use its custom-event section as the engagement source of truth while the project remains on Hobby; the dashboard requires a Pro team for that feature.

### Production source of truth

- Use GA4 Events for `calculator_completed`, `related_content_clicked`, `share_card_clicked`, and the subscription funnel.
- Register `tool_name`, `target`, and `source` as event-scoped custom dimensions before comparing individual tools or destinations in GA4 reports.
- Treat Vercel and GA4 visitor totals as separate measurement systems because their attribution, consent, and blocker behavior differ.

### Vercel Speed Insights

- Enable Speed Insights in the Vercel project dashboard if required for the plan/project.
- Confirm Core Web Vitals appear after production traffic is available.

## External blockers

These items require account/dashboard access and cannot be completed locally:

- Plausible account/site creation and realtime visitor verification.
- GA4 property/data stream creation and event verification.
- Vercel Analytics dashboard enablement and page-view verification.
- Vercel Speed Insights dashboard enablement and Core Web Vitals verification.
- Measuring production analytics script impact against the `<50ms` budget.
