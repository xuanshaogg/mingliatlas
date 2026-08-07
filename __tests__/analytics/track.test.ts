import { afterEach, describe, expect, it, vi } from "vitest";

import {
  trackAnalyticsEvent,
  trackGtagEvent,
  trackPlausibleEvent,
} from "@/lib/analytics/track";

function installBrowserWindow() {
  const plausible = vi.fn();
  const gtag = vi.fn();

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { plausible, gtag },
    writable: true,
  });

  return { plausible, gtag };
}

afterEach(() => {
  vi.clearAllMocks();
  Reflect.deleteProperty(globalThis, "window");
});

describe("analytics event tracking", () => {
  it("sends a custom event and its flat properties to every configured event provider", () => {
    const { plausible, gtag } = installBrowserWindow();
    const properties = {
      tool_name: "bazi",
      result_count: 1,
      is_sample: false,
      optional_value: null,
    };

    trackAnalyticsEvent("calculator_completed", properties);

    expect(plausible).toHaveBeenCalledWith("calculator_completed", { props: properties });
    expect(gtag).toHaveBeenCalledWith("event", "calculator_completed", properties);
  });

  it("allows each provider adapter to be called independently", () => {
    const { plausible, gtag } = installBrowserWindow();

    trackPlausibleEvent("related_content_clicked", { target: "/bazi" });
    trackGtagEvent("subscribe_clicked", { source: "chart_summary" });

    expect(plausible).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledOnce();
  });

  it("does not emit events during server rendering", () => {
    expect(() =>
      trackAnalyticsEvent("calculator_started", { tool_name: "bazi" }),
    ).not.toThrow();
  });
});
