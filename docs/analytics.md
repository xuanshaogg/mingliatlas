# Analytics and Monitoring

This project supports Plausible Analytics as the primary traffic analytics tool, GA4 as a backup, and Vercel Analytics + Speed Insights for Vercel-hosted page and performance metrics.

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
