/**
 * Seed sample inbox threads so logged-in users see full send/receive functionality.
 */

import type { InboxThread } from '@/content/inbox';
import { DESIGN_TEAM_EMAIL } from '@/content/inbox';
import type { AccountSession } from '@/lib/auth-store';
import { INBOX_STORAGE_KEY } from '@/lib/inbox-store';

const SEED_FLAG_PREFIX = 'odyx_inbox_seeded_';

function ownerKey(session: AccountSession): string {
  return session.email.trim().toLowerCase();
}

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3600_000).toISOString();
}

function buildDentistThreads(session: AccountSession): InboxThread[] {
  const key = ownerKey(session);
  const email = session.email;
  const name = session.name;

  return [
    {
      id: `seed-${key}-1`,
      ref: 'ODYX-1042',
      ownerKey: key,
      role: 'dentist',
      orgName: session.org,
      indication: 'crown',
      patientRef: 'PT-204',
      tooth: '#14',
      sla: 'same_day',
      status: 'design_delivered',
      messages: [
        {
          id: 's1a',
          threadId: `seed-${key}-1`,
          direction: 'sent',
          from: email,
          fromLabel: name,
          to: DESIGN_TEAM_EMAIL,
          toLabel: 'ODYX Design Team',
          subject: 'Scan upload — Crown #14 (PT-204)',
          body: 'Please design a crown for tooth #14. Chamfer margin. Same-day if possible.',
          attachments: [{ id: 's1a-f', name: 'scan_upper.stl', size: 4_200_000, kind: 'scan' }],
          at: hoursAgo(26),
          read: true,
        },
        {
          id: 's1b',
          threadId: `seed-${key}-1`,
          direction: 'received',
          from: DESIGN_TEAM_EMAIL,
          fromLabel: 'ODYX Design Team',
          to: email,
          toLabel: name,
          subject: 'Re: Scan upload — Crown #14 (PT-204)',
          body: 'Your crown design is ready. File validated for ODYX Crown & Bridge resin. Download below.',
          attachments: [{ id: 's1b-f', name: 'crown_14_design.stl', size: 1_800_000, kind: 'design' }],
          at: hoursAgo(2),
          read: false,
        },
      ],
      createdAt: hoursAgo(26),
      updatedAt: hoursAgo(2),
    },
    {
      id: `seed-${key}-2`,
      ref: 'ODYX-1055',
      ownerKey: key,
      role: 'dentist',
      orgName: session.org,
      indication: 'surgical_guide',
      patientRef: 'PT-311',
      tooth: '#19',
      sla: '24h',
      status: 'in_progress',
      messages: [
        {
          id: 's2a',
          threadId: `seed-${key}-2`,
          direction: 'sent',
          from: email,
          fromLabel: name,
          to: DESIGN_TEAM_EMAIL,
          toLabel: 'ODYX Design Team',
          subject: 'Scan upload — Surgical guide #19',
          body: 'CBCT + intraoral scan attached. Sleeve system: universal 4.0 mm.',
          attachments: [{ id: 's2a-f', name: 'guide_intake.zip', size: 9_800_000, kind: 'scan' }],
          at: hoursAgo(18),
          read: true,
        },
        {
          id: 's2b',
          threadId: `seed-${key}-2`,
          direction: 'received',
          from: DESIGN_TEAM_EMAIL,
          fromLabel: 'ODYX Design Team',
          to: email,
          toLabel: name,
          subject: 'Re: Scan upload — Surgical guide #19',
          body: 'We received your files and started the design. Verifying sleeve offsets — on track for 24h SLA.',
          attachments: [],
          at: hoursAgo(6),
          read: true,
        },
      ],
      createdAt: hoursAgo(18),
      updatedAt: hoursAgo(6),
    },
    {
      id: `seed-${key}-3`,
      ref: 'ODYX-1021',
      ownerKey: key,
      role: 'dentist',
      orgName: session.org,
      indication: 'bridge',
      patientRef: 'PT-188',
      tooth: '#13–15',
      sla: '24h',
      status: 'completed',
      messages: [
        {
          id: 's3a',
          threadId: `seed-${key}-3`,
          direction: 'sent',
          from: email,
          fromLabel: name,
          to: DESIGN_TEAM_EMAIL,
          toLabel: 'ODYX Design Team',
          subject: 'Scan upload — Bridge #13–15',
          body: 'Bridge design for teeth 13–15. Please include connector specs.',
          attachments: [{ id: 's3a-f', name: 'prep_scan.stl', size: 5_100_000, kind: 'scan' }],
          at: hoursAgo(120),
          read: true,
        },
        {
          id: 's3b',
          threadId: `seed-${key}-3`,
          direction: 'received',
          from: DESIGN_TEAM_EMAIL,
          fromLabel: 'ODYX Design Team',
          to: email,
          toLabel: name,
          subject: 'Re: Scan upload — Bridge #13–15',
          body: 'Design package attached. Ready for your print workflow.',
          attachments: [{ id: 's3b-f', name: 'bridge_design_pack.zip', size: 3_200_000, kind: 'design' }],
          at: hoursAgo(72),
          read: true,
        },
      ],
      createdAt: hoursAgo(120),
      updatedAt: hoursAgo(72),
    },
  ];
}

