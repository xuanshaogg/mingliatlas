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
      <div className="atlas-surface divide-ink-100 mt-6 divide-y overflow-hidden dark:divide-white/10">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0} className="group">
            <summary className="text-ink-950 hover:bg-paper-100 focus-visible:ring-brand-primary/30 dark:text-paper flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold transition focus-visible:ring-2 focus-visible:outline-none sm:px-5 dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="text-brand-primary dark:text-gold-300 h-5 w-5 shrink-0 transition group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="text-ink-600 dark:text-ink-300 px-5 pb-5 text-sm leading-7">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
