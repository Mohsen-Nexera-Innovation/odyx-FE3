import { apiFetch, apiFetchBlob } from '@/lib/api/client';
import type { ApiCase, CaseStatus } from '@/lib/api/cases';

export type DesignRequestStaffStatus = Exclude<CaseStatus, 'DRAFT'>;

export type ApiDesignRequest = ApiCase & {
  owner?: { id: string; name: string; email: string };
};

export function listDesignRequestsApi() {
  return apiFetch<ApiDesignRequest[]>('/admin/design-requests', { auth: true });
}

export function getDesignRequestApi(id: string) {
  return apiFetch<ApiDesignRequest>(`/admin/design-requests/${id}`, { auth: true });
}

export function updateDesignRequestStatusApi(id: string, status: DesignRequestStaffStatus) {
  return apiFetch<ApiDesignRequest>(`/admin/design-requests/${id}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({ status }),
  });
}

export async function downloadDesignRequestFileApi(
  requestId: string,
  fileId: string,
  fallbackName: string,
) {
  const { blob, filename } = await apiFetchBlob(
    `/admin/design-requests/${requestId}/files/${fileId}/download`,
    { auth: true },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
