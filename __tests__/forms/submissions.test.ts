import { describe, expect, it } from "vitest";
import {
  contactSubmissionSchema,
  parseFormBody,
  subscriberSubmissionSchema,
} from "../../src/lib/forms/submissions";

describe("public form submissions", () => {
  it("normalizes valid subscription emails", () => {
    const parsed = subscriberSubmissionSchema.parse({ email: " Reader@Example.com ", website: "" });
    expect(parsed.email).toBe("reader@example.com");
  });

  it("rejects invalid and oversized contact fields", () => {
    expect(
      contactSubmissionSchema.safeParse({ name: "A", email: "invalid", message: "short" }).success,
    ).toBe(false);
    expect(
      contactSubmissionSchema.safeParse({
        name: "Reader",
        email: "reader@example.com",
        message: "x".repeat(5_001),
      }).success,
    ).toBe(false);
  });

  it("parses browser form encoding", () => {
    expect(parseFormBody("email=reader%40example.com&website=")).toEqual({
      email: "reader@example.com",
      website: "",
    });
  });
});
