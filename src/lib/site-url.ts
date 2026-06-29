// Canonical site URL. On Vercel this resolves to the production domain even from
// preview deployments, so metadata, sitemap and JSON-LD stay consistent.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://web-persoweb.vercel.app";
