import Link from "next/link";
import type { ReactNode } from "react";
import { termMap, type KnownTerm } from "@/lib/content/termMap";

interface TermLinkProps {
  term: KnownTerm;
  children?: ReactNode;
}

export default function TermLink({ term, children }: TermLinkProps) {
  return (
    <Link href={termMap[term]} className="text-brand-primary underline decoration-brand-primary/30 dark:text-gold-300">
      {children ?? term}
    </Link>
  );
}
