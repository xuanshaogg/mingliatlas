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

interface WebApplicationSchemaInput {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  featureList?: string[];
}

interface ItemListSchemaInput {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    description: string;
    url: string;
  }>;
}

interface HowToSchemaInput {
  name: string;
  description: string;
  url: string;
  steps: string[];
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

export function buildWebApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "LifestyleApplication",
  featureList,
}: WebApplicationSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name,
    applicationCategory,
    operatingSystem: "Web",
    url,
    description,
    ...(featureList?.length ? { featureList } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function buildItemListSchema({ name, description, url, items }: ItemListSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: item.name,
        description: item.description,
        url: item.url,
      },
    })),
  };
}

export function buildHowToSchema({ name, description, url, steps }: HowToSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
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
