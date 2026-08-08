/**
 * Clinical case photo URLs on Cloudflare R2 (`case-library/static/…`).
 * Requires NEXT_PUBLIC_MEDIA_BASE_URL (R2 public base, no trailing slash).
 */
export function clinicalCaseMedia(filename: string): string {
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, '');
  if (!base) {
    throw new Error(
      'NEXT_PUBLIC_MEDIA_BASE_URL is required for clinical case photos (Cloudflare R2).',
    );
  }
  return `${base}/case-library/static/${filename}`;
}
