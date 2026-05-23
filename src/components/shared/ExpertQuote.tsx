export interface Quote {
  text: string;
  author: string;
  title: string;
  organization?: string;
}

interface ExpertQuoteProps {
  quote: Quote;
}

export default function ExpertQuote({ quote }: ExpertQuoteProps) {
  const attribution = [quote.title, quote.organization].filter(Boolean).join(", ");

  return (
    <blockquote className="rounded-lg border-l-4 border-brand-gold bg-white p-5 shadow-sm dark:bg-white/5">
      <p className="text-xl font-medium leading-8 text-ink-900 dark:text-paper">“{quote.text}”</p>
      <footer className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">
        — <cite className="font-semibold not-italic text-brand-primary dark:text-gold-300">{quote.author}</cite>
        {attribution ? <span>, {attribution}</span> : null}
      </footer>
    </blockquote>
  );
}
