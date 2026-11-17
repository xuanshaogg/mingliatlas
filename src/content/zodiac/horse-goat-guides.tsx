import Link from "next/link";
import type { KnowledgePageProps } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";
import { formatLongDate, getZodiacYearDates } from "@/lib/zodiac/year-dates";

// Hand-written guides for the current zodiac year (2026, Fire Horse) and the
// next one (2027, Fire Goat). Added 2026-11-17 so both pages can be indexed
// before Lunar New Year search demand peaks (December to February), following
// the Dragon page pattern that earns most of the site's search impressions.

const linkClass = "text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

const horse2026 = getZodiacYearDates(2026);
const goat2027 = getZodiacYearDates(2027);
const goat2015 = getZodiacYearDates(2015);

const HORSE_YEARS = [2026, 2014, 2002, 1990, 1978, 1966, 1954, 1942];
const GOAT_YEARS = [2027, 2015, 2003, 1991, 1979, 1967, 1955, 1943];

function AgeTable({
  id,
  animal,
  years,
  ageYear,
}: {
  id: string;
  animal: string;
  years: number[];
  ageYear: number;
}) {
  return (
    <div className="overflow-x-auto" role="region" aria-label={`${animal} birth years and ages in ${ageYear}`} tabIndex={0}>
      <table id={id} className="w-full border-collapse text-sm">
        <caption className="text-left">
          {animal} birth year, element, and age reached on the {ageYear} birthday
        </caption>
        <thead>
          <tr>
            <th scope="col" className="py-2 text-left">Birth year</th>
            <th scope="col" className="py-2 text-left">Element type</th>
            <th scope="col" className="py-2 text-left">Turns in {ageYear}</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => {
            const dates = getZodiacYearDates(year);
            return (
              <tr key={year} className="border-ink-200 border-b dark:border-white/10">
                <th scope="row" className="py-2 text-left font-normal">{year}</th>
                <td className="py-2">
                  {dates.element} {animal} ({dates.pinyin}, {dates.ganZhi})
                </td>
                <td className="py-2">{year > ageYear ? "Not yet born" : ageYear - year}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const horseGoatTitleOverrides: Record<string, string> = {
  horse: "Year of the Horse: 2026 Fire Horse Dates, Years List & Ages",
  goat: "Year of the Goat (Sheep) 2027: Dates, Years List & Ages",
};

export const horseGoatDescriptionOverrides: Record<string, string> = {
  horse: `2026 is the Year of the Fire Horse, from ${formatLongDate(horse2026.lunarNewYear)} to ${formatLongDate(horse2026.lastDay)}. All Horse years 1942–2038, element types, ages, and compatibility.`,
  goat: `The next Year of the Goat (also called Sheep or Ram) starts ${formatLongDate(goat2027.lunarNewYear)}: a Fire Goat year. All Goat years 1943–2039 with dates, elements, and ages.`,
};

export const horseGoatDirectAnswerOverrides: Record<string, string> = {
  horse: `2026 is the Year of the Fire Horse (Bing-Wu, 丙午). It began on ${formatLongDate(horse2026.lunarNewYear)} and ends on ${formatLongDate(horse2026.lastDay)}. Horse years are 1942, 1954, 1966, 1978, 1990, 2002, 2014, and 2026; the next is 2038. The Horse is the seventh sign and corresponds to the Wu (午) Earthly Branch, Yang Fire at midsummer.`,
  goat: `The next Year of the Goat is 2027, a Fire Goat (Ding-Wei, 丁未) year running from ${formatLongDate(goat2027.lunarNewYear)} to ${formatLongDate(goat2027.lastDay)}. Goat years are 1943, 1955, 1967, 1979, 1991, 2003, 2015, and 2027. Goat, Sheep, and Ram all translate the same sign, 羊, which corresponds to the Wei (未) Earthly Branch.`,
};

export const horseGoatDateModified = "2026-11-17";

export const horseGoatSections: Record<string, KnowledgePageProps["sections"]> = {
  horse: [
    {
      heading: "Years of the Horse and the Wu branch",
      content: (
        <>
          <p>
            <strong>
              Horse years are 1942, 1954, 1966, 1978, 1990, 2002, 2014, and 2026, and the next is
              2038.
            </strong>{" "}
            The current Horse year began at Lunar New Year on{" "}
            {formatLongDate(horse2026.lunarNewYear)} and runs until{" "}
            {formatLongDate(horse2026.lastDay)}; the{" "}
            <Link href="/chinese-zodiac/goat" className={linkClass}>
              Year of the Goat
            </Link>{" "}
            starts the next day. Births in January or early February belong to the previous sign
            if they fall before that year&rsquo;s Lunar New Year.
          </p>
          <p>
            <a href="#horse-age-table" className={linkClass}>
              Check Horse birth years, element types, and ages in 2026
            </a>{" "}
            in the table further down.
          </p>
          <p>
            In the{" "}
            <Link href="/bazi/earthly-branches" className={linkClass}>
              Earthly Branch
            </Link>{" "}
            system the Horse is Wu (午), the seventh branch. Wu marks the 11 am–1 pm double hour, the
            south, and midsummer: the point where yang is at its height and yin begins to return.
            That is why the Horse carries Yang Fire symbolism of speed, visibility, and warmth.
          </p>
        </>
      ),
    },
    {
      heading: "2026 Fire Horse: what Bing-Wu means",
      content: (
        <>
          <p>
            Each Horse year pairs the Wu branch with a Heavenly Stem. In 2026 that stem is Bing (丙),
            Yang Fire, so the year is Bing-Wu: Fire stem over a Fire branch. Bing-Wu years recur
            every 60 years (1906, 1966, 2026, 2086) and are among the most Fire-heavy in the
            sexagenary cycle.
          </p>
          <p>
            Fire Horse years carry folklore of their own. In Japan the hinoeuma (丙午) superstition
            about women born in Fire Horse years was strong enough that the national birth rate in
            1966 fell by roughly a quarter. Modern Bazi practice treats that belief as cultural
            history, not a reading: a year pillar is one of four, and the Day Master carries more
            weight.
          </p>
          <p>
            For people born in Horse years, 2026 is a <em>ben ming nian</em> (本命年), the return of
            their own birth sign. Tradition associates that year with extra caution and wearing red
            for protection. In Bazi terms the annual Wu meets the natal Wu, a self-punishment
            pattern (午午自刑) that some schools read as a prompt to slow down rather than as bad
            luck. The{" "}
            <Link href="/chinese-zodiac/2026-forecast" className={linkClass}>
              2026 forecast
            </Link>{" "}
            covers how the Fire Horse year is read for all 12 signs.
          </p>
          <h3 id="horse-age-table" className="scroll-mt-28">
            Horse year age chart: ages reached in 2026
          </h3>
          <p>
            Subtract the birth year from 2026 to find the age reached on the 2026 birthday; before
            the birthday, subtract one more. This is birthday-based age, not traditional nominal
            age (sui).
          </p>
          <AgeTable id="horse-ages" animal="Horse" years={HORSE_YEARS} ageYear={2026} />
        </>
      ),
      stats: [
        { value: "60", label: "Years between Fire Horses", description: "1966, 2026, 2086." },
      ],
    },
    {
      heading: "Horse personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Horse people as energetic, expressive, and
            freedom-loving. Those traits come from Wu&rsquo;s Yang Fire: fast, outward, and hard to
            contain. Wu holds two hidden stems, Ding Fire (丁) and Ji Earth (己), so a Horse branch in
            a chart also brings some steadiness, which shows when the rest of the chart supports
            Earth.
          </p>
          <p>
            Compatibility follows fixed branch positions. The Horse forms a six combination with the
            Goat (Wu-Wei), and a Fire triad with Tiger and Dog (Yin-Wu-Xu). Its clash sign is the
            Rat (Zi-Wu), and its six-harm partner is the Ox (Chou-Wu). Read a clash as different
            pacing, not as a ban on a relationship; the{" "}
            <Link href="/blog/chinese-zodiac-compatibility-chart" className={linkClass}>
              compatibility chart
            </Link>{" "}
            shows the same patterns for every sign.
          </p>
          <p>
            Fire associations point toward visible, fast-moving work: sales, media, performance,
            travel, sport, and roles where momentum matters. Horse energy is least comfortable in
            slow, enclosed routines. A{" "}
            <Link href="/tools/bazi-calculator" className={linkClass}>
              full Bazi chart
            </Link>{" "}
            shows whether Fire is actually strong in a given chart, which the year animal alone
            cannot.
          </p>
        </>
      ),
    },
  ],
  goat: [
    {
      heading: "Years of the Goat and the Wei branch",
      content: (
        <>
          <p>
            <strong>
              Goat years are 1943, 1955, 1967, 1979, 1991, 2003, 2015, and 2027, and the one after
              that is 2039.
            </strong>{" "}
            The next Year of the Goat begins on {formatLongDate(goat2027.lunarNewYear)}, the day after
            the 2026{" "}
            <Link href="/chinese-zodiac/horse" className={linkClass}>
              Fire Horse year
            </Link>{" "}
            ends, and runs to {formatLongDate(goat2027.lastDay)}. The last Goat year ran from{" "}
            {formatLongDate(goat2015.lunarNewYear)} to {formatLongDate(goat2015.lastDay)}.
          </p>
          <p>
            <a href="#goat-age-table" className={linkClass}>
              Check Goat birth years, element types, and ages in 2027
            </a>{" "}
            in the table further down.
          </p>
          <p>
            In the{" "}
            <Link href="/bazi/earthly-branches" className={linkClass}>
              Earthly Branch
            </Link>{" "}
            system the Goat is Wei (未), the eighth branch. Wei marks the 1–3 pm double hour, the
            south-southwest, and late summer. It is Yin Earth that still holds summer heat, which is
            why the sign is linked with warmth, care, and patience rather than speed.
          </p>
        </>
      ),
    },
    {
      heading: "Goat, Sheep, or Ram: which is right?",
      content: (
        <>
          <p>
            All three are correct translations. The Chinese character 羊 (yáng) covers goats, sheep,
            and rams, and the calendar sign itself is the branch Wei (未). English sources pick
            different words: Goat is common in the United States, Sheep in British and many Chinese
            English-language sources, and Ram in some older books. The years and
            meanings do not change.
          </p>
          <p>
            Some families see the Goat as an unlucky birth year, after the folk saying 十羊九不全
            (&ldquo;of ten sheep, nine are incomplete&rdquo;), which made headlines again around the
            2015 Goat year. Classical Bazi texts do not support it: Wei is an ordinary branch with
            the same weight as the other eleven, and its effect depends on the whole chart.
          </p>
        </>
      ),
    },
    {
      heading: "2027 Fire Goat: what Ding-Wei means",
      content: (
        <>
          <p>
            The 2027 Goat year pairs the Wei branch with Ding (丁), Yin Fire, so the year is
            Ding-Wei. The previous Ding-Wei year was 1967 and the next is 2087. Wei holds three
            hidden stems: Ji Earth (己), Ding Fire (丁), and Yi Wood (乙). With Ding also on the stem,
            2027 keeps some of the Fire carried over from the 2026 Fire Horse year, in a gentler,
            Yin form.
          </p>
          <p>
            For people born in Goat years, 2027 is a <em>ben ming nian</em> (本命年), the return of
            their birth sign, traditionally met with red clothing or accessories. The Horse and the
            Goat form a six combination (Wu-Wei), so the hand-over from 2026 to 2027 is one of the
            smoother transitions in the cycle. The Goat&rsquo;s clash sign, the Ox, meets the annual
            branch head-on in 2027.
          </p>
          <h3 id="goat-age-table" className="scroll-mt-28">
            Goat year age chart: ages reached in 2027
          </h3>
          <p>
            Subtract the birth year from 2027 to find the age reached on the 2027 birthday; before
            the birthday, subtract one more. This is birthday-based age, not traditional nominal
            age (sui).
          </p>
          <AgeTable id="goat-ages" animal="Goat" years={GOAT_YEARS} ageYear={2027} />
        </>
      ),
      stats: [
        { value: "Feb 6", label: "2027 start", description: "Lunar New Year opens the Fire Goat year." },
      ],
    },
    {
      heading: "Goat personality, compatibility, and career themes",
      content: (
        <>
          <p>
            Popular zodiac writing describes Goat people as creative, gentle, and community-minded.
            Those traits follow from Wei&rsquo;s Yin Earth: receptive, steady, and protective of the
            people around it. The hidden Yi Wood adds an artistic streak, and the hidden Ding Fire
            adds warmth.
          </p>
          <p>
            The Goat forms a six combination with the Horse (Wu-Wei) and a Wood triad with Pig and
            Rabbit (Hai-Mao-Wei). Its clash sign is the Ox (Chou-Wei), and its six-harm partner is
            the Rat (Zi-Wei). Wei also sits in the Chou-Xu-Wei punishment group with Ox and Dog. These
            are calendar patterns, not verdicts; the{" "}
            <Link href="/tools/zodiac-compatibility" className={linkClass}>
              zodiac compatibility calculator
            </Link>{" "}
            compares any two signs.
          </p>
          <p>
            Earth with hidden Wood points toward work that builds things patiently: design, the
            arts, teaching, care work, hospitality, and gardening or land. Goat energy does best in a
            cooperative setting. A{" "}
            <Link href="/tools/bazi-calculator" className={linkClass}>
              full Bazi chart
            </Link>{" "}
            shows how much the Wei branch actually matters for a given person.
          </p>
        </>
      ),
    },
  ],
};

export const horseGoatFaqs: Record<string, FAQ[]> = {
  horse: [
    {
      question: "Is 2026 the Year of the Horse?",
      answer: `Yes. 2026 is the Year of the Fire Horse (Bing-Wu, 丙午). It began at Lunar New Year on ${formatLongDate(horse2026.lunarNewYear)} and ends on ${formatLongDate(horse2026.lastDay)}. Bazi schools that use the Li Chun boundary start the Horse year pillar on ${formatLongDate(horse2026.liChun)} instead.`,
    },
    {
      question: "What years are Year of the Horse?",
      answer:
        "Horse years are 1942, 1954, 1966, 1978, 1990, 2002, 2014, and 2026, and the next is 2038. Each one pairs the Wu branch with a different element: Water (1942, 2002), Wood (1954, 2014), Fire (1966, 2026), Earth (1978, 2038), and Metal (1990).",
    },
    {
      question: "How old are people born in a Horse year in 2026?",
      answer:
        "People born in 2014, 2002, 1990, 1978, 1966, 1954, and 1942 turn 12, 24, 36, 48, 60, 72, and 84 on their 2026 birthday. Before the birthday they are one year younger. This is birthday-based age, not nominal age.",
    },
    {
      question: "When is the next Year of the Horse after 2026?",
      answer: `The next Horse year is 2038, an Earth Horse (Wu-Wu, 戊午) year that begins on ${formatLongDate(getZodiacYearDates(2038).lunarNewYear)}. The next Fire Horse year after 2026 is 2086.`,
    },
    {
      question: "What comes after the Year of the Horse?",
      answer: `The Year of the Goat. The 2027 Fire Goat year starts on ${formatLongDate(goat2027.lunarNewYear)}, the day after the 2026 Horse year ends.`,
    },
    {
      question: "Which signs are most compatible with the Horse?",
      answer:
        "The Horse forms a six combination with the Goat and a Fire triad with the Tiger and Dog. Its clash sign is the Rat and its six-harm partner is the Ox. These are symbolic branch patterns; a full Bazi comparison uses all four pillars.",
    },
    {
      question: "Is a Fire Horse year unlucky?",
      answer:
        "Not in classical Bazi. The belief comes mainly from the Japanese hinoeuma superstition about women born in Fire Horse years. In a chart, the year pillar is one of four, and its effect depends on the Day Master and the balance of elements.",
    },
  ],
  goat: [
    {
      question: "When is the next Year of the Goat?",
      answer: `The next Year of the Goat is 2027, a Fire Goat (Ding-Wei, 丁未) year. It begins at Lunar New Year on ${formatLongDate(goat2027.lunarNewYear)} and ends on ${formatLongDate(goat2027.lastDay)}. After that the Goat returns in 2039.`,
    },
    {
      question: "Is 2027 the Year of the Goat or the Sheep?",
      answer:
        "Both. The Chinese sign 羊 covers goat, sheep, and ram, so 2027 is equally the Year of the Goat, the Year of the Sheep, or the Year of the Ram. The calendar branch is Wei (未) in every case.",
    },
    {
      question: "What years are Year of the Goat?",
      answer:
        "Goat years are 1943, 1955, 1967, 1979, 1991, 2003, 2015, and 2027, with 2039 next. Element types: Water (1943, 2003), Wood (1955, 2015), Fire (1967, 2027), Earth (1979, 2039), and Metal (1991).",
    },
    {
      question: "When was the last Year of the Goat?",
      answer: `The last Goat year was the 2015 Wood Goat (Yi-Wei, 乙未) year, from ${formatLongDate(goat2015.lunarNewYear)} to ${formatLongDate(goat2015.lastDay)}.`,
    },
    {
      question: "How old are people born in a Goat year in 2027?",
      answer:
        "People born in 2015, 2003, 1991, 1979, 1967, 1955, and 1943 turn 12, 24, 36, 48, 60, 72, and 84 on their 2027 birthday. For them 2027 is a ben ming nian, the return of their birth sign.",
    },
    {
      question: "If I was born in January 2003, am I a Horse or a Goat?",
      answer: `A Horse in the popular zodiac. The 2003 Goat year began on ${formatLongDate(getZodiacYearDates(2003).lunarNewYear)}, so January 2003 births before that date fall in the 2002 Water Horse year. Bazi charts that use Li Chun change the year pillar on ${formatLongDate(getZodiacYearDates(2003).liChun)} instead.`,
    },
    {
      question: "Which signs are most compatible with the Goat?",
      answer:
        "The Goat forms a six combination with the Horse and a Wood triad with the Pig and Rabbit. Its clash sign is the Ox and its six-harm partner is the Rat. Read these as symbolic patterns, not a relationship verdict.",
    },
  ],
};
