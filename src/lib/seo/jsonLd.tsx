import { AUTHOR, SITE } from "@/lib/constants";
import type { Crumb } from "@/components/shared/Breadcrumbs";
import type { FAQ } from "@/components/shared/FAQSection";
import { normalizeBreadcrumbs } from "@/lib/content/breadcrumbs";

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
  alternateName?: string | string[];
  datePublished?: string;
  dateModified?: string;
  image?: string;
  citations?: Array<{
    label: string;
    source: string;
    url?: string;
  }>;
  mentions?: Array<{
    name: string;
    url?: string;
  }>;
}

interface WebApplicationSchemaInput {
  name: string;
  alternateName?: string[];
  description: string;
  url: string;
  applicationCategory?: string;
  featureList?: string[];
}

interface ItemListSchemaInput {
  id?: string;
  name: string;
  description: string;
  url: string;
  itemType?: "WebPage" | "WebApplication";
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

interface DefinedTermSchemaInput {
  name: string;
  description: string;
  url: string;
  alternateName?: string | string[];
  definedTermSet?: {
    name: string;
    url: string;
  };
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function buildArticleDefinedTermSchema({
  headline,
  description,
  url,
  entityName,
  entityType,
  alternateName,
  datePublished,
  dateModified,
  image,
  citations,
  mentions,
}: ArticleSchemaInput): JsonLdNode {
  const articleType = entityType === "BlogPosting" ? "BlogPosting" : "Article";
  const entityNode = {
    "@type": ["Article", "BlogPosting"].includes(entityType) ? "Thing" : entityType,
    "@id": `${url}#topic`,
    name: entityName,
    ...(alternateName ? { alternateName } : {}),
    description,
  };

  return {
    "@context": "https://schema.org",
    "@type": articleType,
    "@id": `${url}#article`,
    inLanguage: "en",
    headline,
    name: entityName,
    ...(alternateName ? { alternateName } : {}),
    description,
    url,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE.url}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
    },
    about: entityNode,
    ...(citations?.length
      ? {
          citation: citations.map((citation) => ({
            "@type": "CreativeWork",
            name: citation.label,
            description: citation.source,
            ...(citation.url ? { url: citation.url } : {}),
          })),
        }
      : {}),
    ...(mentions?.length
      ? {
          mentions: mentions.map((mention) => ({
            "@type": "WebPage",
            name: mention.name,
            ...(mention.url
              ? { url: mention.url.startsWith("http") ? mention.url : `${SITE.url}${mention.url}` }
              : {}),
          })),
        }
      : {}),
    author: {
      "@type": "Organization",
      "@id": `${SITE.url}/about#editorial-team`,
      name: AUTHOR.name,
      url: AUTHOR.url,
      description: AUTHOR.description,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo-icon.svg`,
      },
    },
    mainEntity: entityNode,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function buildWebApplicationSchema({
  name,
  alternateName,
  description,
  url,
  applicationCategory = "LifestyleApplication",
  featureList,
}: WebApplicationSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name,
    ...(alternateName?.length ? { alternateName } : {}),
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

export function buildItemListSchema({
  id,
  name,
  description,
  url,
  items,
  itemType = "WebPage",
}: ItemListSchemaInput): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id ?? `${url}#list`,
    name,
    description,
    url,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": itemType,
        name: item.name,
        description: item.description,
        url: item.url,
      },
    })),
  };
}

export function buildCollectionPageSchema(input: ItemListSchemaInput): JsonLdNode {
  const { "@context": context, ...list } = buildItemListSchema(input);
  return {
    "@context": context,
    "@type": "CollectionPage",
    "@id": input.url,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: list,
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

export function buildDefinedTermSchema({
  name,
  description,
  url,
  alternateName,
  definedTermSet,
}: DefinedTermSchemaInput): JsonLdNode {
  const termId = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${url}#${termId}`,
    name,
    ...(alternateName ? { alternateName } : {}),
    description,
    url,
    ...(definedTermSet
      ? {
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: definedTermSet.name,
            url: definedTermSet.url,
          },
        }
      : {}),
  };
}

export function buildBreadcrumbListSchema(crumbs: Crumb[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizeBreadcrumbs(crumbs).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE.url}${crumb.href}`,
    })),
  };
}
