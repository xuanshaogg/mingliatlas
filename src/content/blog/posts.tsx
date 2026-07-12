import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { SITE } from "@/lib/constants";
import TermLink from "@/components/shared/TermLink";

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  category: string;
  data: KnowledgePageProps;
}

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

// Dedicated FAQ set for the "What Is Bazi?" guide so its FAQPage structured
// data covers the actual beginner queries (what bazi is, how to read it, how
// it differs from the zodiac) instead of the generic site-wide disclaimers.
const whatIsBaziFaqs: FAQ[] = [
  {
    question: "What is Bazi in simple terms?",
    answer:
      "Bazi (八字), or the Four Pillars of Destiny, is a Chinese astrology system that converts your birth year, month, day, and hour into eight characters — one Heavenly Stem and one Earthly Branch per pillar. These eight characters map your elemental makeup and life patterns. It is read as a chart of tendencies and timing, not a fixed fortune.",
  },
  {
    question: "Why is Bazi called the Four Pillars of Destiny?",
    answer:
      "Each of the four pillars represents one unit of your birth moment: year, month, day, and hour. Every pillar carries one of the 10 Heavenly Stems and one of the 12 Earthly Branches, producing eight characters total (ba zi literally means \"eight characters\"). The day pillar's stem is your Day Master, the anchor of the whole reading.",
  },
  {
    question: "How is Bazi different from the Chinese zodiac?",
    answer:
      "The Chinese zodiac uses only your birth-year animal — one of twelve signs. Bazi uses all four pillars (year, month, day, and hour), so it distinguishes between people born in the same zodiac year. Bazi is the fuller system; the zodiac animal is just the year branch within it.",
  },
  {
    question: "Do I need my exact birth time for Bazi?",
    answer:
      "The birth hour sets the hour pillar and helps locate the Day Master accurately, so an exact time gives the most complete chart. If you do not know your birth time, the year, month, and day pillars still provide a meaningful partial reading — many people start there and refine later.",
  },
  {
    question: "Is Bazi the same as Chinese fortune telling?",
    answer:
      "Bazi is a structured analytical system rather than prediction by omen. It reads the balance and interaction of the Five Elements across your pillars to describe tendencies, strengths, and favorable timing. It is best used for self-understanding and planning, not as a fixed prophecy.",
  },
];

// Dedicated FAQ sets for high-impression blog pages. Each replaces the generic
// baseFaqs so the page's FAQPage structured data targets the queries it
// actually ranks for, instead of repeating site-wide disclaimers.
const zodiacCompatibilityFaqs: FAQ[] = [
  {
    question: "Which Chinese zodiac signs are most compatible?",
    answer:
      "The strongest matches come from the four three-harmony triads: Rat-Dragon-Monkey, Ox-Snake-Rooster, Tiger-Horse-Dog, and Rabbit-Goat-Pig. Signs within a triad share long-term values and goals. The six harmony pairs (such as Rat-Ox and Tiger-Pig) are also highly compatible and tend to balance each other day to day.",
  },
  {
    question: "Which zodiac signs clash or are least compatible?",
    answer:
      "The six clash pairs are Rat-Horse, Ox-Goat, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, and Snake-Pig. Each pair sits directly opposite in the 12-branch cycle, so they differ in pace and temperament. A clash is not a verdict — it points to friction that clearer communication and complementary roles can manage.",
  },
  {
    question: "How do I use a Chinese zodiac compatibility chart?",
    answer:
      "Find your sign on one axis and the other person's sign on the other; the cell shows whether the pair forms a triad, a harmony (six combination), a clash, or a harm relationship. Use it as a quick reference for relationship rhythm, then check both full Bazi charts for a deeper reading.",
  },
  {
    question: "Is zodiac compatibility accurate for relationships?",
    answer:
      "Zodiac compatibility is a symbolic guide, not a prediction. The year-animal pairing describes general rhythm, but real compatibility depends on values, communication, and both people's complete Bazi charts. Treat the chart as a conversation starter rather than a final answer.",
  },
];

const iChingReadingFaqs: FAQ[] = [
  {
    question: "How do you cast an I Ching hexagram?",
    answer:
      "Frame one clear question, then build six lines from bottom to top. The two common methods are the three-coin method (toss three coins six times) and the yarrow-stalk method (a longer traditional ritual). Each toss yields a yin or yang line, and some lines are \"changing\" lines that transform into their opposite.",
  },
  {
    question: "What are changing lines in the I Ching?",
    answer:
      "Changing lines are the lines that come up as \"old\" yin or \"old\" yang during casting. They transform into their opposite, producing a second hexagram. You read the first hexagram as the present situation, the changing-line texts as the dynamic to watch, and the second hexagram as where things are heading.",
  },
  {
    question: "How do I read the hexagram once I have it?",
    answer:
      "Read the hexagram's judgment and image first for the overall theme, then read any changing-line statements for specifics, then the resulting hexagram if there are changing lines. Keep your original question in view so the symbolism stays anchored to a concrete situation rather than drifting into generalities.",
  },
  {
    question: "What is the best way for beginners to start with the I Ching?",
    answer:
      "Start with question framing — a focused, open question (\"how should I approach X?\") produces a far clearer reading than a yes/no one. Use the three-coin method for speed, read the hexagram judgment before the line texts, and keep a short journal so you can trace each interpretation back to the cast.",
  },
];

const baziCareerFaqs: FAQ[] = [
  {
    question: "Can Bazi tell me what career to choose?",
    answer:
      "Bazi does not name one perfect job. It highlights patterns — your favorable elements, work style, and natural pacing — that point toward environments where you tend to thrive. The most useful career reading translates those patterns into the kind of work and team dynamics that fit you, not a single title.",
  },
  {
    question: "Which Bazi elements relate to career and wealth?",
    answer:
      "Career direction is read mainly from the month pillar (your environment and season) and the Ten Gods around your Day Master — particularly the Officer/Authority stars for structure and the Wealth stars for resource handling. Whether an element helps depends on whether it is favorable for your specific chart balance.",
  },
  {
    question: "How do I use my Day Master for career decisions?",
    answer:
      "Identify your Day Master and its favorable elements, then look for work that lets those elements express. A strong Day Master often benefits from output and wealth-oriented roles, while a weaker one benefits from supportive, resource-rich environments. Use it as a lens for fit and timing, alongside your real skills and interests.",
  },
];

const dayMasterMeaningFaqs: FAQ[] = [
  {
    question: "What does the Day Master mean in Bazi?",
    answer:
      "The Day Master is the heavenly stem of your day pillar and represents the self — the anchor the rest of the chart is read against. It does not describe your whole identity alone; the surrounding stems, branches, Ten Gods, and timing cycle explain how that anchor behaves in context.",
  },
  {
    question: "Is the Day Master the most important part of a Bazi chart?",
    answer:
      "It is the reference point, so in that sense it is central — every other element is interpreted in relation to it. But the month branch (season) and the overall element balance matter just as much for judging strength and favorable elements. The Day Master sets the question; the rest of the chart answers it.",
  },
  {
    question: "What is the difference between the Day Master and the day pillar?",
    answer:
      "The day pillar has two parts: the heavenly stem on top and the earthly branch below. The Day Master is specifically the stem on top. The branch beneath (the \"day branch\") represents the spouse palace and adds context, but the stem is the self — the Day Master.",
  },
  {
    question: "How do I find my Day Master?",
    answer:
      "Generate a Bazi chart from your birth year, month, day, and hour, then look at the heavenly stem on the day pillar. That stem is your Day Master. It will be one of the 10 Heavenly Stems — Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, or Gui — and it becomes the reference point for reading the rest of the chart.",
  },
];

// P2 dedicated FAQ sets — see note above. Each targets its page's real query.
const zodiac2026Faqs: FAQ[] = [
  {
    question: "What is the Chinese zodiac animal for 2026?",
    answer:
      "2026 is the Year of the Fire Horse (Bing-Wu, 丙午). It begins at Chinese New Year in February 2026 and is governed by the Horse branch (Wu, 午), which carries Yang Fire energy. Fire Horse years are traditionally linked to high energy, bold action, and rapid momentum.",
  },
  {
    question: "What does the Year of the Fire Horse mean for each zodiac sign?",
    answer:
      "The Horse year favors signs in harmony with Wu (Horse) — Tiger and Dog form its three-harmony triad, and Goat is its six-combination partner. The Rat sits opposite (Zi-Wu clash) and may feel more friction. Each sign's actual experience depends on its own branch relationship to the Horse and on the full Bazi chart.",
  },
  {
    question: "Is a zodiac forecast for 2026 a literal prediction?",
    answer:
      "No. A yearly zodiac forecast is a symbolic overview built from the year branch and its relationship to each animal sign. It describes themes to watch, not fixed outcomes. For personal timing, read the year against your complete Four Pillars chart rather than the animal year alone.",
  },
];

const baziVsWesternFaqs: FAQ[] = [
  {
    question: "What is the difference between Bazi and Western astrology?",
    answer:
      "Western astrology is built on planets, zodiac signs, houses, and aspects derived from the sky at your birth. Bazi is built on the Chinese calendar — Heavenly Stems, Earthly Branches, the Five Elements, and timing cycles drawn from your birth year, month, day, and hour. They are two different symbolic languages, not two versions of the same chart.",
  },
  {
    question: "Which is more accurate, Bazi or Western astrology?",
    answer:
      "Neither is universally \"more accurate\" — they answer different questions. Western astrology maps psychological archetypes and life areas through houses; Bazi maps elemental balance and favorable timing. The more useful question is which framework fits what you want to understand right now.",
  },
  {
    question: "Can I use Bazi and Western astrology together?",
    answer:
      "Yes. Many people read them side by side as complementary lenses, keeping each system's rules separate before looking for overlap. The risk is blending mechanics — a Bazi element and a Western planet are not interchangeable — so interpret each chart on its own terms first.",
  },
];

const fiveElementsTestFaqs: FAQ[] = [
  {
    question: "What are the five elements in Chinese metaphysics?",
    answer:
      "The Five Elements (Wu Xing, 五行) are Wood, Fire, Earth, Metal, and Water. They are not physical substances but five modes of energy: Wood grows and initiates, Fire expresses and energizes, Earth stabilizes, Metal refines and cuts, and Water adapts and flows. They interact through generating and controlling cycles.",
  },
  {
    question: "How do I find my dominant element?",
    answer:
      "Your elemental makeup comes from your full Bazi chart, especially your Day Master (day stem) and the balance of elements across the four pillars. A quick personality read can hint at your leading tendency, but the accurate version is calculated from your birth date and time, not a single quiz answer.",
  },
  {
    question: "What does each element say about personality?",
    answer:
      "As a shorthand: Wood types tend to be growth-oriented and planning-driven; Fire types expressive and visible; Earth types steady and supportive; Metal types precise and principled; Water types adaptable and strategic. These are tendencies to reflect on, not fixed labels — most people blend several elements.",
  },
];

const fireElementFaqs: FAQ[] = [
  {
    question: "What does the Fire element represent in Bazi?",
    answer:
      "Fire (火) represents visibility, expression, passion, and recognition. In Bazi it governs how openly energy is shown to the world. Yang Fire (Bing) is like the sun — broad and radiant; Yin Fire (Ding) is like a candle or lamp — focused and warm. Fire is generated by Wood and controlled by Water.",
  },
  {
    question: "What happens if you have too much or too little Fire in your chart?",
    answer:
      "Abundant Fire can bring charisma and drive but also restlessness or burnout if unbalanced; weak or absent Fire can show up as low visibility or difficulty asserting presence. Whether Fire helps depends on your Day Master — for some charts Fire is favorable, for others it adds pressure. Balance is read from the whole chart.",
  },
  {
    question: "How does the Fire element affect work and relationships?",
    answer:
      "In work, Fire supports visible, expressive, people-facing roles and leadership presence. In relationships, it adds warmth and expressiveness but benefits from grounding elements so it does not burn hot and fast. The practical use is noticing where you need more visibility versus more steadiness.",
  },
];

const howToReadBaziFaqs: FAQ[] = [
  {
    question: "How do you read a Bazi chart step by step?",
    answer:
      "Start with the Day Master (the day stem) — that is you. Next read the month branch to judge the season and your Day Master's strength. Then map the Five Elements balance, identify the Ten Gods around the Day Master, and finally layer in the luck pillars for timing. Reading in that order keeps a complex chart manageable.",
  },
  {
    question: "What should a beginner look at first in a Bazi chart?",
    answer:
      "Look at your Day Master element first, then whether the month branch supports or drains it. Those two facts — your day stem and your birth season — already tell you a great deal about the chart's core theme before you add Ten Gods, hidden stems, and timing.",
  },
  {
    question: "Why does a Bazi chart feel overwhelming at first?",
    answer:
      "Because every character interacts with every other one, beginners often try to read everything at once. The fix is sequence: Day Master, then month branch, then element balance, then Ten Gods, then timing. Reading one layer at a time turns eight characters into a structured, traceable picture.",
  },
  {
    question: "Do I need my exact birth time to read a Bazi chart?",
    answer:
      "An exact birth time gives the hour pillar, so it makes the chart more complete. You can still learn the core structure from the year, month, and day pillars, especially the Day Master and month branch. Treat a chart without the hour as a partial reading and avoid making strong timing claims from it.",
  },
];

const iChingBeginnersFaqs: FAQ[] = [
  {
    question: "How do you ask the I Ching a good question?",
    answer:
      "Frame an open, situation-focused question such as \"How should I approach this decision?\" rather than a yes/no or fortune-telling question. The I Ching responds best to questions about approach, attitude, and timing, because the hexagrams describe dynamics rather than fixed outcomes.",
  },
  {
    question: "Is the I Ching used for fortune telling?",
    answer:
      "Traditionally the I Ching is a book of changes used for structured reflection and decision context, not literal prediction. It offers a hexagram that mirrors the dynamics of your situation, helping you think through an approach. It works best as a reflective tool rather than a forecast.",
  },
  {
    question: "What do I need to start using the I Ching?",
    answer:
      "You need a clear question and a casting method — three coins is the simplest. Cast six lines from bottom to top, find the resulting hexagram, and read its judgment and image. The online I Ching Oracle on this site handles the casting so you can focus on framing the question and reading the result.",
  },
  {
    question: "Should beginners use coins, yarrow stalks, or an online oracle?",
    answer:
      "Coins are the easiest traditional method for beginners because they are quick and transparent. Yarrow stalks are slower and more ritualized. An online oracle is fine for learning if it shows the lines clearly and keeps the question visible; the important part is reading the hexagram thoughtfully rather than treating the result as instant fortune telling.",
  },
];

const changingLinesFaqs: FAQ[] = [
  {
    question: "What are changing lines in the I Ching?",
    answer:
      "Changing lines are lines that come up as \"old\" yin (6) or \"old\" yang (9) when casting. They are unstable and transform into their opposite, generating a second hexagram. They mark the part of the situation that is actively shifting.",
  },
  {
    question: "What do the numbers 6, 7, 8, and 9 mean in I Ching casting?",
    answer:
      "With the coin method each line totals 6, 7, 8, or 9. A 7 is stable (young) yang and an 8 is stable (young) yin — these do not change. A 9 is old yang and a 6 is old yin — these are changing lines that transform into the opposite, producing the second hexagram.",
  },
  {
    question: "How do I read a hexagram that has changing lines?",
    answer:
      "Read the first hexagram as the present situation, then read the text of each changing line for the specific dynamic at play, then read the second (derived) hexagram as the direction things are moving toward. If there are no changing lines, you read only the single hexagram.",
  },
  {
    question: "Do I read every changing line in an I Ching cast?",
    answer:
      "Yes, but keep the reading focused. Each changing line points to a moving part of the situation, so read them in line order and look for a shared theme rather than forcing separate predictions. When several lines change, the resulting hexagram becomes especially important because it shows the broader direction of change.",
  },
];

