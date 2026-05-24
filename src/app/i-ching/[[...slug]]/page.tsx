import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getIChingPage, getIChingStaticParams } from "@/content/i-ching/pages";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

interface IChingPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getIChingStaticParams();
}

export async function generateMetadata({ params }: IChingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIChingPage(slugFromSegments(slug));

  if (!page) {
    return {};
  }

  return buildKnowledgePageMetadata(page);
}

export default async function IChingPage({ params }: IChingPageProps) {
  const { slug } = await params;
  const page = getIChingPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
