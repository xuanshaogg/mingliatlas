import Link from "next/link";
import type { Citation, Section } from "@/components/templates/KnowledgePage";

const linkClass =
  "font-medium text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";
const calendarUrl = "https://www.hko.gov.hk/en/gts/time/conversion.htm";
const calendarMethodsUrl = "https://6tail.cn/calendar/lunar.ganzhi.html";
const classicalTextUrl = "https://ctext.org/wiki.pl?chapter=721793&if=en&remap=gb";
const translationUrl =
  "https://www.innertraditions.com/books/the-complete-i-ching-10th-anniversary-edition-590";

export const learningPracticeSections: Record<string, Section> = {
  "/learn": {
    heading: "Choose your next useful step",
    content: (
      <>
        <p>
          You can use this learning center at three different stages. Each route has a concrete
          outcome; choose the one that matches what you need today.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              href: "/learn/beginners-guide",
              title: "Learn the foundations",
              description:
                "Build a short glossary and complete one chart, casting, or room observation with the four-week guide.",
            },
            {
              href: "/learn/which-system",
              title: "Choose a method",
              description:
                "Compare the inputs and outputs of five systems, including what to do when your birth time is missing.",
            },
            {
              href: "/learn/resources",
              title: "Check a source",
              description:
                "Open a reference, identify the exact claim it supports, and separate textual tradition from your own interpretation.",
            },
          ].map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="atlas-surface hover:border-brand-200 p-5 transition-colors"
            >
              <h3 className="text-ink-950 dark:text-paper text-lg font-semibold">{route.title}</h3>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                {route.description}
              </p>
            </Link>
          ))}
        </div>
        <p>
          If you already have a chart, use the{" "}
          <Link href="/blog/day-master-bazi-complete-guide" className={linkClass}>
            Day Master reading guide
          </Link>
          . If you have an I Ching cast, start with{" "}
          <Link href="/i-ching/sixty-four-hexagrams" className={linkClass}>
            the hexagram reference
          </Link>
          . These are different tasks: identifying a calculated symbol comes before deciding what
          meaning to give it.
        </p>
      </>
    ),
  },
  "/learn/beginners-guide": {
    heading: "Your first practice sheet: from input to explanation",
    content: (
      <>
        <p>
          Use this small Bazi exercise to put the learning sequence into practice. You may use a
          made-up date rather than personal birth details. Keep the same settings throughout the
          exercise so you can distinguish a changed calculation from a changed interpretation.
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>
            <strong>Record the input.</strong> Write the Gregorian date, local clock time and
            whether you used civil or estimated solar time. If the time is unknown, do not present
            an assumed hour as a verified birth record.
          </li>
          <li>
            <strong>Copy the result.</strong> Open the{" "}
            <Link href="/tools/bazi-calculator" className={linkClass}>
              free Bazi calculator
            </Link>{" "}
            and label year, month, day and hour. Copy the two characters in the day pillar
            separately.
          </li>
          <li>
            <strong>Identify one term.</strong> Find the day stem in the{" "}
            <Link href="/bazi/heavenly-stems" className={linkClass}>
              ten-stem reference
            </Link>
            . Record its Chinese character, pinyin, phase and yin/yang polarity.
          </li>
          <li>
            <strong>State one limit.</strong> Write: “This identifies a calendar position; it does
            not establish a personality, career or future event.” Further interpretation needs the
            other pillars and a stated method.
          </li>
        </ol>
        <p>
          <strong>Illustrative answer:</strong> if the displayed day pillar is 甲子 (Jia Zi), the
          day stem is 甲, Jia, Yang Wood. 子, Zi, is its Earthly Branch. The Day Master is Jia Wood
          even though Zi is associated with Water. This example explains the notation; it does not
          claim that a particular birth date produces this pillar.
        </p>
        <p>
          When two calculators disagree, compare their{" "}
          <Link href="/tools/bazi-calculator#calculation-method" className={linkClass}>
            calendar conventions
          </Link>{" "}
          before interpreting either result. In particular, a lunar-year boundary and a Li Chun
          boundary are not the same rule. Your finished practice sheet should let another reader
          reproduce the input, locate the term and see the remaining uncertainty.
        </p>
      </>
    ),
  },
  "/learn/which-system": {
    heading: "Three example questions and where to start",
    content: (
      <>
        <p>
          These are teaching scenarios, not client cases or evidence of predictive accuracy. They
          show how the question changes the useful next step.
        </p>
        <ul className="space-y-5">
          <li>
            <strong>“I have my birth date, but not the hour.”</strong> Begin with calendar
            vocabulary and the{" "}
            <Link href="/bazi/what-is-bazi" className={linkClass}>
              Four Pillars explanation
            </Link>
            . Mark the hour as unknown in your notes. A calculator that requires an hour can
            demonstrate the structure with a sample input, but the sample hour is not part of your
            verified chart. Do not select the hour whose description feels most flattering.
          </li>
          <li>
            <strong>“I am considering taking on a new project.”</strong> If you want a reflective
            exercise, ask the I Ching “What should I consider about taking on this project?” Record
            the question, cast once, then separate the{" "}
            <Link href="/i-ching/how-to-cast" className={linkClass}>
              primary hexagram, changing lines and relating hexagram
            </Link>
            . Compare the reflection with the actual workload, agreement and available time before
            acting.
          </li>
          <li>
            <strong>“My desk area is uncomfortable to use.”</strong> Start with{" "}
            <Link href="/feng-shui" className={linkClass}>
              the physical layout
            </Link>
            : draw the doorway, chair, work surface and movement path. Note what obstructs access or
            causes glare. Change one reversible feature and observe whether it helps. A birth chart
            or a lucky-object purchase does not answer this practical layout question.
          </li>
        </ul>
        <p>
          A useful first result is something you can describe and check: a labelled chart, a
          recorded reflection, or an observed change in how a room works. Match that result to the
          original question before deciding to study a more detailed method.
        </p>
      </>
    ),
  },
  "/learn/resources": {
    heading: "Open these references and know what each can establish",
    content: (
      <>
        <p>
          A useful reference is specific enough to open and inspect. The links below serve different
          purposes; a source that verifies a date does not also validate an interpretation.
        </p>
        <dl className="space-y-5">
          <div>
            <dt className="font-semibold">
              <a href={calendarUrl} className={linkClass}>
                Hong Kong Observatory: Gregorian–lunar conversion tables
              </a>
            </dt>
            <dd className="mt-2">
              Use the year tables to check lunar dates and solar-term dates. Record the year and
              time standard. For a birth close to a transition, a date-only table is not a
              substitute for checking the exact moment under the convention used by the calculator.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              <a href={classicalTextUrl} className={linkClass}>
                San Ming Tong Hui, volume 10: Chinese Text Project transcription
              </a>
            </dt>
            <dd className="mt-2">
              Use this passage to locate traditional discussions of the month branch and day stem.
              Keep the Chinese wording, volume and transcription together. A historical text
              documents a tradition; its presence is not empirical proof of a personal prediction.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              <a href={translationUrl} className={linkClass}>
                Alfred Huang: The Complete I Ching, 10th Anniversary Edition
              </a>
            </dt>
            <dd className="mt-2">
              The publisher record identifies the translator and edition. It is useful when
              distinguishing a particular English translation from the received Chinese text. Check
              the actual edition for the hexagram and line passage rather than attributing a modern
              summary to the original text.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              <a href={calendarMethodsUrl} className={linkClass}>
                Lunar calendar library: stem–branch conventions
              </a>
            </dt>
            <dd className="mt-2">
              The library documentation distinguishes lunar-year, Li Chun day and exact Li Chun
              boundaries, as well as date-level and moment-level month transitions. Use it alongside
              the{" "}
              <Link href="/tools/bazi-calculator#calculation-method" className={linkClass}>
                calculator method note
              </Link>{" "}
              to understand why the same civil date can produce different labels in different tools.
            </dd>
          </div>
        </dl>
        <p>
          <strong>Example source note:</strong> “The calendar table establishes the date I checked;
          the classical passage describes a traditional relationship; the English wording is my
          paraphrase.” Add a page, volume or hexagram number and the access date to that note. If
          the evidence only supports the first part of a claim, narrow the claim instead of filling
          the gap with a confident interpretation.
        </p>
      </>
    ),
  },
};

export const learningPracticeSources: Record<string, Citation[]> = {
  "/learn/beginners-guide": [
    {
      label: "Lunar calendar library: stem–branch boundaries",
      source:
        "The library author documents the distinction between lunar-year, Li Chun and exact solar-term boundaries.",
      url: calendarMethodsUrl,
    },
  ],
  "/learn/resources": [
    {
      label: "San Ming Tong Hui, volume 10",
      source:
        "Chinese Text Project transcription; traditional month-branch and day-stem reading context.",
      url: classicalTextUrl,
    },
    {
      label: "Lunar calendar library: stem–branch boundaries",
      source: "Calculation convention reference, separate from interpretive claims.",
      url: calendarMethodsUrl,
    },
  ],
};
