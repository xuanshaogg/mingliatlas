export interface HexagramLine {
  position: number;
  isYang: boolean;
  changing: boolean;
}

export interface Hexagram {
  number: number;
  name: string;
  chinese: string;
  binary: string;
  judgment: string;
  image: string;
}

export interface IChingCastInput {
  question?: string;
  coins: Array<[number, number, number]>;
}

export interface IChingReading {
  question: string;
  lines: HexagramLine[];
  primary: Hexagram;
  relating?: Hexagram;
  changingLines: number[];
  summary: string;
  notes: string[];
}

export const HEXAGRAMS: Hexagram[] = [
  { number: 1, name: "The Creative", chinese: "乾", binary: "111111", judgment: "Initiating power, disciplined momentum, and clear direction.", image: "Heaven moves with strength; the wise person acts with steady purpose." },
  { number: 2, name: "The Receptive", chinese: "坤", binary: "000000", judgment: "Support, patience, cultivation, and grounded responsiveness.", image: "Earth carries all things; the wise person works through steadiness." },
  { number: 3, name: "Difficulty at the Beginning", chinese: "屯", binary: "100010", judgment: "Early disorder asks for structure before speed.", image: "Thunder and rain begin; organize before forcing progress." },
  { number: 4, name: "Youthful Folly", chinese: "蒙", binary: "010001", judgment: "Learning requires humility, repetition, and clear questions.", image: "A spring flows under the mountain; education turns uncertainty into form." },
  { number: 5, name: "Waiting", chinese: "需", binary: "111010", judgment: "Right timing matters; prepare while conditions gather.", image: "Clouds rise above heaven; nourishment comes through patient readiness." },
  { number: 6, name: "Conflict", chinese: "讼", binary: "010111", judgment: "Do not escalate a dispute without clarifying terms.", image: "Heaven and water move apart; examine the origin of disagreement." },
  { number: 7, name: "The Army", chinese: "师", binary: "010000", judgment: "Collective effort needs discipline, leadership, and proportion.", image: "Water gathers in the earth; organize people around a clear standard." },
  { number: 8, name: "Holding Together", chinese: "比", binary: "000010", judgment: "Alliance works when commitment and timing are sincere.", image: "Water rests on the earth; communities form around shared trust." },
  { number: 9, name: "Small Taming", chinese: "小畜", binary: "111011", judgment: "Small restraints refine a larger force.", image: "Wind moves across heaven; details shape momentum." },
  { number: 10, name: "Treading", chinese: "履", binary: "110111", judgment: "Careful conduct protects progress in sensitive conditions.", image: "Heaven above the lake; distinguish higher and lower roles." },
  { number: 11, name: "Peace", chinese: "泰", binary: "111000", judgment: "Flow between levels creates stability and shared prosperity.", image: "Heaven and earth communicate; support moves both ways." },
  { number: 12, name: "Standstill", chinese: "否", binary: "000111", judgment: "When flow is blocked, conserve integrity and avoid wasteful struggle.", image: "Heaven and earth do not meet; withdraw from empty exchange." },
  { number: 13, name: "Fellowship", chinese: "同人", binary: "101111", judgment: "Open alignment with others expands perspective.", image: "Fire rises into heaven; shared purpose clarifies the group." },
  { number: 14, name: "Great Possession", chinese: "大有", binary: "111101", judgment: "Abundance is useful only when governed with clarity.", image: "Fire above heaven; illuminate resources with responsibility." },
  { number: 15, name: "Modesty", chinese: "谦", binary: "001000", judgment: "Measured conduct makes strength acceptable and durable.", image: "A mountain within the earth; reduce excess and honor balance." },
  { number: 16, name: "Enthusiasm", chinese: "豫", binary: "000100", judgment: "Mobilize energy through rhythm, morale, and preparation.", image: "Thunder emerges from earth; movement follows stored readiness." },
  { number: 17, name: "Following", chinese: "随", binary: "100110", judgment: "Adaptation succeeds when you choose what is worth following.", image: "Thunder within the lake; rest at the right time and respond well." },
  { number: 18, name: "Work on What Has Been Spoiled", chinese: "蛊", binary: "011001", judgment: "Repair inherited patterns before asking for new growth.", image: "Wind below the mountain; renewal begins with correction." },
  { number: 19, name: "Approach", chinese: "临", binary: "110000", judgment: "Influence grows through presence, care, and timely supervision.", image: "The lake rises over earth; approach with generosity." },
  { number: 20, name: "Contemplation", chinese: "观", binary: "000011", judgment: "Step back and see the pattern before acting.", image: "Wind moves over earth; observe what your conduct teaches." },
  { number: 21, name: "Biting Through", chinese: "噬嗑", binary: "100101", judgment: "A blockage requires precise, fair, and decisive action.", image: "Thunder and lightning combine; clarify law and consequence." },
  { number: 22, name: "Grace", chinese: "贲", binary: "101001", judgment: "Form and beauty support substance when they do not replace it.", image: "Fire at the foot of the mountain; clarify appearances." },
  { number: 23, name: "Splitting Apart", chinese: "剥", binary: "000001", judgment: "When structure erodes, preserve what is essential.", image: "A mountain rests on earth; strengthen foundations quietly." },
  { number: 24, name: "Return", chinese: "复", binary: "100000", judgment: "Renewal begins with one honest return to the path.", image: "Thunder within earth; the turning point comes gently." },
  { number: 25, name: "Innocence", chinese: "无妄", binary: "100111", judgment: "Act without manipulation and stay aligned with reality.", image: "Thunder under heaven; natural action avoids excess." },
  { number: 26, name: "Great Taming", chinese: "大畜", binary: "111001", judgment: "Strong power must be stored, trained, and directed.", image: "Heaven within the mountain; cultivate depth before release." },
  { number: 27, name: "Nourishment", chinese: "颐", binary: "100001", judgment: "Watch what you feed and what feeds you.", image: "Thunder below the mountain; speech and intake shape character." },
  { number: 28, name: "Great Exceeding", chinese: "大过", binary: "011110", judgment: "A heavy load asks for transition, not denial.", image: "A lake rises above wood; reinforce what is under strain." },
  { number: 29, name: "The Abysmal", chinese: "坎", binary: "010010", judgment: "Repeated difficulty is crossed through sincerity and skill.", image: "Water flows on water; keep moving through danger." },
  { number: 30, name: "The Clinging", chinese: "离", binary: "101101", judgment: "Clarity depends on what you attach yourself to.", image: "Fire joins fire; illumination needs fuel and discernment." },
  { number: 31, name: "Influence", chinese: "咸", binary: "001110", judgment: "Mutual attraction works through openness and restraint.", image: "A lake on the mountain; influence comes through receptivity." },
  { number: 32, name: "Duration", chinese: "恒", binary: "011100", judgment: "Consistency creates trust when it can adapt without breaking.", image: "Thunder and wind endure together; stay steady in motion." },
  { number: 33, name: "Retreat", chinese: "遁", binary: "001111", judgment: "Strategic withdrawal protects long-term strength.", image: "Heaven above the mountain; step back without resentment." },
  { number: 34, name: "Great Power", chinese: "大壮", binary: "111100", judgment: "Power succeeds when governed by proportion.", image: "Thunder in heaven; strength must follow what is right." },
  { number: 35, name: "Progress", chinese: "晋", binary: "000101", judgment: "Visibility increases when support and clarity align.", image: "The sun rises over earth; advance with generosity." },
  { number: 36, name: "Darkening of the Light", chinese: "明夷", binary: "101000", judgment: "Protect inner clarity in an unsupportive environment.", image: "Light enters the earth; conceal brilliance when needed." },
  { number: 37, name: "The Family", chinese: "家人", binary: "101011", judgment: "Healthy order begins with roles, care, and example.", image: "Wind comes from fire; words and conduct shape the home." },
  { number: 38, name: "Opposition", chinese: "睽", binary: "110101", judgment: "Difference can clarify, but do not force unity too soon.", image: "Fire above the lake; honor distinct positions." },
  { number: 39, name: "Obstruction", chinese: "蹇", binary: "001010", judgment: "When blocked, seek help and choose a wiser route.", image: "Water on the mountain; turn inward and prepare." },
  { number: 40, name: "Deliverance", chinese: "解", binary: "010100", judgment: "Release tension quickly once the cause is understood.", image: "Thunder and rain arrive; forgive what no longer needs holding." },
  { number: 41, name: "Decrease", chinese: "损", binary: "110001", judgment: "Reduce excess to restore right proportion.", image: "A lake below the mountain; simplicity strengthens sincerity." },
  { number: 42, name: "Increase", chinese: "益", binary: "100011", judgment: "Growth is favorable when it benefits more than the self.", image: "Wind and thunder increase; move toward useful action." },
  { number: 43, name: "Breakthrough", chinese: "夬", binary: "111110", judgment: "State the truth clearly without aggression.", image: "A lake rises to heaven; declare what must change." },
  { number: 44, name: "Coming to Meet", chinese: "姤", binary: "011111", judgment: "An unexpected influence needs careful boundaries.", image: "Wind under heaven; encounters can be powerful." },
  { number: 45, name: "Gathering Together", chinese: "萃", binary: "000110", judgment: "Shared purpose needs a center and a ritual of trust.", image: "A lake over earth; gather people through sincerity." },
  { number: 46, name: "Pushing Upward", chinese: "升", binary: "011000", judgment: "Gradual ascent succeeds through steady effort.", image: "Wood grows from earth; rise step by step." },
  { number: 47, name: "Oppression", chinese: "困", binary: "010110", judgment: "Pressure tests speech, spirit, and priorities.", image: "A lake without water; conserve your inner resources." },
  { number: 48, name: "The Well", chinese: "井", binary: "011010", judgment: "Return to the source that nourishes everyone.", image: "Water over wood; renew the common well." },
  { number: 49, name: "Revolution", chinese: "革", binary: "101110", judgment: "Real change requires timing, legitimacy, and clear need.", image: "Fire in the lake; renew the calendar of action." },
  { number: 50, name: "The Cauldron", chinese: "鼎", binary: "011101", judgment: "Transformation happens through culture, vessel, and offering.", image: "Fire over wood; refine what nourishes the group." },
  { number: 51, name: "The Arousing", chinese: "震", binary: "100100", judgment: "Shock awakens movement; stay composed after the first impact.", image: "Thunder repeats; fear turns into discipline." },
  { number: 52, name: "Keeping Still", chinese: "艮", binary: "001001", judgment: "Stillness is active when it stops the wrong movement.", image: "Mountain on mountain; rest where rest is needed." },
  { number: 53, name: "Development", chinese: "渐", binary: "001011", judgment: "Gradual progress becomes stable through proper sequence.", image: "Wood on the mountain; growth takes position over time." },
  { number: 54, name: "The Marrying Maiden", chinese: "归妹", binary: "110100", judgment: "Unequal roles require caution, dignity, and realistic expectations.", image: "Thunder over the lake; endings reveal the proper place." },
  { number: 55, name: "Abundance", chinese: "丰", binary: "101100", judgment: "Peak visibility asks for wise use before decline begins.", image: "Thunder and lightning arrive; decide while the light is strong." },
  { number: 56, name: "The Wanderer", chinese: "旅", binary: "001101", judgment: "Travel lightly; courtesy protects you in temporary places.", image: "Fire on the mountain; clarity passes through." },
  { number: 57, name: "The Gentle", chinese: "巽", binary: "011011", judgment: "Soft persistence penetrates where force cannot.", image: "Wind follows wind; influence accumulates through repetition." },
  { number: 58, name: "The Joyous", chinese: "兑", binary: "110110", judgment: "Joy is constructive when it remains sincere.", image: "Lake joins lake; learning and exchange create delight." },
  { number: 59, name: "Dispersion", chinese: "涣", binary: "010011", judgment: "Dissolve rigidity and restore shared movement.", image: "Wind moves over water; loosen what has hardened." },
  { number: 60, name: "Limitation", chinese: "节", binary: "110010", judgment: "Good limits preserve energy; harsh limits create resistance.", image: "Water over the lake; define measure and boundary." },
  { number: 61, name: "Inner Truth", chinese: "中孚", binary: "110011", judgment: "Trust grows when inner and outer signals match.", image: "Wind over the lake; sincerity reaches others." },
  { number: 62, name: "Small Exceeding", chinese: "小过", binary: "001100", judgment: "Small adjustments are favored; avoid grand overreach.", image: "Thunder above the mountain; attend to detail." },
  { number: 63, name: "After Completion", chinese: "既济", binary: "101010", judgment: "Completion requires maintenance because imbalance can return.", image: "Water above fire; success needs vigilance." },
  { number: 64, name: "Before Completion", chinese: "未济", binary: "010101", judgment: "The transition is not finished; sequence matters.", image: "Fire above water; cross carefully before claiming arrival." },
];

