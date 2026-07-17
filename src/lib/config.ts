function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const API_BASE_URL = requireEnv(
  'NEXT_PUBLIC_API_BASE_URL',
  process.env.NEXT_PUBLIC_API_BASE_URL,
);

/**
 * Single-storefront for now: this company's slug is baked in at build/runtime
 * via env. A multi-domain deployment would instead resolve this per-request
 * from the Host header (Next.js middleware) and thread it through — the API
 * itself is already multi-tenant and slug-scoped, so nothing else changes.
 */
export const COMPANY_SLUG = requireEnv(
  'NEXT_PUBLIC_COMPANY_SLUG',
  process.env.NEXT_PUBLIC_COMPANY_SLUG,
);
