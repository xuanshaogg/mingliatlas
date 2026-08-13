import type { AnalyticsEventName, AnalyticsEventProperties } from "@/lib/analytics/track";

export interface ContentLinkTracking {
  source: string;
  resultState?: string;
}

type TrackEvent = (eventName: AnalyticsEventName, properties?: AnalyticsEventProperties) => void;

function propertiesFor(tracking: ContentLinkTracking, target: string, linkRank: number) {
  return {
    source: tracking.source,
    target,
    link_rank: linkRank,
    result_state: tracking.resultState,
  };
}

export function trackContentNextStep(
  tracking: ContentLinkTracking,
  target: string,
  linkRank: number,
  trackEvent: TrackEvent,
): void {
  trackEvent("related_content_clicked", propertiesFor(tracking, target, linkRank));
}

export function trackContentPrimaryCta(
  tracking: ContentLinkTracking,
  target: string,
  trackEvent: TrackEvent,
): void {
  const properties = propertiesFor(tracking, target, 1);
  trackEvent("related_content_clicked", properties);
  trackEvent("primary_guide_clicked", properties);
}
