import { apiFetch } from '@/lib/api/client';
import { getApiBaseUrl } from '@/lib/config';

export type ShowcaseApplication =
  | 'RESTORATIVE'
  | 'IMPLANT'
  | 'ORTHODONTIC'
  | 'DENTURE'
  | 'PROSTHETICS'
  | 'OTHER';

export type ShowcaseCase = {
  id: string;
  slug: string;
  title: string;
  badge: string;
  application: ShowcaseApplication;
  tags: string[];
  summary?: string | null;
  coverImageUrl: string;
  coverImageAlt?: string | null;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
  href?: string | null;
  productKeys: string[];
  products: { id: string; img: string; alt: string }[];
  moreProducts: number;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CaseLibraryBrowseItem = {
  id: string;
  title: string;
  href: string;
  img: string;
  imgAlt: string;
  countLabel: string;
  count: number;
  icon?: 'restorative' | 'implant' | 'orthodontic' | 'denture';
};

export type CaseLibraryPublic = {
  cases: ShowcaseCase[];
  featured: ShowcaseCase[];
  applications: CaseLibraryBrowseItem[];
  products: CaseLibraryBrowseItem[];
};

export type ShowcaseCaseInput = {
  slug: string;
  title: string;
  badge: string;
  application: ShowcaseApplication;
  tags?: string[];
  summary?: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  href?: string;
  productKeys?: string[];
  published?: boolean;
  featured?: boolean;
  sortOrder?: number;
};

export type UploadedMedia = {
  url: string;
  key: string;
  mimeType: string;
  sizeBytes: number;
};

/** Resolve DB media paths (`/media/...`) against the API host; leave FE `/img/...` alone. */
export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/media/')) {
    const base = getApiBaseUrl();
    return base ? `${base}${path}` : path;
  }
  return path;
}

export function listCaseLibraryPublicApi() {
  return apiFetch<CaseLibraryPublic>('/case-library');
}

export function getShowcaseCaseBySlugApi(slug: string) {
  return apiFetch<ShowcaseCase>(`/case-library/${encodeURIComponent(slug)}`);
}

export function listShowcaseCasesAdminApi() {
  return apiFetch<ShowcaseCase[]>('/admin/case-library', { auth: true });
}

export function createShowcaseCaseApi(input: ShowcaseCaseInput) {
  return apiFetch<ShowcaseCase>('/admin/case-library', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function updateShowcaseCaseApi(
  id: string,
  input: Partial<ShowcaseCaseInput>,
) {
  return apiFetch<ShowcaseCase>(`/admin/case-library/${id}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function deleteShowcaseCaseApi(id: string) {
  return apiFetch<{ ok: boolean }>(`/admin/case-library/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

export function uploadShowcaseImageApi(file: File) {
  const body = new FormData();
  body.append('file', file);
  return apiFetch<UploadedMedia>('/admin/case-library/upload', {
    method: 'POST',
    auth: true,
    body,
  });
}
