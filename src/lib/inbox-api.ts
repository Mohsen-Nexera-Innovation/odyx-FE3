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
  if (lower.includes('bridge')) return 'bridge';
  if (lower.includes('guide')) return 'surgical_guide';
  if (lower.includes('denture')) return 'denture';
  if (lower.includes('model')) return 'model';
  if (lower.includes('night')) return 'night_guard';
  if (lower.includes('crown')) return 'crown';
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

export function conversationToThread(
  session: AccountSession,
  conv: ApiConversation,
): InboxThread {
  const messages = (conv.messages || []).map((m) => mapMessage(session, conv, m));
  const role =
    session.role === 'lab' ? 'lab' : session.role === 'guest' ? 'guest' : 'dentist';

  let status: ThreadStatus = 'awaiting_design';
  if (messages.some((m) => m.direction === 'received')) status = 'design_delivered';

  return {
    id: conv.id,
    ref: conv.id.slice(0, 8).toUpperCase(),
    ownerKey: session.email.toLowerCase(),
    role,
    orgName: session.org,
    indication: parseIndication(conv.subject),
    sla: '24h',
    status,
    messages,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt,
  };
}

export async function listThreadsApi(session: AccountSession): Promise<InboxThread[]> {
  const list = await listConversationsApi();
  // List endpoint returns latest message only (desc). Normalize to chronological for UI.
  return list.map((c) => {
    const latest = [...(c.messages || [])].reverse();
    const enriched: ApiConversation = {
      ...c,
      messages: latest,
    };
    return conversationToThread(session, enriched);
  });
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

export async function markThreadReadApi(threadId: string) {
  await markConversationReadApi(threadId);
  notifyInboxChange();
}

export async function createThreadFromComposeApi(
  session: AccountSession,
  input: {
    subject: string;
    body: string;
    attachmentName?: string;
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
  notifyInboxChange();
  return getThreadApi(session, threadId);
}
