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
      <p className="text-ink-950 dark:text-gold-300 text-2xl font-semibold tracking-tight">
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
    <aside className="bg-paper-100/70 rounded-2xl p-5 sm:p-7 dark:bg-white/5">
      <h2 className="text-ink-500 dark:text-gold-300 text-xs font-semibold">{title}</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
        {stats.map((stat) => (
          <Stat key={`${stat.value}-${stat.label}`} {...stat} />
        ))}
      </div>
      {children ? (
        <div className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-6">{children}</div>
      ) : null}
    </aside>
  );
}
