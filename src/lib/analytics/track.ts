export type AnalyticsEventName =
  | "bazi_calculator_use"
  | "ziwei_calculator_use"
  | "iching_oracle_use"
  | "ai_chat_message"
  | "zodiac_compatibility_use"
  | "email_subscribe"
  | "share_tool_result"
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
