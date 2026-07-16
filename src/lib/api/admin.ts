import { apiFetch } from '@/lib/api/client';

export type ApiPermission = {
  id: string;
  code: string;
  label: string;
  description?: string | null;
};

export type ApiRole = {
  id: string;
  name: string;
  description?: string | null;
  permissions: { permission: ApiPermission }[];
  _count?: { users: number };
};

export type ApiStaffUser = {
  id: string;
  email: string;
  name: string;
  accountType: 'STAFF';
  staffRank?: string | null;
  clientType?: string | null;
  status: string;
  roleId?: string | null;
  roleName?: string | null;
  permissions: string[];
  org?: string;
  country?: string;
};

export type ApiClientUser = {
  id: string;
  email: string;
  name: string;
  accountType: 'CLIENT';
  clientType?: string | null;
  status: string;
  phone?: string | null;
  org?: string | null;
  country?: string | null;
  createdAt: string;
};

export type ApiAdminOrder = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  contactName?: string | null;
  contactPhone: string;
  createdAt: string;
};

export function listPermissionsApi() {
  return apiFetch<ApiPermission[]>('/admin/permissions', { auth: true });
}

export function listRolesApi() {
  return apiFetch<ApiRole[]>('/admin/roles', { auth: true });
}

export function createRoleApi(input: {
  name: string;
  description?: string;
  permissionCodes: string[];
}) {
  return apiFetch<ApiRole>('/admin/roles', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function updateRoleApi(
  id: string,
  input: { name?: string; description?: string; permissionCodes?: string[] },
) {
  return apiFetch<ApiRole>(`/admin/roles/${id}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function listStaffApi() {
  return apiFetch<ApiStaffUser[]>('/admin/users', { auth: true });
}

export function listClientsApi() {
  return apiFetch<ApiClientUser[]>('/admin/clients', { auth: true });
}

export function inviteStaffApi(input: {
  email: string;
  roleId: string;
  name?: string;
}) {
  return apiFetch<{
    ok: boolean;
    email: string;
    roleId: string;
    expiresAt: string;
    inviteToken: string;
  }>('/admin/users/invite', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function updateStaffApi(
  id: string,
  input: { roleId?: string | null; status?: string },
) {
  return apiFetch<ApiStaffUser>(`/admin/users/${id}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function listAdminOrdersApi() {
  return apiFetch<ApiAdminOrder[]>('/admin/orders', { auth: true });
}

export function confirmOrderApi(id: string) {
  return apiFetch<ApiAdminOrder>(`/admin/orders/${id}/confirm`, {
    method: 'POST',
    auth: true,
  });
}

export function shipOrderApi(id: string) {
  return apiFetch<ApiAdminOrder>(`/admin/orders/${id}/ship`, {
    method: 'POST',
    auth: true,
  });
}
