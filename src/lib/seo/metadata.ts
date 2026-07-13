import type { Metadata } from "next";
import { AUTHOR, SITE } from "@/lib/constants";
import { isIndexablePath } from "@/lib/content/indexing";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  data: {
    schema: {
      url: string;
      datePublished?: string;
      dateModified?: string;
    };
  };
}

export function buildKnowledgePageMetadata(page: PageMetadataInput): Metadata {
  const indexable = isIndexablePath(page.path);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    robots: {
      index: indexable,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.data.schema.url,
      type: "article",
      siteName: SITE.name,
      publishedTime: page.data.schema.datePublished,
      modifiedTime: page.data.schema.dateModified,
      authors: [AUTHOR.name],
    },
  };
}
