interface DirectAnswerProps {
  answer: string;
}

export default function DirectAnswer({ answer }: DirectAnswerProps) {
  return (
    <div className="ring-ink-200/50 rounded-2xl bg-white/80 p-5 ring-1 sm:p-6 dark:bg-white/5 dark:ring-white/10">
      <p className="text-brand-primary dark:text-gold-300 flex items-center gap-2 text-xs font-semibold">
        <span className="bg-brand-primary/60 h-1.5 w-1.5 rounded-full" aria-hidden="true" />
        Direct Answer
      </p>
      <p className="text-ink-700 dark:text-paper mt-3 text-[0.9375rem] leading-7 sm:text-base sm:leading-8">
        {answer}
      </p>
    </div>
  );
}
