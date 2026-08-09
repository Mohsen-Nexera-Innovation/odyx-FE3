/**
 * Clinical case photo URLs.
 *
 * Prefer Cloudflare R2 when `NEXT_PUBLIC_MEDIA_BASE_URL` is set
 * (`{base}/case-library/static/{file}`).
 * Otherwise fall back to public assets at `/img/clinical-cases/{file}`
 * (same paths used on the deployed site).
 */
export function clinicalCaseMedia(filename: string): string {
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, '');
  if (base) {
    return `${base}/case-library/static/${filename}`;
  }
  return `/img/clinical-cases/${filename}`;
}
