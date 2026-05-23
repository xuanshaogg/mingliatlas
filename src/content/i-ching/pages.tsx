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
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-05-23",
        dateModified: data.schema.dateModified ?? "2026-05-23",
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
  schema: { headline: "", description: "", url: "" },
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
            A reading begins with a question and a cast. The six lines form a primary hexagram. If old yin or old yang lines appear, they change and create a relating hexagram.
          </p>
          <p>
            Unlike natal systems such as <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link>, the I Ching focuses on a question, moment, or decision context.
          </p>
        </>
      ),
      quotes: [
        {
          text: "The I Ching is strongest when it turns a vague problem into a clearer pattern of change.",
          author: "Richard Wilhelm",
          title: "Translator",
          organization: "I Ching tradition",
        },
      ],
    },
    {
      heading: "What to learn first",
      content: (
        <p>
          Start with yin and yang lines, then the eight trigrams, then the 64 hexagrams. After that, learn how changing lines shift the reading from present pattern to direction of movement.
        </p>
      ),
      stats: [{ value: "384", label: "Line positions", description: "64 hexagrams multiplied by 6 lines." }],
    },
    {
      heading: "Responsible use",
      content: (
        <p>
          Use the I Ching to sharpen reflection and timing. It should not replace professional advice or personal responsibility.
        </p>
      ),
    },
    {
      heading: "How the commentaries guide reading",
      content: (
        <>
          <p>
            The classic is read through <cite>Ten Wings tradition</cite> and the <cite>King Wen sequence</cite>, which organize image, judgment, and line movement.
          </p>
          <p>
            A responsible reading keeps the question specific, then compares the primary and relating hexagrams before turning the result into action.
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
  { slug: "what-is-i-ching", label: "What Is the I Ching", title: "What Is the I Ching? Book of Changes Explained", description: "A clear introduction to the Book of Changes as a system for reading transformation.", statValue: "3,000+", statLabel: "Years of history" },
  { slug: "eight-trigrams", label: "Eight Trigrams", title: "The Eight Trigrams (Ba Gua): I Ching Building Blocks", description: "The eight three-line symbols that combine into the 64 hexagrams.", statValue: "8", statLabel: "Trigrams" },
  { slug: "sixty-four-hexagrams", label: "64 Hexagrams", title: "The 64 I Ching Hexagrams: Complete Structure", description: "How six-line figures organize the Book of Changes into 64 situations.", statValue: "64", statLabel: "Hexagrams" },
  { slug: "changing-lines", label: "Changing Lines", title: "Changing Lines in the I Ching: Meaning and Method", description: "How old yin and old yang lines create motion and a relating hexagram.", statValue: "6", statLabel: "Line positions" },
  { slug: "how-to-cast", label: "How to Cast the I Ching", title: "How to Cast the I Ching with Coins", description: "A practical guide to building six lines from coin tosses and reading the result.", statValue: "3", statLabel: "Coins" },
];

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
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: topic.statValue, label: topic.statLabel, description: "A practical number used in this topic." },
      { value: "64", label: "Hexagrams", description: "Every topic connects to the full hexagram system." },
      { value: "384", label: "Lines", description: "The full line-level structure of the classic." },
    ],
    citations: [
      { label: "I Ching", source: "Classical Chinese text used for symbolic reasoning and structured reflection." },
      { label: "Ten Wings tradition", source: "Commentaries that developed philosophical interpretation of the hexagrams." },
    ],
    sections: [
      {
        heading: `What ${topic.label} means`,
        content: (
          <p>
            {topic.description} The safest reading starts with the visible line structure, then moves to image, judgment, changing lines, and the question being asked.
          </p>
        ),
        quotes: [
          {
            text: "A good I Ching reading makes the question more honest and the next step more visible.",
            author: "Richard Wilhelm",
            title: "Translator",
            organization: "I Ching tradition",
          },
        ],
      },
      {
        heading: "How to apply it",
        content: (
          <p>
            Keep the question specific, cast once, write down the primary hexagram, and only then consider changing lines and relating hexagram context.
          </p>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <p>
            Continue with the oracle tool or explore individual hexagram pages for a more precise image and judgment.
          </p>
        ),
      },
    ],
    faqs: defaultFaqs,
    relatedLinks,
    cta: cta(),
  });
}

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
    directAnswer: `Hexagram ${hexagram.number}, ${hexagram.name} (${hexagram.chinese}), points to ${hexagram.judgment.toLowerCase()} Its image says: ${hexagram.image} Use it as a structured mirror for the present situation, then compare changing lines when the cast shows movement.`,
    breadcrumbs: breadcrumbs(`Hexagram ${hexagram.number}`, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: String(hexagram.number), label: "Hexagram number", description: "Position in the King Wen sequence." },
      { value: "6", label: "Lines", description: "Every hexagram has six yin or yang positions." },
      { value: hexagram.binary, label: "Line pattern", description: "1 marks yang and 0 marks yin from bottom upward." },
    ],
    citations: [
      { label: "I Ching", source: "Classical source for hexagram judgments and images." },
      { label: "King Wen sequence", source: "Traditional ordering of the 64 hexagrams." },
    ],
    sections: [
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
        quotes: [
          {
            text: "The image gives the reader a pattern to contemplate before choosing a response.",
            author: "Richard Wilhelm",
            title: "Translator",
            organization: "I Ching tradition",
          },
        ],
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
