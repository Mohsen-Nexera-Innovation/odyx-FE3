/**
 * Design case draft metadata (sessionStorage). Scan binary lives in pending-scan IndexedDB.
 */

import type { SlaTier } from '@/content/inbox';

export const DESIGN_CASE_DRAFT_KEY = 'odyx_design_case_draft';

export type DesignCaseDraft = {
  serviceSlug: string;
  serviceName: string;
  productId: string;
  patientId: string;
  patientLabel: string;
  tooth?: string;
  notes?: string;
  sla: SlaTier;
  attachmentName: string;
  attachmentSize: number;
  createdAt: string;
};

export function saveDesignCaseDraft(draft: DesignCaseDraft): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(DESIGN_CASE_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function readDesignCaseDraft(): DesignCaseDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(DESIGN_CASE_DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DesignCaseDraft;
  } catch {
    return null;
  }
}

export function clearDesignCaseDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(DESIGN_CASE_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
