/**
 * Clinic patients — demo localStorage or Nest /patients API.
 */

import {
  createPatientApi,
  listPatientsApi,
  type ApiPatient,
  type PatientSex,
} from '@/lib/api/patients';
import { isApiMode } from '@/lib/config';
import type { AccountSession } from '@/lib/auth-store';

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

const STORAGE_KEY = 'odyx_patients';

function ownerKey(session: AccountSession): string {
  return session.email.trim().toLowerCase() || 'anon';
}

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

function readDemo(session: AccountSession): Patient[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Record<string, Patient[]>;
    return all[ownerKey(session)] ?? [];
  } catch {
    return [];
  }
}

function writeDemo(session: AccountSession, patients: Patient[]) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, Patient[]>) : {};
    all[ownerKey(session)] = patients;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

export function patientLabel(p: Pick<Patient, 'firstName' | 'lastName' | 'ref'>): string {
  const name = `${p.firstName} ${p.lastName}`.trim();
  return p.ref ? `${name} (${p.ref})` : name;
}

export async function listPatients(session: AccountSession): Promise<Patient[]> {
  if (!isApiMode()) {
    return readDemo(session).sort((a, b) =>
      a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName),
    );
  }
  const list = await listPatientsApi();
  return list.map(mapApi);
}

export async function createPatient(
  session: AccountSession,
  input: {
    firstName: string;
    lastName: string;
    ref?: string;
    sex?: PatientSex;
    notes?: string;
  },
): Promise<Patient> {
  if (!isApiMode()) {
    const now = new Date().toISOString();
    const patient: Patient = {
      id: `pt-${Date.now()}`,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      ref: input.ref?.trim() || undefined,
      sex: input.sex ?? 'UNSPECIFIED',
      notes: input.notes?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };
    writeDemo(session, [patient, ...readDemo(session)]);
    return patient;
  }
  return mapApi(await createPatientApi(input));
}
