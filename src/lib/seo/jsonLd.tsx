import { SITE } from "@/lib/constants";
import type { Crumb } from "@/components/shared/Breadcrumbs";
import type { FAQ } from "@/components/shared/FAQSection";

interface SchemaBase {
  "@context": "https://schema.org";
  "@type": string | string[];
}

export interface JsonLdNode extends SchemaBase {
  [key: string]: unknown;
}

interface JsonLdProps {
  data: JsonLdNode | JsonLdNode[];
}

interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  entityName: string;
  entityType: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function buildArticleDefinedTermSchema({
  headline,
  description,
  url,
  entityName,
  entityType,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": ["Article", entityType],
    headline,
    name: entityName,
    description,
    url,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE.url}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo-icon.svg`,
      },
    },
    mainEntity: {
      "@type": entityType,
      name: entityName,
      description,
    },
  };
}

export function buildFAQPageSchema(faqs: FAQ[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbListSchema(crumbs: Crumb[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE.url}${crumb.href}`,
    })),
  };
}
