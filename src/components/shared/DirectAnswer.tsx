interface DirectAnswerProps {
  answer: string;
}

export default function DirectAnswer({ answer }: DirectAnswerProps) {
  return (
    <div className="border-brand-primary dark:border-gold-400 border-t-2 pt-4 sm:pt-5">
      <p className="text-ink-950 dark:text-gold-300 text-xs font-semibold tracking-[0.18em] uppercase">
        Direct Answer
      </p>
      <p className="text-ink-950 dark:text-paper font-display mt-3 text-[1.125rem] leading-[1.6] sm:text-[1.3125rem]">
        {answer}
      </p>
    </div>
  );
}
