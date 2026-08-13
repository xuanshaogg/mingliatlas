import { describe, expect, it, vi } from "vitest";
import { createToolFunnelTracker } from "@/lib/analytics/tool-funnel";

describe("tool funnel tracking", () => {
  it("records exactly one start and first completion per page view", () => {
    const trackEvent = vi.fn();
    const funnel = createToolFunnelTracker("bazi", trackEvent);

    funnel.markStarted();
    funnel.markStarted();
    funnel.markCompleted();
    funnel.markCompleted();
    funnel.markCompleted();

    expect(trackEvent).toHaveBeenNthCalledWith(1, "calculator_started", { tool_name: "bazi" });
    expect(trackEvent).toHaveBeenNthCalledWith(2, "calculator_completed", { tool_name: "bazi" });
    expect(trackEvent).toHaveBeenNthCalledWith(3, "calculator_recalculated", { tool_name: "bazi" });
    expect(trackEvent).toHaveBeenNthCalledWith(4, "calculator_recalculated", { tool_name: "bazi" });
    expect(trackEvent).toHaveBeenCalledTimes(4);
  });

  it("pairs a default-value completion with its required start", () => {
    const trackEvent = vi.fn();
    const funnel = createToolFunnelTracker("i-ching", trackEvent);

    funnel.markCompleted();

    expect(trackEvent).toHaveBeenNthCalledWith(1, "calculator_started", { tool_name: "i-ching" });
    expect(trackEvent).toHaveBeenNthCalledWith(2, "calculator_completed", { tool_name: "i-ching" });
  });

  it("preserves a completed page-session funnel without emitting another first completion", () => {
    const trackEvent = vi.fn();
    const persistState = vi.fn();
    const funnel = createToolFunnelTracker(
      "zodiac",
      trackEvent,
      { hasStarted: true, hasCompleted: true },
      persistState,
    );

    funnel.markStarted();
    funnel.markCompleted();

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("calculator_recalculated", { tool_name: "zodiac" });
    expect(persistState).not.toHaveBeenCalled();
  });
});
