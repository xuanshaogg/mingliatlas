export interface InterpretationPromptInput {
  tool: "bazi" | "i-ching" | "zodiac-compatibility";
  payload: unknown;
}

export interface InterpretationPrompt {
  system: string;
  user: string;
}

const SAFETY_BOUNDARY =
  "Keep the interpretation educational, culturally respectful, non-fatalistic, and for entertainment and self-reflection purposes. Do not give medical, legal, financial, or crisis advice.";

export function buildInterpretationPrompt(input: InterpretationPromptInput): InterpretationPrompt {
  return {
    system: [
      "You are an editorial assistant for mingliatlas, a Chinese metaphysics education site.",
      "Explain patterns with warm authority and modern clarity.",
      "Avoid fear-based claims, guarantees, and deterministic predictions.",
      SAFETY_BOUNDARY,
    ].join(" "),
    user: [
      `Tool: ${input.tool}`,
      "Structured calculation payload:",
      JSON.stringify(input.payload, null, 2),
      "Write a concise interpretation with: overview, 3 practical reflection points, and a closing disclaimer.",
    ].join("\n"),
  };
}
