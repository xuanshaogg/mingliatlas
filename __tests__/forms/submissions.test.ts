import { describe, expect, it } from "vitest";
import {
  contactSubmissionSchema,
  parseFormBody,
  subscriberSubmissionSchema,
  unsubscribeSubmissionSchema,
} from "../../src/lib/forms/submissions";
import { createSubscriptionToken, readSubscriptionToken } from "../../src/lib/subscriptions/token";

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

  it("uses the same normalized email contract for unsubscribe requests", () => {
    expect(unsubscribeSubmissionSchema.parse({ email: " Reader@Example.com ", website: "" }).email).toBe("reader@example.com");
  });

  it("signs subscription links and rejects a token used for the wrong purpose", () => {
    const previousSecret = process.env.SUBSCRIPTION_TOKEN_SECRET;
    process.env.SUBSCRIPTION_TOKEN_SECRET = "test-secret-for-subscription-links";
    const token = createSubscriptionToken("reader@example.com", "confirm");

    expect(token).toBeTruthy();
    expect(readSubscriptionToken(token, "confirm")).toBe("reader@example.com");
    expect(readSubscriptionToken(token, "unsubscribe")).toBeNull();
    expect(readSubscriptionToken(`${token}tampered`, "confirm")).toBeNull();

    if (previousSecret === undefined) delete process.env.SUBSCRIPTION_TOKEN_SECRET;
    else process.env.SUBSCRIPTION_TOKEN_SECRET = previousSecret;
  });
});
