export function extractInitialNextJsUrls(html, pageUrl) {
  const page = new URL(pageUrl);
  const urls = new Set();
  const scriptTags = html.match(/<script\b[^>]*>/gi) ?? [];

  for (const tag of scriptTags) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (!src) continue;

    const url = new URL(src, page);
    if (url.origin !== page.origin) continue;
    if (!url.pathname.startsWith("/_next/static/") || !url.pathname.endsWith(".js")) continue;

    urls.add(url.href);
  }

  return [...urls];
}

export async function measureInitialNextJsBytes({ html, pageUrl, fetchImpl = fetch }) {
  const scriptUrls = extractInitialNextJsUrls(html, pageUrl);
  const sizes = await Promise.all(
    scriptUrls.map(async (url) => {
      const response = await fetchImpl(url);
      if (!response.ok) {
        throw new Error(`${url} expected 200, got ${response.status}`);
      }
      return (await response.arrayBuffer()).byteLength;
    }),
  );

  return {
    scriptUrls,
    totalBytes: sizes.reduce((total, size) => total + size, 0),
  };
}
