import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getBaziPage, getBaziStaticParams } from "@/content/bazi/pages";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

interface BaziPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getBaziStaticParams();
}

export async function generateMetadata({ params }: BaziPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBaziPage(slugFromSegments(slug));

  if (!page) {
    return {};
  }

  return buildKnowledgePageMetadata(page);
}

export default async function BaziPage({ params }: BaziPageProps) {
  const { slug } = await params;
  const page = getBaziPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
