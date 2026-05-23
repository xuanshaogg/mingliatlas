import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getIChingPage, getIChingStaticParams } from "@/content/i-ching/pages";

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

export default async function IChingPage({ params }: IChingPageProps) {
  const { slug } = await params;
  const page = getIChingPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
