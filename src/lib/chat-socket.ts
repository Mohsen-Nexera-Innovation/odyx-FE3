/**
 * Shared Socket.IO client for realtime chat (client inbox + admin chat).
 */

import { io, type Socket } from 'socket.io-client';
import { getApiBaseUrl, isApiMode } from '@/lib/config';
import { getAccessToken } from '@/lib/auth-tokens';
import type { ApiConversation, ApiMessage } from '@/lib/api/conversations';

export type ChatMessageEvent = {
  conversationId: string;
  clientId: string;
  message: ApiMessage;
  updatedAt: string;
};

type ChatHandlers = {
  onReady?: (payload: { userId: string; accountType: string }) => void;
  onConversationCreated?: (conversation: ApiConversation) => void;
  onConversationMessage?: (payload: ChatMessageEvent) => void;
  onConversationUpdated?: (conversation: ApiConversation) => void;
  onConnectError?: (err: Error) => void;
};

let socket: Socket | null = null;

function ensureSocket(): Socket | null {
  if (typeof window === 'undefined' || !isApiMode()) return null;
  const base = getApiBaseUrl();
  if (!base) return null;

  if (!socket) {
    socket = io(`${base}/chat`, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      auth: {
        token: getAccessToken() ?? '',
      },
    });
  }

  return socket;
}

/** Connect (or reconnect) with the current access token. */
export function connectChatSocket(): Socket | null {
  const s = ensureSocket();
  if (!s) return null;

  const token = getAccessToken();
  if (!token) {
    if (s.connected) s.disconnect();
    return null;
  }

  s.auth = { token };
  if (!s.connected) s.connect();
  return s;
}

export function disconnectChatSocket() {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
}

/**
 * Subscribe to chat events. Returns cleanup that removes these handlers
 * (keeps the socket alive for other subscribers).
 */
export function subscribeChatSocket(handlers: ChatHandlers): () => void {
  const s = connectChatSocket();
  if (!s) return () => undefined;

  const onReady = (payload: { userId: string; accountType: string }) => {
    handlers.onReady?.(payload);
  };
  const onCreated = (conversation: ApiConversation) => {
    handlers.onConversationCreated?.(conversation);
  };
  const onMessage = (payload: ChatMessageEvent) => {
    handlers.onConversationMessage?.(payload);
  };
  const onUpdated = (conversation: ApiConversation) => {
    handlers.onConversationUpdated?.(conversation);
  };
  const onError = (err: Error) => {
    handlers.onConnectError?.(err);
  };

  s.on('chat:ready', onReady);
  s.on('conversation:created', onCreated);
  s.on('conversation:message', onMessage);
  s.on('conversation:updated', onUpdated);
  s.on('connect_error', onError);

  // If already connected from a previous page, still fire ready-ish state via reconnect noop.
  if (!s.connected) {
    s.connect();
  }

  return () => {
    s.off('chat:ready', onReady);
    s.off('conversation:created', onCreated);
    s.off('conversation:message', onMessage);
    s.off('conversation:updated', onUpdated);
    s.off('connect_error', onError);
  };
}
