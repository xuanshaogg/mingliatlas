import { afterEach, describe, expect, it, vi } from "vitest";

const { vercelTrackMock } = vi.hoisted(() => ({
  vercelTrackMock: vi.fn(),
}));

vi.mock("@vercel/analytics", () => ({
  track: vercelTrackMock,
}));

import {
  trackAnalyticsEvent,
  trackGtagEvent,
  trackPlausibleEvent,
  trackVercelEvent,
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
  it("sends a custom event and its flat properties to every configured provider", () => {
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
    expect(vercelTrackMock).toHaveBeenCalledWith("calculator_completed", properties);
  });

  it("allows each provider adapter to be called independently", () => {
    const { plausible, gtag } = installBrowserWindow();

    trackPlausibleEvent("related_content_clicked", { target: "/bazi" });
    trackGtagEvent("subscribe_clicked", { source: "chart_summary" });
    trackVercelEvent("page_scroll_75");

    expect(plausible).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledOnce();
    expect(vercelTrackMock).toHaveBeenCalledWith("page_scroll_75", undefined);
  });

  it("does not emit events during server rendering", () => {
    trackAnalyticsEvent("calculator_started", { tool_name: "bazi" });

    expect(vercelTrackMock).not.toHaveBeenCalled();
  });
});
