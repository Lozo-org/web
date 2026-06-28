import "server-only";

// 21st.dev Registry/Magic config lives here.
// Put API_KEY_21ST in .env.local or in your deployment provider settings.
// 21ST_API_KEY is accepted as a legacy alias for this site.
// Do not prefix either key with NEXT_PUBLIC_ or import this file in Client Components.
export function get21stApiKey() {
  return process.env["API_KEY_21ST"] ?? process.env["21ST_API_KEY"] ?? null;
}
