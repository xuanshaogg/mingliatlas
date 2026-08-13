import { describe, expect, it, vi } from "vitest";
import {
  extractInitialNextJsUrls,
  measureInitialNextJsBytes,
} from "../../scripts/audit-initial-js.mjs";

describe("initial Next.js JavaScript audit", () => {
  it("extracts unique same-origin Next.js scripts and ignores unrelated scripts", () => {
    const html = `
      <script src="/_next/static/chunks/a.js"></script>
      <script defer src='/_next/static/chunks/b.js?v=1'></script>
      <script src="/_next/static/chunks/a.js"></script>
      <script src="https://plausible.io/js/script.js"></script>
      <script src="/assets/app.js"></script>
    `;

    expect(extractInitialNextJsUrls(html, "https://mingliatlas.com/tools/zodiac-compatibility")).toEqual([
      "https://mingliatlas.com/_next/static/chunks/a.js",
      "https://mingliatlas.com/_next/static/chunks/b.js?v=1",
    ]);
  });

  it("sums decoded script bytes for the production budget", async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      const size = url.endsWith("a.js") ? 120 : 80;
      return new Response(new Uint8Array(size), { status: 200 });
    });

    const result = await measureInitialNextJsBytes({
      html: '<script src="/_next/static/chunks/a.js"></script><script src="/_next/static/chunks/b.js"></script>',
      pageUrl: "https://mingliatlas.com/tools/zodiac-compatibility",
      fetchImpl,
    });

    expect(result.totalBytes).toBe(200);
    expect(result.scriptUrls).toHaveLength(2);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("fails when a required Next.js script cannot be fetched", async () => {
    await expect(
      measureInitialNextJsBytes({
        html: '<script src="/_next/static/chunks/missing.js"></script>',
        pageUrl: "https://mingliatlas.com/tools/zodiac-compatibility",
        fetchImpl: async () => new Response(null, { status: 404 }),
      }),
    ).rejects.toThrow("expected 200, got 404");
  });
});
