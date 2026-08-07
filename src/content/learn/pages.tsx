import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { RelatedLink } from "@/components/shared/RelatedLinks";
import TermLink from "@/components/shared/TermLink";
import { SITE } from "@/lib/constants";

export interface LearnContentPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  data: KnowledgePageProps;
}

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

const overviewRelatedLinks: RelatedLink[] = [
  {
    title: "Four-Week Beginner Path",
    href: "/learn/beginners-guide",
    description: "Build shared vocabulary, complete one practice, and learn how to verify it.",
  },
  {
    title: "Which System Should You Learn?",
    href: "/learn/which-system",
    description: "Match Bazi, Ziwei, I Ching, Feng Shui, or the zodiac to your question and inputs.",
  },
  {
    title: "Books & Source Guide",
    href: "/learn/resources",
    description: "Verify primary texts, translations, reference data, teachers, communities, and tools.",
  },
  { title: "Bazi", href: "/bazi", description: "Study Four Pillars, the Day Master, element relationships, and timing." },
  { title: "I Ching", href: "/i-ching", description: "Study hexagrams, moving lines, and one present question." },
  { title: "Feng Shui", href: "/feng-shui", description: "Study form, flow, orientation, and the use of a real place." },
];

const beginnerRelatedLinks: RelatedLink[] = [
  { title: "Five Elements", href: "/bazi/five-elements", description: "Learn Wood, Fire, Earth, Metal, and Water before deeper chart reading." },
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "See how stems, branches, and four pillars become a chart." },
  { title: "Which System Should You Learn?", href: "/learn/which-system", description: "Choose a path after the beginner vocabulary is clear." },
  { title: "Books & Source Guide", href: "/learn/resources", description: "Learn how to verify texts, translations, teachers, communities, and calculators." },
];

const comparisonRelatedLinks: RelatedLink[] = [
  {
    title: "Bazi Overview",
    href: "/bazi",
    description: "Read the calendar-based Chinese chart framework.",
  },
  {
    title: "Chinese Zodiac",
    href: "/chinese-zodiac",
    description: "Compare zodiac signs with Western sun-sign language carefully.",
  },
  {
    title: "Bazi vs Western Astrology",
    href: "/blog/bazi-vs-western-astrology",
    description: "Read the editorial comparison for search-intent context.",
  },
  {
    title: "Which System Should You Learn?",
    href: "/learn/which-system",
    description: "Match the question and available input to one Chinese system before comparing traditions.",
  },
  {
    title: "Books & Source Guide",
    href: "/learn/resources",
    description: "Check primary texts, translations, calendar data, and calculation tools.",
  },
];

const misconceptionRelatedLinks: RelatedLink[] = [
  {
    title: "Beginner's Guide",
    href: "/learn/beginners-guide",
    description: "Start with the calm learning path before advanced claims.",
  },
  {
    title: "Common Bazi Basics",
    href: "/bazi/what-is-bazi",
    description: "See why a chart is more than one sign or element.",
  },
  {
    title: "Chinese Zodiac Compatibility",
    href: "/blog/chinese-zodiac-compatibility-guide",
    description: "Learn relationship language without reducing people to signs.",
  },
  {
    title: "How to Cast the I Ching",
    href: "/i-ching/how-to-cast",
    description: "Separate question, casting structure, moving lines, and interpretation.",
  },
  {
    title: "Books & Source Guide",
    href: "/learn/resources",
    description: "Use a reproducible checklist for texts, teachers, communities, and tools.",
  },
];

const systemRelatedLinks: RelatedLink[] = [
  { title: "Bazi", href: "/bazi", description: "Choose Bazi for personality patterns, timing, and Four Pillars structure." },
  { title: "I Ching", href: "/i-ching", description: "Choose I Ching for reflective decisions and symbolic change." },
  { title: "Feng Shui", href: "/feng-shui", description: "Choose Feng Shui for space, flow, support, and environmental context." },
  { title: "Ziwei Doushu", href: "/ziwei", description: "Choose Ziwei for a detailed palace-and-star natal chart." },
  { title: "Chinese Zodiac", href: "/chinese-zodiac", description: "Choose the zodiac for a simple cultural entry into the branch cycle." },
];

const resourceRelatedLinks: RelatedLink[] = [
  { title: "What Is Bazi?", href: "/bazi/what-is-bazi", description: "Apply the source-checking method to a documented Four Pillars overview." },
  { title: "I Ching", href: "/i-ching", description: "See how a classical text, hexagram structure, and modern practice fit together." },
  { title: "Five Elements", href: "/bazi/five-elements", description: "Compare a shared Chinese term across calendar, Bazi, and change traditions." },
];

function pageUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function breadcrumbs(current: string, href: string) {
  return [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: current, href },
  ];
}

function cta(title = "Choose your starting point") {
  return {
    title,
    description:
      "Move from beginner concepts into Bazi, Chinese Zodiac, I Ching, Feng Shui, or another system when you know what question you want to answer.",
    href: "/learn/which-system",
    label: "Compare the systems",
  };
}

const defaultEditorialQuote = {
  text: "The best starting point is the one that matches the question, keeps the rules clear, and avoids certainty theater.",
  author: "Mingli Atlas Editorial Team",
  title: "Editorial note",
};

function withEditorialQuote(sections: KnowledgePageProps["sections"]): KnowledgePageProps["sections"] {
  if (sections.some((section) => section.quotes?.length)) return sections;

  return sections.map((section, index) =>
    index === 0 ? { ...section, quotes: [defaultEditorialQuote] } : section,
  );
}

function buildPage(input: Omit<LearnContentPage, "data"> & KnowledgePageProps): LearnContentPage {
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
        datePublished: data.schema.datePublished ?? "2026-03-05",
        dateModified: data.schema.dateModified ?? "2026-03-20",
      },
    },
  };
}