const HEXAGRAM_BY_BINARY = new Map(HEXAGRAMS.map((hexagram) => [hexagram.binary, hexagram]));

export function castIChingReading(input: IChingCastInput): IChingReading {
  if (input.coins.length !== 6) {
    throw new Error("An I Ching cast needs exactly six coin lines.");
  }

  const lines = input.coins.map((coins, index) => buildLine(index + 1, coins));
  const primary = getHexagram(lines.map((line) => (line.isYang ? "1" : "0")).join(""));
  const changingLines = lines.filter((line) => line.changing).map((line) => line.position);
  const relatingLines = lines.map((line) => (line.changing ? !line.isYang : line.isYang));
  const relatingBinary = relatingLines.map((isYang) => (isYang ? "1" : "0")).join("");
  const relating = changingLines.length ? getHexagram(relatingBinary) : undefined;

  return {
    question: input.question?.trim() || "Open reflection",
    lines,
    primary,
    relating,
    changingLines,
    summary: buildSummary(primary, relating, changingLines),
    notes: [
      "Lines are built from the bottom upward, following the traditional six-line casting order.",
      "Three heads create old yang; three tails create old yin. Old lines are treated as changing lines.",
      "This oracle is a reflective tool, not a command or fixed forecast.",
    ],
  };
}

