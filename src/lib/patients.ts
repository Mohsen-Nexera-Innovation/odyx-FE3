/**
 * Clinic patients — Nest /patients API.
 */

import {
  createPatientApi,
  listPatientsApi,
  type ApiPatient,
  type PatientSex,
} from '@/lib/api/patients';
import type { AccountSession } from '@/lib/auth-session';

export type { PatientSex };

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  ref?: string;
  sex: PatientSex;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

function mapApi(p: ApiPatient): Patient {
  return {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    ref: p.ref ?? undefined,
    sex: p.sex,
    notes: p.notes ?? undefined,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export function patientLabel(p: Pick<Patient, 'firstName' | 'lastName' | 'ref'>): string {
  const name = `${p.firstName} ${p.lastName}`.trim();
  return p.ref ? `${name} (${p.ref})` : name;
}

export async function listPatients(_session: AccountSession): Promise<Patient[]> {
  const list = await listPatientsApi();
  return list.map(mapApi);
}

export async function createPatient(
  _session: AccountSession,
  input: {
    firstName: string;
    lastName: string;
    ref?: string;
    sex?: PatientSex;
    notes?: string;
  },
): Promise<Patient> {
  return mapApi(await createPatientApi(input));
}
