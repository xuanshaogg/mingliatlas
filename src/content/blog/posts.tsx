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
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "4", label: "Pillars", description: "Year, month, day, and hour make the full chart." },
      { value: "60", label: "Stem-branch pairs", description: "The sexagenary cycle organizes the calendar." },
      { value: "10", label: "Year luck cycle", description: "Luck pillars usually move in 10-year blocks." },
    ],
    citations: [
      { label: "Chinese calendar tradition", source: "Stems, branches, and solar terms form the timekeeping base of Bazi." },
      { label: "Classical Four Pillars practice", source: "Bazi reads structure, timing, and relationship patterns instead of one isolated symbol." },
    ],
    sections: [
      {
        heading: "What Bazi actually reads",
        content: (
          <>
            <p>
              The system uses the birth moment to build four pillars, then interprets the interaction between stems, branches, Five Elements, and the Day Master. The result is a map of tendencies, not a fixed verdict.
            </p>
            <p>
              If you want the foundational vocabulary, start with the <TermLink term="Wu Xing">Five Elements</TermLink>, then read the
              <TermLink term="Tian Gan"> Heavenly Stems</TermLink> and <TermLink term="Di Zhi"> Earthly Branches</TermLink>.
            </p>
          </>
        ),
      },
      {
        heading: "Why it is useful",
        content: (
          <>
            <p>
              Bazi is useful because it turns a birth date into a structured interpretation framework. Readers use it for self-reflection, timing, career themes, and relationship patterns.
            </p>
            <p>
              The value is in the structure. When you know which parts of the chart matter, you can ask better questions and avoid reading every symbol as a prediction.
            </p>
          </>
        ),
      },
      {
        heading: "How to start",
        content: (
          <>
            <p>
              Start with one chart, one question, and one source of vocabulary. Then compare the result with the broader Bazi hub and the free calculator.
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
      "A zodiac forecast for 2026 is a symbolic yearly overview, not a fixed prediction. It looks at the animal-year cycle, the relation between the year branch and each animal sign, and the practical themes people often watch for during the year.",
    breadcrumbs: breadcrumbs("2026 Forecast", "/blog/chinese-zodiac-2026-forecast"),
    schema: { headline: "", description: "", url: "" },
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
              It should not claim certainty, fear, or guaranteed luck. A good forecast stays specific enough to be actionable and broad enough to be honest about uncertainty.
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
    schema: { headline: "", description: "", url: "" },
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
    schema: { headline: "", description: "", url: "" },
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
    schema: { headline: "", description: "", url: "" },
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
    subtitle: `A focused editorial note on ${seed.focus}.`,
    directAnswer: `${seed.entity} is best understood as a practical pattern language, not a fixed label. This article explains ${seed.focus} in clear terms, connects it to the broader Chinese metaphysics system, and points you toward the right next guide or tool.`,
    breadcrumbs: breadcrumbs(seed.title, path),
    schema: { headline: "", description: "", url: "" },
    stats: [
      { value: "3", label: "Reading steps", description: "Define the symbol, check context, then apply carefully." },
      { value: "1", label: "Main question", description: "Each article should answer one clear search intent." },
      { value: "2026", label: "Editorial cycle", description: "Seed article prepared for later longform expansion." },
    ],
    citations: [
      { label: "Chinese metaphysics tradition", source: "Classical systems use symbols, cycles, and context as interpretation layers." },
      { label: "Eastern Blueprint editorial standard", source: "Content is written for education, self-reflection, and clear next steps." },
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
              This seed article establishes the topic in the content library. A later editorial pass can add examples, tables, and deeper case studies while preserving the same URL.
            </p>
          </>
        ),
        quotes: [
          {
            text: "Good metaphysics content should make a symbol clearer, not make the reader more dependent on vague claims.",
            author: "Jerry King",
            title: "Chinese Metaphysics Consultant",
            organization: "White Dragon Consulting",
          },
        ],
      },
      {
        heading: "How to use the idea",
        content: (
          <p>
            Use this topic as a conversation with your own observations. Compare it with related guides, then test the idea through the appropriate calculator, oracle, or knowledge page.
          </p>
        ),
      },
      {
        heading: "What to avoid",
        content: (
          <p>
            Avoid using one symbol as a total identity label or a guaranteed outcome. The site uses symbolic systems for structured reflection, not fear-based certainty.
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

export const allBlogPosts: BlogPost[] = [...seedPosts, ...editorialSeeds.map(createEditorialPost)];

export function getBlogPage(slug: string): BlogPost | undefined {
  return allBlogPosts.find((page) => page.slug === slug);
}

export function getBlogStaticParams(): Array<{ slug: string }> {
  return allBlogPosts.map((page) => ({
    slug: page.slug,
  }));
}
