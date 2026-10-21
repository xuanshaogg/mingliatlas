interface DirectAnswerProps {
  answer: string;
}

export default function DirectAnswer({ answer }: DirectAnswerProps) {
  return (
    <div className="border-brand-primary dark:border-gold-400 rounded-r-xl border-l-[3px] bg-white py-5 pr-5 pl-5 sm:py-6 sm:pr-7 sm:pl-6 dark:bg-white/5">
      <p className="text-brand-700 dark:text-gold-300 text-xs font-semibold tracking-[0.14em] uppercase">
        Direct Answer
      </p>
      <p className="text-ink-900 dark:text-paper mt-3 text-[1.0625rem] leading-8">{answer}</p>
    </div>
  );
}
