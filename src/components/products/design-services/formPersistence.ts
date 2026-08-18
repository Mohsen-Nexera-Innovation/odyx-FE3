/**
 * Persist /products/design-services wizard fields across reload.
 * JSON in sessionStorage; STL / intraoral binaries in IndexedDB.
 */

import {
  INITIAL_CASE_DATA,
  type CaseDetails,
  type CaseSubmissionData,
  type DoctorInformation,
  type PaymentMethod,
  type RestorationShade,
  type RestorativeMaterial,
  type SendMethod,
} from './types';

export const FORM_DRAFT_KEY = 'odyx_products_design_services_form';

const DB_NAME = 'odyx_products_design_services';
const STORE = 'attachments';
const STL_KEY = 'stl';
const INTRAORAL_KEY = 'intraoral';

type StoredForm = {
  version: 1;
  currentStep: number;
  caseId?: string;
  doctor: DoctorInformation;
  caseDetails: CaseDetails;
  sendMethod: SendMethod;
  paymentMethod: PaymentMethod;
  confirmed: boolean;
};

type StoredFile = {
  name: string;
  type: string;
  size: number;
  blob: Blob;
};

const MATERIALS = new Set<string>(['Printed', 'Milled']);
const SHADES = new Set<string>(['A1', 'A2', 'A3']);
const SEND = new Set<string>(['whatsapp', 'email', '']);
const PAY = new Set<string>(['instapay', 'paymob', '']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function mergeDoctor(raw: unknown): DoctorInformation {
  const src = isRecord(raw) ? raw : {};
  return {
    fullName: str(src.fullName),
    email: str(src.email),
    countryCode: str(src.countryCode, INITIAL_CASE_DATA.doctor.countryCode),
    whatsapp: str(src.whatsapp),
    clinicName: str(src.clinicName),
    country: str(src.country),
    city: str(src.city),
    address: str(src.address),
  };
}

function mergeCaseDetails(raw: unknown): CaseDetails {
  const src = isRecord(raw) ? raw : {};
  const material = str(src.material, INITIAL_CASE_DATA.caseDetails.material);
  const shade = str(src.shade, INITIAL_CASE_DATA.caseDetails.shade);
  return {
    designType: str(src.designType, INITIAL_CASE_DATA.caseDetails.designType),
    toothNumbers: str(src.toothNumbers),
    material: (MATERIALS.has(material) ? material : INITIAL_CASE_DATA.caseDetails.material) as RestorativeMaterial | '',
    shade: (SHADES.has(shade) ? shade : INITIAL_CASE_DATA.caseDetails.shade) as RestorationShade | '',
    colorNotes: str(src.colorNotes),
    instructions: str(src.instructions),
  };
}

function parseStored(raw: string): StoredForm | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== 1) return null;
    const step = Number(parsed.currentStep);
    const sendMethod = str(parsed.sendMethod);
    const paymentMethod = str(parsed.paymentMethod);
    return {
      version: 1,
      currentStep: Number.isFinite(step) ? Math.max(1, Math.min(5, Math.trunc(step))) : 1,
      caseId: typeof parsed.caseId === 'string' && parsed.caseId ? parsed.caseId : undefined,
      doctor: mergeDoctor(parsed.doctor),
      caseDetails: mergeCaseDetails(parsed.caseDetails),
      sendMethod: (SEND.has(sendMethod) ? sendMethod : '') as SendMethod,
      paymentMethod: (PAY.has(paymentMethod) ? paymentMethod : '') as PaymentMethod,
      confirmed: parsed.confirmed === true,
    };
  } catch {
    return null;
  }
}

function fileFromStored(row: StoredFile | null | undefined): File | null {
  if (!row?.blob) return null;
  return new File([row.blob], row.name, { type: row.type || 'application/octet-stream' });
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
  });
}

async function putFile(key: string, file: File | null): Promise<void> {
  if (typeof window === 'undefined') return;
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    if (file) {
      tx.objectStore(STORE).put(
        { name: file.name, type: file.type, size: file.size, blob: file },
        key,
      );
    } else {
      tx.objectStore(STORE).delete(key);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Failed to save attachment'));
  });
  db.close();
}

async function getFile(key: string): Promise<File | null> {
  if (typeof window === 'undefined') return null;
  const db = await openDb();
  const row = await new Promise<StoredFile | null>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve((req.result as StoredFile | undefined) ?? null);
    req.onerror = () => reject(req.error ?? new Error('Failed to read attachment'));
  });
  db.close();
  return fileFromStored(row);
}

async function clearFiles(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('Failed to clear attachments'));
    });
    db.close();
  } catch {
    /* ignore */
  }
}

export async function readFormDraft(): Promise<{
  currentStep: number;
  caseId?: string;
  data: CaseSubmissionData;
} | null> {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(FORM_DRAFT_KEY);
    if (!raw) return null;
    const stored = parseStored(raw);
    if (!stored) return null;
    const [stlFile, intraoralFile] = await Promise.all([
      getFile(STL_KEY),
      getFile(INTRAORAL_KEY),
    ]);
    return {
      currentStep: stored.currentStep,
      caseId: stored.caseId,
      data: {
        doctor: stored.doctor,
        caseDetails: stored.caseDetails,
        sendMethod: stored.sendMethod,
        attachments: { stlFile, intraoralFile },
        paymentMethod: stored.paymentMethod,
        confirmed: stored.confirmed,
      },
    };
  } catch {
    return null;
  }
}

export async function saveFormDraft(
  currentStep: number,
  data: CaseSubmissionData,
  caseId?: string,
): Promise<void> {
  if (typeof window === 'undefined') return;
  const payload: StoredForm = {
    version: 1,
    currentStep,
    caseId,
    doctor: data.doctor,
    caseDetails: data.caseDetails,
    sendMethod: data.sendMethod,
    paymentMethod: data.paymentMethod,
    confirmed: data.confirmed,
  };
  try {
    sessionStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
  try {
    await Promise.all([
      putFile(STL_KEY, data.attachments.stlFile),
      putFile(INTRAORAL_KEY, data.attachments.intraoralFile),
    ]);
  } catch {
    /* ignore */
  }
}

export async function clearFormDraft(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(FORM_DRAFT_KEY);
  } catch {
    /* ignore */
  }
  await clearFiles();
}
