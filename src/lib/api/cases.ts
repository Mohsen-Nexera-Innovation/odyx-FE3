import { apiFetch } from '@/lib/api/client';

export type CaseStatus = 'DRAFT' | 'SUBMITTED' | 'IN_DESIGN' | 'DELIVERED';
export type CaseSendMethod = 'DIGITAL' | 'PHYSICAL';

export type ApiCaseFile = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

export type ApiCase = {
  id: string;
  caseNumber: string;
  status: CaseStatus;
  doctorName: string | null;
  doctorEmail: string | null;
  doctorPhone: string | null;
  clinicName: string | null;
  countryId: string | null;
  country?: { id: string; code: string; name: string } | null;
  patientId: string | null;
  designTypeId: string | null;
  designType?: { id: string; slug: string; name: string } | null;
  materialId: string | null;
  material?: { id: string; slug: string; name: string } | null;
  toothNumbers: string[];
  shade: string | null;
  notes: string | null;
  sendMethod: CaseSendMethod | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingNotes: string | null;
  files: ApiCaseFile[];
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateDoctorBody = {
  doctorName?: string;
  doctorEmail?: string;
  doctorPhone?: string;
  clinicName?: string;
  countryId?: string | null;
};

export type UpdateDetailsBody = {
  patientId?: string | null;
  designTypeId?: string | null;
  materialId?: string | null;
  toothNumbers?: string[];
  shade?: string | null;
  notes?: string | null;
};

export type UpdateSendMethodBody = {
  sendMethod?: CaseSendMethod;
  shippingAddress?: string | null;
  shippingCity?: string | null;
  shippingNotes?: string | null;
};

export function createCaseApi() {
  return apiFetch<ApiCase>('/cases', { method: 'POST', auth: true });
}

export function getCaseApi(id: string) {
  return apiFetch<ApiCase>(`/cases/${id}`, { auth: true });
}

export function listCasesApi() {
  return apiFetch<ApiCase[]>('/cases', { auth: true });
}

export function updateCaseDoctorApi(id: string, body: UpdateDoctorBody) {
  return apiFetch<ApiCase>(`/cases/${id}/doctor`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(body),
  });
}

export function updateCaseDetailsApi(id: string, body: UpdateDetailsBody) {
  return apiFetch<ApiCase>(`/cases/${id}/details`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(body),
  });
}

export function updateCaseSendMethodApi(id: string, body: UpdateSendMethodBody) {
  return apiFetch<ApiCase>(`/cases/${id}/send-method`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(body),
  });
}

export function submitCaseApi(id: string) {
  return apiFetch<ApiCase>(`/cases/${id}/submit`, {
    method: 'POST',
    auth: true,
  });
}

export function uploadCaseFileApi(id: string, file: File) {
  const body = new FormData();
  body.append('file', file);
  return apiFetch<ApiCaseFile>(`/cases/${id}/files`, {
    method: 'POST',
    auth: true,
    body,
  });
}
