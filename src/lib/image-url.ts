const CLOUDINARY_URL_PATTERN = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\//;

// In dev, admin-ui saves uploads to its own public/uploads but stores a
// cloudinary-shaped URL in the DB (see admin-ui's src/app/api/uploads/route.ts
// and src/lib/image-url.ts), so dev/prod rows look identical. The file itself
// lives on admin-ui's dev server — not this app's own port — so that's the
// rewrite target here.
const ADMIN_UI_DEV_ORIGIN = 'http://localhost:3002';

export function resolveImageUrl(url: string): string;
export function resolveImageUrl(url: string | null | undefined): string | null | undefined;
export function resolveImageUrl(url: string | null | undefined) {
  if (!url) return url;
  if (process.env.NODE_ENV === 'production') return url;
  return url.replace(CLOUDINARY_URL_PATTERN, `${ADMIN_UI_DEV_ORIGIN}/uploads/`);
}
