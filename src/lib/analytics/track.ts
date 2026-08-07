export type AnalyticsEventName =
  | "calculator_started"
  | "calculator_completed"
  | "share_card_clicked"
  | "ai_interpretation_requested"
  | "subscribe_clicked"
  | "subscribe_requested"
  | "subscribe_confirmed"
  | "related_content_clicked"
  | "page_scroll_75";

export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

interface PlausibleOptions {
  props?: AnalyticsEventProperties;
}

declare global {
  interface Window {
    plausible?: (eventName: AnalyticsEventName, options?: PlausibleOptions) => void;
    gtag?: (
      command: "event",
      eventName: AnalyticsEventName,
      params?: AnalyticsEventProperties,
    ) => void;
  }
}

export function trackPlausibleEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }

  window.plausible(eventName, properties ? { props: properties } : undefined);
}

export function trackGtagEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, properties);
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
): void {
  trackPlausibleEvent(eventName, properties);
  trackGtagEvent(eventName, properties);
}
