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

  it("keeps UI placement out of GA acquisition fields without mutating caller properties", () => {
    const { plausible, gtag } = installBrowserWindow();
    const properties = { source: "chart_summary", target: "/bazi" };
    trackAnalyticsEvent("related_content_clicked", properties);
    expect(gtag).toHaveBeenCalledWith("event", "related_content_clicked", {
      content_placement: "chart_summary", target: "/bazi",
    });
    expect(plausible).toHaveBeenCalledWith("related_content_clicked", { props: properties });
    expect(properties.source).toBe("chart_summary");
    trackGtagEvent("subscribe_clicked", { source: "legacy", content_placement: "explicit" });
    expect(gtag).toHaveBeenLastCalledWith("event", "subscribe_clicked", { content_placement: "explicit" });
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
