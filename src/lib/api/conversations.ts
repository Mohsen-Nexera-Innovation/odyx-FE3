import { apiFetch } from '@/lib/api/client';

export type ApiConversationUser = {
  id: string;
  email: string;
  name: string;
  accountType?: string;
  clientType?: string | null;
};

export type ApiMessage = {
  id: string;
  conversationId?: string;
  senderId: string;
  body: string;
  attachmentName?: string | null;
  readAt?: string | null;
  createdAt: string;
  sender: ApiConversationUser;
};

export type ApiConversation = {
  id: string;
  clientId: string;
  assigneeId?: string | null;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  client: ApiConversationUser;
  assignee?: ApiConversationUser | null;
  messages: ApiMessage[];
  _count?: { messages: number };
};

export function listConversationsApi() {
  return apiFetch<ApiConversation[]>('/conversations', { auth: true });
}

export function getConversationApi(id: string) {
  return apiFetch<ApiConversation>(`/conversations/${id}`, { auth: true });
}

export function createConversationApi(input: {
  subject: string;
  body: string;
  attachmentName?: string;
}) {
  return apiFetch<ApiConversation>('/conversations', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function sendMessageApi(
  id: string,
  input: { body: string; attachmentName?: string },
) {
  return apiFetch<ApiMessage>(`/conversations/${id}/messages`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function markConversationReadApi(id: string) {
  return apiFetch<ApiConversation>(`/conversations/${id}/read`, {
    method: 'POST',
    auth: true,
  });
}

export function assignConversationApi(
  id: string,
  assigneeId: string | null,
) {
  return apiFetch<ApiConversation>(`/conversations/${id}/assign`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({ assigneeId }),
  });
}
