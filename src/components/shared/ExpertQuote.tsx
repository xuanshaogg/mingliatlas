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
    <blockquote className="border-gold-400 border-l-2 py-1 pl-5 sm:pl-6">
      <p className="text-ink-900 dark:text-paper font-display text-xl leading-8 italic sm:text-[1.375rem]">
        “{quote.text}”
      </p>
      <footer className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">
        —{" "}
        <cite className="text-brand-primary dark:text-gold-300 font-semibold not-italic">
          {quote.author}
        </cite>
        {attribution ? <span>, {attribution}</span> : null}
      </footer>
    </blockquote>
  );
}
