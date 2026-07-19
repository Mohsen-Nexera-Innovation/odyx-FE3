import { apiFetch } from '@/lib/api/client';

export type PatientSex = 'MALE' | 'FEMALE' | 'UNSPECIFIED';

export type ApiPatient = {
  id: string;
  ownerId: string;
  firstName: string;
  lastName: string;
  ref?: string | null;
  sex: PatientSex;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function listPatientsApi() {
  return apiFetch<ApiPatient[]>('/patients', { auth: true });
}

export function createPatientApi(input: {
  firstName: string;
  lastName: string;
  ref?: string;
  sex?: PatientSex;
  notes?: string;
}) {
  return apiFetch<ApiPatient>('/patients', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function updatePatientApi(
  id: string,
  input: {
    firstName?: string;
    lastName?: string;
    ref?: string;
    sex?: PatientSex;
    notes?: string;
  },
) {
  return apiFetch<ApiPatient>(`/patients/${id}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(input),
  });
}
