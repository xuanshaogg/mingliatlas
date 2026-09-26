import { SITE } from "@/lib/constants";
import { JsonLd } from "@/lib/seo/jsonLd";

interface OrganizationSchemaProps {
  socialLinks?: string[];
}

export default function OrganizationSchema({ socialLinks = [] }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org" as const,
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    logo: `${SITE.url}/logo-icon.svg`,
    description: SITE.description,
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };

  return <JsonLd data={schema} />;
}