function buildLabThreads(session: AccountSession): InboxThread[] {
  const key = ownerKey(session);
  const email = session.email;
  const name = session.name;

  return [
    {
      id: `seed-${key}-1`,
      ref: 'ODYX-1038',
      ownerKey: key,
      role: 'lab',
      orgName: session.org,
      indication: 'surgical_guide',
      patientRef: 'LB-881',
      sla: '24h',
      status: 'in_progress',
      resin: 'ODYX Surgical Guide',
      printer: 'ODYX P1-26',
      batchRef: 'BATCH-03',
      messages: [
        {
          id: 'l1a',
          threadId: `seed-${key}-1`,
          direction: 'sent',
          from: email,
          fromLabel: name,
          to: DESIGN_TEAM_EMAIL,
          toLabel: 'ODYX Design Team',
          subject: 'Scan bundle — Surgical guide (BATCH-03)',
          body: 'CBCT + intraoral scan. Target resin: ODYX Surgical Guide.',
          attachments: [{ id: 'l1a-f', name: 'cbct_guide_intake.zip', size: 12_400_000, kind: 'scan' }],
          at: hoursAgo(52),
          read: true,
        },
        {
          id: 'l1b',
          threadId: `seed-${key}-1`,
          direction: 'received',
          from: DESIGN_TEAM_EMAIL,
          fromLabel: 'ODYX Design Team',
          to: email,
          toLabel: name,
          subject: 'Re: Scan bundle — Surgical guide (BATCH-03)',
          body: 'Design in progress. On track for 24h delivery.',
          attachments: [],
          at: hoursAgo(6),
          read: false,
        },
      ],
      createdAt: hoursAgo(52),
      updatedAt: hoursAgo(6),
    },
    {
      id: `seed-${key}-2`,
      ref: 'ODYX-1060',
      ownerKey: key,
      role: 'lab',
      orgName: session.org,
      indication: 'model',
      patientRef: 'LB-902',
      sla: 'same_day',
      status: 'design_delivered',
      resin: 'ODYX Model Gray',
      printer: 'ODYX P1-26',
      batchRef: 'BATCH-04',
      messages: [
        {
          id: 'l2a',
          threadId: `seed-${key}-2`,
          direction: 'sent',
          from: email,
          fromLabel: name,
          to: DESIGN_TEAM_EMAIL,
          toLabel: 'ODYX Design Team',
          subject: 'Scan upload — Model (BATCH-04)',
          body: 'Full arch model for articulation check.',
          attachments: [{ id: 'l2a-f', name: 'arch_scan.stl', size: 6_700_000, kind: 'scan' }],
          at: hoursAgo(30),
          read: true,
        },
        {
          id: 'l2b',
          threadId: `seed-${key}-2`,
          direction: 'received',
          from: DESIGN_TEAM_EMAIL,
          fromLabel: 'ODYX Design Team',
          to: email,
          toLabel: name,
          subject: 'Re: Scan upload — Model (BATCH-04)',
          body: 'Model design ready for print.',
          attachments: [{ id: 'l2b-f', name: 'model_design.stl', size: 2_400_000, kind: 'design' }],
          at: hoursAgo(4),
          read: false,
        },
      ],
      createdAt: hoursAgo(30),
      updatedAt: hoursAgo(4),
    },
  ];
}

export function seedInboxForUser(session: AccountSession) {
  if (session.role === 'guest' || typeof window === 'undefined') return;

  const key = ownerKey(session);
  const flagKey = `${SEED_FLAG_PREFIX}${key}`;
  if (localStorage.getItem(flagKey)) return;

  const seeds = session.role === 'lab' ? buildLabThreads(session) : buildDentistThreads(session);

  let all: InboxThread[] = [];
  try {
    const raw = localStorage.getItem(INBOX_STORAGE_KEY);
    if (raw) all = JSON.parse(raw) as InboxThread[];
  } catch {
    all = [];
  }

  const existingIds = new Set(all.filter((t) => t.ownerKey === key).map((t) => t.id));
  const toAdd = seeds.filter((t) => !existingIds.has(t.id));
  if (toAdd.length === 0) {
    localStorage.setItem(flagKey, '1');
    return;
  }

  localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify([...toAdd, ...all]));
  localStorage.setItem(flagKey, '1');
}

/** Re-seed demo accounts (dev helper). Clears seed flag and re-runs. */
export function resetDemoInbox(session: AccountSession) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${SEED_FLAG_PREFIX}${ownerKey(session)}`);
  seedInboxForUser(session);
}
