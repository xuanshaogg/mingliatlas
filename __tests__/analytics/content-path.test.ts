import { describe, expect, it, vi } from "vitest";
import { trackContentNextStep, trackContentPrimaryCta } from "@/lib/analytics/content-path";

describe("content-to-tool path tracking", () => {
  it("records a contextual next step with its placement and rank", () => {
    const trackEvent = vi.fn();

    trackContentNextStep(
      { source: "dragon_next_steps" },
      "/bazi/earthly-branches",
      2,
      trackEvent,
    );

    expect(trackEvent).toHaveBeenCalledOnce();
    expect(trackEvent).toHaveBeenCalledWith("related_content_clicked", {
      source: "dragon_next_steps",
      target: "/bazi/earthly-branches",
      link_rank: 2,
      result_state: undefined,
    });
  });

  it("records a primary CTA as both a related-content and primary-guide click", () => {
    const trackEvent = vi.fn();

    trackContentPrimaryCta(
      { source: "zodiac_hub_primary_cta", resultState: "content" },
      "/tools/bazi-calculator",
      trackEvent,
    );

    const properties = {
      source: "zodiac_hub_primary_cta",
      target: "/tools/bazi-calculator",
      link_rank: 1,
      result_state: "content",
    };
    expect(trackEvent).toHaveBeenNthCalledWith(1, "related_content_clicked", properties);
    expect(trackEvent).toHaveBeenNthCalledWith(2, "primary_guide_clicked", properties);
  });
});