export function createCoinCast(seed = Date.now()): Array<[number, number, number]> {
  let state = seed >>> 0;

  return Array.from({ length: 6 }, () => {
    const coins: [number, number, number] = [nextCoin(), nextCoin(), nextCoin()];
    return coins;
  });

  function nextCoin(): number {
    state = (1664525 * state + 1013904223) >>> 0;
    return state % 2 === 0 ? 2 : 3;
  }
}

export function getHexagramByNumber(number: number): Hexagram {
  const hexagram = HEXAGRAMS.find((item) => item.number === number);
  if (!hexagram) {
    throw new Error(`Unknown hexagram number: ${number}`);
  }

  return hexagram;
}

function buildLine(position: number, coins: [number, number, number]): HexagramLine {
  const total = coins.reduce((sum, coin) => sum + coin, 0);
  if (![6, 7, 8, 9].includes(total)) {
    throw new Error("Each coin value must be 2 for tails or 3 for heads.");
  }

  return {
    position,
    isYang: total === 7 || total === 9,
    changing: total === 6 || total === 9,
  };
}

function getHexagram(binary: string): Hexagram {
  const hexagram = HEXAGRAM_BY_BINARY.get(binary);
  if (!hexagram) {
    throw new Error(`Missing hexagram mapping for binary ${binary}.`);
  }

  return hexagram;
}

function buildSummary(primary: Hexagram, relating: Hexagram | undefined, changingLines: number[]): string {
  if (!relating) {
    return `${primary.name} (${primary.chinese}) points to ${primary.judgment.toLowerCase()}`;
  }

  return `${primary.name} (${primary.chinese}) changes through line ${changingLines.join(", ")} toward ${relating.name} (${relating.chinese}). Read the first hexagram as the present pattern and the relating hexagram as the direction of change.`;
}
