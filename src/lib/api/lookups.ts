import { apiFetch } from '@/lib/api/client';

export type ApiCountry = {
  id: string;
  code: string;
  name: string;
};

export type ApiMaterial = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
};

export type ApiDesignType = {
  id: string;
  slug: string;
  name: string;
};

function asList<T extends { id: string }>(raw: unknown): T[] {
  if (Array.isArray(raw)) {
    return raw.filter((row): row is T => Boolean(row && typeof row === 'object' && 'id' in row));
  }
  if (raw && typeof raw === 'object') {
    const record = raw as Record<string, unknown>;
    for (const key of ['data', 'items', 'results']) {
      if (Array.isArray(record[key])) return asList<T>(record[key]);
    }
  }
  return [];
}

export async function listCountriesApi() {
  return asList<ApiCountry>(await apiFetch<unknown>('/countries', { auth: true }));
}

export async function listMaterialsApi() {
  return asList<ApiMaterial>(await apiFetch<unknown>('/materials', { auth: true }));
}

export async function listDesignTypesApi() {
  return asList<ApiDesignType>(await apiFetch<unknown>('/design-types', { auth: true }));
}
