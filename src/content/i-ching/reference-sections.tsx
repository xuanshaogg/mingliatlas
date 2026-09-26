import Link from "next/link";
import type { Citation, Section } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import type { Statistic } from "@/components/shared/InfoCard";
import { HEXAGRAMS, type Hexagram } from "@/lib/i-ching";

const linkClass =
  "font-medium text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

export const TRIGRAMS = [
  { binary: "111", name: "Heaven", pinyin: "Qian", chinese: "乾", symbol: "☰" },
  { binary: "110", name: "Lake", pinyin: "Dui", chinese: "兑", symbol: "☱" },
  { binary: "101", name: "Fire", pinyin: "Li", chinese: "离", symbol: "☲" },
  { binary: "100", name: "Thunder", pinyin: "Zhen", chinese: "震", symbol: "☳" },
  { binary: "011", name: "Wind", pinyin: "Xun", chinese: "巽", symbol: "☴" },
  { binary: "010", name: "Water", pinyin: "Kan", chinese: "坎", symbol: "☵" },
  { binary: "001", name: "Mountain", pinyin: "Gen", chinese: "艮", symbol: "☶" },
  { binary: "000", name: "Earth", pinyin: "Kun", chinese: "坤", symbol: "☷" },
] as const;

export const TRIGRAM_NAMES: Record<string, string> = Object.fromEntries(
  TRIGRAMS.map((trigram) => [trigram.binary, trigram.name])
);

export const hexagramReferenceSources: Citation[] = [
  {
    label: "Book of Changes: received text",
    source:
      "Chinese Text Project reference for the hexagrams and commentaries. Consult a specified translation for exact English wording.",
    url: "https://ctext.org/book-of-changes",
  },
  {
    label: "Alfred Huang, The Complete I Ching",
    source:
      "Publisher record identifying the translation and edition; the summaries on this site are editorial prose.",
    url: "https://www.innertraditions.com/books/the-complete-i-ching-10th-anniversary-edition-590",
  },
];

