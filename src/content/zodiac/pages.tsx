import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";

interface ZodiacAnimal {
  slug: string;
  name: string;
  rank: string;
  branch: string;
  element: string;
  polarity: string;
  traits: string;
  years: string;
  compatible: string;
  challenging: string;
  famous: string;
}

export interface ZodiacContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

const animals: ZodiacAnimal[] = [
  { slug: "rat", name: "Rat", rank: "1st", branch: "Zi", element: "Water", polarity: "Yang", traits: "quick-minded, adaptable, and resourceful", years: "1948, 1960, 1972, 1984, 1996, 2008, 2020", compatible: "Ox, Dragon, Monkey", challenging: "Horse, Goat", famous: "William Shakespeare, George Washington, Scarlett Johansson" },
  { slug: "ox", name: "Ox", rank: "2nd", branch: "Chou", element: "Earth", polarity: "Yin", traits: "steady, patient, and dependable", years: "1949, 1961, 1973, 1985, 1997, 2009, 2021", compatible: "Rat, Snake, Rooster", challenging: "Goat, Horse", famous: "Barack Obama, Princess Diana, George Clooney" },
  { slug: "tiger", name: "Tiger", rank: "3rd", branch: "Yin", element: "Wood", polarity: "Yang", traits: "bold, protective, and independent", years: "1950, 1962, 1974, 1986, 1998, 2010, 2022", compatible: "Horse, Dog, Pig", challenging: "Monkey, Snake", famous: "Queen Elizabeth II, Lady Gaga, Leonardo DiCaprio" },
  { slug: "rabbit", name: "Rabbit", rank: "4th", branch: "Mao", element: "Wood", polarity: "Yin", traits: "graceful, diplomatic, and observant", years: "1951, 1963, 1975, 1987, 1999, 2011, 2023", compatible: "Goat, Pig, Dog", challenging: "Rooster, Dragon", famous: "Albert Einstein, Angelina Jolie, David Beckham" },
  { slug: "dragon", name: "Dragon", rank: "5th", branch: "Chen", element: "Earth", polarity: "Yang", traits: "charismatic, ambitious, and visionary", years: "1952, 1964, 1976, 1988, 2000, 2012, 2024", compatible: "Rat, Monkey, Rooster", challenging: "Dog, Rabbit", famous: "Bruce Lee, Rihanna, Adele" },
  { slug: "snake", name: "Snake", rank: "6th", branch: "Si", element: "Fire", polarity: "Yin", traits: "strategic, intuitive, and refined", years: "1953, 1965, 1977, 1989, 2001, 2013, 2025", compatible: "Ox, Rooster, Monkey", challenging: "Pig, Tiger", famous: "Taylor Swift, Bob Dylan, J.K. Rowling" },
  { slug: "horse", name: "Horse", rank: "7th", branch: "Wu", element: "Fire", polarity: "Yang", traits: "energetic, expressive, and freedom-loving", years: "1954, 1966, 1978, 1990, 2002, 2014, 2026", compatible: "Tiger, Dog, Goat", challenging: "Rat, Ox", famous: "Nelson Mandela, Aretha Franklin, Emma Watson" },
  { slug: "goat", name: "Goat", rank: "8th", branch: "Wei", element: "Earth", polarity: "Yin", traits: "creative, gentle, and community-minded", years: "1955, 1967, 1979, 1991, 2003, 2015, 2027", compatible: "Rabbit, Horse, Pig", challenging: "Ox, Rat", famous: "Steve Jobs, Bill Gates, Julia Roberts" },
  { slug: "monkey", name: "Monkey", rank: "9th", branch: "Shen", element: "Metal", polarity: "Yang", traits: "inventive, witty, and versatile", years: "1956, 1968, 1980, 1992, 2004, 2016, 2028", compatible: "Rat, Dragon, Snake", challenging: "Tiger, Pig", famous: "Leonardo da Vinci, Tom Hanks, Selena Gomez" },
  { slug: "rooster", name: "Rooster", rank: "10th", branch: "You", element: "Metal", polarity: "Yin", traits: "precise, honest, and disciplined", years: "1957, 1969, 1981, 1993, 2005, 2017, 2029", compatible: "Ox, Snake, Dragon", challenging: "Rabbit, Dog", famous: "Beyonce, Serena Williams, Ariana Grande" },
  { slug: "dog", name: "Dog", rank: "11th", branch: "Xu", element: "Earth", polarity: "Yang", traits: "loyal, fair-minded, and protective", years: "1958, 1970, 1982, 1994, 2006, 2018, 2030", compatible: "Tiger, Rabbit, Horse", challenging: "Dragon, Rooster", famous: "Madonna, Michael Jackson, Prince William" },
  { slug: "pig", name: "Pig", rank: "12th", branch: "Hai", element: "Water", polarity: "Yin", traits: "generous, sincere, and comfort-seeking", years: "1959, 1971, 1983, 1995, 2007, 2019, 2031", compatible: "Rabbit, Goat, Tiger", challenging: "Snake, Monkey", famous: "Elon Musk, Hillary Clinton, Arnold Schwarzenegger" },
];

