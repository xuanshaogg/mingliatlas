import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { HEXAGRAMS } from "@/lib/i-ching";
import { SITE } from "@/lib/constants";

export interface IChingContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

interface IntroTopic {
  slug: string;
  label: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  datePublished?: string;
  dateModified?: string;
}

const relatedLinks = [
  { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Cast a six-line hexagram in the browser." },
  { title: "Bazi Overview", href: "/bazi", description: "Compare decision context with a natal chart system." },
  { title: "Learn Resources", href: "/learn/resources", description: "Find a guided path through Chinese metaphysics." },
];

const PAIRED_HEXAGRAMS: Record<number, number> = {
  1: 2, 2: 1, 3: 4, 4: 3, 5: 6, 6: 5, 7: 8, 8: 7, 9: 10, 10: 9,
  11: 12, 12: 11, 13: 14, 14: 13, 15: 16, 16: 15, 17: 18, 18: 17, 19: 20, 20: 19,
  21: 22, 22: 21, 23: 24, 24: 23, 25: 26, 26: 25, 27: 28, 28: 27, 29: 30, 30: 29,
  31: 32, 32: 31, 33: 34, 34: 33, 35: 36, 36: 35, 37: 38, 38: 37, 39: 40, 40: 39,
  41: 42, 42: 41, 43: 44, 44: 43, 45: 46, 46: 45, 47: 48, 48: 47, 49: 50, 50: 49,
  51: 52, 52: 51, 53: 54, 54: 53, 55: 56, 56: 55, 57: 58, 58: 57, 59: 60, 60: 59,
  61: 62, 62: 61, 63: 64, 64: 63,
};

const HEXAGRAM_PINYIN: Record<number, string> = {
  1: "Qian",
  2: "Kun",
  3: "Zhun",
  4: "Meng",
  5: "Xu",
  6: "Song",
  7: "Shi",
  8: "Bi",
  9: "Xiao Chu",
  10: "Lu",
  11: "Tai",
  12: "Pi",
  13: "Tong Ren",
  14: "Da You",
  15: "Qian",
  16: "Yu",
  17: "Sui",
  18: "Gu",
  19: "Lin",
  20: "Guan",
  21: "Shi He",
  22: "Bi",
  23: "Bo",
  24: "Fu",
  25: "Wu Wang",
  26: "Da Chu",
  27: "Yi",
  28: "Da Guo",
  29: "Kan",
  30: "Li",
  31: "Xian",
  32: "Heng",
  33: "Dun",
  34: "Da Zhuang",
  35: "Jin",
  36: "Ming Yi",
  37: "Jia Ren",
  38: "Kui",
  39: "Jian",
  40: "Xie",
  41: "Sun",
  42: "Yi",
  43: "Guai",
  44: "Gou",
  45: "Cui",
  46: "Sheng",
  47: "Kun",
  48: "Jing",
  49: "Ge",
  50: "Ding",
  51: "Zhen",
  52: "Gen",
  53: "Jian",
  54: "Gui Mei",
  55: "Feng",
  56: "Lu",
  57: "Xun",
  58: "Dui",
  59: "Huan",
  60: "Jie",
  61: "Zhong Fu",
  62: "Xiao Guo",
  63: "Jiji",
  64: "Weiji",
};

const TRIGRAM_NAMES: Record<string, string> = {
  "111": "Heaven",
  "000": "Earth",
  "100": "Thunder",
  "010": "Water",
  "001": "Mountain",
  "011": "Wind",
  "101": "Fire",
  "110": "Lake",
};

const defaultFaqs: FAQ[] = [
  {
    question: "What is the I Ching used for?",
    answer:
      "The I Ching is used for structured reflection. It frames a question through hexagrams, changing lines, and patterns of movement.",
  },
  {
    question: "How many I Ching hexagrams are there?",
    answer:
      "There are 64 hexagrams. Each hexagram contains six yin or yang lines, and changing lines can create a relating hexagram.",
  },
  {
    question: "Is the I Ching a fixed forecast?",
    answer:
      "No. A responsible reading treats the result as symbolic guidance for reflection, timing, and better questions.",
  },
  {
    question: "How should beginners start?",
    answer:
      "Learn yin and yang lines, the eight trigrams, the 64-hexagram structure, and then practice with simple questions.",
  },
];

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "I Ching", href: "/i-ching" },
    { label: current, href },
  ];
}

function cta(title = "Cast a hexagram") {
  return {
    title,
    description:
      "Use the free I Ching Oracle to cast six lines and compare the primary and relating hexagrams.",
    href: "/tools/i-ching-oracle",
    label: "Open oracle",
  };
}

const defaultEditorialQuote = {
  text: "A useful I Ching reading treats the hexagram as structured reflection, then returns the answer to the real question.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
}

function buildPage(input: Omit<IChingContentPage, "data"> & KnowledgePageProps): IChingContentPage {
  const { slug, path, title, description, ...data } = input;

  return {
    slug,
    path,
    title,
    description,
    data: {
      ...data,
      title,
      sections: withEditorialQuote(data.sections),
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-01-20",
        dateModified: data.schema.dateModified ?? "2026-02-05",
      },
    },
  };
}

const overview = buildPage({
  slug: "",
  path: "/i-ching",
  title: "I Ching (Book of Changes): Complete Guide",
  description:
    "The I Ching, or Book of Changes, is a 64-hexagram Chinese classic used for structured reflection, timing, and decision context.",
  entityName: "I Ching",
  entityType: "DefinedTerm",
  subtitle: "A beginner-friendly guide to hexagrams, trigrams, changing lines, and reflective use.",
  directAnswer:
    "The I Ching, or Book of Changes, is a Chinese classic built around 64 hexagrams. Each hexagram is made from six yin or yang lines. Readers use it to examine change, timing, tension, and possible responses to a question in a specific moment. A careful reading compares the primary hexagram, changing lines, and the question itself before drawing a practical conclusion.",
  breadcrumbs: breadcrumbs("Overview", "/i-ching"),
  schema: {
    headline: "",
    description: "",
    url: "",
    datePublished: "2025-11-10",
    dateModified: "2026-07-13",
  },
  stats: [
    { value: "64", label: "Hexagrams", description: "The complete Book of Changes structure." },
    { value: "8", label: "Trigrams", description: "Three-line building blocks of hexagrams." },
    { value: "6", label: "Lines", description: "Every hexagram has six line positions." },
  ],
  citations: [
    {
      label: "Richard Wilhelm & Cary Baynes, The I Ching or Book of Changes (1950)",
      source: "Standard English translation of the I Ching, including the Ten Wings commentaries.",
    },
    {
      label: "Alfred Huang, The Complete I Ching (2004)",
      source:
        "Modern English reference covering all 64 hexagrams with classical and contemporary interpretation.",
    },
  ],
  sections: [
    {
      heading: "How the I Ching works",
      content: (
        <>
          <p>
            A reading begins with a question and a cast. The six lines form a primary hexagram. If
            old yin or old yang lines appear, they change and create a relating hexagram that shows
            the direction of movement.
          </p>
          <p>
            Unlike natal systems such as{" "}
            <Link
              href="/bazi"
              className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
            >
              Bazi
            </Link>
            , the I Ching focuses on a specific question, moment, or decision context rather than a
            fixed birth chart. The same person can receive different hexagrams on different days
            because the question and timing change.
          </p>
        </>
      ),
    },
    {
      heading: "Anatomy of a hexagram",
      content: (
        <>
          <p>
            A hexagram is read from the bottom line upward. The lower three lines form the inner
            trigram and the upper three lines form the outer trigram. The pair creates a
            relationship between inner conditions and outward circumstances: Water below Thunder,
            for example, describes a different pattern from Thunder below Water even though the same
            two trigrams are present.
          </p>
          <p>
            Line position adds another layer. The first line often concerns beginnings and immediate
            action; the second and fifth positions are central to their trigrams; the top line often
            shows a pattern reaching its limit. These are reading conventions, not automatic
            definitions. A line text still has to be interpreted through the hexagram&apos;s
            Judgment, Image, trigram relationship, and the question that produced the cast.
          </p>
          <p>
            The primary hexagram names the present pattern. Its Judgment gives a compact
            orientation, while the Image turns the trigram relationship into an example of conduct.
            Changing line texts identify the parts of the situation under pressure. Reading these
            layers in order prevents one dramatic phrase from being separated from the structure
            that gives it meaning.
          </p>
        </>
      ),
    },
    {
      heading: "Three-coin casting method step by step",
      content: (
        <>
          <p>
            In the common three-coin method, write the question before casting and use the same side
            assignment for all six throws. Each throw produces a value from six through nine. Six is
            old yin, seven is young yang, eight is young yin, and nine is old yang. Record the first
            throw as the bottom line and continue upward until all six positions are complete.
          </p>
          <p>
            Young yin and young yang remain stable. Old yin changes into yang, and old yang changes
            into yin. The original six lines create the primary hexagram; changing every old line
            creates the relating hexagram. Keeping the numeric record matters because a simple
            drawing of the primary figure does not show which lines were moving.
          </p>
          <p>
            Before reading commentary, restate the question in plain language and name the decision
            that is actually available. Questions such as “What should I understand about accepting
            this role during the next six months?” give the text a clearer frame than “Will
            everything work out?” The{" "}
            <Link
              href="/i-ching/how-to-cast"
              className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
            >
              casting guide
            </Link>{" "}
            explains the mechanics, and the{" "}
            <Link
              href="/tools/i-ching-oracle"
              className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
            >
              browser oracle
            </Link>{" "}
            preserves the six-line result for review.
          </p>
        </>
      ),
    },
    {
      heading: "How to read changing lines",
      content: (
        <>
          <p>
            Begin with the primary hexagram before opening the changing lines. Summarize its central
            tension in one sentence, then read only the lines that actually moved. Ask what changes
            at that position: an early impulse, an inner response, a public role, a decision point,
            or a pattern nearing completion. Finally, compare the relating hexagram as a direction
            of movement rather than a guaranteed final outcome.
          </p>
          <p>
            With one moving line, that line usually provides a focused point of attention. With
            several moving lines, look for a shared theme before trying to combine every sentence
            literally. Schools and translations use different priority rules when many lines move,
            so the method should be stated instead of presented as universal. Consistency is more
            useful than changing rules after seeing an uncomfortable result.
          </p>
          <p>
            A practical interpretation ends with an observable response. If the reading emphasizes
            waiting, define what evidence would make action timely. If it emphasizes repair, name
            the relationship, process, or assumption that needs attention. This turns symbolic
            language into a testable next step while leaving room for circumstances to change.
          </p>
        </>
      ),
    },
    {
      heading: "A repeatable reading workflow",
      content: (
        <>
          <p>
            Use a five-pass workflow: question, structure, text, change, and action. First record
            the exact question and time. Second identify the primary hexagram, its upper and lower
            trigrams, and every moving line. Third read the Judgment, Image, and relevant line texts
            in one translation. Fourth compare the relating hexagram and note what has shifted.
            Fifth write one action, one caution, and one condition to monitor.
          </p>
          <p>
            Keep the first interpretation short enough to revisit. A useful journal entry contains
            the cast, the words that seemed most relevant, the decision made, and what happened
            later. Over time this reveals whether interpretations were specific and grounded or
            merely broad enough to fit anything. Review improves reading skill more reliably than
            casting more often.
          </p>
          <p>
            When the answer seems contradictory, check the question before blaming the text. A
            question may combine two decisions, hide the available choice, or ask for certainty
            where only a tradeoff exists. Rewrite the practical issue without casting again, then
            see whether the original hexagram becomes clearer in that frame.
          </p>
        </>
      ),
    },
    {
      heading: "Texts, translations, and source discipline",
      content: (
        <>
          <p>
            The earliest textual layer is commonly called the <cite>Zhouyi</cite>: hexagram names,
            Judgments, and line statements. The commentarial materials known as the{" "}
            <cite>Ten Wings</cite>
            developed the philosophical vocabulary used in later readings. Modern editions differ in
            how they translate terse characters, reconstruct historical images, and blend the core
            text with those later commentaries.
          </p>
          <p>
            For serious study, compare at least two named translations and keep track of which one
            supplied a phrase. Wilhelm-Baynes offers an influential commentarial reading; Alfred
            Huang provides another complete modern interpretation. Differences are useful evidence
            because they show where an English keyword is an editorial choice rather than the only
            possible meaning of the Chinese text.
          </p>
          <p>
            Do not combine isolated quotations from several editions into a single supposedly
            classical verdict. Cite the edition, preserve uncertainty, and separate the received
            text from a modern practical interpretation. That source discipline makes an I Ching
            answer easier for readers to verify.
          </p>
          <p>
            Record Chinese terms when they materially affect the interpretation, especially a
            hexagram name or disputed line phrase. A transliteration, literal gloss, and chosen
            English rendering let readers see where interpretation begins. This small source note is
            more useful than presenting a polished English sentence as though every edition says
            exactly the same thing.
          </p>
        </>
      ),
    },
    {
      heading: "I Ching vs other Chinese systems",
      content: (
        <>
          <p>
            The I Ching differs from Bazi and Ziwei in one key way: it is question-based rather than
            birth-based. Bazi reads a fixed natal chart to understand personality and timing cycles.
            The I Ching responds to a specific moment and question. Feng Shui reads spatial
            environment. The I Ching reads the pattern of change in a situation.
          </p>
          <p>
            This makes the I Ching useful alongside natal systems. A Bazi chart can show a decade of
            pressure; the I Ching can help frame a specific decision within that decade. Use them as
            complementary lenses, not competing answers.
          </p>
        </>
      ),
      stats: [
        {
          value: "64",
          label: "Hexagrams",
          description: "Each describes a distinct pattern of change.",
        },
        {
          value: "384",
          label: "Line positions",
          description: "64 hexagrams multiplied by 6 lines.",
        },
        {
          value: "8",
          label: "Trigrams",
          description: "Three-line building blocks that combine into hexagrams.",
        },
      ],
    },
    {
      heading: "Common beginner mistakes",
      content: (
        <>
          <p>
            The most common mistake is treating the hexagram as a fixed answer. A hexagram describes
            a pattern and a direction of movement, not a guaranteed outcome. The same hexagram can
            mean different things depending on the question, the changing lines, and the context.
          </p>
          <p>
            Another mistake is casting multiple times for the same question hoping for a better
            result. Classical practice casts once, reads carefully, and sits with the image before
            acting. Repeated casting for the same question usually produces confusion rather than
            clarity.
          </p>
          <p>
            A third mistake is skipping the question. The I Ching works best when the question is
            specific and honest. Vague questions produce vague readings.
          </p>
        </>
      ),
    },
    {
      heading: "How to use the I Ching responsibly",
      content: (
        <>
          <p>
            The classic is read through <cite>Ten Wings tradition</cite> and the{" "}
            <cite>King Wen sequence</cite>, which organize image, judgment, and line movement. A
            responsible reading keeps the question specific, then compares the primary and relating
            hexagrams before turning the result into action.
          </p>
          <p>
            Use the I Ching to sharpen reflection and timing. It should not replace professional
            advice, medical judgment, or personal responsibility. The best use is to clarify what
            you already sense, not to outsource a decision entirely.
          </p>
          <p>
            Start with the{" "}
            <Link
              href="/tools/i-ching-oracle"
              className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
            >
              free oracle tool
            </Link>
            , then explore individual{" "}
            <Link
              href="/i-ching/sixty-four-hexagrams"
              className="text-brand-primary decoration-brand-primary/30 dark:text-gold-300 underline"
            >
              hexagram pages
            </Link>{" "}
            to understand the images more deeply.
          </p>
        </>
      ),
    },
  ],
  faqs: defaultFaqs,
  relatedLinks,
  cta: cta(),
});

const introTopics: IntroTopic[] = [
  { slug: "what-is-i-ching", datePublished: "2025-11-15", dateModified: "2026-01-25", label: "What Is the I Ching", title: "What Is the I Ching? Book of Changes Explained", description: "A clear introduction to the Book of Changes as a system for reading transformation.", statValue: "3,000+", statLabel: "Years of history" },
  { slug: "eight-trigrams", datePublished: "2025-11-22", dateModified: "2026-02-01", label: "Eight Trigrams", title: "The Eight Trigrams (Ba Gua): I Ching Building Blocks", description: "The eight trigrams (Ba Gua) explained: Qian, Kun, Zhen, Xun, Kan, Li, Gen, and Dui — the three-line symbols that combine into the 64 I Ching hexagrams.", statValue: "8", statLabel: "Trigrams" },
  { slug: "sixty-four-hexagrams", datePublished: "2025-12-01", dateModified: "2026-02-10", label: "64 Hexagrams", title: "The 64 I Ching Hexagrams: Complete Structure", description: "How the 64 I Ching hexagrams are built from trigram pairs, ordered in the King Wen sequence, and used to map 64 archetypal situations of change.", statValue: "64", statLabel: "Hexagrams" },
  { slug: "changing-lines", datePublished: "2025-12-08", dateModified: "2026-02-15", label: "Changing Lines", title: "Changing Lines in the I Ching: Meaning and Method", description: "Changing lines in the I Ching explained: how old yin and old yang lines create motion, form a relating hexagram, and shift a reading's direction.", statValue: "6", statLabel: "Line positions" },
  { slug: "how-to-cast", datePublished: "2025-12-15", dateModified: "2026-02-20", label: "How to Cast the I Ching", title: "How to Cast the I Ching with Coins", description: "A practical guide to building six lines from coin tosses and reading the result.", statValue: "3", statLabel: "Coins" },
];

const introSections: Record<string, KnowledgePageProps["sections"]> = {
  "what-is-i-ching": [
    {
      heading: "A system for reading change, not predicting outcomes",
      content: (
        <>
          <p>
            The I Ching, or Book of Changes, is a Chinese classic built around 64 hexagrams. Each hexagram is a six-line figure made from combinations of yin (broken) and yang (solid) lines. The text attached to each hexagram — called the Judgment and the Image — describes a pattern of change rather than a fixed outcome.
          </p>
          <p>
            The classic developed over centuries. The core hexagram structure is traditionally attributed to King Wen of Zhou, while the line texts and philosophical commentaries known as the <cite>Ten Wings tradition</cite> were added later. By the Han dynasty, the I Ching had become both a divination manual and a philosophical text about how change moves through situations.
          </p>
        </>
      ),
    },
    {
      heading: "How a reading works in practice",
      content: (
        <>
          <p>
            A reading begins with a specific question. The reader casts six lines using coins or yarrow stalks, building the hexagram from the bottom up. If any lines are "old" (moving), they change polarity and create a second hexagram called the relating hexagram. The primary hexagram describes the present situation; the relating hexagram shows the direction of movement.
          </p>
          <p>
            The I Ching is not a natal system like <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>. It responds to a specific moment and question, so the same person can receive different hexagrams on different days. The value is in the structured reflection it creates, not in treating the result as a fixed answer.
          </p>
        </>
      ),
      stats: [
        { value: "64", label: "Hexagrams", description: "Each describes a distinct pattern of change." },
        { value: "384", label: "Line texts", description: "Six lines per hexagram, each with its own commentary." },
        { value: "8", label: "Trigrams", description: "Three-line building blocks that combine into hexagrams." },
      ],
    },
    {
      heading: "What the I Ching is not",
      content: (
        <>
          <p>
            The I Ching is not a fortune-telling machine. It does not predict specific events with certainty, and responsible use does not treat it as a substitute for professional advice, medical judgment, or personal responsibility. The best use is to clarify what you already sense, sharpen the question, and notice the pattern the hexagram describes.
          </p>
          <p>
            Casting multiple times for the same question hoping for a better result is a common mistake. Classical practice casts once, reads carefully, and sits with the image before acting.
          </p>
        </>
      ),
    },
  ],
  "eight-trigrams": [
    {
      heading: "The three-line building blocks of the I Ching",
      content: (
        <>
          <p>
            A trigram is a stack of three yin or yang lines. There are eight possible combinations, giving eight trigrams. Each trigram has a name, a natural image, a direction, a family role, and a set of associated qualities. The eight trigrams are: Qian (Heaven), Kun (Earth), Zhen (Thunder), Xun (Wind), Kan (Water), Li (Fire), Gen (Mountain), and Dui (Lake).
          </p>
          <p>
            Two trigrams stacked together form a hexagram. The lower trigram is called the inner trigram and often describes the internal situation or the person asking. The upper trigram is the outer trigram and often describes the external environment or the situation being faced.
          </p>
        </>
      ),
      stats: [
        { value: "8", label: "Trigrams", description: "Qian, Kun, Zhen, Xun, Kan, Li, Gen, Dui." },
        { value: "64", label: "Hexagrams", description: "8 × 8 combinations of upper and lower trigrams." },
        { value: "2", label: "Trigrams per hexagram", description: "Inner (lower) and outer (upper)." },
      ],
    },
    {
      heading: "How trigrams carry meaning",
      content: (
        <>
          <p>
            Each trigram carries a cluster of associations. Qian (three solid yang lines) is associated with Heaven, strength, the father, and creative force. Kun (three broken yin lines) is associated with Earth, receptivity, the mother, and yielding support. Kan (broken-solid-broken) is associated with Water, danger, the middle son, and depth. Li (solid-broken-solid) is associated with Fire, clarity, the middle daughter, and attachment.
          </p>
          <p>
            These associations are not rigid personality labels. They describe qualities of movement and relationship. A hexagram with Kan below and Li above (Hexagram 63, Ji Ji) describes a situation where water and fire are in their correct positions — a moment of completion that still requires care to maintain.
          </p>
        </>
      ),
    },
    {
      heading: "The Ba Gua arrangement and its uses",
      content: (
        <p>
          The eight trigrams are arranged in two classical sequences: the Earlier Heaven (Fu Xi) arrangement and the Later Heaven (King Wen) arrangement. The Later Heaven arrangement is used in most practical applications, including <Link href="/feng-shui/bagua-map" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Feng Shui Bagua mapping</Link>. Understanding the trigrams is the foundation for reading hexagram structure, since every hexagram is a combination of two trigrams.
        </p>
      ),
    },
  ],
  "sixty-four-hexagrams": [
    {
      heading: "How 64 hexagrams organize the Book of Changes",
      content: (
        <>
          <p>
            The 64 hexagrams are the complete symbolic vocabulary of the I Ching. Each hexagram is a unique six-line figure built from two trigrams. The traditional ordering is called the King Wen sequence, which groups hexagrams in pairs of opposites or inversions. Hexagram 1 (Qian, Heaven) and Hexagram 2 (Kun, Earth) open the sequence as the two poles of yang and yin.
          </p>
          <p>
            Each hexagram has a name, a Judgment text, an Image text, and six individual line texts. The Judgment describes the overall situation. The Image draws a lesson from the natural image formed by the two trigrams. The line texts describe how the situation changes as each position moves from stable to unstable or vice versa.
          </p>
        </>
      ),
      stats: [
        { value: "64", label: "Hexagrams", description: "The complete set of six-line figures." },
        { value: "32", label: "Paired groups", description: "Hexagrams are traditionally arranged in 32 pairs." },
        { value: "6", label: "Lines each", description: "Six positions, each yin or yang." },
      ],
    },
    {
      heading: "Reading a hexagram in practice",
      content: (
        <>
          <p>
            A hexagram reading has three layers. First, read the overall Judgment to understand the situation's character. Second, read the Image to find the practical lesson the natural image suggests. Third, if changing lines are present, read those specific line texts and then read the relating hexagram to understand the direction of movement.
          </p>
          <p>
            Not all 64 hexagrams are equally common in a reading. Some appear more often in certain types of questions. Over time, a reader builds familiarity with the images and learns to connect them to real situations rather than treating them as abstract symbols.
          </p>
        </>
      ),
    },
    {
      heading: "The hexagram as a map of a situation",
      content: (
        <p>
          Each hexagram describes a pattern, not a verdict. Hexagram 29 (Kan, Abysmal Water) does not mean disaster; it describes a situation of repeated challenge where persistence and honesty are the appropriate response. Hexagram 11 (Tai, Peace) does not guarantee ease; it describes a moment of favorable alignment that still requires active maintenance. Use the <Link href="/tools/i-ching-oracle" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">oracle tool</Link> to cast and compare hexagrams directly.
        </p>
      ),
    },
  ],
  "changing-lines": [
    {
      heading: "What changing lines are and why they matter",
      content: (
        <>
          <p>
            When casting the I Ching with coins, each line is assigned a value based on the coin toss result. A value of 6 (old yin) or 9 (old yang) marks a changing line. Old yin changes to yang; old yang changes to yin. These changing lines transform the primary hexagram into a second hexagram called the relating hexagram.
          </p>
          <p>
            The primary hexagram describes the present situation. The relating hexagram describes where the situation is moving. Together, they show both the current pattern and the direction of change — which is the core insight the I Ching is designed to provide.
          </p>
        </>
      ),
      stats: [
        { value: "6", label: "Line positions", description: "Any of the six lines can be a changing line." },
        { value: "2", label: "Hexagrams", description: "Primary (present) and relating (direction)." },
        { value: "64", label: "Possible relating hexagrams", description: "Any hexagram can become any other through changing lines." },
      ],
    },
    {
      heading: "How to read changing lines",
      content: (
        <>
          <p>
            When one line changes, read that line's specific text alongside the primary hexagram's Judgment. The line text describes the quality of that position in the situation. When multiple lines change, classical practice varies: some readers focus on the first and last changing lines, others read all of them, and some weight the middle lines more heavily.
          </p>
          <p>
            When all six lines change, the relating hexagram becomes the primary reading. When no lines change, the reading rests entirely on the primary hexagram's Judgment and Image without a direction of movement.
          </p>
        </>
      ),
    },
    {
      heading: "A common beginner mistake",
      content: (
        <p>
          Many beginners focus only on the relating hexagram and ignore the primary. The primary hexagram is the foundation. The relating hexagram is the direction. Reading only the destination without understanding the present situation produces shallow interpretations. Always read the primary hexagram fully before turning to the relating hexagram.
        </p>
      ),
    },
  ],
  "how-to-cast": [
    {
      heading: "The three-coin method step by step",
      content: (
        <>
          <p>
            The most common modern casting method uses three coins. Each coin toss produces one line. Tails counts as 2, heads counts as 3. Add the three coins together: a sum of 6 is old yin (changing), 7 is young yang (stable), 8 is young yin (stable), and 9 is old yang (changing). Repeat six times, building the hexagram from the bottom line upward.
          </p>
          <p>
            Before casting, write down a specific question. The question should be honest and focused on a real situation. Vague questions produce vague readings. A good question describes the actual tension or decision, not a hoped-for outcome.
          </p>
        </>
      ),
      stats: [
        { value: "3", label: "Coins", description: "Three coins per line, tossed six times." },
        { value: "6", label: "Tosses", description: "One toss per line, building bottom to top." },
        { value: "4", label: "Line values", description: "6 (old yin), 7 (young yang), 8 (young yin), 9 (old yang)." },
      ],
    },
    {
      heading: "After the cast: reading the result",
      content: (
        <>
          <p>
            Once you have six lines, identify the hexagram using a reference table or the <Link href="/tools/i-ching-oracle" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">oracle tool</Link>. Note any changing lines (values of 6 or 9). Read the primary hexagram's Judgment and Image first. Then read the changing line texts if present. Finally, build the relating hexagram by flipping the changing lines and read its Judgment.
          </p>
          <p>
            Write down the result before interpreting. The act of writing slows the reading down and prevents the common mistake of jumping to the first interpretation that feels comfortable.
          </p>
        </>
      ),
    },
    {
      heading: "The yarrow stalk method",
      content: (
        <p>
          The traditional method uses 50 yarrow stalks and a more complex counting procedure. It produces the same four line values but with different probabilities: old yang is rarer than with coins, making changing lines less frequent. The yarrow method is slower and more meditative. Most beginners start with coins and move to yarrow stalks once they are comfortable with the reading process.
        </p>
      ),
    },
  ],
};

