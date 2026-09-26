import Link from "next/link";
import type { Section } from "@/components/templates/KnowledgePage";

const linkClass =
  "font-medium text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300";

export const baziFirstReading: Section = {
  heading: "Turn a calculator result into a reading plan",
  content: (
    <>
      <p>
        After generating a chart, choose the next guide from the part of the result you can
        identify. This keeps the learning order connected to the chart in front of you.
      </p>
      <ul className="space-y-4">
        <li>
          <strong>Start with the day stem.</strong> Find its Chinese character, element and polarity
          in the{" "}
          <Link href="/blog/day-master-bazi-complete-guide" className={linkClass}>
            Day Master guide
          </Link>
          . Keep the day branch separate; its animal does not replace the day stem as the reference
          point.
        </li>
        <li>
          <strong>Then read the month branch.</strong> Use the{" "}
          <Link href="/bazi/earthly-branches" className={linkClass}>
            Earthly Branch reference
          </Link>{" "}
          to identify the seasonal context. A visible element total does not account for every rule
          a practitioner might use to judge seasonal strength.
        </li>
        <li>
          <strong>Translate one relationship.</strong> Pick one other stem and follow its
          relationship to the Day Master through the{" "}
          <Link href="/bazi/ten-gods" className={linkClass}>
            Ten Gods guide
          </Link>
          . Write the rule before adding a story about work or relationships.
        </li>
        <li>
          <strong>Record the calculation convention.</strong> Read the{" "}
          <Link href="/tools/bazi-calculator#calculation-method" className={linkClass}>
            calculator method note
          </Link>{" "}
          before comparing another tool, especially around a year or month boundary.
        </li>
      </ul>
      <p>
        The Five Element bars in this tool summarize visible stems and weighted hidden stems. They
        are a descriptive chart aid; the percentages are not measured personality traits or
        probabilities. Keep the original input and each interpretive step in your notes so you can
        revise the explanation without changing the underlying record.
      </p>
    </>
  ),
};

export const baziNotationExample: Section = {
  heading: "Worked notation example: reading the day pillar 甲子",
  content: (
    <>
      <p>
        This is an illustrative pillar, not a complete birth chart or a client case. Suppose the day
        column shows 甲子, Jia Zi. Read the two characters separately before interpreting anything
        else.
      </p>
      <div className="border-ink-200 overflow-x-auto rounded-xl border dark:border-white/10">
        <table className="w-full min-w-[30rem] text-left text-sm leading-6">
          <caption className="px-4 py-3 text-left font-semibold">
            How the two characters identify the Day Master
          </caption>
          <thead className="bg-paper-100 dark:bg-white/5">
            <tr>
              <th scope="col" className="p-4">
                Part
              </th>
              <th scope="col" className="p-4">
                Reading
              </th>
              <th scope="col" className="p-4">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-ink-100 border-t dark:border-white/10">
              <th scope="row" className="p-4">
                甲 · Jia
              </th>
              <td className="p-4">Yang Wood</td>
              <td className="p-4">Heavenly Stem in the day pillar; the Day Master.</td>
            </tr>
            <tr className="border-ink-100 border-t dark:border-white/10">
              <th scope="row" className="p-4">
                子 · Zi
              </th>
              <td className="p-4">Rat branch, associated with Water</td>
              <td className="p-4">Earthly Branch in the day pillar.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The Day Master in this example is Jia Wood. Knowing that Zi is a Water branch does not
        change the identity of the day stem. The year animal would be read from the year branch,
        which is not supplied in this example.
      </p>
      <p>
        Next, inspect the actual chart&apos;s month branch and other stems. In the traditional Five
        Phase relationship, Water generates Wood; the{" "}
        <Link href="/bazi/ten-gods" className={linkClass}>
          Ten Gods framework
        </Link>{" "}
        calls the element that generates the Day Master its Resource. Polarity further distinguishes
        the specific Ten God. Identifying that relationship does not by itself tell you whether it
        is useful in the complete chart.
      </p>
      <p>
        Use the{" "}
        <Link href="/bazi/heavenly-stems" className={linkClass}>
          stem table
        </Link>{" "}
        and{" "}
        <Link href="/bazi/five-elements" className={linkClass}>
          Five Elements cycles
        </Link>{" "}
        to reproduce these labels. Leave personality and timing conclusions until the complete
        inputs, convention and interpretive method are clear.
      </p>
    </>
  ),
};