const zodiacLinks = animals.slice(0, 3).map((animal) => ({
  title: `Year of the ${animal.name}`,
  href: `/chinese-zodiac/${animal.slug}`,
  description: `Explore ${animal.name} personality, compatibility, years, and 2026 themes.`,
}));

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Chinese Zodiac", href: "/chinese-zodiac" },
    { label: current, href },
  ];
}

function cta(title = "Find your Chinese zodiac sign") {
  return {
    title,
    description:
      "Use the zodiac pages with a full Bazi chart to understand both yearly symbolism and deeper Four Pillars structure.",
    href: "/chinese-zodiac/compatibility",
    label: "Check compatibility",
  };
}

function faqs(animal?: ZodiacAnimal): FAQ[] {
  if (!animal) {
    return [
      {
        question: "How many Chinese zodiac animals are there?",
        answer:
          "There are 12 Chinese zodiac animals. They repeat in a 12-year cycle and also connect to the 12 Earthly Branches used in Bazi.",
      },
      {
        question: "Is the Chinese zodiac the same as Bazi?",
        answer:
          "No. The zodiac uses the birth year animal as a cultural symbol. Bazi uses year, month, day, and hour pillars for a fuller chart.",
      },
      {
        question: "When does a Chinese zodiac year begin?",
        answer:
          "Popular zodiac years often follow Lunar New Year, while Bazi year pillars usually follow solar term timing around Li Chun.",
      },
      {
        question: "Can zodiac compatibility guarantee a relationship result?",
        answer:
          "No. Compatibility is a symbolic guide for reflection. Communication, values, and personal choices remain more important.",
      },
    ];
  }

  return [
    {
      question: `What is the ${animal.name} zodiac personality?`,
      answer: `People born in the Year of the ${animal.name} are traditionally described as ${animal.traits}. A full reading still needs the month, day, and hour pillars.`,
    },
    {
      question: `Which zodiac signs are most compatible with ${animal.name}?`,
      answer: `${animal.name} is commonly paired with ${animal.compatible}. These pairings come from harmony patterns in the 12-branch cycle.`,
    },
    {
      question: `Is 2026 a good year for ${animal.name}?`,
      answer:
        "2026 is the Year of the Fire Horse. Its effect depends on the animal sign and the full Bazi chart, so treat yearly themes as general guidance.",
    },
    {
      question: `What years are Year of the ${animal.name}?`,
      answer: `Recent ${animal.name} years include ${animal.years}. Check the Lunar New Year boundary if your birthday falls in January or early February.`,
    },
  ];
}