const zodiacCompatibilityGuideFaqs: FAQ[] = [
  {
    question: "How does Chinese zodiac compatibility work?",
    answer:
      "Compatibility comes from relationships between the 12 Earthly Branches behind each animal: three-harmony triads (shared long-term values), six-harmony pairs (day-to-day balance), clashes (opposite branches), and harms (subtler friction). Your animal's branch position determines which signs harmonize or clash with you.",
  },
  {
    question: "What are the three-harmony triads in the Chinese zodiac?",
    answer:
      "There are four triads: Rat-Dragon-Monkey (Water frame), Ox-Snake-Rooster (Metal frame), Tiger-Horse-Dog (Fire frame), and Rabbit-Goat-Pig (Wood frame). Signs in the same triad are spaced four years apart and tend to share goals and rhythm, making them strong long-term matches.",
  },
  {
    question: "Do clashing zodiac signs mean a bad relationship?",
    answer:
      "No. A clash (opposite branches, such as Rat-Horse or Dragon-Dog) signals difference in pace and temperament, not doom. Many clash pairs work well when the contrast is channeled into complementary roles. Compatibility is a starting reference; values and communication matter more, and both full Bazi charts give the deeper picture.",
  },
  {
    question: "Which Chinese zodiac signs are best for marriage compatibility?",
    answer:
      "Traditional marriage compatibility often favors six-harmony pairs and three-harmony triads, such as Rat-Ox, Tiger-Pig, Rabbit-Dog, Dragon-Rooster, Snake-Monkey, and Horse-Goat, plus the four triads. These pairings suggest easier rhythm, but marriage quality still depends on communication, values, timing, and the two full Bazi charts.",
  },
];

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(title: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: title, href },
  ];
}

const defaultEditorialQuote = {
  text: "A useful metaphysics article should make the symbol clearer, keep context visible, and leave the reader with better questions.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
}

function buildPage(input: Omit<BlogPost, "data"> & KnowledgePageProps): BlogPost {
  const { slug, path, title, description, category, ...data } = input;

  return {
    slug,
    path,
    title,
    description,
    category,
    data: {
      ...data,
      title,
      sections: withEditorialQuote(data.sections),
      schema: {
        ...data.schema,
        headline: title,
        description,
        url: pageUrl(path),
        datePublished: data.schema.datePublished ?? "2026-04-01",
        dateModified: data.schema.dateModified ?? "2026-04-01",
      },
    },
  };
}

const baziLinks = [
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "Start with the basic Four Pillars overview." },
  { title: "Five Elements", href: "/bazi/five-elements", description: "Learn the shared vocabulary behind the system." },
  { title: "Ten Gods", href: "/bazi/ten-gods", description: "Map every stem to a relationship role around the Day Master." },
  { title: "Luck Pillars", href: "/bazi/luck-pillars", description: "Add the 10-year timing layer after the natal chart is clear." },
  { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "Move from reading to a structured chart." },
];

const zodiacLinks = [
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "See the 12-animal cycle and its yearly context." },
  { title: "Learn: Which System?", href: "/learn/which-system", description: "Choose the right system for your question." },
  { title: "Bazi vs Western Astrology", href: "/blog/bazi-vs-western-astrology", description: "Compare the two symbolic frameworks directly." },
];

const compareLinks = [
  { title: "What Is Bazi?", href: "/blog/what-is-bazi", description: "Return to the Four Pillars foundation." },
  { title: "Chinese vs Western Astrology", href: "/learn/chinese-vs-western-astrology", description: "Read the broader learning-center comparison." },
  { title: "Bazi Overview", href: "/bazi", description: "Go deeper into the main Bazi knowledge hub." },
];

const careerLinks = [
  { title: "Bazi and Career", href: "/bazi/career", description: "See how the site frames career applications." },
  { title: "Which System Should You Learn?", href: "/learn/which-system", description: "Choose the reading path that fits your question." },
  { title: "Free Bazi Calculator", href: "/tools/bazi-calculator", description: "Test the workflow with a birth date." },
];

const elementsLinks = [
  { title: "Five Elements", href: "/bazi/five-elements", description: "Read the foundational element guide." },
  { title: "Common Misconceptions", href: "/learn/common-misconceptions", description: "Avoid oversimplifying symbolic systems." },
  { title: "Learn Resources", href: "/learn/resources", description: "See recommended next steps." },
];

interface EditorialSeed {
  slug: string;
  title: string;
  description: string;
  category: string;
  entity: string;
  focus: string;
  primaryHref: string;
  primaryLabel: string;
  datePublished?: string;
  dateModified?: string;
}