function createIntroPage(topic: IntroTopic): IChingContentPage {
  const path = `/i-ching/${topic.slug}`;

  return buildPage({
    slug: topic.slug,
    path,
    title: topic.title,
    description: topic.description,
    entityName: topic.label,
    entityType: "DefinedTerm",
    subtitle: "An answer-first I Ching guide for beginners.",
    directAnswer: `${topic.label} is part of the I Ching system. ${topic.description} It should be used to clarify a question and understand change rather than to force a fixed outcome.`,
    breadcrumbs: breadcrumbs(topic.label, path),
    schema: { headline: "", description: "", url: "", datePublished: topic.datePublished, dateModified: topic.dateModified },
    stats: [
      { value: topic.statValue, label: topic.statLabel, description: "A practical number used in this topic." },
      { value: "64", label: "Hexagrams", description: "Every topic connects to the full hexagram system." },
      { value: "384", label: "Lines", description: "The full line-level structure of the classic." },
    ],
    citations: [
      { label: "Richard Wilhelm & Cary Baynes, The I Ching or Book of Changes (1950)", source: "Classical Chinese text used for symbolic reasoning and structured reflection." },
      { label: "Alfred Huang, The Complete I Ching (2004)", source: "Commentaries that developed philosophical interpretation of the hexagrams." },
    ],
    sections: introSections[topic.slug] ?? [
      {
        heading: `What ${topic.label} means`,
        content: (
          <p>
            {topic.description} The safest reading starts with the visible line structure, then moves to image, judgment, changing lines, and the question being asked.
          </p>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks,
    cta: cta(),
  });
}

function hexagramDate(n: number): string {
  const start = new Date("2025-12-20");
  start.setDate(start.getDate() + Math.round(((n - 1) / 63) * 95));
  return start.toISOString().slice(0, 10);
}
function hexagramModDate(n: number): string {
  const start = new Date("2026-01-15");
  start.setDate(start.getDate() + Math.round(((n - 1) / 63) * 95));
  return start.toISOString().slice(0, 10);
}

const hexagramDirectAnswers: Partial<Record<number, string>> = {
  1: "Hexagram 1, The Creative (乾 Qian), describes a moment of pure creative momentum — conditions are aligned, energy is available, and the direction is clear. Heaven doubled above Heaven gives the image of force that renews itself through disciplined motion rather than random intensity. It asks whether your momentum is guided by principle, timing, endurance, and a reliable sense of sequence or by restless pressure. Use it when considering a major initiative, leadership commitment, or sustained effort that requires both boldness and self-command.",
  2: "Hexagram 2, The Receptive (坤 Kun), is the complement to Hexagram 1: where Qian initiates, Kun receives, sustains, and completes. Earth doubled above Earth gives the image of a field able to carry, nourish, and shape what arrives without needing to dominate it. It is frequently misread as passive, but Kun is the active force of sustaining over time and through changing conditions. Use it when your most useful role is support rather than initiative, or when a situation needs cultivation rather than dramatic action.",
  11: "Hexagram 11, Peace (泰 Tai), places Earth above Heaven — each moving toward the other, creating genuine exchange. The heavy Earth descends and the light Heaven rises, so their movement meets instead of separating. It describes productive communication between levels: resources flow, effort is recognized, and cooperation is real. It is not a promise of permanence; peace has to be maintained. Use it when favorable conditions are open and the work is to build something durable before the cycle changes.",
  12: "Hexagram 12, Standstill (否 Pi), places Heaven above Earth so the two forces move away from each other and exchange stops. The image is separation between high and low: the channel exists in form, but real communication no longer flows through it. It describes a blocked situation where pushing harder wastes resources. The classical advice is to conserve integrity and withdraw from empty exchange. Use it when progress is structurally closed and the wiser response is preservation until conditions shift.",
  24: "Hexagram 24, Return (复 Fu), shows Thunder within Earth — one yang line returning beneath five yin lines, like the first motion after winter stillness. It describes the beginning of renewal after difficulty: not completed recovery, but the first genuine reorientation. The classical advice is to protect this fragile new energy with patience instead of rushing it into premature action before asking it to carry visible results. Use it when a better pattern has just begun and the task is to keep returning to it steadily.",
  29: "Hexagram 29, The Abysmal (坎 Kan), doubles the Water trigram — danger above and danger below, a gorge repeated rather than a single obstacle. It describes a recurring pattern of challenge where fear, pressure, or risk cannot simply be avoided. The classical teaching is that water does not stop at an obstacle; it fills the hollow and flows on. The way through is sincerity, practiced skill, and respect for each passage's specific shape. Use it when repeated difficulty asks for steadiness, not panic or force.",
  36: "Hexagram 36, Darkening of the Light (明夷 Ming Yi), shows Fire below Earth — the sun entering the ground, clarity going underground in an unsupportive environment. It describes a temporary phase in which open brilliance would invite suppression or waste. The classical advice is to protect inner standards without broadcasting them where they cannot be received. This is strategic patience, not permanent self-concealment, while preserving the light for a better season. Use it when your insight is real but the context requires discretion before expression.",
  40: "Hexagram 40, Deliverance (解 Xie), shows Thunder above Water — a storm breaking after sustained tension, danger beginning to release through movement. It describes the moment when a difficulty finally loosens and action becomes useful again. The classical advice is to act quickly once the cause is understood: forgive what no longer needs holding, resolve what can be resolved, and stop feeding the old tension while the opening is fresh. Use it when release is possible and delay would recreate the problem.",
  47: "Hexagram 47, Oppression (困 Kun), shows Lake above Water — a lake drained of its source, with resources exhausted and expression blocked. It describes genuine constraint where words carry little weight and ordinary effort produces little result. The classical advice is to conserve inner resources, maintain integrity under pressure, and avoid spending energy proving what cannot yet be heard until the channel opens again. Use it when the outer channel is closed but character, patience, and truthful endurance still matter.",
  49: "Hexagram 49, Revolution (革 Ge), shows Lake above Fire — two forces that cannot coexist indefinitely, heat pressing against containment. It describes a situation where real change is necessary, not cosmetic adjustment or impatience dressed as reform. The classical conditions for successful revolution are timing, legitimacy, and clear need. Change that lacks any of these tends to create new problems, with consent that can survive resistance. Use it when the old order has lost coherence and renewal requires careful public timing.",
  4: "Hexagram 4, Youthful Folly (蒙 Meng), shows Mountain above Water — a spring at the mountain's foot, full of potential but not yet channeled. It describes a learning situation where the student must come to the teacher, not the other way around. The classical advice is that genuine learning requires honest questions, patience with repetition, and the humility to not know before you know and before acting as if understanding has arrived. Use it when confusion is natural and disciplined instruction matters more than quick certainty.",
  6: "Hexagram 6, Conflict (讼 Song), shows Heaven above Water — strength rising while danger flows downward, two forces moving in opposite directions. It describes a dispute that has not yet fully escalated but could become costly if pride takes over. The classical advice is to examine the origin of disagreement before acting: clarify terms, acknowledge partial fault, or withdraw from an untenable position before the pattern hardens into formal opposition. Use it when winning the argument may cost more than resolving the tension early.",
  7: "Hexagram 7, The Army (师 Shi), shows Water within Earth — a reservoir of organized force hidden below stable ground. It describes collective effort that requires discipline, clear leadership, and proportionate response, whether the field is military, organizational, or communal. The classical advice is that the leader who mobilizes people must have authority, discipline, and the judgment to know when to stop around a cause that justifies the cost. Use it when many people must move together and unstructured energy would become dangerous.",
  17: "Hexagram 17, Following (随 Sui), shows Lake above Thunder — responsive joy above movement, the image of action that adapts to the season. It describes a situation where following is correct, but only if you choose what is genuinely worth following. The classical advice is to rest when rest is called for and respond when response is called for, rather than forcing activity or stillness. Use it when adaptation, loyalty, or apprenticeship is central and discernment must guide whom you follow.",
  25: "Hexagram 25, Innocence (无妄 Wu Wang), shows Heaven above Thunder — natural movement beneath a larger order, action without manipulation. It describes a situation where acting without hidden agenda is both the correct approach and the most effective one. The classical warning is that unexpected misfortune can still arrive even when conduct is correct; the response is acceptance without resentment, not blame-seeking, even when outcomes are not fully controllable. Use it when clean intention, direct action, and freedom from calculation are the strongest position available.",
  3: "Hexagram 3, Difficulty at the Beginning (屯 Zhun), shows Water above Thunder — danger over movement, like new life pushing into a storm before its form is stable. It describes the turbulent first stage of growth, when potential exists but the path has not emerged. A project, relationship, or transition can be genuinely promising and still feel disordered at the start. The classical advice is to organize before forcing progress. Use it when beginning is hard and structure matters more than speed.",
  5: "Hexagram 5, Waiting (需 Xu), shows Water above Heaven — clouds gathering but rain not yet falling. It describes a situation where the conditions for action are not yet complete, and the correct response is active preparation rather than forced movement. It is not passive resignation; it is the disciplined readiness of someone who knows that timing matters and uses the waiting period to nourish strength, clarify allies, and preserve confidence. Use it when you are tempted to act before conditions are ready.",
  8: "Hexagram 8, Holding Together (比 Bi), shows Water above Earth — water finding its level and gathering into a unified body. It describes a moment when alliance, loyalty, and mutual commitment are both available and necessary. The classical question it asks is direct: have you chosen what you are genuinely committed to, and have you done so in time? Late commitment weakens the bond. Use it when considering who to align with, or when a group needs a center it can trust.",
  9: "Hexagram 9, Small Taming (小畜 Xiao Chu), shows Wind above Heaven — a gentle force restraining a much larger one. It describes a situation where only small, incremental adjustments are possible right now, not sweeping change. The classical image is of clouds gathering but rain not yet falling: the conditions for a major shift are building, but the moment has not arrived. Use it when you feel the urge to force a large outcome and the situation is asking for patient, precise refinement instead.",
  10: "Hexagram 10, Treading (履 Lü), shows Heaven above the Lake — a vast difference in level, and the image of someone walking carefully on the tail of a tiger without being bitten. It describes a situation requiring precise, respectful conduct in conditions where a misstep carries real consequences. The classical advice is not to avoid the situation but to navigate it with full awareness of the power differential and the care that awareness demands. Use it when you are operating in sensitive territory where conduct matters as much as intention.",
  13: "Hexagram 13, Fellowship (同人 Tong Ren), shows Fire rising into Heaven — clarity ascending toward the widest possible perspective. It describes genuine alignment with others based on shared values rather than shared convenience. The classical text distinguishes between fellowship in the open field, which is broad and principled, and fellowship only within the clan, which is narrow and self-serving. Use it when considering whether a collaboration, team, or public alliance is built on real common ground or on the comfort of similarity.",
  14: "Hexagram 14, Great Possession (大有 Da You), shows Fire above Heaven — the sun at its zenith, illuminating everything below. It describes a moment of genuine abundance: resources, influence, or clarity are available in unusual measure. The classical teaching is that great possession is only favorable when governed with clarity and without arrogance. What you hold must be used well, shared appropriately, and not clung to as a permanent condition. Use it when you have more than usual and the question is how to steward it.",
  15: "Hexagram 15, Modesty (谦 Qian), shows a Mountain hidden within the Earth — great substance held below the surface rather than displayed above it. It describes the quality of measured conduct that makes strength acceptable and durable over time. In the I Ching, modesty is not self-deprecation or false humility; it is the accurate calibration of expression to context and the willingness to reduce excess. Use it when you have real capability and the question is how to deploy it without triggering resistance or resentment.",
  16: "Hexagram 16, Enthusiasm (豫 Yu), shows Thunder emerging from Earth — stored energy releasing into movement. It describes the moment when preparation meets readiness and collective momentum becomes possible. The classical use of this hexagram is specifically about mobilization: music, ritual, and shared rhythm as tools for aligning people around a common direction. Enthusiasm succeeds when it has structure, not when excitement substitutes for preparation. Use it when you need to build morale, launch a movement, or create the conditions for others to commit and act together.",
  18: "Hexagram 18, Work on What Has Been Spoiled (蛊 Gu), shows Wind below the Mountain — gentle penetration beneath a heavy, immovable structure. It describes a situation where decay has set in, usually through neglect or inherited dysfunction, and deliberate corrective work is now required. The classical advice is to examine what went wrong before the current generation, repair it carefully, and allow three days before and after the correction to assess the problem. Use it when you are dealing with a pattern broken for longer than the current moment.",
  19: "Hexagram 19, Approach (临 Lin), shows the Lake above Earth — water rising over the land, the image of something great drawing near. It describes a moment of expanding influence and increasing presence: conditions are favorable, access is opening, and the opportunity to affect others positively is real. The classical warning is that this favorable period has a natural limit — the eighth month brings a reversal. Use it when influence is growing and the question is how to use that access well before conditions change.",
  20: "Hexagram 20, Contemplation (观 Guan), shows Wind above Earth — the image of wind moving across the land, touching everything and revealing what is actually there. It describes a moment of stepping back to observe the full pattern before acting. The classical use of this hexagram is specifically about the influence of example: what others see in your conduct teaches them more than what you say. Use it when you need to assess a situation clearly, or when your actions are being watched and interpreted by others.",
  21: "Hexagram 21, Biting Through (噬嗑 Shi He), shows Thunder above Fire — the image of lightning and thunder together, the combination that produces the clearest and most decisive natural signal. It describes a situation where an obstacle is blocking connection and must be removed through precise, fair action. The classical context is legal: a case that requires judgment, not negotiation. Use it when something is genuinely in the way — a misunderstanding, a violation, a blockage — and the correct response is clear, proportionate action rather than continued tolerance or avoidance.",
  22: "Hexagram 22, Grace (贲 Bi), shows Fire at the foot of the Mountain — light illuminating the surface of something solid and substantial. It describes the relationship between form and content: beauty and presentation that support substance rather than replace it. The classical teaching is that grace is appropriate and valuable in small matters but should not be used to make decisions about what is fundamentally important. Use it when considering how to present something well, while remaining clear that the presentation is not the thing itself.",
  23: "Hexagram 23, Splitting Apart (剥 Bo), shows a Mountain resting on Earth while its base erodes from below. Five yin lines have risen, leaving one yang line at the top, so the image is not sudden collapse but progressive weakening. It describes genuine erosion: structures weaken, support withdraws, and action is unfavorable. The classical advice is not to force movement but to preserve essentials, strengthen foundations quietly, and wait for the cycle to turn. Use it when the ground beneath a situation is no longer solid.",
  26: "Hexagram 26, Great Taming (大畜 Da Chu), shows Heaven within the Mountain — the greatest creative force held inside a solid, containing structure. It describes a situation where significant power or capability is being accumulated, trained, and held in reserve rather than released prematurely. The classical image is of a sage who does not serve the current ruler but instead cultivates depth and waits for the right moment. Use it when you have real strength that is not yet ready to be deployed, and the work is to deepen it rather than express it.",
  27: "Hexagram 27, Nourishment (颐 Yi), shows Thunder below the Mountain — the image of a mouth, with movement at the bottom and stillness at the top. It describes the question of what you take in and what you put out: what you eat, what you say, and what you allow to nourish or deplete you. The classical teaching is that character is shaped by intake — both physical and mental. Use it when you are making choices about what to consume, what to produce, or what kind of environment you are sustaining yourself within.",
  28: "Hexagram 28, Great Exceeding (大过 Da Guo), shows Lake above Wind — water rising above the trees, like a beam too heavy for its supports. It describes a load beyond the structure's capacity: something is carrying more strain than it can sustain. The classical advice is to acknowledge the pressure and make a transition, finding an extraordinary response to an extraordinary situation rather than pretending normal methods are enough. Use it when the current structure cannot hold what is being asked of it.",
  31: "Hexagram 31, Influence (咸 Xian), shows a Lake above the Mountain — the yielding above the firm, water resting on solid ground. It describes mutual attraction and the conditions under which genuine influence operates: openness, receptivity, and the absence of calculated agenda. The classical image is of courtship — two people drawn to each other through authentic response rather than strategy. Use it when you want to understand how influence actually works, or when you are trying to affect a situation and finding that direct pressure is not producing results.",
  32: "Hexagram 32, Duration (恒 Heng), shows Thunder above Wind — two forces that move together continuously, each sustaining the other. It describes the quality of endurance that comes not from rigidity but from consistent, adaptive movement. The classical teaching is that duration is not sameness; it is the capacity to remain true to a direction while responding to changing conditions. Use it when you are asking whether something is worth sustaining over time, or when you need to distinguish between healthy consistency and stubborn inflexibility.",
  33: "Hexagram 33, Retreat (遁 Dun), shows Heaven above the Mountain — the sky withdrawing upward as the mountain rises. It describes a strategic withdrawal from a situation where continued engagement is no longer productive or safe. The classical teaching is that retreat is not defeat; it is the intelligent preservation of strength for a moment when it can be used effectively. Use it when you recognize that the conditions around you have shifted against you and that holding your position will cost more than it gains.",
  34: "Hexagram 34, Great Power (大壮 Da Zhuang), shows Thunder above Heaven — exceptional strength at its peak, movement amplified by the largest possible field. The classical teaching is that great power succeeds only when it follows what is right, not merely what is possible. A ram charging a fence may break through or become entangled, so force without judgment becomes self-trapping. Use it when you have real strength available and the question is whether you are directing it toward what is genuinely correct.",
  35: "Hexagram 35, Progress (晋 Jin), shows Fire above Earth — the sun rising over the land, illuminating everything below with increasing clarity. It describes a moment of genuine advancement: visibility is increasing, recognition is available, and the conditions for moving forward are favorable. The classical image is of a feudal lord who receives horses and is granted audience three times in a single day — rapid, welcomed advancement. Use it when conditions are genuinely open and the question is how to advance with the clarity and generosity that makes progress sustainable.",
  37: "Hexagram 37, The Family (家人 Jia Ren), shows Wind coming from Fire — warmth generating movement and inner clarity expressing itself outward. It describes what lets a household, team, or organization function well: clear roles, genuine care, and conduct that matches what is said. The classical teaching is that order begins with the individual, especially consistency between inner values and outward behavior, because example travels through the whole group. Use it when examining whether the structures you live or work within are healthy.",
  38: "Hexagram 38, Opposition (睽 Kui), shows Fire above the Lake — two forces naturally diverging. It describes genuine difference: two people, values, or directions that cannot be fully reconciled. The classical teaching is that opposition can clarify rather than destroy, if you do not force unity where difference is real. Small matters can still be accomplished even when fundamental alignment is absent. Use it when real difference exists and the question is how to work with it rather than against it.",
  39: "Hexagram 39, Obstruction (蹇 Jian), shows Water above the Mountain — danger ahead and a steep climb behind, making the direct route genuinely blocked. It describes a situation where forcing through will not work because the obstacle is structural, not imaginary. The classical advice is to stop, turn inward, seek help, and find a wiser route. The obstruction is temporary if used for self-examination and better alliances. Use it when you have hit a wall and need a different approach.",
  41: "Hexagram 41, Decrease (损 Sun), shows Mountain above Lake — something reduced below to strengthen what is above. It describes voluntary simplification, reduction of excess, or sacrifice of something immediate to create a stronger foundation over time. The classical teaching is that sincere decrease is not merely loss; it is rebalancing that prepares eventual increase and makes devotion visible through restraint. Use it when you are being asked to give up something, or when excess in one area is weakening the whole.",
  42: "Hexagram 42, Increase (益 Yi), shows Wind above Thunder — two forces that amplify each other, movement reinforcing movement. It describes a moment of genuine growth: conditions are favorable, effort produces more than usual return, and the opportunity to benefit others while advancing yourself is real. The classical teaching is that increase is most durable when it flows outward — when the growth benefits more than just the person receiving it. Use it when conditions are genuinely favorable and the question is how to use a period of increase well, rather than simply accumulating.",
  43: "Hexagram 43, Breakthrough (夬 Guai), shows a Lake risen above Heaven — five yang lines pressing upward against a single yin line at the top. It describes the moment when something that has been building must finally be declared and resolved. The classical teaching is specific: state the truth clearly, do it in the right forum, do not use force alone, and do not underestimate what remains. Use it when you have been tolerating something that needs to be addressed directly, or when a decision that has been deferred can no longer be avoided.",
  44: "Hexagram 44, Coming to Meet (姤 Gou), shows Wind below Heaven — a single yin line appearing beneath five yang lines. It describes an unexpected encounter or influence that arrives without being sought. The classical warning is specific: something small, if not recognized and bounded early, can gradually displace what is strong above it. Use it when something new enters your situation unexpectedly — an opportunity, person, or influence — and the question is whether to engage with it and on what terms.",
  45: "Hexagram 45, Gathering Together (萃 Cui), shows Lake above Earth — water collecting on the land into a larger body. It describes people, resources, or energies converging around a shared center. The classical teaching is that genuine gathering requires a trustworthy center, a ritual of commitment, and the sincerity to sustain it; otherwise the crowd disperses as quickly as it formed. Use it when you are building a group, convening people around a purpose, or joining something that is forming.",
  46: "Hexagram 46, Pushing Upward (升 Sheng), shows Wind below Earth — wood growing upward through the soil, steady and unhurried. It describes a period of gradual, organic ascent: conditions are favorable for advancement, but the movement is step by step rather than sudden. The classical image is of a tree that grows from a seed into a great form through consistent, patient effort. Use it when you are in a phase of steady progress and the temptation is either to rush the ascent or to doubt it because it is not dramatic.",
  51: "Hexagram 51, The Arousing (震 Zhen), doubles the Thunder trigram — shock above and shock below. It describes a sudden, disruptive event that arrives without warning and demands response. The classical teaching is that genuine character remains composed under shock: fear may arise, but footing is not lost. The shock itself is a test of whether inner stability is real. Use it when something unexpected has disrupted your situation and the question is how to respond rather than simply react.",
  52: "Hexagram 52, Keeping Still (艮 Gen), doubles the Mountain trigram — stillness above and below. It describes the active practice of stopping: not exhaustion or avoidance, but deliberate cessation at the right moment. The classical teaching is that knowing when to stop is as important as knowing when to move. The back is stilled so attention returns to what is present. Use it when you need to stop a pattern, thought, or movement that has run past its useful point.",
  53: "Hexagram 53, Development (渐 Jian), shows Wind above the Mountain — a tree growing on a high ridge, visible and unhurried. It describes advancement that follows proper sequence: each step prepares for the next, and no stage is skipped. The classical image is a marriage ceremony conducted through correct rituals because sequence helps make what is built solid, socially recognized, and relationally trusted by everyone involved. Use it when a process requires patience with proper order and the temptation is to skip steps.",
  54: "Hexagram 54, The Marrying Maiden (归妹 Gui Mei), shows Thunder above Lake — movement above joy, and a younger sister joining a household in a secondary position. It describes unequal roles where the subordinate person must navigate with dignity, realistic expectations, and patience. The classical teaching is that acting from weakness or dependency requires care because premature action tends to worsen the situation inside limits you did not choose. Use it when a real power difference asks for integrity within constraint rather than dramatic assertion.",
  55: "Hexagram 55, Abundance (丰 Feng), shows Thunder above Fire — movement above clarity, both at their peak. It describes maximum visibility and influence: the sun at noon, the harvest at its fullest. The classical teaching is that peak moments are temporary, so abundance should be used decisively while the light is strong rather than assumed permanent. The question is stewardship under bright conditions. Use it when you are at a high point of influence, clarity, or resources and need to use it well.",
  56: "Hexagram 56, The Wanderer (旅 Lu), shows Fire above Mountain — a flame passing over high ground, illuminating briefly and moving on. It describes temporary residence: you are passing through, not settled, and the place does not belong to you. The classical teaching is that the wanderer succeeds through courtesy, caution, and traveling light, not by trying to establish permanence in a temporary place. Use it when you are in transition and the question is how to conduct yourself well without overreaching.",
  57: "Hexagram 57, The Gentle (巽 Xun), doubles the Wind trigram — penetration above and below, soft persistence working through everything. It describes influence that operates not through force but through consistent, repeated presence: wind that finds every opening, bends without breaking, and gradually shapes what it touches. The classical teaching is that this kind of influence requires a clear direction and a willingness to keep moving even when the immediate effect is not visible. Use it when direct force is unavailable or counterproductive, and the situation calls for patient, persistent penetration rather than dramatic action.",
  58: "Hexagram 58, The Joyous (兑 Dui), doubles the Lake trigram — open water above and below, the image of two lakes connected and mutually replenishing. It describes genuine joy that comes from exchange, learning, and sincere connection with others. The classical teaching is that joy is constructive when it remains sincere and is shared through honest communication rather than through flattery or empty pleasure. Use it when you are considering how to create genuine morale, deepen a relationship, or sustain the kind of joy that builds rather than depletes.",
  59: "Hexagram 59, Dispersion (涣 Huan), shows Wind above Water — wind moving across water, breaking up what has frozen or congealed. It describes dissolution of rigidity: hardened attitudes, resentment, or blocked communication that prevents exchange. The classical use includes ceremony and crossing great waters, both acts that dissolve boundaries between self and other and restore shared movement without losing the shared center again. Use it when something has hardened and needs to flow again, or when a group needs reconnection.",
  60: "Hexagram 60, Limitation (节 Jie), shows Water above Lake — water contained within its natural boundary. It describes appropriate limits: not harsh restrictions that create resentment, but clear boundaries that preserve energy, define quality, and make sustained effort possible. The classical teaching is that good limits can be lived within without distress; harsh limits that cannot be maintained are worse than none over time and across real behavior. Use it when setting boundaries and asking whether the limit is appropriate, sustainable, or merely severe.",
  61: "Hexagram 61, Inner Truth (中孚 Zhong Fu), shows Wind above Lake — wind moving across open water and penetrating without force. It describes genuine sincerity: alignment between inner reality and outer expression that makes communication trustworthy and influence real. The classical teaching is that inner truth reaches others through presence, not clever words alone, because the center must be credible before speech can carry. Use it when you need to understand why some communications land, or when trust damaged by inconsistency must be rebuilt.",
  62: "Hexagram 62, Small Exceeding (小过 Xiao Guo), shows Thunder above the Mountain — movement above stillness, the image of a bird flying too high and missing the nest. It describes a situation where small adjustments are favored and grand overreach is not. The classical teaching is that when the situation calls for modesty and careful attention to detail, attempting something large tends to produce worse results than attending carefully to what is immediately present. Use it when you are tempted to make a sweeping move and the situation is actually asking for precise, small corrections.",
  30: "Hexagram 30, The Clinging (离 Li), doubles the Fire trigram — two flames, each with a hollow center, each dependent on what it burns. It describes clarity that is real but not self-sustaining: your vision, judgment, and illumination depend entirely on what you have attached yourself to. The classical teaching is not to avoid attachment but to choose it consciously. Use it when examining whether the commitments, frameworks, or relationships that are currently providing your clarity are genuinely worth maintaining — and whether the light they produce is steady or consuming.",
  48: "Hexagram 48, The Well (井 Jing), shows Water above Wood — the wooden bucket drawing water from depth. It describes a source of nourishment that is fixed, available to all, and dependent on maintenance. The classical teaching names three failures: muddy water, a rope too short, and a broken jug at the surface. Use it when asking whether a deep resource — expertise, practice, or relationship — is genuinely accessible, or whether the mechanism connecting you to it has been neglected.",
  50: "Hexagram 50, The Cauldron (鼎 Ding), shows Fire above Wood — controlled combustion transforming raw material into refined nourishment. It describes transformation through vessel, process, and offering: raw experience or capacity brought into a structured container, refined through sustained work, and offered outward. The classical teaching is that the vessel must be sound, the process sustained, and the result offered rather than hoarded. Use it when building something meant to transform raw input into refined output for others through a reliable container.",
  63: "Hexagram 63, After Completion (既济 Jiji), shows Water above Fire and the only pattern where every line is correctly placed. It marks a real achievement, but also the fragile moment after order is established. The teaching is simple: completion requires maintenance. Use it after a launch, agreement, or milestone when success is real but attention must stay steady.",
  64: "Hexagram 64, Before Completion (未济 Weiji), is the final hexagram of the I Ching, with every line in the wrong position. It describes a threshold moment: the transition is real, the direction is correct, but the crossing is not complete. The classical image is a young fox getting its tail wet at the last step. The teaching is that final stages are dangerous because premature confidence can undo the crossing. Use it when completion is near but not yet secured.",
};

const hexagramSections: Partial<Record<number, KnowledgePageProps["sections"]>> = {
  1: [
    {
      heading: "What Hexagram 1 describes",
      content: (
        <>
          <p>
            Hexagram 1, Qian (乾), is built from six unbroken yang lines — the only hexagram in the <cite>I Ching</cite> made entirely of yang. It describes a moment of pure creative momentum: conditions are aligned, energy is available, and the direction is clear. The classical Judgment reads "initiating power, disciplined momentum, and clear direction," which the <cite>King Wen sequence</cite> places first because it represents the originating force before any division into yin and yang.
          </p>
          <p>
            This hexagram does not mean effortless success. It means the conditions for sustained effort are present. The emphasis is on discipline and direction, not on force alone. A person who receives Hexagram 1 is being asked whether their momentum is guided by a clear purpose or simply by restless energy.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven moves with strength; the wise person acts with steady purpose." Heaven in the <cite>I Ching</cite> does not rest — it moves continuously. The lesson is not to imitate raw power but to match the consistency of heaven's movement with your own steady, purposeful action.
          </p>
          <p>
            In practical terms, this hexagram appears when a project, relationship, or decision is at a point of genuine momentum. The question it asks is: are you directing that momentum, or are you being carried by it? Directed momentum builds; undirected momentum exhausts.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 1 often appears when someone is considering a major initiative — launching a business, taking a leadership role, or committing to a long-term project. The hexagram supports the move but asks for a clear plan and the discipline to follow through over time, not just at the start.
          </p>
          <p>
            In relationship contexts, it can describe a moment when one person is carrying most of the energy. That is sustainable for a short period, but the image of heaven's continuous movement suggests that the effort must be self-renewing, not dependent on external validation.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 1 is not a guarantee of success. It is not telling you that you are invincible or that obstacles will disappear. The <cite>I Ching</cite> places Hexagram 2 (The Receptive) immediately after Hexagram 1 precisely because pure yang without yin becomes rigid and brittle. Even at the peak of creative power, the wise response is to remain open to feedback and correction.
          </p>
          <p>
            If changing lines are present, read them carefully. A changing line in Hexagram 1 often signals that the momentum is about to shift — either into a more receptive phase or into a situation that requires a different kind of strength.
          </p>
        </>
      ),
    },
  ],
  2: [
    {
      heading: "What Hexagram 2 describes",
      content: (
        <>
          <p>
            Hexagram 2, Kun (坤), is built from six broken yin lines — the only hexagram made entirely of yin. In the <cite>I Ching</cite>, it is the complement to Hexagram 1: where Qian initiates, Kun receives, sustains, and completes. The classical Judgment reads "support, patience, cultivation, and grounded responsiveness." The <cite>King Wen sequence</cite> places it second because nothing that is initiated can develop without a receptive ground to grow in.
          </p>
          <p>
            This hexagram is frequently misread as passive or weak. In classical interpretation, Kun is not passive — it is the active force of sustaining. Earth does not simply sit still; it nourishes, holds, and transforms everything placed within it. Receiving this hexagram is not a signal to do nothing; it is a signal to support rather than lead.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Earth carries all things; the wise person works through steadiness." The earth does not choose what it carries — it supports everything without discrimination. The lesson is not indifference but unconditional reliability. In a situation where Hexagram 2 appears, the most useful contribution is often steady, unglamorous support rather than visible initiative.
          </p>
          <p>
            According to the <cite>I Ching</cite>, the mare is the symbol of Kun — not the stallion. The mare moves across vast distances with endurance and responsiveness. This image suggests that the strength of Hexagram 2 is found in sustained effort over time, not in dramatic bursts.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 2 often appears when someone is in a supporting role — a collaborator, a team member, or someone building foundations for a future initiative. The hexagram validates that role and asks for full commitment to it rather than impatience to lead before the time is right.
          </p>
          <p>
            In relationship contexts, it can describe a period where one person needs to receive care rather than give it, or where the relationship itself needs quiet cultivation rather than dramatic gestures. The question it asks is: can you sustain this without needing recognition for it?
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 2 is not telling you to be passive, to suppress your own needs, or to accept mistreatment. The earth is receptive, but it also has limits — it does not absorb poison indefinitely without consequence. If the situation requires you to set a boundary or speak clearly, Hexagram 2 does not prevent that.
          </p>
          <p>
            The <cite>I Ching</cite> warns specifically about "yellow earth" in the line texts — a signal that the receptive quality must be grounded in discernment, not in blind compliance. Steadiness is a strength; self-erasure is not.
          </p>
        </>
      ),
    },
  ],
  11: [
    {
      heading: "What Hexagram 11 describes",
      content: (
        <>
          <p>
            Hexagram 11, Tai (泰), is one of the most favorable hexagrams in the <cite>I Ching</cite>. Its structure places Earth (Kun) above Heaven (Qian) — an arrangement that seems counterintuitive but describes a moment of genuine communication between levels. Heaven's energy rises upward; Earth's energy descends. When they move toward each other, exchange happens and things flourish.
          </p>
          <p>
            The classical Judgment reads "flow between levels creates stability and shared prosperity." According to the <cite>King Wen sequence</cite>, Hexagram 11 follows the pair of Hexagram 9 (Small Taming) and Hexagram 10 (Treading) — suggesting that peace arrives after careful restraint and correct conduct, not by accident.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven and earth communicate; support moves both ways." The key word is "communicate." Peace in the <cite>I Ching</cite> is not the absence of tension — it is the presence of genuine exchange. A situation where people at different levels are actually listening to each other, where resources flow in both directions, and where effort is recognized and rewarded.
          </p>
          <p>
            The practical lesson is that this favorable moment requires active maintenance. The <cite>I Ching</cite> notes that peace contains the seed of standstill (Hexagram 12) if it is taken for granted. The wise response to Hexagram 11 is not to relax entirely but to use the favorable conditions to build something durable.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 11 often appears when a project is in a productive phase — team communication is good, resources are available, and the direction is clear. The hexagram supports continued effort and suggests that this is a good time to make progress on things that require cooperation.
          </p>
          <p>
            In relationship contexts, it describes a period of genuine mutual support — both people are contributing, both are receiving, and the dynamic feels balanced. The question it asks is: are you using this good period to deepen the foundation, or are you assuming it will continue without attention?
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 11 is not a promise that everything will stay easy. The <cite>I Ching</cite> is explicit that Tai and Pi (Hexagram 12, Standstill) are paired opposites that cycle into each other. Receiving Hexagram 11 is an invitation to act well during a favorable period, not a guarantee that the favorable period is permanent.
          </p>
          <p>
            It is also not saying that all conflict has been resolved. Peace in this hexagram means productive exchange, not the absence of difference. Disagreements can still exist within a Tai situation — what matters is that the channels of communication remain open.
          </p>
        </>
      ),
    },
  ],
  24: [
    {
      heading: "What Hexagram 24 describes",
      content: (
        <>
          <p>
            Hexagram 24, Fu (复), shows a single yang line returning at the bottom of five yin lines. In the <cite>I Ching</cite>, this is the image of the winter solstice — the moment when yang energy, which has been retreating since summer, turns and begins to grow again. The classical Judgment reads "renewal begins with one honest return to the path." The <cite>King Wen sequence</cite> places Fu after Hexagram 23 (Splitting Apart) because return follows dissolution.
          </p>
          <p>
            The key word is "return," not "arrival." Fu does not describe a completed recovery. It describes the first moment of genuine turning — the point where the direction changes, even if the change is barely visible yet. That single yang line at the bottom is small but real.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder within earth; the turning point comes gently." Thunder underground is not yet audible — it is the potential of movement before it breaks the surface. The <cite>I Ching</cite> advises against forcing this early energy into premature action. The ancient practice associated with Fu was to close the passes and rest for seven days after the solstice — a period of quiet consolidation before resuming activity.
          </p>
          <p>
            The practical lesson is that genuine return requires a pause. If you have been moving in the wrong direction, the first step is not to rush in the right direction — it is to stop, orient, and then move with intention. Hurrying the return exhausts the new energy before it has established itself.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 24 often appears after a period of stagnation, failure, or misdirection. It signals that conditions are beginning to shift in a favorable direction, but the shift is fragile. This is a time to recommit to fundamentals — to return to what you know works — rather than to launch ambitious new initiatives.
          </p>
          <p>
            In personal contexts, Fu frequently appears when someone is recovering from burnout, a difficult relationship, or a period of confusion. The <cite>I Ching</cite> treats this as a natural cycle, not a failure. The question it asks is: can you trust the small returning energy without demanding that it immediately become large?
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 24 is not saying that everything is fixed or that the difficult period is fully over. One yang line among five yin lines is a beginning, not a completion. The <cite>I Ching</cite> is clear that this energy needs protection and patience before it can sustain itself.
          </p>
          <p>
            It is also not advising indefinite waiting. "Return" is an active word — it requires a choice to reorient. The hexagram asks you to make that choice clearly and then to support the new direction with consistent, modest effort rather than dramatic gestures.
          </p>
        </>
      ),
    },
  ],
  29: [
    {
      heading: "What Hexagram 29 describes",
      content: (
        <>
          <p>
            Hexagram 29, Kan (坎), is formed by doubling the Water trigram — danger above and danger below. In the <cite>I Ching</cite>, Kan does not describe a single difficult moment but a repeated pattern of challenge: the same obstacle appearing again, the same pit encountered twice. The classical Judgment reads "repeated difficulty is crossed through sincerity and skill." The <cite>King Wen sequence</cite> pairs Kan with Li (Fire, Hexagram 30) as the two great elemental forces of depth and clarity.
          </p>
          <p>
            Water in the <cite>I Ching</cite> does not stop when it meets an obstacle — it fills the hollow and flows on. This is the core teaching of Hexagram 29: the way through repeated difficulty is not to avoid it or to fight it but to move through it with the consistency of water, filling each hollow completely before moving to the next.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water flows on water; keep moving through danger." The emphasis is on keeping moving. Paralysis in a Kan situation is more dangerous than imperfect action. The <cite>I Ching</cite> associates Kan with the heart — specifically with the quality of sincerity that allows a person to remain honest and functional even under sustained pressure.
          </p>
          <p>
            The practical lesson is that skill matters here. Water finds the path of least resistance not through luck but through consistent pressure over time. In a Kan situation, the question is: what is the actual path through this obstacle, and are you applying your effort there rather than against the hardest surface?
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 29 often appears during sustained periods of difficulty — a project that keeps hitting obstacles, a role that requires navigating repeated conflict, or a market environment that is genuinely hostile. The hexagram does not promise that the difficulty will end soon. It asks whether you have the sincerity and skill to keep moving through it.
          </p>
          <p>
            In personal contexts, Kan frequently describes emotional patterns that repeat — the same kind of relationship difficulty, the same fear surfacing in different situations. The <cite>I Ching</cite> treats this repetition as information: the pattern is showing you something that needs to be understood, not just survived.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 29 is not telling you that you are trapped or that the situation is hopeless. Water always finds a way through — the question is timing and method, not possibility. The <cite>I Ching</cite> is clear that Kan is a traversable situation, not a permanent state.
          </p>
          <p>
            It is also not advising reckless persistence. "Skill" is half of the Judgment alongside "sincerity." Moving through danger without skill is not courage — it is waste. If the current approach is not working, Hexagram 29 asks you to find a different path through the same obstacle, not to push harder against the same wall.
          </p>
        </>
      ),
    },
  ],
  36: [
    {
      heading: "What Hexagram 36 describes",
      content: (
        <>
          <p>
            Hexagram 36, Ming Yi (明夷), shows Fire (Li) below Earth (Kun) — the sun entering the earth, light going underground. In the <cite>I Ching</cite>, this is the image of a person of clarity operating in an environment that does not recognize or support that clarity. The classical Judgment reads "protect inner clarity in an unsupportive environment." The <cite>King Wen sequence</cite> pairs Ming Yi with Hexagram 35 (Progress) as its opposite: where Progress describes visibility and advancement, Darkening of the Light describes concealment and endurance.
          </p>
          <p>
            The classical commentary associates this hexagram with the story of Prince Ji, who feigned madness to survive under a tyrannical ruler. The lesson is not deception for its own sake but the wisdom to protect what is valuable when the environment cannot safely hold it.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Light enters the earth; conceal brilliance when needed." The sun does not stop existing when it sets — it continues its movement underground and will rise again. The <cite>I Ching</cite> asks the person in a Ming Yi situation to maintain their inner standard without broadcasting it in a context where doing so would invite attack or suppression.
          </p>
          <p>
            The practical lesson is the difference between concealment and compromise. Concealing your clarity means not performing it unnecessarily in a hostile environment. Compromising your clarity means actually abandoning it. Hexagram 36 asks for the first, not the second.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 36 often appears when someone is working in an organization or under leadership that does not value their contribution, suppresses honest feedback, or actively punishes clarity. The hexagram does not say to quit immediately — it says to protect your standards and your energy while you assess the situation and plan your next move.
          </p>
          <p>
            In personal contexts, Ming Yi can describe a relationship or family dynamic where expressing your genuine perspective is consistently met with dismissal or hostility. The <cite>I Ching</cite> treats this as a temporary situation that requires strategic patience, not permanent self-suppression.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 36 is not telling you to become permanently invisible or to accept mistreatment indefinitely. The sun rises again — Ming Yi is a phase, not a permanent condition. The <cite>I Ching</cite> is clear that the light will return to visibility when conditions change.
          </p>
          <p>
            It is also not advising dishonesty. "Conceal brilliance" means choosing when and where to express your clarity, not abandoning it or pretending to agree with what you know is wrong. The inner standard must remain intact — that is the whole point of the hexagram.
          </p>
        </>
      ),
    },
  ],
  12: [
    {
      heading: "What Hexagram 12 describes",
      content: (
        <>
          <p>
            Hexagram 12, Pi (否), is the direct opposite of Hexagram 11 (Peace). Its structure places Heaven (Qian) above Earth (Kun) — each moving away from the other. Heaven rises further upward; Earth sinks further downward. There is no exchange, no communication, no flow. The <cite>I Ching</cite> calls this Standstill or Stagnation.
          </p>
          <p>
            The classical Judgment reads "when flow is blocked, conserve integrity and avoid wasteful struggle." According to the <cite>King Wen sequence</cite>, Pi and Tai are paired precisely because they describe the same relationship in opposite states. What was flourishing in Hexagram 11 has now closed. The question is not how to force it open but how to preserve what matters while the blockage lasts.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven and earth do not meet; withdraw from empty exchange." The practical lesson is discernment about where to invest energy. In a Pi situation, pushing harder into a blocked channel wastes resources. The <cite>I Ching</cite> advises withdrawal — not defeat, but strategic conservation.
          </p>
          <p>
            "Empty exchange" is a specific warning. It describes situations where the forms of communication are maintained — meetings happen, messages are sent, agreements are made — but nothing actually moves. Recognizing empty exchange early is the skill Hexagram 12 develops.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 12 often appears when an organization has become bureaucratically blocked — decisions are delayed, feedback loops are broken, and effort produces no visible result. The hexagram does not say to quit; it says to stop wasting energy on the blocked channel and to quietly build capacity for when conditions change.
          </p>
          <p>
            In personal contexts, it can describe a period of isolation, disconnection, or feeling unseen. The <cite>I Ching</cite> treats this as a temporary phase with a natural end. The task is to maintain inner integrity — to not become cynical or bitter — while the external situation remains unfavorable.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 12 is not telling you that the situation is permanently hopeless. Pi and Tai cycle into each other — standstill contains the seed of peace just as peace contains the seed of standstill. The <cite>I Ching</cite> is explicit that this phase will pass.
          </p>
          <p>
            It is also not advising complete passivity. "Withdraw from empty exchange" is an active choice, not a collapse. The person who receives Hexagram 12 is being asked to stop performing effort where it produces nothing, and to redirect that energy toward what can actually be cultivated in private.
          </p>
        </>
      ),
    },
  ],
  40: [
    {
      heading: "What Hexagram 40 describes",
      content: (
        <>
          <p>
            Hexagram 40, Xie (解), shows Thunder (Zhen) above Water (Kan) — the image of a storm breaking after a period of sustained tension. In the <cite>I Ching</cite>, Xie describes the moment when a difficulty that has been building finally releases. The classical Judgment reads "release tension quickly once the cause is understood." The <cite>King Wen sequence</cite> pairs Xie with Hexagram 39 (Obstruction) as its resolution: what was blocked in Jian now opens in Xie.
          </p>
          <p>
            The key instruction is "quickly." Once the cause of a difficulty is understood and the obstruction clears, the <cite>I Ching</cite> advises acting without delay. Holding onto the tension after the cause is resolved — through resentment, over-analysis, or reluctance to forgive — reintroduces the blockage unnecessarily.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder and rain arrive; forgive what no longer needs holding." Rain after a storm clears the air and nourishes the ground. The <cite>I Ching</cite> uses this image to describe the quality of release that Hexagram 40 calls for: not a grudging concession but a genuine clearing that allows new growth.
          </p>
          <p>
            The practical lesson is that Deliverance requires two movements: releasing what has been resolved, and returning to the center. The classical text advises returning to the ordinary path as soon as the difficulty clears — not celebrating the release so long that you lose the momentum of the new opening.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 40 often appears when a long-standing conflict, bottleneck, or stressful situation finally resolves. The hexagram asks you to close it cleanly — to complete the resolution rather than leaving loose ends that could reopen the tension. This is a good time to forgive, to clarify agreements, and to move forward without relitigating the past.
          </p>
          <p>
            In personal contexts, Xie frequently describes the end of a difficult emotional period — a relationship tension that finally breaks open into honest conversation, or a period of anxiety that lifts once the underlying cause is addressed. The <cite>I Ching</cite> treats this as a natural release, not a permanent solution, and asks you to use the cleared space wisely.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 40 is not saying that all problems are solved or that the underlying conditions have permanently changed. Deliverance describes a release, not a transformation. The <cite>I Ching</cite> is clear that the same patterns can return if the root causes are not addressed during the open period.
          </p>
          <p>
            It is also not advising premature celebration. "Return to the center" means re-establishing stability, not launching immediately into the next ambitious project. The cleared space is an opportunity to consolidate and prepare, not just to exhale.
          </p>
        </>
      ),
    },
  ],
  47: [
    {
      heading: "What Hexagram 47 describes",
      content: (
        <>
          <p>
            Hexagram 47, Kun (困), shows a Lake (Dui) above Water (Kan) — a lake without water, drained and exhausted. In the <cite>I Ching</cite>, this is the image of genuine constraint: resources are depleted, the usual channels are closed, and words carry little weight. The classical Judgment reads "pressure tests speech, spirit, and priorities." The <cite>King Wen sequence</cite> pairs Kun with Hexagram 48 (The Well) — exhaustion and the source of nourishment placed side by side.
          </p>
          <p>
            The classical commentary notes that in a Kun situation, "the superior person stakes their life on following their will." This is not recklessness — it is the recognition that when external resources are cut off, inner integrity becomes the only reliable foundation. What you hold onto when everything else is stripped away reveals what actually matters.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake without water; conserve your inner resources." The lake is not destroyed — it is temporarily drained. The <cite>I Ching</cite> treats Hexagram 47 as a phase, not a permanent condition. The practical lesson is to stop spending energy on channels that are currently closed and to protect what remains.
          </p>
          <p>
            "Words carry little weight" is a specific warning in the classical text. In a Kun situation, explaining yourself, arguing your case, or seeking validation from the environment that is constraining you tends to make things worse. The <cite>I Ching</cite> advises silence and inner work over external persuasion.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 47 often appears during periods of genuine professional constraint — a role that offers no growth, a project that has lost its resources, or a market environment that has closed. The hexagram does not say to give up; it says to stop performing effort for an audience that cannot currently receive it, and to use the constrained period to clarify what you actually want to build next.
          </p>
          <p>
            In personal contexts, Kun frequently describes emotional exhaustion — the feeling of having given everything and received nothing back. The <cite>I Ching</cite> treats this as a signal to return to the source of nourishment (hence its pairing with Hexagram 48, The Well) rather than continuing to draw from a depleted reservoir.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 47 is not telling you that you are permanently defeated or that the constraint will never lift. The lake is drained, not destroyed — water will return. The <cite>I Ching</cite> is clear that Kun is a traversable phase, and that the person who maintains integrity through it emerges with something that cannot be taken away.
          </p>
          <p>
            It is also not advising complete withdrawal from all action. "Conserve inner resources" means being selective about where you invest energy, not becoming entirely passive. The question Hexagram 47 asks is: of everything you are currently doing, what actually nourishes you and what is simply draining what remains?
          </p>
        </>
      ),
    },
  ],
  49: [
    {
      heading: "What Hexagram 49 describes",
      content: (
        <>
          <p>
            Hexagram 49, Ge (革), shows Fire (Li) within the Lake (Dui) — two forces that cannot coexist indefinitely. Fire evaporates water; water extinguishes fire. In the <cite>I Ching</cite>, this tension describes a situation where real change is necessary, not cosmetic adjustment. The classical Judgment reads "real change requires timing, legitimacy, and clear need." The <cite>King Wen sequence</cite> pairs Ge with Hexagram 50 (The Cauldron) — revolution and the vessel that holds what the revolution produces.
          </p>
          <p>
            The classical text is specific about the conditions for successful revolution: it must happen at the right time, it must be recognized as necessary by those affected, and it must address a genuine need rather than personal ambition. Change that lacks any of these three tends to create new problems rather than resolving the old ones.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire in the lake; renew the calendar of action." The ancient Chinese calendar was periodically reformed when it no longer accurately reflected the seasons — a practical, necessary correction rather than a dramatic overthrow. The <cite>I Ching</cite> uses this image to suggest that the best revolutions are corrections, not destructions.
          </p>
          <p>
            The practical lesson is that timing matters more than force. The <cite>I Ching</cite> advises waiting until the need for change is widely recognized before acting — not because change should be delayed indefinitely, but because change that arrives before its time is rejected, and change that arrives after its time is too late to be useful.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 49 often appears when someone is considering a significant structural change — leaving an organization, restructuring a team, pivoting a business model, or ending a long-standing arrangement. The hexagram supports the change but asks three questions: Is the timing right? Is the need clear to others, not just to you? Is this addressing a genuine problem or a personal frustration?
          </p>
          <p>
            In personal contexts, Ge can describe a relationship or life pattern that has genuinely run its course and needs to be transformed rather than maintained. The <cite>I Ching</cite> treats this as a natural process — fire and water cannot coexist indefinitely — but asks that the transformation be carried out with clarity and care rather than impulsively.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 49 is not giving permission for impulsive or destructive change. The classical conditions — timing, legitimacy, clear need — are not formalities. The <cite>I Ching</cite> is explicit that revolution undertaken without these conditions tends to produce regret. The hexagram asks you to examine whether all three are genuinely present before acting.
          </p>
          <p>
            It is also not saying that the status quo is acceptable. If the fire and water are genuinely incompatible, maintaining the tension indefinitely is not stability — it is postponed disruption. Hexagram 49 asks for honest assessment of whether the situation has reached the point where change is necessary, and if so, to carry it out well.
          </p>
        </>
      ),
    },
  ],
  4: [
    {
      heading: "What Hexagram 4 describes",
      content: (
        <>
          <p>
            Hexagram 4, Meng (蒙), is the hexagram of learning in its earliest and most uncertain stage. Its structure — a mountain above, water below — describes a spring that has not yet found its course. The classical Judgment reads "learning requires humility, repetition, and clear questions," which the <cite>I Ching</cite> places fourth in the <cite>King Wen sequence</cite> because it follows the initial difficulty of beginning: once something starts, it must be educated into form.
          </p>
          <p>
            The hexagram is named for the fog or covering that obscures a young mind. This is not a criticism. Meng treats not-knowing as the correct starting condition for genuine learning. The problem it identifies is not ignorance itself but the refusal to acknowledge ignorance — asking vague questions, expecting shortcuts, or demanding that the teacher repeat answers that have already been given.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A spring flows under the mountain; education turns uncertainty into form." A spring at its source has no fixed channel — it moves wherever the terrain allows. The mountain above gives it direction over time. The lesson is that early-stage learning needs structure from outside before it can generate structure from within.
          </p>
          <p>
            In practical terms, this hexagram asks whether you are approaching a learning situation with genuine openness or with the expectation of quick answers. The <cite>I Ching</cite> is explicit that the oracle will not answer a question asked three times in a row — not out of stubbornness, but because repeated asking without reflection is not learning. It is avoidance dressed as inquiry.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career and education contexts, Hexagram 4 often appears when someone is entering a new field, starting under a mentor, or facing a skill gap they have been reluctant to acknowledge. The hexagram supports the learning process but asks for patience with the pace of genuine development. Trying to skip foundational stages — in a new role, a technical skill, or a creative practice — produces the kind of surface competence that collapses under pressure.
          </p>
          <p>
            In decision-making contexts, Meng can appear when someone is asking for certainty before they have done the preparatory work. The hexagram redirects attention: instead of seeking a definitive answer, clarify the question. A well-formed question is often more valuable than a premature answer.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 4 is not saying that you are foolish or that your question is wrong. The word "folly" in the traditional English translation carries a harshness that the original Chinese does not. Meng describes a natural developmental stage, not a character flaw. The <cite>I Ching</cite> treats the beginner's position with respect — the spring is not inferior to the river; it is simply earlier in its course.
          </p>
          <p>
            It is also not advising passivity. The spring under the mountain is moving. Hexagram 4 asks for active, humble engagement with the learning process — asking better questions, accepting correction, and returning to fundamentals when confused — not for waiting until understanding arrives on its own.
          </p>
        </>
      ),
    },
  ],
  6: [
    {
      heading: "What Hexagram 6 describes",
      content: (
        <>
          <p>
            Hexagram 6, Song (讼), is the hexagram of conflict — specifically, the kind of conflict that arises when two parties each believe they are right and neither is willing to examine the origin of the dispute. Its structure — heaven above, water below — describes two forces moving in opposite directions: heaven rises, water flows downward. The classical Judgment reads "do not escalate a dispute without clarifying terms," which the <cite>King Wen sequence</cite> places sixth because conflict is the natural consequence of collective effort (Hexagram 7 follows) when coordination breaks down.
          </p>
          <p>
            The hexagram does not say that conflict is always wrong. It says that most conflicts are sustained by unclear terms, not by genuine incompatibility. Before escalating — through litigation, confrontation, or public dispute — the <cite>I Ching</cite> asks you to examine whether the disagreement is about facts, values, or simply about who controls the framing of the situation.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven and water move apart; examine the origin of disagreement." When heaven and water move in opposite directions, no amount of force will bring them together — the structural divergence must be acknowledged first. The practical lesson is to trace the conflict back to its source before deciding how to respond.
          </p>
          <p>
            In most cases, the <cite>I Ching</cite> advises settling disputes through a trusted intermediary rather than through direct confrontation or formal proceedings. Not because confrontation is always wrong, but because escalation tends to harden positions and make the original issue harder to resolve. The hexagram asks: is winning this dispute worth the cost of the process?
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In workplace contexts, Hexagram 6 often appears around contract disputes, unclear role boundaries, or situations where two people or teams have incompatible assumptions about who owns a decision. The hexagram's advice is consistent: clarify terms before escalating. A conversation that surfaces the underlying assumption is almost always cheaper than the conflict that follows from leaving it unexamined.
          </p>
          <p>
            In personal relationships, Song can describe a recurring argument that never resolves because both parties are arguing about symptoms rather than the structural divergence underneath. The hexagram asks you to identify what the conflict is actually about — not the surface issue, but the difference in values, expectations, or needs that keeps producing the same argument.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 6 is not saying that you should avoid all conflict or capitulate to avoid confrontation. The <cite>I Ching</cite> is not a pacifist text. Some disputes are genuine and need to be addressed directly. What Song cautions against is the escalation of conflict before the terms are clear — going to court, going public, or going to war over a dispute whose origin has not been honestly examined.
          </p>
          <p>
            It is also not saying that you are wrong. The hexagram does not take sides. It asks both parties to examine the origin of the disagreement before committing to a course of action that will be difficult to reverse. If the dispute is genuine and the terms are clear, the hexagram supports addressing it — but with proportion, not with maximum force.
          </p>
        </>
      ),
    },
  ],
  7: [
    {
      heading: "What Hexagram 7 describes",
      content: (
        <>
          <p>
            Hexagram 7, Shi (师), is the hexagram of organized collective effort. Its structure — water below, earth above — describes a reservoir held within the earth: contained power, available when needed, directed by the terrain that holds it. The classical Judgment reads "collective effort needs discipline, leadership, and proportion," which the <cite>King Wen sequence</cite> places seventh because organized force is the natural response to conflict (Hexagram 6) when individual action is insufficient.
          </p>
          <p>
            The hexagram is named for an army, but its scope is broader than military action. Shi describes any situation where a group of people must be organized around a shared purpose under clear leadership. The emphasis is not on the size of the force but on the quality of its organization: clear command, proportionate response, and a legitimate cause that the participants can understand and accept.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water gathers in the earth; organize people around a clear standard." Water in the earth is not visible on the surface, but it is present and available. The lesson is that effective collective effort depends on reserves that have been built before they are needed — trained people, clear processes, established trust — not on improvised mobilization at the moment of crisis.
          </p>
          <p>
            The <cite>I Ching</cite> is specific about leadership in this hexagram: the general must be experienced and trusted, the cause must be just, and the force used must be proportionate to the situation. An army that exceeds its mandate, or a leader who acts without legitimacy, produces the kind of disorder that Hexagram 7 is meant to prevent.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In organizational contexts, Hexagram 7 often appears when a team or company needs to mobilize around a significant challenge — a product launch, a competitive threat, a restructuring, or a crisis response. The hexagram supports the mobilization but asks three questions: Is the leadership clear and trusted? Is the goal understood by the people being asked to act? Is the response proportionate to the actual situation, or is it driven by anxiety?
          </p>
          <p>
            In personal decision-making, Shi can describe a moment when someone needs to marshal their own internal resources — time, energy, attention, discipline — around a demanding goal. The hexagram's advice applies equally: organize before mobilizing, establish clear priorities, and avoid dispersing effort across too many fronts simultaneously.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 7 is not endorsing aggression or the use of force as a first resort. The <cite>I Ching</cite> treats military action as a last resort precisely because its costs — to people, to resources, to relationships — are high and often irreversible. Shi asks that the cause be legitimate and the need be genuine before organizing collective force around it.
          </p>
          <p>
            It is also not saying that strong leadership means authoritarian control. The water-in-earth image suggests contained, available power — not domination. The most effective leadership in this hexagram is the kind that organizes people around a clear standard they can accept, not the kind that compels compliance through fear. A force held together by fear disperses the moment the pressure is removed.
          </p>
        </>
      ),
    },
  ],
  17: [
    {
      heading: "What Hexagram 17 describes",
      content: (
        <>
          <p>
            Hexagram 17, Sui (随), is the hexagram of following — not passive compliance, but the active choice to align with what is genuinely worth following. Its structure — lake above, thunder below — describes thunder that has retreated into the lake at the end of autumn: the energy that drove summer's growth has settled, and the season asks for rest and responsiveness rather than initiative. The classical Judgment reads "adaptation succeeds when you choose what is worth following," which the <cite>King Wen sequence</cite> places seventeenth as a counterpoint to the organizing force of Hexagram 16 (Enthusiasm).
          </p>
          <p>
            The hexagram is often misread as advising submission or conformity. The <cite>I Ching</cite> is more precise: Sui describes the intelligence of knowing when to lead and when to follow, and the discernment to choose what is actually worth following. Following a bad leader, a failing trend, or a crowd moving in the wrong direction is not what this hexagram recommends. It asks for honest assessment of whether the thing you are aligning with deserves your alignment.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder within the lake; rest at the right time and respond well." Thunder inside the lake is not visible — its energy is stored, not expressed. The practical lesson is that there are seasons for initiative and seasons for responsiveness, and confusing the two wastes energy. When the season calls for following, the wise response is to follow well: attentively, selectively, and without losing your own judgment.
          </p>
          <p>
            The <cite>I Ching</cite> connects this hexagram to the idea of mutual following: a leader who wants to be followed must also be willing to follow — the needs of the situation, the feedback of the people, the requirements of the moment. Sui is not a one-directional relationship. It describes a dynamic of responsive alignment that works in both directions.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 17 often appears when someone is deciding whether to align with a new direction — a company pivot, a manager's vision, an industry trend, or a mentor's guidance. The hexagram supports the alignment if the direction is genuinely sound, but asks for honest evaluation first. Following a direction you privately doubt, out of social pressure or fear of standing out, is not what Sui describes.
          </p>
          <p>
            In relationship contexts, Following can describe a moment when one person needs to step back from leading and allow the other to set the direction. This is not weakness — the hexagram treats it as a form of intelligence. Knowing when your initiative is not what the situation needs, and being willing to support rather than direct, is a skill that Hexagram 17 specifically honors.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 17 is not advising you to abandon your own judgment and follow whatever is in front of you. The word "following" in the classical text carries a condition: you follow what is worth following. The <cite>I Ching</cite> does not treat conformity as a virtue. Sui asks for discernment about what deserves your alignment, not for the suspension of discernment in favor of compliance.
          </p>
          <p>
            It is also not saying that this is a permanent posture. Thunder rests in the lake in autumn, but it returns in spring. Hexagram 17 describes a phase, not a fixed role. If you are in a season of following, the hexagram asks you to do it well and attentively — not to conclude that following is all you are capable of.
          </p>
        </>
      ),
    },
  ],
  25: [
    {
      heading: "What Hexagram 25 describes",
      content: (
        <>
          <p>
            Hexagram 25, Wuwang (无妄), is the hexagram of innocence — action that is free from hidden agenda, self-deception, or manipulation. Its structure — heaven above, thunder below — describes creative force (heaven) expressed through spontaneous movement (thunder): action that arises naturally from the situation rather than from calculation. The classical Judgment reads "act without manipulation and stay aligned with reality," which the <cite>King Wen sequence</cite> places twenty-fifth as a corrective to the accumulated complexity of the preceding hexagrams.
          </p>
          <p>
            The name Wuwang is often translated as "without falsehood" or "unexpected." Both translations point to the same quality: action that is not distorted by wishful thinking, strategic positioning, or the attempt to force an outcome. The <cite>I Ching</cite> treats this as a high standard, not a simple one. Most people act with some mixture of genuine response and self-interested calculation. Hexagram 25 asks whether the calculation has become the dominant force.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder under heaven; natural action avoids excess." Thunder under heaven moves without deliberation — it responds to conditions directly. The practical lesson is that the most effective action in many situations is the most honest action: responding to what is actually present rather than to what you wish were present or what you fear might be present.
          </p>
          <p>
            The <cite>I Ching</cite> connects Wuwang to the idea of alignment with natural process. When action is genuinely innocent — free from manipulation and self-deception — it tends to produce results that are proportionate and sustainable. When action is driven by hidden agenda or wishful thinking, it tends to produce the "unexpected" outcomes that give this hexagram one of its alternative names: the unexpected consequence of misaligned action.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In decision-making contexts, Hexagram 25 often appears when someone is trying to determine whether their plan is genuinely sound or whether they are rationalizing a preferred outcome. The hexagram asks a direct question: are you responding to the situation as it actually is, or as you want it to be? This is particularly relevant in high-stakes decisions where the cost of self-deception is high — career pivots, relationship commitments, financial choices.
          </p>
          <p>
            In interpersonal contexts, Wuwang can describe a situation where someone is being manipulated — or where they are the one doing the manipulating, perhaps without fully acknowledging it. The hexagram asks for honesty about which is occurring. Manipulation in the <cite>I Ching</cite> is not always malicious; it often takes the form of managing others' perceptions to avoid a difficult conversation. Hexagram 25 asks whether that management is serving the relationship or undermining it.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 25 is not saying that all planning and strategy are forms of manipulation. The <cite>I Ching</cite> does not treat thoughtful preparation as a violation of innocence. What Wuwang cautions against is the specific distortion that occurs when self-interest or wishful thinking overrides honest perception of the situation. Planning based on accurate assessment is not manipulation; planning based on what you want to be true is.
          </p>
          <p>
            It is also not promising that innocent action always produces good outcomes. The hexagram acknowledges that sometimes misfortune arrives even when action is genuine and aligned. What it offers is not a guarantee but a standard: act without manipulation, stay aligned with reality, and accept the outcome without adding the additional suffering of self-deception to whatever difficulty arrives.
          </p>
        </>
      ),
    },
  ],
  30: [
    {
      heading: "What Hexagram 30 describes",
      content: (
        <>
          <p>
            Hexagram 30, Li (离), is the hexagram of fire and clarity — but clarity that depends entirely on what it clings to. Its structure is fire doubled: two trigrams of Li stacked, each representing a flame with a hollow center. The classical Judgment reads "clarity depends on what you attach yourself to," which the <cite>King Wen sequence</cite> places thirtieth as the direct counterpart to Hexagram 29 (The Abysmal, water doubled). Where water flows downward and inward, fire rises and illuminates — but only as long as it has fuel.
          </p>
          <p>
            The hollow center of the Li trigram is significant. Fire does not contain itself; it depends on what it burns. This is the hexagram's central teaching: your clarity, your vision, your ability to illuminate a situation — all of these depend on what you have attached yourself to. Attach to something substantial and your light is steady. Attach to something that burns quickly or burns wrong, and the light is brief, distorting, or destructive.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire joins fire; illumination needs fuel and discernment." Two fires together do not simply double the light — they can also double the consumption. The practical lesson is that clarity is not self-sustaining. It requires ongoing attention to what is feeding it: the quality of your information, the soundness of your commitments, the reliability of the people and principles you have aligned with.
          </p>
          <p>
            The <cite>I Ching</cite> connects this hexagram to the idea of dependent origination: nothing illuminates in isolation. A person who receives Hexagram 30 is being asked to examine not just what they see clearly, but what is making that clarity possible — and whether those foundations are worth maintaining.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career and creative contexts, Hexagram 30 often appears when someone's work depends heavily on a particular relationship, platform, institution, or set of assumptions. The hexagram asks whether that dependency is acknowledged and whether the fuel source is reliable. A consultant whose entire practice depends on one client, a creator whose audience lives on one platform, a thinker whose clarity depends on one framework — all are in Li's territory.
          </p>
          <p>
            In personal contexts, The Clinging can describe an emotional or intellectual attachment that is providing genuine illumination — or one that has become consuming. The hexagram does not say attachment is wrong. It asks whether the attachment is to something that sustains your clarity over time, or something that produces a bright but brief and distorting light.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 30 is not advising detachment. The <cite>I Ching</cite> does not treat non-attachment as a universal virtue. Li specifically describes the intelligence of choosing what to cling to — not the elimination of clinging. A fire that clings to nothing produces no light. The question is not whether to attach, but what to attach to and whether that attachment is conscious.
          </p>
          <p>
            It is also not saying that clarity is always available. Fire needs fuel, and there are moments when the fuel runs low. Hexagram 30 asks you to recognize when your clarity is diminished — when you are operating on assumptions that have not been refreshed, or commitments that have not been examined — and to tend to the source before the light fails entirely.
          </p>
        </>
      ),
    },
  ],
  48: [
    {
      heading: "What Hexagram 48 describes",
      content: (
        <>
          <p>
            Hexagram 48, Jing (井), is the hexagram of the well — a source of nourishment that is fixed in place, available to all, and dependent on maintenance to remain useful. Its structure — water above, wood below — describes the wooden bucket and rope that draw water upward: the mechanism by which a deep, invisible resource is made accessible. The classical Judgment reads "return to the source that nourishes everyone," which the <cite>King Wen sequence</cite> places forty-eighth as a counterpoint to Hexagram 47 (Oppression), where the lake has run dry.
          </p>
          <p>
            The well in the <cite>I Ching</cite> is not a private resource. It serves the whole community, and its value depends on two conditions: the water must be present at depth, and the mechanism for drawing it up must be intact. A well with water but a broken rope is useless. A well with a perfect rope but no water is equally useless. Hexagram 48 asks which of these conditions is currently at risk.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water over wood; renew the common well." Wood draws water upward — the image of a tree whose roots reach the water table, or a bucket on a rope. The practical lesson is that access to deep resources requires ongoing maintenance of the mechanism that connects surface activity to underlying depth. Neglect the rope and the water becomes unreachable even when it is present.
          </p>
          <p>
            The <cite>I Ching</cite> identifies three failure modes for the well: the water is muddy (the source has been contaminated), the rope is too short (the mechanism cannot reach the depth), or the jug breaks just before reaching the surface (the effort fails at the last moment). Each failure mode points to a different kind of neglect — of the source itself, of the tools, or of the final step of completion.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In professional contexts, Hexagram 48 often appears around questions of expertise, knowledge, and the systems that make deep competence accessible. A person or organization that has genuine depth but poor communication, poor documentation, or poor teaching mechanisms is in the well's territory: the water is there, but the rope is too short. The hexagram asks what would make the depth accessible to others who need it.
          </p>
          <p>
            In personal contexts, The Well can describe a relationship with a practice, a community, or an inner resource that has been neglected. The water is still there — the capacity for creativity, connection, or clarity has not disappeared — but the mechanism for drawing it up has fallen into disrepair. Hexagram 48 asks for honest assessment of what needs to be restored before the resource can be used again.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 48 is not saying that the source is exhausted. The well's water does not run out in this hexagram — the failures are always mechanical or relational, not fundamental. This is an important distinction: the <cite>I Ching</cite> treats the underlying resource as reliable. What is unreliable is the human maintenance of access to it. If you feel cut off from something that once nourished you, Jing asks whether the source has actually disappeared or whether the connection to it has simply been neglected.
          </p>
          <p>
            It is also not a private hexagram. The well serves the community, and its maintenance is a shared responsibility. Hexagram 48 asks not just "am I nourished?" but "is what I have access to being made available to others who need it?" Keeping the well to yourself — hoarding expertise, withholding knowledge, or failing to teach — is a form of neglect that the hexagram specifically addresses.
          </p>
        </>
      ),
    },
  ],
  50: [
    {
      heading: "What Hexagram 50 describes",
      content: (
        <>
          <p>
            Hexagram 50, Ding (鼎), is the hexagram of the ritual cauldron — the vessel in which raw material is transformed into something that can nourish and sustain a community. Its structure — fire above, wood below — describes the fire that cooks what the wood supports: transformation through sustained, contained heat. The classical Judgment reads "transformation happens through culture, vessel, and offering," which the <cite>King Wen sequence</cite> places fiftieth as the direct counterpart to Hexagram 48 (The Well): where the well draws nourishment from depth, the cauldron transforms raw material into refined form.
          </p>
          <p>
            The Ding cauldron in ancient China was not a cooking pot. It was a ceremonial vessel used to prepare offerings for ancestors and guests — an object that represented the transformation of raw nature into cultural form. The <cite>I Ching</cite> uses this image to describe any process in which something unrefined is brought into a structured container, subjected to sustained transformation, and offered outward. The emphasis is on all three elements: the vessel must be sound, the process must be sustained, and the result must be offered rather than hoarded.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire over wood; refine what nourishes the group." Fire over wood is controlled combustion — not a wildfire, but a hearth. The practical lesson is that transformation requires a container. Raw energy, raw talent, raw insight — none of these become useful without a structure that holds them long enough for refinement to occur. The cauldron is that structure: a form that makes transformation possible without letting the energy dissipate.
          </p>
          <p>
            The <cite>I Ching</cite> is specific about what can go wrong with the cauldron. If the legs are broken, the contents spill — the vessel cannot hold the transformation. If the handles are wrong, the cauldron cannot be carried — the result cannot be offered. If the jade rings are damaged, the appearance is compromised — the offering loses its cultural meaning. Each failure mode points to a different aspect of the transformative process that requires attention.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In organizational and creative contexts, Hexagram 50 often appears when someone is building something that is meant to transform raw input into refined output for others — a curriculum, a product, a practice, an institution. The hexagram asks whether the vessel is sound: does the structure actually hold the transformation, or does the energy dissipate before refinement can occur? A workshop that never produces finished work, a team that generates ideas but never ships, a practice that feels meaningful but produces nothing shareable — these are cauldrons with broken legs.
          </p>
          <p>
            In personal development contexts, Ding can describe a period of deliberate refinement — bringing raw experience, emotion, or capacity into a structured practice that transforms it into something usable. The hexagram supports this process but asks that the result be offered outward. Transformation that is kept entirely private eventually stagnates; the cauldron is designed to produce offerings, not to accumulate contents.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 50 is not saying that all transformation is slow or ceremonial. The cauldron image emphasizes sustained, contained heat — but the duration depends on what is being transformed. Some refinements are quick; others require long cooking. What the hexagram asks for is not slowness but containment: the process needs a vessel that holds it, whatever the timescale.
          </p>
          <p>
            It is also not saying that the vessel is more important than the contents. The <cite>I Ching</cite> treats the cauldron as a means, not an end. An elaborate structure that produces nothing nourishing has failed at its purpose. Hexagram 50 asks whether the transformation is actually occurring — whether what emerges from the process is genuinely refined and genuinely useful to others — not just whether the vessel looks impressive.
          </p>
        </>
      ),
    },
  ],
  63: [
    {
      heading: "What Hexagram 63 describes",
      content: (
        <>
          <p>
            Hexagram 63, Jiji (既济), is the hexagram of completion — the only hexagram in the <cite>I Ching</cite> where every line is in its correct position: yang lines in yang places, yin lines in yin places. Its structure — water above, fire below — describes a pot of water over a flame: the conditions for cooking are perfectly arranged. The classical Judgment reads "completion requires maintenance because imbalance can return," which the <cite>King Wen sequence</cite> places sixty-third, second to last, because perfect order contains within it the seed of its own unraveling.
          </p>
          <p>
            The paradox of Hexagram 63 is that the moment of perfect completion is also the moment of maximum vulnerability. Water above fire is stable only as long as the fire burns at the right intensity and the water does not overflow. Every line being correct means every line is also at the edge of becoming incorrect. The <cite>I Ching</cite> treats this not as a reason for anxiety but as a reason for vigilance: completion is not a destination but a condition that requires ongoing maintenance.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water above fire; success needs vigilance." The cooking pot is the image of a process that has reached its optimal state — but optimal states do not maintain themselves. The fire can go out, the water can boil away, the pot can tip. The practical lesson is that the work of completion is not the same as the work of maintenance, and confusing the two is one of the most common sources of failure after success.
          </p>
          <p>
            The <cite>I Ching</cite> specifically warns against relaxing attention after a significant achievement. The tendency to celebrate completion by withdrawing the effort that produced it is precisely what Jiji cautions against. The hexagram asks: now that you have arrived, what does it take to stay here? That question is not a burden — it is the next phase of the work.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In project and organizational contexts, Hexagram 63 often appears after a significant milestone — a product launch, a successful negotiation, a completed transition, a goal achieved. The hexagram supports the achievement but immediately redirects attention to maintenance: what systems need to be in place to sustain this outcome? What vigilance is required to prevent the gradual drift back toward disorder that follows most completions?
          </p>
          <p>
            In personal contexts, After Completion can describe a relationship, a practice, or a life arrangement that has reached a genuinely good state. The hexagram does not ask you to be anxious about this. It asks you to be attentive — to notice the small signs of drift before they become large problems, and to treat maintenance as a form of respect for what has been built rather than as a burden imposed by its fragility.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 63 is not saying that completion is an illusion or that success is always temporary. The <cite>I Ching</cite> treats Jiji as a genuine achievement — every line in its correct position is not a trivial state. What the hexagram cautions against is the specific error of treating completion as permanent without maintenance. The water above fire is real and functional; it just requires the fire to keep burning.
          </p>
          <p>
            It is also not advising constant anxiety or hypervigilance. The image of water over fire is calm and productive — it is cooking, not boiling over. Hexagram 63 asks for steady, attentive maintenance, not for the kind of anxious monitoring that itself disrupts the stability it is trying to protect. The wise response to completion is quiet, consistent care — not celebration followed by neglect, and not celebration replaced by worry.
          </p>
        </>
      ),
    },
  ],
  64: [
    {
      heading: "What Hexagram 64 describes",
      content: (
        <>
          <p>
            Hexagram 64, Weiji (未济), is the final hexagram of the <cite>I Ching</cite> — and it describes incompletion. Its structure — fire above, water below — is the inverse of Hexagram 63: every line is in the wrong position, yang where yin should be, yin where yang should be. The classical Judgment reads "the transition is not finished; sequence matters," which the <cite>King Wen sequence</cite> places sixty-fourth, last, because the <cite>I Ching</cite> ends not with arrival but with the moment before arrival — the threshold that must be crossed carefully.
          </p>
          <p>
            The choice to end the sequence here is deliberate. The <cite>I Ching</cite> is a book of change, and change does not end. Hexagram 64 teaches that incompletion is not failure — it is the natural condition of a living process. Fire above water describes energy that has not yet found its proper relationship with its medium: the flame rises, the water flows down, and the work of bringing them into productive relationship is still underway. The hexagram asks for patience with the process and precision about sequence.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire above water; cross carefully before claiming arrival." The image of crossing a river appears in the <cite>I Ching</cite>'s commentary on this hexagram: a young fox that has almost crossed a river gets its tail wet at the last moment. The practical lesson is that the final stage of a transition is often the most dangerous — not because the goal is wrong, but because premature confidence at the threshold leads to the kind of careless last step that undoes the whole crossing.
          </p>
          <p>
            Sequence matters in Weiji because the lines are all displaced. Getting to the right outcome requires moving through the right steps in the right order — not forcing the result before the conditions are ready. The hexagram asks for the specific discipline of not claiming completion before it has actually occurred.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In project and decision contexts, Hexagram 64 often appears when someone is close to a significant transition but has not yet completed it — a deal that is nearly closed, a project in its final phase, a relationship at a turning point, a career change in progress. The hexagram supports the direction but asks for careful attention to the remaining steps. Announcing the outcome before it is secured, relaxing effort before the crossing is complete, or skipping a necessary step because the goal seems close — these are the fox's wet tail.
          </p>
          <p>
            In personal contexts, Before Completion can describe a period of genuine transition where the old structure has dissolved but the new one has not yet solidified. This is an uncomfortable but necessary phase. The <cite>I Ching</cite> treats it with respect: being in transition is not the same as being lost. It asks for the patience to complete the crossing rather than rushing to declare arrival or retreating to the familiar shore.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 64 is not saying that completion is impossible or that the goal is wrong. The fire above water is not a failed arrangement — it is an arrangement in process. The <cite>I Ching</cite> ends with this hexagram not to suggest futility but to suggest continuity: every completion opens into a new beginning, and the sequence never truly ends. Weiji is the last hexagram because it points back to the first.
          </p>
          <p>
            It is also not advising indefinite delay. The fox is crossing the river — it is not standing on the bank. Hexagram 64 asks for careful, sequenced movement toward completion, not for paralysis in the face of incompletion. The distinction between careful crossing and fearful non-crossing is important: one is attentive to the remaining steps, the other avoids them. The hexagram supports the former and cautions against the latter.
          </p>
        </>
      ),
    },
  ],
  3: [
    {
      heading: "What Hexagram 3 describes",
      content: (
        <>
          <p>
            Hexagram 3, Zhun (屯), pairs Thunder below with Water above — movement
            pressing upward into danger. The <cite>I Ching</cite> places it third
            in the sequence, immediately after the Creative and the Receptive,
            because once heaven and earth exist, the first thing that emerges is
            difficulty. This is not an accident of placement; it reflects a
            classical observation that new beginnings are inherently disordered.
          </p>
          <p>
            The image is of a seedling breaking through hard ground. The energy
            for growth is present, but the form is not yet established. Receiving
            this hexagram does not mean the situation is hopeless — it means you
            are at the genuinely difficult first stage, where structure must be
            built before speed is possible.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder and rain begin; organize before forcing
            progress." Thunder represents the impulse to move; Water above
            represents the obstacle or the unclear terrain ahead. The lesson is
            not to stop, but to pause long enough to establish order — to find
            helpers, clarify the goal, and build a minimal structure before
            pushing forward.
          </p>
          <p>
            The <cite>King Wen sequence</cite> commentary on this hexagram
            specifically recommends appointing helpers rather than acting alone.
            Early-stage difficulty is rarely solved by more individual effort; it
            is solved by finding the right people and the right sequence of steps.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 3 often appears at the start of a new
            role, a new business, or a new project where the initial chaos feels
            overwhelming. The hexagram validates that the disorder is real and
            normal — but it asks whether you have taken time to organize before
            pushing for results. Hiring the right collaborator or clarifying the
            scope before executing is the move this hexagram supports.
          </p>
          <p>
            In relationship contexts, it can describe the early stage of a
            connection where both people are still finding their footing. The
            classical advice applies: do not force premature definition. Allow the
            structure to emerge through honest exchange rather than rushing to
            label or commit before the foundation is solid.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 3 is not telling you to abandon the effort. The difficulty it
            describes is the difficulty of beginning, not the difficulty of
            something fundamentally wrong. The <cite>I Ching</cite> does not place
            this hexagram third in the sequence to warn against starting — it
            places it there to prepare you for what starting actually feels like.
          </p>
          <p>
            It is also not advising indefinite preparation. The seedling that
            never breaks through the soil does not survive. The balance this
            hexagram asks for is between organizing enough to move effectively and
            not using organization as a substitute for action.
          </p>
        </>
      ),
    },
  ],
  5: [
    {
      heading: "What Hexagram 5 describes",
      content: (
        <>
          <p>
            Hexagram 5, Xu (需), places Water above Heaven — clouds have gathered
            above the sky, but the rain has not yet come. In the{" "}
            <cite>I Ching</cite>, this image describes a moment of genuine
            readiness that cannot yet be released. The energy is present, the
            direction is clear, but the external conditions have not aligned. The
            classical Judgment reads: "right timing matters; prepare while
            conditions gather."
          </p>
          <p>
            This hexagram is frequently misread as an instruction to do nothing.
            In classical interpretation, waiting is an active state. Heaven
            (Qian) below is moving upward with full creative force — it is not
            passive. The water above is not an enemy; it is the condition that
            must be met. The question this hexagram asks is: are you using the
            waiting period well?
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Clouds rise above heaven; nourishment comes through
            patient readiness." The word <em>xu</em> in classical Chinese carries
            the meaning of nourishment as well as waiting — the two are linked.
            While you wait, you eat, rest, and prepare. The <cite>I Ching</cite>{" "}
            commentary suggests that the wise person in this situation maintains
            their strength rather than exhausting it through premature action.
          </p>
          <p>
            In practical terms, the lesson is about the difference between
            waiting that builds capacity and waiting that wastes it. Hexagram 5
            supports the former: use the interval to clarify your plan, strengthen
            your position, and remain alert for the moment when conditions shift.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 5 often appears when someone is waiting
            for a decision — a job offer, a funding round, a project approval.
            The hexagram does not tell you the answer will come; it tells you that
            forcing the outcome before it is ready tends to produce worse results
            than maintaining readiness. Use the interval to prepare for the next
            step rather than repeatedly checking for news.
          </p>
          <p>
            In decision contexts, it can describe a situation where you have
            enough information to know the direction but not enough to act safely.
            The classical advice is to wait for the signal that conditions have
            changed — not to manufacture that signal through impatience.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 5 is not telling you to wait indefinitely or to avoid
            responsibility for moving forward. The clouds in the image do
            eventually produce rain — the waiting has an end. If you have been
            waiting for a very long time without any movement, this hexagram may
            be asking whether the obstacle is external timing or an internal
            reluctance to act.
          </p>
          <p>
            It is also not a guarantee that the outcome will be favorable once
            conditions align. The <cite>I Ching</cite> does not promise results;
            it describes the quality of the moment and the appropriate response.
            Waiting well improves your position — it does not determine the
            outcome.
          </p>
        </>
      ),
    },
  ],
  8: [
    {
      heading: "What Hexagram 8 describes",
      content: (
        <>
          <p>
            Hexagram 8, Bi (比), places Water above Earth — water naturally
            seeking its level, pooling together, forming a coherent body from
            separate streams. In the <cite>I Ching</cite>, this image describes
            the formation of genuine alliance: people or forces coming together
            around a shared center, not through coercion but through mutual
            recognition of common interest and trust.
          </p>
          <p>
            The classical Judgment includes an unusual instruction: examine
            yourself to see whether you have the qualities needed to be a center
            others can gather around. Holding together is not just about finding
            the right group — it is about being the kind of person or organization
            that others can sincerely commit to.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water rests on the earth; communities form around
            shared trust." The <cite>I Ching</cite> commentary on this hexagram
            emphasizes timing: those who come late to the alliance find the bonds
            already formed and the center already occupied. The practical lesson
            is that genuine commitment requires early and clear declaration, not
            hedged participation.
          </p>
          <p>
            In organizational terms, this hexagram describes the difference
            between a group held together by genuine shared purpose and one held
            together by convenience or fear. The former is durable; the latter
            dissolves under pressure. Hexagram 8 asks which kind of alliance you
            are building or joining.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 8 often appears when someone is deciding
            whether to commit to a team, a partnership, or an organization. The
            hexagram supports genuine commitment but asks for honest self-assessment
            first: do you share the values and direction of this group, or are you
            joining for convenience? Convenience-based alliances tend to fracture
            at the first serious test.
          </p>
          <p>
            In relationship contexts, it can describe a moment when two people
            need to decide whether they are genuinely building something together
            or simply occupying the same space. The classical emphasis on timing
            applies here too — the longer a genuine commitment is deferred, the
            harder it becomes to establish the trust that makes it real.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 8 is not telling you to join every group or commit to every
            alliance that presents itself. The <cite>I Ching</cite> is explicit
            that the center of a genuine alliance must have real authority and
            real trustworthiness — not just availability. Committing to a weak or
            corrupt center produces the appearance of alliance without its
            substance.
          </p>
          <p>
            It is also not saying that solitary effort is wrong. Some situations
            call for independence. But when Hexagram 8 appears, the question being
            asked is specifically about alliance — and the hexagram's consistent
            message is that genuine holding together, when the conditions are
            right, produces more than any individual effort can.
          </p>
        </>
      ),
    },
  ],
  9: [
    {
      heading: "What Hexagram 9 describes",
      content: (
        <>
          <p>
            Hexagram 9, Xiao Chu (小畜), places Wind above Heaven — the gentlest
            of forces positioned above the strongest. In the <cite>I Ching</cite>,
            this pairing describes a situation where a small, persistent influence
            is the only thing capable of shaping a large, powerful momentum. The
            classical Judgment reads: "small restraints refine a larger force."
          </p>
          <p>
            The hexagram is often received when someone wants to make a major
            move but the conditions are not yet aligned. The clouds in the image
            have gathered — the potential is real — but the rain has not come.
            This is not a failure of the situation; it is a description of where
            things actually are. The appropriate response is to work with what is
            available: small, careful adjustments that build toward the larger
            shift.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind moves across heaven; details shape momentum."
            Wind does not stop heaven — it redirects it gradually. The practical
            lesson is that in situations where direct force is unavailable or
            counterproductive, consistent small actions accumulate into real
            change. This is the hexagram of editing, refining, and preparing
            rather than launching.
          </p>
          <p>
            The <cite>I Ching</cite> commentary notes that this is a time for
            cultivating virtue and refining conduct — not because grand action is
            wrong in principle, but because the moment for it has not arrived.
            Using the interval to improve the quality of what you are building is
            the move that makes the eventual release more effective.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 9 often appears when someone is in a
            preparatory phase — building skills, refining a product, or
            strengthening a team before a major launch or transition. The
            hexagram validates the preparation and asks for patience with the
            pace. Forcing the launch before the refinement is complete tends to
            produce a weaker result than waiting for the right moment.
          </p>
          <p>
            In relationship or negotiation contexts, it can describe a situation
            where you have influence but not control. The other party is not ready
            to move, and pushing harder will not accelerate their readiness. Small,
            consistent demonstrations of reliability and care are more effective
            than dramatic gestures.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 9 is not telling you that large action is permanently
            unavailable. The clouds do eventually produce rain — the restraint is
            temporary. The <cite>I Ching</cite> places Hexagram 10 (Treading)
            immediately after Hexagram 9, suggesting that careful conduct in the
            small-taming phase prepares the ground for the more demanding
            navigation that follows.
          </p>
          <p>
            It is also not a license for indefinite delay. Small taming is a
            phase, not a permanent condition. If you have been refining and
            preparing for a long time without any movement toward release, the
            hexagram may be asking whether the preparation has become a way of
            avoiding the risk of the larger action.
          </p>
        </>
      ),
    },
  ],
  10: [
    {
      heading: "What Hexagram 10 describes",
      content: (
        <>
          <p>
            Hexagram 10, Lü (履), places Heaven above the Lake — the strongest
            trigram above the most joyful, creating a significant difference in
            level and power. The <cite>I Ching</cite> uses the image of treading
            on a tiger's tail: the danger is real, the power differential is
            obvious, and yet the person who treads carefully is not harmed. The
            classical Judgment reads: "careful conduct protects progress in
            sensitive conditions."
          </p>
          <p>
            This hexagram is not about fear. It is about the kind of precise,
            respectful awareness that allows someone to move through a genuinely
            difficult situation without triggering the danger that is present. The
            tiger does not bite the person who treads correctly — not because the
            tiger is friendly, but because the conduct was appropriate to the
            situation.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven above the lake; distinguish higher and lower
            roles." The practical lesson is about knowing your position relative
            to the power structures around you and conducting yourself accordingly
            — not out of servility, but out of accurate situational awareness. The{" "}
            <cite>I Ching</cite> commentary notes that distinguishing roles is not
            the same as accepting injustice; it is the recognition that different
            positions carry different responsibilities and different risks.
          </p>
          <p>
            In sensitive negotiations, hierarchical environments, or situations
            where one wrong word can undo careful work, Hexagram 10 asks for the
            discipline to match your conduct to the actual conditions rather than
            to how you wish the conditions were.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 10 often appears when someone is
            navigating a relationship with a powerful superior, a difficult client,
            or a high-stakes institutional process. The hexagram does not tell you
            to be passive — it tells you to be precise. Knowing when to speak,
            when to defer, and when to hold your position without escalating is
            the skill this hexagram describes.
          </p>
          <p>
            In decision contexts, it can describe a situation where the stakes are
            high and the margin for error is small. The classical advice is to
            proceed — the tiger's tail can be tread upon — but to do so with full
            attention rather than casual confidence.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 10 is not telling you to be permanently deferential or to
            suppress your own judgment in the face of authority. The person
            treading on the tiger's tail is not the tiger's servant — they are
            someone with a destination who is navigating a dangerous path with
            skill. The goal is to reach the other side, not to remain in the
            tiger's shadow indefinitely.
          </p>
          <p>
            It is also not saying that the situation is more dangerous than it
            appears. The <cite>I Ching</cite> is explicit that careful conduct
            leads to success here — the hexagram is not a warning to retreat but
            an instruction on how to advance. The danger is real but navigable.
          </p>
        </>
      ),
    },
  ],
  13: [
    {
      heading: "What Hexagram 13 describes",
      content: (
        <>
          <p>
            Hexagram 13, Tong Ren (同人), places Fire below Heaven — clarity
            rising toward the broadest possible view. In the <cite>I Ching</cite>,
            this image describes fellowship that extends beyond the immediate
            group: not just loyalty to those who are already close, but the
            capacity to find common ground with people who are different. The
            classical Judgment reads: "open alignment with others expands
            perspective."
          </p>
          <p>
            The hexagram makes a pointed distinction. Fellowship confined to the
            clan — to those who already agree with you — is described as limited
            and ultimately humiliating. Fellowship in the open field — based on
            shared purpose rather than shared background — is described as
            genuinely favorable. This is not a call for naive universalism; it is
            a call for principled rather than tribal alignment.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire rises into heaven; shared purpose clarifies the
            group." Fire illuminates — it makes visible what is actually present.
            The practical lesson is that genuine fellowship requires honesty about
            what the group actually shares, not just the assumption of agreement
            because people are familiar with each other.
          </p>
          <p>
            The <cite>I Ching</cite> commentary on this hexagram emphasizes that
            the leader of a fellowship must be able to distinguish people clearly
            — to see who is genuinely aligned and who is present for other
            reasons. This discernment is not suspicion; it is the clarity that
            makes real trust possible.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 13 often appears when someone is building
            a team, forming a partnership, or joining an organization. The
            hexagram asks whether the alignment is based on genuine shared values
            or on convenience and familiarity. Teams built on real common purpose
            survive disagreement; teams built on comfort tend to fracture when
            the first real conflict arrives.
          </p>
          <p>
            In community or leadership contexts, it describes the difference
            between a leader who builds broad coalitions and one who surrounds
            themselves only with people who already agree. The hexagram consistently
            favors the former — not because consensus is always right, but because
            narrow fellowship limits what is possible.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 13 is not saying that all alliances are equally valid or that
            you should seek fellowship with people whose values are genuinely
            incompatible with yours. The <cite>I Ching</cite> is clear that
            fellowship requires real common ground — the point is that this ground
            should be principled rather than merely tribal.
          </p>
          <p>
            It is also not a guarantee that broad fellowship will be easy. Fire
            rising into heaven is a powerful image, but fire also requires fuel
            and direction. Building genuine alignment across difference takes more
            effort than staying within familiar circles — the hexagram supports
            that effort without pretending it is simple.
          </p>
        </>
      ),
    },
  ],
  14: [
    {
      heading: "What Hexagram 14 describes",
      content: (
        <>
          <p>
            Hexagram 14, Da You (大有), places Fire above Heaven — the sun
            positioned above the sky itself, casting light in every direction. In
            the <cite>I Ching</cite>, this image describes a moment of exceptional
            abundance: not just material wealth, but any situation where resources,
            influence, clarity, or opportunity are available in unusual measure.
            The classical Judgment reads: "abundance is useful only when governed
            with clarity."
          </p>
          <p>
            The hexagram follows Hexagram 13 (Fellowship) in the{" "}
            <cite>King Wen sequence</cite> deliberately: genuine fellowship with
            others naturally produces great possession, because shared effort
            creates more than individual effort can. The abundance described here
            is not accidental — it is the result of alignment and cooperation.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire above heaven; illuminate resources with
            responsibility." The sun does not hoard its light — it illuminates
            everything equally. The practical lesson is that great possession
            carries an obligation to use what you hold in a way that benefits more
            than just yourself. The <cite>I Ching</cite> commentary specifically
            warns against arrogance: the person who holds much and becomes
            contemptuous of others loses the conditions that made the abundance
            possible.
          </p>
          <p>
            The hexagram also asks for clarity about what you actually possess.
            Fire illuminates — it makes things visible as they are, not as you
            wish them to be. Accurate assessment of your resources is as important
            as generosity in using them.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 14 often appears at a peak moment — a
            successful launch, a period of strong performance, or a position of
            unusual influence. The hexagram validates the abundance but asks how
            it is being used. Investing in others, sharing credit, and building
            durable structures during a peak period is the move this hexagram
            supports.
          </p>
          <p>
            In leadership contexts, it describes the responsibility that comes
            with holding significant resources or authority. The classical warning
            against arrogance is directly applicable: leaders who use peak moments
            to consolidate personal advantage rather than to strengthen the
            collective tend to find that the peak was shorter than it needed to be.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 14 is not telling you to give everything away or to feel
            guilty about abundance. The <cite>I Ching</cite> does not treat
            possession as inherently problematic — it treats ungoverned possession
            as problematic. Holding resources well, using them with clarity, and
            remaining free from arrogance is the standard, not self-denial.
          </p>
          <p>
            It is also not a promise that the abundance will last. The sun at its
            zenith is also the sun at the moment before it begins to descend. The
            hexagram asks you to use the peak well precisely because peaks are
            temporary. Building something durable during a period of great
            possession is wiser than assuming the conditions will continue
            indefinitely.
          </p>
        </>
      ),
    },
  ],
  15: [
    {
      heading: "What Hexagram 15 describes",
      content: (
        <>
          <p>
            Hexagram 15, Qian (谦), places Mountain below Earth — the image of
            something substantial deliberately positioned beneath rather than
            above. In the <cite>I Ching</cite>, this is one of the most
            consistently favorable hexagrams: the classical commentary notes that
            modesty succeeds in every line, which is unusual. The Judgment reads:
            "measured conduct makes strength acceptable and durable."
          </p>
          <p>
            The hexagram is frequently misread as an instruction to minimize
            yourself or pretend to less capability than you have. Classical
            interpretation is more precise: modesty is the accurate matching of
            expression to context. The mountain does not disappear — it is simply
            not elevated above everything else. The substance is real; the
            positioning is deliberate.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A mountain within the earth; reduce excess and honor
            balance." The <cite>I Ching</cite> commentary describes modesty as a
            leveling force: it reduces what is excessive and supplements what is
            insufficient. In practical terms, this means that the modest person
            does not dominate conversations they should listen in, does not claim
            credit that belongs to others, and does not display capability in ways
            that invite unnecessary competition.
          </p>
          <p>
            The durability aspect is important. Strength that is displayed
            constantly invites challenge and exhaustion. Strength held in reserve
            and deployed appropriately lasts longer and produces less friction.
            Hexagram 15 describes the long-game advantage of measured conduct.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 15 often appears when someone is in a
            position of real capability but is generating resistance — perhaps by
            being too visible, too assertive, or too quick to demonstrate
            expertise. The hexagram does not ask you to become less capable; it
            asks whether the way you are expressing that capability is creating
            unnecessary friction that could be avoided.
          </p>
          <p>
            In leadership contexts, it describes the quality that makes authority
            sustainable: leaders who do not need to constantly assert their
            position tend to hold it more securely than those who do. The mountain
            within the earth is not diminished by its position — it is protected
            by it.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 15 is not telling you to be passive, to suppress legitimate
            contributions, or to accept being overlooked indefinitely. The
            mountain is still a mountain — it has not ceased to exist. Modesty in
            the <cite>I Ching</cite> is a strategic and ethical quality, not a
            permanent condition of self-erasure.
          </p>
          <p>
            It is also not saying that all self-promotion is wrong. Context
            matters. There are situations where clear, direct communication of
            your capabilities is exactly what is needed. Hexagram 15 asks for
            calibration, not silence — the question is always whether the level
            of expression matches what the situation actually calls for.
          </p>
        </>
      ),
    },
  ],
  16: [
    {
      heading: "What Hexagram 16 describes",
      content: (
        <>
          <p>
            Hexagram 16, Yu (豫), places Thunder above Earth — the image of
            stored energy finally releasing into movement. In the{" "}
            <cite>I Ching</cite>, this hexagram describes the conditions for
            genuine collective enthusiasm: not manufactured excitement, but the
            natural release of energy that has been properly prepared and timed.
            The classical Judgment reads: "mobilize energy through rhythm, morale,
            and preparation."
          </p>
          <p>
            The hexagram is notable for its emphasis on music and ritual as
            practical tools. The <cite>I Ching</cite> commentary describes how
            ancient kings used music to honor virtue and offer it to the ancestors
            — not as decoration, but as a technology for aligning people's
            emotions and creating shared readiness for action. Enthusiasm, in this
            sense, is something that can be deliberately cultivated.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder emerges from earth; movement follows stored
            readiness." The practical lesson is about sequencing: enthusiasm that
            is not grounded in real preparation exhausts itself quickly. The
            thunder in this hexagram has been building underground — the release
            is powerful because the preparation was real.
          </p>
          <p>
            In organizational terms, this hexagram describes the difference
            between a launch that lands and one that fizzles. The conditions for
            genuine enthusiasm — clear purpose, shared rhythm, visible leadership,
            and a sense that the moment is right — must be built before the
            release, not improvised during it.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or leadership contexts, Hexagram 16 often appears when
            someone needs to rally a team, launch a campaign, or create momentum
            around a new direction. The hexagram supports the move but asks
            whether the conditions for genuine buy-in have been established. People
            commit to movements they feel, not just movements they are told about.
          </p>
          <p>
            In creative contexts, it can describe the moment when a project is
            ready to be shared — when the internal preparation has reached the
            point where release will generate real response rather than premature
            exposure. The timing of enthusiasm matters as much as its intensity.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 16 is not a license for hype or manufactured excitement. The
            <cite>I Ching</cite> is consistent that enthusiasm without substance
            behind it leads to exhaustion and loss of credibility. The thunder
            that emerges from earth in this hexagram is real — it has been
            building. Simulated enthusiasm that has no preparation behind it is a
            different thing entirely.
          </p>
          <p>
            It is also not saying that enthusiasm is always the right mode. The
            hexagram describes a specific moment — the release of stored readiness
            — not a permanent operating style. After the launch, after the
            mobilization, a different hexagram will describe what comes next.
          </p>
        </>
      ),
    },
  ],
  18: [
    {
      heading: "What Hexagram 18 describes",
      content: (
        <>
          <p>
            Hexagram 18, Gu (蛊), places Wind below Mountain — a gentle,
            penetrating force working beneath something heavy and fixed. In the{" "}
            <cite>I Ching</cite>, the character <em>gu</em> originally depicted a
            vessel containing decaying matter — the image of something that has
            been left too long and has begun to rot. The classical Judgment reads:
            "repair inherited patterns before asking for new growth."
          </p>
          <p>
            The hexagram specifically addresses decay that has developed over
            time, often through the failures of a previous generation or a
            previous phase of a project. It is not about sudden crisis but about
            the slow accumulation of neglect that eventually requires deliberate
            correction. Receiving this hexagram is a signal that the work ahead
            is repair work — and that repair work done well creates the conditions
            for genuine renewal.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind below the mountain; renewal begins with
            correction." The <cite>I Ching</cite> commentary on this hexagram
            includes an unusual instruction: consider what happened three days
            before the spoiling began, and plan for three days after the
            correction. This is a classical way of saying: understand the full
            context of the problem before acting, and monitor the results of your
            correction carefully rather than assuming the repair is complete.
          </p>
          <p>
            The practical lesson is that inherited dysfunction rarely has a single
            cause or a single fix. Wind working beneath a mountain is patient and
            persistent — it does not try to move the mountain directly. The
            corrective work this hexagram describes is thorough, careful, and
            willing to address root causes rather than symptoms.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 18 often appears when
            someone has inherited a broken system, a dysfunctional team, or a
            project that has been mismanaged. The hexagram validates the
            difficulty of the situation and asks for the patience to diagnose
            before fixing. Jumping to solutions before understanding the full
            scope of the decay tends to produce surface repairs that leave the
            underlying problem intact.
          </p>
          <p>
            In personal contexts, it can describe the work of addressing patterns
            that were established in childhood or early in a relationship — habits
            and assumptions that have been in place so long they feel like fixed
            conditions rather than things that can be changed. The hexagram
            supports that work and asks for the same patient, thorough approach.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 18 is not saying that the situation is hopeless or that the
            decay is permanent. The <cite>I Ching</cite> treats this hexagram as
            genuinely favorable — not because the work is easy, but because
            repair work done well creates better conditions than existed before
            the decay began. The spoiling is not the end of the story; it is the
            beginning of a correction that can produce real renewal.
          </p>
          <p>
            It is also not assigning blame to the previous generation or the
            previous phase. The classical framing is practical rather than
            judgmental: something went wrong, here is how to address it. The
            energy spent on blame is energy not spent on repair.
          </p>
        </>
      ),
    },
  ],
  19: [
    {
      heading: "What Hexagram 19 describes",
      content: (
        <>
          <p>
            Hexagram 19, Lin (临), places the Lake above Earth — water rising
            over the land, bringing nourishment and expanding reach. In the{" "}
            <cite>I Ching</cite>, the character <em>lin</em> carries the meaning
            of drawing near, overseeing, and approaching with care. The classical
            Judgment reads: "influence grows through presence, care, and timely
            supervision."
          </p>
          <p>
            This hexagram describes a period of genuine access and expanding
            influence — a time when your presence is welcomed, your input is
            valued, and the conditions for positive impact are unusually
            favorable. The <cite>King Wen sequence</cite> places it after
            Hexagram 18 (Work on What Has Been Spoiled) deliberately: repair work
            done well creates the conditions for this kind of open, growing
            approach.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "The lake rises over earth; approach with generosity."
            The practical lesson is about the quality of approach: the lake does
            not force itself onto the land — it rises naturally, bringing
            nourishment rather than flood. The <cite>I Ching</cite> commentary
            describes the ideal approach as one that combines genuine care for
            others with clear-eyed assessment of what is actually needed.
          </p>
          <p>
            The classical warning about the eighth month is significant. Hexagram
            19 describes a favorable window, not a permanent condition. The wise
            use of an approach period is to build something durable — relationships,
            structures, understanding — that will persist after the window closes.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 19 often appears when someone has
            recently gained access — a new role, a new relationship with a
            decision-maker, or a period of increased visibility. The hexagram
            supports using that access actively and generously, while remaining
            aware that the window is not permanent. Building genuine relationships
            during a period of favorable access is more valuable than extracting
            maximum short-term benefit.
          </p>
          <p>
            In mentorship or leadership contexts, it describes the responsibility
            of someone in a position of oversight: approaching those under your
            care with genuine interest in their development, not just their
            performance. The lake nourishes the earth — it does not simply
            measure it.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 19 is not telling you that the favorable conditions will
            last indefinitely. The classical warning about the eighth month is
            one of the more explicit time-limit signals in the{" "}
            <cite>I Ching</cite> — it is a reminder that approach periods end,
            and that the work done during them determines what survives the
            transition.
          </p>
          <p>
            It is also not saying that approach means intrusion. The lake rises
            naturally — it does not force itself where it is not welcome. Genuine
            approach requires reading whether your presence is actually useful to
            the situation, not just assuming that your intentions make it so.
          </p>
        </>
      ),
    },
  ],
  20: [
    {
      heading: "What Hexagram 20 describes",
      content: (
        <>
          <p>
            Hexagram 20, Guan (观), places Wind above Earth — wind moving across
            the land, observing and being observed. In the <cite>I Ching</cite>,
            the character <em>guan</em> means both to contemplate and to be
            contemplated: the hexagram operates in both directions simultaneously.
            The classical Judgment reads: "step back and see the pattern before
            acting."
          </p>
          <p>
            The hexagram describes a moment of genuine observation — not passive
            waiting, but the active work of seeing clearly. The{" "}
            <cite>King Wen sequence</cite> places it after Hexagram 19 (Approach)
            deliberately: after a period of active engagement and influence, the
            appropriate next move is often to step back and assess what has
            actually been built.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind moves over earth; observe what your conduct
            teaches." The <cite>I Ching</cite> commentary on this hexagram
            emphasizes the teaching function of example: ancient kings would tour
            their territories not primarily to inspect but to be seen — their
            conduct in public set the standard for the entire realm. The practical
            lesson is that how you behave when you think you are simply observing
            is itself a form of communication.
          </p>
          <p>
            In analytical terms, Hexagram 20 asks for the kind of observation
            that sees systems and patterns rather than just individual events.
            Wind touches everything — it does not focus on one point. The
            contemplation this hexagram describes is wide rather than narrow.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 20 often appears when someone is in a
            position of visibility — a new leadership role, a public-facing
            project, or a moment when their decisions are being watched by others
            who will draw conclusions from them. The hexagram asks whether your
            conduct in this visible position is teaching what you intend to teach.
          </p>
          <p>
            In decision contexts, it describes the value of pausing before acting
            to assess the full situation. Many decisions that seem urgent are
            actually better served by a period of genuine observation — gathering
            more information, watching how the situation develops, and seeing the
            pattern before committing to a direction.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 20 is not telling you to remain permanently in observation
            mode or to use contemplation as a way of avoiding commitment. The
            wind moves — it does not stop. Observation in the{" "}
            <cite>I Ching</cite> is a phase that leads to action, not a
            substitute for it.
          </p>
          <p>
            It is also not saying that your inner life is irrelevant. The
            hexagram operates in both directions: you observe the world, and the
            world observes you. But the classical emphasis is on the outward
            dimension — what your conduct actually communicates — rather than on
            private reflection alone. Both matter, but Hexagram 20 specifically
            asks about the gap between intention and visible example.
          </p>
        </>
      ),
    },
  ],
  21: [
    {
      heading: "What Hexagram 21 describes",
      content: (
        <>
          <p>
            Hexagram 21, Shi He (噬嗑), places Thunder above Fire — the image of
            lightning and thunder arriving together, the most decisive natural
            signal. In the <cite>I Ching</cite>, the hexagram's name literally
            means "biting through": the image is of a mouth with something
            obstructing it that must be bitten through before the mouth can close
            properly. The classical Judgment reads: "a blockage requires precise,
            fair, and decisive action."
          </p>
          <p>
            The hexagram is specifically associated with legal judgment and the
            administration of consequences. This is not about aggression or
            punishment for its own sake — it is about the removal of an obstacle
            that is preventing a situation from functioning correctly. The
            obstacle must be addressed; tolerating it indefinitely does not make
            it go away.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder and lightning combine; clarify law and
            consequence." The <cite>I Ching</cite> commentary describes how
            ancient kings used this hexagram as the basis for establishing clear
            penalties — not to be harsh, but to be unambiguous. The practical
            lesson is that unclear consequences invite repeated violations. When
            the standard is clear and the response is proportionate, the obstacle
            is removed and the situation can function again.
          </p>
          <p>
            Precision matters here. Biting through requires knowing exactly where
            the obstruction is and applying exactly the right force. Too little
            and the obstacle remains; too much and you damage what you are trying
            to restore. The <cite>I Ching</cite> consistently emphasizes fairness
            alongside decisiveness in this hexagram.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 21 often appears when
            a problem has been tolerated too long — a performance issue that has
            not been addressed, a boundary that has been repeatedly crossed, or a
            conflict that has been avoided rather than resolved. The hexagram
            supports taking clear action and asks for proportionality: the
            response should match the actual severity of the obstruction.
          </p>
          <p>
            In relationship contexts, it can describe a moment when something
            that has been left unsaid must be said directly. The obstacle to
            genuine connection is the unaddressed issue, not the act of addressing
            it. Biting through the discomfort of a difficult conversation is often
            what allows the relationship to function properly again.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 21 is not a license for aggression, punishment beyond what
            the situation warrants, or using force to resolve what could be
            resolved through honest communication. The classical emphasis on
            fairness is not decorative — it is the condition that makes the action
            legitimate. Decisive action that is disproportionate or unjust creates
            new problems rather than removing the old one.
          </p>
          <p>
            It is also not saying that every difficulty requires this kind of
            response. The <cite>I Ching</cite> has many hexagrams that describe
            patience, withdrawal, and gradual influence. Hexagram 21 applies
            specifically to situations where there is a genuine obstruction that
            cannot be worked around — where the only path forward goes through it.
          </p>
        </>
      ),
    },
  ],
  22: [
    {
      heading: "What Hexagram 22 describes",
      content: (
        <>
          <p>
            Hexagram 22, Bi (贲), places Fire below Mountain — light at the base
            of something solid, illuminating its surface. In the{" "}
            <cite>I Ching</cite>, this image describes the relationship between
            form and substance: the fire does not create the mountain, but it
            makes the mountain visible and beautiful. The classical Judgment reads:
            "form and beauty support substance when they do not replace it."
          </p>
          <p>
            The hexagram occupies an interesting position in the{" "}
            <cite>King Wen sequence</cite>: it follows Hexagram 21 (Biting
            Through), which deals with decisive action to remove obstacles. After
            the obstacle is cleared, grace — the careful attention to form and
            presentation — becomes appropriate again. The sequence suggests that
            beauty has its place, but that place comes after the essential work
            is done.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire at the foot of the mountain; clarify
            appearances." The <cite>I Ching</cite> commentary on this hexagram
            makes a careful distinction: grace is appropriate for small affairs
            but should not be the basis for important decisions. The practical
            lesson is that how something looks matters — presentation, form, and
            aesthetic care are real contributions — but they are secondary to what
            the thing actually is.
          </p>
          <p>
            In classical Chinese thought, ritual and ceremony are forms of grace:
            they give important moments their proper weight and make invisible
            values visible. Hexagram 22 supports this kind of meaningful form
            while warning against form that has become empty — ceremony without
            substance, presentation without content.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 22 often appears when someone is working
            on how to present their work — a pitch, a design, a communication
            strategy. The hexagram validates the importance of presentation while
            asking whether the underlying substance is solid enough to support it.
            A beautiful presentation of weak content is still weak content.
          </p>
          <p>
            In creative contexts, it describes the phase of refinement and
            finishing — the work of making something that is already good also
            beautiful. This is legitimate and valuable work. The hexagram supports
            it while reminding you that the refinement serves the work, not the
            other way around.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 22 is not saying that appearance is unimportant or that
            aesthetic care is superficial. The <cite>I Ching</cite> treats grace
            as a genuine value — fire illuminating a mountain is a beautiful and
            useful image. The warning is specifically against using grace as a
            substitute for substance in important decisions, not against grace
            itself.
          </p>
          <p>
            It is also not saying that all situations call for elaborate
            presentation. Sometimes the most graceful response is simplicity —
            the mountain does not need decoration to be a mountain. The question
            this hexagram asks is whether the form you are adding genuinely serves
            the content, or whether it is covering something that needs to be
            addressed more directly.
          </p>
        </>
      ),
    },
  ],
  23: [
    {
      heading: "What Hexagram 23 describes",
      content: (
        <>
          <p>
            Hexagram 23, Bo (剥), places Mountain above Earth — but the structure
            is precarious. Five yin lines have risen from the bottom of the
            hexagram, leaving a single yang line isolated at the top. In the{" "}
            <cite>I Ching</cite>, this image describes a period of erosion: the
            solid is being undermined, support is withdrawing, and the conditions
            that once sustained a situation are no longer present. The classical
            Judgment reads: "when structure erodes, preserve what is essential."
          </p>
          <p>
            The hexagram is associated with the ninth month in the classical
            calendar — late autumn, when the last of the yang energy is retreating
            before winter. This is not a permanent condition; the{" "}
            <cite>King Wen sequence</cite> places Hexagram 24 (Return) immediately
            after, because the cycle always turns. But the turning requires
            patience, not forced action.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A mountain rests on earth; strengthen foundations
            quietly." The <cite>I Ching</cite> commentary on this hexagram is
            unusually direct: those above can only maintain their position by
            being genuinely generous to those below. A mountain that has no
            support from the earth beneath it will fall. The practical lesson is
            that during a period of erosion, the work is not to push forward but
            to tend to the relationships and foundations that will matter when
            conditions improve.
          </p>
          <p>
            The hexagram also asks for honest assessment. Splitting apart is
            sometimes the result of external conditions, but it is sometimes the
            result of neglected foundations — relationships not tended, structures
            not maintained, warnings not heeded. The <cite>I Ching</cite> does
            not assign blame, but it does ask for clear-eyed recognition of what
            has actually happened.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 23 often appears when a project, role,
            or organization is losing coherence — when the support structures that
            made something work are quietly withdrawing. The hexagram does not
            advise dramatic action to reverse the erosion; it advises identifying
            what is genuinely worth preserving and focusing energy there rather
            than trying to hold everything together at once.
          </p>
          <p>
            In relationship contexts, it can describe a period when the
            foundations of a connection have been weakened — through neglect,
            accumulated resentment, or changed circumstances. The classical advice
            applies: tend to what is essential, do not force premature resolution,
            and allow the cycle to turn rather than demanding immediate repair.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 23 is not saying that everything is lost or that the
            situation cannot recover. The single yang line at the top of the
            hexagram is still present — the essential quality has not disappeared,
            only been reduced. The <cite>I Ching</cite> places Return immediately
            after Splitting Apart precisely because the cycle does turn, and the
            seed of renewal is already present in the moment of greatest erosion.
          </p>
          <p>
            It is also not advising passivity in the face of genuine injustice or
            harm. Preserving what is essential sometimes requires active
            protection, not just quiet waiting. The distinction is between
            protecting what genuinely matters and exhausting yourself trying to
            prevent every aspect of a natural cycle from completing itself.
          </p>
        </>
      ),
    },
  ],
  26: [
    {
      heading: "What Hexagram 26 describes",
      content: (
        <>
          <p>
            Hexagram 26, Da Chu (大畜), places Heaven inside the Mountain — the
            strongest creative force contained within the most solid and immovable
            structure. In the <cite>I Ching</cite>, this image describes the
            accumulation of great power through restraint: not suppression, but
            the deliberate holding of force until it has been fully developed and
            the moment for its release is right. The classical Judgment reads:
            "strong power must be stored, trained, and directed."
          </p>
          <p>
            The hexagram is paired with Hexagram 9 (Small Taming) earlier in the{" "}
            <cite>King Wen sequence</cite>. Where Small Taming describes minor
            restraints on a large force, Great Taming describes the full
            containment and cultivation of something genuinely powerful. The
            difference is scale and depth: this is not a temporary pause but a
            sustained period of development.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven within the mountain; cultivate depth before
            release." The <cite>I Ching</cite> commentary describes how the wise
            person in this situation studies the words and deeds of those who came
            before — not to imitate them, but to absorb their experience and
            build a foundation of genuine understanding. The practical lesson is
            that great capability requires great preparation, and the preparation
            is not wasted time but the source of the eventual power.
          </p>
          <p>
            The hexagram also describes the value of not eating at home — of
            going out into the world, engaging with difficulty, and testing
            accumulated strength against real conditions. Cultivation that never
            meets resistance remains theoretical.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 26 often appears during a period of
            intensive development — deep study, apprenticeship, or a role that
            builds foundational capability without yet offering full expression.
            The hexagram validates this phase and asks for patience with it. The
            mountain does not release what it contains until the conditions are
            right; forcing early release produces less than waiting for the
            proper moment.
          </p>
          <p>
            In creative or intellectual contexts, it describes the long
            preparation that precedes a major work — the years of reading,
            practice, and accumulated experience that make a breakthrough possible.
            The breakthrough is real, but it is the product of the containment,
            not a substitute for it.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 26 is not telling you to remain permanently in preparation
            mode or to use cultivation as a way of avoiding the risk of action.
            Heaven inside the mountain is building pressure — it will eventually
            need to be released. The <cite>I Ching</cite> places Hexagram 27
            (Nourishment) immediately after, suggesting that the accumulated
            strength must eventually be used to nourish something beyond itself.
          </p>
          <p>
            It is also not saying that your current capabilities are insufficient.
            Great Taming describes a situation where real strength exists and is
            being deepened — not a situation of inadequacy. The work is
            refinement and timing, not remediation.
          </p>
        </>
      ),
    },
  ],
  27: [
    {
      heading: "What Hexagram 27 describes",
      content: (
        <>
          <p>
            Hexagram 27, Yi (颐), places Thunder below Mountain — movement at the
            base, stillness above, forming the image of an open mouth. In the{" "}
            <cite>I Ching</cite>, this hexagram asks two questions simultaneously:
            what are you nourishing yourself with, and what are you nourishing
            others with? The classical Judgment reads: "watch what you feed and
            what feeds you."
          </p>
          <p>
            The hexagram operates on multiple levels. Physically, it concerns
            food and the body. Intellectually, it concerns what ideas and
            information you take in. Socially, it concerns what you say and how
            your words nourish or deplete the people around you. The{" "}
            <cite>I Ching</cite> treats all of these as aspects of the same
            question: the quality of what passes through you shapes who you
            become.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder below the mountain; speech and intake shape
            character." The <cite>I Ching</cite> commentary is specific: be
            careful about what you say, and be moderate in what you eat and drink.
            This is not moralism — it is a practical observation that the habits
            of intake and output accumulate into character over time. What you
            consume regularly becomes part of how you think; what you say
            regularly becomes part of how others experience you.
          </p>
          <p>
            The hexagram also asks about the source of nourishment. Seeking
            nourishment from the right place — from genuine substance rather than
            from what merely looks satisfying — is the classical standard. The
            wrong kind of nourishment depletes even as it appears to fill.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 27 often appears when someone is
            depleted — working in an environment that takes more than it gives, or
            consuming information and stimulation without genuine nourishment. The
            hexagram asks what is actually sustaining you and whether the sources
            of nourishment in your current situation are adequate for what you are
            being asked to produce.
          </p>
          <p>
            In communication contexts, it describes the responsibility of someone
            whose words reach many people. What you put into the world through
            speech, writing, or teaching nourishes or depletes those who receive
            it. The hexagram asks whether what you are producing is genuinely
            useful to others or merely satisfying to produce.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 27 is not prescribing a specific diet or a specific
            information regimen. The <cite>I Ching</cite> does not specify what
            the right nourishment is — it asks you to pay attention to the
            question. What genuinely sustains you is something you have to
            discover through honest observation of your own experience, not
            through following a formula.
          </p>
          <p>
            It is also not saying that all pleasure is suspect or that enjoyment
            is a form of weakness. The hexagram is about quality and attention,
            not about deprivation. The mouth that opens in the image is meant to
            be filled — the question is with what, and whether what fills it
            actually nourishes.
          </p>
        </>
      ),
    },
  ],
  28: [
    {
      heading: "What Hexagram 28 describes",
      content: (
        <>
          <p>
            Hexagram 28, Da Guo (大过), places Lake above Wind — water rising
            above the wood that would normally contain it, the image of a ridgepole
            sagging under excessive weight. In the <cite>I Ching</cite>, this
            hexagram describes a situation of genuine structural overload: the
            middle is too heavy, the ends are too weak, and the ordinary supports
            are no longer adequate. The classical Judgment reads: "a heavy load
            asks for transition, not denial."
          </p>
          <p>
            The hexagram is notable for the quality of response it describes. When
            the load is genuinely extraordinary, the <cite>I Ching</cite> does not
            advise ordinary caution — it describes figures who act with unusual
            independence and accept unusual consequences. The sage who stands alone
            in floodwaters without fear is the classical image of the appropriate
            response to great exceeding.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake rises above wood; reinforce what is under
            strain." The practical lesson operates on two levels. First: honestly
            assess whether the strain is real. Not every difficulty is a great
            exceeding — sometimes what feels like structural overload is actually
            manageable with ordinary adjustments. Second: if the strain is
            genuinely extraordinary, respond with extraordinary measures rather
            than pretending ordinary ones will suffice.
          </p>
          <p>
            The <cite>I Ching</cite> commentary on this hexagram describes the
            wise person as someone who can stand alone without support and
            withdraw from the world without distress — not because isolation is
            desirable, but because the situation requires a kind of independence
            that ordinary social support cannot provide.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 28 often appears when someone is carrying
            a workload, responsibility, or role that has grown beyond what the
            current structure can support. The hexagram does not advise simply
            working harder — it asks whether the structure itself needs to change.
            Hiring, delegating, restructuring, or stepping back from something
            that cannot be sustained are all responses this hexagram supports.
          </p>
          <p>
            In personal contexts, it can describe a period of exceptional demand —
            caregiving, crisis, or a transition that requires more than ordinary
            reserves. The classical advice is to accept the extraordinary nature
            of the situation and respond accordingly, rather than measuring
            yourself against normal standards during an abnormal period.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 28 is not saying that all strain is a crisis or that every
            difficult period requires a fundamental restructuring. The{" "}
            <cite>I Ching</cite> is specific that this hexagram describes genuine
            overload — the ridgepole that is actually sagging, not just under
            normal load. Treating ordinary difficulty as great exceeding leads to
            unnecessary disruption.
          </p>
          <p>
            It is also not a license for recklessness. The sage who stands in
            floodwaters does so without fear, but also without foolishness — they
            have assessed the situation and chosen their position deliberately.
            Extraordinary action in response to extraordinary circumstances is
            different from impulsive action in response to ordinary discomfort.
          </p>
        </>
      ),
    },
  ],
  31: [
    {
      heading: "What Hexagram 31 describes",
      content: (
        <>
          <p>
            Hexagram 31, Xian (咸), places Lake above Mountain — the yielding
            trigram above the firm, softness resting on solidity. In the{" "}
            <cite>I Ching</cite>, this is the first hexagram of the second half of
            the sequence, and the <cite>King Wen</cite> commentary treats it as
            foundational: just as Heaven and Earth are the basis of the natural
            world, the mutual attraction between people is the basis of human
            society. The classical Judgment reads: "mutual attraction works
            through openness and restraint."
          </p>
          <p>
            The hexagram's name, <em>xian</em>, means "all" or "universal" — the
            sense of a feeling that moves through everything without obstruction.
            The classical image is of genuine courtship: two people responding to
            each other authentically, without calculation or agenda. This kind of
            influence is described as the most powerful precisely because it does
            not force.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake on the mountain; influence comes through
            receptivity." The practical lesson is about the mechanism of genuine
            influence: it works through emptying yourself of fixed agenda and
            becoming genuinely responsive to what is actually present. The{" "}
            <cite>I Ching</cite> commentary describes the sage as someone whose
            mind is like a still lake — it reflects everything accurately because
            it is not disturbed by its own preferences.
          </p>
          <p>
            The restraint mentioned in the Judgment is equally important. Influence
            that overreaches — that tries to affect everything at once or that
            pushes past the natural limit of the connection — loses its quality.
            The lake rests on the mountain; it does not flood it.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or leadership contexts, Hexagram 31 often appears when
            someone is trying to persuade, inspire, or move others and finding
            that their usual approaches are not working. The hexagram asks whether
            the influence attempt is genuinely responsive to what the other person
            needs, or whether it is primarily an expression of what the influencer
            wants. Authentic responsiveness tends to produce more movement than
            well-crafted pressure.
          </p>
          <p>
            In relationship contexts, it describes the quality of genuine
            attraction — the kind that does not need to manufacture itself or
            sustain itself through effort. When this quality is present, the
            hexagram supports acting on it. When it is absent, no amount of
            technique will substitute for it.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 31 is not saying that all attraction is trustworthy or that
            every feeling of connection should be acted upon without discernment.
            The <cite>I Ching</cite> places this hexagram at the opening of the
            second half of the sequence precisely because it describes a
            foundational human experience — but foundational experiences can be
            misread or manipulated. Genuine influence requires both openness and
            the judgment to know what is worth responding to.
          </p>
          <p>
            It is also not saying that influence requires passivity. Receptivity
            is an active quality — it takes real attention and real presence to
            respond accurately to what is actually there. The still lake is not
            an empty lake; it is a lake that is fully present to what it reflects.
          </p>
        </>
      ),
    },
  ],
  32: [
    {
      heading: "What Hexagram 32 describes",
      content: (
        <>
          <p>
            Hexagram 32, Heng (恒), places Thunder above Wind — two moving forces
            paired together, each reinforcing the other's momentum. In the{" "}
            <cite>I Ching</cite>, this image describes duration as an active
            quality: not the stillness of a stone, but the continuous movement of
            the sun and moon through their cycles, the four seasons through their
            sequence. The classical Judgment reads: "consistency creates trust
            when it can adapt without breaking."
          </p>
          <p>
            The hexagram follows Hexagram 31 (Influence) in the{" "}
            <cite>King Wen sequence</cite> deliberately: attraction and connection
            are the beginning, but duration is what makes them real over time.
            What endures is not what never changes — it is what maintains its
            essential direction through change.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder and wind endure together; stay steady in
            motion." The <cite>I Ching</cite> commentary describes the wise person
            as someone who stands firm in their direction without being rigid about
            the path. The practical lesson is the difference between commitment to
            a purpose and attachment to a specific form: the former endures, the
            latter breaks.
          </p>
          <p>
            The hexagram also asks about the quality of what is being sustained.
            Duration is only favorable when what endures is genuinely worth
            sustaining. Persisting in a direction that has become wrong is not
            duration in the classical sense — it is stubbornness. The{" "}
            <cite>I Ching</cite> asks you to examine whether what you are
            maintaining is still aligned with what you actually value.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 32 often appears when someone is
            questioning whether to continue with a long-term commitment — a
            career path, a project, a relationship with an organization. The
            hexagram asks two questions: is the direction still right, and is the
            way you are sustaining it genuinely adaptive or merely habitual?
            Continuing because it is familiar is different from continuing because
            it is still the right direction.
          </p>
          <p>
            In relationship contexts, it describes the quality that makes
            long-term connection possible: not the absence of change, but the
            presence of a shared direction that both people continue to choose.
            Duration in a relationship is renewed through ongoing commitment, not
            assumed from past commitment.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 32 is not telling you to persist regardless of circumstances
            or to treat endurance as a virtue independent of what is being
            endured. The <cite>I Ching</cite> is clear that duration requires
            ongoing assessment — the sun and moon endure because they follow their
            natural course, not because they refuse to move. Enduring in a
            direction that has become genuinely wrong is not what this hexagram
            describes.
          </p>
          <p>
            It is also not saying that change is a failure of duration. Thunder
            and wind both move — they do not stand still. The consistency this
            hexagram describes is consistency of direction and character, not
            consistency of form. Adapting how you pursue a genuine commitment is
            part of what makes the commitment durable.
          </p>
        </>
      ),
    },
  ],
  33: [
    {
      heading: "What Hexagram 33 describes",
      content: (
        <>
          <p>
            Hexagram 33, Dun (遁), places Heaven above Mountain — the sky moving
            upward, away from the rising ground below. In the <cite>I Ching</cite>,
            this image describes a moment when the conditions have shifted and the
            correct response is to withdraw rather than to hold or advance. The
            classical Judgment reads: "strategic withdrawal protects long-term
            strength."
          </p>
          <p>
            The hexagram is associated with the sixth month in the classical
            calendar — the point when yin energy begins to grow again after the
            summer solstice. Two yin lines have risen from the bottom of the
            hexagram, and the four yang lines above are retreating. This is not a
            rout; it is a deliberate, orderly withdrawal before the balance shifts
            further.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Heaven above the mountain; step back without
            resentment." The <cite>I Ching</cite> commentary emphasizes the
            quality of the retreat: it must be timely, orderly, and free from
            bitterness. A retreat made too late, or made with resentment and
            recrimination, loses the benefit that strategic withdrawal is meant to
            provide. The practical lesson is to recognize the moment early and
            move cleanly.
          </p>
          <p>
            The hexagram also distinguishes between different kinds of retreat.
            Retreating to a position of genuine independence and strength is
            favorable. Retreating into entanglement — maintaining connections that
            drain rather than support — is not. The <cite>I Ching</cite> asks
            whether the withdrawal is genuinely clean or whether it is partial and
            therefore ineffective.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 33 often appears when someone is in a
            role, organization, or project that has become genuinely untenable —
            where the conditions have shifted against them and continued engagement
            is producing diminishing returns at increasing cost. The hexagram
            supports leaving, but asks for a clean and timely exit rather than a
            prolonged, resentful withdrawal.
          </p>
          <p>
            In relationship or social contexts, it can describe the need to
            withdraw from a dynamic that has become draining or harmful. The
            classical emphasis on doing this without resentment is practically
            important: a withdrawal made in anger tends to create new entanglements
            rather than genuine freedom.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 33 is not telling you to avoid all difficulty or to retreat
            at the first sign of resistance. The <cite>I Ching</cite> has many
            hexagrams that describe persisting through difficulty — Hexagram 29
            (The Abysmal), Hexagram 47 (Oppression), and others. Retreat is
            appropriate when the conditions have genuinely shifted against you,
            not when the situation is simply hard.
          </p>
          <p>
            It is also not a permanent condition. Heaven retreats above the
            mountain, but it does not disappear. The strength preserved through
            strategic withdrawal is available for a future moment when conditions
            are more favorable. Retreat in the <cite>I Ching</cite> is always
            preparation for eventual return, not permanent withdrawal from
            engagement.
          </p>
        </>
      ),
    },
  ],
  34: [
    {
      heading: "What Hexagram 34 describes",
      content: (
        <>
          <p>
            Hexagram 34, Da Zhuang (大壮), places Thunder above Heaven — the most
            active trigram above the most creative, producing an image of force at
            its maximum. In the <cite>I Ching</cite>, four yang lines have risen
            from the bottom, pushing the two remaining yin lines upward. The
            momentum is real and substantial. The classical Judgment reads: "power
            succeeds when governed by proportion."
          </p>
          <p>
            The hexagram is not a warning against strength — it is a warning
            against strength that has become untethered from what is right. The{" "}
            <cite>I Ching</cite> is explicit: great power that follows correct
            principles is genuinely favorable. Great power that simply follows its
            own momentum, without asking whether the direction is right, tends to
            create the problems it was meant to solve.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder in heaven; strength must follow what is
            right." The classical image of the ram charging the fence is
            instructive: the ram has real power, and it may break through — but
            if it charges without assessing the fence, it may also become caught
            in it. The practical lesson is that the availability of force does not
            determine whether using it is wise.
          </p>
          <p>
            The <cite>I Ching</cite> commentary describes the wise person in this
            situation as someone who does not tread paths that are not correct —
            not because they lack the power to force their way, but because they
            understand that power used without principle exhausts itself and
            creates resistance that compounds over time.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or leadership contexts, Hexagram 34 often appears when
            someone has accumulated significant influence, resources, or momentum
            and is deciding how to use it. The hexagram supports bold action but
            asks whether the direction is genuinely right — not just achievable.
            Using a position of strength to force an outcome that is not actually
            correct tends to produce short-term results and long-term costs.
          </p>
          <p>
            In negotiation or conflict contexts, it describes a moment when you
            have the leverage to impose a resolution. The hexagram asks whether
            imposing it is the right move, or whether the strength available to
            you is better used to create conditions for a genuinely better outcome
            than the one you could force.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 34 is not telling you to be timid or to hold back strength
            that is genuinely needed. The <cite>I Ching</cite> treats great power
            as favorable when it is correctly directed — the hexagram is not a
            caution against action but a caution against action that has lost its
            connection to what is right. Bold, well-directed strength is exactly
            what this hexagram describes at its best.
          </p>
          <p>
            It is also not saying that every use of power requires elaborate
            justification. Sometimes the right action is obvious and the strength
            to take it is simply what is needed. The question the hexagram asks is
            not "can you justify this?" but "is this actually right?" — a
            simpler and more demanding standard.
          </p>
        </>
      ),
    },
  ],
  35: [
    {
      heading: "What Hexagram 35 describes",
      content: (
        <>
          <p>
            Hexagram 35, Jin (晋), places Fire above Earth — the sun rising over
            the land, its light spreading outward and upward. In the{" "}
            <cite>I Ching</cite>, this image describes a moment of genuine
            advancement: conditions are open, recognition is available, and
            movement forward is both possible and welcomed. The classical Judgment
            reads: "visibility increases when support and clarity align."
          </p>
          <p>
            The hexagram follows Hexagram 34 (Great Power) in the{" "}
            <cite>King Wen sequence</cite> deliberately: power that is correctly
            directed naturally produces progress. The advancement described here
            is not forced — it is the natural result of alignment between
            capability, timing, and the openness of the situation.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "The sun rises over earth; advance with generosity."
            The sun does not advance by pushing — it advances by illuminating.
            The practical lesson is that genuine progress in this hexagram comes
            through clarity and generosity rather than through force or
            self-promotion. The <cite>I Ching</cite> commentary describes the
            ideal response as brightening one's own virtue — making what is
            genuinely good more visible, rather than manufacturing an appearance
            of advancement.
          </p>
          <p>
            The classical image of receiving horses and multiple audiences in a
            single day suggests rapid movement — but movement that is welcomed
            rather than imposed. Progress that others support tends to be more
            durable than progress that others merely tolerate.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 35 often appears when someone is in a
            period of genuine opportunity — a favorable environment, a supportive
            relationship with decision-makers, or a moment when their work is
            being recognized. The hexagram supports moving forward actively and
            asks for the generosity to share credit and illuminate others as you
            advance, rather than treating the favorable conditions as a private
            resource.
          </p>
          <p>
            In creative or public contexts, it describes a moment when work is
            ready to be seen and the conditions for sharing it are favorable. The
            sun rises — it does not wait for a perfect moment that never comes.
            Advancing when conditions are genuinely open is the appropriate
            response to this hexagram.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 35 is not a guarantee that all advancement will be welcomed
            or that favorable conditions will last indefinitely. The sun rises and
            also sets — the <cite>I Ching</cite> places Hexagram 36 (Darkening of
            the Light) immediately after Progress precisely because peak visibility
            is followed by a period of concealment. Using a period of progress
            well means building something durable, not assuming the conditions
            will continue.
          </p>
          <p>
            It is also not saying that advancement requires external validation.
            The sun illuminates regardless of whether anyone is watching. If the
            conditions for recognized progress are not present, the hexagram's
            instruction to brighten one's own virtue still applies — the work of
            genuine development continues independent of whether it is currently
            being seen.
          </p>
        </>
      ),
    },
  ],
  37: [
    {
      heading: "What Hexagram 37 describes",
      content: (
        <>
          <p>
            Hexagram 37, Jia Ren (家人), places Wind above Fire — warmth rising
            and generating outward movement. In the <cite>I Ching</cite>, this
            image describes the household as a microcosm of all social order: the
            patterns established within a family or close group become the
            patterns that extend outward into the world. The classical Judgment
            reads: "healthy order begins with roles, care, and example."
          </p>
          <p>
            The hexagram is not primarily about family in the narrow sense — it
            is about any close-knit group that functions as a unit. Teams,
            partnerships, and small organizations all exhibit the dynamics this
            hexagram describes. The classical emphasis is on the quality of the
            internal structure: clear responsibilities, genuine mutual care, and
            leadership that teaches through example rather than through command.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind comes from fire; words and conduct shape the
            home." The <cite>I Ching</cite> commentary is specific: the words of
            the person in authority must have substance behind them, and their
            conduct must be consistent with what they say. Wind that comes from
            fire is warm and genuine; wind without fire is empty movement. The
            practical lesson is that the influence of a leader or parent is
            carried primarily through example, not through instruction.
          </p>
          <p>
            The hexagram also asks about the clarity of roles. Not because rigid
            hierarchy is inherently good, but because ambiguity about
            responsibility tends to produce either conflict or neglect. Clear
            roles, held with genuine care rather than with rigidity, create the
            conditions for the group to function well.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In leadership or management contexts, Hexagram 37 often appears when
            a team or organization is experiencing internal friction. The hexagram
            asks whether the source of the friction is unclear roles, inconsistent
            leadership, or a gap between stated values and actual conduct. Fixing
            the surface symptoms without addressing the underlying structural
            issue tends to produce temporary relief and recurring problems.
          </p>
          <p>
            In personal contexts, it can describe the work of examining whether
            your own conduct is consistent with what you say you value. The fire
            that generates the wind must be genuine — warmth that is performed
            rather than felt does not produce the same quality of movement.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 37 is not prescribing a specific family structure or
            organizational hierarchy as universally correct. The{" "}
            <cite>I Ching</cite> describes principles — clear roles, genuine care,
            consistent example — that apply across different structures. The
            specific form those principles take in a given context is a matter of
            judgment, not of fixed prescription.
          </p>
          <p>
            It is also not saying that all existing family or organizational
            structures deserve to be maintained. The hexagram asks whether the
            structure is genuinely healthy — whether it produces the warmth and
            clarity that the image describes. A structure that produces neither
            is not what this hexagram is defending.
          </p>
        </>
      ),
    },
  ],
  38: [
    {
      heading: "What Hexagram 38 describes",
      content: (
        <>
          <p>
            Hexagram 38, Kui (睽), places Fire above the Lake — fire moves upward,
            water moves downward, and the two naturally diverge. In the{" "}
            <cite>I Ching</cite>, this image describes genuine opposition: not
            conflict that can be resolved through better communication, but
            difference that is real and structural. The classical Judgment reads:
            "difference can clarify, but do not force unity too soon."
          </p>
          <p>
            The hexagram is notable for its nuance. It does not describe
            opposition as simply bad — it describes it as a condition that has
            its own appropriate uses. Heaven and earth are different, yet they
            produce all things together. Man and woman are different, yet their
            union creates new life. The{" "}
            <cite>I Ching</cite> treats difference as generative when it is
            acknowledged honestly rather than suppressed or forced into false
            unity.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire above the lake; honor distinct positions." The
            practical lesson is about the difference between productive difference
            and destructive conflict. Productive difference — two perspectives
            that genuinely illuminate different aspects of a situation — is
            valuable. Destructive conflict — two positions that cannot coexist and
            are fighting for dominance — is not. The{" "}
            <cite>I Ching</cite> asks which kind of opposition you are actually
            dealing with.
          </p>
          <p>
            The classical advice for small matters is favorable even in a context
            of opposition. This is a practical observation: even when fundamental
            alignment is absent, specific, limited cooperation is often still
            possible. Working within the scope of what can actually be shared,
            rather than demanding full agreement, is the move this hexagram
            supports.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 38 often appears when
            two people or groups have genuinely different values or directions and
            are trying to work together anyway. The hexagram does not advise
            forcing a resolution — it advises identifying what can actually be
            shared and working within that scope, while being honest about where
            the difference is real and cannot be bridged.
          </p>
          <p>
            In relationship contexts, it can describe a moment when two people
            recognize that they see something fundamentally differently. The
            classical teaching is not to immediately end the relationship or to
            pretend the difference does not exist, but to assess honestly whether
            the difference is in an area that matters for what the relationship
            needs to be.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 38 is not saying that all opposition is productive or that
            difference should always be preserved. The <cite>I Ching</cite> places
            Hexagram 39 (Obstruction) immediately after Opposition, suggesting
            that unresolved difference can become a genuine obstacle. The question
            is whether the difference is generative — producing clarity and
            complementarity — or simply blocking.
          </p>
          <p>
            It is also not advising permanent separation. Fire and water are
            different, but they can coexist and even cooperate within appropriate
            structures. The hexagram asks for honest assessment of what is
            actually possible, not for a predetermined conclusion about whether
            the opposition can be worked with.
          </p>
        </>
      ),
    },
  ],
  39: [
    {
      heading: "What Hexagram 39 describes",
      content: (
        <>
          <p>
            Hexagram 39, Jian (蹇), places Water above Mountain — danger in front
            and difficult terrain behind. In the <cite>I Ching</cite>, this image
            describes a genuine obstruction: not a minor inconvenience that can be
            pushed through, but a situation where the direct path is blocked and
            the usual approaches are not working. The classical Judgment reads:
            "when blocked, seek help and choose a wiser route."
          </p>
          <p>
            The hexagram is associated with the southwest in classical geography —
            the direction of open plains and allies — and the northeast — the
            direction of mountains and difficulty. The practical implication is
            that moving toward what is open and supportive is more productive than
            continuing to push against what is closed and resistant.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water on the mountain; turn inward and prepare." The{" "}
            <cite>I Ching</cite> commentary describes the wise person in this
            situation as someone who uses the period of obstruction to examine
            their own conduct and cultivate their virtue — not as a consolation
            prize, but as the actual work that makes eventual progress possible.
            Obstructions often reveal something about the approach that needs to
            change before the path can open.
          </p>
          <p>
            The emphasis on seeking help is equally important. The{" "}
            <cite>I Ching</cite> is explicit that going alone into obstruction
            produces more difficulty, while going with the right allies produces
            praise. This is not a call for dependence but for the honest
            recognition that some obstacles require more than individual effort
            to navigate.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 39 often appears when a project has
            stalled, a proposal has been rejected, or a path that seemed clear
            has become blocked. The hexagram does not advise simply trying harder
            — it asks whether the approach itself needs to change, and whether
            there are people or resources that could help navigate the obstacle
            that have not yet been engaged.
          </p>
          <p>
            In personal contexts, it can describe a period when progress in an
            important area has stopped and the usual strategies are not producing
            movement. The classical advice to turn inward is practically useful:
            what is the obstruction actually revealing about what needs to change
            before the path can open?
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 39 is not saying that the situation is hopeless or that the
            obstruction is permanent. The <cite>I Ching</cite> places Hexagram 40
            (Deliverance) immediately after Obstruction — the release follows the
            blockage. The period of being blocked, used well, creates the
            conditions for the release to be genuine rather than superficial.
          </p>
          <p>
            It is also not advising permanent retreat or the abandonment of the
            goal. The mountain with water above it is still a mountain — the
            terrain is difficult, not impassable. The question is whether you are
            approaching it in the right way, with the right support, at the right
            time.
          </p>
        </>
      ),
    },
  ],
  41: [
    {
      heading: "What Hexagram 41 describes",
      content: (
        <>
          <p>
            Hexagram 41, Sun (损), places the Lake below the Mountain — the lower
            trigram reduced, the upper strengthened. In the <cite>I Ching</cite>,
            this image describes a moment of voluntary decrease: something is
            given up at the lower level in order to support what is above. The
            classical Judgment reads: "reduce excess to restore right proportion."
          </p>
          <p>
            The hexagram is paired with Hexagram 42 (Increase) in the{" "}
            <cite>King Wen sequence</cite>, and the two are understood as a cycle:
            decrease precedes increase, and increase eventually requires decrease
            again. The <cite>I Ching</cite> treats this not as a problem but as
            the natural rhythm of any living system. The question is not whether
            decrease will come, but whether it is approached with sincerity or
            with resentment.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake below the mountain; simplicity strengthens
            sincerity." The <cite>I Ching</cite> commentary on this hexagram
            makes a careful point: even a small offering made with genuine
            sincerity is more valuable than a large offering made without it. The
            practical lesson is that the quality of the decrease matters more than
            its quantity. Giving up something small with full sincerity produces
            more than giving up something large with resentment.
          </p>
          <p>
            The hexagram also asks about the target of the decrease. Reducing
            what is genuinely excessive — anger, indulgence, unnecessary
            complexity — strengthens the whole. Reducing what is actually
            necessary produces a different kind of imbalance. The discernment
            required is about what is truly excess and what is genuinely needed.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 41 often appears when
            resources are constrained and choices must be made about what to
            reduce. The hexagram supports making those reductions deliberately and
            sincerely rather than reactively. Cutting what is genuinely excess
            while protecting what is genuinely essential is the move this hexagram
            describes.
          </p>
          <p>
            In personal contexts, it can describe a period of voluntary
            simplification — reducing commitments, possessions, or habits that
            have accumulated beyond what is actually useful. The classical
            emphasis on sincerity applies: decrease that comes from genuine
            recognition of what is excess feels different from decrease that is
            imposed or resented.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 41 is not saying that decrease is always good or that
            austerity is a virtue in itself. The <cite>I Ching</cite> is clear
            that decrease must be appropriate to the situation — reducing what is
            genuinely excess, not reducing what is genuinely needed. Decrease that
            goes too far produces a different kind of imbalance than the one it
            was meant to correct.
          </p>
          <p>
            It is also not a permanent condition. The cycle of decrease and
            increase is continuous — Hexagram 42 follows immediately. The decrease
            described here is a phase that creates the conditions for genuine
            growth, not a permanent state of reduction.
          </p>
        </>
      ),
    },
  ],
  42: [
    {
      heading: "What Hexagram 42 describes",
      content: (
        <>
          <p>
            Hexagram 42, Yi (益), places Wind above Thunder — two active forces
            reinforcing each other, each amplifying the other's momentum. In the{" "}
            <cite>I Ching</cite>, this image describes a period of genuine
            increase: effort produces more than usual return, conditions are
            favorable, and the capacity to grow and to help others grow
            simultaneously is present. The classical Judgment reads: "growth is
            favorable when it benefits more than the self."
          </p>
          <p>
            The hexagram is paired with Hexagram 41 (Decrease) and understood as
            its complement. Where decrease asks for voluntary simplification,
            increase asks for generous expansion. The{" "}
            <cite>King Wen sequence</cite> treats the two as a continuous cycle:
            the sincerity developed through decrease creates the quality of
            character that makes increase genuinely beneficial rather than merely
            accumulative.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind and thunder increase; move toward useful
            action." The <cite>I Ching</cite> commentary on this hexagram
            describes the wise person as someone who, upon seeing good in others,
            moves toward it and emulates it; upon seeing their own faults, corrects
            them. The practical lesson is that a period of increase is best used
            not just for accumulation but for genuine development — of capability,
            of character, and of the relationships that make growth sustainable.
          </p>
          <p>
            The hexagram also supports crossing great rivers — taking on
            significant challenges during a period of favorable conditions. The
            wind and thunder together create more than either alone; the moment
            of increase is the moment to attempt what would be too difficult under
            ordinary conditions.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 42 often appears during a period of
            genuine momentum — a successful project, a favorable market, or a
            relationship with a mentor or sponsor that is producing real
            opportunity. The hexagram supports moving forward actively and asks
            for the generosity to share the growth: investing in others, building
            durable structures, and using the favorable period to create something
            that will outlast the conditions that produced it.
          </p>
          <p>
            In decision contexts, it describes a moment when the risk-reward ratio
            is genuinely favorable — when attempting something significant is more
            likely to succeed than usual. The classical support for crossing great
            rivers applies: this is the time to take on the challenge you have
            been preparing for.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 42 is not a guarantee that all growth will continue
            indefinitely or that favorable conditions are permanent. The cycle of
            increase and decrease is continuous — the <cite>I Ching</cite> places
            Hexagram 43 (Breakthrough) after Increase, suggesting that the energy
            of growth eventually reaches a point where it must be expressed or
            released decisively. Using a period of increase to build something
            durable is wiser than assuming the conditions will last.
          </p>
          <p>
            It is also not saying that all increase is beneficial. Growth that
            benefits only the self at the expense of others is not what this
            hexagram describes — the classical emphasis on outward benefit is not
            decorative. Increase that flows outward creates the conditions for
            continued growth; increase that is hoarded tends to produce the
            conditions for its own reversal.
          </p>
        </>
      ),
    },
  ],
  43: [
    {
      heading: "What Hexagram 43 describes",
      content: (
        <>
          <p>
            Hexagram 43, Guai (夬), places the Lake above Heaven — water risen
            above the sky, five yang lines pressing against a single yin line at
            the top. In the <cite>I Ching</cite>, this image describes a moment
            of decisive breakthrough: the accumulated force of what is correct
            finally confronting what has been wrong or unresolved. The classical
            Judgment reads: "state the truth clearly without aggression."
          </p>
          <p>
            The hexagram is notable for the precision of its classical
            instructions. The breakthrough must be announced in the king's court
            — in the appropriate public forum, not in private. It must be
            conducted with sincerity and a sense of danger, not with triumphalism.
            And it must not rely on force alone: the <cite>I Ching</cite> is
            explicit that armed confrontation without moral clarity tends to
            produce new problems rather than genuine resolution.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake rises to heaven; declare what must change."
            The practical lesson is about the conditions for a genuine
            breakthrough rather than a pyrrhic victory. The single yin line at
            the top of the hexagram is still present — the situation is not yet
            fully resolved, and overconfidence at this moment is specifically
            warned against. The <cite>I Ching</cite> asks for the combination of
            decisiveness and continued vigilance.
          </p>
          <p>
            The emphasis on the right forum is practically important. A truth
            stated in the wrong context — too privately to have effect, or too
            publicly to allow for genuine response — does not produce the
            breakthrough the hexagram describes. The court is the place where
            declarations carry weight and where accountability is possible.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 43 often appears when
            something that has been tolerated — a dysfunctional dynamic, an
            unaddressed problem, a decision that has been deferred — has reached
            the point where it must be resolved. The hexagram supports taking
            clear action but asks for the right approach: direct, honest, in the
            appropriate forum, and without the kind of aggression that turns a
            necessary confrontation into a destructive one.
          </p>
          <p>
            In personal contexts, it can describe the moment when something that
            has been left unsaid must finally be said — a boundary that must be
            stated, a truth that must be acknowledged, a decision that can no
            longer be avoided. The classical emphasis on sincerity over force
            applies: the goal is resolution, not victory.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 43 is not a license for aggression or for using a position
            of strength to humiliate or destroy. The <cite>I Ching</cite> is
            explicit that the breakthrough must be conducted with a sense of
            danger — an awareness that even five yang lines pressing against one
            yin line can produce a bad outcome if the approach is wrong. The
            single remaining yin line is not to be underestimated.
          </p>
          <p>
            It is also not saying that every unresolved situation requires this
            kind of decisive confrontation. The <cite>I Ching</cite> has many
            hexagrams that describe patience, gradual influence, and strategic
            withdrawal. Hexagram 43 applies specifically to situations where the
            accumulated pressure has reached the point where declaration is
            necessary — not to every situation where something is imperfect.
          </p>
        </>
      ),
    },
  ],
  44: [
    {
      heading: "What Hexagram 44 describes",
      content: (
        <>
          <p>
            Hexagram 44, Gou (姤), places Wind below Heaven — a single yin line
            at the base of five yang lines, movement arising beneath the most
            expansive force. In the <cite>I Ching</cite>, this image describes an
            unexpected encounter: something arrives without being invited, and its
            significance is not immediately obvious. The classical Judgment reads:
            "an unexpected influence needs careful boundaries."
          </p>
          <p>
            The hexagram is the structural opposite of Hexagram 43 (Breakthrough):
            where Breakthrough shows five yang lines pressing against one yin,
            Coming to Meet shows one yin line beginning to rise beneath five yang.
            The <cite>King Wen sequence</cite> places them together to show the
            cycle: after a decisive resolution, something new and unexpected
            begins to enter.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind under heaven; encounters can be powerful." The{" "}
            <cite>I Ching</cite> commentary describes the prince as someone who
            issues commands and makes them known throughout the four quarters —
            the image of someone who sets clear terms for how encounters will be
            conducted rather than simply reacting to whatever arrives. The
            practical lesson is that the quality of an unexpected encounter is
            shaped significantly by the clarity of the boundaries you bring to it.
          </p>
          <p>
            The classical warning about the single yin line is not a warning
            against all new influences — it is a warning against allowing
            something that has not yet been assessed to gradually displace what
            has been carefully built. Early recognition and clear boundaries are
            more effective than either rejection or uncritical acceptance.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 44 often appears when an unexpected
            opportunity, offer, or person enters the situation. The hexagram does
            not advise automatic rejection — wind under heaven can carry something
            genuinely valuable. It asks for honest assessment: what is this
            actually, what does engaging with it require, and what boundaries are
            needed to ensure that the encounter serves your actual direction rather
            than gradually redirecting it?
          </p>
          <p>
            In relationship contexts, it can describe the arrival of someone or
            something that was not sought but that carries real attraction or
            significance. The classical emphasis on boundaries is practically
            important: the most powerful encounters are often the ones that arrive
            without announcement, and they require more discernment, not less,
            precisely because of their power.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 44 is not saying that all unexpected encounters are
            dangerous or that new influences should be automatically rejected. The{" "}
            <cite>I Ching</cite> treats wind as a carrier of genuine possibility —
            the same trigram that appears in hexagrams of gentle penetration and
            gradual influence. The warning is about the specific dynamic of
            something small gradually displacing something large, not about
            newness itself.
          </p>
          <p>
            It is also not saying that the encounter cannot be engaged with. The
            prince in the image does not hide from the wind — he issues commands
            that shape how it moves through his territory. Engagement with clear
            terms is different from either avoidance or uncritical openness.
          </p>
        </>
      ),
    },
  ],
  45: [
    {
      heading: "What Hexagram 45 describes",
      content: (
        <>
          <p>
            Hexagram 45, Cui (萃), places the Lake above Earth — water gathering
            on the land, pooling into a body larger than any single source. In
            the <cite>I Ching</cite>, this image describes the conditions for
            genuine collective gathering: people or forces coming together around
            a center that is trustworthy enough to hold them. The classical
            Judgment reads: "shared purpose needs a center and a ritual of trust."
          </p>
          <p>
            The hexagram is paired with Hexagram 8 (Holding Together) earlier in
            the sequence, but where Hexagram 8 describes the formation of
            alliance, Hexagram 45 describes the larger gathering — the assembly
            of many around a common purpose. The <cite>King Wen</cite> commentary
            treats this as one of the most significant moments in social life:
            when people genuinely gather, something becomes possible that was not
            possible for any of them alone.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "A lake over earth; gather people through sincerity."
            The <cite>I Ching</cite> commentary on this hexagram emphasizes the
            role of ritual: great offerings, the presence of a great person, and
            the deliberate creation of a shared moment that marks the gathering
            as real. The practical lesson is that genuine assembly requires more
            than proximity — it requires a shared act of commitment that makes
            the gathering visible and binding to those who participate.
          </p>
          <p>
            The hexagram also asks about preparedness for what gathering produces.
            When people come together, unexpected things happen — conflicts arise,
            resources are strained, and the center is tested. The{" "}
            <cite>I Ching</cite> advises preparing for these contingencies rather
            than assuming that the gathering will be smooth simply because the
            intention is good.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 45 often appears when
            someone is convening a team, launching a community, or building a
            coalition around a shared purpose. The hexagram supports the effort
            and asks for the quality of center that can actually hold the
            gathering: clear purpose, genuine trustworthiness, and the ritual
            acts — kickoffs, agreements, shared commitments — that make the
            assembly real rather than merely announced.
          </p>
          <p>
            In community or social contexts, it describes the conditions under
            which people genuinely come together rather than simply occupying the
            same space. The lake does not form without a basin to hold it — the
            gathering requires a structure that gives it shape and depth.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 45 is not saying that all gatherings are beneficial or that
            assembling people around any center is good. The{" "}
            <cite>I Ching</cite> is specific that the center must be genuinely
            trustworthy — a great person, in the classical language, meaning
            someone whose authority is real and whose conduct matches their
            position. A gathering around a weak or corrupt center produces the
            appearance of assembly without its substance.
          </p>
          <p>
            It is also not saying that gathering is always the right move. Some
            situations call for individual action or small-group work rather than
            broad assembly. Hexagram 45 applies specifically to moments when the
            scale of what is needed genuinely requires bringing many together —
            not to every situation where collaboration might be useful.
          </p>
        </>
      ),
    },
  ],
  46: [
    {
      heading: "What Hexagram 46 describes",
      content: (
        <>
          <p>
            Hexagram 46, Sheng (升), places Wind below Earth — wood pressing
            upward through the ground, growing toward the light through patient,
            consistent effort. In the <cite>I Ching</cite>, this image describes
            a period of genuine upward movement that is organic rather than
            forced. The classical Judgment reads: "gradual ascent succeeds through
            steady effort."
          </p>
          <p>
            The hexagram is associated with the south in classical geography —
            the direction of warmth and visibility — and the commentary describes
            the wise person as someone who accumulates small virtues to build
            something high and great. The ascent is real, but it is built from
            many small steps rather than from a single dramatic leap.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wood grows from earth; rise step by step." The{" "}
            <cite>I Ching</cite> commentary describes the wise person as someone
            who accumulates small acts of virtue the way a mountain is built from
            individual stones — each one modest, the accumulation significant. The
            practical lesson is that the quality of the ascent matters as much as
            its speed. Advancement built from genuine capability and consistent
            effort is more durable than advancement achieved through a single
            fortunate moment.
          </p>
          <p>
            The hexagram also supports seeking out those who can help the ascent —
            the classical image includes visiting a great person without anxiety,
            suggesting that asking for guidance or support during a period of
            genuine upward movement is appropriate and will be well received.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 46 often appears during a period of
            steady professional development — building skills, taking on
            increasing responsibility, or moving through a sequence of roles that
            each prepare for the next. The hexagram validates this kind of
            patient, sequential advancement and asks for the discipline to stay
            with it rather than jumping ahead before the foundation is solid.
          </p>
          <p>
            In creative or intellectual contexts, it describes the long process
            of developing genuine mastery — the years of practice and study that
            precede the work that looks effortless from the outside. The tree does
            not apologize for growing slowly; it simply grows.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 46 is not telling you that dramatic advancement is wrong or
            that you must always move slowly. The <cite>I Ching</cite> has
            hexagrams that describe rapid progress (Hexagram 35) and decisive
            breakthrough (Hexagram 43). Pushing Upward describes a specific
            quality of movement — organic, sequential, built from genuine
            accumulation — not a universal prescription for pace.
          </p>
          <p>
            It is also not saying that the ascent will be without difficulty. Wood
            growing through earth encounters resistance — roots must push through
            compacted soil, branches must find their way around obstacles. The
            steadiness this hexagram describes is not the absence of difficulty
            but the capacity to continue through it without losing direction.
          </p>
        </>
      ),
    },
  ],
  51: [
    {
      heading: "What Hexagram 51 describes",
      content: (
        <>
          <p>
            Hexagram 51, Zhen (震), doubles the Thunder trigram — shock arriving
            from above and below simultaneously. In the <cite>I Ching</cite>, this
            image describes a sudden, disruptive event: something that arrives
            without warning and forces an immediate response. The classical
            Judgment reads: "shock awakens movement; stay composed after the first
            impact."
          </p>
          <p>
            The hexagram is associated with the eldest son in the classical family
            system — the one who takes charge when the father is absent. This
            association suggests that the appropriate response to shock is not
            paralysis but the assumption of responsibility: the shock has arrived,
            and someone must respond to it with clarity and steadiness.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder repeats; fear turns into discipline." The{" "}
            <cite>I Ching</cite> commentary describes the wise person as someone
            who, when the first shock arrives, feels fear and then sets their
            inner life in order — examining their conduct, correcting what needs
            correction, and using the disruption as an occasion for genuine
            self-examination rather than simply waiting for the shock to pass.
          </p>
          <p>
            The practical lesson is about the difference between the first moment
            of shock and the response that follows it. The first moment is
            involuntary — the spilled wine, the startled reaction. What comes
            after is a choice. The <cite>I Ching</cite> asks whether the response
            to shock produces genuine recalibration or simply a return to the
            previous pattern once the disruption has passed.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 51 often appears when an unexpected
            disruption has arrived — a sudden change in direction, an unexpected
            failure, or a shock to the system that forces a reassessment. The
            hexagram does not advise pretending the shock did not happen or
            immediately returning to business as usual. It asks for the composure
            to respond thoughtfully rather than reactively, and for the honesty
            to use the disruption as an occasion to examine what it has revealed.
          </p>
          <p>
            In personal contexts, it can describe any sudden event that has
            disrupted a previously stable situation. The classical emphasis on
            inner stability is practically important: the person who has genuine
            inner resources can absorb a shock and continue; the person whose
            stability was entirely dependent on external conditions cannot.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 51 is not saying that shock is good or that disruption
            should be sought out. The <cite>I Ching</cite> does not romanticize
            difficulty. The thunder arrives whether or not it is welcome — the
            hexagram describes how to respond to it, not how to invite it.
          </p>
          <p>
            It is also not saying that composure means the absence of feeling.
            The classical image includes the spilled wine and the startled
            reaction — the shock is felt. Composure in this hexagram means that
            the feeling does not become the response: fear is acknowledged and
            then set aside in favor of clear, steady action. That is different
            from suppressing the feeling or pretending it is not there.
          </p>
        </>
      ),
    },
  ],
  52: [
    {
      heading: "What Hexagram 52 describes",
      content: (
        <>
          <p>
            Hexagram 52, Gen (艮), doubles the Mountain trigram — two mountains
            stacked, stillness above and below. In the <cite>I Ching</cite>, this
            image describes the active practice of stopping: not passive
            inactivity, but the deliberate choice to cease movement at the
            appropriate moment. The classical Judgment reads: "stillness is active
            when it stops the wrong movement."
          </p>
          <p>
            The hexagram's classical image is unusual: stilling the back so that
            the person no longer perceives what is behind or ahead of them. This
            is not blindness — it is the focused presence of someone who has
            stopped the forward momentum of thought and action in order to be
            fully present to what is actually here. The{" "}
            <cite>I Ching</cite> treats this as a genuine achievement, not a
            default state.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Mountain on mountain; rest where rest is needed."
            The <cite>I Ching</cite> commentary describes the wise person as
            someone who knows when to stop and when to move — and who does not
            confuse the two. The practical lesson is about the discipline of
            stopping: not stopping because you are tired or because the situation
            is difficult, but stopping because the movement has reached its
            natural limit and continuing would produce diminishing returns or
            genuine harm.
          </p>
          <p>
            The hexagram also describes the quality of genuine rest: not the
            restlessness of someone who has stopped moving but cannot stop
            thinking, but the actual stillness of someone whose inner and outer
            movement have both ceased. This kind of rest restores; the other kind
            does not.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 52 often appears when someone has been
            in continuous motion — working, deciding, producing — and the quality
            of the output has begun to decline because the movement has not been
            interrupted by genuine rest or reflection. The hexagram supports
            stopping deliberately rather than waiting until exhaustion forces a
            stop.
          </p>
          <p>
            In decision contexts, it can describe the value of pausing before
            acting — not the indefinite delay of Hexagram 5 (Waiting), but the
            specific, deliberate stop that allows a situation to clarify before
            the next move is made. Some decisions that seem urgent are actually
            better served by a moment of genuine stillness than by immediate
            action.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 52 is not telling you to stop permanently or to treat
            inaction as inherently superior to action. The{" "}
            <cite>I Ching</cite> places Hexagram 53 (Development) immediately
            after Keeping Still — the stillness creates the conditions for the
            next movement to be genuine rather than merely habitual. Stopping is
            a phase, not a destination.
          </p>
          <p>
            It is also not saying that all rest is equivalent. The hexagram
            describes a specific quality of stillness — active, deliberate,
            present — that is different from the restlessness of someone who has
            stopped moving but not stopped running. The mountain is genuinely
            still; it is not simply a hill that has paused.
          </p>
        </>
      ),
    },
  ],
  53: [
    {
      heading: "What Hexagram 53 describes",
      content: (
        <>
          <p>
            Hexagram 53, Jian (渐), places Wind above Mountain — a tree growing
            on a high ridge, its roots deep, its growth visible and gradual. In
            the <cite>I Ching</cite>, this image describes development that
            follows a proper sequence: each stage is completed before the next
            begins, and the result is something that has genuine depth because it
            was not rushed. The classical Judgment reads: "gradual progress
            becomes stable through proper sequence."
          </p>
          <p>
            The hexagram uses the image of a marriage conducted through the
            correct sequence of rituals. This is not about formality for its own
            sake — it is about the recognition that some processes have a natural
            order, and that skipping stages in that order produces a result that
            looks complete but lacks the foundation that the skipped stages would
            have provided.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wood on the mountain; growth takes position over
            time." The <cite>I Ching</cite> commentary describes the wise person
            as someone who abides in excellence and improves the customs of the
            people — not through dramatic intervention, but through the consistent
            example of someone who has developed genuinely over time. The
            practical lesson is that the quality of gradual development is visible
            in the result: the tree that has grown slowly on a high ridge is more
            deeply rooted than one that has been forced.
          </p>
          <p>
            The hexagram also asks about the relationship between personal
            development and the development of those around you. The tree on the
            mountain is visible — its growth influences the landscape. Gradual,
            genuine development tends to have this quality: it shapes the
            environment through example rather than through instruction.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 53 often appears when someone is in a
            developmental process that requires patience — a training program, an
            apprenticeship, or a sequence of roles that each build on the
            previous. The hexagram validates the process and asks for the
            discipline to complete each stage genuinely rather than rushing to
            the credential or the title without the underlying development.
          </p>
          <p>
            In relationship contexts, it describes the natural sequence of
            deepening connection — the stages of trust, understanding, and
            commitment that build on each other. Attempting to skip to a later
            stage before the earlier ones are solid tends to produce a connection
            that looks more advanced than it actually is.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 53 is not saying that all processes must be slow or that
            speed is inherently suspect. The <cite>I Ching</cite> has hexagrams
            that describe rapid progress and decisive action. Development describes
            a specific quality of process — one that has a natural sequence —
            not a universal prescription for pace. Some things genuinely develop
            quickly; others require time. The question is whether the pace matches
            the nature of what is being developed.
          </p>
          <p>
            It is also not saying that the sequence must be rigid or that
            deviation from a prescribed order is always wrong. The marriage
            rituals in the classical image are a means to an end — the end being
            a genuine, solid union. If a different sequence produces the same
            quality of foundation, the hexagram's principle is satisfied. The
            point is the depth of the result, not the specific form of the process.
          </p>
        </>
      ),
    },
  ],
  54: [
    {
      heading: "What Hexagram 54 describes",
      content: (
        <>
          <p>
            Hexagram 54, Gui Mei (归妹), places Thunder above the Lake — movement
            above joy, the image of a younger sister entering a household not as
            the primary wife but in a secondary role. In the <cite>I Ching</cite>,
            this image describes a situation of genuine inequality: one party
            holds more power, and the other must navigate within that constraint.
            The classical Judgment reads: "unequal roles require caution, dignity,
            and realistic expectations."
          </p>
          <p>
            The hexagram is one of the more challenging in the{" "}
            <cite>King Wen sequence</cite> because it describes a situation that
            is structurally unfavorable. The <cite>I Ching</cite> does not pretend
            the inequality does not exist — it asks how to conduct oneself within
            it with integrity, rather than either accepting mistreatment passively
            or acting rashly in a way that makes the situation worse.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder over the lake; endings reveal the proper
            place." The <cite>I Ching</cite> commentary describes the wise person
            as someone who understands the difference between what is permanent
            and what is temporary — who can endure a difficult position without
            losing their sense of what they actually are. The practical lesson is
            about the quality of conduct in constrained circumstances: dignity
            that does not require external validation, and patience that is not
            the same as resignation.
          </p>
          <p>
            The hexagram also asks about realistic expectations. The younger
            sister who enters a household expecting to be treated as the primary
            wife will be disappointed and may act in ways that damage her
            position further. Accurate assessment of the actual situation — not
            the situation as you wish it were — is the foundation of effective
            navigation within it.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 54 often appears when someone is in a
            junior, secondary, or constrained role — a new hire, a contractor, or
            someone whose authority is limited by the structure they are working
            within. The hexagram does not advise accepting permanent subordination,
            but it does ask for the patience to build credibility and influence
            gradually rather than acting prematurely from a position that does not
            yet have the standing to support the action.
          </p>
          <p>
            In relationship contexts, it can describe any situation where the
            power differential is real and the person in the less powerful
            position must decide how to maintain their integrity within it. The
            classical emphasis on dignity is practically important: conduct that
            preserves self-respect tends to produce better outcomes than conduct
            that either collapses into compliance or escalates into conflict.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 54 is not telling you to accept mistreatment or to remain
            permanently in a position that is genuinely harmful. The{" "}
            <cite>I Ching</cite> describes the situation as it is, not as it
            should be. The advice to act with caution and patience is practical —
            premature action from a weak position tends to make the situation
            worse — not a moral endorsement of the inequality itself.
          </p>
          <p>
            It is also not saying that the constrained position is permanent. The
            image of endings revealing the proper place suggests that the
            situation will eventually clarify — that what is genuinely valuable
            will become visible over time. The patience this hexagram asks for is
            the patience of someone who knows their own worth and is willing to
            wait for the moment when it can be expressed effectively.
          </p>
        </>
      ),
    },
  ],
  55: [
    {
      heading: "What Hexagram 55 describes",
      content: (
        <>
          <p>
            Hexagram 55, Feng (丰), places Thunder above Fire — movement and
            clarity both at their maximum, the image of a moment when everything
            is illuminated and the capacity for action is fully present. In the{" "}
            <cite>I Ching</cite>, this is the hexagram of the peak: not the
            approach to the peak, but the peak itself. The classical Judgment
            reads: "peak visibility asks for wise use before decline begins."
          </p>
          <p>
            The hexagram is associated with the image of the sun at noon — the
            moment of maximum light, which is also the moment when the sun begins
            its descent. The <cite>King Wen sequence</cite> places this hexagram
            near the end of the second half deliberately: abundance is real, but
            it is a phase, not a permanent condition. The question the hexagram
            asks is what you will do with the peak while you are in it.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder and lightning arrive; decide while the light
            is strong." The <cite>I Ching</cite> commentary describes the wise
            person as someone who uses a period of abundance to settle disputes,
            administer justice, and complete what needs to be completed — not
            because these things are only possible at the peak, but because the
            clarity and resources available at the peak make them easier to do
            well. The practical lesson is to act on what matters while the
            conditions are favorable, rather than deferring until the conditions
            have changed.
          </p>
          <p>
            The hexagram also asks about the quality of the abundance. Thunder
            and fire together produce both sound and light — the abundance
            described here is not just material but includes clarity of
            perception and decisiveness of action. Using a peak moment well means
            using all of these, not just the material resources.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 55 often appears at a moment of genuine
            peak performance — a successful launch, a period of strong results,
            or a position of unusual influence. The hexagram supports acting
            decisively during this period and asks for the awareness that the
            peak is temporary. Completing important work, making significant
            decisions, and building durable structures during a peak period is
            wiser than assuming the conditions will continue indefinitely.
          </p>
          <p>
            In creative contexts, it describes the moment when a project is fully
            alive — when the vision is clear, the energy is present, and the
            capacity to execute is at its highest. The hexagram asks for the
            discipline to work hard during this window rather than saving the
            effort for a later moment that may not arrive with the same quality
            of conditions.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 55 is not saying that decline is inevitable or that the peak
            should be approached with anxiety. The sun at noon is not diminished
            by the fact that it will set — it is fully itself at that moment. The
            <cite>I Ching</cite> asks for full engagement with the peak, not
            premature mourning of its passing.
          </p>
          <p>
            It is also not saying that abundance requires constant activity. The
            thunder and lightning in the image are decisive and focused — they do
            not produce continuous noise, but a specific, powerful signal at the
            right moment. Using a peak well sometimes means choosing carefully
            what to act on rather than trying to act on everything at once.
          </p>
        </>
      ),
    },
  ],
  56: [
    {
      heading: "What Hexagram 56 describes",
      content: (
        <>
          <p>
            Hexagram 56, Lü (旅), places Fire above Mountain — a flame moving
            across high ground, bright but transient. In the <cite>I Ching</cite>,
            this image describes the condition of the traveler: someone who is
            passing through a place rather than settled in it, and who must
            conduct themselves accordingly. The classical Judgment reads: "travel
            lightly; courtesy protects you in temporary places."
          </p>
          <p>
            The hexagram is not about physical travel alone — it describes any
            situation of temporary residence or transitional status. A new role
            before you have established yourself, a period between more stable
            phases, or a relationship with an institution or community where you
            are still an outsider: all of these have the quality of the wanderer's
            situation.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Fire on the mountain; clarity passes through." The{" "}
            <cite>I Ching</cite> commentary describes the wise wanderer as someone
            who is careful about where they stay, cautious about whom they become
            entangled with, and attentive to the small courtesies that protect a
            person in unfamiliar territory. The practical lesson is that the
            standards appropriate to a settled situation do not always apply in a
            transitional one — and that trying to act as if you are settled when
            you are not tends to produce friction and loss.
          </p>
          <p>
            The hexagram also asks about the quality of what you carry. The
            wanderer who travels light — with genuine capability, clear values,
            and the flexibility to adapt — moves through temporary situations
            more effectively than one who is burdened by expectations or
            attachments that do not fit the current context.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 56 often appears during transitions —
            a new job before you have established credibility, a consulting
            engagement in an unfamiliar organization, or a period of freelance
            work between more stable roles. The hexagram asks for the courtesy
            and caution appropriate to someone who is still learning the terrain,
            rather than the confidence appropriate to someone who has already
            established their position.
          </p>
          <p>
            In personal contexts, it can describe any period of genuine
            transition — moving to a new city, entering a new community, or
            navigating a phase of life that does not yet have the structure of
            what came before. The classical advice to travel light is practically
            useful: the less you insist on replicating your previous context in
            the new one, the more effectively you can engage with what is
            actually present.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 56 is not saying that transitional situations are inherently
            inferior or that the wanderer's condition is a failure. The flame on
            the mountain illuminates — it has genuine value in its temporary
            passage. Some of the most significant contributions come from people
            who are passing through rather than settled, precisely because they
            bring a perspective that insiders cannot have.
          </p>
          <p>
            It is also not advising permanent transience. The{" "}
            <cite>I Ching</cite> places Hexagram 57 (The Gentle) after The
            Wanderer — the persistent, penetrating influence that comes from
            sustained presence. The wanderer's caution is appropriate to the
            transitional phase; it is not a permanent operating mode.
          </p>
        </>
      ),
    },
  ],
  57: [
    {
      heading: "What Hexagram 57 describes",
      content: (
        <>
          <p>
            Hexagram 57, Xun (巽), doubles the Wind trigram — gentle penetration
            above and below, the image of wind moving through everything without
            obstruction. In the <cite>I Ching</cite>, this hexagram describes
            influence that works through persistence rather than force: the kind
            of effect that accumulates over time through consistent, repeated
            presence. The classical Judgment reads: "soft persistence penetrates
            where force cannot."
          </p>
          <p>
            The hexagram is associated with the eldest daughter in the classical
            family system — someone whose influence operates through attentiveness
            and adaptability rather than through authority. This association
            suggests that the quality of Xun is not weakness but a different kind
            of strength: the strength of something that can move through any
            opening because it does not insist on a single path.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind follows wind; influence accumulates through
            repetition." The <cite>I Ching</cite> commentary describes the wise
            person as someone who repeats their commands and makes their
            intentions known through consistent action over time rather than
            through a single dramatic declaration. The practical lesson is that
            the kind of influence this hexagram describes requires both clarity
            of direction and patience with the pace of effect.
          </p>
          <p>
            The hexagram also asks about the quality of the direction. Wind that
            has no direction simply disperses — it does not penetrate. The
            gentleness of Xun is effective precisely because it is consistent and
            directed, not because it is random or accommodating of everything.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 57 often appears when
            someone is trying to shift a culture, change a habit, or influence a
            situation where direct authority is limited. The hexagram supports
            the patient, consistent approach — showing up repeatedly, modeling
            the desired behavior, and allowing the influence to accumulate rather
            than expecting immediate results from a single intervention.
          </p>
          <p>
            In negotiation or persuasion contexts, it describes the approach of
            someone who returns to the same point from multiple angles over time,
            rather than trying to force agreement in a single conversation. Wind
            finds every opening — the persistent communicator who adapts their
            approach while maintaining their direction tends to produce more
            genuine movement than the one who pushes harder through a single
            channel.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 57 is not saying that all situations call for gentle
            persistence or that direct action is always wrong. The{" "}
            <cite>I Ching</cite> has hexagrams that describe decisive
            breakthrough, clear declaration, and the use of real power. The
            Gentle describes a specific approach — appropriate when force is
            unavailable or counterproductive — not a universal operating mode.
          </p>
          <p>
            It is also not saying that gentleness means accommodation of
            everything. Wind is gentle but it is also persistent and directed —
            it does not simply go wherever the terrain pushes it. The quality
            this hexagram describes requires knowing what you are moving toward
            and continuing to move toward it, even when the path requires
            bending around obstacles rather than going through them.
          </p>
        </>
      ),
    },
  ],
  58: [
    {
      heading: "What Hexagram 58 describes",
      content: (
        <>
          <p>
            Hexagram 58, Dui (兑), doubles the Lake trigram — open, reflective
            water above and below, each replenishing the other. In the{" "}
            <cite>I Ching</cite>, this image describes joy that is mutual and
            self-sustaining: not the pleasure of consumption, but the delight of
            genuine exchange. The classical Judgment reads: "joy is constructive
            when it remains sincere."
          </p>
          <p>
            The hexagram is associated with the youngest daughter in the classical
            family system — someone whose quality is openness and responsiveness.
            The <cite>I Ching</cite> treats this as a genuine strength: the
            capacity to receive and reflect what is present, to find delight in
            learning and in the company of others, and to communicate that delight
            in a way that encourages others to open as well.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Lake joins lake; learning and exchange create
            delight." The <cite>I Ching</cite> commentary describes the wise
            person as someone who gathers with friends to discuss and practice —
            the image of genuine intellectual and social exchange as a source of
            sustainable joy. The practical lesson is that the kind of joy this
            hexagram describes is not passive or consumptive; it is generated
            through active engagement with others and with ideas.
          </p>
          <p>
            The hexagram also asks about the quality of the joy. The{" "}
            <cite>I Ching</cite> distinguishes between joy that comes from
            genuine exchange and joy that comes from flattery, empty pleasure, or
            the avoidance of difficulty. The former sustains; the latter depletes.
            Two lakes that are genuinely connected replenish each other; two lakes
            that are merely adjacent do not.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or team contexts, Hexagram 58 often appears when the
            question is about morale, culture, or the quality of working
            relationships. The hexagram supports investing in genuine exchange —
            conversations that are honest rather than performative, celebrations
            that acknowledge real achievement rather than manufactured enthusiasm,
            and the kind of shared learning that creates genuine connection rather
            than just shared information.
          </p>
          <p>
            In relationship contexts, it describes the quality of connection that
            comes from genuine mutual interest and honest communication. The joy
            of two lakes joined is not the joy of one lake filling the other —
            it is the joy of mutual replenishment, where both are enriched by the
            exchange.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 58 is not saying that all pleasure is good or that joy
            should be pursued without discernment. The <cite>I Ching</cite> is
            specific that joy must remain sincere to be constructive — joy that
            comes from flattery, from avoiding necessary difficulty, or from
            pleasures that deplete rather than replenish is not what this
            hexagram describes.
          </p>
          <p>
            It is also not saying that joy requires constant social engagement.
            Two lakes joined is an image of connection, not of constant activity.
            The joy this hexagram describes can be quiet — the delight of genuine
            understanding, of work that is going well, of a relationship that is
            genuinely mutual. It does not require performance or display to be
            real.
          </p>
        </>
      ),
    },
  ],
  59: [
    {
      heading: "What Hexagram 59 describes",
      content: (
        <>
          <p>
            Hexagram 59, Huan (涣), places Wind above Water — wind moving across
            the surface of a river or lake, breaking up ice, dispersing what has
            congealed. In the <cite>I Ching</cite>, this image describes the
            dissolution of rigidity: the melting of what has frozen, the loosening
            of what has hardened, the restoration of flow where flow has stopped.
            The classical Judgment reads: "dissolve rigidity and restore shared
            movement."
          </p>
          <p>
            The hexagram is associated with spring in the classical calendar —
            the season when ice melts and rivers begin to move again. The{" "}
            <cite>King Wen sequence</cite> places it near the end of the second
            half, after many hexagrams describing difficulty, constraint, and
            careful navigation. Dispersion describes the moment when the
            accumulated tension of those phases begins to release.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind moves over water; loosen what has hardened."
            The <cite>I Ching</cite> commentary describes the ancient kings as
            using this hexagram as the basis for religious ceremony — specifically,
            the kind of ceremony that dissolves the boundaries between people and
            reconnects them to something larger than their individual concerns.
            The practical lesson is that dispersion is not just about removing
            obstacles; it is about restoring the conditions for genuine connection
            and shared movement.
          </p>
          <p>
            The hexagram supports crossing great waters — taking on significant
            challenges — precisely because the dissolution of rigidity creates
            the flexibility needed for major transitions. What was frozen cannot
            cross; what flows can.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In organizational contexts, Hexagram 59 often appears when a team or
            group has become rigid — when accumulated resentment, siloed thinking,
            or hardened positions are preventing genuine collaboration. The
            hexagram supports interventions that dissolve these rigidities: honest
            conversations, shared experiences, or structural changes that break
            up the patterns that have congealed. The goal is not to eliminate
            difference but to restore the flow of genuine exchange.
          </p>
          <p>
            In personal contexts, it can describe the work of releasing
            accumulated resentment, grief, or fixed beliefs that have been
            preventing movement. The wind does not force the ice to melt — it
            creates the conditions in which melting becomes possible. The
            dispersion this hexagram describes is often gentler than it sounds.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 59 is not saying that all structure should be dissolved or
            that boundaries are inherently problematic. The wind disperses what
            has congealed — it does not eliminate the water itself. The goal is
            to restore flow, not to eliminate form. Some structures are genuinely
            useful and should be maintained; the hexagram asks specifically about
            what has hardened past its useful point.
          </p>
          <p>
            It is also not saying that dispersion is always comfortable. Ice
            melting is a real process — it requires energy and produces change.
            The <cite>I Ching</cite> does not promise that dissolving rigidity
            will be painless, only that it is necessary when the alternative is
            continued stagnation.
          </p>
        </>
      ),
    },
  ],
  60: [
    {
      heading: "What Hexagram 60 describes",
      content: (
        <>
          <p>
            Hexagram 60, Jie (节), places Water above the Lake — water contained
            within its natural boundary, neither overflowing nor depleted. In the{" "}
            <cite>I Ching</cite>, this image describes the value of appropriate
            limitation: the kind of boundary that gives a situation its shape and
            makes sustained effort possible. The classical Judgment reads: "good
            limits preserve energy; harsh limits create resistance."
          </p>
          <p>
            The hexagram is associated with the joints of a bamboo stalk in
            classical Chinese — the nodes that give the bamboo its strength and
            flexibility. Without the nodes, the bamboo would be a hollow tube
            with no structural integrity. The limits this hexagram describes are
            not constraints imposed from outside but the natural articulations
            that give a living system its form.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Water over the lake; define measure and boundary."
            The <cite>I Ching</cite> commentary makes a careful distinction: the
            wise person sets limits on their own expenditure and conduct, but does
            not impose harsh limits on others. The practical lesson is that
            limitation works best when it is self-chosen and genuinely appropriate
            to the situation — when the person living within the limit understands
            why it exists and can sustain it without resentment.
          </p>
          <p>
            The hexagram also asks about the quality of the limit. A limit that
            is too loose provides no structure; a limit that is too tight creates
            the pressure that eventually produces a break. The water that fills
            the lake exactly is the image of the right measure — not more, not
            less.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or organizational contexts, Hexagram 60 often appears when
            someone is setting boundaries around their time, energy, or scope of
            work. The hexagram supports clear limits and asks whether the limits
            being set are genuinely appropriate — sustainable over time, clearly
            communicated, and based on real assessment of what is possible rather
            than on either excessive permissiveness or excessive restriction.
          </p>
          <p>
            In personal contexts, it describes the work of defining what you will
            and will not do — the limits that protect your capacity to function
            well over time. The classical emphasis on self-chosen limits is
            practically important: limits that are imposed without understanding
            tend to be resisted or circumvented, while limits that are genuinely
            understood and chosen tend to be maintained.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 60 is not saying that all limits are good or that restriction
            is inherently virtuous. The <cite>I Ching</cite> is explicit that
            harsh limits — those that cannot be maintained without distress —
            are not favorable. The question is always whether the limit is
            genuinely appropriate: does it preserve what needs to be preserved
            without creating the kind of pressure that eventually produces a
            break?
          </p>
          <p>
            It is also not saying that limits should never change. The bamboo
            node is a fixed point in the stalk's growth, but the stalk continues
            to grow beyond it. Limits that were appropriate at one stage of a
            situation may need to be revised as the situation develops. The
            hexagram asks for the discernment to know when a limit is still
            serving its purpose and when it has become an obstacle to necessary
            growth.
          </p>
        </>
      ),
    },
  ],
  61: [
    {
      heading: "What Hexagram 61 describes",
      content: (
        <>
          <p>
            Hexagram 61, Zhong Fu (中孚), places Wind above the Lake — wind
            moving across open water, penetrating to the center of what it
            touches. In the <cite>I Ching</cite>, this image describes the quality
            of genuine sincerity: not the performance of honesty, but the actual
            alignment between what is inside and what is expressed outward. The
            classical Judgment reads: "trust grows when inner and outer signals
            match."
          </p>
          <p>
            The hexagram's name, <em>zhong fu</em>, means literally "inner
            faithfulness" or "truth at the center." The structure of the hexagram
            reflects this: two solid lines at the top and bottom, two open lines
            in the middle — the image of something hollow at the center, open to
            receive. The <cite>I Ching</cite> treats this openness not as
            emptiness but as the receptivity that makes genuine connection
            possible.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Wind over the lake; sincerity reaches others." The{" "}
            <cite>I Ching</cite> commentary describes the wise person as someone
            who deliberates carefully before speaking and is cautious about what
            they commit to — not because they are withholding, but because they
            understand that words carry weight only when they are backed by
            genuine intention and consistent action. The practical lesson is that
            the quality of communication is determined more by the alignment
            between inner and outer than by the skill of the expression itself.
          </p>
          <p>
            The hexagram also describes the capacity to reach others who are
            difficult to reach — the classical image includes influencing even
            fish and pigs, the least responsive of creatures. Genuine sincerity
            penetrates where clever argument cannot, because it operates at a
            level that bypasses the defenses that argument triggers.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career or leadership contexts, Hexagram 61 often appears when
            someone is trying to rebuild trust after a period of inconsistency,
            or when their communications are not landing despite being technically
            correct. The hexagram asks whether the inner and outer signals are
            actually aligned — whether what is being said matches what is being
            felt and intended. Inconsistency between these levels is usually
            perceptible even when it is not consciously identified.
          </p>
          <p>
            In negotiation or conflict resolution contexts, it describes the
            quality that makes agreement durable: not the cleverness of the terms,
            but the genuine sincerity of the parties. Agreements reached through
            genuine mutual understanding tend to hold; agreements reached through
            clever maneuvering tend to require constant maintenance.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 61 is not saying that sincerity alone is sufficient or that
            good intentions guarantee good outcomes. The <cite>I Ching</cite> is
            consistent that sincerity must be paired with appropriate action —
            inner truth that never expresses itself outward does not produce the
            connection this hexagram describes. The wind must actually move across
            the lake; it cannot simply exist as a potential.
          </p>
          <p>
            It is also not saying that all expressions of sincerity will be
            received. Some situations are not ready for genuine connection, and
            some people are not in a position to receive it. The hexagram
            describes what makes genuine influence possible when the conditions
            are present — it does not guarantee that the conditions will always
            be present.
          </p>
        </>
      ),
    },
  ],
  62: [
    {
      heading: "What Hexagram 62 describes",
      content: (
        <>
          <p>
            Hexagram 62, Xiao Guo (小过), places Thunder above Mountain —
            movement above stillness, the image of something that has gone
            slightly beyond its proper measure. In the <cite>I Ching</cite>, this
            hexagram describes a situation where the scale of action must be
            carefully calibrated: small exceeding is possible and sometimes
            necessary, but large exceeding produces loss. The classical Judgment
            reads: "small adjustments are favored; avoid grand overreach."
          </p>
          <p>
            The hexagram is paired with Hexagram 28 (Great Exceeding) earlier in
            the sequence. Where Great Exceeding describes a situation of genuine
            structural overload requiring extraordinary response, Small Exceeding
            describes a situation where the load is manageable but the tendency
            to overreach must be consciously restrained. The difference is scale
            and the appropriate response to it.
          </p>
        </>
      ),
    },
    {
      heading: "The image and its practical lesson",
      content: (
        <>
          <p>
            The image says: "Thunder above the mountain; attend to detail." The{" "}
            <cite>I Ching</cite> commentary uses the image of a flying bird: the
            bird that flies too high misses the nest; the bird that descends finds
            food. The practical lesson is that in situations described by this
            hexagram, the correct move is downward rather than upward — toward
            what is concrete, immediate, and manageable rather than toward what
            is grand, abstract, or ambitious.
          </p>
          <p>
            The hexagram also describes specific behavioral adjustments: in
            mourning, exceed in grief rather than in ceremony; in ordinary
            conduct, exceed in frugality rather than in display; in service,
            exceed in deference rather than in assertion. These are all forms of
            the same principle: when in doubt, err on the side of less rather
            than more.
          </p>
        </>
      ),
    },
    {
      heading: "Modern applications",
      content: (
        <>
          <p>
            In career contexts, Hexagram 62 often appears when someone is
            considering a move that is larger than the situation actually requires
            — a reorganization when a conversation would suffice, a public
            declaration when a private one would be more effective, or an
            ambitious initiative when careful execution of what is already
            underway would produce better results. The hexagram asks whether the
            scale of the intended action matches the actual scale of the need.
          </p>
          <p>
            In decision contexts, it describes the value of precision over
            ambition: the small, well-aimed adjustment that actually hits the
            target is more effective than the large, sweeping move that misses.
            The bird that descends to find food is more successful than the bird
            that flies higher hoping to see further.
          </p>
        </>
      ),
    },
    {
      heading: "What this hexagram is not saying",
      content: (
        <>
          <p>
            Hexagram 62 is not saying that ambition is always wrong or that small
            is always better than large. The <cite>I Ching</cite> has hexagrams
            that describe great power, decisive breakthrough, and the crossing of
            great waters. Small Exceeding applies specifically to situations where
            the conditions do not support large action — where the structure is
            not yet ready, the timing is not right, or the situation genuinely
            calls for precision rather than scale.
          </p>
          <p>
            It is also not saying that the small adjustments are unimportant. The
            bird that finds food by descending has accomplished something real.
            Attending carefully to what is immediately present, doing it well, and
            not overreaching the situation is a genuine achievement — not a
            consolation prize for failing to do something larger.
          </p>
        </>
      ),
    },
  ],
};

const hexagramFaqs: Partial<Record<number, FAQ[]>> = {
  1: [
    { question: "What does Hexagram 1 (The Creative) mean?", answer: "Hexagram 1, Qian (乾), represents pure yang energy and creative initiative. It describes a moment when conditions favor decisive, principled action — but only when paired with timing, integrity, and self-discipline." },
    { question: "Is Hexagram 1 a positive or auspicious sign?", answer: "Generally yes. The Judgment promises 'sublime success' through perseverance. However, the line statements warn against acting too early or rising too high without grounding — auspicious does not mean unconditional." },
    { question: "What is the relationship between Hexagram 1 and Hexagram 2?", answer: "Hexagrams 1 (Creative) and 2 (Receptive) are complementary opposites — pure yang and pure yin. Together they form the foundation of all 64 hexagrams. One initiates, the other completes; neither is superior." },
    { question: "What do the changing lines in Hexagram 1 indicate?", answer: "Each of the six lines describes a stage of dragon energy: hidden, appearing, active, leaping, flying, and arrogant. Changing lines mark the specific stage of creative force in your situation and what action it calls for." },
    { question: "How should I apply Hexagram 1 to a career decision?", answer: "Hexagram 1 favors initiative aligned with long-term principle. It does not endorse impulsive moves. Ask whether the conditions, your preparation, and the timing all support sustained creative effort — if yes, act decisively." },
    { question: "What does Hexagram 1 warn against?", answer: "The top line warns against the 'arrogant dragon' — power that has risen too far and disconnected from its base. The hexagram cautions that creative success without humility produces regret." },
  ],
  2: [
    { question: "What does Hexagram 2 (The Receptive) mean?", answer: "Hexagram 2, Kun (坤), represents pure yin energy — receptivity, devotion, and the capacity to support and complete what has been initiated. It describes situations where following well is more powerful than leading." },
    { question: "Is Hexagram 2 passive or weak?", answer: "No. The Receptive is not passivity but active responsiveness. The classical image is the mare — strong, enduring, capable of carrying great loads. Receptivity in the I Ching is a form of strength." },
    { question: "What is the Judgment of Hexagram 2?", answer: "The Judgment promises supreme success through devotion and perseverance, with the image of finding direction by following rather than leading. It advises seeking guidance and avoiding isolation." },
    { question: "How does Hexagram 2 relate to Hexagram 1?", answer: "Hexagram 2 completes what Hexagram 1 initiates. Where Hexagram 1 is the seed of creative impulse, Hexagram 2 is the soil that nourishes it into form. Both are required for any complete cycle." },
    { question: "When does Hexagram 2 appear in a reading?", answer: "It often appears when the situation calls for service, support, patience, or completing someone else's work rather than starting your own. It also appears when receptivity to guidance is the missing element." },
    { question: "What does the line 'firm ice' warn about in Hexagram 2?", answer: "The first line warns that small signs of cold lead to firm ice — small developments compound into large patterns. It is a call to notice early signals before they become irreversible structures." },
  ],
  3: [
    { question: "What does Hexagram 3 (Difficulty at the Beginning) mean?", answer: "Hexagram 3, Zhun (屯), describes the chaos of new beginnings — the moment when potential is present but form has not yet emerged. It is the difficulty of birth, not failure." },
    { question: "Is Hexagram 3 a bad omen?", answer: "No. The Judgment promises supreme success through perseverance, though it warns against premature action. The difficulty is structural to beginnings, not a sign that the project is doomed." },
    { question: "What does Hexagram 3 advise?", answer: "It advises seeking helpers and not undertaking the journey alone. The image is grass struggling through hard ground — the way forward exists, but it requires support and patient persistence." },
    { question: "What is the trigram structure of Hexagram 3?", answer: "Water (Kan) above Thunder (Zhen) — danger above movement. The image is movement meeting obstruction, which produces the chaos and creative pressure of new formation." },
    { question: "When should I expect Hexagram 3 in a reading?", answer: "It often appears when starting a new venture, relationship, or phase of life. The hexagram acknowledges that the beginning is hard and that confusion at this stage is normal, not a verdict on the outcome." },
    { question: "What does Hexagram 3 warn against?", answer: "It warns against forcing premature clarity or proceeding without allies. The hexagram explicitly says that pursuing the deer without a forester leads astray — accept help or wait for it." },
  ],
  4: [
    { question: "What does Hexagram 4 (Youthful Folly) mean?", answer: "Hexagram 4, Meng (蒙), describes the inexperience of the beginner and the conditions for genuine learning. It is about the relationship between teacher and student, and the discipline that makes instruction possible." },
    { question: "Is Hexagram 4 about being foolish?", answer: "Not in a derogatory sense. It describes the natural ignorance of someone new to a domain. The hexagram is favorable — it promises success through proper attitude toward learning, not through pretending to already know." },
    { question: "What is the famous teaching in Hexagram 4?", answer: "The Judgment says: 'It is not I who seek the youth; the youth seeks me.' Genuine instruction requires the student's initiative. Repeated questions without sincere effort exhaust the relationship." },
    { question: "What does Hexagram 4 advise about teachers?", answer: "It advises clarity and firmness from the teacher and sincerity from the student. The hexagram warns against indulgent teaching that does not require effort — and against the student who consults repeatedly without integrating answers." },
    { question: "When does Hexagram 4 appear in modern readings?", answer: "It appears when learning is the central task — entering a new field, taking on a mentor or mentee role, or recognizing that confusion is the appropriate state for the moment and humility is the right response." },
    { question: "What is the trigram structure of Hexagram 4?", answer: "Mountain (Gen) above Water (Kan) — a spring at the foot of a mountain. The image is water beginning its journey: full of potential but needing channels (instruction) to find its course." },
  ],
  5: [
    { question: "What does Hexagram 5 (Waiting) mean?", answer: "Hexagram 5, Xu (需), describes nourished waiting — patience that is active, prepared, and confident. It is not idle delay but the discipline of holding position until conditions ripen." },
    { question: "Is Hexagram 5 telling me to do nothing?", answer: "No. It tells you to wait without anxiety while staying ready. The image of clouds rising in the sky before rain — the rain is certain, but its timing is not yours to force." },
    { question: "What does Hexagram 5 promise?", answer: "The Judgment promises success and benefit from crossing the great water — but only after the waiting is complete. Acting before the moment ripens reverses the favorable outcome." },
    { question: "What is the trigram structure of Hexagram 5?", answer: "Water (Kan) above Heaven (Qian) — strength encountering danger. The strength is real but cannot yet break through; waiting is the correct response, not weakness." },
    { question: "What practical situations does Hexagram 5 describe?", answer: "Waiting for a decision from someone else, holding a position before a major launch, sustaining preparation when the opening has not yet appeared. Anxiety in waiting is the main pitfall." },
    { question: "How does Hexagram 5 differ from passive waiting?", answer: "The image emphasizes 'eating and drinking' during the wait — maintain strength, stay nourished, keep relationships healthy. Active waiting preserves the readiness needed when the moment arrives." },
  ],
  6: [
    { question: "What does Hexagram 6 (Conflict) mean?", answer: "Hexagram 6, Song (訟), describes a situation of opposition and dispute. It is not a hexagram of victory; it is a hexagram of careful disengagement when conflict cannot be resolved cleanly." },
    { question: "Should I fight or yield with Hexagram 6?", answer: "The hexagram strongly counsels meeting the opposition halfway and avoiding the great undertaking. Even when you are in the right, prolonged conflict damages all parties — early settlement is wiser than total victory." },
    { question: "What is the trigram structure of Hexagram 6?", answer: "Heaven (Qian) above Water (Kan) — strength rising while danger flows downward. The two forces move in opposite directions, which is the structural definition of conflict." },
    { question: "What does Hexagram 6 advise about lawsuits or formal disputes?", answer: "It advises seeking mediation early. The classical commentary warns that even a winning lawsuit may produce loss when the cost of conflict is fully accounted for. Crossing the great water — undertaking large risks — is unfavorable now." },
    { question: "When does Hexagram 6 appear in personal readings?", answer: "It appears in tensions with colleagues, family disputes, and situations where two valid perspectives cannot easily reconcile. The advice is consistent: prevent escalation, seek a fair-minded third party, accept partial resolution." },
    { question: "What does the top line of Hexagram 6 warn?", answer: "The top line describes someone who wins the conflict but loses three times over — a victory that produces no lasting honor. The warning is that triumph in conflict often costs more than it returns." },
  ],
  7: [
    { question: "What does Hexagram 7 (The Army) mean?", answer: "Hexagram 7, Shi (師), describes organized collective effort under disciplined leadership. It is about coordinating many toward one purpose — whether literal armies, teams, or sustained group projects." },
    { question: "Is Hexagram 7 about war?", answer: "In its classical form yes, but in modern reading it applies to any organized collective endeavor. The principle is the same: clear leadership, internal discipline, and cause that justifies the effort." },
    { question: "What does Hexagram 7 require for success?", answer: "The Judgment requires a strong, experienced leader and a just cause. Without both, the army cannot be held together. With both, even difficult campaigns succeed." },
    { question: "What is the trigram structure of Hexagram 7?", answer: "Earth (Kun) above Water (Kan) — water hidden within earth. The image is the underground reservoir from which the army is supplied: power held in reserve, deployed only when necessary." },
    { question: "When does Hexagram 7 appear in modern life?", answer: "When leading a team through a difficult project, mounting a sustained effort against an obstacle, or organizing collective action. It also appears as a warning that effective leadership and clear cause are currently missing." },
    { question: "What does Hexagram 7 say about rewards after success?", answer: "The top line says the great prince issues commands and founds states — and explicitly warns against using inferior people in office. After victory, who is promoted matters as much as the victory itself." },
  ],
  8: [
    { question: "What does Hexagram 8 (Holding Together) mean?", answer: "Hexagram 8, Bi (比), describes mutual support and union — the moment when alliance is the right response. It asks who you are aligning with and whether the alliance is rooted in genuine common purpose." },
    { question: "Is Hexagram 8 favorable?", answer: "Yes — but with a condition. The Judgment says good fortune comes through inquiry: 'reflect on whether you have the qualities of leadership.' Alliance is favorable when the union is well-founded; it is dangerous when joined too late or for the wrong reasons." },
    { question: "What is the trigram structure of Hexagram 8?", answer: "Water (Kan) above Earth (Kun) — water flowing across the earth, finding its way into every depression. The image is natural cohesion: things that belong together come together." },
    { question: "What does Hexagram 8 warn about timing?", answer: "The top line warns against joining too late: 'he finds no head' — coming to the alliance after it has formed leaves you without a place. Timing is essential; hesitation costs the position." },
    { question: "When does Hexagram 8 appear in relationship readings?", answer: "In partnerships, marriages, business alliances, or moments when committing to a community is the right move. It asks whether the partner or group is one whose center you trust." },
    { question: "How does Hexagram 8 differ from Hexagram 7?", answer: "Hexagram 7 is the army (organized for a campaign); Hexagram 8 is the league (organized for ongoing union). One is purpose-driven and time-bound; the other is enduring affiliation." },
  ],
  9: [
    { question: "What does Hexagram 9 (Small Taming) mean?", answer: "Hexagram 9, Xiao Xu (小畜), describes the moment when small forces gently restrain larger ones. The image is dense clouds that have not yet released rain — power is gathering but not yet expressing." },
    { question: "Is Hexagram 9 about restriction?", answer: "It is about restraint, not prohibition. The hexagram says action is possible but the great undertaking should wait. Cultivate refinement and detail in the meantime — the larger movement will come." },
    { question: "What is the trigram structure of Hexagram 9?", answer: "Wind (Xun) above Heaven (Qian) — wind moving across the sky. The wind is gentle and disperses clouds; small force shapes large mass through persistence rather than confrontation." },
    { question: "What does the image of Hexagram 9 advise?", answer: "The Image says the superior person 'refines the outward expression of virtue' — attend to small things, cultivate detail and grace. The moment is for refinement, not breakthrough." },
    { question: "When does Hexagram 9 appear in readings?", answer: "In moments when ambition exceeds the conditions: the project is sound but the timing is not yet ripe, the resources are present but not yet sufficient. Small adjustments now create the conditions for later success." },
    { question: "How does Hexagram 9 differ from Hexagram 26?", answer: "Hexagram 26 (Great Taming) describes major accumulation and sustained restraint of large force. Hexagram 9 (Small Taming) is about gentle, immediate restraint — a pause and refinement, not a long campaign of holding back." },
  ],
  10: [
    { question: "What does Hexagram 10 (Treading) mean?", answer: "Hexagram 10, Lü (履), describes careful conduct in the presence of danger. The classical image is treading on the tail of a tiger — the situation is risky, but careful manner allows safe passage." },
    { question: "Is Hexagram 10 a warning?", answer: "It is both a warning and a guide. Danger is real, but the hexagram says correct conduct succeeds where carelessness fails. The Judgment promises success through careful manner, not through avoidance." },
    { question: "What is the trigram structure of Hexagram 10?", answer: "Heaven (Qian) above Lake (Dui) — strength above joy. The image is the upper, more powerful party encountered by the lower, weaker one. The relationship works only through deliberate respect." },
    { question: "What does Hexagram 10 advise about hierarchy?", answer: "It advises clear distinction of roles and dignified conduct within them. The Image says the superior person 'discriminates between high and low' — not to enforce status but to act appropriately within structure." },
    { question: "When does Hexagram 10 appear in modern situations?", answer: "In dealings with powerful authorities, navigating delicate professional relationships, or managing situations where one wrong move produces outsized consequences. Conduct, not capability, is the deciding factor." },
    { question: "What does the top line of Hexagram 10 indicate?", answer: "The top line advises looking back at the path traveled and judging conduct by its outcome. Supreme good fortune comes when, in retrospect, every step was well-placed. Conduct is judged by the whole journey." },
  ],
  11: [
    { question: "What does Hexagram 11 (Peace) mean?", answer: "Hexagram 11, Tai (泰), describes harmony between heaven and earth. Earth above and Heaven below means the two forces interpenetrate — a moment of genuine flourishing in which conditions support healthy growth." },
    { question: "Is Hexagram 11 always good?", answer: "It is highly favorable, but the I Ching is consistent that peace contains the seed of its opposite. The hexagram itself describes the conditions of harmony; the next hexagram (12) describes how harmony decays when not maintained." },
    { question: "What does Hexagram 11 advise about prosperous times?", answer: "The Image says the superior person 'aids and supports the natural course of heaven and earth' — actively maintains the conditions of peace rather than assuming they will continue on their own." },
    { question: "What is the trigram structure of Hexagram 11?", answer: "Earth (Kun) above Heaven (Qian). This is structurally unusual: heavy earth is higher than light heaven, so they must move toward each other to restore equilibrium. That movement is the source of harmony." },
    { question: "When does Hexagram 11 appear in readings?", answer: "In moments of genuine flourishing — successful projects, healthy relationships, well-timed initiatives. It is also a reminder that the conditions of peace require active maintenance." },
    { question: "What does the top line of Hexagram 11 warn?", answer: "The top line says 'the wall falls back into the moat' — peace decays when its foundations are neglected. The warning is that even the best moments end, and how they end depends on what is maintained during them." },
  ],
  12: [
    { question: "What does Hexagram 12 (Standstill) mean?", answer: "Hexagram 12, Pi (否), is the inverse of Hexagram 11. Heaven above and Earth below means the two forces move apart — a period of stagnation in which communication and progress are blocked." },
    { question: "Is Hexagram 12 a sign of failure?", answer: "Not failure, but obstruction. The hexagram describes a structural moment when the conditions for progress are absent. The correct response is withdrawal and preservation, not forced action." },
    { question: "What does Hexagram 12 advise during difficult periods?", answer: "The Image says the superior person 'falls back on inner worth and avoids difficulties through frugality' — protect what matters, conserve resources, do not seek prominence. Standstill ends in time; survival until then is the task." },
    { question: "What is the trigram structure of Hexagram 12?", answer: "Heaven (Qian) above Earth (Kun). The light force rises, the heavy force sinks — they move apart. Without exchange between them, nothing new is generated. This is structural stagnation." },
    { question: "When does Hexagram 12 appear in readings?", answer: "During organizational dysfunction, blocked relationships, periods when normal channels of progress have closed. The hexagram is realistic about the situation and clear about what to do: wait, conserve, do not engage prematurely." },
    { question: "How does Hexagram 12 end?", answer: "The top line says 'the standstill comes to an end' — these periods are temporary by nature. The line emphasizes that the change comes from a shift in conditions, not from forcing the obstruction. Patience and preservation are the bridge to the next phase." },
  ],
  ...buildHexagramFaqEntries(),
};

function buildHexagramFaqEntries(): Record<number, FAQ[]> {
  return Object.fromEntries(
    HEXAGRAMS.filter((hexagram) => hexagram.number >= 13).map((hexagram) => [
      hexagram.number,
      buildHexagramFaqs(hexagram),
    ]),
  );
}

function buildHexagramFaqs(hexagram: (typeof HEXAGRAMS)[number]): FAQ[] {
  const pairedHex = HEXAGRAMS.find((item) => item.number === PAIRED_HEXAGRAMS[hexagram.number]);
  const pairedName = pairedHex ? `Hexagram ${pairedHex.number} (${pairedHex.name})` : "its paired hexagram";
  const pinyin = HEXAGRAM_PINYIN[hexagram.number];
  const chineseName = `${hexagram.chinese} ${pinyin}`;
  const lowerTrigram = TRIGRAM_NAMES[hexagram.binary.slice(0, 3)] ?? hexagram.binary.slice(0, 3);
  const upperTrigram = TRIGRAM_NAMES[hexagram.binary.slice(3, 6)] ?? hexagram.binary.slice(3, 6);
  const judgmentLower = hexagram.judgment.replace(/\.$/, "").toLowerCase();

  return [
    {
      question: `What does Hexagram ${hexagram.number} (${hexagram.name}) mean?`,
      answer: `Hexagram ${hexagram.number}, ${chineseName}, means ${hexagram.judgment.toLowerCase()} Its Image says, "${hexagram.image}" Read it as a complete statement about the pattern now present, not as a fixed prediction or isolated omen.`,
    },
    {
      question: `What is the trigram structure of Hexagram ${hexagram.number}?`,
      answer: `Hexagram ${hexagram.number}, ${chineseName}, is built from ${upperTrigram} above ${lowerTrigram}. This structure gives the page its core image: ${hexagram.image} The upper trigram shows the visible field, while the lower trigram shows the pressure or resource underneath.`,
    },
    {
      question: `When does Hexagram ${hexagram.number} appear in a reading?`,
      answer: `Hexagram ${hexagram.number}, ${chineseName}, appears when the question matches this Judgment: "${hexagram.judgment}" It often points to decisions about timing, conduct, relationships, or responsibility where the symbolic image gives a practical response.`,
    },
    {
      question: `How does Hexagram ${hexagram.number} differ from ${pairedName}?`,
      answer: `Hexagram ${hexagram.number}, ${chineseName}, emphasizes ${judgmentLower}. ${pairedHex ? `Hexagram ${pairedHex.number}, ${pairedHex.chinese} ${HEXAGRAM_PINYIN[pairedHex.number]}, emphasizes ${pairedHex.judgment.replace(/\.$/, "").toLowerCase()}.` : "Its pair emphasizes the adjacent movement in the King Wen sequence."} Read the pair together to distinguish the current condition from its complementary or contrasting phase.`,
    },
    {
      question: `What does Hexagram ${hexagram.number} warn against?`,
      answer: `Hexagram ${hexagram.number}, ${chineseName}, warns against missing the discipline implied by its Image: "${hexagram.image}" The risk is treating ${judgmentLower} as permission for habit, haste, or passivity. The safer response is precise conduct that fits the moment.`,
    },
  ];
}

function buildHexagramRelatedLinks(hexagram: (typeof HEXAGRAMS)[number]) {
  const pairedNum = PAIRED_HEXAGRAMS[hexagram.number];
  const pairedHex = HEXAGRAMS.find((item) => item.number === pairedNum);
  const links = [
    { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Cast a six-line hexagram in the browser." },
  ];

  if (pairedHex) {
    links.push({
      title: `Hexagram ${pairedHex.number}: ${pairedHex.name} (${pairedHex.chinese})`,
      href: `/i-ching/hexagram-${pairedHex.number}`,
      description: `The paired hexagram in the King Wen sequence. ${pairedHex.judgment}`,
    });
  }

  links.push({
    title: "I Ching Overview",
    href: "/i-ching",
    description: "Complete guide to the 64 hexagrams and how to use them.",
  });

  return links;
}

function createHexagramPage(hexagram: (typeof HEXAGRAMS)[number]): IChingContentPage {
  const slug = `hexagram-${hexagram.number}`;
  const path = `/i-ching/${slug}`;
  const lowerTrigram = TRIGRAM_NAMES[hexagram.binary.slice(0, 3)] ?? hexagram.binary.slice(0, 3);
  const upperTrigram = TRIGRAM_NAMES[hexagram.binary.slice(3, 6)] ?? hexagram.binary.slice(3, 6);

  return buildPage({
    slug,
    path,
    title: `Hexagram ${hexagram.number}: ${hexagram.name} (${hexagram.chinese})`,
    description: `I Ching Hexagram ${hexagram.number}, ${hexagram.name}, explains ${hexagram.judgment.toLowerCase()}`,
    entityName: `Hexagram ${hexagram.number}: ${hexagram.name}`,
    entityType: "DefinedTerm",
    subtitle: `Judgment, image, and reflective use for Hexagram ${hexagram.number}.`,
    directAnswer: hexagramDirectAnswers[hexagram.number] ?? `Hexagram ${hexagram.number}, ${hexagram.name} (${hexagram.chinese}), points to ${hexagram.judgment.toLowerCase()} Its image says: ${hexagram.image} Use it as a structured mirror for the present situation, then compare changing lines when the cast shows movement.`,
    breadcrumbs: breadcrumbs(`Hexagram ${hexagram.number}`, path),
    schema: {
      headline: "",
      description: "",
      url: "",
      alternateName: [hexagram.chinese, hexagram.name],
      datePublished: hexagramDate(hexagram.number),
      dateModified: hexagramModDate(hexagram.number),
    },
    stats: [
      { value: String(hexagram.number), label: "Hexagram number", description: "Position in the King Wen sequence." },
      { value: "6", label: "Lines", description: "Every hexagram has six yin or yang positions." },
      { value: hexagram.binary, label: "Line pattern", description: "1 marks yang and 0 marks yin from bottom upward." },
    ],
    citations: [
      { label: "Richard Wilhelm & Cary Baynes, The I Ching or Book of Changes (1950)", source: "Classical source for hexagram judgments and images." },
      { label: "King Wen sequence (周文王, ~1000 BCE)", source: "Traditional ordering of the 64 hexagrams attributed to King Wen of Zhou." },
    ],
    sections: hexagramSections[hexagram.number] ?? [
      {
        heading: `What Hexagram ${hexagram.number} describes`,
        content: (
          <>
            <p>{hexagram.judgment}</p>
            <p>
              Hexagram {hexagram.number} is built from two trigrams: {upperTrigram} above and {lowerTrigram} below. In the King Wen sequence, this pairing creates a specific image of how two forces interact — one above, one below — and what that interaction asks of the person consulting the oracle.
            </p>
            <p>
              Read this hexagram in relation to your question. Its value is not a fixed answer; it is a structured image of the present pattern. The classical Judgment describes the situation; the Image describes the appropriate response.
            </p>
          </>
        ),
      },
      {
        heading: "The image and its practical lesson",
        content: (
          <>
            <p>
              {hexagram.image} This image is not decorative — it is the practical instruction. Classical I Ching practice treats the Image as the action layer: what the superior person does when facing this hexagram's situation.
            </p>
            <p>
              In practice, this asks you to notice where the situation is moving, what is stable, and what needs restraint or timely action. The image often points to a quality of attention rather than a specific outcome.
            </p>
          </>
        ),
      },
      {
        heading: "Modern applications",
        content: (
          <>
            <p>
              Contemporary readers use Hexagram {hexagram.number} most often in contexts involving {hexagram.judgment.toLowerCase().includes("persever") ? "sustained effort and long-term commitment" : hexagram.judgment.toLowerCase().includes("small") ? "careful, incremental progress" : hexagram.judgment.toLowerCase().includes("great") ? "significant undertakings and major decisions" : "timing, transitions, and relationship dynamics"}. The hexagram does not prescribe a single action — it describes a pattern and asks what response fits the moment.
            </p>
            <p>
              A useful practice: after reading the Judgment and Image, write one sentence about how the hexagram's pattern appears in your current situation. That translation from symbol to context is where the I Ching's value lies.
            </p>
          </>
        ),
      },
      {
        heading: "Changing-line context",
        content: (
          <>
            <p>
              If this hexagram appears with changing lines, compare it with the relating hexagram. The primary hexagram describes the present pattern; the relating hexagram shows the direction of change. Old yang lines (moving yang) and old yin lines (moving yin) are the ones that change — they carry the most specific guidance for the question.
            </p>
            <p>
              When multiple lines change, classical practice varies: some traditions read all changing lines together, others prioritize the lowest or highest. The most practical approach for beginners is to read the primary hexagram first, then use the relating hexagram to understand where the situation is heading.
            </p>
          </>
        ),
      },
    ],
    faqs: hexagramFaqs[hexagram.number] ?? defaultFaqs,
    relatedLinks: buildHexagramRelatedLinks(hexagram),
    cta: cta(`Cast Hexagram ${hexagram.number} context`),
  });
}

export const allIChingPages = [overview, ...introTopics.map(createIntroPage), ...HEXAGRAMS.map(createHexagramPage)];

export function getIChingPage(slug: string): IChingContentPage | undefined {
  return allIChingPages.find((page) => page.slug === slug);
}

export function getIChingStaticParams(): Array<{ slug?: string[] }> {
  return allIChingPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
