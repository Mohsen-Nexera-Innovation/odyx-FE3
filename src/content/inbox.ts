/** Outlook-style inbox — threads with sent (scan) and received (design) messages. */

export const DESIGN_TEAM_EMAIL = 'design-team@odyx.dental';

export type SlaTier = 'same_day' | '24h';

export type CaseIndication =
  | 'single_unit'
  | 'digital_smile_design'
  | 'removable_partial_denture'
  | 'occlusal_splint'
  | 'surgical_guide'
  | 'other';

export type ThreadStatus = 'awaiting_design' | 'in_progress' | 'design_delivered' | 'completed';

export type InboxFolder = 'inbox' | 'sent' | 'all' | 'designs';

export type MessageAttachment = {
  id: string;
  name: string;
  size: number;
  kind: 'scan' | 'design';
};

export type InboxMessage = {
  id: string;
  threadId: string;
  direction: 'sent' | 'received';
  from: string;
  fromLabel: string;
  to: string;
  toLabel: string;
  subject: string;
  body: string;
  attachments: MessageAttachment[];
  at: string;
  read: boolean;
};

export type InboxThread = {
  id: string;
  ref: string;
  ownerKey: string;
  role: 'dentist' | 'lab' | 'guest';
  orgName?: string;
  indication: CaseIndication;
  patientRef?: string;
  tooth?: string;
  sla: SlaTier;
  status: ThreadStatus;
  resin?: string;
  printer?: string;
  batchRef?: string;
  /** Linked paid design-service order number (e.g. ODYX-123456). */
  orderNumber?: string;
  isDemo?: boolean;
  messages: InboxMessage[];
  updatedAt: string;
  createdAt: string;
};

/** How a design conversation was billed. */
export type DesignBillingKind = 'paid' | 'unpaid' | 'support';

/** Design-service case types that have a catalog price. */
export const PAID_DESIGN_INDICATIONS: CaseIndication[] = [
  'single_unit',
  'digital_smile_design',
  'removable_partial_denture',
  'occlusal_splint',
  'surgical_guide',
];

export function isPaidDesignIndication(indication: CaseIndication): boolean {
  return PAID_DESIGN_INDICATIONS.includes(indication);
}

export function designBillingKind(
  thread: Pick<InboxThread, 'indication' | 'orderNumber'>,
): DesignBillingKind {
  if (thread.orderNumber) return 'paid';
  if (isPaidDesignIndication(thread.indication)) return 'unpaid';
  return 'support';
}

export const DESIGN_BILLING_LABEL: Record<DesignBillingKind, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  support: 'Support',
};

export const INDICATION_LABEL: Record<CaseIndication, string> = {
  single_unit: 'Single Unit (crown/overlay/endocrown)',
  digital_smile_design: 'Digital Smile Design (Veneers)',
  removable_partial_denture: 'Removable Partial Denture',
  occlusal_splint: 'Occlusal Splint',
  surgical_guide: 'Surgical Guide',
  other: 'Other',
};

export const SLA_LABEL: Record<SlaTier, string> = {
  same_day: 'Same day',
  '24h': '24 hours',
};

export const THREAD_STATUS_LABEL: Record<ThreadStatus, string> = {
  awaiting_design: 'Awaiting design',
  in_progress: 'In progress',
  design_delivered: 'Design delivered',
  completed: 'Completed',
};

export const RESIN_OPTIONS = [
  'ODYX Crown & Bridge',
  'ODYX Surgical Guide',
  'ODYX Model Gray',
  'ODYX Denture Base',
] as const;

export const PRINTER_OPTIONS = ['ODYX P1-26', 'Third-party LCD / DLP'] as const;

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString();

function sentMsg(
  threadId: string,
  id: string,
  from: string,
  fromLabel: string,
  subject: string,
  body: string,
  attachments: MessageAttachment[],
  at: string,
): InboxMessage {
  return {
    id,
    threadId,
    direction: 'sent',
    from,
    fromLabel,
    to: DESIGN_TEAM_EMAIL,
    toLabel: 'ODYX Design Team',
    subject,
    body,
    attachments,
    at,
    read: true,
  };
}

function receivedMsg(
  threadId: string,
  id: string,
  subject: string,
  body: string,
  attachments: MessageAttachment[],
  at: string,
  read: boolean,
): InboxMessage {
  return {
    id,
    threadId,
    direction: 'received',
    from: DESIGN_TEAM_EMAIL,
    fromLabel: 'ODYX Design Team',
    to: 'you@clinic.com',
    toLabel: 'You',
    subject,
    body,
    attachments,
    at,
    read,
  };
}

