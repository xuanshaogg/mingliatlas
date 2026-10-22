import type { ReactNode } from "react";

export interface Statistic {
  value: string;
  label: string;
  description?: string;
}

interface StatProps {
  value: string;
  label: string;
  description?: string;
}

interface InfoCardProps {
  title?: string;
  stats: Statistic[];
  children?: ReactNode;
}

export function Stat({ value, label, description }: StatProps) {
  return (
    <div className="min-w-0">
      <p className="text-ink-950 dark:text-gold-300 font-display text-[1.75rem] leading-tight font-medium">
        {value}
      </p>
      <p className="text-ink-900 dark:text-paper mt-1 text-sm font-semibold">{label}</p>
      {description ? (
        <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">{description}</p>
      ) : null}
    </div>
  );
}

export default function InfoCard({ title = "Quick Facts", stats, children }: InfoCardProps) {
  return (
    <div className="border-ink-200 border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 dark:border-white/10">
      <h2 className="text-ink-600 dark:text-gold-300 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
        {title}
      </h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
        {stats.map((stat) => (
          <Stat key={`${stat.value}-${stat.label}`} {...stat} />
        ))}
      </div>
      {children ? (
        <div className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-6">{children}</div>
      ) : null}
    </div>
  );
}
