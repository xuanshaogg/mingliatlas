import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getLearnPage, getLearnStaticParams } from "@/content/learn/pages";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

interface LearnPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getLearnStaticParams();
}

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLearnPage(slugFromSegments(slug));

  if (!page) {
    return {};
  }

  return buildKnowledgePageMetadata(page);
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const page = getLearnPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
