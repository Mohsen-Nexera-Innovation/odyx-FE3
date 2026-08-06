import { apiFetch } from '@/lib/api/client';

export type LeadClientType = 'DENTIST' | 'LAB' | 'OTHER';

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string;
  org?: string;
  clientType: LeadClientType;
  note?: string;
  scenario: Record<string, unknown>;
};

export type QuoteRequestProduct =
  | 'scanner'
  | 'printer'
  | 'cure'
  | 'resin'
  | 'ecosystem';

export type CreateQuoteRequestInput = {
  fullName: string;
  clinicName: string;
  phone: string;
  email: string;
  city: string;
  product: QuoteRequestProduct;
  message?: string;
};

export type ApiLead = {
  id: string;
  source: string;
  status: string;
  name: string;
  email: string;
  phone?: string | null;
  org?: string | null;
  clientType: LeadClientType;
  note?: string | null;
  scenario: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export function createLeadApi(input: CreateLeadInput) {
  return apiFetch<ApiLead>('/leads', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function createQuoteRequestApi(input: CreateQuoteRequestInput) {
  return apiFetch<ApiLead>('/leads/quote-request', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function listLeadsApi() {
  return apiFetch<ApiLead[]>('/admin/leads', { auth: true });
}
