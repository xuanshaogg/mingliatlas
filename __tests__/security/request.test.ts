import { describe, expect, it } from "vitest";
import {
  checkRateLimit,
  isSafeStructuredPayload,
  isSameOriginRequest,
  readLimitedBody,
} from "../../src/lib/security/request";

describe("request security helpers", () => {
  it("rejects oversized and deeply nested payloads", () => {
    let nested: unknown = true;
    for (let index = 0; index < 8; index += 1) nested = { child: nested };

    expect(isSafeStructuredPayload({ dayMaster: "Bing", pillars: ["A", "B", "C", "D"] })).toBe(true);
    expect(isSafeStructuredPayload({ text: "x".repeat(1_001) })).toBe(false);
    expect(isSafeStructuredPayload(nested)).toBe(false);
  });

  it("checks request origins", () => {
    expect(isSameOriginRequest(new Request("https://mingliatlas.com/api/test"))).toBe(true);
    expect(
      isSameOriginRequest(
        new Request("https://mingliatlas.com/api/test", { headers: { origin: "https://example.com" } }),
      ),
    ).toBe(false);
  });

  it("limits repeated identifiers within a window", () => {
    const namespace = `test-${Date.now()}`;
    expect(checkRateLimit(namespace, "client", { limit: 1, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit(namespace, "client", { limit: 1, windowMs: 60_000 }).allowed).toBe(false);
  });

  it("rejects bodies beyond the byte limit", async () => {
    const small = new Request("https://mingliatlas.com", { method: "POST", body: "hello" });
    const large = new Request("https://mingliatlas.com", { method: "POST", body: "too large" });
    await expect(readLimitedBody(small, 5)).resolves.toBe("hello");
    await expect(readLimitedBody(large, 5)).resolves.toBeNull();
  });
});
