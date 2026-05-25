export type ZodiacSign =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

export interface ZodiacSignMeta {
  slug: ZodiacSign;
  name: string;
  branch: string;
  element: string;
  polarity: string;
}

export interface ZodiacCompatibilityResult {
  signA: ZodiacSignMeta;
  signB: ZodiacSignMeta;
  score: number;
  label: string;
  relationship: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  conversationPrompts: string[];
}

export const ZODIAC_SIGNS: ZodiacSignMeta[] = [
  { slug: "rat", name: "Rat", branch: "Zi", element: "Water", polarity: "Yang" },
  { slug: "ox", name: "Ox", branch: "Chou", element: "Earth", polarity: "Yin" },
  { slug: "tiger", name: "Tiger", branch: "Yin", element: "Wood", polarity: "Yang" },
  { slug: "rabbit", name: "Rabbit", branch: "Mao", element: "Wood", polarity: "Yin" },
  { slug: "dragon", name: "Dragon", branch: "Chen", element: "Earth", polarity: "Yang" },
  { slug: "snake", name: "Snake", branch: "Si", element: "Fire", polarity: "Yin" },
  { slug: "horse", name: "Horse", branch: "Wu", element: "Fire", polarity: "Yang" },
  { slug: "goat", name: "Goat", branch: "Wei", element: "Earth", polarity: "Yin" },
  { slug: "monkey", name: "Monkey", branch: "Shen", element: "Metal", polarity: "Yang" },
  { slug: "rooster", name: "Rooster", branch: "You", element: "Metal", polarity: "Yin" },
  { slug: "dog", name: "Dog", branch: "Xu", element: "Earth", polarity: "Yang" },
  { slug: "pig", name: "Pig", branch: "Hai", element: "Water", polarity: "Yin" },
];

const HARMONY_PAIRS: Array<[ZodiacSign, ZodiacSign]> = [
  ["rat", "ox"],
  ["tiger", "pig"],
  ["rabbit", "dog"],
  ["dragon", "rooster"],
  ["snake", "monkey"],
  ["horse", "goat"],
];

const CLASH_PAIRS: Array<[ZodiacSign, ZodiacSign]> = [
  ["rat", "horse"],
  ["ox", "goat"],
  ["tiger", "monkey"],
  ["rabbit", "rooster"],
  ["dragon", "dog"],
  ["snake", "pig"],
];

const TRIADS: ZodiacSign[][] = [
  ["rat", "dragon", "monkey"],
  ["ox", "snake", "rooster"],
  ["tiger", "horse", "dog"],
  ["rabbit", "goat", "pig"],
];

export function calculateZodiacCompatibility(signA: ZodiacSign, signB: ZodiacSign): ZodiacCompatibilityResult {
  const first = getZodiacSign(signA);
  const second = getZodiacSign(signB);

  if (signA === signB) {
    return {
      signA: first,
      signB: second,
      score: 78,
      label: "Mirror Pattern",
      relationship: "Same sign",
      summary: `${first.name} and ${second.name} share the same branch rhythm, which can feel familiar and direct. The main risk is doubling the same blind spot.`,
      strengths: ["Fast mutual recognition", "Shared pacing and instincts", "Easy cultural symbolism for planning"],
      watchouts: ["Similar habits can reinforce each other", "Conflict may become repetitive", "A full Bazi comparison is still needed"],
      conversationPrompts: [
        `What habits do you both share that might be worth questioning?`,
        `Where do you each feel most understood by the other?`,
        `What would a different perspective bring to your dynamic?`,
      ],
    };
  }

  if (hasPair(HARMONY_PAIRS, signA, signB)) {
    return buildResult(first, second, 92, "Strong Harmony", "Liu He harmony pair", [
      "Natural support pattern in the 12-branch cycle",
      "Good rhythm for partnership and cooperation",
      "Differences tend to feel complementary",
    ]);
  }

  const sharedTriad = TRIADS.find((triad) => triad.includes(signA) && triad.includes(signB));
  if (sharedTriad) {
    return buildResult(first, second, 86, "Affinity Match", `Three-harmony group: ${sharedTriad.map((sign) => getZodiacSign(sign).name).join(", ")}`, [
      "Shared directional momentum",
      "Easier collaboration around goals",
      "Good long-range rapport when values are aligned",
    ]);
  }

  if (hasPair(CLASH_PAIRS, signA, signB)) {
    return {
      signA: first,
      signB: second,
      score: 42,
      label: "Growth Through Contrast",
      relationship: "Branch clash pair",
      summary: `${first.name} and ${second.name} sit opposite each other in the branch cycle. This can create friction, but it can also clarify boundaries and priorities.`,
      strengths: ["Different viewpoints can expose blind spots", "Strong chemistry when both sides respect pacing", "Useful for growth-oriented partnerships"],
      watchouts: ["Different timing and stress responses", "Higher need for explicit agreements", "Avoid using the clash as a fixed verdict"],
      conversationPrompts: [
        `Where do you each feel the most friction — and what does it reveal?`,
        `How do you each handle pressure differently?`,
        `What would it look like to use your differences as a strength?`,
      ],
    };
  }

  const score = first.element === second.element ? 72 : 64;
  return buildResult(first, second, score, "Neutral to Workable", "No major harmony or clash pattern", [
    "Flexible baseline for friendship or collaboration",
    "Outcome depends more on communication and complete charts",
    "Element and polarity details can refine the reading",
  ]);
}

function buildResult(
  first: ZodiacSignMeta,
  second: ZodiacSignMeta,
  score: number,
  label: string,
  relationship: string,
  strengths: string[],
  conversationPrompts: string[] = [
    `What do you each bring to the relationship that the other doesn't?`,
    `Where do your rhythms naturally align?`,
    `What would a deeper Bazi comparison reveal about your dynamic?`,
  ],
): ZodiacCompatibilityResult {
  return {
    signA: first,
    signB: second,
    score,
    label,
    relationship,
    summary: `${first.name} and ${second.name} form a ${relationship.toLowerCase()} pattern. This suggests easier rhythm, but real compatibility still depends on choices, values, and the complete Bazi charts.`,
    strengths,
    watchouts: [
      "Do not reduce a relationship to year signs only",
      "Check communication style and life stage",
      "Use this as a conversation starter, not a guarantee",
    ],
    conversationPrompts,
  };
}

function getZodiacSign(sign: ZodiacSign): ZodiacSignMeta {
  const match = ZODIAC_SIGNS.find((item) => item.slug === sign);
  if (!match) {
    throw new Error(`Unknown zodiac sign: ${sign}`);
  }

  return match;
}

function hasPair(pairs: Array<[ZodiacSign, ZodiacSign]>, signA: ZodiacSign, signB: ZodiacSign): boolean {
  return pairs.some(([first, second]) => (first === signA && second === signB) || (first === signB && second === signA));
}
