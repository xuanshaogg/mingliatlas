import { SITE } from "@/lib/constants";

interface OrganizationSchemaProps {
  socialLinks?: string[];
}

export default function OrganizationSchema({
  socialLinks = [],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo-icon.svg`,
    description: SITE.description,
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
