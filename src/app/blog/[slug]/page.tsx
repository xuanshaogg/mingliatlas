import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getBlogPage, getBlogStaticParams } from "@/content/blog/posts";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getBlogStaticParams();
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBlogPage(slug);

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

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const page = getBlogPage(slug);

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
