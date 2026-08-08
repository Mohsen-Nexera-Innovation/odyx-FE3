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

export type DemoRequestRole =
  | 'dentist'
  | 'lab'
  | 'distributor'
  | 'university'
  | 'student'
  | 'other';

export type DemoRequestProduct =
  | 'scanner'
  | 'design'
  | 'printer'
  | 'cure'
  | 'resins'
  | 'workflow';

export type DemoRequestApplication =
  | 'crown-bridge'
  | 'implant'
  | 'surgical-guide'
  | 'orthodontics'
  | 'denture'
  | 'smile-design'
  | 'general';

export type DemoRequestType = 'online' | 'onsite' | 'distributor';

export type CreateDemoRequestInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  language?: string;
  role: DemoRequestRole;
  clinicName: string;
  chairs: string;
  specialty?: string;
  products: DemoRequestProduct[];
  applications?: DemoRequestApplication[];
  demoType: DemoRequestType;
  preferredDate: string;
  preferredTime: string;
  timezone?: string;
  notes?: string;
  marketingOptIn?: boolean;
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

export function createDemoRequestApi(input: CreateDemoRequestInput) {
  return apiFetch<ApiLead>('/leads/demo-request', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function listLeadsApi() {
  return apiFetch<ApiLead[]>('/admin/leads', { auth: true });
}
