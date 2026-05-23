import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getLearnPage, getLearnStaticParams } from "@/content/learn/pages";

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

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.data.schema.url,
      type: "article",
    },
  };
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const page = getLearnPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
