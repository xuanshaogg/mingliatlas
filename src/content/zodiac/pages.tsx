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
  datePublished?: string;
  dateModified?: string;
}

export interface ZodiacContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

const animals: ZodiacAnimal[] = [
  { slug: "rat", datePublished: "2025-11-08", dateModified: "2026-01-20", name: "Rat", rank: "1st", branch: "Zi", element: "Water", polarity: "Yang", traits: "quick-minded, adaptable, and resourceful", years: "1948, 1960, 1972, 1984, 1996, 2008, 2020", compatible: "Ox, Dragon, Monkey", challenging: "Horse, Goat", famous: "William Shakespeare, George Washington, Scarlett Johansson" },
  { slug: "ox", datePublished: "2025-11-12", dateModified: "2026-01-22", name: "Ox", rank: "2nd", branch: "Chou", element: "Earth", polarity: "Yin", traits: "steady, patient, and dependable", years: "1949, 1961, 1973, 1985, 1997, 2009, 2021", compatible: "Rat, Snake, Rooster", challenging: "Goat, Horse", famous: "Barack Obama, Princess Diana, George Clooney" },
  { slug: "tiger", datePublished: "2025-11-16", dateModified: "2026-01-24", name: "Tiger", rank: "3rd", branch: "Yin", element: "Wood", polarity: "Yang", traits: "bold, protective, and independent", years: "1950, 1962, 1974, 1986, 1998, 2010, 2022", compatible: "Horse, Dog, Pig", challenging: "Monkey, Snake", famous: "Queen Elizabeth II, Lady Gaga, Leonardo DiCaprio" },
  { slug: "rabbit", datePublished: "2025-11-20", dateModified: "2026-01-26", name: "Rabbit", rank: "4th", branch: "Mao", element: "Wood", polarity: "Yin", traits: "graceful, diplomatic, and observant", years: "1951, 1963, 1975, 1987, 1999, 2011, 2023", compatible: "Goat, Pig, Dog", challenging: "Rooster, Dragon", famous: "Albert Einstein, Angelina Jolie, David Beckham" },
  { slug: "dragon", datePublished: "2025-11-24", dateModified: "2026-01-28", name: "Dragon", rank: "5th", branch: "Chen", element: "Earth", polarity: "Yang", traits: "charismatic, ambitious, and visionary", years: "1952, 1964, 1976, 1988, 2000, 2012, 2024", compatible: "Rat, Monkey, Rooster", challenging: "Dog, Rabbit", famous: "Bruce Lee, Rihanna, Adele" },
  { slug: "snake", datePublished: "2025-11-28", dateModified: "2026-01-30", name: "Snake", rank: "6th", branch: "Si", element: "Fire", polarity: "Yin", traits: "strategic, intuitive, and refined", years: "1953, 1965, 1977, 1989, 2001, 2013, 2025", compatible: "Ox, Rooster, Monkey", challenging: "Pig, Tiger", famous: "Taylor Swift, Bob Dylan, J.K. Rowling" },
  { slug: "horse", datePublished: "2025-12-02", dateModified: "2026-02-01", name: "Horse", rank: "7th", branch: "Wu", element: "Fire", polarity: "Yang", traits: "energetic, expressive, and freedom-loving", years: "1954, 1966, 1978, 1990, 2002, 2014, 2026", compatible: "Tiger, Dog, Goat", challenging: "Rat, Ox", famous: "Nelson Mandela, Aretha Franklin, Emma Watson" },
  { slug: "goat", datePublished: "2025-12-06", dateModified: "2026-02-03", name: "Goat", rank: "8th", branch: "Wei", element: "Earth", polarity: "Yin", traits: "creative, gentle, and community-minded", years: "1955, 1967, 1979, 1991, 2003, 2015, 2027", compatible: "Rabbit, Horse, Pig", challenging: "Ox, Rat", famous: "Steve Jobs, Bill Gates, Julia Roberts" },
  { slug: "monkey", datePublished: "2025-12-10", dateModified: "2026-02-05", name: "Monkey", rank: "9th", branch: "Shen", element: "Metal", polarity: "Yang", traits: "inventive, witty, and versatile", years: "1956, 1968, 1980, 1992, 2004, 2016, 2028", compatible: "Rat, Dragon, Snake", challenging: "Tiger, Pig", famous: "Leonardo da Vinci, Tom Hanks, Selena Gomez" },
  { slug: "rooster", datePublished: "2025-12-14", dateModified: "2026-02-07", name: "Rooster", rank: "10th", branch: "You", element: "Metal", polarity: "Yin", traits: "precise, honest, and disciplined", years: "1957, 1969, 1981, 1993, 2005, 2017, 2029", compatible: "Ox, Snake, Dragon", challenging: "Rabbit, Dog", famous: "Beyonce, Serena Williams, Ariana Grande" },
  { slug: "dog", datePublished: "2025-12-18", dateModified: "2026-02-09", name: "Dog", rank: "11th", branch: "Xu", element: "Earth", polarity: "Yang", traits: "loyal, fair-minded, and protective", years: "1958, 1970, 1982, 1994, 2006, 2018, 2030", compatible: "Tiger, Rabbit, Horse", challenging: "Dragon, Rooster", famous: "Madonna, Michael Jackson, Prince William" },
  { slug: "pig", datePublished: "2025-12-22", dateModified: "2026-02-11", name: "Pig", rank: "12th", branch: "Hai", element: "Water", polarity: "Yin", traits: "generous, sincere, and comfort-seeking", years: "1959, 1971, 1983, 1995, 2007, 2019, 2031", compatible: "Rabbit, Goat, Tiger", challenging: "Snake, Monkey", famous: "Elon Musk, Hillary Clinton, Arnold Schwarzenegger" },
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

const animalFaqs: Partial<Record<string, FAQ[]>> = {
  dragon: [
    {
      question: "What are the personality traits of the Dragon zodiac?",
      answer:
        "The Dragon (Chen, 辰) is the 5th sign and the only mythological animal in the cycle. Traditional readings describe Dragons as charismatic, ambitious, visionary, and naturally drawn to leadership. Their Yang Earth polarity gives them stability paired with outward expression — a confident presence, but with a grounded sense of timing.",
    },
    {
      question: "Which signs are most compatible with the Dragon?",
      answer:
        "Dragon (Chen) forms the strongest harmony with Rat (Zi) and Monkey (Shen) through the Shen-Zi-Chen Water trine, and a six-combination with Rooster (You). Relationships with Dog (Xu) tend to be challenging due to the Chen-Xu clash, and Rabbit (Mao) creates a six-harm pattern that asks for more conscious communication.",
    },
    {
      question: "What years are Year of the Dragon?",
      answer:
        "Recent Dragon years are 1952, 1964, 1976, 1988, 2000, 2012, and 2024. Each Dragon year combines the Chen branch with a different Heavenly Stem, producing variations like Wood Dragon (2024), Water Dragon (2012), and Earth Dragon (1988). Check the Lunar New Year boundary if your birthday falls in late January or early February.",
    },
    {
      question: "Is the Dragon considered the most powerful zodiac sign?",
      answer:
        "In cultural symbolism, yes — Dragons are associated with imperial power and considered auspicious in Chinese tradition. In Bazi, however, no animal is intrinsically stronger than another. The Chen branch carries hidden stems Wu (Earth), Yi (Wood), and Gui (Water), so its actual chart strength depends on seasonal context, the Day Master, and the surrounding pillars.",
    },
    {
      question: "Is 2024 a good year to be born a Dragon?",
      answer:
        "2024 was the Year of the Wood Dragon (Jia Chen). The Jia Wood stem on a Chen Earth branch creates a controlling cycle (Wood parts Earth), which traditionally suggests an active and ambitious year energy, but a child's chart strength depends on the month, day, and hour pillars — the year alone is not enough to predict outcomes.",
    },
    {
      question: "What career paths suit Dragon zodiac people?",
      answer:
        "Dragons traditionally thrive in roles that combine vision and leadership: entrepreneurship, executive positions, creative direction, and high-stakes decision-making. The Chen branch's Earth element supports stable, structural work, while the hidden Yi Wood adds creative growth and hidden Gui Water adds strategic depth. Pair this with the full Bazi chart for accurate career guidance.",
    },
  ],
  rat: [
    {
      question: "What are the personality traits of the Rat zodiac?",
      answer:
        "The Rat (Zi, 子) is the 1st sign in the cycle. Traditional readings describe Rats as quick-minded, adaptable, resourceful, and naturally observant. Their Yang Water polarity gives them flowing intelligence and the ability to navigate complex social and professional environments with ease.",
    },
    {
      question: "Which signs are most compatible with the Rat?",
      answer:
        "Rat (Zi) forms the strongest harmony with Dragon (Chen) and Monkey (Shen) through the Shen-Zi-Chen Water trine, and a six-combination with Ox (Chou). Relationships with Horse (Wu) tend to be challenging due to the Zi-Wu clash, and Goat (Wei) creates a six-harm pattern.",
    },
    {
      question: "What years are Year of the Rat?",
      answer:
        "Recent Rat years are 1948, 1960, 1972, 1984, 1996, 2008, and 2020. Each Rat year combines the Zi branch with a different Heavenly Stem, producing variations like Metal Rat (2020), Water Rat (1972), and Earth Rat (1948).",
    },
    {
      question: "Why is the Rat first in the Chinese zodiac?",
      answer:
        "The popular legend says the Rat won the Jade Emperor's race by riding on the Ox's back and jumping ahead at the finish line. The structural reason is that Zi is the first Earthly Branch, governing midnight (11pm-1am) — the start of the daily cycle and the deepest Yin point from which Yang energy begins to grow.",
    },
    {
      question: "Is the Rat considered lucky in Chinese culture?",
      answer:
        "Yes. Rats are associated with prosperity, abundance, and shrewd intelligence. Because Zi is the first branch and represents the moment when new Yang energy starts to emerge, the Rat carries connotations of fresh beginnings and seizing opportunity early.",
    },
    {
      question: "What career paths suit Rat zodiac people?",
      answer:
        "Rats traditionally thrive in roles requiring quick adaptation, communication, and strategic thinking: research, finance, journalism, sales, and information-driven fields. The Zi branch's Yang Water energy supports flow and adaptability, but as always, a full Bazi chart provides more accurate career guidance than the year animal alone.",
    },
  ],
  tiger: [
    {
      question: "What are the personality traits of the Tiger zodiac?",
      answer:
        "The Tiger (Yin, 寅) is the 3rd sign in the cycle. Traditional readings describe Tigers as bold, protective, independent, and natural leaders. Their Yang Wood polarity gives them upward, expansive energy and a willingness to take initiative when others hesitate.",
    },
    {
      question: "Which signs are most compatible with the Tiger?",
      answer:
        "Tiger (Yin) forms the strongest harmony with Horse (Wu) and Dog (Xu) through the Yin-Wu-Xu Fire trine, and a six-combination with Pig (Hai). Relationships with Monkey (Shen) tend to be challenging due to the Yin-Shen clash, and Snake (Si) creates a punishment pattern that asks for more conscious boundary-setting.",
    },
    {
      question: "What years are Year of the Tiger?",
      answer:
        "Recent Tiger years are 1950, 1962, 1974, 1986, 1998, 2010, and 2022. Each Tiger year combines the Yin branch with a different Heavenly Stem, producing variations like Water Tiger (2022), Wood Tiger (1974), and Fire Tiger (1986).",
    },
    {
      question: "Why is the Tiger associated with courage in Chinese culture?",
      answer:
        "Yin Wood symbolizes the strong, upward growth of spring — the season Tiger governs. The branch represents February in the solar Bazi calendar, when life force returns to the world after winter. This seasonal symbolism, combined with the tiger's status as a predator at the top of the food chain, made the sign synonymous with bravery and protective strength.",
    },
    {
      question: "Is the Tiger a good zodiac sign for leadership?",
      answer:
        "Yes — Tigers are traditionally associated with leadership, especially in roles that require courage, vision, and willingness to act before consensus is reached. The Yin branch hides Jia Wood, Bing Fire, and Wu Earth, giving the Tiger a combination of growth force, expressive energy, and stable grounding when the chart structure supports it.",
    },
    {
      question: "What career paths suit Tiger zodiac people?",
      answer:
        "Tigers traditionally thrive in roles requiring initiative and visible action: entrepreneurship, military or law enforcement, advocacy, sports, and any field where independent decision-making is rewarded. The Yang Wood energy supports growth-oriented and pioneering work — but as always, the full Bazi chart provides clearer career direction than the year animal alone.",
    },
  ],
};

function faqs(animal?: ZodiacAnimal): FAQ[] {
  if (animal && animalFaqs[animal.slug]) {
    return animalFaqs[animal.slug] as FAQ[];
  }
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
        question: "Can zodiac compatibility determine a relationship result?",
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

  const defaultEditorialQuote = {
    text: "A useful zodiac reading treats the animal sign as one doorway into timing, not the whole person.",
    author: "Mingli Atlas Editorial Team",
    title: "Editorial note",
  };

  const sections = data.sections.some((section) => section.quotes?.length)
    ? data.sections
    : data.sections.map((section, index) =>
        index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
      );

  return {
    slug,
    path,
    title,
    description,
    data: {
      ...data,
      title,
      sections,
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-01-08",
        dateModified: data.schema.dateModified ?? "2026-02-01",
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
  schema: { headline: "", description: "", url: "", datePublished: "2025-11-05", dateModified: "2026-02-01" },
  stats: [
    { value: "12", label: "Animals", description: "One for each Earthly Branch." },
    { value: "5", label: "Elements", description: "Year animals rotate through elemental versions." },
    { value: "60", label: "Full cycle", description: "Animals and elements repeat every 60 years." },
  ],
  citations: [
    { label: "《尔雅·释天》(Erya, Han Dynasty)", source: "Early Chinese lexicon recording the 12 Earthly Branches and their animal correspondences." },
    { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac (1986)", source: "Documents the zodiac animal cycle as preserved in traditional Chinese almanac practice." },
    { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols (1986)", source: "Reference for animal symbolism and cultural meanings in the Chinese zodiac tradition." },
  ],
  sections: [
    {
      heading: "How the 12-year zodiac cycle works",
      content: (
        <>
          <p>
            The cycle follows Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. According to <cite>Chinese calendar tradition</cite>, these animals are cultural symbols layered onto the 12 Earthly Branches.
          </p>
          <p>
            Zodiac pages are useful entry points, but they are not the whole chart. <Link href="/bazi" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi</Link> adds month, day, and hour pillars for a more complete structure.
          </p>
        </>
      ),
    },
    {
      heading: "Zodiac compatibility patterns",
      content: (
        <>
          <p>
            Compatibility uses six harmonious pairs, four triangular groups, and six clash pairs. In <cite>Earthly Branch tradition</cite>, these patterns describe ease, shared rhythm, and tension, but they should be read as reflection tools rather than fixed judgments.
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
    {
      heading: "Birth dates near Lunar New Year",
      content: (
        <>
          <p>
            If your birthday falls in January or early February, confirm the exact year boundary before choosing an animal sign. Popular calendars often use Lunar New Year, while Four Pillars work may use solar-term timing.
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

const animalSections: Partial<Record<string, KnowledgePageProps["sections"]>> = {
  rat: [
    {
      heading: "Years of the Rat and the Zi branch",
      content: (
        <>
          <p>
            Recent Years of the Rat include 1948, 1960, 1972, 1984, 1996, 2008, and 2020. The cycle repeats every 12 years. If you were born in January or early February, check the Lunar New Year boundary for that year — the zodiac year does not always begin on January 1st, and a few days can shift your sign entirely.
          </p>
          <p>
            In the Earthly Branch system, the Rat corresponds to Zi (子), the first branch. Zi governs the 11pm–1am window and the north direction. It is the peak of Water energy in the 12-branch cycle — the winter solstice point, when yin is at its maximum and yang begins its return. This is why Rat energy in Bazi is associated with depth, intelligence, and the capacity to hold a great deal beneath a calm surface.
          </p>
          <p>
            The Rat year also comes in five elemental versions cycling through a 60-year pattern: Wood Rat (1984, 2044), Fire Rat (1996, 2056), Earth Rat (2008, 2068), Metal Rat (1960, 2020), and Water Rat (1972, 2032). A Metal Rat year carries a different quality from a Wood Rat year even though the animal symbol is the same. The elemental version modifies the base sign's expression and the kinds of pressure or support the year brings.
          </p>
        </>
      ),
    },
    {
      heading: "Rat personality: what the Zi branch actually describes",
      content: (
        <>
          <p>
            Rat symbolism emphasizes being quick-minded, adaptable, and resourceful. In classical Chinese almanac tradition, these traits connect to the Zi branch's Water element and Yang polarity. Yang Water at its peak is intelligent, perceptive, and capable of finding paths through obstacles — but it also needs containment to avoid becoming scattered or anxious.
          </p>
          <p>
            The Rat's resourcefulness comes from the Zi branch's position at the beginning of the cycle. First-branch energy tends toward initiative, pattern recognition, and the ability to assess a situation quickly. The same quality that makes Rat people effective problem-solvers can become over-analysis or restlessness when the chart lacks Earth to provide grounding.
          </p>
          <p>
            In Bazi, the Zi branch holds only one hidden stem: Gui Water (癸). This makes Zi one of the purer branches — its energy is concentrated rather than mixed. A Gui Water hidden stem in the hour or day branch can activate quietly and powerfully, especially when a Ren Water stem appears elsewhere in the chart to form a combination.
          </p>
          <p>
            Yang polarity in the Rat means the sign tends toward outward expression, initiative, and visibility. Yang signs generally move first and ask questions later. This contrasts with Yin signs, which tend to observe before acting. Neither is better — both are necessary in a balanced chart, and the full reading depends on the Day Master and the month pillar, not the year animal alone.
          </p>
        </>
      ),
      stats: [{ value: "5", label: "Element versions", description: "Wood, Fire, Earth, Metal, and Water Rat years modify the base sign." }],
    },
    {
      heading: "Career, compatibility, and 2026 themes for Rat",
      content: (
        <>
          <p>
            Career and wealth themes for Rat favor environments that reward intelligence, adaptability, and the ability to work across multiple domains simultaneously. Water element associations point toward research, communication, strategy, finance, and fields that require reading patterns others miss. The Rat's resourcefulness is most productive when paired with a clear direction — Water without banks tends to spread rather than flow.
          </p>
          <p>
            Compatibility is traditionally strongest with Ox (Zi-Chou combination), Dragon (Water-Earth harmony), and Monkey (Shen-Zi-Chen Water frame). These pairings describe ease of rhythm and shared elemental logic. Horse is the direct clash sign (Zi-Wu), which describes opposing energy rather than incompatibility — Rat-Horse relationships can be dynamic and productive when both parties understand the tension. Goat is the harm sign, describing a subtler form of friction that can be harder to identify.
          </p>
          <p>
            For 2026 (Year of the Fire Horse), the Wu branch brings Yang Fire energy. For Rat (Zi, Yang Water), the Horse year activates the Zi-Wu clash. This does not mean 2026 is uniformly difficult for Rat — it means the year brings movement, disruption of existing patterns, and the need to respond rather than initiate. Famous people often cited as Rat examples include William Shakespeare, George Washington, and Scarlett Johansson, though a complete reading requires their full birth data.
          </p>
        </>
      ),
    },
  ],
  tiger: [
    {
      heading: "Years of the Tiger and the Yin branch",
      content: (
        <>
          <p>
            Recent Years of the Tiger include 1950, 1962, 1974, 1986, 1998, 2010, and 2022. The cycle repeats every 12 years. If you were born in January or early February, check the Lunar New Year boundary — the zodiac year boundary and the Bazi year boundary (Li Chun, around February 4th) do not always coincide.
          </p>
          <p>
            In the Earthly Branch system, the Tiger corresponds to Yin (寅), the third branch. Yin governs the 3–5am window and the northeast direction. It is the first month of spring in the Chinese calendar — the moment when Yang energy breaks through after winter. This is why Tiger energy in Bazi is associated with boldness, initiative, and the drive to move before conditions are fully settled.
          </p>
          <p>
            The Tiger year comes in five elemental versions: Wood Tiger (1974, 2034), Fire Tiger (1986, 2046), Earth Tiger (1998, 2058), Metal Tiger (1950, 2010), and Water Tiger (1962, 2022). A Water Tiger year carries a different quality from a Fire Tiger year. The elemental version modifies the base sign's expression and the kinds of pressure or support the year brings to each animal sign.
          </p>
        </>
      ),
    },
    {
      heading: "Tiger personality: what the Yin branch actually describes",
      content: (
        <>
          <p>
            Tiger symbolism emphasizes being bold, protective, and independent. In classical Chinese almanac tradition, these traits connect to the Yin branch's Wood element and Yang polarity. Yang Wood at the start of spring is expansive, direct, and growth-oriented — it moves toward the light without waiting for permission. The same quality that makes Tiger people natural leaders can become impulsiveness or difficulty accepting constraint when the chart lacks Metal to provide structure.
          </p>
          <p>
            The Yin branch holds three hidden stems: Jia Wood (甲) as the main stem, Bing Fire (丙) as the middle stem, and Wu Earth (戊) as the residual stem. This makes Yin one of the more complex branches — it contains Wood's drive, Fire's warmth and visibility, and Earth's stabilizing quality. A Tiger person's chart can express very differently depending on which hidden stem is activated by the luck cycle or annual branch.
          </p>
          <p>
            Yang polarity in the Tiger means the sign tends toward outward expression, initiative, and direct action. Tiger people often move first and recalibrate later. This is effective in environments that reward decisiveness, but it can create friction in situations that require patience and careful observation. The full reading depends on the Day Master and the month pillar — a Tiger year animal with a Yin Water Day Master reads very differently from one with a Yang Fire Day Master.
          </p>
          <p>
            The Tiger's protective quality comes from the Yin branch's position as the first spring branch. Spring energy in Bazi is associated with new growth, territorial instinct, and the drive to establish a domain. This is why Tiger people often feel a strong sense of responsibility for those in their circle — the protective impulse is structural, not just temperamental.
          </p>
        </>
      ),
      stats: [{ value: "5", label: "Element versions", description: "Wood, Fire, Earth, Metal, and Water Tiger years modify the base sign." }],
    },
    {
      heading: "Career, compatibility, and 2026 themes for Tiger",
      content: (
        <>
          <p>
            Career and wealth themes for Tiger favor environments that reward initiative, leadership, and the ability to act under uncertainty. Wood element associations point toward growth-oriented fields: education, healthcare, creative work, entrepreneurship, and roles that require building something from the ground up. Tiger energy is most productive when it has a clear territory to develop — Wood without direction tends to expand in all directions at once.
          </p>
          <p>
            Compatibility is traditionally strongest with Horse (Yin-Wu-Xu Fire frame), Dog (Yin-Wu-Xu Fire frame), and Pig (Yin-Hai combination). These pairings describe shared elemental rhythm and natural alliance. Monkey is the direct clash sign (Yin-Shen), describing opposing energy — Tiger-Monkey relationships can be highly productive when the tension is channeled into complementary roles. Snake is the harm sign, describing a subtler friction that can be harder to identify than a direct clash.
          </p>
          <p>
            For 2026 (Year of the Fire Horse), the Wu branch brings Yang Fire energy. For Tiger (Yin, Yang Wood), the Horse year activates the Yin-Wu-Xu Fire frame — a partial harmony that can amplify Fire energy in the chart. This tends to bring visibility, momentum, and the opportunity to act on plans that have been building. Famous people often cited as Tiger examples include Queen Elizabeth II, Lady Gaga, and Leonardo DiCaprio, though a complete reading requires their full birth data.
          </p>
        </>
      ),
    },
  ],
  dragon: [
    {
      heading: "Years of the Dragon and the Chen branch",
      content: (
        <>
          <p>
            Recent Years of the Dragon include 1952, 1964, 1976, 1988, 2000, 2012, and 2024. The cycle repeats every 12 years. If you were born in January or early February, check the Lunar New Year boundary for that year — the zodiac year boundary and the Bazi solar-term boundary do not always coincide, and a few days can shift your sign.
          </p>
          <p>
            In the Earthly Branch system, the Dragon corresponds to Chen (辰), the fifth branch. Chen governs the 7–9am window and the east-southeast direction. It is the third month of spring — the transitional point between spring and summer, when Wood energy begins to give way to Fire. This transitional quality is why Dragon energy in Bazi is associated with transformation, ambition, and the capacity to hold multiple energies simultaneously.
          </p>
          <p>
            The Dragon year comes in five elemental versions: Wood Dragon (1964, 2024), Fire Dragon (1976, 2036), Earth Dragon (1988, 2048), Metal Dragon (2000, 2060), and Water Dragon (1952, 2012). A Wood Dragon year carries a different quality from a Metal Dragon year. The elemental version modifies the base sign's expression and the kinds of pressure or support the year brings to each animal sign.
          </p>
        </>
      ),
    },
    {
      heading: "Dragon personality: what the Chen branch actually describes",
      content: (
        <>
          <p>
            Dragon symbolism emphasizes being charismatic, ambitious, and visionary. In classical Chinese almanac tradition, these traits connect to the Chen branch's Earth element and Yang polarity. Yang Earth in the transitional spring-summer period is fertile, expansive, and capable of holding great weight — but it also contains the energy of the season it is leaving (Wood) and the season it is entering (Fire). This complexity is why Dragon people often feel pulled in multiple directions simultaneously.
          </p>
          <p>
            The Chen branch holds three hidden stems: Wu Earth (戊) as the main stem, Yi Wood (乙) as the middle stem, and Gui Water (癸) as the residual stem. This makes Chen one of the most complex branches in the system — it contains Earth's stability, Wood's growth drive, and Water's depth and intelligence. A Dragon person's chart can express very differently depending on which hidden stem is activated by the luck cycle or annual branch.
          </p>
          <p>
            The Dragon is the only mythological animal in the 12-sign cycle, which reflects its unique position in Chinese cultural symbolism. In classical Chinese culture, the Dragon represents imperial authority, transformation, and the capacity to move between realms — earth, water, and sky. In Bazi, this translates to a sign that is comfortable with complexity and change, but can struggle with the ordinary demands of sustained, unglamorous effort.
          </p>
          <p>
            Yang polarity in the Dragon means the sign tends toward outward expression, ambition, and the drive to make an impact. Dragon people often think in large terms and can find small-scale work frustrating. The full reading depends on the Day Master and the month pillar — a Dragon year animal with a Jia Wood Day Master reads very differently from one with a Ji Earth Day Master.
          </p>
        </>
      ),
      stats: [{ value: "5", label: "Element versions", description: "Wood, Fire, Earth, Metal, and Water Dragon years modify the base sign." }],
    },
    {
      heading: "Career, compatibility, and 2026 themes for Dragon",
      content: (
        <>
          <p>
            Career and wealth themes for Dragon favor environments that reward vision, leadership, and the ability to work across multiple domains. Earth element associations point toward stable fields: real estate, finance, management, and roles that require holding a complex system together. Dragon energy is most productive when it has a large enough stage — Yang Earth without a clear purpose tends to accumulate without direction.
          </p>
          <p>
            Compatibility is traditionally strongest with Rat (Shen-Zi-Chen Water frame), Monkey (Shen-Zi-Chen Water frame), and Rooster (Chen-You combination). These pairings describe shared elemental rhythm and natural alliance. Dog is the direct clash sign (Chen-Xu), describing opposing Earth energy — Dragon-Dog relationships can be productive when the tension is channeled into complementary roles, but they require more conscious effort. Rabbit is the harm sign, describing a subtler friction.
          </p>
          <p>
            For 2026 (Year of the Fire Horse), the Wu branch brings Yang Fire energy. For Dragon (Chen, Yang Earth), Fire generates Earth in the generating cycle — the Horse year tends to bring resources, support, and the conditions for Dragon's ambitions to find traction. This is generally a favorable dynamic, though the full effect depends on the Day Master and the complete chart. Famous people often cited as Dragon examples include Bruce Lee, Rihanna, and Adele, though a complete reading requires their full birth data.
          </p>
        </>
      ),
    },
  ],
};

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
    schema: { headline: "", description: "", url: "", datePublished: animal.datePublished, dateModified: animal.dateModified },
    stats: [
      { value: animal.rank, label: "Cycle rank", description: `${animal.name} position in the 12-year sequence.` },
      { value: animal.element, label: "Branch element", description: `${animal.branch} branch elemental association.` },
      { value: "12", label: "Year cycle", description: "The animal returns every 12 years." },
    ],
    citations: [
      { label: "《尔雅·释天》(Erya, Han Dynasty)", source: `${animal.name} corresponds to the ${animal.branch} branch in the 12-branch cycle.` },
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac (1986)", source: "Animal years and compatibility groups are preserved in traditional Chinese almanac practice." },
    ],
    sections: animalSections[animal.slug] ?? [
      {
        heading: `Years of the ${animal.name}`,
        content: (
          <>
            <p>
              Recent Years of the {animal.name} include {animal.years}. The cycle repeats every 12 years, so the next Year of the {animal.name} follows 12 years after the most recent one. If you were born in January or early February, check the Lunar New Year boundary for that year before confirming your sign — the Chinese zodiac year does not always align with January 1st.
            </p>
            <p>
              In Bazi, the year animal is only one of four pillars. The month, day, and hour pillars each carry their own stem and branch, which means two people born in the same year can have very different charts. The year pillar reflects ancestral background and early social environment, but the Day Master (the stem of the day pillar) is the anchor of the full reading.
            </p>
            <p>
              The {animal.name} year also comes in five elemental versions — Wood, Fire, Earth, Metal, and Water — cycling through a 60-year sexagenary pattern. A Wood {animal.name} year carries different energy from a Metal {animal.name} year, even though the animal symbol is the same.
            </p>
          </>
        ),
      },
      {
        heading: "Personality traits and life patterns",
        content: (
          <>
            <p>
              {animal.name} symbolism emphasizes being {animal.traits}. In classical Chinese almanac tradition, these traits are associated with the {animal.branch} Earthly Branch, which governs a specific two-hour window of the day, a season, a direction, and a set of hidden stems that interact with other pillars in a Bazi chart.
            </p>
            <p>
              Strengths often appear when this sign has a clear purpose and a supportive environment. The same qualities that create strength can become liabilities under pressure: adaptability can become inconsistency, ambition can become overreach, and loyalty can become rigidity. Reading the full chart — especially the month pillar and luck cycles — gives a more accurate picture of when these tendencies activate.
            </p>
            <p>
              The {animal.polarity} quality of the {animal.name} ({animal.polarity === "Yang" ? "active, outward-moving energy" : "receptive, inward-moving energy"}) shapes how the sign expresses itself. Yang signs tend toward initiative and visibility; Yin signs tend toward depth and selectivity. Neither is better — both are necessary in a balanced chart.
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
              Career and wealth themes favor environments that respect the {animal.name} pattern. The {animal.element} element association shapes which industries and roles tend to align well: {animal.element === "Wood" ? "growth-oriented fields like education, healthcare, and creative work" : animal.element === "Fire" ? "high-visibility fields like media, entertainment, and leadership roles" : animal.element === "Earth" ? "stable fields like real estate, finance, and management" : animal.element === "Metal" ? "precision fields like law, engineering, and finance" : "adaptive fields like research, communication, and strategy"}.
            </p>
            <p>
              Relationship ease is traditionally stronger with {animal.compatible} signs, which share branch harmony or triangular affinity. {animal.challenging} signs can require more conscious communication because of opposing branch positions — this does not make the relationship impossible, but it does ask for clearer agreements about pacing and priorities.
            </p>
            <p>
              For 2026 (Year of the Horse), read general Horse-year momentum together with your full Bazi chart. The Horse branch (Wu, 午) carries Yang Fire energy, which activates differently depending on your Day Master element. Famous people often cited as {animal.name} examples include {animal.famous} — though a complete reading would require their full birth data, not just the year.
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
  schema: { headline: "", description: "", url: "", datePublished: "2026-01-05", dateModified: "2026-02-15" },
  stats: [
    { value: "6", label: "Harmony pairs", description: "Rat-Ox, Tiger-Pig, Rabbit-Dog, Dragon-Rooster, Snake-Monkey, Horse-Goat." },
    { value: "4", label: "Triangular groups", description: "Affinity groups of three animals." },
    { value: "6", label: "Clash pairs", description: "Opposite branch relationships." },
  ],
  citations: [
    { label: "《尔雅·释天》(Erya, Han Dynasty)", source: "Compatibility derives from relationships among the 12 Earthly Branches." },
    { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac (1986)", source: "Harmony and clash signs are used in relationship and date-selection contexts in traditional almanac practice." },
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
  schema: { headline: "", description: "", url: "", datePublished: "2026-01-15", dateModified: "2026-02-20" },
  stats: [
    { value: "2026", label: "Forecast year", description: "A Horse-year planning cycle." },
    { value: "12", label: "Animal signs", description: "Each sign needs a separate year overview." },
    { value: "5", label: "Life areas", description: "Career, money, love, health, and personal growth." },
  ],
  citations: [
    { label: "《尔雅·释天》(Erya, Han Dynasty)", source: "Yearly animal forecasts derive from the 12-branch cycle." },
    { label: "Joey Yap, Bazi: The Destiny Code (2007)", source: "Annual energy is best read against a complete natal chart for better context." },
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
