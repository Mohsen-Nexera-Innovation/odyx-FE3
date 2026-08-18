import type {
  DemoApplicationId,
  DemoProductId,
  DemoRoleId,
  DemoTypeId,
} from '@/content/request-demo';
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

export type DemoRequestRole = DemoRoleId;
export type DemoRequestProduct = DemoProductId;
export type DemoRequestApplication = DemoApplicationId;
export type DemoRequestType = DemoTypeId;

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

export type WarrantyClaimProduct =
  | 's1-scanner'
  | 'p1-26-printer'
  | 'cure-unit'
  | 'resin-materials';

export type CreateWarrantyClaimInput = {
  fullName: string;
  email: string;
  phone: string;
  clinicName?: string;
  product: WarrantyClaimProduct;
  serialNumber: string;
  purchaseDate: string;
  dealer: string;
  problemDescription: string;
  invoice?: File | null;
  evidence?: File[];
};

export function createWarrantyClaimApi(input: CreateWarrantyClaimInput) {
  const body = new FormData();
  body.append('fullName', input.fullName);
  body.append('email', input.email);
  body.append('phone', input.phone);
  if (input.clinicName?.trim()) body.append('clinicName', input.clinicName.trim());
  body.append('product', input.product);
  body.append('serialNumber', input.serialNumber);
  body.append('purchaseDate', input.purchaseDate);
  body.append('dealer', input.dealer);
  body.append('problemDescription', input.problemDescription);
  if (input.invoice) body.append('invoice', input.invoice);
  for (const file of input.evidence ?? []) {
    body.append('evidence', file);
  }

  return apiFetch<ApiLead>('/leads/warranty-claim', {
    method: 'POST',
    body,
  });
}

export function listLeadsApi() {
  return apiFetch<ApiLead[]>('/admin/leads', { auth: true });
}
