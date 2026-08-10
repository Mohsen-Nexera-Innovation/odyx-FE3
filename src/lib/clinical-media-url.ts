/**
 * Clinical case photo URLs.
 *
 * Prefer Cloudflare R2 when `NEXT_PUBLIC_MEDIA_BASE_URL` is set
 * (`{base}/case-library/static/{file}`). Falls back to the same public R2
 * host used in Docker/CI so local `npm run dev` still loads case photos
 * when the env var is unset (local `/img/clinical-cases` is not shipped).
 */
const DEFAULT_MEDIA_BASE_URL =
  'https://pub-db35b93ad4f34a89afa6d99f4bc4aba9.r2.dev';

export function clinicalCaseMedia(filename: string): string {
  const base = (
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || DEFAULT_MEDIA_BASE_URL
  ).replace(/\/+$/, '');
  return `${base}/case-library/static/${filename}`;
}
