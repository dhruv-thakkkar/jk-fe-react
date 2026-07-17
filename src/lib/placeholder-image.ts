/**
 * Destinations have no image field yet, and a package may not have an admin-
 * uploaded cover image. Falls back to a deterministic placeholder (seeded by
 * slug, so it's stable across reloads) — same approach the travelora template
 * itself uses for every image. Swap for real images once uploaded via the
 * admin panel's package-images endpoints.
 */
export function placeholderImage(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
