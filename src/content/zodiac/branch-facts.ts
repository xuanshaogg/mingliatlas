import { BRANCHES, STEMS } from "@/lib/bazi/chart";

// Calendar correspondences of the twelve Earthly Branches. These are standard
// Zi Ping conventions (two-hour periods, solar months that begin at a Jie
// term, directions, seasons) and match the Earthly Branches guide; hidden
// stems come from the same table the Bazi calculator uses.

export interface BranchFacts {
  animal: string;
  chinese: string;
  pinyin: string;
  hours: string;
  month: number;
  jie: string;
  direction: string;
  season: string;
}

export const BRANCH_ORDER: BranchFacts[] = [
  { animal: "Rat", chinese: "子", pinyin: "Zi", hours: "11 pm–1 am", month: 11, jie: "Da Xue (大雪, Major Snow)", direction: "north", season: "midwinter" },
  { animal: "Ox", chinese: "丑", pinyin: "Chou", hours: "1–3 am", month: 12, jie: "Xiao Han (小寒, Minor Cold)", direction: "north-northeast", season: "late winter" },
  { animal: "Tiger", chinese: "寅", pinyin: "Yin", hours: "3–5 am", month: 1, jie: "Li Chun (立春, Start of Spring)", direction: "east-northeast", season: "early spring" },
  { animal: "Rabbit", chinese: "卯", pinyin: "Mao", hours: "5–7 am", month: 2, jie: "Jing Zhe (惊蛰, Awakening of Insects)", direction: "east", season: "mid-spring" },
  { animal: "Dragon", chinese: "辰", pinyin: "Chen", hours: "7–9 am", month: 3, jie: "Qing Ming (清明, Pure Brightness)", direction: "east-southeast", season: "late spring" },
  { animal: "Snake", chinese: "巳", pinyin: "Si", hours: "9–11 am", month: 4, jie: "Li Xia (立夏, Start of Summer)", direction: "south-southeast", season: "early summer" },
  { animal: "Horse", chinese: "午", pinyin: "Wu", hours: "11 am–1 pm", month: 5, jie: "Mang Zhong (芒种, Grain in Ear)", direction: "south", season: "midsummer" },
  { animal: "Goat", chinese: "未", pinyin: "Wei", hours: "1–3 pm", month: 6, jie: "Xiao Shu (小暑, Minor Heat)", direction: "south-southwest", season: "late summer" },
  { animal: "Monkey", chinese: "申", pinyin: "Shen", hours: "3–5 pm", month: 7, jie: "Li Qiu (立秋, Start of Autumn)", direction: "west-southwest", season: "early autumn" },
  { animal: "Rooster", chinese: "酉", pinyin: "You", hours: "5–7 pm", month: 8, jie: "Bai Lu (白露, White Dew)", direction: "west", season: "mid-autumn" },
  { animal: "Dog", chinese: "戌", pinyin: "Xu", hours: "7–9 pm", month: 9, jie: "Han Lu (寒露, Cold Dew)", direction: "west-northwest", season: "late autumn" },
  { animal: "Pig", chinese: "亥", pinyin: "Hai", hours: "9–11 pm", month: 10, jie: "Li Dong (立冬, Start of Winter)", direction: "north-northwest", season: "early winter" },
];

const SIX_COMBINATIONS = [["Rat", "Ox"], ["Tiger", "Pig"], ["Rabbit", "Dog"], ["Dragon", "Rooster"], ["Snake", "Monkey"], ["Horse", "Goat"]];
const SIX_HARMS = [["Rat", "Goat"], ["Ox", "Horse"], ["Tiger", "Snake"], ["Rabbit", "Dragon"], ["Monkey", "Pig"], ["Rooster", "Dog"]];
const TRIADS: Array<{ members: string[]; element: string }> = [
  { members: ["Monkey", "Rat", "Dragon"], element: "Water" },
  { members: ["Tiger", "Horse", "Dog"], element: "Fire" },
  { members: ["Pig", "Rabbit", "Goat"], element: "Wood" },
  { members: ["Snake", "Rooster", "Ox"], element: "Metal" },
];

function partner(pairs: string[][], animal: string): string {
  const pair = pairs.find((candidate) => candidate.includes(animal));
  if (!pair) throw new Error(`No pair for ${animal}`);
  return pair[0] === animal ? pair[1] : pair[0];
}

export function branchFacts(animal: string): BranchFacts {
  const facts = BRANCH_ORDER.find((branch) => branch.animal === animal);
  if (!facts) throw new Error(`Unknown animal ${animal}`);
  return facts;
}

export function hiddenStemsText(animal: string): string {
  const meta = BRANCHES[branchFacts(animal).chinese];
  return meta.hiddenStems
    .map(({ stem }) => `${STEMS[stem].pinyin} ${stem} (${STEMS[stem].name})`)
    .join(", ");
}

export function relationships(animal: string) {
  const index = BRANCH_ORDER.findIndex((branch) => branch.animal === animal);
  const triad = TRIADS.find((group) => group.members.includes(animal))!;
  return {
    combination: partner(SIX_COMBINATIONS, animal),
    triad,
    triadPartners: triad.members.filter((member) => member !== animal),
    clash: BRANCH_ORDER[(index + 6) % 12].animal,
    harm: partner(SIX_HARMS, animal),
  };
}

/** How a sign relates to another sign's branch, in the traditional pair/triad terms. */
export function relationTo(animal: string, other: string): string {
  if (animal === other) return "its own sign's year (Ben Ming Nian, 本命年)";
  const rel = relationships(animal);
  if (rel.combination === other) return "a six-combination (Liu He) partner";
  if (rel.triadPartners.includes(other)) return `a member of the same ${rel.triad.element} triad`;
  if (rel.clash === other) return "the opposing branch (a clash, Chong)";
  if (rel.harm === other) return "a six-harm (Liu Hai) pair";
  return "neither a traditional harmony nor a clash pair";
}
