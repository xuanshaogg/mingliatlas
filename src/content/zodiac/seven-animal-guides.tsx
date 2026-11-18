import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { formatLongDate, getZodiacYearDates } from "@/lib/zodiac/year-dates";
import { AgeTable } from "./horse-goat-guides";

// Hand-written guides for the seven animal pages that were still on the
// generic template (Ox, Rabbit, Snake, Monkey, Rooster, Dog, Pig). Added
// 2026-11-17 so all twelve signs can be indexed before the 2027 Lunar New Year
// search peak. Ages are given for 2027, the Fire Goat year that starts
// February 6, 2027, because that is what readers search for in this window.
// Dates, elements, and ages are computed (lunar-typescript), not hand-typed.

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

export const sevenAnimalDateModified = "2026-11-17";

const AGE_YEAR = 2027;

interface Guide {
  title: string;
  description: string;
  directAnswer: string;
  sections: KnowledgePageProps["sections"];
  faqs: FAQ[];
}

/** Birth years from oldest-first input, newest first, at or before AGE_YEAR. */
function pastYears(years: number[]): number[] {
  return years.filter((year) => year <= AGE_YEAR).sort((a, b) => b - a);
}

function d(year: number) {
  return getZodiacYearDates(year);
}

function span(year: number): string {
  return `${formatLongDate(d(year).lunarNewYear)} to ${formatLongDate(d(year).lastDay)}`;
}

/** "Fire (1937, 1997), Earth (1949, 2009), ..." in cycle order of first appearance. */
function elementYears(years: number[]): string {
  const groups = new Map<string, number[]>();
  for (const year of [...years].sort((a, b) => a - b)) {
    const element = d(year).element;
    groups.set(element, [...(groups.get(element) ?? []), year]);
  }
  return [...groups.entries()].map(([element, ys]) => `${element} (${ys.join(", ")})`).join(", ");
}

function ageAnswer(animal: string, years: number[]): string {
  const past = pastYears(years);
  return `People born in ${past.join(", ")} turn ${past.map((year) => AGE_YEAR - year).join(", ")} on their ${AGE_YEAR} birthday. Before the birthday they are one year younger. This is birthday-based age, not traditional nominal age (sui).`;
}

function ageTableBlock(id: string, animal: string, years: number[]) {
  return (
    <>
      <h3 id={`${id}-age-table`} className="scroll-mt-28">
        {animal} year age chart: ages reached in {AGE_YEAR}
      </h3>
      <p>
        Subtract the birth year from {AGE_YEAR} to find the age reached on the {AGE_YEAR} birthday;
        before the birthday, subtract one more.
      </p>
      <AgeTable id={`${id}-ages`} animal={animal} years={pastYears(years)} ageYear={AGE_YEAR} />
    </>
  );
}

function ageLink(id: string, animal: string) {
  return (
    <p>
      <a href={`#${id}-age-table`} className={linkClass}>
        Check {animal} birth years, element types, and ages in {AGE_YEAR}
      </a>{" "}
      in the table further down.
    </p>
  );
}

const branchesLink = (
  <Link href="/bazi/earthly-branches" className={linkClass}>
    Earthly Branch
  </Link>
);

const forecastLink = (
  <Link href="/chinese-zodiac/2027-forecast" className={linkClass}>
    2027 Chinese zodiac forecast
  </Link>
);

const baziLink = (
  <Link href="/tools/bazi-calculator" className={linkClass}>
    full Bazi chart
  </Link>
);

const compatLink = (
  <Link href="/blog/chinese-zodiac-compatibility-chart" className={linkClass}>
    compatibility chart
  </Link>
);

