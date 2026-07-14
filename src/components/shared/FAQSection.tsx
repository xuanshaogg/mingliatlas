import { ChevronDown } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const headingId = "faq-section-heading";

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
        Frequently Asked Questions
      </p>
      <h2 id={headingId} className="mt-2 font-display text-4xl tracking-tight text-ink-950 dark:text-paper">
        Common questions
      </h2>
      <div className="mt-6 divide-y divide-ink-200 border-y border-ink-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-950 transition hover:bg-paper-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:text-paper dark:hover:bg-white/5 [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-brand-primary transition group-open:rotate-180 dark:text-gold-300"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-5 text-sm leading-7 text-ink-600 dark:text-ink-300">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