/** Demo threads for guest preview. */
export const DEMO_THREADS: InboxThread[] = [
  {
    id: 'demo-t1',
    ref: 'ODYX-1042',
    ownerKey: 'guest-demo',
    role: 'dentist',
    orgName: 'Sample Clinic',
    indication: 'single_unit',
    patientRef: 'PT-204',
    tooth: '#14',
    sla: 'same_day',
    status: 'design_delivered',
    isDemo: true,
    createdAt: hoursAgo(26),
    updatedAt: hoursAgo(2),
    messages: [
      sentMsg(
        'demo-t1',
        'm1',
        'dr.sample@clinic.com',
        'Dr. Sample',
        'Scan upload — Single Unit #14 (PT-204)',
        'Please design a crown for tooth #14. Margin preference: chamfer. Same-day turnaround if possible.',
        [{ id: 'a1', name: 'scan_upper.stl', size: 4_200_000, kind: 'scan' }],
        hoursAgo(26),
      ),
      receivedMsg(
        'demo-t1',
        'm2',
        'Re: Scan upload — Single Unit #14 (PT-204)',
        'Your design is ready. Files attached — validated for ODYX Crown & Bridge resin. Let us know if you need adjustments.',
        [{ id: 'a2', name: 'crown_14_design.stl', size: 1_800_000, kind: 'design' }],
        hoursAgo(2),
        false,
      ),
    ],
  },
  {
    id: 'demo-t2',
    ref: 'ODYX-1038',
    ownerKey: 'guest-demo',
    role: 'lab',
    orgName: 'Sample Production Lab',
    indication: 'surgical_guide',
    patientRef: 'LB-881',
    sla: '24h',
    resin: 'ODYX Surgical Guide',
    printer: 'ODYX P1-26',
    batchRef: 'BATCH-03',
    status: 'in_progress',
    isDemo: true,
    createdAt: hoursAgo(52),
    updatedAt: hoursAgo(6),
    messages: [
      sentMsg(
        'demo-t2',
        'm3',
        'lab@production.com',
        'Sample Lab',
        'Scan bundle — Surgical Guide (BATCH-03)',
        'CBCT + intraoral scan attached. Target resin: ODYX Surgical Guide. Printer: ODYX P1-26.',
        [{ id: 'a3', name: 'cbct_guide_intake.zip', size: 12_400_000, kind: 'scan' }],
        hoursAgo(52),
      ),
      receivedMsg(
        'demo-t2',
        'm4',
        'Re: Scan bundle — Surgical Guide (BATCH-03)',
        'We received your files and started the design. Verifying sleeve offsets — on track for 24h SLA.',
        [],
        hoursAgo(6),
        true,
      ),
    ],
  },
  {
    id: 'demo-t3',
    ref: 'ODYX-1021',
    ownerKey: 'guest-demo',
    role: 'dentist',
    indication: 'digital_smile_design',
    patientRef: 'PT-188',
    tooth: 'Upper anterior',
    sla: '24h',
    status: 'completed',
    isDemo: true,
    createdAt: hoursAgo(120),
    updatedAt: hoursAgo(72),
    messages: [
      sentMsg(
        'demo-t3',
        'm5',
        'dr.sample@clinic.com',
        'Dr. Sample',
        'Scan upload — Digital Smile Design (Veneers)',
        'Smile design / veneer case for upper anteriors.',
        [{ id: 'a4', name: 'prep_scan.stl', size: 5_100_000, kind: 'scan' }],
        hoursAgo(120),
      ),
      receivedMsg(
        'demo-t3',
        'm6',
        'Re: Scan upload — Digital Smile Design (Veneers)',
        'Design package attached. Includes aesthetic proposal for your print workflow.',
        [{ id: 'a5', name: 'veneer_design_pack.zip', size: 3_200_000, kind: 'design' }],
        hoursAgo(72),
        true,
      ),
    ],
  },
];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatMessageDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const sameDay =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function threadPreview(thread: InboxThread): string {
  const last = thread.messages[thread.messages.length - 1];
  if (!last) return '';
  const prefix = last.direction === 'received' ? '' : 'You: ';
  return prefix + last.body.slice(0, 90) + (last.body.length > 90 ? '…' : '');
}

export function threadSubject(thread: InboxThread): string {
  return thread.messages[0]?.subject ?? `${INDICATION_LABEL[thread.indication]} — ${thread.ref}`;
}

export function unreadCount(thread: InboxThread): number {
  return thread.messages.filter((m) => m.direction === 'received' && !m.read).length;
}

export function hasDesignAttachment(thread: InboxThread): boolean {
  return thread.messages.some((m) =>
    m.attachments.some((a) => a.kind === 'design'),
  );
}

export function nextThreadRef(threads: InboxThread[]): string {
  const nums = threads
    .map((t) => parseInt(t.ref.replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  return `ODYX-${(nums.length ? Math.max(...nums) : 1042) + 1}`;
}