function animalLink(slug: string, label: string) {
  return (
    <Link href={`/chinese-zodiac/${slug}`} className={linkClass}>
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Ox (Chou 丑)

const OX_YEARS = [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021];

const ox: Guide = {
  title: "Year of the Ox: Years List, Ages & Why 2027 Is a Clash Year",
  description: `Ox years: 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021; next is 2033 (from ${formatLongDate(d(2033).lunarNewYear)}). Exact dates, elements, ages in 2027, and the Ox–Goat clash.`,
  directAnswer: `Ox years are 1937, 1949, 1961, 1973, 1985, 1997, 2009, and 2021; the next Year of the Ox is 2033, a Water Ox year starting ${formatLongDate(d(2033).lunarNewYear)}. The most recent, a Metal Ox (Xin-Chou, 辛丑) year, ran from ${span(2021)}. The Ox is the second sign and corresponds to the Chou (丑) Earthly Branch, Yin Earth at the end of winter.`,
  sections: [
    {
      heading: "Years of the Ox and the Chou branch",
      content: (
        <>
          <p>
            <strong>
              Ox years are 1937, 1949, 1961, 1973, 1985, 1997, 2009, and 2021, and the next is 2033.
            </strong>{" "}
            The 2021 Metal Ox year ran from {span(2021)}. Lunar New Year moves between late January
            and mid-February, so early-year birthdays need a date check: the 1985 Ox year did not
            start until {formatLongDate(d(1985).lunarNewYear)}, which makes most January and
            February 1985 births Rats.
          </p>
          {ageLink("ox", "Ox")}
          <p>
            In the {branchesLink} system the Ox is Chou (丑), the second branch. Chou marks the 1–3 am
            double hour, the north-northeast, and the last month of winter, which begins at the
            Minor Cold (小寒) solar term. It is cold, wet Yin Earth: soil that stores what the year
            has gathered before spring.
          </p>
        </>
      ),
    },
    {
      heading: "Ox elements and the 2027 Goat-year clash",
      content: (
        <>
          <p>
            Chou holds three hidden stems: Ji Earth (己), Gui Water (癸), and Xin Metal (辛). That mix
            is why the Ox is read as practical and resilient rather than fiery, and why it belongs
            to the Metal triad. Each Ox year adds a different Heavenly Stem, giving Fire Oxen (1937,
            1997), Earth Oxen (1949, 2009), Metal Oxen (1961, 2021), Water Oxen (1973, 2033), and
            Wood Oxen (1985).
          </p>
          <p>
            <strong>2027 is the Ox’s clash year.</strong> The Fire Goat year sits on Wei (未), the
            branch directly opposite Chou, a pattern almanacs call chong tai sui (冲太岁). It is the
            strongest of the traditional Tai Sui warnings and is usually read as a year of movement:
            job or home changes, renegotiated commitments, and a reason to avoid rushed decisions.
            In 2026 the Fire Horse year is a six-harm (Chou-Wu) year for the Ox. The {forecastLink}{" "}
            compares how all twelve signs meet the Goat year.
          </p>
          {ageTableBlock("ox", "Ox", OX_YEARS)}
        </>
      ),
      stats: [{ value: "Wei", label: "2027 clash branch", description: "Chou and Wei sit opposite each other." }],
    },
    {
      heading: "Ox personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Ox people as steady, patient, and dependable. Those
            traits follow from Chou’s stored Earth: slow to start, hard to move once committed, and
            more interested in finishing than in being seen. The hidden Xin Metal adds standards and
            precision.
          </p>
          <p>
            The Ox forms a six combination with the {animalLink("rat", "Rat")} (Zi-Chou) and a Metal
            triad with the {animalLink("snake", "Snake")} and {animalLink("rooster", "Rooster")}{" "}
            (Si-You-Chou). Its clash sign is the {animalLink("goat", "Goat")}, its six-harm partner is
            the {animalLink("horse", "Horse")}, and it shares the Chou-Xu-Wei punishment group with
            the Dog and Goat. These are calendar patterns, not verdicts; the {compatLink} lists them
            for every sign.
          </p>
          <p>
            Earth with hidden Metal and Water points toward work that rewards persistence: finance,
            engineering, agriculture, building, administration, and skilled trades. A {baziLink}{" "}
            shows whether Earth is actually strong in a given chart, which the year animal alone
            cannot.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Ox?",
      answer: `Ox years are ${OX_YEARS.join(", ")}, and the next is 2033. By element: ${elementYears([...OX_YEARS, 2033])}.`,
    },
    {
      question: "When is the next Year of the Ox?",
      answer: `The next Ox year is 2033, a Water Ox (Gui-Chou, 癸丑) year from ${span(2033)}. The most recent was the 2021 Metal Ox year.`,
    },
    {
      question: "Is 2027 a bad year for the Ox?",
      answer:
        "2027 is the Ox’s clash year: the Goat year branch Wei sits directly opposite the Ox branch Chou. Almanacs read that as a year of change and caution rather than guaranteed bad luck, and the effect depends on the full Bazi chart.",
    },
    {
      question: "How old are people born in an Ox year in 2027?",
      answer: ageAnswer("Ox", OX_YEARS),
    },
    {
      question: "If I was born in January 1985, am I an Ox or a Rat?",
      answer: `A Rat in the popular zodiac. The 1985 Ox year began on ${formatLongDate(d(1985).lunarNewYear)}, so earlier 1985 births belong to the 1984 Wood Rat year. Bazi charts that use Li Chun change the year pillar on ${formatLongDate(d(1985).liChun)} instead.`,
    },
    {
      question: "Which signs are most compatible with the Ox?",
      answer:
        "The Ox forms a six combination with the Rat and a Metal triad with the Snake and Rooster. Its clash sign is the Goat and its six-harm partner is the Horse. A full Bazi comparison uses all four pillars of both people.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Rabbit (Mao 卯)

const RABBIT_YEARS = [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023];

const rabbit: Guide = {
  title: "Year of the Rabbit: Years List, Ages, Traits & 2027 Outlook",
  description: `Rabbit years: 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023; next is 2035. Exact dates, elements, ages in 2027, and why the Goat year suits the Rabbit.`,
  directAnswer: `Rabbit years are 1939, 1951, 1963, 1975, 1987, 1999, 2011, and 2023; the next Year of the Rabbit is 2035, a Wood Rabbit year starting ${formatLongDate(d(2035).lunarNewYear)}. The most recent, a Water Rabbit (Gui-Mao, 癸卯) year, ran from ${span(2023)}. The Rabbit is the fourth sign and corresponds to the Mao (卯) Earthly Branch, pure Yin Wood in mid-spring.`,
  sections: [
    {
      heading: "Years of the Rabbit and the Mao branch",
      content: (
        <>
          <p>
            <strong>
              Rabbit years are 1939, 1951, 1963, 1975, 1987, 1999, 2011, and 2023, and the next is
              2035.
            </strong>{" "}
            The 2023 Water Rabbit year ran from {span(2023)}, and the{" "}
            {animalLink("dragon", "Year of the Dragon")} followed. The 2011 Rabbit year began early,
            on {formatLongDate(d(2011).lunarNewYear)}, while the 1999 year began late, on{" "}
            {formatLongDate(d(1999).lunarNewYear)}, so February birthdays in those years need a date
            check.
          </p>
          {ageLink("rabbit", "Rabbit")}
          <p>
            In the {branchesLink} system the Rabbit is Mao (卯), the fourth branch. Mao marks the 5–7
            am double hour, due east, and mid-spring, the month that begins at the Awakening of
            Insects (惊蛰). Mao holds a single hidden stem, Yi Wood (乙), which makes it one of the
            purest Wood signals in a chart: growing, flexible, and sensitive to its surroundings.
          </p>
        </>
      ),
    },
    {
      heading: "Rabbit or Cat? Elements and the 2027 outlook",
      content: (
        <>
          <p>
            In the Vietnamese zodiac the fourth sign is the Cat (Mão) rather than the Rabbit. The
            branch, years, and meanings are the same; only the animal label differs. Across a
            60-year cycle the Rabbit appears as Earth (1939, 1999), Metal (1951, 2011), Water (1963,
            2023), Wood (1975, 2035), and Fire (1987) versions.
          </p>
          <p>
            <strong>The 2027 Fire Goat year is one of the Rabbit’s easier years.</strong> Mao and Wei
            belong to the same Wood triad (Hai-Mao-Wei), so the annual branch supports rather than
            confronts the Rabbit. In 2026 the Fire Horse branch has no traditional pairing with Mao.
            The {forecastLink} has notes for every sign.
          </p>
          {ageTableBlock("rabbit", "Rabbit", RABBIT_YEARS)}
        </>
      ),
      stats: [{ value: "Wood", label: "2027 triad", description: "Pig, Rabbit, and Goat form a Wood frame." }],
    },
    {
      heading: "Rabbit personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Rabbit people as graceful, diplomatic, and observant.
            Those traits follow from Mao’s Yin Wood: it grows by finding space rather than forcing
            it, and it notices small changes early.
          </p>
          <p>
            The Rabbit forms a six combination with the {animalLink("dog", "Dog")} (Mao-Xu) and a Wood
            triad with the {animalLink("pig", "Pig")} and {animalLink("goat", "Goat")}. Its clash sign
            is the {animalLink("rooster", "Rooster")} (Mao-You), its six-harm partner is the{" "}
            {animalLink("dragon", "Dragon")}, and it forms the Zi-Mao punishment with the Rat. The{" "}
            {compatLink} compares all twelve signs.
          </p>
          <p>
            Wood associations point toward work that develops people or ideas: education, design,
            writing, counselling, healthcare, and diplomacy. A {baziLink} shows how much the Mao
            branch actually shapes a given chart.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Rabbit?",
      answer: `Rabbit years are ${RABBIT_YEARS.join(", ")}, and the next is 2035. By element: ${elementYears([...RABBIT_YEARS, 2035])}.`,
    },
    {
      question: "When is the next Year of the Rabbit?",
      answer: `The next Rabbit year is 2035, a Wood Rabbit (Yi-Mao, 乙卯) year from ${span(2035)}. The most recent was the 2023 Water Rabbit year.`,
    },
    {
      question: "Is 2027 a good year for the Rabbit?",
      answer:
        "Traditionally, yes. The Goat year branch Wei shares the Hai-Mao-Wei Wood triad with the Rabbit, a supportive pattern. How the year actually plays out depends on the full Bazi chart, not the year animal alone.",
    },
    {
      question: "How old are people born in a Rabbit year in 2027?",
      answer: ageAnswer("Rabbit", RABBIT_YEARS),
    },
    {
      question: "Is the Rabbit the same as the Cat in the zodiac?",
      answer:
        "Yes, in Vietnam. The Vietnamese zodiac uses the Cat for the fourth sign, Mao (卯). The years, branch, and meanings are identical to the Chinese Rabbit.",
    },
    {
      question: "Which signs are most compatible with the Rabbit?",
      answer:
        "The Rabbit forms a six combination with the Dog and a Wood triad with the Pig and Goat. Its clash sign is the Rooster and its six-harm partner is the Dragon. These are symbolic branch patterns, not a relationship verdict.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Snake (Si 巳)

const SNAKE_YEARS = [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025];

const snake: Guide = {
  title: "Year of the Snake: Years List (1941–2037), Ages & Traits",
  description: `2025 was the Wood Snake year (${formatLongDate(d(2025).lunarNewYear)} to ${formatLongDate(d(2025).lastDay)}). All Snake years 1941–2037 with dates, elements, ages in 2027, and compatibility.`,
  directAnswer: `Snake years are 1941, 1953, 1965, 1977, 1989, 2001, 2013, and 2025; the next Year of the Snake is 2037. The most recent, a Wood Snake (Yi-Si, 乙巳) year, ran from ${span(2025)}; the Fire Horse year followed. The Snake is the sixth sign and corresponds to the Si (巳) Earthly Branch, Fire at the start of summer.`,
  sections: [
    {
      heading: "Years of the Snake and the Si branch",
      content: (
        <>
          <p>
            <strong>
              Snake years are 1941, 1953, 1965, 1977, 1989, 2001, 2013, and 2025, and the next is
              2037.
            </strong>{" "}
            The 2025 Wood Snake year ran from {span(2025)}; the {animalLink("horse", "Fire Horse year")}{" "}
            started the next day. The next Snake year, a Fire Snake, begins on{" "}
            {formatLongDate(d(2037).lunarNewYear)}.
          </p>
          {ageLink("snake", "Snake")}
          <p>
            In the {branchesLink} system the Snake is Si (巳), the sixth branch. Si marks the 9–11 am
            double hour, the south-southeast, and the first month of summer, which begins at the
            Start of Summer (立夏) solar term. Its main hidden stem is Bing (丙), Yang Fire, so the
            Snake belongs to the Fire season even though popular writing often pictures it as cool.
          </p>
        </>
      ),
    },
    {
      heading: "Snake hidden stems, elements, and 2027",
      content: (
        <>
          <p>
            Si holds three hidden stems: Bing Fire (丙), Wu Earth (戊), and Geng Metal (庚). Metal is
            “born” in Si in the classical growth cycle, which is why the Snake anchors the Metal
            triad with the Rooster and Ox. Snake years cycle through Metal (1941, 2001), Water (1953,
            2013), Wood (1965, 2025), Fire (1977, 2037), and Earth (1989).
          </p>
          <p>
            <strong>2027 is a quiet year for the Snake.</strong> The Goat branch Wei has no six
            combination, clash, or harm with Si. Si, Wu, and Wei do form the southern Fire seasonal
            group (巳午未), so the 2026 Horse and 2027 Goat years complete a Fire set the Snake
            belongs to; many writers read that as a period of visibility. The {forecastLink} covers
            the other signs.
          </p>
          {ageTableBlock("snake", "Snake", SNAKE_YEARS)}
        </>
      ),
      stats: [{ value: "Bing", label: "Main hidden stem", description: "Yang Fire, the root of the Si branch." }],
    },
    {
      heading: "Snake personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Snake people as strategic, intuitive, and refined.
            Those traits fit Si’s mix of contained Fire and hidden Metal: warmth held back until the
            right moment, and a taste for precision.
          </p>
          <p>
            The Snake forms a six combination with the {animalLink("monkey", "Monkey")} (Si-Shen) and
            a Metal triad with the {animalLink("rooster", "Rooster")} and {animalLink("ox", "Ox")}. Its
            clash sign is the {animalLink("pig", "Pig")} (Si-Hai) and its six-harm partner is the{" "}
            {animalLink("tiger", "Tiger")}. Snake, Tiger, and Monkey also form the Yin-Si-Shen
            punishment group, so the Snake–Monkey pair both combines and punishes, a classic example
            of why the {compatLink} is only a starting point.
          </p>
          <p>
            Fire with hidden Metal points toward work that rewards insight and judgment: research,
            strategy, finance, law, medicine, and psychology. A {baziLink} shows whether the Si
            branch is a strength in a given chart.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Snake?",
      answer: `Snake years are ${SNAKE_YEARS.join(", ")}, and the next is 2037. By element: ${elementYears([...SNAKE_YEARS, 2037])}.`,
    },
    {
      question: "Was 2025 the Year of the Snake?",
      answer: `Yes. 2025 was the Year of the Wood Snake (Yi-Si, 乙巳), from ${span(2025)}. The Fire Horse year began on ${formatLongDate(d(2026).lunarNewYear)}.`,
    },
    {
      question: "When is the next Year of the Snake?",
      answer: `The next Snake year is 2037, a Fire Snake (Ding-Si, 丁巳) year from ${span(2037)}.`,
    },
    {
      question: "How old are people born in a Snake year in 2027?",
      answer: ageAnswer("Snake", SNAKE_YEARS),
    },
    {
      question: "Is 2027 a good year for the Snake?",
      answer:
        "It is neutral in traditional terms: the Goat branch Wei has no combination, clash, or harm with the Snake branch Si. Si, Wu, and Wei form the southern Fire seasonal group, which many writers read as a supportive backdrop.",
    },
    {
      question: "Which signs are most compatible with the Snake?",
      answer:
        "The Snake forms a six combination with the Monkey and a Metal triad with the Rooster and Ox. Its clash sign is the Pig and its six-harm partner is the Tiger. A full Bazi comparison uses all four pillars.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Monkey (Shen 申)

const MONKEY_YEARS = [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016];

const monkey: Guide = {
  title: "Year of the Monkey: Years List & Next Monkey Year (2028)",
  description: `The next Year of the Monkey is 2028, an Earth Monkey year from ${formatLongDate(d(2028).lunarNewYear)}. All Monkey years 1932–2028 with dates, elements, ages in 2027, and compatibility.`,
  directAnswer: `Monkey years are 1932, 1944, 1956, 1968, 1980, 1992, 2004, and 2016; the next Year of the Monkey is 2028, an Earth Monkey (Wu-Shen, 戊申) year running from ${span(2028)}. The most recent was the 2016 Fire Monkey year. The Monkey is the ninth sign and corresponds to the Shen (申) Earthly Branch, Yang Metal at the start of autumn.`,
  sections: [
    {
      heading: "Years of the Monkey and the Shen branch",
      content: (
        <>
          <p>
            <strong>
              Monkey years are 1932, 1944, 1956, 1968, 1980, 1992, 2004, and 2016, and the next is
              2028.
            </strong>{" "}
            The 2028 Earth Monkey year begins on {formatLongDate(d(2028).lunarNewYear)}, right after
            the 2027 {animalLink("goat", "Fire Goat year")}. The last Monkey year ran from{" "}
            {span(2016)}.
          </p>
          {ageLink("monkey", "Monkey")}
          <p>
            In the {branchesLink} system the Monkey is Shen (申), the ninth branch. Shen marks the 3–5
            pm double hour, the west-southwest, and the first month of autumn, which begins at the
            Start of Autumn (立秋) solar term. It is Yang Metal: the season when growth stops and
            harvest begins.
          </p>
        </>
      ),
    },
    {
      heading: "Monkey elements, 2027, and the 2028 Earth Monkey",
      content: (
        <>
          <p>
            Shen holds three hidden stems: Geng Metal (庚), Ren Water (壬), and Wu Earth (戊). Water is
            “born” in Shen in the classical growth cycle, which is why the Monkey anchors the Water
            triad with the Rat and Dragon. Monkey years cycle through Water (1932, 1992), Wood (1944,
            2004), Fire (1956, 2016), Earth (1968, 2028), and Metal (1980).
          </p>
          <p>
            <strong>2027 is a neutral year for the Monkey.</strong> The Goat branch Wei has no
            traditional pair with Shen, so the year is usually read as a run-up to the Monkey’s own
            year. 2028 is a <em>ben ming nian</em> (本命年) for every Monkey, traditionally met with
            red clothing or accessories. The {forecastLink} covers all twelve signs.
          </p>
          {ageTableBlock("monkey", "Monkey", MONKEY_YEARS)}
        </>
      ),
      stats: [
        { value: "2028", label: "Next Monkey year", description: `Starts ${formatLongDate(d(2028).lunarNewYear)}.` },
      ],
    },
    {
      heading: "Monkey personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Monkey people as inventive, witty, and versatile. Those
            traits fit Shen’s Metal sharpened by hidden Water: quick to analyse, quick to adapt, and
            restless with routine.
          </p>
          <p>
            The Monkey forms a six combination with the {animalLink("snake", "Snake")} (Si-Shen) and a
            Water triad with the {animalLink("rat", "Rat")} and {animalLink("dragon", "Dragon")}. Its
            clash sign is the {animalLink("tiger", "Tiger")} (Yin-Shen) and its six-harm partner is
            the {animalLink("pig", "Pig")}. It also sits in the Yin-Si-Shen punishment group with the
            Tiger and Snake. The {compatLink} shows these patterns for every sign.
          </p>
          <p>
            Metal and Water point toward work that rewards problem-solving: engineering, technology,
            trading, negotiation, entertainment, and anything that changes quickly. A {baziLink}{" "}
            shows how strong Metal really is in a given chart.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Monkey?",
      answer: `Monkey years are ${MONKEY_YEARS.join(", ")}, and the next is 2028. By element: ${elementYears([...MONKEY_YEARS, 2028])}.`,
    },
    {
      question: "When is the next Year of the Monkey?",
      answer: `The next Monkey year is 2028, an Earth Monkey (Wu-Shen, 戊申) year from ${span(2028)}. It follows the 2027 Fire Goat year.`,
    },
    {
      question: "How old are people born in a Monkey year in 2027?",
      answer: ageAnswer("Monkey", MONKEY_YEARS),
    },
    {
      question: "Is 2027 a good year for the Monkey?",
      answer:
        "It is neutral in traditional terms: the Goat branch Wei has no combination, clash, or harm with the Monkey branch Shen. The Monkey’s own year, 2028, follows straight after.",
    },
    {
      question: "If I was born in January 2004, am I a Monkey or a Goat?",
      answer: `It depends on the date. The 2004 Monkey year began on ${formatLongDate(d(2004).lunarNewYear)}; births from January 1 to ${formatLongDate(d(2003).lastDay)} belong to the 2003 Goat year. Bazi charts that use Li Chun change the year pillar on ${formatLongDate(d(2004).liChun)} instead.`,
    },
    {
      question: "Which signs are most compatible with the Monkey?",
      answer:
        "The Monkey forms a six combination with the Snake and a Water triad with the Rat and Dragon. Its clash sign is the Tiger and its six-harm partner is the Pig. These are symbolic branch patterns, not a relationship verdict.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Rooster (You 酉)

const ROOSTER_YEARS = [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017];

const rooster: Guide = {
  title: "Year of the Rooster: Years List, Ages & Next Year (2029)",
  description: `Rooster years: 1945, 1957, 1969, 1981, 1993, 2005, 2017; next is 2029 (from ${formatLongDate(d(2029).lunarNewYear)}). Exact dates, elements, ages in 2027, and compatibility.`,
  directAnswer: `Rooster years are 1933, 1945, 1957, 1969, 1981, 1993, 2005, and 2017; the next Year of the Rooster is 2029, an Earth Rooster year starting ${formatLongDate(d(2029).lunarNewYear)}. The most recent, a Fire Rooster (Ding-You, 丁酉) year, ran from ${span(2017)}. The Rooster is the tenth sign and corresponds to the You (酉) Earthly Branch, pure Yin Metal in mid-autumn.`,
  sections: [
    {
      heading: "Years of the Rooster and the You branch",
      content: (
        <>
          <p>
            <strong>
              Rooster years are 1933, 1945, 1957, 1969, 1981, 1993, 2005, and 2017, and the next is
              2029.
            </strong>{" "}
            The 2017 Fire Rooster year ran from {span(2017)}, so January 2017 births before{" "}
            {formatLongDate(d(2017).lunarNewYear)} are Monkeys. The next Rooster year follows the
            2028 {animalLink("monkey", "Earth Monkey year")}.
          </p>
          {ageLink("rooster", "Rooster")}
          <p>
            In the {branchesLink} system the Rooster is You (酉), the tenth branch. You marks the 5–7
            pm double hour, due west, and mid-autumn, the month that begins at the White Dew (白露)
            solar term. It holds a single hidden stem, Xin Metal (辛): refined metal, like jewellery
            or a blade, rather than raw ore.
          </p>
        </>
      ),
    },
    {
      heading: "Rooster elements and the 2027 outlook",
      content: (
        <>
          <p>
            Because You is pure Xin Metal, the Rooster is the strongest Metal signal among the
            twelve branches and the centre of the Metal triad with the Snake and Ox. Rooster years
            cycle through Water (1933, 1993), Wood (1945, 2005), Fire (1957, 2017), Earth (1969,
            2029), and Metal (1981).
          </p>
          <p>
            <strong>2027 is a steady year for the Rooster.</strong> The Goat branch Wei has no
            traditional pair with You, and in the Five Element cycle Wei’s Earth produces Metal, so
            many writers read the year as quietly supportive. You also meets itself in a
            self-punishment (酉酉自刑), which matters most in a Rooster’s own year, 2029. The{" "}
            {forecastLink} has notes for every sign.
          </p>
          {ageTableBlock("rooster", "Rooster", ROOSTER_YEARS)}
        </>
      ),
      stats: [{ value: "Xin", label: "Only hidden stem", description: "Yin Metal, refined and precise." }],
    },
    {
      heading: "Rooster personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Rooster people as precise, honest, and disciplined.
            Those traits follow from pure Xin Metal: it cuts cleanly, holds a standard, and is
            uncomfortable with vagueness.
          </p>
          <p>
            The Rooster forms a six combination with the {animalLink("dragon", "Dragon")} (Chen-You)
            and a Metal triad with the {animalLink("snake", "Snake")} and {animalLink("ox", "Ox")}. Its
            clash sign is the {animalLink("rabbit", "Rabbit")} (Mao-You) and its six-harm partner is
            the {animalLink("dog", "Dog")}. The {compatLink} lists the same patterns for every sign.
          </p>
          <p>
            Metal associations point toward work that rewards accuracy: accounting, editing, quality
            control, surgery, jewellery and design, and uniformed services. A {baziLink} shows
            whether that Metal is balanced in a given chart.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Rooster?",
      answer: `Rooster years are ${ROOSTER_YEARS.join(", ")}, and the next is 2029. By element: ${elementYears([...ROOSTER_YEARS, 2029])}.`,
    },
    {
      question: "When is the next Year of the Rooster?",
      answer: `The next Rooster year is 2029, an Earth Rooster (Ji-You, 己酉) year from ${span(2029)}. The most recent was the 2017 Fire Rooster year.`,
    },
    {
      question: "How old are people born in a Rooster year in 2027?",
      answer: ageAnswer("Rooster", ROOSTER_YEARS),
    },
    {
      question: "Is 2027 a good year for the Rooster?",
      answer:
        "Traditionally it is steady: the Goat branch Wei has no clash or harm with the Rooster branch You, and Earth produces Metal in the Five Element cycle. The full Bazi chart decides how the year actually reads.",
    },
    {
      question: "If I was born in January 2017, am I a Rooster or a Monkey?",
      answer: `It depends on the date. The 2017 Rooster year began on ${formatLongDate(d(2017).lunarNewYear)}; births from January 1 to ${formatLongDate(d(2016).lastDay)} belong to the 2016 Fire Monkey year.`,
    },
    {
      question: "Which signs are most compatible with the Rooster?",
      answer:
        "The Rooster forms a six combination with the Dragon and a Metal triad with the Snake and Ox. Its clash sign is the Rabbit and its six-harm partner is the Dog. A full Bazi comparison uses all four pillars.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Dog (Xu 戌)

const DOG_YEARS = [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018];

const dog: Guide = {
  title: "Year of the Dog: Years List, Ages, Traits & 2027 Outlook",
  description: `Dog years: 1946, 1958, 1970, 1982, 1994, 2006, 2018; next is 2030 (from ${formatLongDate(d(2030).lunarNewYear)}). Exact dates, elements, ages in 2027, and the Goat-year punishment.`,
  directAnswer: `Dog years are 1934, 1946, 1958, 1970, 1982, 1994, 2006, and 2018; the next Year of the Dog is 2030, a Metal Dog year starting ${formatLongDate(d(2030).lunarNewYear)}. The most recent, an Earth Dog (Wu-Xu, 戊戌) year, ran from ${span(2018)}. The Dog is the eleventh sign and corresponds to the Xu (戌) Earthly Branch, Yang Earth in late autumn.`,
  sections: [
    {
      heading: "Years of the Dog and the Xu branch",
      content: (
        <>
          <p>
            <strong>
              Dog years are 1934, 1946, 1958, 1970, 1982, 1994, 2006, and 2018, and the next is 2030.
            </strong>{" "}
            The 2018 Earth Dog year ran from {span(2018)}. The 2030 Metal Dog year begins on{" "}
            {formatLongDate(d(2030).lunarNewYear)}, the day after the 2029{" "}
            {animalLink("rooster", "Rooster year")} ends.
          </p>
          {ageLink("dog", "Dog")}
          <p>
            In the {branchesLink} system the Dog is Xu (戌), the eleventh branch. Xu marks the 7–9 pm
            double hour, the west-northwest, and the last month of autumn, which begins at the Cold
            Dew (寒露) solar term. It is dry Yang Earth, the “storehouse” of Fire, where summer’s heat
            is banked for winter.
          </p>
        </>
      ),
    },
    {
      heading: "Dog elements, 2026, and the 2027 punishment",
      content: (
        <>
          <p>
            Xu holds three hidden stems: Wu Earth (戊), Xin Metal (辛), and Ding Fire (丁). The stored
            Fire is why the Dog closes the Fire triad with the Tiger and Horse. Dog years cycle
            through Wood (1934, 1994), Fire (1946, 2006), Earth (1958, 2018), Metal (1970, 2030), and
            Water (1982).
          </p>
          <p>
            <strong>2026 favours the Dog; 2027 asks for more care.</strong> The 2026 Fire Horse year
            shares the Dog’s Fire triad. In 2027 the Goat branch Wei completes the Chou-Xu-Wei
            punishment group with the Dog, which almanacs list as xing tai sui (刑太岁). It is read as
            a caution about contracts, disputes, and paperwork rather than a bad-luck sentence. The{" "}
            {forecastLink} explains how each sign meets the Goat year.
          </p>
          {ageTableBlock("dog", "Dog", DOG_YEARS)}
        </>
      ),
      stats: [{ value: "Fire", label: "Triad element", description: "Tiger, Horse, and Dog form a Fire frame." }],
    },
    {
      heading: "Dog personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Dog people as loyal, fair-minded, and protective. Those
            traits fit Xu’s role as a guarded storehouse: it keeps what it is trusted with, and the
            hidden Xin Metal adds a strong sense of right and wrong.
          </p>
          <p>
            The Dog forms a six combination with the {animalLink("rabbit", "Rabbit")} (Mao-Xu) and a
            Fire triad with the {animalLink("tiger", "Tiger")} and {animalLink("horse", "Horse")}. Its
            clash sign is the {animalLink("dragon", "Dragon")} (Chen-Xu) and its six-harm partner is
            the {animalLink("rooster", "Rooster")}. The {compatLink} shows how each pair is read.
          </p>
          <p>
            Earth with hidden Metal and Fire points toward work that protects people or standards:
            law, security, social work, human resources, nonprofits, and construction. A {baziLink}{" "}
            shows how much the Xu branch matters for a given person.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Dog?",
      answer: `Dog years are ${DOG_YEARS.join(", ")}, and the next is 2030. By element: ${elementYears([...DOG_YEARS, 2030])}.`,
    },
    {
      question: "When is the next Year of the Dog?",
      answer: `The next Dog year is 2030, a Metal Dog (Geng-Xu, 庚戌) year from ${span(2030)}. The most recent was the 2018 Earth Dog year.`,
    },
    {
      question: "How old are people born in a Dog year in 2027?",
      answer: ageAnswer("Dog", DOG_YEARS),
    },
    {
      question: "Is 2027 a bad year for the Dog?",
      answer:
        "Almanacs list the Dog among the signs that offend Tai Sui in 2027, because Xu, Chou, and Wei form a punishment group. It is usually read as a reason to be careful with contracts and disputes, not as bad luck, and the full Bazi chart matters more.",
    },
    {
      question: "Is 2026 a good year for the Dog?",
      answer:
        "Traditionally, yes. The 2026 Fire Horse branch Wu shares the Yin-Wu-Xu Fire triad with the Dog, one of the most supportive annual patterns.",
    },
    {
      question: "Which signs are most compatible with the Dog?",
      answer:
        "The Dog forms a six combination with the Rabbit and a Fire triad with the Tiger and Horse. Its clash sign is the Dragon and its six-harm partner is the Rooster. These are symbolic branch patterns, not a relationship verdict.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Pig (Hai 亥)

const PIG_YEARS = [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019];

const pig: Guide = {
  title: "Year of the Pig (Boar): Years List, Ages & 2027 Outlook",
  description: `Pig years: 1947, 1959, 1971, 1983, 1995, 2007, 2019; next is 2031 (from ${formatLongDate(d(2031).lunarNewYear)}). Exact dates, elements, ages in 2027, and compatibility.`,
  directAnswer: `Pig years are 1935, 1947, 1959, 1971, 1983, 1995, 2007, and 2019; the next Year of the Pig is 2031, a Metal Pig year starting ${formatLongDate(d(2031).lunarNewYear)}. The most recent, an Earth Pig (Ji-Hai, 己亥) year, ran from ${span(2019)}. The Pig, also called the Boar, is the twelfth sign and corresponds to the Hai (亥) Earthly Branch, Water at the start of winter.`,
  sections: [
    {
      heading: "Years of the Pig and the Hai branch",
      content: (
        <>
          <p>
            <strong>
              Pig years are 1935, 1947, 1959, 1971, 1983, 1995, 2007, and 2019, and the next is 2031.
            </strong>{" "}
            The 2019 Earth Pig year ran from {span(2019)}, and the {animalLink("rat", "Rat")} began a
            new 12-year cycle the next day. The 2007 Pig year started late, on{" "}
            {formatLongDate(d(2007).lunarNewYear)}, so most January and February 2007 births are Dogs.
          </p>
          {ageLink("pig", "Pig")}
          <p>
            In the {branchesLink} system the Pig is Hai (亥), the twelfth and last branch. Hai marks the
            9–11 pm double hour, the north-northwest, and the first month of winter, which begins at
            the Start of Winter (立冬) solar term. Its main hidden stem is Ren (壬), Yang Water: deep,
            wide water at the close of the year.
          </p>
        </>
      ),
    },
    {
      heading: "Pig or Boar? Elements and the 2027 outlook",
      content: (
        <>
          <p>
            The character 亥 is usually translated Pig, while Japanese tradition pictures the sign as
            a wild boar (inoshishi), so both names appear in English. Hai holds two hidden stems,
            Ren Water (壬) and Jia Wood (甲); Wood is “born” in Hai, which is why the Pig opens the
            Wood triad with the Rabbit and Goat. Pig years cycle through Wood (1935, 1995), Fire
            (1947, 2007), Earth (1959, 2019), Metal (1971, 2031), and Water (1983).
          </p>
          <p>
            <strong>The 2027 Fire Goat year is supportive for the Pig.</strong> Hai and Wei belong to
            the same Hai-Mao-Wei Wood triad. In 2026 the Fire Horse branch has no traditional pair
            with Hai. The {forecastLink} has notes for every sign.
          </p>
          {ageTableBlock("pig", "Pig", PIG_YEARS)}
        </>
      ),
      stats: [{ value: "Ren", label: "Main hidden stem", description: "Yang Water, the root of the Hai branch." }],
    },
    {
      heading: "Pig personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Pig people as generous, sincere, and comfort-seeking.
            Those traits fit Hai’s broad Water nourishing hidden Wood: it gives freely, avoids
            conflict, and values enjoyment and ease.
          </p>
          <p>
            The Pig forms a six combination with the {animalLink("tiger", "Tiger")} (Yin-Hai) and a
            Wood triad with the {animalLink("rabbit", "Rabbit")} and {animalLink("goat", "Goat")}. Its
            clash sign is the {animalLink("snake", "Snake")} (Si-Hai) and its six-harm partner is the{" "}
            {animalLink("monkey", "Monkey")}. Hai also meets itself in a self-punishment (亥亥自刑). The{" "}
            {compatLink} compares every sign.
          </p>
          <p>
            Water feeding Wood points toward work that nurtures and connects: hospitality, food,
            healthcare, the arts, charity, and trade. A {baziLink} shows how strong Water actually is
            in a given chart.
          </p>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "What years are Year of the Pig?",
      answer: `Pig years are ${PIG_YEARS.join(", ")}, and the next is 2031. By element: ${elementYears([...PIG_YEARS, 2031])}.`,
    },
    {
      question: "When is the next Year of the Pig?",
      answer: `The next Pig year is 2031, a Metal Pig (Xin-Hai, 辛亥) year from ${span(2031)}. The most recent was the 2019 Earth Pig year.`,
    },
    {
      question: "How old are people born in a Pig year in 2027?",
      answer: ageAnswer("Pig", PIG_YEARS),
    },
    {
      question: "Is 2027 a good year for the Pig?",
      answer:
        "Traditionally, yes. The Goat year branch Wei shares the Hai-Mao-Wei Wood triad with the Pig, a supportive pattern. The full Bazi chart decides how the year actually reads.",
    },
    {
      question: "Is the Year of the Pig the same as the Year of the Boar?",
      answer:
        "Yes. Both translate 亥 (Hai), the twelfth branch. Pig is the usual Chinese reading; Boar follows the Japanese tradition of the wild boar. The years and meanings are the same.",
    },
    {
      question: "Which signs are most compatible with the Pig?",
      answer:
        "The Pig forms a six combination with the Tiger and a Wood triad with the Rabbit and Goat. Its clash sign is the Snake and its six-harm partner is the Monkey. A full Bazi comparison uses all four pillars.",
    },
  ],
};

// ---------------------------------------------------------------------------

const guides: Record<string, Guide> = { ox, rabbit, snake, monkey, rooster, dog, pig };

function pick<K extends keyof Guide>(key: K): Record<string, Guide[K]> {
  return Object.fromEntries(Object.entries(guides).map(([slug, guide]) => [slug, guide[key]]));
}

export const SEVEN_ANIMAL_SLUGS = Object.keys(guides);
export const sevenAnimalTitleOverrides = pick("title");
export const sevenAnimalDescriptionOverrides = pick("description");
export const sevenAnimalDirectAnswerOverrides = pick("directAnswer");
export const sevenAnimalSections = pick("sections");
export const sevenAnimalFaqs = pick("faqs");
