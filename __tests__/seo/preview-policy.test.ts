import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment indexing policy", () => {
  it("keeps Preview metadata, response headers and discovery consistently non-indexable", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.resetModules();
    const { buildPageMetadata } = await import("@/lib/seo/metadata");
    const { default: sitemap } = await import("@/app/sitemap");
    const { default: robots } = await import("@/app/robots");
    const { default: config } = await import("../../next.config");
    for (const path of ["/", "/learn", "/i-ching/hexagram-64", "/search"]) {
      expect(
        buildPageMetadata({ title: "Preview", description: "Release check", path }).robots
      ).toMatchObject({
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      });
    }
    expect(sitemap()).toEqual([]);
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
    const headers = await config.headers?.();
    expect(headers?.[0].headers).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    });
  });

  it("restores the 40-page allowlist and follow rules in a fresh Production module load", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.resetModules();
    const { buildPageMetadata } = await import("@/lib/seo/metadata");
    const { default: sitemap } = await import("@/app/sitemap");
    const { default: config } = await import("../../next.config");
    expect(sitemap()).toHaveLength(40);
    expect(
      buildPageMetadata({ title: "Home", description: "Release check", path: "/" }).robots
    ).toMatchObject({ index: true, follow: true });
    expect(
      buildPageMetadata({ title: "Search", description: "Release check", path: "/search" }).robots
    ).toMatchObject({ index: false, follow: true });
    const headers = await config.headers?.();
    expect(
      headers?.flatMap((rule) => rule.headers).some((header) => header.key === "X-Robots-Tag")
    ).toBe(false);
  });
});
