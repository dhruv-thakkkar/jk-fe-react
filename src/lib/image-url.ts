/**
 * admin-ui uploads (dev and prod) always go straight to Cloudinary now (see
 * admin-ui's src/app/api/uploads/route.ts), so stored URLs are always real,
 * directly renderable Cloudinary URLs — no rewriting needed. Kept as a
 * single pass-through hook in case a future need (e.g. Cloudinary
 * transformation params) wants one place to intercept every rendered image URL.
 */
export function resolveImageUrl(url: string): string;
export function resolveImageUrl(url: string | null | undefined): string | null | undefined;
export function resolveImageUrl(url: string | null | undefined) {
  return url;
}
