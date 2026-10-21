import { ChevronDown } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs.length) return null;
  const headingId = "faq-section-heading";

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <p className="atlas-eyebrow">Frequently Asked Questions</p>
      <h2 id={headingId} className="atlas-section-title mt-4">
        Common questions
      </h2>
      <div className="border-ink-200 divide-ink-200 mt-6 divide-y border-y dark:divide-white/10 dark:border-white/10">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0} className="group">
            <summary className="hover:bg-paper-100/70 focus-visible:ring-brand-primary/30 flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-1 py-4 text-left transition focus-visible:ring-2 focus-visible:outline-none sm:px-2 dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden">
              {/* Questions are headings so readers and answer engines can scan them. */}
              <h3 className="text-ink-950 dark:text-paper font-sans text-base leading-6 font-semibold tracking-normal">
                {faq.question}
              </h3>
              <ChevronDown
                className="text-brand-primary dark:text-gold-300 h-5 w-5 shrink-0 transition group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="text-ink-700 dark:text-ink-200 max-w-[44rem] px-1 pb-6 text-[0.9375rem] leading-7 sm:px-2">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
