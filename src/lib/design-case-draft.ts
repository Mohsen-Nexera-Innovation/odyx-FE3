/**
 * Pending design case details carried from request form → checkout → inbox.
 */

import { INDICATION_LABEL } from '@/content/inbox';
import {
  indicationFromServiceSlug,
  isDesignServiceSlug,
} from '@/content/design-services';
import { clearPendingScan, readPendingScan } from '@/lib/pending-scan';
import { createThreadFromComposeApi } from '@/lib/inbox-api';
import type { AccountSession } from '@/lib/auth-session';
import { clearDesignCaseDraft, readDesignCaseDraft } from '@/lib/design-case-draft-storage';

export type { DesignCaseDraft } from '@/lib/design-case-draft-storage';
export {
  saveDesignCaseDraft,
  readDesignCaseDraft,
  clearDesignCaseDraft,
  DESIGN_CASE_DRAFT_KEY,
} from '@/lib/design-case-draft-storage';

/** After paid design checkout → inbox (case already submitted with scan). */
export function designInboxHandoffHref(input: {
  orderNumber: string;
  serviceSlug?: string | null;
  confirmed?: boolean;
  threadId?: string | null;
}): string {
  const draft = readDesignCaseDraft();
  const slug =
    (input.serviceSlug && isDesignServiceSlug(input.serviceSlug)
      ? input.serviceSlug
      : null) ??
    (draft?.serviceSlug && isDesignServiceSlug(draft.serviceSlug)
      ? draft.serviceSlug
      : null);

  const params = new URLSearchParams({
    order: input.orderNumber,
  });
  if (slug) params.set('service', slug);
  if (input.confirmed !== false) params.set('confirmed', '1');
  if (input.threadId) {
    params.set('thread', input.threadId);
  }
  return `/inbox?${params.toString()}`;
}

/**
 * After payment: create the design conversation using the pre-checkout STL.
 * Returns inbox href with confirmation + thread when possible.
 */
export async function finalizeDesignCaseAfterPayment(
  session: AccountSession,
  orderNumber: string,
): Promise<string> {
  const draft = readDesignCaseDraft();
  const scan = await readPendingScan();
  const indication = draft
    ? indicationFromServiceSlug(draft.serviceSlug)
    : null;

  const indicationLabel = indication
    ? INDICATION_LABEL[indication]
    : draft?.serviceName ?? 'Design service';

  const subject = draft
    ? `Order ${orderNumber} confirmed — ${indicationLabel}${draft.tooth ? ` ${draft.tooth}` : ''} (${draft.patientLabel})`
    : `Order ${orderNumber} confirmed`;

  const body =
    draft
      ? [
          `Service: ${indicationLabel}.`,
          `Patient: ${draft.patientLabel}.`,
          draft.tooth ? `Tooth/site: ${draft.tooth}.` : null,
          `Turnaround: ${draft.sla === 'same_day' ? 'same day' : '24 hours'}.`,
          scan
            ? `Scan attached: ${scan.name}.`
            : draft.attachmentName
              ? `Scan: ${draft.attachmentName}.`
              : null,
          draft.notes?.trim() || null,
        ]
          .filter(Boolean)
          .join('\n')
      : `Design case submitted for order ${orderNumber}.`;

  if (!draft && !indication) {
    return designInboxHandoffHref({
      orderNumber,
      confirmed: true,
    });
  }

  async function createApiThread() {
    return createThreadFromComposeApi(session, {
      subject,
      body,
      attachmentName: scan?.name ?? draft?.attachmentName,
      orderNumber,
      patientId: draft?.patientId,
    });
  }

  try {
    let thread = null as Awaited<ReturnType<typeof createApiThread>> | null;
    let lastErr: unknown;
    for (let attempt = 0; attempt < 8; attempt++) {
      try {
        thread = await createApiThread();
        break;
      } catch (err) {
        lastErr = err;
        const msg = err instanceof Error ? err.message : String(err);
        const retryable = /must be paid|not found|pending/i.test(msg);
        if (!retryable || attempt === 7) throw err;
        await new Promise((r) => setTimeout(r, 700));
      }
    }
    if (!thread) throw lastErr instanceof Error ? lastErr : new Error('Could not open design case');

    await clearPendingScan();
    clearDesignCaseDraft();
    return designInboxHandoffHref({
      orderNumber,
      serviceSlug: draft?.serviceSlug,
      confirmed: true,
      threadId: thread.id,
    });
  } catch {
    return designInboxHandoffHref({
      orderNumber,
      serviceSlug: draft?.serviceSlug,
      confirmed: true,
    });
  }
}
