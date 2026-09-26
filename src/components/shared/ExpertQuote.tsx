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
    <blockquote className="bg-brand-50 rounded-2xl p-5 sm:p-6 dark:bg-white/5">
      <p className="text-ink-900 dark:text-paper text-lg leading-8 font-medium">“{quote.text}”</p>
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
