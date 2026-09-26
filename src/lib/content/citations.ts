interface CitationLike {
  label: string;
  url?: string;
}

const CITATION_URL_RULES: Array<{ match: RegExp; url: string }> = [
  {
    match: /Yuan Hai Zi Ping|渊海子平/i,
    url: "https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3",
  },
  {
    match: /San Ming Tong Hui|三命通会|三命通會/i,
    url: "https://zh.wikisource.org/wiki/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83",
  },
  {
    match: /Huangdi Neijing|黄帝内经|黃帝內經/i,
    url: "https://zh.wikisource.org/wiki/%E9%BB%83%E5%B8%9D%E5%85%A7%E7%B6%93",
  },
  {
    match: /Alfred Huang.*Complete I Ching|Complete I Ching.*Alfred Huang/i,
    url: "https://www.innertraditions.com/books/the-complete-i-ching-10th-anniversary-edition-590",
  },
  {
    match: /Zhouyi|周易/i,
    url: "https://zh.wikisource.org/wiki/%E5%91%A8%E6%98%93",
  },
  {
    match: /Hong Kong Observatory.*calendar|Gregorian.Lunar.*conversion/i,
    url: "https://www.hko.gov.hk/en/gts/time/conversion.htm",
  },
  {
    match: /Martin Palmer|T['’]?ung Shu/i,
    url: "https://books.google.com/books?q=Martin+Palmer+Tung+Shu+Ancient+Chinese+Almanac",
  },
  {
    match: /Wolfram Eberhard|Dictionary of Chinese Symbols/i,
    url: "https://books.google.com/books?q=Wolfram+Eberhard+Dictionary+of+Chinese+Symbols",
  },
];

export function resolveCitationUrls<T extends CitationLike>(citations: readonly T[]): T[] {
  return citations.map((citation) => {
    if (citation.url) return citation;
    const rule = CITATION_URL_RULES.find((candidate) => candidate.match.test(citation.label));
    return rule ? { ...citation, url: rule.url } : citation;
  });
}
