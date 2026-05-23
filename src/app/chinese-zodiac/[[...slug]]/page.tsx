import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getZodiacPage, getZodiacStaticParams } from "@/content/zodiac/pages";

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

export default async function ZodiacPage({ params }: ZodiacPageProps) {
  const { slug } = await params;
  const page = getZodiacPage(slugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
