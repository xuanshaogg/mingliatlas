interface DirectAnswerProps {
  answer: string;
}

export default function DirectAnswer({ answer }: DirectAnswerProps) {
  return (
    <div className="rounded-lg border border-gold-300/70 bg-gold-50 p-5 shadow-sm dark:border-gold-500/30 dark:bg-gold-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
        Direct Answer
      </p>
      <p className="mt-3 text-lg leading-8 text-ink-800 dark:text-paper">{answer}</p>
    </div>
  );
}
