import RelatedLinks, { type RelatedLink } from "./RelatedLinks";

interface RelatedContentProps {
  links: RelatedLink[];
}

export default function RelatedContent({ links }: RelatedContentProps) {
  return <RelatedLinks links={links} />;
}