export const allLearnPages: LearnContentPage[] = [
  buildPage({
    slug: "",
    path: "/learn",
    title: "Learn Chinese Metaphysics: Bazi, I Ching & Feng Shui Roadmap",
    description:
      "A structured learning hub for Chinese metaphysics foundations, Bazi, I Ching, Feng Shui, Ziwei Doushu, Chinese zodiac, tools, and sources.",
    entityName: "Chinese Metaphysics Learning Center",
    entityType: "Article",
    subtitle: "Start with the shared calendar and change vocabulary, choose one system by question, then practice with traceable sources and limits.",
    directAnswer:
      "Chinese metaphysics is a family of systems for studying classified time, symbolic change, natal patterns, cultural cycles, and physical environments. Begin with yin-yang, the Five Phases, 10 Heavenly Stems, 12 Earthly Branches, solar terms, and calendar boundaries. Then choose one method—Bazi, Ziwei Doushu, I Ching, Feng Shui, or Chinese zodiac—by its required input and output before using tools or combining traditions.",
    breadcrumbs: breadcrumbs("Overview", "/learn"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-01", dateModified: "2026-08-07" },
    stats: [
      { value: "5", label: "Core systems", description: "Bazi, Zodiac, I Ching, Feng Shui, Ziwei." },
      { value: "22", label: "Stem-branch symbols", description: "10 Heavenly Stems and 12 Earthly Branches classify cycles." },
      { value: "4", label: "Learning stages", description: "Foundation, system choice, one practice, and verification." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "A foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "San Ming Tong Hui (三命通会)", source: "A Ming-dynasty compilation preserving terminology and methods from multiple fate-calculation traditions." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing 64 hexagram statements and line texts." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A secondary reference for checking cultural associations without treating them as universal chart rules." },
    ],
    sections: [
      {
        heading: "What belongs under Chinese metaphysics",
        content: (
          <>
            <p>
              “Chinese metaphysics” is a modern umbrella for related but distinct ways of organizing time, change, birth data, symbols, and environments. <TermLink term="Bazi">Bazi</TermLink> and Ziwei Doushu build natal charts. The <TermLink term="I Ching">I Ching</TermLink> frames one situation through hexagrams and lines. <TermLink term="Feng Shui">Feng Shui</TermLink> studies a site and its use. The <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> gives broad cultural context for the 12-year branch cycle.
            </p>
            <p>
              These systems share terms, but a shared word does not guarantee a shared rule. “Element,” “palace,” “qi,” “star,” and “change” can perform different technical roles. Use this hub to choose a route, then keep each method&apos;s question, input, calculation, source, and interpretation separate until you can explain its grammar without borrowing from another tradition.
            </p>
            <p>
              The learning center presents the material for education, cultural context, and structured reflection. It does not provide medical, legal, financial, mental-health, or deterministic life advice. A useful interpretation should preserve uncertainty, observation, consent, and the reader&apos;s ability to choose.
            </p>
          </>
        ),
      },
      {
        heading: "The shared foundation: relationships and classified time",
        content: (
          <>
            <p>
              Start with yin and yang as relative qualities rather than fixed opposites. Then learn <TermLink term="Five Elements">Wu Xing / the Five Phases</TermLink> as Wood, Fire, Earth, Metal, and Water processes connected by generating and controlling relationships. These ideas become useful when they describe a relation in context, not when they are reduced to five personality labels.
            </p>
            <p>
              Next learn the 10 <TermLink term="Heavenly Stems">Heavenly Stems</TermLink> and 12 <TermLink term="Earthly Branches">Earthly Branches</TermLink>. The branches carry seasonal and cycle functions; zodiac animals are one memorable layer. Use the <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> to distinguish Gregorian dates, lunar dates, stem-branch labels, solar terms, and the Lunar New Year boundary.
            </p>
            <p>
              Primary texts such as <cite>Yuan Hai Zi Ping (渊海子平)</cite>, <cite>San Ming Tong Hui (三命通会)</cite>, and the <cite>Zhouyi (周易 / I Ching)</cite> preserve different textual traditions. They are anchors, not interchangeable rulebooks or quick beginner manuals. Pair them with transparent explanations and record the exact term, passage, edition, translator, and school when those details affect the conclusion.
            </p>
          </>
        ),
        stats: [{ value: "10 + 12", label: "Cycle vocabulary", description: "Stems and branches form the shared calendar grammar." }],
      },
      {
        heading: "Five systems, five kinds of output",
        content: (
          <>
            <p>
              Choose <Link href="/bazi" className={linkClass}>Bazi</Link> when you have reliable birth data and want a Four Pillars structure organized around the Day Master, element relationships, and timing layers. Choose <Link href="/ziwei" className={linkClass}>Ziwei Doushu</Link> when you want a more detailed natal map of twelve palaces, stars, transformations, and life areas and can verify the birth time.
            </p>
            <p>
              Choose <Link href="/i-ching" className={linkClass}>I Ching</Link> for one present, open question about a situation and its change. It produces a primary hexagram, moving-line context, and sometimes a relating hexagram—not a permanent personality profile. Choose <Link href="/feng-shui" className={linkClass}>Feng Shui</Link> for a real home, room, office, desk, entrance, or site whose form, movement, orientation, and actual use can be observed.
            </p>
            <p>
              Choose the <Link href="/chinese-zodiac" className={linkClass}>Chinese Zodiac</Link> for an accessible introduction to the Earthly Branch cycle and cultural symbolism. Check the year boundary and add the stem-element pairing, but keep its output broad. The <Link href="/learn/which-system" className={linkClass}>system selection guide</Link> compares required inputs, missing-data constraints, and a first exercise for every path.
            </p>
          </>
        ),
      },
      {
        heading: "Recommended route through this learning center",
        content: (
          <>
            <p>
              If the vocabulary is new, follow the <Link href="/learn/beginners-guide" className={linkClass}>four-week beginner path</Link>. Week one builds yin-yang, Five Phase, stem, branch, and calendar foundations. Week two selects one system. Week three completes a single bounded practice. Week four checks sources, explains limits, and creates a reusable notebook before adding another method.
            </p>
            <p>
              If you already know the shared terms, move directly to the relevant hub and its canonical guide sequence. For Bazi, begin with <Link href="/bazi/what-is-bazi" className={linkClass}>What Is Bazi</Link>, the Day Master, Five Elements, stems, branches, Ten Gods, and Luck Pillars. For I Ching, learn trigrams, casting, hexagram structure, and changing lines before browsing individual meanings. For Feng Shui, start with observable form and function before formulas.
            </p>
            <p>
              Before choosing a course, community, translation, or calculator, use the <Link href="/learn/resources" className={linkClass}>books and source evaluation guide</Link>. It separates primary text, translation, reference data, teaching rule, modern analogy, and personal inference so a polished explanation does not become evidence by repetition.
            </p>
          </>
        ),
      },
      {
        heading: "A practice loop that keeps claims traceable",
        content: (
          <>
            <ol className="list-decimal space-y-3 pl-6">
              <li><strong>State one question.</strong> Name the system and why its input and output fit.</li>
              <li><strong>Verify the structure.</strong> Check the date boundary, chart, casting, orientation, or branch assignment before interpreting it.</li>
              <li><strong>Define the terms.</strong> Keep Chinese characters, pinyin, translation, and system-specific role together.</li>
              <li><strong>Locate a source.</strong> Separate original text, commentary, calculation reference, and your inference.</li>
              <li><strong>Complete one example.</strong> Show how the rule applies and look for a counterexample or limiting condition.</li>
              <li><strong>Write the boundary.</strong> State what the method cannot establish and which uncertainty remains.</li>
            </ol>
            <p>
              Tools come after the loop is understood. The <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link>, <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link>, and <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> can reproduce structures and create a practice case. Record their inputs and conventions, then return to the guide pages instead of treating an automated output as an authority.
            </p>
          </>
        ),
      },
      {
        heading: "Quality and safety checks before moving deeper",
        content: (
          <>
            <p>
              A page or teacher should define terms, show how the input becomes the output, name sources or school conventions, demonstrate more than one example, and acknowledge disagreement. Be cautious with guaranteed outcomes, fear-based deadlines, secret-rule sales pressure, copied cases, and claims that cannot be traced to a text, calculation, or observable site condition.
            </p>
            <p>
              Avoid reducing a person to one animal, element, Day Master, star, palace, or hexagram. <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> can help check cultural associations, but an association is not automatically a Bazi, Ziwei, I Ching, or Feng Shui rule. Keep systems separate until each explanation is complete in its own terms.
            </p>
            <p>
              Move deeper when you can reproduce one structure, explain one claim with a named source, distinguish fact from interpretation, and state a limit without prompting. Stop when certainty exceeds the data or the topic crosses into professional advice, safety, another person&apos;s consent, or a decision that needs direct evidence. Returning to the foundation is part of good practice.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Where should I start learning Chinese metaphysics?",
        answer:
          "Start with yin-yang relationships, the Five Phase generating and controlling cycles, the 10 Heavenly Stems, 12 Earthly Branches, and calendar boundaries. Then choose one system by question and available input. Complete one documented exercise and verify its source before adding another tradition or relying on a tool.",
      },
      {
        question: "Are Bazi, I Ching, Feng Shui, Ziwei, and the zodiac the same system?",
        answer:
          "No. They share parts of the Chinese symbolic and calendar vocabulary but use different inputs and produce different structures. Bazi and Ziwei are natal-chart methods, I Ching answers a present question, Feng Shui studies an environment, and the zodiac provides broad birth-year branch context.",
      },
      {
        question: "Can I learn several Chinese metaphysics systems at once?",
        answer:
          "Learn them sequentially. Give each system its own question, input, calculation rules, source notes, and output. Compare completed explanations afterward. Mixing shared words before learning each grammar makes similarities look stronger than they are and makes errors difficult to trace.",
      },
      {
        question: "How do I know whether a Chinese metaphysics source is trustworthy?",
        answer:
          "Look for defined terms, visible calculations or structures, named texts or reference data, declared school conventions, worked examples, and stated limits. Compare an independent source. Confidence, age, lineage, popularity, testimonials, or AI fluency alone do not verify a historical claim or interpretive rule.",
      },
    ],
    relatedLinks: overviewRelatedLinks,
    cta: cta(),
  }),
  buildPage({
    slug: "beginners-guide",
    path: "/learn/beginners-guide",
    title: "Chinese Metaphysics Beginner's Guide: A Four-Week Path",
    description: "A four-week beginner path through yin-yang, Five Elements, stems, branches, Bazi, I Ching, Feng Shui, source checks, and tools.",
    entityName: "Chinese Metaphysics Beginner Guide",
    entityType: "Article",
    subtitle: "A paced introduction that separates shared vocabulary, calendar structure, system choice, first practice, and source verification.",
    directAnswer:
      "Begin Chinese metaphysics in four stages: learn yin-yang and the Five Elements; map the 10 Heavenly Stems, 12 Earthly Branches, and calendar boundaries; choose one system that matches your question; then complete one documented practice before adding tools or another tradition. Keep calculation, source text, commentary, and personal interpretation in separate notes so mistakes remain visible and correctable.",
    breadcrumbs: breadcrumbs("Beginner's Guide", "/learn/beginners-guide"),
    schema: { headline: "", description: "", url: "", datePublished: "2025-12-10", dateModified: "2026-08-07" },
    stats: [
      { value: "4", label: "Learning weeks", description: "Foundation, calendar, one system, then verification." },
      { value: "5", label: "Phases", description: "Wood, Fire, Earth, Metal, and Water describe processes of change." },
      { value: "22", label: "Calendar symbols", description: "10 Heavenly Stems and 12 Earthly Branches." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "A foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "San Ming Tong Hui (三命通会)", source: "A Ming-dynasty compilation preserving terminology and methods from multiple fate-calculation traditions." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing 64 hexagram statements and line texts." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A secondary reference for checking cultural associations without turning them into chart rules." },
    ],
    sections: [
      {
        heading: "Before week one: set scope and ground rules",
        content: (
          <>
            <p>
              Chinese metaphysics is a family of systems, not one universal chart. Decide whether you are studying cultural history, symbolic vocabulary, a birth-chart method, a decision text, or an environment. Write that scope at the top of your notebook. It prevents a Bazi rule, an I Ching image, and a Feng Shui observation from merging simply because an English translation uses the same word.
            </p>
            <p>
              Use the material for education and structured reflection, not medical, legal, financial, or mental-health decisions. Do not use a reading to diagnose another person, remove consent, or claim certainty about an outcome. Record unknown birth times, ambiguous calendar boundaries, translation choices, and school differences instead of hiding them behind confident language.
            </p>
          </>
        ),
      },
      {
        heading: "Week one: learn yin-yang and the Five Phases as relationships",
        content: (
          <>
            <p>
              Begin with yin and yang as relational qualities: inward and outward, receptive and active, cooling and warming, consolidating and expanding. They are not moral teams and nothing is permanently yin or yang in every context. Ask, “Relative to what?” before assigning the label.
            </p>
            <p>
              Then learn <TermLink term="Five Elements">Wu Xing / the Five Phases</TermLink> as Wood, Fire, Earth, Metal, and Water processes. Memorize the generating sequence—Wood feeds Fire, Fire produces Earth, Earth bears Metal, Metal supports Water, and Water nourishes Wood—and the controlling sequence—Wood regulates Earth, Earth contains Water, Water controls Fire, Fire melts Metal, and Metal cuts Wood. These sequences describe relationships, not a five-word personality quiz.
            </p>
            <p>
              Make five cards. On each card record the Chinese character, pinyin, yin/yang expressions, season, direction, generating relationship, controlling relationship, and one source. Avoid memorizing color, organ, career, emotion, and personality lists all at once; correspondence tables belong to particular contexts and traditions.
            </p>
          </>
        ),
        stats: [{ value: "2", label: "Core cycles", description: "Generating and controlling relationships organize the Five Phases." }],
      },
      {
        heading: "Week one: map stems, branches, and calendar boundaries",
        content: (
          <>
            <p>
              Next map the 10 <TermLink term="Heavenly Stems">Heavenly Stems</TermLink> and 12 <TermLink term="Earthly Branches">Earthly Branches</TermLink>. A stem combines one phase with yin or yang. A branch carries seasonal and time-cycle functions; its zodiac animal is a memorable cultural label, not its complete technical meaning. Practice writing the sequences in order before studying combinations, clashes, hidden stems, or Ten Gods.
            </p>
            <p>
              Use the <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> to compare Gregorian dates, lunar dates, stem-branch years, and solar terms. Notice that Lunar New Year and the solar-term boundary used by some Bazi conventions are different questions. A January or February birth can be assigned incorrectly when a resource says only “Chinese year” without naming its boundary.
            </p>
            <p>
              Build a one-page calendar glossary with Gregorian date, lunar date, solar terms, stem, branch, zodiac animal, and time zone. Mark which facts are calculated and which meanings are interpretive. This page becomes the reference you check whenever a chart or article appears to disagree.
            </p>
          </>
        ),
      },
      {
        heading: "Week two: choose one system by question and input",
        content: (
          <>
            <p>
              Choose <TermLink term="Bazi">Bazi</TermLink> for recurring birth-chart patterns and timing; Ziwei Doushu for a detailed palace-and-star natal chart; <TermLink term="I Ching">I Ching</TermLink> for one present decision; <TermLink term="Feng Shui">Feng Shui</TermLink> for a real environment; or the <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> for broad birth-year cultural context. The <Link href="/learn/which-system" className={linkClass}>system selection guide</Link> compares the input and output of all five.
            </p>
            <p>
              Let missing information narrow the choice. Bazi and Ziwei benefit from an accurate birth time; I Ching needs one well-framed current question; Feng Shui needs access to the actual space; zodiac basics need a correctly bounded year. Do not invent a birth hour, orientation, moving line, or school rule to complete a method whose required input is absent.
            </p>
          </>
        ),
      },
      {
        heading: "Week three: complete one bounded practice",
        content: (
          <>
            <p>
              Keep the first exercise small enough to verify. For Bazi, label the four pillars, identify the Day Master, and map the Five Element relationships without forecasting. For I Ching, write one open question, cast once, and separate the primary hexagram, moving lines, and relating hexagram. For Feng Shui, sketch one room and mark entry, movement, main activity, support, light, and obstacles before using formulas.
            </p>
            <p>
              For Ziwei, learn the twelve palace names and locate the major stars before interpreting life events. For the zodiac, verify one birth-year boundary, branch, stem, and element pairing, then compare the broad cultural description with the fuller branch page. A finished, sourced exercise teaches more than browsing fifty disconnected meanings.
            </p>
            <p>
              Textual anchors such as <cite>Yuan Hai Zi Ping (渊海子平)</cite>, <cite>San Ming Tong Hui (三命通会)</cite>, and the <cite>Zhouyi (周易 / I Ching)</cite> are not quick manuals. Use them to check terminology and structure alongside a transparent beginner explanation. Preserve quotation, commentary, and your inference as separate notebook blocks.
            </p>
          </>
        ),
      },
      {
        heading: "Week three: use tools only after you can name the output",
        content: (
          <>
            <p>
              A calculator is useful when you understand the structure it calculates. Before opening the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link>, be able to name year, month, day, and hour pillars and explain that the Day Master is the day stem. After generating a chart, record the input date, time, time zone, displayed pillars, and any boundary assumptions; then use the guide links instead of treating the result card as a verdict.
            </p>
            <p>
              Before using the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link>, write the question and know how six lines form a hexagram. Before using the <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link>, understand harmony groups and clashes as branch relationships, not proof that two people will succeed or fail. Reproduce one output in another reference when possible.
            </p>
          </>
        ),
      },
      {
        heading: "Week four: verify sources and build a reusable notebook",
        content: (
          <>
            <p>
              For each important claim, record the system, Chinese term, pinyin, working translation, source layer, exact quotation or calculation, your paraphrase, one example, and the limit of the claim. Compare at least one independent source. <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> can help check cultural associations, but a cultural association does not become a Bazi, Ziwei, or Feng Shui rule without system-specific evidence.
            </p>
            <p>
              Use the <Link href="/learn/resources" className={linkClass}>books and source evaluation guide</Link> to distinguish primary text, translation, calculation reference, teacher rule, and modern analogy. Date your notes and keep corrections rather than deleting them. A visible correction trail is a sign that the method is becoming more precise, not that the study failed.
            </p>
            <p>
              End the week by explaining one concept without reading: define it, name its system, show the input or structure, cite a source, give an example, and state what it cannot establish. If any step is missing, review that layer before starting a second tradition.
            </p>
          </>
        ),
      },
      {
        heading: "Common mistakes and stopping conditions",
        content: (
          <>
            <p>
              Avoid reducing a person to one animal, element, Day Master, star, or hexagram. Avoid mixing Bazi and Western astrology terms before each chart has been read by its own grammar. Avoid recasting, changing birth inputs, or switching schools until a preferred answer appears. Avoid teachers or communities that use fear, guaranteed outcomes, secret-rule pressure, or unverifiable case studies.
            </p>
            <p>
              Stop a session when the interpretation becomes more certain than the data, when a claim affects health, money, law, safety, or another person&apos;s consent, or when the method replaces observation and professional evidence. Return to the calculation, source, and stated limit. The goal of the first month is not prediction; it is learning to produce a clear, reproducible, and appropriately bounded explanation.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "What should I learn first in Chinese metaphysics?",
        answer:
          "Learn yin-yang as a relationship, the Five Phase generating and controlling cycles, then the 10 Heavenly Stems and 12 Earthly Branches. Check calendar boundaries before assigning zodiac or pillar labels. Only after that should you choose Bazi, Ziwei, I Ching, Feng Shui, or zodiac study by question and available input.",
      },
      {
        question: "How long does it take to learn the basics?",
        answer:
          "Four focused weeks are enough to build a reliable foundation and complete one bounded exercise, not to master a tradition. Spend the first week on shared vocabulary and calendar structure, the second choosing one method, the third practicing once, and the fourth checking sources and explaining the limits of what you learned.",
      },
      {
        question: "Do I need my exact birth time to begin?",
        answer:
          "No. You can learn shared vocabulary, calendar basics, zodiac context, I Ching question framing, and observable Feng Shui form without a birth time. A complete Bazi or Ziwei natal chart is more sensitive to missing time data, so label the omission and avoid precise claims instead of guessing an hour.",
      },
      {
        question: "When should a beginner use a calculator or oracle?",
        answer:
          "Use a tool after you can name its inputs, output structure, and one way to verify the calculation. Record the settings and result, then return to documented guide pages. A tool can reproduce a chart or casting, but it cannot prove that a personality, timing, relationship, or decision claim follows from it.",
      },
    ],
    relatedLinks: beginnerRelatedLinks,
    cta: cta("Compare the main systems next"),
  }),
  buildPage({
    slug: "chinese-vs-western-astrology",
    path: "/learn/chinese-vs-western-astrology",
    title: "Chinese vs Western Astrology: Key Differences",
    description: "Compare Chinese astrology and Western astrology by calculation, chart structure, zodiac role, timing methods, required birth data, and responsible use.",
    entityName: "Chinese and Western Astrology Comparison",
    entityType: "Article",
    subtitle: "A calculation-first comparison that keeps Chinese calendar systems and Western planetary astrology in their own technical languages.",
    directAnswer: "Chinese and Western astrology classify the same birth moment with different systems. Western astrology maps planets into zodiac signs, houses, and aspects. Bazi maps year, month, day, and hour into Heavenly Stems and Earthly Branches, then reads the Day Master, Five Phase relationships, and timing cycles. Compare completed readings by question; do not translate one system's symbols directly into the other.",
    breadcrumbs: breadcrumbs("Chinese vs Western Astrology", "/learn/chinese-vs-western-astrology"),
    schema: {
      headline: "",
      description: "",
      url: "",
      datePublished: "2025-12-18",
      dateModified: "2026-08-07",
    },
    stats: [
      {
        value: "2",
        label: "Calculation grammars",
        description: "Planetary positions and Chinese stem-branch time classification.",
      },
      {
        value: "12 ≠ 12",
        label: "Different cycles",
        description: "Western signs and Earthly Branches are not equivalent symbol sets.",
      },
      {
        value: "4",
        label: "Bazi pillars",
        description: "Year, month, day, and hour each receive a stem and branch.",
      },
      {
        value: "10 + 12",
        label: "Chinese time symbols",
        description: "Heavenly Stems and Earthly Branches combine into the 60-cycle.",
      },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A reference for checking Gregorian dates, lunar dates, solar terms, and stem-branch calendar labels.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      {
        label: "Yuan Hai Zi Ping (渊海子平)",
        source: "A foundational source in the Four Pillars / Zi Ping textual tradition.",
      },
      {
        label: "San Ming Tong Hui (三命通会)",
        source: "A Ming-dynasty compilation preserving Four Pillars terminology and methods.",
      },
      {
        label: "Ptolemy, Tetrabiblos",
        source: "A primary source for the inherited Hellenistic framework of planets, signs, aspects, and terrestrial topics.",
        url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Ptolemy/Tetrabiblos/home.html",
      },
      {
        label: "Swiss Ephemeris documentation",
        source: "Technical documentation for reproducible planetary positions, time scales, and house calculations.",
        url: "https://www.astro.com/swisseph/swephinfo_e.htm",
      },
    ],
    sections: [
      {
        heading: "Start with the question, not the shared word astrology",
        content: (
          <>
            <p>
              “Chinese astrology” is an umbrella label, not one chart. It may refer to the <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink>, <TermLink term="Bazi">Bazi</TermLink>, Ziwei Doushu, or another calendar-based tradition. Western astrology also contains natal, mundane, electional, horary, tropical, and sidereal branches. A useful comparison must name the specific methods instead of treating two large families as single personality systems.
            </p>
            <p>This guide uses Bazi as the main Chinese chart example and a conventional Western natal chart as the Western example. Ask the same bounded question of both—such as how each chart organizes temperament or timing—then let each system show its own calculation and evidence. Similar wording at the interpretation stage does not prove that the underlying symbols are interchangeable.</p>
          </>
        ),
      },
      {
        heading: "The calculation starts in different places",
        content: (
          <>
            <p>
              A Western natal chart calculates the apparent positions of the Sun, Moon, planets, and selected points for a date, time, and place. Those positions are expressed through zodiac longitude, placed into houses by a declared house system, and related through angular aspects. A reproducible chart therefore states its zodiac convention, ephemeris, coordinates, time zone, daylight-saving treatment, and house system. The <cite>Swiss Ephemeris documentation</cite> illustrates why these settings are calculation inputs rather than cosmetic preferences.
            </p>
            <p>
              Bazi classifies the same moment into four pillars—year, month, day, and hour—each containing a <TermLink term="Heavenly Stems">Heavenly Stem</TermLink> and <TermLink term="Earthly Branches">Earthly Branch</TermLink>. Interpretation is organized around the day stem or Day Master, Five Phase relationships, Ten Gods, seasonal context, combinations, clashes, and timing cycles. <cite>Yuan Hai Zi Ping (渊海子平)</cite> and <cite>San Ming Tong Hui (三命通会)</cite> belong to this textual lineage; they are not planetary ephemerides.
            </p>
          </>
        ),
        stats: [
          {
            value: "8",
            label: "Bazi characters",
            description: "Four stems and four branches form the familiar Eight Characters.",
          },
        ],
      },
      {
        heading: "Why twelve zodiac signs are not twelve zodiac animals",
        content: (
          <>
            <p>
              Western zodiac signs divide the ecliptic into twelve sign sectors. The Sun sign describes the Sun&apos;s zodiac position, while the Moon, planets, angles, houses, and aspects supply other chart information. <cite>Ptolemy&apos;s Tetrabiblos</cite> is one historical witness to a planetary and sign-based grammar, although modern Western schools differ in technique and interpretation.
            </p>
            <p>The twelve Chinese zodiac animals are memorable names associated with the twelve Earthly Branches. Branches can label years, months, days, and two-hour periods and carry seasonal and relational functions beyond the animal image. A birth-year animal is therefore not the Chinese equivalent of a Western Sun sign. Both are popular entry points, but both become misleading when detached from their wider chart.</p>
            <p>
              Calendar boundaries matter. Lunar New Year is important for the public zodiac calendar, while some Bazi conventions use the solar term Start of Spring for the year pillar and solar terms for month pillars. Use the <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> to distinguish Gregorian, lunar, solar-term, and stem-branch labels before comparing a January or February birth.
            </p>
          </>
        ),
      },
      {
        heading: "Do not force chart components into a one-to-one dictionary",
        content: (
          <>
            <p>A Day Master is not a Sun sign: it is the Heavenly Stem of the day pillar and the reference point used to classify other stems and branches through the Ten Gods. Ten Gods are not planets; they name relationships such as resource, output, wealth, authority, and peers relative to the Day Master. Five Phases are not the four classical Western elements plus an extra substance; they describe a Chinese relationship system with generating and controlling cycles.</p>
            <p>Western planets, signs, houses, and aspects also perform different jobs. A planet is commonly read as an actor or function, a sign as its style, a house as a field of experience, and an aspect as an angular relationship, but schools qualify those shorthand descriptions. Ziwei palaces may resemble houses at the level of “life areas,” yet Ziwei&apos;s stars, palace arrangement, transformations, and timing rules still require their own grammar.</p>
            <p>Translation should preserve role rather than chase resemblance. When two symbols sound similar, record their formal input, position in the chart, relationships, timing behavior, and source. If those five columns differ, keep the terms separate even when a modern interpretation produces a similar theme.</p>
          </>
        ),
      },
      {
        heading: "Timing methods also answer different questions",
        content: (
          <>
            <p>Bazi timing commonly layers Luck Pillars and annual or shorter stem-branch cycles over the natal structure. The result is read through changing seasonal strength, element relationships, Ten Gods, combinations, and clashes. A timing statement should identify the natal feature, the arriving cycle, the rule connecting them, and the uncertainty introduced by birth-time or school conventions.</p>
            <p>Western astrologers may use transits, secondary progressions, solar returns, profections, directions, or other techniques. A transit compares a current planetary position with the natal chart; it is not a Luck Pillar translated into planetary language. Before comparing forecasts, make each reading name its technique, interval, triggering rule, and claimed scope. Agreement in a broad phrase such as “career change” is weaker evidence than a clearly documented calculation.</p>
          </>
        ),
      },
      {
        heading: "Birth data, missing data, and reproducibility",
        content: (
          <>
            <p>Both systems benefit from an accurate date, time, place, and time-zone history, but missing inputs affect them differently. Without a reliable birth time, a Western Ascendant and houses may change, while the Bazi hour pillar is unknown and a day boundary may need review. Do not silently choose noon, invent an hour, or present a rectified time as observed fact.</p>
            <p>
              Save the raw input and settings before reading. For Bazi, record the civil time, time zone, calendar conversion, solar-term convention, four pillars, and whether solar-time adjustment is used. For Western astrology, record coordinates, time scale, zodiac, house system, node calculation, and ephemeris. The{" "}
              <Link href="/tools/bazi-calculator" className={linkClass}>
                Bazi calculator
              </Link>{" "}
              can provide a reproducible practice chart, but its displayed result remains a calculation to verify rather than an interpretive authority.
            </p>
          </>
        ),
      },
      {
        heading: "A safe method for comparing both readings",
        content: (
          <>
            <ol className="list-decimal space-y-3 pl-6">
              <li>
                <strong>Fix one question.</strong> Compare temperament, timing, or decision support—not “which chart is true.”
              </li>
              <li>
                <strong>Verify both calculations.</strong> Preserve inputs, boundary rules, chart settings, and missing data.
              </li>
              <li>
                <strong>Finish each reading separately.</strong> Use only its native components and named sources.
              </li>
              <li>
                <strong>Label claim strength.</strong> Separate calculated structure, traditional rule, modern analogy, and personal inference.
              </li>
              <li>
                <strong>Compare at the question level.</strong> Note convergences, contradictions, and what neither method can establish.
              </li>
            </ol>
            <p>A convergence can become a reflection prompt: look for observable examples, counterexamples, and practical choices. It should not become double certainty. Two symbolic systems can repeat a vague theme because the language is broad, the interpreter selected matching details, or the question invited the same concern. Keep consent and professional evidence ahead of either reading when health, law, finance, safety, or another person is involved.</p>
          </>
        ),
      },
      {
        heading: "Which system should you learn first?",
        content: (
          <>
            <p>
              Choose{" "}
              <Link href="/bazi" className={linkClass}>
                Bazi
              </Link>{" "}
              if you want to learn stems, branches, Five Phase relationships, the Day Master, and Chinese calendar timing. Begin with{" "}
              <Link href="/bazi/what-is-bazi" className={linkClass}>
                What Is Bazi
              </Link>{" "}
              and verify one four-pillar chart before studying Luck Pillars. Choose Western astrology if planetary motion, signs, aspects, and house topics are the language you want to investigate; use a source that declares its zodiac and house conventions.
            </p>
            <p>
              If your real question is about one present decision or one physical environment, neither natal system may be the best first tool. The{" "}
              <Link href="/learn/which-system" className={linkClass}>
                Chinese system selector
              </Link>{" "}
              compares Bazi, Ziwei, I Ching, Feng Shui, and zodiac by input and output. Whichever route you choose, the{" "}
              <Link href="/learn/resources" className={linkClass}>
                source evaluation guide
              </Link>{" "}
              provides the same rule: reproduce the structure, name the source layer, show an example, and state a limit before combining traditions.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Is a Chinese zodiac animal the same as a Western Sun sign?",
        answer: "No. A Western Sun sign is the Sun's zodiac position inside a planetary chart. A Chinese zodiac animal names one Earthly Branch, usually presented through the birth year, inside a larger stem-branch calendar. Both are simplified public entry points; neither represents the complete technical chart.",
      },
      {
        question: "Is the Bazi Day Master equivalent to the Sun sign?",
        answer: "No. The Day Master is the Heavenly Stem of the Bazi day pillar and the reference used to classify other chart relationships through the Ten Gods. The Western Sun is a calculated planetary position read by sign, house, aspects, and technique. Similar personality language does not make their chart functions identical.",
      },
      {
        question: "Can I use Chinese and Western astrology together?",
        answer: "Yes, after completing each calculation and interpretation separately. Ask both systems the same bounded question, preserve their settings and source rules, then compare conclusions rather than symbols. Treat agreement as a prompt to examine observable evidence, not as doubled proof or a reason to override professional advice.",
      },
      {
        question: "Which birth details do both systems need?",
        answer: "Both benefit from an accurate date, civil time, place, and historical time zone. Bazi additionally needs declared calendar and solar-term boundary conventions; a Western chart needs an ephemeris, zodiac convention, coordinates, and usually a house system. If the time is unknown, state which components cannot be calculated reliably.",
      },
    ],
    relatedLinks: comparisonRelatedLinks,
    cta: cta("Pick the system that fits your question"),
  }),
  buildPage({
    slug: "common-misconceptions",
    path: "/learn/common-misconceptions",
    title: "Common Misconceptions About Chinese Metaphysics",
    description: "Correct common misconceptions about Bazi, Feng Shui, I Ching, Chinese zodiac, Five Elements, calendar boundaries, prediction, and traditional sources.",
    entityName: "Chinese Metaphysics Misconceptions",
    entityType: "Article",
    subtitle: "A source-led guide to what Chinese metaphysics calculates, what it interprets, and what it cannot establish.",
    directAnswer: "Chinese metaphysics is not one fortune-telling system, and no single animal, element, pillar, star, object, or hexagram determines a person or event. Bazi and Ziwei are natal-chart traditions, I Ching addresses a present situation, Feng Shui evaluates an environment, and the zodiac is a broad Earthly Branch layer. Good practice verifies inputs, names sources and conventions, separates calculation from interpretation, and preserves uncertainty and agency.",
    breadcrumbs: breadcrumbs("Common Misconceptions", "/learn/common-misconceptions"),
    schema: {
      headline: "",
      description: "",
      url: "",
      datePublished: "2026-01-05",
      dateModified: "2026-08-07",
    },
    stats: [
      {
        value: "5",
        label: "Distinct systems",
        description: "Bazi, Ziwei, I Ching, Feng Shui, and zodiac use different inputs.",
      },
      {
        value: "1 / 8",
        label: "Year-branch scope",
        description: "One zodiac branch is only part of a full Bazi Eight Characters chart.",
      },
      {
        value: "4",
        label: "Evidence layers",
        description: "Input, calculation, source rule, and interpretation should remain visible.",
      },
      {
        value: "0",
        label: "Guaranteed outcomes",
        description: "Symbolic methods do not remove uncertainty, consent, or practical evidence.",
      },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A reference for distinguishing Gregorian, lunar, solar-term, and stem-branch calendar labels.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      {
        label: "Yuan Hai Zi Ping (渊海子平)",
        source: "A foundational text in the Four Pillars / Zi Ping tradition.",
      },
      {
        label: "San Ming Tong Hui (三命通会)",
        source: "A historical compilation that demonstrates the depth and variation of fate-calculation methods.",
      },
      {
        label: "Zhouyi (周易 / I Ching)",
        source: "The received Changes text containing hexagram and line statements rather than a universal yes-or-no code.",
      },
      {
        label: "Wolfram Eberhard, A Dictionary of Chinese Symbols",
        source: "A secondary reference for checking cultural associations without turning every symbol into a chart rule.",
      },
    ],
    sections: [
      {
        heading: "Misconception 1: one animal, element, or pillar explains a person",
        content: (
          <>
            <p>
              The{" "}
              <Link href="/chinese-zodiac" className={linkClass}>
                Chinese Zodiac
              </Link>{" "}
              is a useful cultural entry point, but a year animal names one Earthly Branch. A full <TermLink term="Bazi">Bazi</TermLink> chart contains four stems and four branches assigned to the year, month, day, and hour. It then evaluates the Day Master, seasonal context, Five Phase relationships, Ten Gods, combinations, clashes, and timing layers. One animal is not a compressed version of that structure.
            </p>
            <p>
              The same limit applies to a Day Master, “missing element,” Ziwei star, palace, or favorable symbol. Each is a component whose meaning depends on position and relationships. <cite>Yuan Hai Zi Ping (渊海子平)</cite> and <cite>San Ming Tong Hui (三命通会)</cite> preserve rule systems, not five-word identity labels. Use a single symbol to open a question, never to close an explanation about a whole person.
            </p>
          </>
        ),
      },
      {
        heading: "Misconception 2: the Chinese calendar is simply the lunar calendar",
        content: (
          <>
            <p>Chinese date labels can involve the Gregorian civil calendar, a lunisolar calendar, 24 solar terms, Heavenly Stems, Earthly Branches, and school-specific boundaries. Lunar New Year is not automatically the boundary used for every Bazi year or month pillar. January and February births are especially easy to misclassify when a website says only “Chinese year” without stating whether it means Lunar New Year, Start of Spring, or another rule.</p>
            <p>
              The <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> let a reader compare Gregorian dates, lunar dates, solar terms, and stem-branch labels. A transparent calculator should also state its time zone and boundary convention. When two charts disagree, check date conversion and settings before treating the disagreement as a mysterious school secret.
            </p>
          </>
        ),
        stats: [
          {
            value: "24",
            label: "Solar terms",
            description: "Seasonal markers matter alongside lunar and civil dates.",
          },
        ],
      },
      {
        heading: "Misconception 3: Five Elements are literal ingredients or fixed types",
        content: (
          <>
            <p>“Five Elements” is the familiar translation of Wu Xing, but Wood, Fire, Earth, Metal, and Water function as phases, processes, and relationship categories in many Chinese systems. The generating and controlling cycles describe how categories support or regulate one another in context. They are not material quantities hidden inside the body, and they do not form a universal personality test.</p>
            <p>
              A chart that contains little visible Metal does not automatically require metal jewelry, a white room, or a Metal career. A practitioner must first establish the system, chart structure, seasonal condition, hidden stems, relevant relationships, and the rule connecting diagnosis to recommendation. <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> can help check broad associations, but a cultural association is not automatically a Bazi, medicine, or Feng Shui rule.
            </p>
          </>
        ),
      },
      {
        heading: "Misconception 4: Bazi or Ziwei fixes an unavoidable future",
        content: (
          <>
            <p>Natal systems begin from fixed birth data, but an interpretation is not the same thing as an unavoidable event. Bazi timing relates natal structure to Luck Pillars and shorter cycles; Ziwei uses palaces, stars, transformations, and timing layers. Both require choices about technique, birth-time accuracy, and interpretive scope. A reader should state the pattern and conditions that produced a conclusion instead of announcing a guaranteed outcome.</p>
            <p>Use timing language to frame questions such as what deserves preparation, which constraint is visible, and what evidence would confirm or contradict the reading. Do not use it to diagnose illness, promise wealth, set fear-based deadlines, decide a legal matter, or remove another person&apos;s consent. When the claim becomes more certain than the input and observable evidence, return to the calculation and narrow it.</p>
          </>
        ),
      },
      {
        heading: "Misconception 5: Feng Shui is decoration or a magic object",
        content: (
          <>
            <p>
              <Link href="/feng-shui" className={linkClass}>
                Feng Shui
              </Link>{" "}
              is often marketed through colors, figurines, mirrors, crystals, or “cures,” but a grounded site review begins with the actual environment. It observes external form, approach, entrance, movement, support, light, noise, hazards, orientation, room function, and how people use the space. A decorative object cannot repair unsafe circulation, blocked access, poor ventilation, missing support, or a room that contradicts its purpose.
            </p>
            <p>Different Feng Shui schools add different calculations, so name the method before applying a formula. Start with a floor plan, compass procedure, photographs, use case, and observable constraint. Make ordinary design and safety improvements first; then document any traditional adjustment and its intended mechanism. If the result cannot be distinguished from decluttering, better lighting, or changed behavior, say so rather than crediting the object alone.</p>
          </>
        ),
        stats: [
          {
            value: "4",
            label: "First site checks",
            description: "Form, movement, support, and actual use precede symbolic objects.",
          },
        ],
      },
      {
        heading: "Misconception 6: I Ching supplies a certain yes or no",
        content: (
          <>
            <p>
              The <TermLink term="I Ching">I Ching</TermLink> organizes a present situation through a primary hexagram, its judgment and image, moving-line text when present, and sometimes a relating hexagram. The received <cite>Zhouyi (周易 / I Ching)</cite> does not provide a universal table in which every hexagram permanently means yes or no. Question wording, casting method, moving lines, translation, and context all affect the reading.
            </p>
            <p>Ask one open, decision-relevant question; record it before casting; cast once; and separate text from commentary and personal inference. A reading can expose assumptions, tradeoffs, timing, and a direction of change. It cannot verify a medical diagnosis, another person&apos;s hidden intention, a legal fact, or a guaranteed result. For factual questions, investigate the facts directly.</p>
          </>
        ),
      },
      {
        heading: "Misconception 7: tradition is one unchanged rulebook",
        content: (
          <>
            <p>Chinese metaphysical traditions developed across periods, regions, texts, commentaries, and teaching lineages. Shared terms do not remove differences in calculation or emphasis. A rule attributed to “ancient Chinese wisdom” is not traceable until the author names a text, passage, edition, translation, or school and shows how the source supports the modern claim.</p>
            <p>
              Primary texts are essential anchors, but age alone does not validate every application. Preserve the original wording, historical commentary, teaching convention, modern analogy, and your inference as separate layers. Compare at least one independent source and note disagreements. The{" "}
              <Link href="/learn/resources" className={linkClass}>
                source evaluation guide
              </Link>{" "}
              provides a checklist for books, teachers, communities, calendar references, and calculators.
            </p>
          </>
        ),
      },
      {
        heading: "Misconception 8: a calculator or fluent AI explanation proves the result",
        content: (
          <>
            <p>
              A calculator can consistently convert an input into pillars, branches, a hexagram, or another structure, but it can still use a different time zone, solar-time adjustment, day boundary, ephemeris, school convention, or hidden default. Save the input and settings, compare one independent reference, and distinguish a calculation difference from an interpretation difference. The{" "}
              <Link href="/tools/bazi-calculator" className={linkClass}>
                Bazi calculator
              </Link>{" "}
              is a practice aid, not an authority over the source tradition.
            </p>
            <p>AI can summarize terminology and organize notes, but fluent prose can invent a citation, merge systems, or turn an association into a rule. Verify named sources, dates, quotations, and calculations outside the generated answer. A reliable page makes its chain visible: input → calculation → named rule → example → limit. If one link is missing, reduce confidence instead of increasing certainty through repetition.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Prefer reproducible inputs and declared conventions over secret settings.</li>
              <li>Prefer named sources and exact claims over appeals to age or lineage.</li>
              <li>Prefer examples and counterexamples over universal personality labels.</li>
              <li>Prefer bounded reflection over medical, legal, financial, or deterministic advice.</li>
            </ul>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Is Chinese metaphysics the same as fortune telling?",
        answer: "No single label covers the whole field. Bazi and Ziwei organize natal data, I Ching frames a present situation, Feng Shui studies an environment, and the zodiac provides broad calendar symbolism. Each can be used predictively by some schools, but a responsible explanation names its method, evidence, uncertainty, and practical limits.",
      },
      {
        question: "Does a missing Bazi element mean I must add that element?",
        answer: "No. Visible absence alone does not establish what a chart needs. Seasonal strength, hidden stems, combinations, the Day Master, Five Phase relationships, and the practitioner's school all affect the analysis. Objects, colors, careers, and health claims require an additional rule that should be stated and verified rather than assumed.",
      },
      {
        question: "Can Feng Shui objects change my luck?",
        answer: "An object should not replace observable site analysis or ordinary safety and design work. Begin with external form, entrance, movement, support, light, noise, room function, and actual use. If a school recommends a symbolic adjustment, document the method and intended mechanism without promising a guaranteed life outcome.",
      },
      {
        question: "How can I check a Chinese metaphysics claim?",
        answer: "Record the exact input, calculation, Chinese term, working translation, named text or school rule, example, and limit. Reproduce the structure with an independent source and keep quotation, commentary, analogy, and personal inference separate. If a claim affects health, law, finance, safety, or consent, use direct professional evidence instead.",
      },
    ],
    relatedLinks: misconceptionRelatedLinks,
    cta: cta("Choose a grounded learning path"),
  }),
  buildPage({
    slug: "which-system",
    path: "/learn/which-system",
    title: "Which Chinese Metaphysics System Should You Learn?",
    description: "Compare Bazi, Ziwei Doushu, I Ching, Feng Shui, and Chinese zodiac by question, required input, output, and learning commitment.",
    entityName: "Chinese Metaphysics System Selection",
    entityType: "Article",
    subtitle: "A decision guide for matching one system to the question, information, and type of answer you actually have.",
    directAnswer:
      "Choose by question and required input: Bazi for birth-chart patterns and timing, Ziwei Doushu for detailed life-area structure, I Ching for one present decision, Feng Shui for a physical environment, and Chinese zodiac for cultural year-sign context. If you lack a reliable birth time, begin with I Ching, Feng Shui, or zodiac basics rather than forcing a precise natal chart.",
    breadcrumbs: breadcrumbs("Which System", "/learn/which-system"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-15", dateModified: "2026-08-07" },
    stats: [
      { value: "5", label: "System choices", description: "Bazi, Ziwei, I Ching, Feng Shui, and Zodiac." },
      { value: "3", label: "Input types", description: "Birth data, a present question, or a physical space." },
      { value: "1", label: "First decision", description: "Choose the question before choosing the system." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "A foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing 64 hexagram statements and line texts." },
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac", source: "A secondary reference for Chinese almanac concepts and calendar customs." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A cultural-symbol reference useful for checking broad associations without turning them into chart rules." },
    ],
    sections: [
      {
        heading: "Choose the question before the tradition",
        content: (
          <>
            <p>
              The systems overlap in vocabulary, but they do not answer the same question. A birth chart describes a fixed starting pattern; an I Ching reading responds to a present question; Feng Shui evaluates a place; and the zodiac supplies a broad calendar layer. Starting with the method you heard about first often creates a mismatch between the information you have and the answer you want.
            </p>
            <p>
              Write one neutral sentence before choosing: “I want to understand a recurring personal pattern,” “I need perspective on this decision,” or “I want to improve how this room supports its actual use.” Then list the reliable inputs you possess. The best first system is the one whose inputs and output match that sentence without inventing missing data.
            </p>
          </>
        ),
      },
      {
        heading: "System comparison matrix",
        content: (
          <>
            <p>
              Use this matrix to narrow the field. “Output” means the structure the method can responsibly provide, not a guaranteed prediction.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[52rem] border-collapse text-left text-sm leading-6">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-white/10">
                    <th scope="col" className="px-3 py-3 font-semibold">System</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Best-fit question</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Required input</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Typical output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Bazi</th><td className="px-3 py-3">What patterns and timing cycles recur?</td><td className="px-3 py-3">Birth date, preferably exact time and place</td><td className="px-3 py-3">Four Pillars, Day Master, relationships, timing layers</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Ziwei Doushu</th><td className="px-3 py-3">How are life areas organized in a detailed natal chart?</td><td className="px-3 py-3">Accurate birth date and time; school conventions</td><td className="px-3 py-3">Twelve palaces, stars, transformations, timing</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">I Ching</th><td className="px-3 py-3">What is happening in this situation and how is it changing?</td><td className="px-3 py-3">One present, open question and a casting</td><td className="px-3 py-3">Primary hexagram, moving lines, relating pattern</td></tr>
                  <tr className="border-b border-ink-200/70 dark:border-white/10"><th scope="row" className="px-3 py-3 font-semibold">Feng Shui</th><td className="px-3 py-3">How does this environment support its occupants and use?</td><td className="px-3 py-3">A real space, orientation, layout, occupants, goals</td><td className="px-3 py-3">Form, flow, support, orientation, practical changes</td></tr>
                  <tr><th scope="row" className="px-3 py-3 font-semibold">Chinese Zodiac</th><td className="px-3 py-3">What is the cultural meaning of this birth-year branch?</td><td className="px-3 py-3">Birth year, with Lunar New Year boundary checked</td><td className="px-3 py-3">Animal branch, element-year context, broad relationships</td></tr>
                </tbody>
              </table>
            </div>
          </>
        ),
        stats: [{ value: "5", label: "Different outputs", description: "A chart, a situation, a place, or cultural context are not interchangeable." }],
      },
      {
        heading: "Choose Bazi or Ziwei for natal-chart study",
        content: (
          <>
            <p>
              Choose <TermLink term="Bazi">Bazi</TermLink> when you want a compact framework built from year, month, day, and hour pillars. It organizes the birth moment through <TermLink term="Heavenly Stems">Heavenly Stems</TermLink>, <TermLink term="Earthly Branches">Earthly Branches</TermLink>, the Day Master, Five Element relationships, and later timing cycles. The <cite>Hong Kong Observatory Chinese calendar conversion tables</cite> are useful for checking calendar boundaries, while <cite>Yuan Hai Zi Ping (渊海子平)</cite> anchors the historical Four Pillars vocabulary.
            </p>
            <p>
              Choose <TermLink term="Ziwei Doushu">Ziwei Doushu</TermLink> if you prefer a more granular visual map of twelve life palaces, major stars, auxiliary stars, transformations, and timing. It usually has a steeper vocabulary curve and greater sensitivity to birth-time and school conventions. A detailed diagram is not automatically more accurate; it is simply a different grammar with more named components.
            </p>
            <p>
              If you are undecided, begin with the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> and the <Link href="/blog/day-master-bazi-complete-guide" className={linkClass}>Day Master guide</Link>. Move to Ziwei only if you specifically want palace-based life-area study and can verify the birth time. Do not blend a Bazi Ten God with a Ziwei star merely because their English descriptions sound similar.
            </p>
          </>
        ),
      },
      {
        heading: "Choose I Ching for one present situation",
        content: (
          <>
            <p>
              Choose <TermLink term="I Ching">I Ching</TermLink> when the question can be stated as, “What is the pattern in this situation, and how is it changing?” The received <cite>Zhouyi (周易 / I Ching)</cite> contains 64 hexagram statements and line texts. A reading connects a cast structure to that specific question; it is not a permanent personality chart and it does not require a birth time.
            </p>
            <p>
              Use one open question, provide the context that makes the choice meaningful, and avoid repeatedly recasting until an answer feels comfortable. Start with <Link href="/i-ching/how-to-cast" className={linkClass}>how to cast</Link>, then use the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> and read the primary and relating hexagrams separately. If you want a fixed life-pattern profile instead, choose Bazi or Ziwei.
            </p>
          </>
        ),
      },
      {
        heading: "Choose Feng Shui for a real environment",
        content: (
          <>
            <p>
              Choose <TermLink term="Feng Shui">Feng Shui</TermLink> when the subject is a home, office, bedroom, entrance, desk, site, or surrounding landform. The method begins with a place and the people using it. Photographs, a plan, compass orientation, movement paths, light, noise, furniture, and the room&apos;s actual purpose are more relevant inputs than a birth chart alone.
            </p>
            <p>
              Start with observable Form School questions: Can people enter and move comfortably? Is the main seat supported? Does the layout fit the work or rest expected there? Only then add compass or timing formulas whose school and measurements are declared. <cite>Martin Palmer&apos;s T&apos;ung Shu</cite> provides useful almanac context, but calendar customs are not a substitute for observing the site. Read the <Link href="/feng-shui" className={linkClass}>Feng Shui hub</Link> before buying symbolic cures.
            </p>
          </>
        ),
      },
      {
        heading: "Choose the Chinese zodiac as an entry layer",
        content: (
          <>
            <p>
              Choose the <TermLink term="Chinese Zodiac">Chinese Zodiac</TermLink> when you want the cultural symbolism of a birth-year Earthly Branch or a simple introduction to the 12-year cycle. Check the Lunar New Year boundary before assigning an animal to a January or February birth. Then add the Heavenly Stem and element-year pairing instead of treating every Dragon, Rat, or Tiger year as identical.
            </p>
            <p>
              The zodiac is accessible, but it is intentionally broad. <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> can help check cultural associations, while the <Link href="/chinese-zodiac" className={linkClass}>Chinese Zodiac hub</Link> connects animals back to the branches. Use Bazi when you need month, day, hour, Day Master, or timing detail; do not ask year-sign compatibility to decide a relationship.
            </p>
          </>
        ),
      },
      {
        heading: "Let missing data change the choice",
        content: (
          <>
            <p>
              A reliable birth date with no birth hour can still support limited calendar and Bazi study, but the hour pillar is missing and some boundary cases require location or time-zone care. Ziwei is often more sensitive to the birth hour. State the uncertainty rather than guessing an hour from personality descriptions. If the date itself is approximate, avoid a precise natal chart.
            </p>
            <p>
              I Ching does not repair missing birth data; it answers a different kind of present question. Feng Shui does not require birth data to begin with form and function, but advanced schools may add occupant or timing information. Zodiac basics need only a correctly bounded birth year. The easiest available input is not always the best method, but it should limit what you claim.
            </p>
            <p>
              Use one system long enough to learn its grammar before combining methods. Keep a note of inputs, calculation conventions, source, interpretation, and uncertainty. Compare systems only after each has produced its own answer; otherwise shared words such as “element,” “palace,” or “energy” can conceal different rules.
            </p>
          </>
        ),
      },
      {
        heading: "Run a small learning experiment before committing",
        content: (
          <>
            <p>
              Spend one week on the shared vocabulary: yin-yang, Five Elements, stems, branches, and calendar boundaries. In week two, choose one system and complete one bounded exercise. Build and annotate one Bazi chart; cast and journal one I Ching question; map one room&apos;s movement and support; label one Ziwei chart without predicting; or research one zodiac branch using two sources.
            </p>
            <p>
              At the end, ask three questions: Can I reproduce the input and structure? Can I explain where the interpretation comes from? Did the method help me describe tradeoffs without removing agency? If the answer is no, review the <Link href="/learn/resources" className={linkClass}>source evaluation guide</Link> before buying a longer course or adding another system.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Should I learn Bazi or Ziwei Doushu first?",
        answer:
          "Learn Bazi first if you want a smaller core vocabulary and a chart organized around four pillars, the Day Master, elements, and relationship roles. Choose Ziwei first if you specifically want twelve palaces and star-based life-area detail. Both benefit from an accurate birth time, but Ziwei is usually less forgiving when the hour is uncertain.",
      },
      {
        question: "Which Chinese metaphysics system is easiest for beginners?",
        answer:
          "The Chinese zodiac is the easiest cultural entry point, but it gives the broadest answer. I Ching can be started without birth data, yet careful question framing and line interpretation take practice. Bazi offers a structured next step after calendar basics. Easy access should not be confused with shallow or guaranteed interpretation.",
      },
      {
        question: "What should I use if I do not know my birth time?",
        answer:
          "Use zodiac and calendar basics, begin a limited Bazi study that explicitly omits the hour pillar, ask one present question with I Ching, or study the observable form of a real space through Feng Shui. Do not invent a birth hour to make a precise Bazi or Ziwei chart appear complete.",
      },
      {
        question: "Can I study Bazi, I Ching, Feng Shui, and Ziwei together?",
        answer:
          "Yes, but learn them sequentially. Give each method its own question, inputs, calculation rules, source notes, and output. Compare the finished answers afterward. Mixing vocabulary before learning each grammar makes similarities look stronger than they are and makes errors difficult to trace.",
      },
    ],
    relatedLinks: systemRelatedLinks,
    cta: {
      title: "Verify the next source you use",
      description: "After choosing a system, learn how to compare primary texts, translations, reference data, teachers, communities, and calculators.",
      href: "/learn/resources",
      label: "Open the source guide",
    },
  }),
  buildPage({
    slug: "resources",
    path: "/learn/resources",
    title: "Chinese Metaphysics Books & Source Evaluation Guide",
    description: "A curated beginner source guide for Bazi, I Ching, Chinese calendars, translations, courses, communities, and calculator verification.",
    entityName: "Chinese Metaphysics Books and Source Evaluation",
    entityType: "Article",
    subtitle: "A practical method for choosing books, translations, teachers, communities, and tools without mistaking confidence for evidence.",
    directAnswer:
      "The best Chinese metaphysics resources identify the system, define translated terms, cite primary texts or stable reference tables, show a worked example, and state where interpretation begins. Start with a calendar reference, a primary source such as the Zhouyi or Yuan Hai Zi Ping, and a modern commentary; compare at least two sources before accepting a predictive or historical claim.",
    breadcrumbs: breadcrumbs("Resources", "/learn/resources"),
    schema: { headline: "", description: "", url: "", datePublished: "2026-01-25", dateModified: "2026-08-07" },
    stats: [
      { value: "4", label: "Source layers", description: "Primary text, translation, reference data, and explanation." },
      { value: "5", label: "Verification steps", description: "Trace a claim before using it in interpretation." },
      { value: "2+", label: "Sources per claim", description: "Compare wording, context, and limits before concluding." },
    ],
    citations: [
      {
        label: "Hong Kong Observatory Chinese calendar conversion tables",
        source: "A stable public reference for Gregorian, lunar, stem-branch, and solar-term calendar data.",
        url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
      },
      { label: "Yuan Hai Zi Ping (渊海子平)", source: "An early foundational text in the Four Pillars / Zi Ping textual tradition." },
      { label: "San Ming Tong Hui (三命通会)", source: "A Ming-dynasty compilation preserving terminology and methods from multiple fate-calculation traditions." },
      { label: "Zhouyi (周易 / I Ching)", source: "The received Changes text containing the 64 hexagram statements and line texts." },
      { label: "Alfred Huang, The Complete I Ching", source: "A modern English translation and commentary that identifies its interpretive choices." },
      { label: "Martin Palmer, T'ung Shu: The Ancient Chinese Almanac", source: "A secondary reference for calendar customs, almanac concepts, and cultural context." },
      { label: "Wolfram Eberhard, A Dictionary of Chinese Symbols", source: "A cross-reference for cultural symbols and associations rather than a chart-reading manual." },
    ],
    sections: [
      {
        heading: "Use four source layers instead of one authority",
        content: (
          <>
            <p>
              Chinese metaphysics resources do different jobs. A <strong>primary text</strong> preserves historical wording; a translation or commentary explains one reading of that wording; a calendar table or calculation reference supplies reproducible data; and a modern guide connects the material to a beginner&apos;s question. A trustworthy article tells you which layer it is using instead of presenting every sentence as timeless doctrine.
            </p>
            <p>
              No layer is sufficient alone. A classical passage can be terse, copied through later editions, and difficult to apply without context. A modern explanation can be clear while silently combining schools. A calculator can produce consistent pillars while saying nothing about why an interpretation follows. Use the layers together: confirm the data, locate the vocabulary, compare explanations, and mark the point where interpretation begins.
            </p>
          </>
        ),
      },
      {
        heading: "A starter shelf by subject",
        content: (
          <>
            <p>
              For calendar foundations, begin with the <cite>Hong Kong Observatory Chinese calendar conversion tables</cite>. They provide stable year tables and conversion data that help check lunar dates, stem-branch labels, and solar terms. Use a reference like this for calculation facts; do not ask it to supply personality meanings it was never designed to explain.
            </p>
            <p>
              For <TermLink term="Bazi">Bazi</TermLink>, treat <cite>Yuan Hai Zi Ping (渊海子平)</cite> and <cite>San Ming Tong Hui (三命通会)</cite> as textual anchors, not quick beginner manuals. Read them alongside a clear guide to the <Link href="/bazi/heavenly-stems" className={linkClass}>Heavenly Stems</Link>, <Link href="/bazi/earthly-branches" className={linkClass}>Earthly Branches</Link>, <Link href="/bazi/ten-gods" className={linkClass}>Ten Gods</Link>, and seasonal strength. When two authors disagree, record the school, rule, and chart context rather than choosing the more dramatic answer.
            </p>
            <p>
              For <TermLink term="I Ching">I Ching</TermLink>, read the received <cite>Zhouyi (周易 / I Ching)</cite> before relying on a list of one-line hexagram keywords. A translation such as <cite>Alfred Huang&apos;s The Complete I Ching</cite> can help, but compare its wording with another translation and keep the hexagram statement, line text, and later commentary distinct. For broader cultural context, <cite>Martin Palmer&apos;s T&apos;ung Shu</cite> and <cite>Wolfram Eberhard&apos;s A Dictionary of Chinese Symbols</cite> are useful secondary references, not substitutes for system-specific rules.
            </p>
          </>
        ),
        stats: [{ value: "3", label: "Source roles", description: "Verify data, preserve text, and explain interpretation separately." }],
      },
      {
        heading: "A five-step claim verification workflow",
        content: (
          <>
            <p>
              Use the same short workflow for a book, video, course lesson, forum answer, or AI response. It is deliberately slower than accepting a polished explanation, but it creates notes you can reuse and correct.
            </p>
            <ol className="list-decimal space-y-3 pl-6">
              <li><strong>Name the system and claim.</strong> “Wood means growth” is too broad; ask whether the claim concerns Five Phase theory, a Bazi Day Master, seasonal qi, medicine, or symbolism.</li>
              <li><strong>Identify the source layer.</strong> Is the evidence a classical passage, a translator&apos;s note, a teacher&apos;s rule, a calendar table, or a modern analogy?</li>
              <li><strong>Locate the exact term.</strong> Record Chinese characters, pinyin, the quoted wording, chapter or hexagram, edition, translator, and URL or page number when available.</li>
              <li><strong>Compare an independent source.</strong> Check whether another edition or author agrees, narrows the rule, or assigns it to a different school.</li>
              <li><strong>Write the limit.</strong> Note what the source does not prove and which chart, date, question, or cultural context is required before applying it.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "How to evaluate translations and terminology",
        content: (
          <>
            <p>
              Translation choices are part of the interpretation. The character 氣 may appear as qi, energy, breath, influence, or material force; 用神 may be rendered as useful god, useful deity, or useful influence. None of those English labels explains the rule by itself. Keep the Chinese term beside the translation and ask how the author uses it in that specific system.
            </p>
            <p>
              Prefer translations that identify their base text or edition, distinguish original text from commentary, explain unusual choices, and preserve ambiguity where the source is ambiguous. Be cautious when a resource replaces every technical term with modern psychology: accessibility is helpful, but an analogy should not erase the calendar, line position, palace, season, or relationship that gives the term its technical meaning.
            </p>
          </>
        ),
      },
      {
        heading: "How to evaluate teachers, courses, and communities",
        content: (
          <>
            <p>
              A useful teacher shows a syllabus, names the school or lineage when it matters, demonstrates a rule on more than one example, and explains how errors are corrected. A useful community welcomes requests for definitions and sources. Neither needs to pretend that every tradition agrees. Disagreement becomes informative when participants can name the rule, source, and conditions behind it.
            </p>
            <p>
              Treat guaranteed outcomes, fear-based deadlines, secret-rule upsells, copied case studies, and refusal to show calculation steps as warning signs. Testimonials can describe a learner&apos;s experience, but they cannot verify a historical claim or prediction method. Before paying, review a sample lesson and ask whether the course separates calculation, interpretation, ethics, and cultural history.
            </p>
          </>
        ),
      },
      {
        heading: "Use calculators as reproducible tools, not authorities",
        content: (
          <>
            <p>
              A calculator should make its inputs and conventions visible: calendar date, time, time zone, boundary rules, solar-term handling, and any assumptions used when the birth hour is unknown. Re-enter one example in a second tool and compare the four pillars before interpreting them. If the outputs differ, investigate the boundary rule instead of averaging the readings.
            </p>
            <p>
              Use the <Link href="/tools/bazi-calculator" className={linkClass}>Bazi calculator</Link> to generate a chart, then verify its vocabulary with the <Link href="/bazi/what-is-bazi" className={linkClass}>Bazi overview</Link>. Use the <Link href="/tools/i-ching-oracle" className={linkClass}>I Ching oracle</Link> only after writing a single, open question and learning how primary and relating hexagrams are formed. Use the <Link href="/tools/zodiac-compatibility" className={linkClass}>zodiac compatibility tool</Link> as a branch-pattern reference, not a verdict on a relationship.
            </p>
          </>
        ),
      },
      {
        heading: "Build notes that remain useful when your view changes",
        content: (
          <>
            <p>
              For every important concept, record the Chinese term, pinyin, working translation, system, source, exact passage, your paraphrase, one example, and a confidence level. Separate quotation from summary and summary from your own inference. This makes it possible to update one layer without rewriting the entire subject from memory.
            </p>
            <p>
              End each note with a next check: compare another translation, test a calendar boundary, find a counterexample, or ask a teacher which school uses the rule. That habit turns a resource list into a research practice and keeps future explanations—human or AI-generated—traceable to evidence.
            </p>
          </>
        ),
      },
    ],
    faqs: [
      {
        question: "Which Chinese metaphysics book should a beginner read first?",
        answer:
          "Start with a clear overview of stems, branches, Five Elements, and the Chinese calendar, then choose a primary text that matches your system: the Zhouyi for I Ching or a guided introduction to the Zi Ping textual tradition for Bazi. A primary text alone is rarely the easiest first teacher, so pair it with a transparent modern commentary.",
      },
      {
        question: "How can I tell whether an I Ching or Bazi translation is reliable?",
        answer:
          "Look for the Chinese term or source text, the edition or translator, a distinction between original passage and commentary, and notes explaining difficult choices. Compare at least one passage with another translation. Reliability does not require identical wording; it requires enough transparency to see why the wording differs.",
      },
      {
        question: "How do I verify an online Chinese metaphysics claim?",
        answer:
          "Name the system, locate the exact term or rule, identify whether the evidence is primary text, commentary, calculation data, or analogy, and compare an independent source. Then state the conditions and limits. If the author cannot show where a rule comes from or when it applies, treat it as an unsupported interpretation.",
      },
      {
        question: "Can a calculator replace a source text or teacher?",
        answer:
          "No. A calculator can reproduce calendar or chart calculations when its conventions are clear, but it cannot establish the historical meaning of a term or prove that one interpretation follows. Use tools to verify inputs and structures, then use documented sources and worked examples to evaluate interpretation.",
      },
    ],
    relatedLinks: resourceRelatedLinks,
    cta: {
      title: "Use a tool after the guide",
      description: "Move from learning vocabulary into a structured calculator or oracle when you are ready to apply it.",
      href: "/tools",
      label: "Browse tools",
    },
  }),
];

export function getLearnPage(slug: string): LearnContentPage | undefined {
  return allLearnPages.find((page) => page.slug === slug);
}

export function getLearnStaticParams(): Array<{ slug?: string[] }> {
  return allLearnPages.map((page) => ({
    slug: page.slug ? page.slug.split("/") : undefined,
  }));
}
