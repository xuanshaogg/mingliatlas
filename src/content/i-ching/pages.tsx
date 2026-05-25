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
  schema: { headline: "", description: "", url: "", datePublished: "2025-11-10", dateModified: "2026-01-20" },
  stats: [
    { value: "64", label: "Hexagrams", description: "The complete Book of Changes structure." },
    { value: "8", label: "Trigrams", description: "Three-line building blocks of hexagrams." },
    { value: "6", label: "Lines", description: "Every hexagram has six line positions." },
  ],
  citations: [
    { label: "I Ching", source: "Classical Chinese text also known as the Book of Changes." },
    { label: "Ten Wings tradition", source: "Commentarial tradition that shaped philosophical readings of the text." },
  ],
  sections: [
    {
      heading: "How the I Ching works",
      content: (
        <>
          <p>
            A reading begins with a question and a cast. The six lines form a primary hexagram. If old yin or old yang lines appear, they change and create a relating hexagram that shows the direction of movement.
          </p>
          <p>
            Unlike natal systems such as <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, the I Ching focuses on a specific question, moment, or decision context rather than a fixed birth chart. The same person can receive different hexagrams on different days because the question and timing change.
          </p>
        </>
      ),
    },
    {
      heading: "I Ching vs other Chinese systems",
      content: (
        <>
          <p>
            The I Ching differs from Bazi and Ziwei in one key way: it is question-based rather than birth-based. Bazi reads a fixed natal chart to understand personality and timing cycles. The I Ching responds to a specific moment and question. Feng Shui reads spatial environment. The I Ching reads the pattern of change in a situation.
          </p>
          <p>
            This makes the I Ching useful alongside natal systems. A Bazi chart can show a decade of pressure; the I Ching can help frame a specific decision within that decade. Use them as complementary lenses, not competing answers.
          </p>
        </>
      ),
      stats: [
        { value: "64", label: "Hexagrams", description: "Each describes a distinct pattern of change." },
        { value: "384", label: "Line positions", description: "64 hexagrams multiplied by 6 lines." },
        { value: "8", label: "Trigrams", description: "Three-line building blocks that combine into hexagrams." },
      ],
    },
    {
      heading: "Common beginner mistakes",
      content: (
        <>
          <p>
            The most common mistake is treating the hexagram as a fixed answer. A hexagram describes a pattern and a direction of movement, not a guaranteed outcome. The same hexagram can mean different things depending on the question, the changing lines, and the context.
          </p>
          <p>
            Another mistake is casting multiple times for the same question hoping for a better result. Classical practice casts once, reads carefully, and sits with the image before acting. Repeated casting for the same question usually produces confusion rather than clarity.
          </p>
          <p>
            A third mistake is skipping the question. The I Ching works best when the question is specific and honest. Vague questions produce vague readings.
          </p>
        </>
      ),
    },
    {
      heading: "How to use the I Ching responsibly",
      content: (
        <>
          <p>
            The classic is read through <cite>Ten Wings tradition</cite> and the <cite>King Wen sequence</cite>, which organize image, judgment, and line movement. A responsible reading keeps the question specific, then compares the primary and relating hexagrams before turning the result into action.
          </p>
          <p>
            Use the I Ching to sharpen reflection and timing. It should not replace professional advice, medical judgment, or personal responsibility. The best use is to clarify what you already sense, not to outsource a decision entirely.
          </p>
          <p>
            Start with the <Link href="/tools/i-ching-oracle" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">free oracle tool</Link>, then explore individual <Link href="/i-ching/sixty-four-hexagrams" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">hexagram pages</Link> to understand the images more deeply.
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
  { slug: "eight-trigrams", datePublished: "2025-11-22", dateModified: "2026-02-01", label: "Eight Trigrams", title: "The Eight Trigrams (Ba Gua): I Ching Building Blocks", description: "The eight three-line symbols that combine into the 64 hexagrams.", statValue: "8", statLabel: "Trigrams" },
  { slug: "sixty-four-hexagrams", datePublished: "2025-12-01", dateModified: "2026-02-10", label: "64 Hexagrams", title: "The 64 I Ching Hexagrams: Complete Structure", description: "How six-line figures organize the Book of Changes into 64 situations.", statValue: "64", statLabel: "Hexagrams" },
  { slug: "changing-lines", datePublished: "2025-12-08", dateModified: "2026-02-15", label: "Changing Lines", title: "Changing Lines in the I Ching: Meaning and Method", description: "How old yin and old yang lines create motion and a relating hexagram.", statValue: "6", statLabel: "Line positions" },
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
      { label: "I Ching", source: "Classical Chinese text used for symbolic reasoning and structured reflection." },
      { label: "Ten Wings tradition", source: "Commentaries that developed philosophical interpretation of the hexagrams." },
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
  1: "Hexagram 1, The Creative (乾 Qian), describes a moment of pure creative momentum — conditions are aligned, energy is available, and the direction is clear. It asks whether your momentum is guided by disciplined purpose or by restless force. Use it when considering a major initiative, leadership commitment, or sustained effort that requires both direction and endurance.",
  2: "Hexagram 2, The Receptive (坤 Kun), is the complement to Hexagram 1: where Qian initiates, Kun receives, sustains, and completes. It is frequently misread as passive — in classical interpretation, Kun is the active force of sustaining. Use it when your most useful role is support rather than initiative, or when a situation needs cultivation rather than dramatic action.",
  11: "Hexagram 11, Peace (泰 Tai), places Earth above Heaven — each moving toward the other, creating genuine exchange. It describes a moment of productive communication between levels: resources flow, effort is recognized, and cooperation is real. It is not a promise of permanence; it is an invitation to build something durable while conditions are favorable.",
  12: "Hexagram 12, Standstill (否 Pi), is the direct opposite of Peace: Heaven and Earth move away from each other, and exchange stops. It describes a blocked situation where pushing harder wastes resources. The classical advice is to conserve integrity, withdraw from empty exchange, and wait for conditions to shift rather than forcing movement through a closed channel.",
  24: "Hexagram 24, Return (复 Fu), shows a single yang line at the bottom of five yin lines — the image of the winter solstice, the first moment of turning. It describes the beginning of renewal after a difficult period: not a completed recovery, but the first genuine reorientation. The classical advice is to protect this fragile new energy with patience rather than rushing it into premature action.",
  29: "Hexagram 29, The Abysmal (坎 Kan), doubles the Water trigram — danger above and danger below. It describes not a single obstacle but a repeated pattern of challenge. The classical teaching is that water does not stop at an obstacle; it fills the hollow and flows on. The way through is sincerity and skill, not force or avoidance.",
  36: "Hexagram 36, Darkening of the Light (明夷 Ming Yi), shows the sun entering the earth — clarity going underground in an unsupportive environment. The classical advice is to protect inner standards without broadcasting them where doing so invites suppression. It describes a temporary phase requiring strategic patience, not permanent self-concealment.",
  40: "Hexagram 40, Deliverance (解 Xie), shows Thunder above Water — a storm breaking after sustained tension. It describes the moment when a difficulty finally releases. The classical advice is to act quickly once the cause is understood: forgive what no longer needs holding, resolve what can be resolved, and do not reintroduce the tension by dwelling on it.",
  47: "Hexagram 47, Oppression (困 Kun), shows a lake without water — resources exhausted, expression blocked, and the usual channels closed. It describes a period of genuine constraint where words carry little weight and effort produces little result. The classical advice is to conserve inner resources, maintain integrity under pressure, and trust that the constraint is temporary.",
  49: "Hexagram 49, Revolution (革 Ge), shows Fire within the Lake — two forces that cannot coexist indefinitely. It describes a situation where real change is necessary, not cosmetic adjustment. The classical conditions for successful revolution are timing, legitimacy, and clear need. Change that lacks any of these three tends to create new problems rather than resolving the old ones.",
  4: "Hexagram 4, Youthful Folly (蒙 Meng), shows Water below the Mountain — a spring that has not yet found its course. It describes a learning situation where the student must come to the teacher, not the other way around. The classical advice is that genuine learning requires honest questions, patience with repetition, and the humility to not know before you know.",
  6: "Hexagram 6, Conflict (讼 Song), shows Heaven above Water — two forces moving in opposite directions. It describes a dispute that has not yet escalated but could. The classical advice is to examine the origin of the disagreement before acting: most conflicts that reach a court could have been resolved earlier by clarifying terms, acknowledging partial fault, or withdrawing from an untenable position.",
  7: "Hexagram 7, The Army (师 Shi), shows Water within Earth — a reservoir of organized force held in reserve. It describes collective effort that requires discipline, clear leadership, and proportionate response. The classical advice is that the leader who mobilizes people must have the authority to do so, the discipline to direct them well, and the judgment to know when to stop.",
  17: "Hexagram 17, Following (随 Sui), shows Thunder within the Lake — movement that adapts to the season. It describes a situation where following is the correct response, but only if you choose what is genuinely worth following. The classical advice is to rest when rest is called for and to respond when response is called for, rather than forcing either activity or stillness.",
  25: "Hexagram 25, Innocence (无妄 Wu Wang), shows Thunder under Heaven — natural action without calculation. It describes a situation where acting without manipulation or hidden agenda is both the correct approach and the most effective one. The classical warning is that unexpected misfortune can arrive even when conduct is correct; the response is to accept it without resentment rather than to search for someone to blame.",
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
};

function createHexagramPage(hexagram: (typeof HEXAGRAMS)[number]): IChingContentPage {
  const slug = `hexagram-${hexagram.number}`;
  const path = `/i-ching/${slug}`;

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
    schema: { headline: "", description: "", url: "", datePublished: hexagramDate(hexagram.number), dateModified: hexagramModDate(hexagram.number) },
    stats: [
      { value: String(hexagram.number), label: "Hexagram number", description: "Position in the King Wen sequence." },
      { value: "6", label: "Lines", description: "Every hexagram has six yin or yang positions." },
      { value: hexagram.binary, label: "Line pattern", description: "1 marks yang and 0 marks yin from bottom upward." },
    ],
    citations: [
      { label: "I Ching", source: "Classical source for hexagram judgments and images." },
      { label: "King Wen sequence", source: "Traditional ordering of the 64 hexagrams." },
    ],
    sections: hexagramSections[hexagram.number] ?? [
      {
        heading: `Meaning of Hexagram ${hexagram.number}`,
        content: (
          <>
            <p>{hexagram.judgment}</p>
            <p>
              Read this hexagram in relation to your question. Its value is not a fixed answer; it is a structured image of the present pattern.
            </p>
          </>
        ),
      },
      {
        heading: "Image and practical reflection",
        content: (
          <p>
            {hexagram.image} In practice, this asks you to notice where the situation is moving, what is stable, and what needs restraint or timely action.
          </p>
        ),
      },
      {
        heading: "Changing-line context",
        content: (
          <p>
            If this hexagram appears with changing lines, compare it with the relating hexagram. The primary hexagram describes the present pattern, while the relating hexagram shows direction of change.
          </p>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks,
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
