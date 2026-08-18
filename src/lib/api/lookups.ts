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

export function listCountriesApi() {
  return apiFetch<ApiCountry[]>('/countries', { auth: true });
}

export function listMaterialsApi() {
  return apiFetch<ApiMaterial[]>('/materials', { auth: true });
}

export function listDesignTypesApi() {
  return apiFetch<ApiDesignType[]>('/design-types', { auth: true });
}
