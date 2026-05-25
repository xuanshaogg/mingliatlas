type ToolEvent =
  | "calculator_started"
  | "calculator_completed"
  | "share_card_clicked"
  | "ai_interpretation_requested"
  | "subscribe_clicked"
  | "related_content_clicked";

interface EventProps {
  tool?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: ToolEvent, props?: EventProps): void {
  if (typeof window === "undefined") return;

  // Plausible
  if (typeof (window as unknown as { plausible?: (e: string, o?: { props?: EventProps }) => void }).plausible === "function") {
    (window as unknown as { plausible: (e: string, o?: { props?: EventProps }) => void }).plausible(event, props ? { props } : undefined);
  }

  // GA4
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, props);
  }
}