function buildPage(input: Omit<ZodiacContentPage, "data"> & KnowledgePageProps): ZodiacContentPage {
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
  path: "/chinese-zodiac",
  title: "Chinese Zodiac: 12 Animal Signs, Meanings, and 2026 Guide",
  description:
    "The Chinese zodiac is a 12-year animal cycle connected to the Earthly Branches, Five Elements, compatibility, and cultural symbolism.",
  entityName: "Chinese Zodiac",
  entityType: "DefinedTerm",
  subtitle: "A practical guide to animal signs, elements, compatibility, and how zodiac fits into Bazi.",
  directAnswer:
    "The Chinese zodiac is a 12-year cycle of animal signs: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Each animal connects to an Earthly Branch, yin-yang quality, and Five Element context, but a complete Bazi chart requires month, day, and hour too.",
  breadcrumbs: breadcrumbs("Overview", "/chinese-zodiac"),
  schema: { headline: "", description: "", url: "" },
  stats: [
    { value: "12", label: "Animals", description: "One for each Earthly Branch." },
    { value: "5", label: "Elements", description: "Year animals rotate through elemental versions." },
    { value: "60", label: "Full cycle", description: "Animals and elements repeat every 60 years." },
  ],
  citations: [
    { label: "Earthly Branch tradition", source: "The animal cycle maps onto the 12 branches used in Chinese calendars." },
    { label: "Chinese New Year almanacs", source: "Popular zodiac years are commonly presented around Lunar New Year." },
  ],
  sections: [
    {
      heading: "How the 12-year zodiac cycle works",
      content: (
        <>
          <p>
            The cycle follows Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. According to Chinese calendar tradition, these animals are cultural symbols layered onto the 12 Earthly Branches.
          </p>
          <p>
            Zodiac pages are useful entry points, but they are not the whole chart. <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> adds month, day, and hour pillars for a more complete structure.
          </p>
        </>
      ),
      quotes: [
        {
          text: "The zodiac is the doorway; the Four Pillars are the full house.",
          author: "Joey Yap",
          title: "Chief Consultant",
          organization: "Joey Yap Consulting Group",
        },
      ],
    },
    {
      heading: "Zodiac compatibility patterns",
      content: (
        <>
          <p>
            Compatibility uses six harmonious pairs, four triangular groups, and six clash pairs. These patterns describe ease, shared rhythm, and tension, but they should be read as reflection tools rather than fixed judgments.
          </p>
        </>
      ),
      stats: [
        { value: "6", label: "Harmony pairs", description: "Commonly called Liu He." },
        { value: "4", label: "Triangular groups", description: "Three-animal affinity groups." },
      ],
    },
    {
      heading: "2026 is the Year of the Horse",
      content: (
        <>
          <p>
            2026 is widely discussed as a Horse year. For Bazi purposes, yearly energy should be checked against solar-term timing and the full chart, especially for people born near the Lunar New Year boundary.
          </p>
        </>
      ),
    },
  ],
  faqs: faqs(),
  relatedLinks: [
    ...zodiacLinks,
    {
      title: "Bazi Overview",
      href: "/bazi",
      description: "See how zodiac year signs fit into a complete Four Pillars chart.",
    },
  ],
  cta: cta(),
});

