import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getZodiacPage, getZodiacStaticParams } from "@/content/zodiac/pages";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

interface ZodiacPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getZodiacStaticParams();
}

export async function generateMetadata({ params }: ZodiacPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getZodiacPage(slugFromSegments(slug));

  if (!page) {
    return {};
  }

  return buildKnowledgePageMetadata(page);
}

export default async function ZodiacPage({ params }: ZodiacPageProps) {
  const { slug } = await params;
  const page = getZodiacPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
