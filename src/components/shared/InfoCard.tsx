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
    <div className="border-t border-ink-300 bg-white px-1 py-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-3xl font-semibold text-brand-primary dark:text-gold-300">{value}</p>
      <p className="mt-1 text-sm font-semibold text-ink-900 dark:text-paper">{label}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{description}</p> : null}
    </div>
  );
}

export default function InfoCard({ title = "Quick Facts", stats, children }: InfoCardProps) {
  return (
    <aside className="border-y border-ink-300 bg-paper-100 p-5 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {stats.map((stat) => (
          <Stat key={`${stat.value}-${stat.label}`} {...stat} />
        ))}
      </div>
      {children ? <div className="mt-5 text-sm leading-6 text-ink-600 dark:text-ink-300">{children}</div> : null}
    </aside>
  );
}
