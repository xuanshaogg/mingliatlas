import type { Metadata } from "next";
import { AUTHOR, SITE } from "@/lib/constants";
import { isIndexablePath } from "@/lib/content/indexing";
import { canonicalContentPath } from "@/lib/content/urls";
import { isPreviewDeployment } from "./environment";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  datePublished?: string;
  dateModified?: string;
}

interface KnowledgeMetadataInput extends PageMetadataInput {
  data: {
    ogImage?: string;
    schema: {
      url: string;
      image?: string;
      datePublished?: string;
      dateModified?: string;
      jsonLd?: { "@type": string | string[] };
    };
  };
}

export function buildPageMetadata(page: PageMetadataInput): Metadata {
  const indexable = !isPreviewDeployment && isIndexablePath(page.path);
  const canonical = canonicalContentPath(page.path);
  const shareImage = page.image ?? "/opengraph-image";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    robots: {
      index: indexable,
      follow: !isPreviewDeployment,
      googleBot: {
        index: indexable,
        follow: !isPreviewDeployment,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: page.type ?? "website",
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: shareImage, alt: page.image ? page.title : `${SITE.name} guides and tools` }],
      ...(page.type === "article"
        ? {
            publishedTime: page.datePublished,
            modifiedTime: page.dateModified,
            authors: [AUTHOR.url],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [shareImage],
    },
  };
}

export function buildKnowledgePageMetadata(page: KnowledgeMetadataInput): Metadata {
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: page.data.schema.jsonLd?.["@type"] === "CollectionPage" ? "website" : "article",
    image: page.data.schema.image ?? page.data.ogImage,
    datePublished: page.data.schema.datePublished,
    dateModified: page.data.schema.dateModified,
  });
}
