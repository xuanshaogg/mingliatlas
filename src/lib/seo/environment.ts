// Vercel previews contain the same content as production. Keep their URLs out
// of search while leaving pages crawlable so robots can read the noindex rule.
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";
