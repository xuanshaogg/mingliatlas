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

const baseFaqs: FAQ[] = [
  {
    question: "Is this article fortune telling?",
    answer:
      "No. These articles explain symbolic systems, historical context, and practical reading methods. They are for education and self-reflection.",
  },
  {
    question: "Can I use this alongside Western astrology?",
    answer:
      "Yes. Many readers compare systems side by side as different symbolic languages, then keep the rules separate before looking for overlap.",
  },
  {
    question: "Should I read the whole site in one sitting?",
    answer:
      "No. Start with one system and one question. That keeps the vocabulary clear and the interpretation grounded.",
  },
  {
    question: "Does this replace professional advice?",
    answer:
      "No. The articles are educational and should not replace medical, legal, financial, or mental health guidance.",
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
    title: "What Is Bazi? A Beginner's Guide to the Four Pillars",
    description: "A beginner-friendly explanation of Bazi, the Four Pillars, and why it is more than a single zodiac sign.",
    category: "Bazi Guide",
    entityName: "What Is Bazi?",
    entityType: "BlogPosting",
    subtitle: "A practical introduction to the structure behind Four Pillars reading.",
    directAnswer:
      "Bazi, or Four Pillars of Destiny, is a Chinese metaphysics system that reads a person's birth year, month, day, and hour as a structured chart of stems, branches, and elements. It is not a single-sign horoscope. It is a pattern language for timing, tendencies, and context.",
    breadcrumbs: breadcrumbs("What Is Bazi?", "/blog/what-is-bazi"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-02", dateModified: "2026-04-01" },
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
              After that first pass, add detail slowly. Look at whether the chart is mostly warm or cold, dry or wet, active or restrained. Then compare the visible stems with the hidden stems inside the branches. This prevents a common beginner mistake: treating one attractive symbol as the whole reading. A strong Wealth star, for example, does not automatically mean money will arrive; it must be read against the Day Master, the season, the chart structure, and the timing cycle. A useful Bazi reading keeps all of those layers visible before turning the chart into practical advice.
            </p>
          </>
        ),
      },
    ],
    faqs: baseFaqs,
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
          </>
        ),
      },
    ],
    faqs: baseFaqs,
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
          </>
        ),
      },
    ],
    faqs: baseFaqs,
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
          </>
        ),
      },
    ],
    faqs: baseFaqs,
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
          </>
        ),
      },
    ],
    faqs: baseFaqs,
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
    directAnswer: `${seed.entity} is best understood as a practical pattern language, not a total identity label. This article explains ${seed.focus} in clear terms, connects it to the broader Chinese metaphysics system, and points you toward the right next guide or tool for deeper context.`,
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
              {seed.description} The useful reading starts with definition, then checks context, timing, and practical behavior.
            </p>
            <p>
              In <cite>Chinese metaphysics tradition</cite>, symbols work best as structured prompts. They help readers ask better questions without treating one image as the whole answer.
            </p>
          </>
        ),
      },
      {
        heading: "How to use the idea",
        content: (
          <>
            <p>
              Use this topic as a conversation with your own observations. Compare it with related guides, then test the idea through the appropriate calculator, oracle, or knowledge page.
            </p>
            <p>
              If the topic depends on birth data or yearly cycles, check the result against <cite>Chinese calendar tradition</cite> before drawing conclusions.
            </p>
          </>
        ),
        stats: [{ value: "2", label: "Context checks", description: "Look at the symbol itself and the wider system around it." }],
      },
      {
        heading: "What to avoid",
        content: (
          <p>
            Avoid using one symbol as a total identity label or an assured outcome. The site uses symbolic systems for structured reflection, not fear-based certainty.
          </p>
        ),
      },
      {
        heading: "Where to go next",
        content: (
          <p>
            Continue with <Link href={seed.primaryHref} className={linkClass}>{seed.primaryLabel}</Link>, then return to the beginner guide if you need more vocabulary before comparing systems.
          </p>
        ),
      },
    ],
    faqs: baseFaqs,
    relatedLinks: [
      { title: seed.primaryLabel, href: seed.primaryHref, description: "Continue with the most relevant guide or tool for this topic." },
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
    faqs: baseFaqs,
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
    faqs: baseFaqs,
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
    faqs: baseFaqs,
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
    faqs: baseFaqs,
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
    faqs: baseFaqs,
    relatedLinks: zodiacLinks,
    cta: {
      title: "Compare two zodiac signs",
      description: "Use the compatibility tool as a starting point, then read the guide for context.",
      href: "/tools/zodiac-compatibility",
      label: "Open compatibility tool",
    },
  }),
];

const highIntentSlugs = new Set(highIntentBlogPosts.map((post) => post.slug));

export const allBlogPosts: BlogPost[] = [
  ...seedPosts,
  ...highIntentBlogPosts,
  ...editorialSeeds.filter((seed) => !highIntentSlugs.has(seed.slug)).map(createEditorialPost),
];

export function getBlogPage(slug: string): BlogPost | undefined {
  return allBlogPosts.find((page) => page.slug === slug);
}

export function getBlogStaticParams(): Array<{ slug: string }> {
  return allBlogPosts.map((page) => ({
    slug: page.slug,
  }));
}
