import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getZiweiPage, getZiweiStaticParams } from "@/content/ziwei/pages";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

interface ZiweiPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getZiweiStaticParams();
}

export async function generateMetadata({ params }: ZiweiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getZiweiPage(slugFromSegments(slug));

  if (!page) {
    return {};
  }

  return buildKnowledgePageMetadata(page);
}

export default async function ZiweiPage({ params }: ZiweiPageProps) {
  const { slug } = await params;
  const page = getZiweiPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
