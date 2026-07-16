'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
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

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'OX';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatChatDate(iso: string) {
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

function lastMessage(c: ApiConversation): ApiMessage | undefined {
  const msgs = c.messages || [];
  if (msgs.length === 0) return undefined;
  // List endpoint returns latest-first; detail is chronological.
  const a = msgs[0];
  const b = msgs[msgs.length - 1];
  if (!a || !b) return a || b;
  return new Date(a.createdAt).getTime() >= new Date(b.createdAt).getTime() ? a : b;
}

export default function AdminChatPage() {
  const { session } = useAuthSession();
  const canReply = hasPermission(session, 'chat.reply');
  const [conversations, setConversations] = useState<ApiConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [active, setActive] = useState<ApiConversation | null>(null);
  const [reply, setReply] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const loadList = async (silent = false) => {
    if (!isApiMode()) {
      setError('Chat requires API mode.');
      return;
    }
    if (!silent) setLoading(true);
    try {
      const list = await listConversationsApi();
      setConversations(list);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load conversations');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (canReply) void loadList();
  }, [canReply]);

  useEffect(() => {
    if (!canReply) return;
    const id = window.setInterval(() => void loadList(true), 15000);
    return () => window.clearInterval(id);
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

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [active?.id, active?.messages?.length]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => {
      const last = lastMessage(c);
      return (
        c.subject.toLowerCase().includes(q) ||
        c.client?.name?.toLowerCase().includes(q) ||
        c.client?.email?.toLowerCase().includes(q) ||
        (last?.body || '').toLowerCase().includes(q)
      );
    });
  }, [conversations, search]);

  const openCount = conversations.filter((c) => c.status === 'OPEN').length;
  const clientTypes = new Set(
    conversations.map((c) => c.client?.clientType).filter(Boolean),
  ).size;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedId || !reply.trim()) return;
    setBusy(true);
    try {
      const msg = await sendMessageApi(selectedId, { body: reply.trim() });
      setActive((prev) =>
        prev
          ? {
              ...prev,
              messages: [...(prev.messages || []), msg as ApiMessage],
              updatedAt: new Date().toISOString(),
            }
          : prev,
      );
      setReply('');
      await loadList(true);
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
      <div className="admin-chat-hero">
        <div className="admin-chat-hero-text">
          <p className="admin-chat-eyebrow">Staff inbox</p>
          <h1>
            Client <span>chat</span>
          </h1>
          <p className="admin-sub">
            Reply to dentists, labs, and leads. Threads sync with the client inbox in real time.
          </p>
          <div className="admin-chat-stats" aria-label="Chat summary">
            <div className="admin-chat-stat">
              <strong>{conversations.length}</strong>
              <span>Conversations</span>
            </div>
            <div className="admin-chat-stat">
              <strong>{openCount}</strong>
              <span>Open</span>
            </div>
            <div className="admin-chat-stat">
              <strong>{clientTypes}</strong>
              <span>Client types</span>
            </div>
          </div>
        </div>
        <ol className="admin-chat-flow" aria-label="How it works">
          <li>
            <span>1</span>
            <div>
              <b>Client writes</b>
              <small>From their inbox</small>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <b>You reply here</b>
              <small>Needs chat.reply</small>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <b>They see it live</b>
              <small>Same conversation</small>
            </div>
          </li>
        </ol>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-card admin-chat">
        <aside className="admin-chat-list">
          <div className="admin-chat-list-head">
            <div className="admin-chat-list-top">
              <h2>Conversations</h2>
              <span className="admin-chat-count">{filtered.length}</span>
            </div>
            <label className="admin-chat-search-wrap">
              <span className="admin-chat-search-icon" aria-hidden>
                ⌕
              </span>
              <input
                type="search"
                className="admin-chat-search"
                placeholder="Search client, subject, message…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <ul className="admin-chat-items">
            {loading && conversations.length === 0 ? (
              <li className="admin-chat-list-empty">
                <span className="admin-chat-pulse" aria-hidden />
                Loading conversations…
              </li>
            ) : null}
            {!loading && filtered.length === 0 ? (
              <li className="admin-chat-list-empty">
                <div className="admin-chat-empty-glyph" aria-hidden>
                  ✉
                </div>
                <p>No conversations match.</p>
              </li>
            ) : null}
            {filtered.map((c) => {
              const last = lastMessage(c);
              const activeRow = selectedId === c.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className="admin-chat-item"
                    data-active={activeRow ? 'true' : 'false'}
                    onClick={() => setSelectedId(c.id)}
                  >
                    <span className="admin-chat-avatar" aria-hidden>
                      {initialsFrom(c.client?.name || 'Client')}
                    </span>
                    <span className="admin-chat-item-body">
                      <span className="admin-chat-item-top">
                        <strong>{c.client?.name || 'Client'}</strong>
                        <time>{formatChatDate(c.updatedAt)}</time>
                      </span>
                      <span className="admin-chat-item-subject">{c.subject}</span>
                      <span className="admin-chat-item-preview">
                        {last?.body || 'No messages yet'}
                      </span>
                      <span className="admin-chat-item-meta">
                        <span className="admin-chat-pill">
                          {c.client?.clientType || 'CLIENT'}
                        </span>
                        <span className={`admin-chat-pill admin-chat-pill--${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="admin-chat-panel">
          {!active ? (
            <div className="admin-chat-empty">
              <div className="admin-chat-empty-glyph" aria-hidden>
                ✉
              </div>
              <h3>Pick a conversation</h3>
              <p>Select a client thread from the left to read and reply.</p>
            </div>
          ) : (
            <>
              <div className="admin-chat-panel-head">
                <div className="admin-chat-panel-heading">
                  <p className="admin-chat-kicker">
                    Conversation · {active.id.slice(0, 8).toUpperCase()}
                  </p>
                  <h2>{active.subject}</h2>
                  <p className="admin-muted">
                    {active.client?.name}
                    {active.client?.email ? ` · ${active.client.email}` : ''}
                    {active.client?.clientType
                      ? ` · ${active.client.clientType}`
                      : ' · CLIENT'}
                  </p>
                </div>
                <div className="admin-chat-panel-chips">
                  <span className="admin-chat-pill">
                    {active.client?.clientType || 'CLIENT'}
                  </span>
                  <span
                    className={`admin-chat-pill admin-chat-pill--${active.status.toLowerCase()}`}
                  >
                    {active.status}
                  </span>
                  {active.assignee ? (
                    <span className="admin-chat-pill">
                      Assigned · {active.assignee.name}
                    </span>
                  ) : (
                    <span className="admin-chat-pill">Unassigned</span>
                  )}
                </div>
              </div>

              <div className="admin-chat-messages" ref={messagesRef}>
                {(active.messages || []).map((m) => {
                  const staff = m.sender.accountType === 'STAFF';
                  return (
                    <article
                      key={m.id}
                      className={`admin-chat-msg${staff ? ' admin-chat-msg--staff' : ' admin-chat-msg--client'}`}
                    >
                      <span className="admin-chat-msg-avatar" aria-hidden>
                        {staff
                          ? initialsFrom(m.sender.name || session?.name || 'OX')
                          : initialsFrom(m.sender.name || 'CL')}
                      </span>
                      <div className="admin-chat-msg-card">
                        <div className="admin-chat-msg-meta">
                          <strong>{m.sender.name}</strong>
                          <time>{formatChatDate(m.createdAt)}</time>
                        </div>
                        <div className="admin-chat-msg-body">{m.body}</div>
                        {m.attachmentName ? (
                          <div className="admin-chat-attachment">
                            📎 {m.attachmentName}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>

              <form className="admin-chat-compose" onSubmit={submit}>
                <label htmlFor="admin-chat-reply" className="visually-hidden">
                  Reply to client
                </label>
                <textarea
                  id="admin-chat-reply"
                  rows={2}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply to the client…"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-sm admin-chat-send"
                  disabled={busy || !reply.trim()}
                >
                  {busy ? 'Sending…' : 'Send'}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </>
  );
}