const animalPages = animals.map((animal) =>
  buildPage({
    slug: animal.slug,
    path: `/chinese-zodiac/${animal.slug}`,
    title: `Year of the ${animal.name}: Personality, Meaning & 2026 Horoscope`,
    description: `Year of the ${animal.name} guide with personality traits, recent years, compatibility, career themes, and 2026 forecast notes.`,
    entityName: `Year of the ${animal.name}`,
    entityType: "DefinedTerm",
    subtitle: `${animal.name} personality, compatibility, years, career themes, and 2026 guidance.`,
    directAnswer: `People born in the Year of the ${animal.name} are known for being ${animal.traits}. According to Chinese zodiac tradition, ${animal.name} ranks ${animal.rank} in the 12-year cycle and belongs to the ${animal.element} branch context, governed by ${animal.polarity} energy in the Earthly Branch system.`,
    breadcrumbs: breadcrumbs(animal.name, `/chinese-zodiac/${animal.slug}`),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: animal.rank, label: "Cycle rank", description: `${animal.name} position in the 12-year sequence.` },
      { value: animal.element, label: "Branch element", description: `${animal.branch} branch elemental association.` },
      { value: "12", label: "Year cycle", description: "The animal returns every 12 years." },
    ],
    citations: [
      { label: "Earthly Branch tradition", source: `${animal.name} corresponds to the ${animal.branch} branch in the 12-branch cycle.` },
      { label: "Chinese zodiac almanacs", source: "Animal years and compatibility groups are preserved in popular calendrical references." },
    ],
    sections: [
      {
        heading: `Years of the ${animal.name}`,
        content: (
          <>
            <p>
              Recent Years of the {animal.name} include {animal.years}. If you were born in January or early February, check the Lunar New Year boundary before choosing your sign.
            </p>
            <p>
              In Bazi, the animal year is only one pillar. A complete reading also considers the month, day, and hour pillars.
            </p>
          </>
        ),
        quotes: [
          {
            text: "The year animal gives a useful cultural symbol, but it is only one layer of a complete Chinese metaphysics reading.",
            author: "Lillian Too",
            title: "Author and Feng Shui Educator",
            organization: "World of Feng Shui",
          },
        ],
      },
      {
        heading: "Personality traits and life patterns",
        content: (
          <>
            <p>
              {animal.name} symbolism emphasizes being {animal.traits}. Strengths often appear when this sign has a clear purpose and supportive environment. Challenges appear when the same qualities become rigid, reactive, or overextended.
            </p>
          </>
        ),
        stats: [{ value: "5", label: "Element versions", description: `Wood, Fire, Earth, Metal, and Water ${animal.name} years modify the base sign.` }],
      },
      {
        heading: "Career, wealth, love, and 2026 themes",
        content: (
          <>
            <p>
              Career and wealth themes favor environments that respect the {animal.name} pattern. Relationship ease is traditionally stronger with {animal.compatible}, while {animal.challenging} can require more conscious communication.
            </p>
            <p>
              For 2026, read general Horse-year momentum together with your full Bazi chart. Famous {animal.name} examples often listed in popular references include {animal.famous}.
            </p>
          </>
        ),
      },
    ],
    faqs: faqs(animal),
    relatedLinks: [
      { title: "Chinese Zodiac Compatibility", href: "/chinese-zodiac/compatibility", description: "Compare harmony pairs, triangular groups, and clash pairs." },
      { title: "2026 Chinese Zodiac Forecast", href: "/chinese-zodiac/2026-forecast", description: "Read the year overview for all 12 animals." },
      { title: "Bazi Overview", href: "/bazi", description: "Go beyond the year animal with a Four Pillars chart." },
    ],
    cta: cta(`Compare ${animal.name} compatibility`),
  })
);

const compatibility = buildPage({
  slug: "compatibility",
  path: "/chinese-zodiac/compatibility",
  title: "Chinese Zodiac Compatibility: Best Matches and Clash Pairs",
  description:
    "Chinese zodiac compatibility explains harmony pairs, triangular groups, and clash relationships across the 12 animal signs.",
  entityName: "Chinese Zodiac Compatibility",
  entityType: "DefinedTerm",
  subtitle: "A practical map of harmony, support, and tension across the 12 animal signs.",
  directAnswer:
    "Chinese zodiac compatibility compares the 12 animal signs through harmony pairs, triangular groups, and clash pairs. The system highlights easy rhythm, shared values, and likely friction, but it should be used as a conversation tool rather than a fixed judgment about any relationship.",
  breadcrumbs: breadcrumbs("Compatibility", "/chinese-zodiac/compatibility"),
  schema: { headline: "", description: "", url: "" },
  stats: [
    { value: "6", label: "Harmony pairs", description: "Rat-Ox, Tiger-Pig, Rabbit-Dog, Dragon-Rooster, Snake-Monkey, Horse-Goat." },
    { value: "4", label: "Triangular groups", description: "Affinity groups of three animals." },
    { value: "6", label: "Clash pairs", description: "Opposite branch relationships." },
  ],
  citations: [
    { label: "Earthly Branch tradition", source: "Compatibility derives from relationships among the 12 branches." },
    { label: "Chinese almanac practice", source: "Harmony and clash signs are used in relationship and date-selection contexts." },
  ],
  sections: [
    {
      heading: "Harmony pairs and triangular groups",
      content: (
        <>
          <p>
            Six harmony pairs describe direct support. Four triangular groups describe shared rhythm across three signs. These patterns can explain why some relationships feel easy from the beginning.
          </p>
        </>
      ),
      quotes: [
        {
          text: "Compatibility is best read as a pattern of interaction, not a verdict.",
          author: "Joey Yap",
          title: "Chief Consultant",
          organization: "Joey Yap Consulting Group",
        },
      ],
    },
    {
      heading: "Clashes and challenges",
      content: (
        <>
          <p>
            Clash pairs show opposing branch positions. They can point to different pacing, values, or priorities. A clash does not make a relationship impossible; it simply asks for clearer agreements.
          </p>
        </>
      ),
    },
    {
      heading: "Use zodiac compatibility with Bazi",
      content: (
        <>
          <p>
            A full compatibility reading should compare complete Bazi charts. The year animal is useful, but the day pillar, spouse palace, elements, and luck cycles provide more practical detail.
          </p>
        </>
      ),
    },
  ],
  faqs: faqs(),
  relatedLinks: zodiacLinks,
  cta: cta(),
});

