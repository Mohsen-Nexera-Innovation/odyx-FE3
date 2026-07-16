'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  getConversationApi,
  listConversationsApi,
  sendMessageApi,
  type ApiConversation,
  type ApiMessage,
} from '@/lib/api/conversations';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';

export default function AdminChatPage() {
  const { session } = useAuthSession();
  const canReply = hasPermission(session, 'chat.reply');
  const [conversations, setConversations] = useState<ApiConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [active, setActive] = useState<ApiConversation | null>(null);
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const loadList = async () => {
    if (!isApiMode()) {
      setError('Chat requires API mode.');
      return;
    }
    try {
      const list = await listConversationsApi();
      setConversations(list);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load conversations');
    }
  };

  useEffect(() => {
    if (canReply) void loadList();
  }, [canReply]);

  useEffect(() => {
    if (!selectedId || !canReply) {
      setActive(null);
      return;
    }
    void getConversationApi(selectedId)
      .then(setActive)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to open'));
  }, [selectedId, canReply]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedId || !reply.trim()) return;
    setBusy(true);
    try {
      const msg = await sendMessageApi(selectedId, { body: reply.trim() });
      setActive((prev) =>
        prev
          ? { ...prev, messages: [...(prev.messages || []), msg as ApiMessage] }
          : prev,
      );
      setReply('');
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed');
    } finally {
      setBusy(false);
    }
  };

  if (!canReply) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Chat</h1>
          <p className="admin-error">You need chat.reply to access client chat.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Client chat</h1>
        <p className="admin-sub">
          Reply to clients and leads. Conversations sync with the client inbox.
        </p>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-card admin-chat">
        <aside className="admin-chat-list">
          <div className="admin-chat-list-head">
            <h2>Conversations</h2>
          </div>
          <ul className="admin-chat-items">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="admin-chat-item"
                  data-active={selectedId === c.id ? 'true' : 'false'}
                  onClick={() => setSelectedId(c.id)}
                >
                  <strong>{c.subject}</strong>
                  <span className="admin-muted">
                    {c.client?.name} · {c.client?.email}
                  </span>
                </button>
              </li>
            ))}
            {conversations.length === 0 ? (
              <li className="admin-empty">No conversations yet.</li>
            ) : null}
          </ul>
        </aside>

        <section className="admin-chat-panel">
          {!active ? (
            <div className="admin-chat-empty">
              <p>Select a conversation to read and reply.</p>
            </div>
          ) : (
            <>
              <div className="admin-chat-panel-head">
                <h2>{active.subject}</h2>
                <p className="admin-muted">
                  {active.client?.name}
                  {active.client?.clientType
                    ? ` · ${active.client.clientType}`
                    : ' · CLIENT'}
                </p>
              </div>
              <div className="admin-chat-messages">
                {(active.messages || []).map((m) => {
                  const staff = m.sender.accountType === 'STAFF';
                  return (
                    <div
                      key={m.id}
                      className={`admin-chat-bubble${staff ? ' admin-chat-bubble--staff' : ' admin-chat-bubble--client'}`}
                    >
                      <div className="admin-chat-bubble-meta">
                        {m.sender.name} · {new Date(m.createdAt).toLocaleString()}
                      </div>
                      <div>{m.body}</div>
                      {m.attachmentName ? (
                        <div className="admin-muted" style={{ marginTop: '0.35rem' }}>
                          Attachment: {m.attachmentName}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="admin-chat-compose">
                <form className="admin-form" onSubmit={submit}>
                  <label>
                    Reply
                    <textarea
                      rows={3}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write a reply to the client…"
                      required
                    />
                  </label>
                  <button type="submit" className="btn btn-sm" disabled={busy}>
                    {busy ? 'Sending…' : 'Send reply'}
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
