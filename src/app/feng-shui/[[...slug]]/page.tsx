import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getFengShuiPage, getFengShuiStaticParams } from "@/content/feng-shui/pages";

interface FengShuiPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function slugFromSegments(segments?: string[]): string {
  return segments?.join("/") ?? "";
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return getFengShuiStaticParams();
}

export async function generateMetadata({ params }: FengShuiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getFengShuiPage(slugFromSegments(slug));

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

export default async function FengShuiPage({ params }: FengShuiPageProps) {
  const { slug } = await params;
  const page = getFengShuiPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