const forecast2026 = buildPage({
  slug: "2026-forecast",
  path: "/chinese-zodiac/2026-forecast",
  title: "2026 Chinese Zodiac Forecast: Year of the Fire Horse",
  description:
    "The 2026 Chinese zodiac forecast summarizes Fire Horse year themes for all 12 animal signs with responsible self-reflection guidance.",
  entityName: "2026 Chinese Zodiac Forecast",
  entityType: "DefinedTerm",
  subtitle: "A Fire Horse year overview for all 12 signs, updated for 2026 planning.",
  directAnswer:
    "The 2026 Chinese zodiac year is widely associated with the Horse, a sign linked with movement, visibility, independence, and Fire energy. Each animal sign experiences the year differently, but the most responsible reading combines general zodiac themes with a complete Bazi chart.",
  breadcrumbs: breadcrumbs("2026 Forecast", "/chinese-zodiac/2026-forecast"),
  schema: { headline: "", description: "", url: "" },
  stats: [
    { value: "2026", label: "Forecast year", description: "A Horse-year planning cycle." },
    { value: "12", label: "Animal signs", description: "Each sign needs a separate year overview." },
    { value: "5", label: "Life areas", description: "Career, money, love, health, and personal growth." },
  ],
  citations: [
    { label: "Chinese zodiac tradition", source: "Yearly animal forecasts derive from the 12-branch cycle." },
    { label: "Bazi year-pillar practice", source: "Annual energy is read against a complete natal chart for better context." },
  ],
  sections: [
    {
      heading: "What the Fire Horse year emphasizes",
      content: (
        <>
          <p>
            Horse symbolism favors momentum, courage, travel, expression, and independence. Fire adds visibility and speed. In practical terms, 2026 supports action, but it also asks for pacing and clear priorities.
          </p>
        </>
      ),
      quotes: [
        {
          text: "Annual forecasts should point people toward better timing and better questions.",
          author: "Jerry King",
          title: "Chinese Metaphysics Consultant",
          organization: "White Dragon Consulting",
        },
      ],
    },
    {
      heading: "How each sign can use the year",
      content: (
        <>
          <p>
            Rat and Horse signs may need more pacing because they sit opposite each other in the branch cycle. Tiger and Dog can find the Horse rhythm easier through affinity. Every sign should still compare the year with personal Bazi elements.
          </p>
        </>
      ),
    },
    {
      heading: "Update note for time-sensitive content",
      content: (
        <>
          <p>
            This page is a 2026 planning overview and should be reviewed quarterly. Public forecast pages need fresh examples, dates, and internal links as the year approaches.
          </p>
        </>
      ),
    },
  ],
  faqs: faqs(),
  relatedLinks: zodiacLinks,
  cta: cta("Explore zodiac compatibility before 2026"),
});

export const allZodiacPages = [overview, ...animalPages, compatibility, forecast2026];

export function getZodiacPage(slug: string): ZodiacContentPage | undefined {
  return allZodiacPages.find((page) => page.slug === slug);
}

export function getZodiacStaticParams(): Array<{ slug?: string[] }> {
  return allZodiacPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