export const hexagramDirectory: Section = {
  heading: "Find a hexagram by number and trigram pair",
  content: (
    <>
      <p>
        All 64 entries are listed in the King Wen sequence. Match the number from your cast, or
        compare the upper and lower trigrams. Each link opens the corresponding guide.
      </p>
      <nav aria-label="Hexagram number ranges" className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <a
            key={i}
            href={`#hexagrams-${i * 8 + 1}`}
            className="border-ink-200 hover:bg-paper-100 rounded-full border px-3 py-1 text-sm dark:border-white/15"
          >
            {i * 8 + 1}–{i * 8 + 8}
          </a>
        ))}
      </nav>
      <div className="space-y-8">
        {Array.from({ length: 8 }, (_, group) => (
          <section key={group} id={`hexagrams-${group * 8 + 1}`} className="scroll-mt-28">
            <h3 className="text-ink-950 dark:text-paper text-lg font-semibold">
              Hexagrams {group * 8 + 1}–{group * 8 + 8}
            </h3>
            <ol start={group * 8 + 1} className="mt-3 grid gap-3 sm:grid-cols-2">
              {HEXAGRAMS.slice(group * 8, group * 8 + 8).map((hexagram) => (
                <li key={hexagram.number}>
                  <Link
                    href={`/i-ching/hexagram-${hexagram.number}`}
                    className="atlas-surface hover:border-brand-200 flex h-full gap-3 p-4 transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="text-brand-primary dark:text-gold-300 text-3xl leading-none"
                    >
                      {String.fromCodePoint(0x4dc0 + hexagram.number - 1)}
                    </span>
                    <span>
                      <span className="text-ink-950 dark:text-paper block text-sm leading-6 font-semibold">
                        {hexagram.number}. {hexagram.name} · {hexagram.chinese}
                      </span>
                      <span className="text-ink-600 dark:text-ink-300 mt-1 block text-xs leading-5">
                        {TRIGRAM_NAMES[hexagram.binary.slice(3)]} above{" "}
                        {TRIGRAM_NAMES[hexagram.binary.slice(0, 3)]}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <p>
        If you have line values instead of a number, use the{" "}
        <Link href="/i-ching/how-to-cast" className={linkClass}>
          three-coin reference
        </Link>{" "}
        first. Values 6 and 9 also identify the moving lines; a hexagram name alone does not
        preserve that information.
      </p>
    </>
  ),
};

const trigramReference: Section = {
  heading: "Eight-trigram reference: names, images and line patterns",
  content: (
    <>
      <p>
        In the patterns below, read the digits from bottom to top: 1 is an unbroken yang line and 0
        is a broken yin line. Three positions with two possibilities give eight patterns.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TRIGRAMS.map((trigram) => (
          <div key={trigram.binary} className="atlas-surface flex items-center gap-4 p-4">
            <span aria-hidden="true" className="text-brand-primary dark:text-gold-300 text-4xl">
              {trigram.symbol}
            </span>
            <div>
              <h3 className="text-base font-semibold">
                {trigram.chinese} {trigram.pinyin} · {trigram.name}
              </h3>
              <p className="mt-1 text-sm">
                <code>{trigram.binary}</code> · bottom to top
              </p>
            </div>
          </div>
        ))}
      </div>
      <p>
        The natural images are discussed in the{" "}
        <a href="https://ctext.org/book-of-changes/shuo-gua" className={linkClass}>
          Shuo Gua commentary
        </a>
        . Directional layouts add another convention, so the order of this reference is not a
        room-layout map.
      </p>
      <p>
        <strong>Worked comparison:</strong>{" "}
        <Link href="/i-ching/hexagram-63" className={linkClass}>
          Hexagram 63, After Completion
        </Link>
        , places Water (Kan) above Fire (Li). Reversing those trigrams gives{" "}
        <Link href="/i-ching/hexagram-64" className={linkClass}>
          Hexagram 64, Before Completion
        </Link>
        . Check both positions; the same two images can form different figures.
      </p>
    </>
  ),
};

const coinReference: Section = {
  heading: "Three-coin values and a complete worked cast",
  content: (
    <>
      <p>
        This guide uses tails = 2 and heads = 3. Add three coins for each line and write the first
        result at the bottom. Keep that convention for the whole cast.
      </p>
      <div className="border-ink-200 overflow-x-auto rounded-xl border dark:border-white/15">
        <table className="w-full min-w-[30rem] text-left text-sm leading-6">
          <caption className="p-4 text-left font-semibold">
            Line values for three independent, fair coins
          </caption>
          <thead className="bg-paper-100 dark:bg-white/5">
            <tr>
              {["Total", "Line", "Action", "Probability"].map((title) => (
                <th key={title} scope="col" className="p-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["6", "Old yin · broken", "Changes to yang", "1/8"],
              ["7", "Young yang · solid", "Stays yang", "3/8"],
              ["8", "Young yin · broken", "Stays yin", "3/8"],
              ["9", "Old yang · solid", "Changes to yin", "1/8"],
            ].map(([value, line, action, probability]) => (
              <tr key={value} className="border-ink-100 border-t dark:border-white/10">
                <th scope="row" className="p-3">
                  {value}
                </th>
                <td className="p-3">{line}</td>
                <td className="p-3">{action}</td>
                <td className="p-3">{probability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>Example, from bottom to top:</strong> 7, 8, 9, 8, 7, 8 forms the pattern 101010,{" "}
        <Link href="/i-ching/hexagram-63" className={linkClass}>
          Hexagram 63
        </Link>
        . Only line 3 moves. Change that line from yang to yin to obtain 100010,{" "}
        <Link href="/i-ching/hexagram-3" className={linkClass}>
          Hexagram 3
        </Link>
        . The remaining five lines stay as cast.
      </p>
      <p>
        The fractions come from the eight equally likely outcomes of three ideal coins: one produces
        6, three produce 7, three produce 8 and one produces 9. They describe a casting model, not
        the likelihood of a life event.
      </p>
      <p>
        Save all six totals and the question. A note that only says “Hexagram 63” loses the
        moving-line information. Continue with the{" "}
        <Link href="/blog/i-ching-beginners-reading-guide" className={linkClass}>
          beginner reading workflow
        </Link>{" "}
        and consult your chosen edition for the line passage.
      </p>
    </>
  ),
};

export const iChingReferenceSections: Record<string, Section> = {
  "eight-trigrams": trigramReference,
  "sixty-four-hexagrams": hexagramDirectory,
  "how-to-cast": coinReference,
};

export const iChingIntroHighlights: Partial<
  Record<string, { subtitle: string; stats: Statistic[] }>
> = {
  "eight-trigrams": {
    subtitle: "Compare the eight figures, their line patterns and their natural images.",
    stats: [
      { value: "8", label: "Trigrams", description: "Eight possible yin and yang arrangements." },
      {
        value: "3",
        label: "Lines per trigram",
        description: "Read each pattern from bottom to top.",
      },
      {
        value: "64",
        label: "Combinations",
        description: "Pair a lower trigram with an upper trigram.",
      },
    ],
  },
  "sixty-four-hexagrams": {
    subtitle: "A complete directory in King Wen order, with names and trigram pairs.",
    stats: [
      {
        value: "64",
        label: "Hexagrams",
        description: "Find every figure in the received sequence.",
      },
      {
        value: "8",
        label: "Trigrams",
        description: "The building blocks of each upper and lower pair.",
      },
      {
        value: "6",
        label: "Lines per figure",
        description: "Keep the line values alongside the number.",
      },
    ],
  },
  "how-to-cast": {
    subtitle: "Record a three-coin cast and follow a worked example from lines to hexagrams.",
    stats: [
      {
        value: "3",
        label: "Coins",
        description: "Choose one heads/tails convention before starting.",
      },
      { value: "6", label: "Throws", description: "Build the figure from the bottom line upward." },
      { value: "4", label: "Line values", description: "6 and 9 change; 7 and 8 remain as cast." },
    ],
  },
};

export const iChingIntroAnswers: Record<string, string> = {
  "eight-trigrams":
    "The eight trigrams are Qian (Heaven), Dui (Lake), Li (Fire), Zhen (Thunder), Xun (Wind), Kan (Water), Gen (Mountain) and Kun (Earth). Each has three yin or yang lines. Combining a lower trigram with an upper trigram creates one of the 64 hexagrams.",
  "sixty-four-hexagrams":
    "The I Ching has 64 hexagrams, each made of six yin or yang lines. This directory lists every figure in the King Wen sequence with its number, name and upper/lower trigram pair. Open the matching guide, then consult your chosen edition for the Judgment, Image and any changing-line passages.",
  "how-to-cast":
    "Toss three coins six times. With tails = 2 and heads = 3, each total is 6, 7, 8 or 9. Record the first line at the bottom and build upward. Values 6 and 9 change to their opposites; values 7 and 8 stay unchanged. Identify the primary figure, then change the moving lines to find the relating figure.",
};

export const iChingIntroFaqs: Record<string, FAQ[]> = {
  "eight-trigrams": [
    {
      question: "What is the difference between a trigram and a hexagram?",
      answer:
        "A trigram has three lines. A hexagram has six, read as a lower and an upper trigram. Eight possible lower figures times eight upper figures gives 64 combinations.",
    },
    {
      question: "Do I read the line pattern from the top or the bottom?",
      answer:
        "Casting starts at the bottom. This reference writes binary patterns in casting order, from bottom to top. Check the convention before comparing another chart.",
    },
    {
      question: "Are Hexagrams 63 and 64 the same two trigrams?",
      answer:
        "Yes, in reversed positions. Hexagram 63 has Water above Fire; Hexagram 64 has Fire above Water. Position is part of the figure's identity.",
    },
  ],
  "sixty-four-hexagrams": [
    {
      question: "Why are there exactly 64 hexagrams?",
      answer:
        "Each of six positions can be yin or yang, giving 2 to the sixth power, or 64 line patterns. Equivalently, eight lower trigrams can combine with eight upper trigrams.",
    },
    {
      question: "What is the King Wen sequence?",
      answer:
        "It is the received ordering used by this directory, beginning with Qian and Kun and ending with After Completion and Before Completion. Its numbers identify the figures; they are not scores or probabilities.",
    },
    {
      question: "Do changing lines change the hexagram number?",
      answer:
        "A 6 or 9 changes its line to the opposite type when constructing the relating figure. Identify that new six-line pattern separately. With no moving lines, there is no separate relating figure in this workflow.",
    },
  ],
  "how-to-cast": [
    {
      question: "How many coin tosses do I need?",
      answer:
        "Make six throws of three coins. Each throw supplies one line, beginning at the bottom. Record all six totals before interpreting the result.",
    },
    {
      question: "Which coin values make a changing line?",
      answer:
        "With the convention tails = 2 and heads = 3, total 6 is old yin and changes to yang; total 9 is old yang and changes to yin. Totals 7 and 8 stay as cast.",
    },
    {
      question: "Can I reverse the heads and tails values?",
      answer:
        "Some methods use the opposite assignment. Choose one documented convention before casting and keep it fixed. This site's input controls and worked example use tails = 2 and heads = 3.",
    },
  ],
};

export function hexagramStructureSection(hexagram: Hexagram): Section {
  return {
    heading: "Structure and source notes",
    content: (
      <>
        <p>
          <strong>
            {hexagram.chinese} · {hexagram.name}:
          </strong>{" "}
          {TRIGRAM_NAMES[hexagram.binary.slice(3)]} above{" "}
          {TRIGRAM_NAMES[hexagram.binary.slice(0, 3)]}. The line pattern is{" "}
          <code>{hexagram.binary}</code>, written from bottom to top, with 1 for yang and 0 for yin.
        </p>
        <p>
          This guide provides editorial summaries and modern reading suggestions. Short descriptions
          of the Judgment and Image are paraphrases, not verbatim translations. Use the received
          text and a specified edition for exact wording, especially individual line passages.
        </p>
        <p>
          Compare the{" "}
          <Link href="/i-ching/sixty-four-hexagrams" className={linkClass}>
            complete 64-hexagram directory
          </Link>{" "}
          or return to the{" "}
          <Link href="/i-ching/how-to-cast" className={linkClass}>
            casting method and worked example
          </Link>{" "}
          if your number and line pattern disagree.
        </p>
      </>
    ),
  };
}
