import {
  DESIGN_TEAM_EMAIL,
  DEMO_THREADS,
  INDICATION_LABEL,
  nextThreadRef,
  type CaseIndication,
  type InboxMessage,
  type InboxThread,
  type SlaTier,
} from '@/content/inbox';
import { readSession, type AccountSession } from '@/lib/auth';
import { notifyInboxChange } from '@/lib/inbox-store-events';

export { notifyInboxChange };

export type { AccountSession };

export const INBOX_STORAGE_KEY = 'odyx_inbox_threads';

export function ownerKey(session: AccountSession): string {
  if (session.role === 'guest') return 'guest-demo';
  return session.email.trim().toLowerCase();
}

function readAllThreads(): InboxThread[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INBOX_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as InboxThread[];
  } catch {
    return [];
  }
}

function writeAllThreads(threads: InboxThread[]) {
  localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify(threads));
}

export function listThreads(session: AccountSession): InboxThread[] {
  if (session.role === 'guest') {
    return [...DEMO_THREADS].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }
  return readAllThreads()
    .filter((t) => t.ownerKey === ownerKey(session))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getThread(session: AccountSession, threadId: string): InboxThread | undefined {
  return listThreads(session).find((t) => t.id === threadId);
}

export function unreadTotal(session: AccountSession): number {
  return listThreads(session).reduce(
    (n, t) => n + t.messages.filter((m) => m.direction === 'received' && !m.read).length,
    0,
  );
}

export function markThreadRead(session: AccountSession, threadId: string): InboxThread | undefined {
  if (session.role === 'guest') return getThread(session, threadId);
  const all = readAllThreads();
  const idx = all.findIndex((t) => t.id === threadId && t.ownerKey === ownerKey(session));
  if (idx === -1) return undefined;
  all[idx] = {
    ...all[idx],
    messages: all[idx].messages.map((m) =>
      m.direction === 'received' ? { ...m, read: true } : m,
    ),
  };
  writeAllThreads(all);
  notifyInboxChange();
  return all[idx];
}

export type ComposeInput = {
  indication: CaseIndication;
  patientRef?: string;
  tooth?: string;
  notes?: string;
  sla: SlaTier;
  resin?: string;
  printer?: string;
  batchRef?: string;
  stlFile: { name: string; size: number };
};

export function sendScanToDesignTeam(session: AccountSession, input: ComposeInput): InboxThread {
  if (session.role === 'guest') {
    throw new Error('Register to send scans to the design team.');
  }

  const all = readAllThreads();
  const now = new Date().toISOString();
  const id = `thread-${Date.now()}`;
  const ref = nextThreadRef(all);
  const subject = `Scan upload — ${INDICATION_LABEL[input.indication]}${input.tooth ? ` ${input.tooth}` : ''}${input.patientRef ? ` (${input.patientRef})` : ''}`;

  const sentMessage: InboxMessage = {
    id: `msg-${Date.now()}`,
    threadId: id,
    direction: 'sent',
    from: session.email,
    fromLabel: session.name,
    to: DESIGN_TEAM_EMAIL,
    toLabel: 'ODYX Design Team',
    subject,
    body:
      input.notes?.trim() ||
      `Please process the attached scan. Turnaround: ${input.sla === 'same_day' ? 'same day' : '24 hours'}.`,
    attachments: [
      {
        id: `att-${Date.now()}`,
        name: input.stlFile.name,
        size: input.stlFile.size,
        kind: 'scan',
      },
    ],
    at: now,
    read: true,
  };

  const thread: InboxThread = {
    id,
    ref,
    ownerKey: ownerKey(session),
    role: session.role === 'admin' ? 'dentist' : session.role,
    orgName: session.org,
    indication: input.indication,
    patientRef: input.patientRef,
    tooth: input.tooth,
    sla: input.sla,
    status: 'awaiting_design',
    resin: session.role === 'lab' ? input.resin : undefined,
    printer: session.role === 'lab' ? input.printer : undefined,
    batchRef: session.role === 'lab' ? input.batchRef : undefined,
    messages: [sentMessage],
    createdAt: now,
    updatedAt: now,
  };

  writeAllThreads([thread, ...all]);
  notifyInboxChange();
  return thread;
}

export function markDesignDownloaded(session: AccountSession, threadId: string): InboxThread | undefined {
  if (session.role === 'guest') return undefined;
  const all = readAllThreads();
  const idx = all.findIndex((t) => t.id === threadId && t.ownerKey === ownerKey(session));
  if (idx === -1) return undefined;
  const now = new Date().toISOString();
  all[idx] = { ...all[idx], status: 'completed', updatedAt: now };
  writeAllThreads(all);
  notifyInboxChange();
  return all[idx];
}

/** Demo: design team replies with STL after a short delay. */
export function scheduleDesignReply(session: AccountSession, threadId: string) {
  if (session.role === 'guest' || typeof window === 'undefined') return;

  window.setTimeout(() => {
    const all = readAllThreads();
    const idx = all.findIndex((t) => t.id === threadId && t.ownerKey === ownerKey(session));
    if (idx === -1) return;
    const thread = all[idx];
    if (thread.status !== 'awaiting_design') return;

    const now = new Date().toISOString();
    const designName = `${thread.indication}_design.stl`;
    const reply = {
      id: `msg-reply-${Date.now()}`,
      threadId,
      direction: 'received' as const,
      from: DESIGN_TEAM_EMAIL,
      fromLabel: 'ODYX Design Team',
      to: session.email,
      toLabel: session.name,
      subject: `Re: ${thread.messages[0]?.subject ?? thread.ref}`,
      body: `Your ${INDICATION_LABEL[thread.indication].toLowerCase()} design is ready. Validated for print — download below.`,
      attachments: [{ id: `att-design-${Date.now()}`, name: designName, size: 2_100_000, kind: 'design' as const }],
      at: now,
      read: false,
    };

    all[idx] = {
      ...thread,
      status: 'design_delivered',
      updatedAt: now,
      messages: [...thread.messages, reply],
    };
    writeAllThreads(all);
    notifyInboxChange();
  }, 8000);
}

export { readSession };
