"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
        Frequently Asked Questions
      </p>
      <h2 id={headingId} className="mt-2 text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper">
        Common questions
      </h2>
      <div className="mt-6 divide-y divide-ink-200 overflow-hidden rounded-lg border border-ink-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-950 transition hover:bg-paper-100 dark:text-paper dark:hover:bg-white/5"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand-primary transition dark:text-gold-300 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? (
                <div className="px-5 pb-5 text-sm leading-7 text-ink-600 dark:text-ink-300">{faq.answer}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
