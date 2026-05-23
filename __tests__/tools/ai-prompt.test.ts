import { describe, expect, it } from "vitest";
import { buildInterpretationPrompt } from "../../src/lib/ai/prompt";

describe("AI interpretation prompt", () => {
  it("includes safety boundaries and structured payload", () => {
    const prompt = buildInterpretationPrompt({
      tool: "bazi",
      payload: { dayMaster: "丙", pillars: ["己巳", "丙子", "丙寅", "甲午"] },
    });

    expect(prompt.system).toContain("non-fatalistic");
    expect(prompt.system).toContain("for entertainment and self-reflection purposes");
    expect(prompt.user).toContain('"dayMaster": "丙"');
    expect(prompt.user).toContain("3 practical reflection points");
  });
});
