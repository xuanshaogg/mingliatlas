import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/templates/KnowledgePage";
import { getBlogPage, getBlogStaticParams } from "@/content/blog/posts";
import { buildKnowledgePageMetadata } from "@/lib/seo/metadata";

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

  return buildKnowledgePageMetadata(page);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const page = getBlogPage(slug);

  if (!page) {
    notFound();
  }

  return <KnowledgePage {...page.data} />;
}
