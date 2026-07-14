interface DirectAnswerProps {
  answer: string;
}

export default function DirectAnswer({ answer }: DirectAnswerProps) {
  return (
    <div className="border-l-2 border-brand-primary bg-paper-100 px-5 py-4 dark:border-gold-300 dark:bg-gold-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
        Direct Answer
      </p>
      <p className="mt-3 text-lg leading-8 text-ink-800 dark:text-paper">{answer}</p>
    </div>
  );
}