const seedPosts: BlogPost[] = [
  buildPage({
    slug: "what-is-bazi",
    path: "/blog/what-is-bazi",
    title: "What Is Bazi? Beginner's Guide to the Four Pillars of Destiny (八字)",
    description: "Bazi (八字), the Four Pillars of Destiny, is a Chinese astrology system that maps your birth year, month, day, and hour into eight characters. Learn what Bazi is, how the Day Master works, and how it differs from a single zodiac sign — then build your chart with our free Bazi calculator.",
    category: "Bazi Guide",
    entityName: "What Is Bazi?",
    entityType: "BlogPosting",
    subtitle: "A practical introduction to the structure behind Four Pillars reading.",
    directAnswer:
      "Bazi, or Four Pillars of Destiny, is a Chinese metaphysics system that reads a person's birth year, month, day, and hour as a structured chart of stems, branches, and elements. It is not a single-sign horoscope. It is a pattern language for timing, tendencies, and context.",
    breadcrumbs: breadcrumbs("What Is Bazi?", "/blog/what-is-bazi"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-02", dateModified: "2026-06-29" },
    stats: [
      { value: "4", label: "Pillars", description: "Year, month, day, and hour make the full chart." },
      { value: "60", label: "Stem-branch pairs", description: "The sexagenary cycle organizes the calendar." },
      { value: "10", label: "Year luck cycle", description: "Luck pillars usually move in 10-year blocks." },
    ],
    citations: [
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Bazi text establishing the Four Pillars framework and Day Master interpretation." },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1550 CE)", source: "Comprehensive classical reference for stem-branch interactions and Ten Gods analysis." },
      { label: "Joey Yap, Bazi: The Destiny Code (2007)", source: "Modern English-language reference for Four Pillars methodology." },
    ],
    sections: [
      {
        heading: "What Bazi actually reads",
        content: (
          <>
            <p>
              Bazi reads the birth moment as four pillars — year, month, day, and hour — each made of a Heavenly Stem on top and an Earthly Branch below. That gives you eight characters total, which is why the system is also called Ba Zi (八字), literally "eight characters." Each character carries an element (Wood, Fire, Earth, Metal, or Water) and a yin or yang quality.
            </p>
            <p>
              The Day Master is the stem of the day pillar. It represents the self — the anchor around which the rest of the chart is interpreted. A Yang Fire Day Master, for example, is read differently from a Yin Water Day Master even if the surrounding pillars look similar. The Day Master determines which of the Ten Gods each other stem becomes in relation to you.
            </p>
            <p>
              The system uses the birth moment to build four pillars, then interprets the interaction between stems, branches, Five Elements, and the Day Master. The result is a map of tendencies, not a fixed verdict. If you want the foundational vocabulary, start with the <TermLink term="Wu Xing">Five Elements</TermLink>, then read the <TermLink term="Tian Gan">Heavenly Stems</TermLink> and <TermLink term="Di Zhi">Earthly Branches</TermLink>.
            </p>
          </>
        ),
      },
      {
        heading: "The four pillars and what each one covers",
        content: (
          <>
            <p>
              Each pillar covers a different layer of life context. The year pillar reflects ancestral background, early environment, and how others perceive you socially. The month pillar is the strongest pillar in most classical schools — it shows career direction, the season of birth, and the dominant element pressure on the Day Master. The day pillar is the self and the intimate relationship sphere. The hour pillar covers children, later life, and inner motivations.
            </p>
            <p>
              Practitioners disagree on how much weight to give each pillar, but most agree that the month pillar and the Day Master together form the core of any reading. A chart with a strong month pillar that supports the Day Master reads very differently from one where the month pillar creates pressure or conflict.
            </p>
            <p>
              Hidden stems inside the Earthly Branches add another layer. Each branch contains one to three hidden stems that activate under specific conditions — when a luck pillar arrives, when an annual stem triggers a combination, or when the season shifts. This is why two people born on the same day can have noticeably different charts if their birth hours differ.
            </p>
          </>
        ),
      },
      {
        heading: "Why it is useful",
        content: (
          <>
            <p>
              Bazi is useful because it turns a birth date into a structured interpretation framework. Readers use it for self-reflection, timing, career themes, and relationship patterns. The value is in the structure: when you know which parts of the chart matter, you can ask better questions and avoid reading every symbol as a prediction.
            </p>
            <p>
              The timing layer is what separates Bazi from a static personality profile. Luck pillars (大运, Da Yun) move in roughly 10-year blocks and shift the elemental environment around the natal chart. Annual pillars add a shorter cycle on top. A period that looks difficult on paper may be productive if the arriving elements support the Day Master; a period that looks favorable may bring pressure if the elements clash.
            </p>
            <p>
              This is why practitioners say Bazi is more useful for timing than for fixed prediction. The natal chart shows tendencies and structural strengths. The luck and annual pillars show when those tendencies are likely to activate or face resistance.
            </p>
          </>
        ),
      },
      {
        heading: "How Bazi differs from Western astrology",
        content: (
          <>
            <p>
              Western astrology maps planetary positions at birth onto a zodiac wheel. Bazi maps the birth moment onto the Chinese stem-branch calendar. The two systems use different symbolic languages, different time structures, and different interpretive frameworks — they are not interchangeable, but they can be studied in parallel.
            </p>
            <p>
              The most practical difference for a new reader: Western astrology gives you one sun sign. Bazi gives you eight characters, a Day Master, Ten Gods, hidden stems, and a timing cycle. The depth is higher, but so is the learning curve. Most practitioners recommend starting with the Five Elements and the Day Master before trying to read a full chart.
            </p>
          </>
        ),
      },
      {
        heading: "How to start",
        content: (
          <>
            <p>
              Start with one chart, one question, and one source of vocabulary. Generate your chart with the free calculator, identify your Day Master, and read the Five Elements page to understand what element your Day Master belongs to. That single step — knowing your Day Master element — gives you enough context to begin reading the Ten Gods and the month pillar.
            </p>
            <p>
              Avoid trying to interpret every character at once. Classical practitioners spend years on single concepts. For a beginner, the most useful first pass is: Day Master element → month pillar element → whether they support or pressure each other. That relationship alone tells you a great deal about the structural theme of the chart.
            </p>
            <p>
              After that first pass, add detail slowly. Look at whether the chart is mostly warm or cold, dry or wet, active or restrained. Then compare the visible stems with the hidden stems inside the branches. This prevents a common beginner mistake: treating one attractive symbol as the whole reading. A strong Wealth star, for example, does not automatically mean money will arrive; it must be read against the Day Master, the season, the chart structure, and the timing cycle. A useful Bazi reading keeps all of those layers visible before turning the chart into practical advice. Keep notes as you read so each conclusion can be traced back to a visible chart feature.
            </p>
          </>
        ),
      },
    ],
    faqs: whatIsBaziFaqs,
    relatedLinks: baziLinks,
    cta: {
      title: "Read the Bazi foundation next",
      description: "Move from this introduction into the site-wide Bazi knowledge hub and the calculator.",
      href: "/bazi",
      label: "Open Bazi",
    },
  }),
  buildPage({
    slug: "chinese-zodiac-2026-forecast",
    path: "/blog/chinese-zodiac-2026-forecast",
    title: "Chinese Zodiac 2026 Forecast: What to Expect for All 12 Animals",
    description: "A structured 2026 overview for the 12 zodiac animals, with a practical reading method and caution against literal prediction.",
    category: "Yearly Forecast",
    entityName: "Chinese Zodiac 2026 Forecast",
    entityType: "BlogPosting",
    subtitle: "A year overview built for readers who want context, not hype.",
    directAnswer:
      "A zodiac forecast for 2026 is a symbolic yearly overview, not a literal forecast. It looks at the animal-year cycle, the relation between the year branch and each animal sign, and the practical themes people often watch for during the year.",
    breadcrumbs: breadcrumbs("2026 Forecast", "/blog/chinese-zodiac-2026-forecast"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-10", dateModified: "2026-04-05" },
    stats: [
      { value: "12", label: "Animal signs", description: "The full cycle is the whole point of the forecast." },
      { value: "60", label: "Year cycle", description: "The zodiac repeats inside a larger sexagenary rhythm." },
      { value: "1", label: "Year at a time", description: "Yearly forecasts work best when kept in context." },
    ],
    citations: [
      { label: "Chinese zodiac tradition", source: "Yearly reading uses the 12-animal cycle and the wider calendar system." },
      { label: "Forecasting practice", source: "Interpretations are strongest when they stay probabilistic and contextual." },
    ],
    sections: [
      {
        heading: "How to read a yearly forecast",
        content: (
          <>
            <p>
              Read the year as a change in emphasis, not a promise of outcome. Look at relationship, career, family, and personal rhythm themes one section at a time.
            </p>
            <p>
              The year forecast becomes more useful when you compare it with a full Bazi chart, because the year animal alone never tells the entire story.
            </p>
            <p>
              For 2026, the Horse symbol points toward movement, visibility, independence, travel, public expression, and faster decisions. Those themes can be useful for planning, but they need personal context. A year that encourages action for one chart may create excess speed for another.
            </p>
            <p>
              A responsible forecast separates public symbolism from private timing. Public symbolism says what the year is known for in the zodiac cycle. Private timing asks whether the arriving Fire and Horse branch support, drain, control, or complicate the individual chart.
            </p>
          </>
        ),
      },
      {
        heading: "What to check for each animal sign",
        content: (
          <>
            <p>
              Start with the relationship between the animal sign and Horse. Rat sits opposite Horse and may need stronger pacing. Tiger and Dog share a Fire frame with Horse and may find the year easier to activate. Goat has a harmony relationship with Horse and can read the year through cooperation and support.
            </p>
            <p>
              The other signs should be read through element balance and timing rather than simplified good-or-bad language. Ox, Rabbit, Dragon, Snake, Monkey, Rooster, and Pig each interact with the Horse year differently depending on the full chart and the person's current life cycle.
            </p>
            <p>
              This is why the forecast should point readers back to the Chinese Zodiac hub and Bazi calculator. The animal sign gives a fast orientation, while the Four Pillars chart gives the structure needed for a more careful answer.
            </p>
          </>
        ),
      },
      {
        heading: "What the forecast should not do",
        content: (
          <>
            <p>
              It should not claim certainty, fear, or assured luck. A good forecast stays specific enough to be actionable and broad enough to be honest about uncertainty.
            </p>
            <p>
              Use it as a planning tool, not as a substitute for judgment.
            </p>
            <p>
              It should also avoid medical, financial, or relationship guarantees. A symbolic forecast can suggest where energy may feel faster, slower, easier, or more tense, but concrete decisions still need real-world information.
            </p>
            <p>
              The strongest use is reflective: choose one area of life, identify what the year symbolism highlights there, and decide what practical behavior should change. That might mean clearer pacing, better recovery, stronger boundaries, or more willingness to be visible.
            </p>
          </>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              If you want a broader foundation, go back to the <Link href="/chinese-zodiac" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Chinese Zodiac hub</Link>, then compare it with Bazi and the learning center.
            </p>
            <p>
              If your question is personal rather than general, open the <Link href="/tools/bazi-calculator" className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">Bazi calculator</Link> and compare the 2026 year with your Day Master and month branch. That gives the forecast a better foundation than the year animal alone.
            </p>
          </>
        ),
      },
    ],
    faqs: zodiac2026Faqs,
    relatedLinks: zodiacLinks,
    cta: {
      title: "Compare the forecast with the full zodiac hub",
      description: "Yearly forecasts make more sense when you also know the underlying 12-animal structure.",
      href: "/chinese-zodiac",
      label: "Open Chinese Zodiac",
    },
  }),
  buildPage({
    slug: "bazi-vs-western-astrology",
    path: "/blog/bazi-vs-western-astrology",
    title: "Bazi vs Western Astrology: Which System Is More Accurate?",
    description: "A direct comparison of Bazi and Western astrology without flattening either system into a single winner-takes-all claim.",
    category: "Comparison",
    entityName: "Bazi vs Western Astrology",
    entityType: "BlogPosting",
    subtitle: "Two symbolic systems, two rule sets, one practical question: what are you trying to learn?",
    directAnswer:
      "Bazi and Western astrology are different symbolic languages. Western astrology centers on planets, signs, houses, and aspects. Bazi uses stems, branches, elements, and cycles. The more useful question is not which is universally more accurate, but which framework fits the question you want to ask.",
    breadcrumbs: breadcrumbs("Bazi vs Western Astrology", "/blog/bazi-vs-western-astrology"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-20", dateModified: "2026-04-08" },
    stats: [
      { value: "2", label: "Symbol systems", description: "Each has its own logic and internal rules." },
      { value: "12", label: "Signs vs branches", description: "The basic vocabulary does not line up one-to-one." },
      { value: "64", label: "Hexagrams", description: "Chinese metaphysics often uses a broader symbolic toolkit." },
    ],
    citations: [
      { label: "Western astrology", source: "Uses signs, houses, planets, and aspects as its core grammar." },
      { label: "Chinese metaphysics", source: "Uses stems, branches, elements, and calendrical cycles as its core grammar." },
    ],
    sections: [
      {
        heading: "What differs at the root",
        content: (
          <>
            <p>
              Western astrology begins with planets and a birth chart cast in a sky-based framework. Bazi begins with a calendar-based framework that maps time into stems and branches.
            </p>
            <p>
              That difference matters. It means the two systems organize information in different ways, so direct one-to-one comparisons often miss the point.
            </p>
            <p>
              A Western chart asks where planets were placed in signs, houses, and angular relationships. A Bazi chart asks how the birth moment sits inside the stem-branch calendar, how the Day Master is supported or pressured, and how timing cycles change the surrounding conditions.
            </p>
            <p>
              Because the grammars are different, the same person may receive useful but differently shaped insights from each system. One might highlight relationship patterns through Venus, Mars, and houses, while the other highlights relationship roles through Ten Gods, branch interactions, and timing pillars.
            </p>
          </>
        ),
      },
      {
        heading: "How readers should compare them",
        content: (
          <>
            <p>
              Compare them by use case. If you want a personality and timing framework rooted in Chinese calendar logic, Bazi is a better fit. If you want a planetary and house-based framework, Western astrology is the natural choice.
            </p>
            <p>
              Some readers use both, but they get better results when they treat each one as a separate language.
            </p>
            <p>
              A practical comparison starts with the question. For seasonal timing, element balance, and career rhythm, Bazi often gives a compact structure. For planetary archetypes, psychological language, and house-based life areas, Western astrology may be more familiar to many English-language readers.
            </p>
            <p>
              Avoid translating every term directly. A Bazi Day Master is not the same thing as a Sun sign, a Luck Pillar is not the same thing as a planetary transit, and an Earthly Branch is not the same thing as a zodiac sign in the Western wheel.
            </p>
          </>
        ),
      },
      {
        heading: "Where Bazi has an advantage",
        content: (
          <>
            <p>
              Bazi is especially strong when the question depends on timing, season, and practical role relationships. The chart gives a clear reference point through the Day Master, then reads other elements as resources, output, wealth, influence, or peers.
            </p>
            <p>
              This makes it useful for structured self-reflection: what supports you, what drains you, what produces momentum, and which cycles bring a theme closer to the surface. That does not make it automatically more accurate than Western astrology; it simply means the system has a different strength.
            </p>
          </>
        ),
      },
      {
        heading: "Where Western astrology has an advantage",
        content: (
          <>
            <p>
              Western astrology is strong for readers who want planetary archetypes, house topics, aspects, and a visual chart wheel. It has a large modern English-language vocabulary for psychology, relationship dynamics, and transits.
            </p>
            <p>
              The best comparison respects that depth. A reader can study both systems without forcing them to agree on every point. Agreement can be interesting, but disagreement is often where the systems reveal their different assumptions.
            </p>
          </>
        ),
      },
      {
        heading: "The practical conclusion",
        content: (
          <>
            <p>
              Accuracy is easier to judge when the question is clear. The real comparison is not &quot;which system wins?&quot; but &quot;which system gives me a better answer for this specific problem?&quot;
            </p>
            <p>
              If you are just beginning, choose one system for one question and follow its rules carefully. Mixing vocabulary too early can create confident but muddy interpretations. Once you understand each method, comparison becomes more useful and less confusing.
            </p>
          </>
        ),
      },
    ],
    faqs: baziVsWesternFaqs,
    relatedLinks: compareLinks,
    cta: {
      title: "Read the broader learning-center comparison",
      description: "If you want a simpler introduction before choosing a system, start from the learning center.",
      href: "/learn/chinese-vs-western-astrology",
      label: "Open the comparison",
    },
  }),
  buildPage({
    slug: "bazi-career-path",
    path: "/blog/bazi-career-path",
    title: "How I Used My Bazi Chart to Find My Dream Career",
    description: "A practical career-reading workflow showing how Bazi can be used as a self-reflection tool instead of a prediction machine.",
    category: "Career Story",
    entityName: "Bazi Career Path",
    entityType: "BlogPosting",
    subtitle: "A career article built around reflection, not destiny language.",
    directAnswer:
      "A Bazi career reading is most useful when it helps you notice patterns in energy, work style, and decision timing. It does not hand you one perfect job title. It helps you see where your natural strengths, pressure points, and pacing fit best.",
    breadcrumbs: breadcrumbs("Bazi Career Path", "/blog/bazi-career-path"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-18", dateModified: "2026-04-10" },
    stats: [
      { value: "4", label: "Pillars", description: "The whole chart matters, not one sign." },
      { value: "10", label: "Year cycles", description: "Career themes often shift in rhythm blocks." },
      { value: "3", label: "Questions", description: "Best-fit work starts with what energizes you, not what impresses others." },
    ],
    citations: [
      { label: "Bazi practice", source: "Career interpretation usually looks at the Day Master, elements, and timing." },
      { label: "Modern coaching use", source: "The strongest reading turns symbols into practical questions and better decisions." },
    ],
    sections: [
      {
        heading: "What changed in the reading",
        content: (
          <>
            <p>
              The chart did not tell me what job to take. It clarified the type of work environment that fits my pace, the kind of feedback I handle well, and where I burn out quickly.
            </p>
            <p>
              That shift matters. When Bazi is used well, it supports reflection instead of replacing agency.
            </p>
            <p>
              The most useful part was not a job title. It was a pattern: which conditions gave energy, which conditions created pressure, and which timing periods made experimentation easier. That turned the reading into a practical career audit instead of a prediction.
            </p>
            <p>
              For example, a chart with strong output themes may need space to create, explain, teach, design, or communicate. A chart with strong resource themes may need study, research, mentorship, or protected thinking time. A chart with strong influence themes may respond well to structure, responsibility, and clear standards.
            </p>
          </>
        ),
      },
      {
        heading: "What I looked for",
        content: (
          <>
            <p>
              I looked for repeat patterns in the chart: what strengthens the Day Master, which elements are overused, and what timing periods make work easier or harder to sustain.
            </p>
            <p>
              The goal was not certainty. It was clarity.
            </p>
            <p>
              I also checked whether the career question was about work style, industry, timing, or confidence. Bazi can speak to all four, but the reading gets sharper when the question is narrow. A vague question like "what should I do?" produces vague advice; a focused question like "what kind of work rhythm drains me?" is easier to answer responsibly.
            </p>
            <p>
              The Day Master gave the reference point, the month pillar described the strongest environment, and the Ten Gods described recurring work roles. Luck Pillars then showed when a theme might become easier to test in the real world.
            </p>
          </>
        ),
      },
      {
        heading: "How to turn symbols into career choices",
        content: (
          <>
            <p>
              Translate each symbol into a testable question. If the chart emphasizes output, ask where you can produce visible work. If it emphasizes wealth, ask where resource management and practical value matter. If it emphasizes influence, ask where structure, responsibility, and standards help you grow.
            </p>
            <p>
              Then compare the chart with actual evidence: projects that gave you energy, work that exhausted you, feedback you repeatedly receive, and environments where you make better decisions. The chart should organize observation, not override it.
            </p>
          </>
        ),
      },
      {
        heading: "How to apply it to your own path",
        content: (
          <>
            <p>
              Start by asking what kind of work actually fits your energy. Then compare that answer against your chart and the Bazi career guide on the site.
            </p>
            <p>
              Use the calculator to identify your Day Master, then read the month pillar and the strongest element patterns before jumping to career conclusions. Write down three possible work experiments and test them in small ways: a project, a conversation, a portfolio piece, or a short course.
            </p>
            <p>
              The practical value is momentum. A good career reading should leave you with one next action, one thing to stop doing, and one question to revisit after real-world feedback.
            </p>
          </>
        ),
      },
    ],
    faqs: baziCareerFaqs,
    relatedLinks: careerLinks,
    cta: {
      title: "Check your own chart with a birth date",
      description: "Use the calculator to move from general reflection into a concrete Four Pillars structure.",
      href: "/tools/bazi-calculator",
      label: "Open the calculator",
    },
  }),
  buildPage({
    slug: "five-elements-personality-test",
    path: "/blog/five-elements-personality-test",
    title: "The Five Elements Personality Test: Which Element Are You?",
    description: "A simple Five Elements self-check that helps beginners recognize Wood, Fire, Earth, Metal, and Water tendencies.",
    category: "Self-Check",
    entityName: "Five Elements Personality Test",
    entityType: "BlogPosting",
    subtitle: "A beginner-friendly way to connect personality language with the Five Elements.",
    directAnswer:
      "The Five Elements personality idea is a shorthand for tendencies, not a fixed label. Wood tends to grow and initiate, Fire tends to express and energize, Earth tends to stabilize, Metal tends to refine and cut, and Water tends to adapt and flow.",
    breadcrumbs: breadcrumbs("Five Elements Personality Test", "/blog/five-elements-personality-test"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-02-05", dateModified: "2026-04-12" },
    stats: [
      { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water." },
      { value: "1", label: "Self-check", description: "Start with observable habits, not stereotypes." },
      { value: "3", label: "Layers", description: "Element, context, and timing should be read together." },
    ],
    citations: [
      { label: "Wu Xing tradition", source: "Five Elements describes phases of change rather than static objects." },
      { label: "Modern educational use", source: "Good personality reading keeps the language flexible and practical." },
    ],
    sections: [
      {
        heading: "How the test works",
        content: (
          <>
            <p>
              A useful test asks what you do under pressure, how you organize time, and how you respond to change. Those behaviors map more cleanly to element language than slogans do.
            </p>
            <p>
              The test is a starting point. For a real reading, compare the result with a full Bazi chart and the Five Elements guide.
            </p>
            <p>
              Wood tends to initiate, plan, and grow. Fire tends to express, connect, and energize. Earth tends to stabilize, include, and maintain. Metal tends to refine, decide, and set standards. Water tends to observe, adapt, and move around obstacles.
            </p>
            <p>
              A self-check should ask which behavior appears repeatedly, not which image sounds most flattering. Most people have more than one strong element pattern, and the context can change which one shows up.
            </p>
          </>
        ),
      },
      {
        heading: "Element questions to ask yourself",
        content: (
          <>
            <p>
              For Wood, ask whether you naturally create direction and pursue growth. For Fire, ask whether you energize groups and seek visibility. For Earth, ask whether people rely on you for steadiness and care. For Metal, ask whether you sharpen systems and make hard choices. For Water, ask whether you adapt quickly and notice hidden patterns.
            </p>
            <p>
              Then ask the pressure version of each element. Wood can become impatient, Fire can become scattered, Earth can become over-responsible, Metal can become rigid, and Water can become avoidant. These pressure patterns often reveal the element more clearly than the flattering traits.
            </p>
          </>
        ),
      },
      {
        heading: "What not to do",
        content: (
          <>
            <p>
              Do not treat one element as your entire identity. Most people show a mix, and the chart context matters more than a single label.
            </p>
            <p>
              The value is in pattern recognition, not self-boxing.
            </p>
            <p>
              Also avoid deciding that one element is good and another is bad. In Wu Xing, the elements describe phases of movement and relationship. Each one can support balance or create imbalance depending on timing, strength, and context.
            </p>
            <p>
              A personality quiz becomes more useful when it leads back to observation: what you do, what drains you, what restores you, and what kind of environment helps your better qualities show up.
            </p>
          </>
        ),
      },
      {
        heading: "How to continue learning",
        content: (
          <>
            <p>
              Read the <TermLink term="Wu Xing">Five Elements</TermLink> page, then compare your result with the learning center resource list and the Bazi calculator.
            </p>
            <p>
              If you want a fuller answer, generate a Bazi chart and compare the self-check result with the Day Master, month branch, visible stems, and hidden stems. That comparison will show whether the element is central to your chart or simply a behavior you have learned through experience.
            </p>
          </>
        ),
      },
    ],
    faqs: fiveElementsTestFaqs,
    relatedLinks: elementsLinks,
    cta: {
      title: "Learn the Five Elements in depth",
      description: "Use the core Five Elements page to move from self-test language into the underlying framework.",
      href: "/bazi/five-elements",
      label: "Open Five Elements",
    },
  }),
];

const editorialSeeds: EditorialSeed[] = [
  {
    slug: "how-to-read-a-bazi-chart",
    title: "How to Read a Bazi Chart Without Getting Overwhelmed",
    description: "A simple workflow for reading Day Master, elements, pillars, and timing in a Bazi chart.",
    category: "Bazi Guide",
    entity: "Bazi Chart Reading",
    focus: "chart structure",
    primaryHref: "/tools/bazi-calculator",
    primaryLabel: "Open the Bazi calculator",
  },
  {
    slug: "day-master-meaning",
    title: "What Your Day Master Means in Bazi",
    description: "A beginner guide to the Day Master as the anchor of a Four Pillars chart.",
    category: "Bazi Guide",
    entity: "Day Master",
    focus: "identity anchor",
    primaryHref: "/bazi/what-is-bazi",
    primaryLabel: "Read Bazi basics",
  },
  {
    slug: "heavenly-stems-beginner-guide",
    datePublished: "2026-03-20",
    dateModified: "2026-04-28",
    title: "Heavenly Stems: The 10 Visible Energies in Bazi",
    description: "A plain-English guide to the 10 Heavenly Stems and how they appear in a chart.",
    category: "Bazi Guide",
    entity: "Heavenly Stems",
    focus: "visible stem energy",
    primaryHref: "/bazi/heavenly-stems",
    primaryLabel: "Open Heavenly Stems",
  },
  {
    slug: "earthly-branches-hidden-stems",
    datePublished: "2026-03-22",
    dateModified: "2026-04-28",
    title: "Earthly Branches and Hidden Stems Explained",
    description: "How branches, animals, seasons, and hidden stems add depth to Bazi interpretation.",
    category: "Bazi Guide",
    entity: "Earthly Branches",
    focus: "hidden stem context",
    primaryHref: "/bazi/earthly-branches",
    primaryLabel: "Open Earthly Branches",
  },
  {
    slug: "ten-gods-bazi-relationships",
    datePublished: "2026-03-24",
    dateModified: "2026-04-29",
    title: "Ten Gods in Bazi: Relationship Roles Made Simple",
    description: "A practical guide to reading Ten Gods as roles around the Day Master.",
    category: "Bazi Guide",
    entity: "Ten Gods",
    focus: "relationship roles",
    primaryHref: "/bazi/ten-gods",
    primaryLabel: "Open Ten Gods",
  },
  {
    slug: "luck-pillars-life-cycles",
    datePublished: "2026-03-26",
    dateModified: "2026-04-29",
    title: "Luck Pillars in Bazi: How 10-Year Cycles Work",
    description: "How Bazi uses 10-year cycles to read changing conditions without fatalistic claims.",
    category: "Bazi Guide",
    entity: "Luck Pillars",
    focus: "10-year timing",
    primaryHref: "/bazi/luck-pillars",
    primaryLabel: "Open Luck Pillars",
  },
  {
    slug: "i-ching-for-beginners",
    title: "I Ching for Beginners: How to Ask a Clear Question",
    description: "A practical guide to using the I Ching for structured reflection and decision context.",
    category: "I Ching Guide",
    entity: "I Ching for Beginners",
    focus: "question framing",
    primaryHref: "/tools/i-ching-oracle",
    primaryLabel: "Open I Ching Oracle",
  },
  {
    slug: "eight-trigrams-meaning",
    datePublished: "2026-03-28",
    dateModified: "2026-04-30",
    title: "Eight Trigrams: The Building Blocks of the I Ching",
    description: "What the eight trigrams represent and why they matter in I Ching and Feng Shui.",
    category: "I Ching Guide",
    entity: "Eight Trigrams",
    focus: "trigram structure",
    primaryHref: "/i-ching/eight-trigrams",
    primaryLabel: "Open Eight Trigrams",
  },
  {
    slug: "changing-lines-i-ching",
    title: "Changing Lines in the I Ching: What They Mean",
    description: "How changing lines move a reading from the present hexagram toward a relating hexagram.",
    category: "I Ching Guide",
    entity: "Changing Lines",
    focus: "line movement",
    primaryHref: "/i-ching/changing-lines",
    primaryLabel: "Open Changing Lines",
  },
  {
    slug: "how-to-cast-i-ching-coins",
    datePublished: "2026-03-30",
    dateModified: "2026-04-30",
    title: "How to Cast the I Ching with Three Coins",
    description: "A step-by-step explanation of six coin lines, old yin, old yang, and relating hexagrams.",
    category: "I Ching Guide",
    entity: "I Ching Coin Casting",
    focus: "coin method",
    primaryHref: "/i-ching/how-to-cast",
    primaryLabel: "Open casting guide",
  },
  {
    slug: "hexagram-1-creative-modern-reading",
    datePublished: "2026-04-01",
    dateModified: "2026-05-01",
    title: "Hexagram 1, The Creative: A Modern Reading",
    description: "How to read Hexagram 1 as initiative, disciplined power, and responsible momentum.",
    category: "I Ching Guide",
    entity: "Hexagram 1",
    focus: "creative force",
    primaryHref: "/i-ching/hexagram-1",
    primaryLabel: "Open Hexagram 1",
  },
  {
    slug: "hexagram-2-receptive-modern-reading",
    datePublished: "2026-04-02",
    dateModified: "2026-05-01",
    title: "Hexagram 2, The Receptive: A Modern Reading",
    description: "How to read Hexagram 2 as support, patience, cultivation, and grounded response.",
    category: "I Ching Guide",
    entity: "Hexagram 2",
    focus: "receptive support",
    primaryHref: "/i-ching/hexagram-2",
    primaryLabel: "Open Hexagram 2",
  },
  {
    slug: "ziwei-doushu-beginners",
    datePublished: "2026-04-03",
    dateModified: "2026-05-02",
    title: "Ziwei Doushu for Beginners: Stars, Palaces, and Timing",
    description: "A plain-English introduction to Purple Star Astrology and its palace-based chart logic.",
    category: "Ziwei Guide",
    entity: "Ziwei Doushu",
    focus: "palace chart logic",
    primaryHref: "/ziwei",
    primaryLabel: "Open Ziwei hub",
  },
  {
    slug: "ziwei-12-palaces",
    datePublished: "2026-04-04",
    dateModified: "2026-05-02",
    title: "The 12 Ziwei Palaces: What Each Life Area Means",
    description: "A practical overview of Life, Spouse, Career, Wealth, and other Ziwei palaces.",
    category: "Ziwei Guide",
    entity: "12 Ziwei Palaces",
    focus: "life areas",
    primaryHref: "/ziwei/twelve-palaces",
    primaryLabel: "Open 12 palaces",
  },
  {
    slug: "ziwei-major-stars-overview",
    datePublished: "2026-04-05",
    dateModified: "2026-05-03",
    title: "14 Major Ziwei Stars: A Beginner Overview",
    description: "How the 14 major stars create the first layer of meaning in Purple Star Astrology.",
    category: "Ziwei Guide",
    entity: "14 Major Ziwei Stars",
    focus: "major-star vocabulary",
    primaryHref: "/ziwei/major-stars",
    primaryLabel: "Open major stars",
  },
  {
    slug: "ziwei-life-palace-meaning",
    datePublished: "2026-04-06",
    dateModified: "2026-05-03",
    title: "Life Palace in Ziwei: Why It Anchors the Chart",
    description: "How the Life Palace frames identity, direction, and the first reading layer in Ziwei.",
    category: "Ziwei Guide",
    entity: "Life Palace",
    focus: "chart anchor",
    primaryHref: "/ziwei/life-palace",
    primaryLabel: "Open Life Palace",
  },
  {
    slug: "feng-shui-home-basics",
    datePublished: "2026-04-07",
    dateModified: "2026-05-04",
    title: "Feng Shui Home Basics: Flow, Support, and Function",
    description: "A practical home Feng Shui checklist focused on qi flow, support, light, and use.",
    category: "Feng Shui Guide",
    entity: "Home Feng Shui",
    focus: "home flow",
    primaryHref: "/feng-shui",
    primaryLabel: "Open Feng Shui",
  },
  {
    slug: "front-door-feng-shui",
    datePublished: "2026-04-08",
    dateModified: "2026-05-04",
    title: "Front Door Feng Shui: The Mouth of Qi Explained",
    description: "Why the front door matters in Feng Shui and how to evaluate entry flow responsibly.",
    category: "Feng Shui Guide",
    entity: "Front Door Feng Shui",
    focus: "entrance qi",
    primaryHref: "/feng-shui/home/front-door",
    primaryLabel: "Open front door guide",
  },
  {
    slug: "bedroom-feng-shui-rest",
    datePublished: "2026-04-09",
    dateModified: "2026-05-05",
    title: "Bedroom Feng Shui for Better Rest",
    description: "How to read bed position, privacy, light, and calmer yin energy without fear-based claims.",
    category: "Feng Shui Guide",
    entity: "Bedroom Feng Shui",
    focus: "rest and layout",
    primaryHref: "/feng-shui/home/bedroom",
    primaryLabel: "Open bedroom guide",
  },
  {
    slug: "office-desk-feng-shui",
    datePublished: "2026-04-10",
    dateModified: "2026-05-05",
    title: "Office Desk Feng Shui: Command Position and Focus",
    description: "A simple office desk Feng Shui guide for visibility, support, and better work habits.",
    category: "Feng Shui Guide",
    entity: "Office Desk Feng Shui",
    focus: "desk command",
    primaryHref: "/feng-shui/office/desk",
    primaryLabel: "Open desk guide",
  },
  {
    slug: "chinese-zodiac-compatibility-guide",
    title: "Chinese Zodiac Compatibility: Harmony, Triads, and Clashes",
    description: "How to compare zodiac signs through harmony pairs, three-harmony groups, and clash pairs.",
    category: "Zodiac Guide",
    entity: "Chinese Zodiac Compatibility",
    focus: "relationship patterns",
    primaryHref: "/tools/zodiac-compatibility",
    primaryLabel: "Open compatibility tool",
  },
  {
    slug: "year-of-the-horse-2026-guide",
    datePublished: "2026-04-12",
    dateModified: "2026-05-06",
    title: "Year of the Horse 2026: What the Symbol Suggests",
    description: "How to read Horse-year themes around movement, independence, visibility, and pacing.",
    category: "Yearly Forecast",
    entity: "Year of the Horse 2026",
    focus: "Horse year themes",
    primaryHref: "/chinese-zodiac/2026-forecast",
    primaryLabel: "Open 2026 forecast",
  },
  {
    slug: "rat-and-horse-clash",
    datePublished: "2026-04-14",
    dateModified: "2026-05-06",
    title: "Rat and Horse Clash: What It Means in the Zodiac",
    description: "A responsible explanation of the Rat-Horse opposition as contrast, pacing, and boundaries.",
    category: "Zodiac Guide",
    entity: "Rat Horse Clash",
    focus: "branch opposition",
    primaryHref: "/chinese-zodiac/compatibility",
    primaryLabel: "Open compatibility guide",
  },
  {
    slug: "wood-element-career-style",
    datePublished: "2026-04-16",
    dateModified: "2026-05-07",
    title: "Wood Element Career Style: Growth, Planning, and Direction",
    description: "How Wood element language can describe career tendencies without boxing people in.",
    category: "Career Story",
    entity: "Wood Element Career",
    focus: "growth and planning",
    primaryHref: "/bazi/five-elements",
    primaryLabel: "Open Five Elements",
  },
  {
    slug: "fire-element-visibility",
    datePublished: "2026-04-18",
    dateModified: "2026-05-07",
    title: "Fire Element in Work and Relationships",
    description: "How Fire element themes show up as visibility, warmth, expression, and momentum.",
    category: "Self-Check",
    entity: "Fire Element",
    focus: "visibility and warmth",
    primaryHref: "/bazi/five-elements",
    primaryLabel: "Open Five Elements",
  },
];

function createEditorialPost(seed: EditorialSeed): BlogPost {
  const path = `/blog/${seed.slug}`;

  return buildPage({
    slug: seed.slug,
    path,
    title: seed.title,
    description: seed.description,
    category: seed.category,
    entityName: seed.entity,
    entityType: "BlogPosting",
    subtitle: `A practical editorial guide to ${seed.focus}.`,
    directAnswer: `${seed.entity} is best understood as a practical pattern language, not a total identity label. This article explains ${seed.focus}, shows how to place the symbol inside its wider system, names the mistakes that create shallow readings, and points you toward the right guide or tool for deeper context.`,
    breadcrumbs: breadcrumbs(seed.title, path),
    schema: { headline: "", description: "", url: "", datePublished: "2026-03-15", dateModified: "2026-04-25" },
    stats: [
      { value: "4", label: "Reading steps", description: "Define the symbol, check context, apply, then review." },
      { value: "1", label: "Main question", description: "Each article answers one clear search intent." },
      { value: "3+", label: "Next links", description: "Every article routes readers to a guide, tool, or foundation page." },
    ],
    citations: [
      { label: "Chinese metaphysics tradition", source: "Classical systems use symbols, cycles, and context as interpretation layers." },
      { label: "Chinese calendar tradition", source: "Many topics rely on stems, branches, elements, and seasonal timing." },
    ],
    sections: [
      {
        heading: `Why ${seed.entity} matters`,
        content: (
          <>
            <p>
              {seed.description} The useful reading starts with definition, then checks context, timing, and practical behavior. That order matters because a symbol taken out of its system can sound persuasive while saying very little.
            </p>
            <p>
              In <cite>Chinese metaphysics tradition</cite>, symbols work best as structured prompts. They help readers ask better questions without treating one image as the whole answer.
            </p>
            <p>
              For this topic, the core task is to keep the visible idea and the hidden structure together. A beginner can use the article for quick orientation, while a serious reader should trace each conclusion back to the branch, element, palace, hexagram, room condition, or timing cycle that supports it.
            </p>
          </>
        ),
      },
      {
        heading: "How to use the idea step by step",
        content: (
          <>
            <p>
              Use this topic as a conversation with your own observations. Compare it with related guides, then test the idea through the appropriate calculator, oracle, or knowledge page.
            </p>
            <p>
              If the topic depends on birth data or yearly cycles, check the result against <cite>Chinese calendar tradition</cite> before drawing conclusions.
            </p>
            <p>
              A useful workflow is simple: define the term, identify which system it belongs to, note the surrounding context, then ask what practical decision or reflection the pattern supports. When the topic belongs to Bazi, compare it with the Day Master and timing cycle. When it belongs to I Ching, compare it with the question, primary hexagram, changing lines, and relating hexagram. When it belongs to Feng Shui, compare it with observable space before applying symbolic formulas.
            </p>
          </>
        ),
        stats: [{ value: "2", label: "Context checks", description: "Look at the symbol itself and the wider system around it." }],
      },
      {
        heading: "What to compare before deciding",
        content: (
          <>
            <p>
              Compare the topic with at least one foundation page before treating it as advice. The same symbolic word can shift meaning across systems: an element in Bazi describes chart relationships, an element in Feng Shui can describe material or directional qualities, and an image in the I Ching describes a changing situation.
            </p>
            <p>
              This comparison is what keeps the article useful for GEO and human readers. It gives AI systems clear entity relationships and gives readers a way to verify the claim inside the site structure instead of accepting an isolated paragraph.
            </p>
          </>
        ),
      },
      {
        heading: "What to avoid",
        content: (
          <>
            <p>
              Avoid using one symbol as a total identity label or an assured outcome. The site uses symbolic systems for structured reflection, not fear-based certainty.
            </p>
            <p>
              Also avoid skipping the method. A strong article should say how the reading was reached: which term was defined, which context was checked, what alternative interpretation was considered, and why the next page or tool is the right place to continue.
            </p>
          </>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <>
            <p>
              Continue with <Link href={seed.primaryHref} className={linkClass}>{seed.primaryLabel}</Link>, then return to the beginner guide if you need more vocabulary before comparing systems.
            </p>
            <p>
              If you are comparing several traditions at once, use the <Link href="/learn/which-system" className={linkClass}>which system guide</Link> to decide whether the question belongs to Bazi, I Ching, Feng Shui, Ziwei, or the Chinese zodiac. That choice usually improves the reading more than adding more symbols.
            </p>
          </>
        ),
      },
    ],
    faqs: fireElementFaqs,
    relatedLinks: [
      { title: seed.primaryLabel, href: seed.primaryHref, description: "The canonical reference page for this topic — start here for the full definition and structure." },
      { title: "Beginner's Guide", href: "/learn/beginners-guide", description: "Return to the learning path if the vocabulary is new." },
      { title: "Common Misconceptions", href: "/learn/common-misconceptions", description: "Avoid common reading mistakes and oversimplified claims." },
    ],
    cta: {
      title: seed.primaryLabel,
      description: "Move from the article into a structured page or tool built for the same topic.",
      href: seed.primaryHref,
      label: seed.primaryLabel,
    },
  });
}

// Dedicated FAQ set for the Day Master guide. Replaces the generic baseFaqs so
// the FAQPage structured data actually covers the high-impression queries this
// page already ranks for (e.g. "bazi day master is the day stem source",
// "how to find my day master", "strong vs weak day master").
const dayMasterFaqs: FAQ[] = [
  {
    question: "Is the day master the day stem (the heavenly stem of the day pillar)?",
    answer:
      "Yes. The Day Master (日主, Ri Zhu) is the day stem — the Heavenly Stem on top of the day pillar in your Bazi chart. \"Day master source\" and \"day stem source\" both refer to the same thing: the day pillar's heavenly stem. This is the classical definition recorded in Yuan Hai Zi Ping (《渊海子平》).",
  },
  {
    question: "How do I find my day master?",
    answer:
      "Generate your four pillars from your birth date, time, and place, then read the top character of the day pillar — that heavenly stem is your Day Master. The free Bazi calculator on this site identifies it for you instantly, so you do not need to consult a Ten Thousand Year calendar by hand.",
  },
  {
    question: "How many day masters are there?",
    answer:
      "There are exactly 10 possible day masters, because there are 10 Heavenly Stems: Jia (Yang Wood), Yi (Yin Wood), Bing (Yang Fire), Ding (Yin Fire), Wu (Yang Earth), Ji (Yin Earth), Geng (Yang Metal), Xin (Yin Metal), Ren (Yang Water), and Gui (Yin Water).",
  },
  {
    question: "What does a strong vs weak day master mean?",
    answer:
      "A Day Master is \"strong\" when supportive elements (the same element plus the element that produces it) are abundant in the chart, and \"weak\" when draining, controlling, or wealth elements dominate. Neither is good or bad on its own — the strength reading simply tells you which elements are favorable for balance.",
  },
  {
    question: "Is the day master the same as my Chinese zodiac sign?",
    answer:
      "No. Your zodiac animal comes from the year branch, while the Day Master comes from the day stem. Two people born in the same zodiac year usually have different Day Masters, which is why Bazi gives a far more individual reading than the year animal alone.",
  },
];

const highIntentBlogPosts: BlogPost[] = [
  buildPage({
    slug: "how-to-read-a-bazi-chart",
    path: "/blog/how-to-read-a-bazi-chart",
    title: "How to Read a Bazi Chart Without Getting Overwhelmed",
    description: "A simple workflow for reading Day Master, elements, pillars, and timing in a Bazi chart.",
    category: "Bazi Guide",
    entityName: "Bazi Chart Reading",
    entityType: "BlogPosting",
    subtitle: "A step-by-step reading order for turning a Four Pillars chart into useful questions.",
    directAnswer:
      "To read a Bazi chart, start with the Day Master, then inspect the month branch, element balance, Ten Gods, pillar positions, and timing cycles. Read the chart as a structured pattern of tendencies and conditions, not as a single label. Use a calculator first, then interpret one layer at a time.",
    breadcrumbs: breadcrumbs("How to Read a Bazi Chart", "/blog/how-to-read-a-bazi-chart"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-02-15", dateModified: "2026-04-15" },
    stats: [
      { value: "4", label: "Pillars", description: "Year, month, day, and hour form the chart." },
      { value: "10", label: "Ten Gods", description: "Relationship roles are read around the Day Master." },
      { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water shape the reading." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Bazi converts the birth moment into stems, branches, and seasonal timing." },
      { label: "Classical Four Pillars practice", source: "Chart reading emphasizes Day Master, month command, structure, and timing." },
    ],
    sections: [
      {
        heading: "Step 1: identify the Day Master",
        content: (
          <>
            <p>
              The Day Master is the heavenly stem on the day pillar. It anchors the chart because the other stems, branches, and <TermLink term="Ten Gods">Ten Gods</TermLink> are read in relation to it.
            </p>
            <p>
              According to <cite>Classical Four Pillars practice</cite>, a chart does not begin with the year animal. It begins with the day stem and the conditions around it.
            </p>
          </>
        ),
      },
      {
        heading: "Step 2: read the month and element balance",
        content: (
          <>
            <p>
              The month branch shows seasonal context. A Wood Day Master born in spring is read differently from the same stem born in autumn because the surrounding qi is different.
            </p>
            <p>
              This is where <TermLink term="Five Elements">Five Elements</TermLink> vocabulary becomes practical: you are checking support, pressure, output, resources, and flow. In <cite>Chinese calendar tradition</cite>, seasonal context changes how those relationships are read.
            </p>
          </>
        ),
        stats: [{ value: "24", label: "Solar terms", description: "Month context is tied to seasonal calendar divisions." }],
      },
      {
        heading: "Step 3: compare pillars and Ten Gods",
        content: (
          <>
            <p>
              The year pillar gives broader background, the month pillar shows environment, the day pillar centers the person and close partnership themes, and the hour pillar often points to later aims or output.
            </p>
            <p>
              Ten Gods then describe roles around the Day Master, such as resource, output, wealth, influence, and peers.
            </p>
          </>
        ),
      },
      {
        heading: "Step 4: add timing without overclaiming",
        content: (
          <>
            <p>
              <TermLink term="Luck Pillars">Luck Pillars</TermLink> add changing conditions. They do not replace judgment; they help you notice when certain chart themes become more active.
            </p>
            <p>
              Use the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link>, then compare your chart with the <Link href="/bazi" className={linkClass}>Bazi hub</Link> layer by layer.
            </p>
          </>
        ),
      },
    ],
    faqs: howToReadBaziFaqs,
    relatedLinks: baziLinks,
    cta: {
      title: "Generate your chart first",
      description: "Use the calculator, then read the Day Master, elements, pillars, and timing in order.",
      href: "/tools/bazi-calculator",
      label: "Open the Bazi calculator",
    },
  }),
  buildPage({
    slug: "day-master-meaning",
    path: "/blog/day-master-meaning",
    title: "What Your Day Master Means in Bazi",
    description: "A beginner guide to the Day Master as the anchor of a Four Pillars chart.",
    category: "Bazi Guide",
    entityName: "Day Master Meaning",
    entityType: "BlogPosting",
    subtitle: "A practical explanation of why the day stem anchors a Bazi reading.",
    directAnswer:
      "The Day Master in Bazi is the heavenly stem of the day pillar and the reference point for the whole chart. It does not describe your entire identity by itself. It shows the chart's anchor, then the surrounding elements, branches, Ten Gods, and timing explain how that anchor behaves in context.",
    breadcrumbs: breadcrumbs("Day Master Meaning", "/blog/day-master-meaning"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-02-22", dateModified: "2026-04-18" },
    stats: [
      { value: "10", label: "Possible stems", description: "Each Day Master is one of the 10 Heavenly Stems." },
      { value: "5", label: "Element families", description: "Every stem belongs to Wood, Fire, Earth, Metal, or Water." },
      { value: "4", label: "Chart pillars", description: "The Day Master is read inside the full Four Pillars chart." },
    ],
    citations: [
      { label: "Classical Four Pillars practice", source: "The day stem anchors Ten Gods and relationship roles in a Bazi chart." },
      { label: "Chinese calendar tradition", source: "The day pillar is part of the stem-branch cycle used to classify time." },
    ],
    sections: [
      {
        heading: "What the Day Master is",
        content: (
          <>
            <p>
              The Day Master is one of the <TermLink term="Heavenly Stems">Heavenly Stems</TermLink> found on the day pillar. It gives the reading a reference point, similar to the “you are here” marker on a map.
            </p>
            <p>
              In <cite>Classical Four Pillars practice</cite>, the Day Master is not read alone. The rest of the chart shows conditions, relationships, and timing around it.
            </p>
          </>
        ),
      },
      {
        heading: "How element identity works",
        content: (
          <>
            <p>
              A Jia Wood Day Master is different from Yi Wood, and both are different from Bing Fire, Ding Fire, or Ren Water. The element family gives the broad image; the yin-yang stem gives the more specific expression.
            </p>
            <p>
              Read the <Link href="/bazi/five-elements" className={linkClass}>Five Elements guide</Link> before turning the Day Master into personality language.
            </p>
          </>
        ),
        stats: [{ value: "2", label: "Stem polarities", description: "Each element appears in yin and yang forms." }],
      },
      {
        heading: "Why strength and season matter",
        content: (
          <>
            <p>
              The same Day Master can behave differently depending on the month branch, supporting elements, controlling elements, and overall chart flow.
            </p>
            <p>
              According to <cite>Chinese calendar tradition</cite>, seasonal timing matters because the calendar describes changing qi, not just dates.
            </p>
          </>
        ),
      },
      {
        heading: "How to use it in a reading",
        content: (
          <>
            <p>
              Use the Day Master to organize the chart. Then add Ten Gods, pillar positions, and Luck Pillars to understand what supports, challenges, expresses, or redirects it.
            </p>
            <p>
              If you do not know your Day Master yet, open the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> and start with the day stem.
            </p>
          </>
        ),
      },
    ],
    faqs: dayMasterMeaningFaqs,
    relatedLinks: baziLinks,
    cta: {
      title: "Find your Day Master",
      description: "Generate a chart first, then use this article to read the day stem in context.",
      href: "/tools/bazi-calculator",
      label: "Open the Bazi calculator",
    },
  }),
  buildPage({
    slug: "i-ching-for-beginners",
    path: "/blog/i-ching-for-beginners",
    title: "I Ching for Beginners: How to Ask a Clear Question",
    description: "A practical guide to using the I Ching for structured reflection and decision context.",
    category: "I Ching Guide",
    entityName: "I Ching for Beginners",
    entityType: "BlogPosting",
    subtitle: "A beginner workflow for asking better questions and reading hexagrams carefully.",
    directAnswer:
      "Beginners should use the I Ching by asking one clear open question, casting a hexagram, reading the judgment and image, then reviewing any changing lines. The reading is strongest as structured reflection about a situation in motion, not as a shortcut that removes responsibility for a decision.",
    breadcrumbs: breadcrumbs("I Ching for Beginners", "/blog/i-ching-for-beginners"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-03-01", dateModified: "2026-04-20" },
    stats: [
      { value: "64", label: "Hexagrams", description: "Each hexagram describes a symbolic situation." },
      { value: "6", label: "Lines", description: "A hexagram is built from six yin or yang lines." },
      { value: "8", label: "Trigrams", description: "Two trigrams combine to form each hexagram." },
    ],
    citations: [
      { label: "I Ching", source: "The Book of Changes uses hexagrams, judgments, images, and lines to describe change." },
      { label: "I Ching commentarial tradition", source: "Traditional readings emphasize situation, image, timing, and ethical response." },
    ],
    sections: [
      {
        heading: "Ask one clear question",
        content: (
          <>
            <p>
              A useful question is open, specific, and connected to a real choice. Instead of asking for certainty, ask what the situation is showing, what needs attention, or how to approach a transition.
            </p>
            <p>
              The <cite>I Ching</cite> answers through symbolic situations. Better questions give the symbol room to be practical.
            </p>
          </>
        ),
      },
      {
        heading: "Read the primary hexagram first",
        content: (
          <>
            <p>
              The primary hexagram describes the current situation. Read its name, judgment, image, and trigrams before jumping to changing lines.
            </p>
            <p>
              If the vocabulary is new, start with the <Link href="/i-ching" className={linkClass}>I Ching hub</Link> and the <Link href="/i-ching/eight-trigrams" className={linkClass}>Eight Trigrams guide</Link>.
            </p>
          </>
        ),
        stats: [{ value: "2", label: "Trigrams", description: "Upper and lower trigrams shape the hexagram image." }],
      },
      {
        heading: "Then read changing lines",
        content: (
          <>
            <p>
              Changing lines show where the situation is moving. Read them in order and ask how each line changes the practical advice.
            </p>
            <p>
              The <cite>I Ching commentarial tradition</cite> treats lines as positions in a developing situation, which is why line context matters.
            </p>
          </>
        ),
      },
      {
        heading: "Use the reading as reflection",
        content: (
          <>
            <p>
              Write down the question, hexagram, changing lines, and one practical next step. Then revisit the reading after action reveals more context.
            </p>
            <p>
              You can practice with the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> when you are ready to cast a reading.
            </p>
          </>
        ),
      },
    ],
    faqs: iChingBeginnersFaqs,
    relatedLinks: [
      { title: "I Ching Hub", href: "/i-ching", description: "Learn the full structure of hexagrams, trigrams, and lines." },
      { title: "Changing Lines", href: "/blog/changing-lines-i-ching", description: "Go deeper into moving-line interpretation." },
      { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Cast a reading after framing a clear question." },
    ],
    cta: {
      title: "Cast a clear I Ching reading",
      description: "Use the oracle after writing one focused question and deciding what kind of guidance you need.",
      href: "/tools/i-ching-oracle",
      label: "Open I Ching Oracle",
    },
  }),
  buildPage({
    slug: "changing-lines-i-ching",
    path: "/blog/changing-lines-i-ching",
    title: "Changing Lines in the I Ching: What They Mean",
    description: "How changing lines move a reading from the present hexagram toward a relating hexagram.",
    category: "I Ching Guide",
    entityName: "Changing Lines in the I Ching",
    entityType: "BlogPosting",
    subtitle: "A practical guide to reading moving lines without losing the main hexagram.",
    directAnswer:
      "Changing lines in the I Ching show where a situation is active, unstable, or moving toward a new pattern. Read the primary hexagram first, then the changing lines, then the relating hexagram. The lines refine the reading; they should not be detached from the question or the main hexagram.",
    breadcrumbs: breadcrumbs("Changing Lines", "/blog/changing-lines-i-ching"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-03-08", dateModified: "2026-04-22" },
    stats: [
      { value: "6", label: "Line positions", description: "Each hexagram has six possible places of change." },
      { value: "64", label: "Hexagrams", description: "A relating hexagram can emerge from changed lines." },
      { value: "2", label: "Hexagram layers", description: "Primary and relating hexagrams frame the movement." },
    ],
    citations: [
      { label: "I Ching", source: "Changing lines are part of the Book of Changes line-text structure." },
      { label: "I Ching commentarial tradition", source: "Line position, timing, and relationship to the whole hexagram shape interpretation." },
    ],
    sections: [
      {
        heading: "What a changing line marks",
        content: (
          <>
            <p>
              A changing line points to the active part of the reading. It shows where the situation is moving, opening, tightening, or asking for a different response.
            </p>
            <p>
              In the <cite>I Ching</cite>, line text is not a separate fortune. It belongs to a line position inside a full hexagram.
            </p>
          </>
        ),
      },
      {
        heading: "Read primary, lines, then relating hexagram",
        content: (
          <>
            <p>
              First read the primary hexagram as the situation. Next read changing lines in order from bottom to top. Finally, read the relating hexagram as the direction of change or emerging pattern.
            </p>
            <p>
              The <cite>I Ching commentarial tradition</cite> pays attention to timing, position, and relationship between lines, so order matters.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "Reading order", description: "Primary hexagram, changing lines, relating hexagram." }],
      },
      {
        heading: "How many lines should you emphasize?",
        content: (
          <>
            <p>
              If one line changes, give it focused attention. If several lines change, look for the common theme and avoid turning the reading into scattered advice.
            </p>
            <p>
              When many lines change, the primary and relating hexagrams often matter more than treating every line as equally loud.
            </p>
          </>
        ),
      },
      {
        heading: "Practice with a clear question",
        content: (
          <>
            <p>
              Write the question, cast the hexagram, note the changing lines, then summarize the reading in one sentence before taking action.
            </p>
            <p>
              Use the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> or review the <Link href="/i-ching/changing-lines" className={linkClass}>changing lines guide</Link> for more structure.
            </p>
          </>
        ),
      },
    ],
    faqs: changingLinesFaqs,
    relatedLinks: [
      { title: "Changing Lines Guide", href: "/i-ching/changing-lines", description: "Read the knowledge-page version of moving-line interpretation." },
      { title: "I Ching for Beginners", href: "/blog/i-ching-for-beginners", description: "Start with question framing before line interpretation." },
      { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Cast a reading and practice the three-step reading order." },
    ],
    cta: {
      title: "Practice changing-line interpretation",
      description: "Cast a reading, then read the primary hexagram, moving lines, and relating hexagram in order.",
      href: "/tools/i-ching-oracle",
      label: "Open I Ching Oracle",
    },
  }),
  buildPage({
    slug: "chinese-zodiac-compatibility-guide",
    path: "/blog/chinese-zodiac-compatibility-guide",
    title: "Chinese Zodiac Compatibility: Harmony, Triads, and Clashes",
    description: "How to compare zodiac signs through harmony pairs, three-harmony groups, and clash pairs.",
    category: "Zodiac Guide",
    entityName: "Chinese Zodiac Compatibility Guide",
    entityType: "BlogPosting",
    subtitle: "A relationship-pattern guide that keeps zodiac compatibility practical and non-reductive.",
    directAnswer:
      "Chinese zodiac compatibility compares animal signs through harmony pairs, three-harmony groups, and clash relationships, but the year animal is only one layer. Use compatibility as a conversation about rhythm, values, and timing. For deeper relationship reading, compare full Bazi charts rather than relying on signs alone.",
    breadcrumbs: breadcrumbs("Chinese Zodiac Compatibility", "/blog/chinese-zodiac-compatibility-guide"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-03-15", dateModified: "2026-04-25" },
    stats: [
      { value: "12", label: "Animal signs", description: "Compatibility starts with the 12-branch zodiac cycle." },
      { value: "4", label: "Triad groups", description: "Three-harmony groups organize supportive rhythms." },
      { value: "6", label: "Opposition pairs", description: "Clash pairs describe contrast and pacing differences." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Zodiac animals correspond to earthly branches inside the wider calendar system." },
      { label: "Earthly Branch tradition", source: "Harmony, combination, and clash relationships are branch relationship patterns." },
    ],
    sections: [
      {
        heading: "What compatibility actually compares",
        content: (
          <>
            <p>
              <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> compatibility compares earthly branch relationships. Harmony, triads, and clashes describe interaction patterns, not the whole relationship.
            </p>
            <p>
              According to <cite>Earthly Branch tradition</cite>, animal signs are branch symbols. They make more sense when read as part of a calendar and relationship system.
            </p>
          </>
        ),
      },
      {
        heading: "Harmony pairs and triads",
        content: (
          <>
            <p>
              Harmony pairs point to signs that often find an easier rhythm. Three-harmony groups describe broader patterns of support across the 12-animal cycle.
            </p>
            <p>
              These patterns are useful for quick comparison, but they still need context from communication, values, and timing.
            </p>
          </>
        ),
        stats: [{ value: "6", label: "Harmony pairs", description: "Pairs are one common way to compare branch affinity." }],
      },
      {
        heading: "Clashes as differences, not verdicts",
        content: (
          <>
            <p>
              A clash pair points to contrast in pace, priorities, or expression. It can show where two people may need clearer boundaries or more deliberate communication.
            </p>
            <p>
              In <cite>Chinese calendar tradition</cite>, a clash is a branch relationship pattern, not a statement about a person&rsquo;s worth or the future of a relationship.
            </p>
          </>
        ),
      },
      {
        heading: "Use the tool, then go deeper",
        content: (
          <>
            <p>
              Start with the <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> to identify the branch pattern. Then read the <Link href="/chinese-zodiac" className={linkClass}>Chinese Zodiac hub</Link> or compare full charts through Bazi if you need more detail.
            </p>
            <p>
              The healthiest use is reflective: ask what the pattern helps you notice and what practical conversation should follow.
            </p>
          </>
        ),
      },
    ],
    faqs: zodiacCompatibilityGuideFaqs,
    relatedLinks: zodiacLinks,
    cta: {
      title: "Compare two zodiac signs",
      description: "Use the compatibility tool as a starting point, then read the guide for context.",
      href: "/tools/zodiac-compatibility",
      label: "Open compatibility tool",
    },
  }),
  buildPage({
    slug: "day-master-bazi-complete-guide",
    path: "/blog/day-master-bazi-complete-guide",
    title: "Day Master in Bazi: The Day Stem Explained with Classical Sources",
    description: "The Bazi Day Master is the heavenly stem of the day pillar. Learn how to find it, read all 10 Day Masters, judge strength, and check the classical sources.",
    category: "Bazi Guide",
    entityName: "Day Master Bazi Complete Guide",
    entityType: "BlogPosting",
    subtitle: "A practical, non-fatalistic walkthrough of the Day Master concept and the ten Heavenly Stems in Bazi.",
    directAnswer:
      "The Day Master is the heavenly stem of the day pillar in a Bazi chart. It represents the self and becomes the reference point for the other stems, branches, and Ten Gods. Classical sources such as Yuan Hai Zi Ping and San Ming Tong Hui establish this day-stem method. Your Day Master is one of the 10 Heavenly Stems.",
    breadcrumbs: breadcrumbs("Day Master Complete Guide", "/blog/day-master-bazi-complete-guide"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-04-20", dateModified: "2026-07-12" },
    stats: [
      { value: "10", label: "Heavenly Stems", description: "Five elements expressed as yin or yang form the ten Day Master types." },
      { value: "4", label: "Pillars", description: "Year, month, day, and hour pillars frame the Day Master's context." },
      { value: "5", label: "Elements", description: "Wood, Fire, Earth, Metal, and Water shape every Day Master profile." },
    ],
    citations: [
      { label: "《渊海子平》Yuan Hai Zi Ping (Xu Sheng, Song Dynasty, ~1100 CE)", source: "Classical Zi Ping source for treating the day stem as the self-reference point in Four Pillars analysis.", url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3" },
      { label: "《三命通会》San Ming Tong Hui (Wan Minying, Ming Dynasty, ~1578 CE)", source: "Ming-dynasty compendium covering the ten Heavenly Stems and their relationships across the four pillars.", url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83" },
    ],
    sections: [
      {
        heading: "What the Day Master is",
        content: (
          <>
            <p>
              <strong>Day master is the day stem — the heavenly stem of the day pillar.</strong> In a <TermLink term="Bazi">Bazi</TermLink> chart, the Day Master is the Heavenly Stem of the day pillar (also called the &quot;day master source&quot; or &quot;day stem source&quot;). It is the reference point that the rest of the chart is read against.
            </p>
            <p>
              In <cite>Yuan Hai Zi Ping</cite> and the later <cite>San Ming Tong Hui</cite> synthesis, the day stem is the self-reference point. Other stems and branches are read in relation to it as resource, peer, output, wealth, or authority roles.
            </p>
          </>
        ),
      },
      {
        heading: "The ten Heavenly Stems",
        content: (
          <>
            <p>
              The five elements each appear in yang and yin form: Yang Wood (Jia) and Yin Wood (Yi); Yang Fire (Bing) and Yin Fire (Ding); Yang Earth (Wu) and Yin Earth (Ji); Yang Metal (Geng) and Yin Metal (Xin); Yang Water (Ren) and Yin Water (Gui).
            </p>
            <p>
              Each Day Master has a recognizable temperament pattern. Read the dedicated guides for each type:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><Link href="/blog/jia-wood-day-master" className={linkClass}>Jia Wood (Yang Wood) Day Master — the tall tree</Link></li>
              <li><Link href="/blog/yi-wood-day-master" className={linkClass}>Yi Wood (Yin Wood) Day Master — the flowering vine</Link></li>
              <li><Link href="/blog/bing-fire-day-master" className={linkClass}>Bing Fire (Yang Fire) Day Master — the sun</Link></li>
              <li><Link href="/blog/ding-fire-day-master" className={linkClass}>Ding Fire (Yin Fire) Day Master — the candle flame</Link></li>
              <li><Link href="/blog/wu-earth-day-master" className={linkClass}>Wu Earth (Yang Earth) Day Master — the mountain</Link></li>
              <li><Link href="/blog/ji-earth-day-master" className={linkClass}>Ji Earth (Yin Earth) Day Master — the cultivated soil</Link></li>
              <li><Link href="/blog/geng-metal-day-master" className={linkClass}>Geng Metal (Yang Metal) Day Master — the axe</Link></li>
              <li><Link href="/blog/xin-metal-day-master" className={linkClass}>Xin Metal (Yin Metal) Day Master — the refined blade</Link></li>
              <li><Link href="/blog/ren-water-day-master" className={linkClass}>Ren Water (Yang Water) Day Master — the ocean</Link></li>
              <li><Link href="/blog/gui-water-day-master" className={linkClass}>Gui Water (Yin Water) Day Master — the mist</Link></li>
            </ul>
            <p>
              Each Day Master has a recognizable temperament pattern. Yang Wood is steady and structural; Yin Wood is adaptive and relational. Yang Fire is expansive; Yin Fire is focused. The yin/yang distinction matters as much as the element itself.
            </p>
          </>
        ),
        stats: [{ value: "10", label: "Day Master types", description: "Five elements x yin/yang = ten distinct Day Master profiles." }],
      },
      {
        heading: "Strong vs. weak Day Master",
        content: (
          <>
            <p>
              A Day Master is described as strong when supportive elements (same element + producing element) are abundant, and weak when draining or controlling elements dominate. Neither is good or bad on its own.
            </p>
            <p>
              The strength reading tells you which elements are <em>favorable</em> for balance. A strong Day Master usually benefits from output, wealth, or officer elements; a weak one benefits from resource or peer elements.
            </p>
          </>
        ),
      },
      {
        heading: "How to use your Day Master",
        content: (
          <>
            <p>
              Start with the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> to find your Day Master. Then read the <Link href="/blog/day-master-meaning" className={linkClass}>Day Master meaning overview</Link> for a faster summary, or the <Link href="/bazi" className={linkClass}>Bazi hub</Link> for the full system.
            </p>
            <p>
              The healthiest use is reflective: identify which elements you naturally lean on, and notice which ones you may be neglecting in environment, relationships, or daily routine.
            </p>
          </>
        ),
      },
      {
        heading: "FAQ: Day Master Basics",
        content: (
          <>
            <p>
              <strong>Q: Is Day Master the same as the day stem?</strong><br />
              Yes. The Day Master (日主, Ri Zhu) is the day stem (日干, Ri Gan) — the heavenly stem of the day pillar in your Bazi chart. The two terms are used interchangeably in modern and classical Bazi practice.
            </p>
            <p>
              <strong>Q: What is the day master in Bazi?</strong><br />
              The Day Master is the heavenly stem of your day pillar. It represents the self — the anchor around which every other symbol in the chart is interpreted. Your day master determines which of the Ten Gods each other stem becomes in relation to you.
            </p>
            <p>
              <strong>Q: Where can I find my day master source?</strong><br />
              Your day master source is your day pillar — specifically, the heavenly stem at the top of your day pillar. Use our <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> to generate your full four pillars chart and identify your day master instantly.
            </p>
            <p>
              <strong>Q: Is day master the same as the heavenly stem of the day pillar?</strong><br />
              Yes. The day master is the heavenly stem of the day pillar. This is the classical definition from Yuan Hai Zi Ping (《渊海子平》). The day stem on top of the day pillar is the Day Master — it is that simple.
            </p>
          </>
        ),
      },
    ],
    faqs: dayMasterFaqs,
    relatedLinks: baziLinks,
    cta: {
      title: "Find your Day Master",
      description: "Generate your Bazi chart and read your Day Master in seconds.",
      href: "/tools/bazi-calculator",
      label: "Open Bazi calculator",
    },
  }),
  buildPage({
    slug: "chinese-zodiac-compatibility-chart",
    path: "/blog/chinese-zodiac-compatibility-chart",
    title: "Chinese Zodiac Compatibility Chart: All 12 Signs, Triads & Clashes",
    description: "Compare all 12 Chinese zodiac signs in one chart, including three-harmony triads, six harmony pairs, clash pairs, and links to detailed sign compatibility.",
    category: "Zodiac Guide",
    entityName: "Chinese Zodiac Compatibility Chart",
    entityType: "BlogPosting",
    subtitle: "A reference chart for comparing any two of the 12 zodiac signs through branch relationship patterns.",
    directAnswer:
      "A Chinese zodiac compatibility chart maps how the 12 animal signs interact through three-harmony triads, six harmony pairs, and six clash pairs. The chart is a quick reference, not a verdict: harmony pairs share rhythm, triads share long-term values, and clashes signal differences in pace that benefit from clearer communication.",
    breadcrumbs: breadcrumbs("Compatibility Chart", "/blog/chinese-zodiac-compatibility-chart"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-04-22", dateModified: "2026-07-12" },
    stats: [
      { value: "12", label: "Animal signs", description: "Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig." },
      { value: "4", label: "Three-harmony triads", description: "Each triad groups three signs that share a long-term affinity." },
      { value: "6", label: "Clash pairs", description: "Each animal has one opposing sign across the 12-branch cycle." },
    ],
    citations: [
      { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Zi Ping reference for reading Earthly Branch combinations and clashes in chart context.", url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3" },
      { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1578 CE)", source: "Classical reference for branch harmony groups, six combinations, clashes, and transformation conditions.", url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83" },
    ],
    sections: [
      {
        heading: "How to read the compatibility chart",
        content: (
          <>
            <p>
              The <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> chart compares two animals through three lenses: three-harmony triads (long-term affinity), six harmony pairs (everyday rhythm), and six clash pairs (contrasting pace).
            </p>
            <p>
              In <cite>Yuan Hai Zi Ping</cite> and <cite>San Ming Tong Hui</cite>, these are Earthly Branch relationship patterns. They describe interaction conditions inside a larger chart, not fixed relationship outcomes.
            </p>
          </>
        ),
      },
      {
        heading: "Chinese zodiac compatibility chart for all 12 signs",
        content: (
          <>
            <p>
              Use this as a lookup table: the triad column shows the other two signs in the same three-harmony group, the harmony column shows the six-combination partner, and the clash column shows the branch directly opposite in the 12-sign cycle.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-300 dark:border-white/20">
                    <th className="py-3 pr-4">Sign</th>
                    <th className="py-3 pr-4">Triad partners</th>
                    <th className="py-3 pr-4">Harmony pair</th>
                    <th className="py-3">Clash pair</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-200 dark:divide-white/10">
                  <tr><td className="py-3 pr-4">Rat</td><td className="py-3 pr-4">Dragon, Monkey</td><td className="py-3 pr-4">Ox</td><td className="py-3">Horse</td></tr>
                  <tr><td className="py-3 pr-4">Ox</td><td className="py-3 pr-4">Snake, Rooster</td><td className="py-3 pr-4">Rat</td><td className="py-3">Goat</td></tr>
                  <tr><td className="py-3 pr-4">Tiger</td><td className="py-3 pr-4">Horse, Dog</td><td className="py-3 pr-4">Pig</td><td className="py-3">Monkey</td></tr>
                  <tr><td className="py-3 pr-4">Rabbit</td><td className="py-3 pr-4">Goat, Pig</td><td className="py-3 pr-4">Dog</td><td className="py-3">Rooster</td></tr>
                  <tr><td className="py-3 pr-4">Dragon</td><td className="py-3 pr-4">Rat, Monkey</td><td className="py-3 pr-4">Rooster</td><td className="py-3">Dog</td></tr>
                  <tr><td className="py-3 pr-4">Snake</td><td className="py-3 pr-4">Ox, Rooster</td><td className="py-3 pr-4">Monkey</td><td className="py-3">Pig</td></tr>
                  <tr><td className="py-3 pr-4">Horse</td><td className="py-3 pr-4">Tiger, Dog</td><td className="py-3 pr-4">Goat</td><td className="py-3">Rat</td></tr>
                  <tr><td className="py-3 pr-4">Goat</td><td className="py-3 pr-4">Rabbit, Pig</td><td className="py-3 pr-4">Horse</td><td className="py-3">Ox</td></tr>
                  <tr><td className="py-3 pr-4">Monkey</td><td className="py-3 pr-4">Rat, Dragon</td><td className="py-3 pr-4">Snake</td><td className="py-3">Tiger</td></tr>
                  <tr><td className="py-3 pr-4">Rooster</td><td className="py-3 pr-4">Ox, Snake</td><td className="py-3 pr-4">Dragon</td><td className="py-3">Rabbit</td></tr>
                  <tr><td className="py-3 pr-4">Dog</td><td className="py-3 pr-4">Tiger, Horse</td><td className="py-3 pr-4">Rabbit</td><td className="py-3">Dragon</td></tr>
                  <tr><td className="py-3 pr-4">Pig</td><td className="py-3 pr-4">Rabbit, Goat</td><td className="py-3 pr-4">Tiger</td><td className="py-3">Snake</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              A harmony or triad does not guarantee compatibility, and a clash does not predict failure. The table describes branch geometry; communication, shared values, and the two complete Bazi charts provide the human context.
            </p>
          </>
        ),
      },
      {
        heading: "Chinese Zodiac Triads: the four three-harmony groups",
        content: (
          <>
            <p>
              <strong>Chinese zodiac triads</strong> (three-harmony groups, or 三合 sān hé) are the four groups of three animal signs that share long-term affinity. The four triads are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Rat — Dragon — Monkey</strong> (Water frame)</li>
              <li><strong>Ox — Snake — Rooster</strong> (Metal frame)</li>
              <li><strong>Tiger — Horse — Dog</strong> (Fire frame)</li>
              <li><strong>Rabbit — Goat — Pig</strong> (Wood frame)</li>
            </ul>
            <p>
              Signs inside the same Chinese zodiac triad tend to share a long-term sense of values and direction. These groups are read from the Earthly Branch relationships: when three branches from the same trine appear in a chart, they create a strong elemental frame.
            </p>
            <p>
              Triads are most useful for friendships, family dynamics, and long-running collaborations where stability matters more than instant chemistry. For quick relationship checks, our <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> can compare any two signs.
            </p>
          </>
        ),
      },
      {
        heading: "The six harmony pairs",
        content: (
          <>
            <p>
              The six harmony (Liu He) pairs are Rat-Ox, Tiger-Pig, Rabbit-Dog, Dragon-Rooster, Snake-Monkey, and Horse-Goat. These pairs often find an easier daily rhythm and complementary energy.
            </p>
            <p>
              Harmony pairs tend to feel cooperative, but they still need shared values to thrive long term.
            </p>
          </>
        ),
      },
      {
        heading: "The six clash pairs",
        content: (
          <>
            <p>
              The six clash pairs are Rat-Horse, Ox-Goat, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, and Snake-Pig. Each is exactly six positions apart in the 12-branch cycle.
            </p>
            <p>
              A clash signals differences in pace and priority. It often produces growth when both sides communicate openly, and friction when they do not.
            </p>
          </>
        ),
      },
      {
        heading: "From chart to deeper reading",
        content: (
          <>
            <p>
              Use the <Link href="/tools/zodiac-compatibility" className={linkClass}>compatibility tool</Link> to compare any two signs, then read the <Link href="/blog/chinese-zodiac-compatibility-guide" className={linkClass}>compatibility guide</Link> for context. For deeper readings, compare full <Link href="/bazi" className={linkClass}>Bazi</Link> charts.
            </p>
          </>
        ),
      },
    ],
    faqs: zodiacCompatibilityFaqs,
    relatedLinks: [
      ...zodiacLinks,
      { title: "Earthly Branches", href: "/bazi/earthly-branches", description: "Read the branch combinations and clashes behind the animal signs." },
      { title: "Year of the Dragon", href: "/chinese-zodiac/dragon", description: "Open the site's highest-impression zodiac sign guide." },
    ],
    cta: {
      title: "Compare two zodiac signs",
      description: "Use the compatibility tool, then return to the chart for context.",
      href: "/tools/zodiac-compatibility",
      label: "Open compatibility tool",
    },
  }),
  buildPage({
    slug: "i-ching-beginners-reading-guide",
    path: "/blog/i-ching-beginners-reading-guide",
    title: "How to Cast and Read an I Ching Hexagram: A Beginner's Reading Guide",
    description: "A step-by-step beginner guide to casting an I Ching hexagram, reading the lines, and interpreting changing lines without overcomplicating the practice.",
    category: "I Ching Guide",
    entityName: "I Ching Beginners Reading Guide",
    entityType: "BlogPosting",
    subtitle: "A practical walkthrough from question framing to hexagram interpretation, written for first-time readers.",
    directAnswer:
      "To read an I Ching hexagram, frame a clear question, cast six lines using coins or yarrow stalks, identify the resulting hexagram and any changing lines, and read the hexagram statement together with the line texts. Beginners benefit from focusing on question framing first, since a vague question produces a vague reading.",
    breadcrumbs: breadcrumbs("I Ching Beginners Reading Guide", "/blog/i-ching-beginners-reading-guide"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-04-25", dateModified: "2026-05-20" },
    stats: [
      { value: "64", label: "Hexagrams", description: "Each hexagram is a unique six-line configuration." },
      { value: "6", label: "Lines per cast", description: "A reading produces six stacked yin or yang lines." },
      { value: "3", label: "Coins", description: "The most common modern casting method uses three coins per line." },
    ],
    citations: [
      { label: "I Ching tradition", source: "The Book of Changes uses 64 hexagrams built from six lines and changing-line dynamics." },
      { label: "Coin method tradition", source: "Three-coin casting is a widely used modern alternative to yarrow stalk divination." },
    ],
    sections: [
      {
        heading: "Step 1: frame the question",
        content: (
          <>
            <p>
              The <TermLink term="I Ching">I Ching</TermLink> answers questions in proportion to the clarity of the question. Avoid yes/no framing for situational readings; ask &ldquo;what attitude best serves this situation?&rdquo; or &ldquo;what is the dynamic at play?&rdquo;
            </p>
            <p>
              Beginners often jump to casting too quickly. The question is half the reading.
            </p>
          </>
        ),
      },
      {
        heading: "Step 2: cast six lines",
        content: (
          <>
            <p>
              The simplest method uses three coins. Assign 3 to heads and 2 to tails, then sum the three coins for each line. A total of 6 is changing yin, 7 is stable yang, 8 is stable yin, and 9 is changing yang. Cast six times, building the hexagram from the bottom up.
            </p>
            <p>
              According to <cite>Coin method tradition</cite>, this method preserves the same probability balance as yarrow stalks for most practical purposes.
            </p>
          </>
        ),
        stats: [{ value: "6-9", label: "Line totals", description: "6 and 9 are changing lines; 7 and 8 are stable lines." }],
      },
      {
        heading: "Step 3: identify the hexagram",
        content: (
          <>
            <p>
              Read the hexagram from the bottom line to the top. Look up the resulting figure in the 64-hexagram set to find its name, judgment, and image. This is your primary hexagram.
            </p>
            <p>
              According to <cite>I Ching tradition</cite>, the judgment describes the situation and the image suggests an attitude or response.
            </p>
          </>
        ),
      },
      {
        heading: "Step 4: read changing lines",
        content: (
          <>
            <p>
              If any lines were 6 or 9, they are changing lines. Read each changing-line text in order from bottom to top, then flip those lines to derive a second hexagram. The second hexagram describes where the situation is moving.
            </p>
            <p>
              Read the <Link href="/blog/changing-lines-i-ching" className={linkClass}>changing lines guide</Link> for a deeper walkthrough.
            </p>
          </>
        ),
      },
      {
        heading: "Step 5: synthesize, don&rsquo;t predict",
        content: (
          <>
            <p>
              The healthiest reading is reflective. Ask what the hexagram and changing lines suggest about your <em>attitude</em>, not what will happen. The I Ching is most useful as a mirror for decision-making.
            </p>
            <p>
              Cast a real reading with the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link>, or browse the <Link href="/i-ching" className={linkClass}>I Ching hub</Link> for deeper study.
            </p>
          </>
        ),
      },
    ],
    faqs: iChingReadingFaqs,
    relatedLinks: [
      { title: "I Ching hub", href: "/i-ching", description: "All hexagrams and core concepts in one place." },
      { title: "I Ching for Beginners", href: "/blog/i-ching-for-beginners", description: "Question framing before line interpretation." },
      { title: "Changing Lines Guide", href: "/blog/changing-lines-i-ching", description: "How to read 6 and 9 lines and the derived hexagram." },
      { title: "I Ching Oracle", href: "/tools/i-ching-oracle", description: "Cast a digital reading with one click." },
    ],
    cta: {
      title: "Cast your first reading",
      description: "Try the I Ching tool with a clear question in mind.",
      href: "/tools/i-ching-oracle",
      label: "Open I Ching tool",
    },
  }),
];

// ── 10 Day Master blog posts ────────────────────────────────────────────
// One dedicated post per Heavenly Stem, targeting long-tail searches
// like "jia wood day master personality career"

interface DayMasterSeed {
  slug: string;
  stemShort: string;
  stemFull: string;
  element: string;
  polarity: string;
  imageDesc: string;
  traits: string;
  strengthDesc: string;
  weaknessDesc: string;
  combineStem: string;
  seasonStrong: string;
  seasonWeak: string;
}

const dayMasterSeeds: DayMasterSeed[] = [
  { slug: "jia-wood-day-master", stemShort: "Jia", stemFull: "Jia (甲)", element: "Wood", polarity: "Yang", imageDesc: "a tall tree — upright, direct, and growth-oriented, with strong roots but limited flexibility", traits: "steadfast, authoritative, and naturally commanding", strengthDesc: "initiative, structure, and the ability to bear heavy responsibility", weaknessDesc: "rigidity under pressure — the same strength that makes Jias reliable can become inflexibility", combineStem: "Ji (己) Earth", seasonStrong: "spring (Yin, Mao, Chen months)", seasonWeak: "autumn" },
  { slug: "yi-wood-day-master", stemShort: "Yi", stemFull: "Yi (乙)", element: "Wood", polarity: "Yin", imageDesc: "a flowering vine — adaptable, persistent, and able to find support in unexpected places", traits: "graceful, diplomatic, and quietly persistent", strengthDesc: "adaptability, refined perception, and the ability to grow through difficult conditions", weaknessDesc: "indirectness — the same flexibility that helps Yi adapt can become avoidance of direct confrontation", combineStem: "Geng (庚) Metal", seasonStrong: "spring (Yin, Mao, Chen months)", seasonWeak: "autumn" },
  { slug: "bing-fire-day-master", stemShort: "Bing", stemFull: "Bing (丙)", element: "Fire", polarity: "Yang", imageDesc: "the sun — warm, generous, and visible to everyone, but unable to focus its light on one person", traits: "passionate, charismatic, and publicly expressive", strengthDesc: "warmth, visibility, and the ability to energize everyone around them", weaknessDesc: "scattered focus — the same expansive energy that makes Bing magnetic can become overextension", combineStem: "Xin (辛) Metal", seasonStrong: "summer (Si, Wu, Wei months)", seasonWeak: "winter" },
  { slug: "ding-fire-day-master", stemShort: "Ding", stemFull: "Ding (丁)", element: "Fire", polarity: "Yin", imageDesc: "a candle flame — precise, intimate, and capable of sustained illumination in a small space", traits: "focused, refined, and deeply perceptive", strengthDesc: "concentration, refinement, and the ability to illuminate what others overlook", weaknessDesc: "exhaustion from over-focus — Ding energy burns steadily but can consume itself without replenishment", combineStem: "Ren (壬) Water", seasonStrong: "summer (Si, Wu, Wei months)", seasonWeak: "winter" },
  { slug: "wu-earth-day-master", stemShort: "Wu", stemFull: "Wu (戊)", element: "Earth", polarity: "Yang", imageDesc: "a mountain — solid, reliable, and capable of holding great weight, but slow to change direction", traits: "stable, authoritative, and deeply dependable", strengthDesc: "steadiness, long-term vision, and the capacity to hold a team together", weaknessDesc: "stubbornness — the same stability that makes Wu reliable can become resistance to necessary change", combineStem: "Gui (癸) Water", seasonStrong: "late summer / seasonal transitions", seasonWeak: "spring" },
  { slug: "ji-earth-day-master", stemShort: "Ji", stemFull: "Ji (己)", element: "Earth", polarity: "Yin", imageDesc: "cultivated soil — fertile, receptive, and able to nourish what is planted in it", traits: "nurturing, diplomatic, and community-minded", strengthDesc: "receptivity, attention to detail, and the ability to create conditions for growth", weaknessDesc: "over-giving — the same receptivity that makes Ji supportive can become self-neglect", combineStem: "Jia (甲) Wood", seasonStrong: "late summer / seasonal transitions", seasonWeak: "spring" },
  { slug: "geng-metal-day-master", stemShort: "Geng", stemFull: "Geng (庚)", element: "Metal", polarity: "Yang", imageDesc: "raw metal or an axe — strong, decisive, and capable of cutting through obstacles", traits: "determined, decisive, and structurally minded", strengthDesc: "decisiveness, the ability to make hard choices, and a drive for quality", weaknessDesc: "sharpness — the same cutting clarity that makes Geng effective can become harshness", combineStem: "Yi (乙) Wood", seasonStrong: "autumn (Shen, You, Xu months)", seasonWeak: "spring" },
  { slug: "xin-metal-day-master", stemShort: "Xin", stemFull: "Xin (辛)", element: "Metal", polarity: "Yin", imageDesc: "refined jewelry or a polished blade — precise, elegant, and sensitive to its environment", traits: "refined, meticulous, and quality-driven", strengthDesc: "refinement, attention to detail, and a natural sense of quality and aesthetics", weaknessDesc: "sensitivity — the same refinement that makes Xin precise can become vulnerability to criticism", combineStem: "Bing (丙) Fire", seasonStrong: "autumn (Shen, You, Xu months)", seasonWeak: "spring" },
  { slug: "ren-water-day-master", stemShort: "Ren", stemFull: "Ren (壬)", element: "Water", polarity: "Yang", imageDesc: "the ocean or a great river — vast, powerful, and capable of carrying enormous loads", traits: "strategic, adaptable, and broad-minded", strengthDesc: "strategic thinking, adaptability, and the ability to navigate complex situations", weaknessDesc: "dispersion — the same expansive quality that makes Ren versatile can become lack of focus", combineStem: "Ding (丁) Fire", seasonStrong: "winter (Hai, Zi, Chou months)", seasonWeak: "summer" },
  { slug: "gui-water-day-master", stemShort: "Gui", stemFull: "Gui (癸)", element: "Water", polarity: "Yin", imageDesc: "mist, rain, or underground spring — subtle, penetrating, and able to reach where direct force cannot", traits: "intuitive, perceptive, and deeply reflective", strengthDesc: "intuition, depth perception, and the ability to understand what is not said aloud", weaknessDesc: "elusiveness — the same subtlety that makes Gui perceptive can become avoidance of being truly known", combineStem: "Wu (戊) Earth", seasonStrong: "winter (Hai, Zi, Chou months)", seasonWeak: "summer" },
];

function createDayMasterPost(seed: DayMasterSeed): BlogPost {
  const path = `/blog/${seed.slug}`;
  const stemCharacter = seed.stemFull.match(/\(([^)]+)\)/)?.[1] ?? seed.stemShort;
  const stemLabel = `${seed.stemShort} ${seed.element}`;
  const stemWithCharacter = `${stemLabel} (${stemCharacter})`;
  const isRenWater = seed.slug === "ren-water-day-master";
  const title = isRenWater
    ? "Ren Water Day Master (壬): Meaning, Strength & Career in Bazi"
    : `${stemLabel} Day Master (${stemCharacter}): Personality, Career & Relationships`;
  const el = seed.element.toLowerCase();
  const polarityAdv = seed.polarity === "Yang"
    ? "outward-moving, initiating energy — these individuals tend to lead, act visibly, and create structure"
    : "inward-moving, receptive energy — these individuals tend to observe, refine, and work with precision";
  const generatingDesc = el === "wood" ? "Wood generates Fire (expression) and is controlled by Metal (structure). Wood feeds Fire and is parted by Metal."
    : el === "fire" ? "Fire generates Earth (stability) and is controlled by Water (depth). Fire creates Earth and is cooled by Water."
    : el === "earth" ? "Earth generates Metal (refinement) and is controlled by Wood (growth). Earth bears Metal and is parted by Wood."
    : el === "metal" ? "Metal generates Water (adaptability) and is controlled by Fire (expression). Metal enriches Water and is melted by Fire."
    : "Water generates Wood (growth) and is controlled by Earth (stability). Water nourishes Wood and is channeled by Earth.";
  const careerDesc = el === "wood" ? "growth-oriented fields such as education, entrepreneurship, creative direction, and environmental work"
    : el === "fire" ? "high-visibility fields such as media, performing arts, leadership roles, and public speaking"
    : el === "earth" ? "stable fields such as real estate, finance, management, agriculture, and community organization"
    : el === "metal" ? "precision fields such as law, engineering, finance, craftsmanship, and quality assurance"
    : "adaptive fields such as research, strategy, psychology, communications, and diplomacy";

  return buildPage({
    slug: seed.slug,
    path,
    title,
    description: isRenWater
      ? "Ren Water (壬) is the Yang Water Day Master. Learn its ocean-and-river image, strong vs weak chart conditions, Ten God element map, career themes, and difference from Gui Water."
      : `${stemWithCharacter} is the ${seed.polarity} ${seed.element} Day Master (${seed.imageDesc.split(" —")[0]}). Learn about ${stemLabel} personality, career paths, relationships, and elemental strengths in Bazi.`,
    category: "Bazi Guide",
    entityName: `${stemLabel} Day Master`,
    entityType: "BlogPosting",
    subtitle: `A complete guide to the ${stemWithCharacter} Day Master — the ${el} ${seed.polarity.toLowerCase()} expression in Bazi.`,
    directAnswer: isRenWater
      ? "Ren Water (壬) is the Yang Water Day Master, traditionally compared with an ocean or great river. Its strength is strategic movement, scale, and adaptability; its risk is dispersion without channels. Metal is Resource, Wood is Output, Fire is Wealth, and Earth is Authority relative to Ren. Season and the full chart decide whether those roles support or pressure it."
      : `${stemWithCharacter} is the ${seed.polarity} ${seed.element} Heavenly Stem. As the ${stemLabel} Day Master, it represents ${seed.imageDesc}. ${seed.stemShort} Day Master people tend to be ${seed.traits}. The full chart — season, month pillar, Ten Gods, and Luck Pillars — determines how this energy expresses across life areas.`,
    breadcrumbs: breadcrumbs(`${stemLabel} Day Master`, path),
    schema: { headline: "", description: "", url: "", datePublished: "2026-05-01", dateModified: isRenWater ? "2026-07-12" : "2026-06-05" },
    stats: [
      { value: seed.element, label: "Element", description: `${seed.polarity} expression of the ${el} element.` },
      { value: seed.polarity, label: "Polarity", description: seed.polarity === "Yang" ? "Outward-moving, active expression." : "Inward-moving, receptive expression." },
      { value: seed.seasonStrong.split(" ")[0], label: "Strong season", description: `${seed.stemShort} is strongest in ${seed.seasonStrong}.` },
    ],
    citations: isRenWater
      ? [
          { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Zi Ping source for reading the day stem and seasonal strength.", url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3" },
          { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1578 CE)", source: "Classical stem relationship reference for Ren Water, Ding combination, and element roles.", url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83" },
        ]
      : [
          { label: "《渊海子平》Yuan Hai Zi Ping (Song Dynasty, ~1100 CE)", source: "Classical Zi Ping source for reading the day stem as the chart's self-reference point.", url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3" },
          { label: "《三命通会》San Ming Tong Hui (Ming Dynasty, ~1578 CE)", source: `${seed.stemShort} (${stemCharacter}) is one of 10 Heavenly Stems combining ${el} with ${seed.polarity.toLowerCase()} polarity.`, url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83" },
        ],
    sections: [
      {
        heading: `What ${stemLabel} means as a Day Master`,
        content: (
          <>
            <p>
              <strong>{stemWithCharacter} is {seed.imageDesc}.</strong> In <cite>Yuan Hai Zi Ping</cite>-based Four Pillars practice, each Heavenly Stem carries a natural image. {seed.stemShort} is the {seed.polarity.toLowerCase()} expression of the {seed.element} element, with {polarityAdv}.
            </p>
            <p>
              {stemLabel} Day Masters are {seed.traits}. Their strength: {seed.strengthDesc}. Their challenge: {seed.weaknessDesc}. The full chart determines whether these express as strengths or pressures.
            </p>
            <p>
              In Five Element theory, {generatingDesc} These relationships shape how {seed.stemShort} interacts with other Day Masters.
            </p>
          </>
        ),
      },
      ...(isRenWater
        ? [
            {
              heading: "Ren Water element map and Ten God roles",
              content: (
                <>
                  <p>
                    Ren is Yang Water, so the other elements become roles according to how they produce, match, drain, control, or are controlled by Water. This map is more precise than treating "Water personality" as a complete reading.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-ink-300 dark:border-white/20">
                          <th className="py-3 pr-4">Element around Ren</th>
                          <th className="py-3 pr-4">Relationship</th>
                          <th className="py-3">Bazi role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-200 dark:divide-white/10">
                        <tr><td className="py-3 pr-4">Metal</td><td className="py-3 pr-4">Produces Water</td><td className="py-3">Resource: learning, support, recovery</td></tr>
                        <tr><td className="py-3 pr-4">Water</td><td className="py-3 pr-4">Same element</td><td className="py-3">Peer: networks, competition, shared direction</td></tr>
                        <tr><td className="py-3 pr-4">Wood</td><td className="py-3 pr-4">Produced by Water</td><td className="py-3">Output: ideas, communication, movement</td></tr>
                        <tr><td className="py-3 pr-4">Fire</td><td className="py-3 pr-4">Controlled by Water</td><td className="py-3">Wealth: execution, resources, visible results</td></tr>
                        <tr><td className="py-3 pr-4">Earth</td><td className="py-3 pr-4">Controls Water</td><td className="py-3">Authority: boundaries, rules, responsibility</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    A Ren chart with abundant Water and Metal may need Wood, Fire, or well-placed Earth to direct its scale. A Ren chart born in a hot, dry season may instead need Metal and Water support. The useful element depends on season and the full chart, not the Day Master name alone.
                  </p>
                </>
              ),
            },
            {
              heading: "Ren Water vs Gui Water: ocean and rain",
              content: (
                <>
                  <p>
                    Ren and Gui are both Water Day Masters, but their polarity changes expression. Ren is Yang Water: large-scale, visible, mobile, and inclined to connect distant points like a river or ocean current. Gui is Yin Water: fine-grained, penetrating, receptive, and compared with rain, mist, dew, or an underground spring.
                  </p>
                  <p>
                    The comparison is not "strong Ren versus weak Gui." A focused Gui chart can be more persistent than a scattered Ren chart, while a well-channeled Ren chart can coordinate complexity that would overwhelm a narrower approach. Check the month branch, roots, and surrounding Ten Gods before deciding how the Water quality behaves.
                  </p>
                  <p>
                    Ren combines with Ding Fire. Traditional transformation rules require supporting season and chart conditions, so the presence of Ren and Ding does not automatically mean a successful combination or a fixed relationship result.
                  </p>
                </>
              ),
            },
          ]
        : []),
      {
        heading: `Personality, career, and relationships for ${seed.stemShort} ${seed.element}`,
        content: (
          <>
            <p>
              {seed.stemShort} {seed.element} Day Masters tend toward {polarityAdv}. Career direction maps to {el}: {careerDesc}.
            </p>
            <p>
              In relationships, {seed.stemShort} {seed.polarity === "Yang" ? "tends to be direct and initiative-taking — expressing needs openly and valuing partners who match that clarity" : "tends to be thoughtful and selective — building trust gradually and valuing depth over speed"}. The spouse palace (day pillar branch) provides more specific relationship detail than the Day Master alone.
            </p>
            <p>
              In <cite>San Ming Tong Hui</cite>, {seed.stemShort} forms a Heavenly Stem combination with {seed.combineStem}. A transformation reading still requires seasonal and chart support; the pair alone does not guarantee a change of element.
            </p>
          </>
        ),
      },
      {
        heading: `How to work with your ${seed.stemShort} ${seed.element} Day Master`,
        content: (
          <>
            <p>
              <strong>Read your Day Master reflectively, not prescriptively.</strong> {stemWithCharacter} describes a baseline temperament. The season, month pillar, Ten Gods, and Luck Pillars determine real-life expression.
            </p>
            <p>
              {seed.stemShort} is strongest in {seed.seasonStrong} and weakest in {seed.seasonWeak}. A {seed.stemShort} born in-season reads very differently from one born off-season. The month branch is always the first context check after the Day Master.
            </p>
            <p>
              Generate your <Link href="/tools/bazi-calculator" className={linkClass}>Bazi chart</Link>, then read the <Link href="/blog/day-master-bazi-complete-guide" className={linkClass}>complete Day Master guide</Link> or explore the <Link href="/bazi" className={linkClass}>Bazi hub</Link> for the full system.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: `What is ${stemLabel} Day Master in Bazi?`,
        answer: `${stemWithCharacter} is the ${seed.polarity} ${seed.element} Heavenly Stem, described as ${seed.imageDesc.split(" —")[0]}. As a Day Master, it represents people born with this day stem, who tend to be ${seed.traits}.`,
      },
      {
        question: `What element is ${seed.stemShort} in Bazi?`,
        answer: `${stemWithCharacter} is ${seed.polarity} ${seed.element} — the ${seed.polarity.toLowerCase()} expression of the ${seed.element} element.`,
      },
      {
        question: `What season strengthens ${seed.stemShort} Day Master?`,
        answer: `${stemWithCharacter} is strongest in ${seed.seasonStrong} and weakest in ${seed.seasonWeak}. Season is the first structural check after identifying the Day Master.`,
      },
      {
        question: `Which stems combine with ${seed.stemShort}?`,
        answer: `${stemWithCharacter} forms a combination with ${seed.combineStem}. This describes attraction and potential transformation — supportive or intense depending on chart context.`,
      },
      ...(isRenWater
        ? [
            {
              question: "What is the difference between Ren Water and Gui Water?",
              answer:
                "Ren is Yang Water and is compared with oceans or great rivers: broad, mobile, and visible. Gui is Yin Water and is compared with rain, mist, or springs: subtle, penetrating, and receptive. Neither is better; season, roots, and the full chart determine how each Water stem behaves.",
            },
            {
              question: "What elements balance a Ren Water Day Master?",
              answer:
                "There is no universal balancing element. Strong winter Ren Water may benefit from Wood, Fire, or well-placed Earth that gives movement direction. Weak summer Ren Water may need Metal and Water support. The month branch, roots, combinations, and surrounding Ten Gods must be checked first.",
            },
          ]
        : []),
    ],
    relatedLinks: [
      { title: "Day Master Complete Guide", href: "/blog/day-master-bazi-complete-guide", description: "Overview of all 10 Day Masters." },
      { title: "What Your Day Master Means", href: "/blog/day-master-meaning", description: "A shorter introduction to the Day Master." },
      { title: "Heavenly Stems Guide", href: "/bazi/heavenly-stems", description: "Complete guide to all 10 Heavenly Stems." },
      { title: "Ten Gods", href: "/bazi/ten-gods", description: `How every other stem becomes a role relative to your ${seed.stemShort} Day Master.` },
      { title: "Five Elements", href: "/bazi/five-elements", description: `The ${el} element relationships that shape the ${seed.stemShort} Day Master profile.` },
      ...(isRenWater
        ? [{ title: "Gui Water Day Master", href: "/blog/gui-water-day-master", description: "Compare Yang Water's ocean image with Yin Water's rain and mist expression." }]
        : []),
    ],
    cta: {
      title: "Find your Day Master",
      description: "Use the free Bazi calculator to identify your Day Master and generate your full chart.",
      href: "/tools/bazi-calculator",
      label: "Open the calculator",
    },
  });
}

const dayMasterPosts: BlogPost[] = dayMasterSeeds.map(createDayMasterPost);

const highIntentSlugs = new Set(highIntentBlogPosts.map((post) => post.slug));
const dayMasterSlugs = new Set(dayMasterPosts.map((post) => post.slug));

export const allBlogPosts: BlogPost[] = [
  ...seedPosts,
  ...highIntentBlogPosts,
  ...dayMasterPosts,
  ...editorialSeeds.filter((seed) => !highIntentSlugs.has(seed.slug) && !dayMasterSlugs.has(seed.slug)).map(createEditorialPost),
];

export function getBlogPage(slug: string): BlogPost | undefined {
  return allBlogPosts.find((page) => page.slug === slug);
}

export function getBlogStaticParams(): Array<{ slug: string }> {
  return allBlogPosts.map((page) => ({
    slug: page.slug,
  }));
}
