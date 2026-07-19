/**
 * Maps Nest conversations → InboxThread shape used by the existing inbox UI.
 */

import {
  DESIGN_TEAM_EMAIL,
  type CaseIndication,
  type InboxMessage,
  type InboxThread,
  type ThreadStatus,
} from '@/content/inbox';
import type { AccountSession } from '@/lib/auth-store';
import {
  createConversationApi,
  getConversationApi,
  listConversationsApi,
  markConversationReadApi,
  sendMessageApi,
  type ApiConversation,
  type ApiMessage,
} from '@/lib/api/conversations';
import { notifyInboxChange } from '@/lib/inbox-store-events';

function parseIndication(subject: string): CaseIndication {
  const lower = subject.toLowerCase();
  if (lower.includes('smile') || lower.includes('veneer')) return 'digital_smile_design';
  if (lower.includes('partial') || lower.includes('rpd')) {
    return 'removable_partial_denture';
  }
  if (lower.includes('splint') || lower.includes('night')) return 'occlusal_splint';
  if (lower.includes('guide')) return 'surgical_guide';
  if (
    lower.includes('single unit') ||
    lower.includes('crown') ||
    lower.includes('overlay') ||
    lower.includes('endocrown')
  ) {
    return 'single_unit';
  }
  return 'other';
}

function mapMessage(
  session: AccountSession,
  conv: ApiConversation,
  msg: ApiMessage,
): InboxMessage {
  const sameSide =
    (session.accountType === 'CLIENT' && msg.sender.accountType === 'CLIENT') ||
    (session.accountType === 'STAFF' && msg.sender.accountType === 'STAFF') ||
    msg.sender.email.toLowerCase() === session.email.toLowerCase();

  const direction: 'sent' | 'received' = sameSide ? 'sent' : 'received';

  return {
    id: msg.id,
    threadId: conv.id,
    direction,
    from: msg.sender.email,
    fromLabel: msg.sender.name,
    to: direction === 'sent' ? DESIGN_TEAM_EMAIL : session.email,
    toLabel: direction === 'sent' ? 'ODYX Team' : session.name,
    subject: conv.subject,
    body: msg.body,
    attachments: msg.attachmentName
      ? [
          {
            id: `${msg.id}-att`,
            name: msg.attachmentName,
            size: 0,
            kind: direction === 'sent' ? 'scan' : 'design',
          },
        ]
      : [],
    at: msg.createdAt,
    read: Boolean(msg.readAt) || direction === 'sent',
  };
}

function sortMessagesAsc(messages: InboxMessage[]): InboxMessage[] {
  return [...messages].sort(
    (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime(),
  );
}

export function conversationToThread(
  session: AccountSession,
  conv: ApiConversation,
): InboxThread {
  const messages = sortMessagesAsc(
    (conv.messages || []).map((m) => mapMessage(session, conv, m)),
  );
  const role =
    session.role === 'lab' ? 'lab' : session.role === 'guest' ? 'guest' : 'dentist';

  let status: ThreadStatus = 'awaiting_design';
  // Confirmation from ODYX is "received" but not a delivered design file.
  if (
    messages.some(
      (m) =>
        m.direction === 'received' &&
        m.attachments.some((a) => a.kind === 'design'),
    )
  ) {
    status = 'design_delivered';
  }

  return {
    id: conv.id,
    ref: conv.order?.orderNumber ?? conv.id.slice(0, 8).toUpperCase(),
    ownerKey: session.email.toLowerCase(),
    role,
    orgName: session.org,
    indication: parseIndication(conv.subject),
    sla: '24h',
    status,
    orderNumber: conv.order?.orderNumber,
    messages,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt,
  };
}

/** Prefer the fuller message history when merging list polls with open threads. */
export function mergeThreadLists(
  previous: InboxThread[],
  incoming: InboxThread[],
): InboxThread[] {
  const prevById = new Map(previous.map((t) => [t.id, t]));

  return incoming.map((thread) => {
    const prev = prevById.get(thread.id);
    if (!prev) return thread;

    if (thread.messages.length >= prev.messages.length) {
      return thread;
    }

    const incomingIds = new Set(thread.messages.map((m) => m.id));
    const prevIds = new Set(prev.messages.map((m) => m.id));
    const incomingHasUnknown = thread.messages.some((m) => !prevIds.has(m.id));

    // Preview/list stub or stale poll: keep the richer local history and refresh read flags.
    if (!incomingHasUnknown) {
      return {
        ...thread,
        messages: prev.messages.map((m) => {
          if (!incomingIds.has(m.id)) return m;
          const newer = thread.messages.find((x) => x.id === m.id);
          return newer ? { ...m, read: newer.read } : m;
        }),
        status: prev.status,
      };
    }

    // New activity arrived that we don't have yet — keep prev until hydrate fills gaps.
    return {
      ...thread,
      messages: prev.messages,
      status: prev.status,
    };
  });
}

export function upsertThread(
  threads: InboxThread[],
  thread: InboxThread,
): InboxThread[] {
  const rest = threads.filter((t) => t.id !== thread.id);
  return [thread, ...rest].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function listThreadsApi(session: AccountSession): Promise<InboxThread[]> {
  const list = await listConversationsApi();
  return list.map((c) => conversationToThread(session, c));
}

export async function unreadTotalApi(session: AccountSession): Promise<number> {
  const threads = await listThreadsApi(session);
  return threads.reduce(
    (n, t) =>
      n + t.messages.filter((m) => m.direction === 'received' && !m.read).length,
    0,
  );
}

export async function getThreadApi(
  session: AccountSession,
  threadId: string,
): Promise<InboxThread | undefined> {
  try {
    const conv = await getConversationApi(threadId);
    return conversationToThread(session, conv);
  } catch {
    return undefined;
  }
}

export async function markThreadReadApi(
  session: AccountSession,
  threadId: string,
): Promise<InboxThread | undefined> {
  try {
    const conv = await markConversationReadApi(threadId);
    notifyInboxChange();
    return conversationToThread(session, conv);
  } catch {
    return undefined;
  }
}

export async function createThreadFromComposeApi(
  session: AccountSession,
  input: {
    subject: string;
    body: string;
    attachmentName?: string;
    orderNumber?: string;
    patientId?: string;
  },
): Promise<InboxThread> {
  const conv = await createConversationApi(input);
  notifyInboxChange();
  return conversationToThread(session, conv);
}

export async function replyToThreadApi(
  session: AccountSession,
  threadId: string,
  body: string,
  attachmentName?: string,
): Promise<InboxThread | undefined> {
  await sendMessageApi(threadId, { body, attachmentName });
  const updated = await getThreadApi(session, threadId);
  notifyInboxChange();
  return updated;
}
