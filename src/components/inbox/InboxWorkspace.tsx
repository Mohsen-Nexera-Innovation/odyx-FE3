'use client';

import Link from 'next/link';
import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import InboxGate from '@/components/inbox/InboxGate';
import InboxComposeForm from '@/components/inbox/InboxComposeForm';
import {
  DESIGN_TEAM_EMAIL,
  INDICATION_LABEL,
  SLA_LABEL,
  THREAD_STATUS_LABEL,
  formatFileSize,
  formatMessageDate,
  hasDesignAttachment,
  threadPreview,
  threadSubject,
  unreadCount,
  type InboxFolder,
  type InboxThread,
} from '@/content/inbox';
import { useAuthSession } from '@/hooks/useAuthSession';
import {
  conversationToThread,
  getThreadApi,
  listThreadsApi,
  markThreadReadApi,
  mergeThreadLists,
  replyToThreadApi,
  upsertThread,
} from '@/lib/inbox-api';
import {
  listThreads,
  markDesignDownloaded,
  markThreadRead,
  notifyInboxChange,
  unreadTotal,
  type AccountSession,
} from '@/lib/inbox-store';
import { isApiMode } from '@/lib/config';
import { subscribeChatSocket } from '@/lib/chat-socket';
import InnerPageMotion from '@/components/InnerPageMotion';

type PaneMode = 'compose' | 'read';

function filterThreads(threads: InboxThread[], folder: InboxFolder): InboxThread[] {
  if (folder === 'all') return threads;
  if (folder === 'sent') {
    return threads.filter((t) => t.messages.some((m) => m.direction === 'sent'));
  }
  if (folder === 'designs') {
    return threads.filter((t) => hasDesignAttachment(t));
  }
  // Inbox: all client conversations
  return threads;
}

function unreadFromThreads(threads: InboxThread[]) {
  return threads.reduce((n, t) => n + unreadCount(t), 0);
}

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'OX';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function InboxWorkspace() {
  const { session } = useAuthSession();
  const [folder, setFolder] = useState<InboxFolder>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paneMode, setPaneMode] = useState<PaneMode>('compose');
  const [search, setSearch] = useState('');
  const [tick, setTick] = useState(0);
  const [apiThreads, setApiThreads] = useState<InboxThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const apiMode = isApiMode();
  const selectedIdRef = useRef<string | null>(null);
  const hasLoadedRef = useRef(false);

  selectedIdRef.current = selectedId;

  const reload = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    const onInboxChange = () => reload();
    window.addEventListener('odyx-inbox-change', onInboxChange);
    return () => window.removeEventListener('odyx-inbox-change', onInboxChange);
  }, [reload]);

  useEffect(() => {
    if (!session || !apiMode || session.accountType === 'GUEST' || session.role === 'guest') {
      setApiThreads([]);
      setLoading(false);
      setLoadError('');
      hasLoadedRef.current = false;
      return;
    }

    let cancelled = false;
    const showSpinner = !hasLoadedRef.current;
    if (showSpinner) setLoading(true);

    void (async () => {
      try {
        const list = await listThreadsApi(session);
        if (cancelled) return;

        setApiThreads((prev) => mergeThreadLists(prev, list));
        setLoadError('');
        hasLoadedRef.current = true;

        const openId = selectedIdRef.current;
        if (openId) {
          const full = await getThreadApi(session, openId);
          if (!cancelled && full) {
            setApiThreads((prev) => upsertThread(prev, full));
          }
        }
      } catch (err) {
        if (cancelled) return;
        if (!hasLoadedRef.current) setApiThreads([]);
        setLoadError(err instanceof Error ? err.message : 'Could not load conversations.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [session, apiMode, tick]);

  // Realtime chat via Socket.IO (+ slow poll fallback)
  useEffect(() => {
    if (!session || !apiMode || session.accountType === 'GUEST' || session.role === 'guest') {
      return;
    }

    const applyConversation = (thread: InboxThread) => {
      setApiThreads((prev) => upsertThread(prev, thread));
      notifyInboxChange();
    };

    const unsub = subscribeChatSocket({
      onConversationCreated: (conv) => {
        applyConversation(conversationToThread(session, conv));
      },
      onConversationUpdated: (conv) => {
        applyConversation(conversationToThread(session, conv));
      },
      onConversationMessage: ({ conversationId }) => {
        void getThreadApi(session, conversationId).then((full) => {
          if (full) applyConversation(full);
        });
      },
    });

    const fallback = window.setInterval(() => reload(), 60000);
    return () => {
      unsub();
      window.clearInterval(fallback);
    };
  }, [session, apiMode, reload]);

  const threads = useMemo(() => {
    if (!session) return [];
    if (apiMode && session.role !== 'guest') return apiThreads;
    return listThreads(session);
  }, [session, apiMode, apiThreads, tick]);

  const filtered = useMemo(() => {
    let list = filterThreads(threads, folder);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.ref.toLowerCase().includes(q) ||
          threadSubject(t).toLowerCase().includes(q) ||
          t.patientRef?.toLowerCase().includes(q) ||
          t.messages.some((m) => m.body.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [threads, folder, search]);

  const selected = useMemo(
    () => threads.find((t) => t.id === selectedId) ?? null,
    [threads, selectedId],
  );

  const isGuest = session?.role === 'guest' || session?.accountType === 'GUEST';
  const canSend = !isGuest;

  useEffect(() => {
    if (!session || isGuest) return;
    if (threads.length === 0 && !loading) setPaneMode('compose');
  }, [session, isGuest, threads.length, loading]);

  const openCompose = () => {
    setSelectedId(null);
    setPaneMode('compose');
  };

  const selectThread = (id: string) => {
    setSelectedId(id);
    setPaneMode('read');
    if (!session) return;
    if (apiMode && session.role !== 'guest') {
      void (async () => {
        try {
          // mark-read returns the full conversation — use it so history is never stubbed.
          const full =
            (await markThreadReadApi(session, id)) ?? (await getThreadApi(session, id));
          if (full) {
            setApiThreads((prev) => upsertThread(prev, full));
          }
        } catch {
          reload();
        }
      })();
      return;
    }
    markThreadRead(session, id);
    reload();
  };

  const onSent = (threadId: string, thread?: InboxThread) => {
    setSelectedId(threadId);
    setPaneMode('read');
    setFolder('inbox');
    if (thread) {
      setApiThreads((prev) => upsertThread(prev, thread));
    } else if (session && apiMode && session.role !== 'guest') {
      void getThreadApi(session, threadId).then((full) => {
        if (full) setApiThreads((prev) => upsertThread(prev, full));
      });
    }
    reload();
  };

  const onReplied = (thread: InboxThread) => {
    setApiThreads((prev) => upsertThread(prev, thread));
    setSelectedId(thread.id);
  };

  if (!session) return null;

  const unread = apiMode && !isGuest ? unreadFromThreads(threads) : unreadTotal(session);
  const designsReady = threads.filter(
    (t) => hasDesignAttachment(t) && t.status === 'design_delivered',
  ).length;

  return (
    <InboxGate>
      <div className="mail-workspace" data-role={session.role}>
        <div className="wrap mail-wrap">
          <div className="mail-hero">
            <div className="mail-hero-panel">
              <div className="mail-hero-text">
                <div className="mail-hero-kicker">
                  <span className="mail-eyebrow">
                    {apiMode ? 'Client inbox' : 'Design inbox'}
                  </span>
                  {session.org ? (
                    <span className="mail-hero-org">{session.org}</span>
                  ) : null}
                </div>
                <h1 className="mail-title">
                  {apiMode ? (
                    <>
                      Message <span className="mail-title-brand">ODYX</span>.
                      <br />
                      Track your cases.
                    </>
                  ) : (
                    'Send scans. Receive designs.'
                  )}
                </h1>
                <p className="mail-sub">
                  {apiMode ? (
                    <>
                      Chat with the ODYX team, upload scan files, and keep every reply in one
                      thread.
                    </>
                  ) : (
                    <>
                      Email your STL scan to the ODYX design team at{' '}
                      <strong>{DESIGN_TEAM_EMAIL}</strong> — finished design files arrive back in
                      this inbox, in the same conversation.
                    </>
                  )}
                </p>
                <div className="mail-hero-stats" aria-label="Inbox summary">
                  <div className="mail-hero-stat">
                    <strong>{threads.length}</strong>
                    <span>Conversations</span>
                  </div>
                  <div className="mail-hero-stat">
                    <strong>{unread}</strong>
                    <span>Unread</span>
                  </div>
                  <div className="mail-hero-stat">
                    <strong>{designsReady}</strong>
                    <span>Designs ready</span>
                  </div>
                </div>
              </div>
              <ol className="mail-flow-steps" aria-label="How it works">
                <li>
                  <span>1</span>
                  <div>
                    <b>{apiMode ? 'Start a case' : 'Attach scan'}</b>
                    <small>{apiMode ? 'Message or upload STL' : 'STL or ZIP file'}</small>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <b>{apiMode ? 'ODYX replies' : 'Design works'}</b>
                    <small>{apiMode ? 'Staff chat in-thread' : 'Partner lab process'}</small>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <b>{apiMode ? 'Keep talking' : 'Download'}</b>
                    <small>{apiMode ? 'Follow-ups stay here' : 'Design files return'}</small>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {isGuest ? (
            <div className="mail-banner mail-banner--guest">
              <div>
                <strong>Preview mode</strong>
                <p>
                  You&apos;re browsing demo conversations. Register as a Dentist or Lab to message
                  ODYX and send scans.
                </p>
              </div>
              <Link href="/register?role=dentist" className="btn btn-sm">
                Create account
              </Link>
            </div>
          ) : null}

          {loadError ? (
            <div className="mail-banner mail-banner--guest">
              <div>
                <strong>Could not load inbox</strong>
                <p>{loadError}</p>
              </div>
              <button type="button" className="btn btn-sm" onClick={reload}>
                Retry
              </button>
            </div>
          ) : null}

          <div className="mail-action-bar">
            <button
              type="button"
              className="btn btn-send-scan mail-action-primary"
              onClick={openCompose}
            >
              <span className="mail-action-plus" aria-hidden>
                +
              </span>
              {apiMode ? 'New message' : 'Send scan to design team'}
            </button>
            <div className="mail-action-divider" aria-hidden />
            <nav className="mail-action-folders" aria-label="Folders">
              {(
                [
                  ['inbox', 'Inbox', unread],
                  ['designs', 'Designs', designsReady],
                  ['sent', 'Sent', null],
                  ['all', 'All', null],
                ] as const
              ).map(([id, label, badge]) => (
                <button
                  key={id}
                  type="button"
                  className={`mail-action-folder${folder === id ? ' is-active' : ''}`}
                  onClick={() => setFolder(id)}
                >
                  {label}
                  {badge != null && badge > 0 ? (
                    <span className="mail-action-badge">{badge}</span>
                  ) : null}
                </button>
              ))}
            </nav>
            <p className="mail-action-greeting">
              Hi, <strong>{session.name.split(' ')[0] || session.name}</strong>
            </p>
          </div>

          <div className="mail-panels">
            <section className="mail-list-pane" aria-label="Conversations">
              <div className="mail-list-toolbar">
                <div className="mail-list-toolbar-top">
                  <h2 className="mail-list-title">Conversations</h2>
                  <span className="mail-list-count">{filtered.length}</span>
                </div>
                <label className="mail-search-wrap">
                  <span className="mail-search-icon" aria-hidden>
                    ⌕
                  </span>
                  <input
                    type="search"
                    className="mail-search"
                    placeholder="Search subject, message, ref…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
              </div>
              <ul className="mail-list">
                {loading ? (
                  <li className="mail-list-empty">
                    <span className="mail-loading-dot" aria-hidden />
                    <p>Loading conversations…</p>
                  </li>
                ) : filtered.length === 0 ? (
                  <li className="mail-list-empty">
                    <div className="mail-empty-glyph" aria-hidden>
                      ✉
                    </div>
                    <p>No conversations in this folder.</p>
                    {canSend ? (
                      <button type="button" className="btn btn-sm" onClick={openCompose}>
                        {apiMode ? 'Start a conversation' : 'Send your first scan'}
                      </button>
                    ) : (
                      <Link href="/register?role=dentist" className="btn btn-sm">
                        Register to send
                      </Link>
                    )}
                  </li>
                ) : (
                  filtered.map((t) => {
                    const unreadT = unreadCount(t);
                    const last = t.messages[t.messages.length - 1];
                    const active = selected?.id === t.id && paneMode === 'read';
                    const fromLabel =
                      last?.direction === 'received' ? 'ODYX Team' : 'You → ODYX';
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          className={`mail-row${active ? ' is-active' : ''}${unreadT ? ' is-unread' : ''}`}
                          onClick={() => selectThread(t.id)}
                        >
                          <span
                            className={`mail-row-avatar mail-row-avatar--${last?.direction ?? 'sent'}`}
                            aria-hidden
                          >
                            {last?.direction === 'received'
                              ? 'OX'
                              : initialsFrom(session.name)}
                          </span>
                          <span className="mail-row-body">
                            <span className="mail-row-top">
                              <span className="mail-row-from">{fromLabel}</span>
                              <span className="mail-row-date">
                                {formatMessageDate(t.updatedAt)}
                              </span>
                            </span>
                            <span className="mail-row-subject">{threadSubject(t)}</span>
                            <span className="mail-row-preview">{threadPreview(t)}</span>
                            <span className="mail-row-meta">
                              <span className="mail-row-ref">{t.ref}</span>
                              {hasDesignAttachment(t) ? (
                                <span className="mail-row-tag mail-row-tag--design">
                                  Design file
                                </span>
                              ) : (
                                <span className="mail-row-tag">
                                  {THREAD_STATUS_LABEL[t.status]}
                                </span>
                              )}
                            </span>
                          </span>
                          {unreadT > 0 ? (
                            <span className="mail-row-unread" aria-label={`${unreadT} unread`}>
                              {unreadT > 1 ? unreadT : ''}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>

            <section
              className="mail-read-pane"
              aria-label={paneMode === 'compose' ? 'Compose' : 'Conversation'}
            >
              {paneMode === 'compose' ? (
                <div className="mail-compose-pane">
                  <div className="mail-compose-pane-head">
                    <p className="mail-compose-kicker">New conversation</p>
                    <h2>{apiMode ? 'Message ODYX' : 'Send scan to design team'}</h2>
                    <p>
                      {apiMode ? (
                        <>
                          Start a conversation with the ODYX team. Attach an STL/ZIP scan when you
                          have one — or just send a message.
                        </>
                      ) : (
                        <>
                          This works like email — your scan is sent to{' '}
                          <a href={`mailto:${DESIGN_TEAM_EMAIL}`}>{DESIGN_TEAM_EMAIL}</a>. The
                          design file comes back in this same thread.
                        </>
                      )}
                    </p>
                  </div>
                  {canSend ? (
                    <InboxComposeForm session={session} onSent={onSent} variant="inline" />
                  ) : (
                    <div className="mail-compose-locked">
                      <InboxComposeForm
                        session={session}
                        onSent={onSent}
                        variant="inline"
                        disabled
                      />
                      <div className="mail-compose-lock-overlay">
                        <p>Register to message the ODYX team.</p>
                        <Link href="/register?role=dentist" className="btn">
                          Register as Dentist
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : selected ? (
                <ThreadReadingPane
                  session={session}
                  thread={selected}
                  isGuest={!!isGuest}
                  apiMode={apiMode}
                  onCompose={openCompose}
                  onReplied={onReplied}
                  onDownload={() => {
                    markDesignDownloaded(session, selected.id);
                    reload();
                  }}
                />
              ) : (
                <div className="mail-read-empty">
                  <div className="mail-empty-glyph" aria-hidden>
                    ✉
                  </div>
                  <h3>Pick a conversation</h3>
                  <p>Select a thread from the left, or start a new message to ODYX.</p>
                  <button type="button" className="btn btn-send-scan" onClick={openCompose}>
                    {apiMode ? 'New message' : 'Send scan to design team'}
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <InnerPageMotion />
    </InboxGate>
  );
}

function ThreadReadingPane({
  session,
  thread,
  isGuest,
  apiMode,
  onCompose,
  onReplied,
  onDownload,
}: {
  session: AccountSession;
  thread: InboxThread;
  isGuest: boolean;
  apiMode: boolean;
  onCompose: () => void;
  onReplied: (thread: InboxThread) => void;
  onDownload: () => void;
}) {
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);

  const designFiles = thread.messages.flatMap((m) =>
    m.attachments.filter((a) => a.kind === 'design'),
  );
  const awaitingDesign = !hasDesignAttachment(thread);

  useEffect(() => {
    const el = conversationRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [thread.id, thread.messages.length]);

  const submitReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || isGuest || !apiMode) return;
    setBusy(true);
    setError('');
    try {
      const updated = await replyToThreadApi(session, thread.id, reply.trim());
      if (updated) {
        onReplied(updated);
        setReply('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reply.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mail-thread">
      <div className="mail-thread-head">
        <div className="mail-thread-head-row">
          <div className="mail-thread-heading">
            <p className="mail-thread-kicker">Conversation · {thread.ref}</p>
            <h2>{threadSubject(thread)}</h2>
          </div>
          {!isGuest ? (
            <button type="button" className="btn-ghost btn btn-sm" onClick={onCompose}>
              + New
            </button>
          ) : null}
        </div>
        <div className="mail-thread-chips">
          <span className="mail-chip">{INDICATION_LABEL[thread.indication]}</span>
          <span className="mail-chip">{SLA_LABEL[thread.sla]}</span>
          <span className={`mail-chip mail-chip--${thread.status}`}>
            {THREAD_STATUS_LABEL[thread.status]}
          </span>
        </div>
        {awaitingDesign ? (
          <p className="mail-thread-wait">
            {apiMode
              ? 'Waiting for the ODYX team — replies will show in this thread.'
              : `Scan sent — design team is working on your case. You'll receive the design file here when ready (${SLA_LABEL[thread.sla]}).`}
          </p>
        ) : null}
      </div>

      <div className="mail-conversation" ref={conversationRef}>
        {thread.messages.map((msg) => (
          <article key={msg.id} className={`mail-message mail-message--${msg.direction}`}>
            <div className="mail-message-avatars" aria-hidden>
              {msg.direction === 'sent' ? initialsFrom(session.name) : 'OX'}
            </div>
            <div className="mail-message-card">
              <div className="mail-message-line">
                <strong>
                  {msg.direction === 'sent' ? 'You' : msg.fromLabel || 'ODYX Team'}
                </strong>
                <time>{formatMessageDate(msg.at)}</time>
              </div>
              <div className="mail-message-body">
                <p>{msg.body}</p>
                {msg.attachments.length > 0 ? (
                  <ul className="mail-attachments">
                    {msg.attachments.map((att) => (
                      <li
                        key={att.id}
                        className={`mail-attachment mail-attachment--${att.kind}`}
                      >
                        <span className="mail-attachment-icon" aria-hidden>
                          {att.kind === 'design' ? '◆' : '📎'}
                        </span>
                        <span className="mail-attachment-name">{att.name}</span>
                        {att.size > 0 ? (
                          <span className="mail-attachment-size">
                            {formatFileSize(att.size)}
                          </span>
                        ) : null}
                        <span className="mail-attachment-type">
                          {att.kind === 'design' ? 'Design file' : 'Attachment'}
                        </span>
                        {att.kind === 'design' && !isGuest ? (
                          <button
                            type="button"
                            className="mail-attachment-dl"
                            onClick={onDownload}
                          >
                            Download
                          </button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {designFiles.length > 0 && !isGuest ? (
        <footer className="mail-thread-foot">
          <button type="button" className="btn btn-send-scan" onClick={onDownload}>
            Download design files
          </button>
        </footer>
      ) : null}

      {apiMode && !isGuest ? (
        <form className="mail-reply-form" onSubmit={submitReply}>
          <label htmlFor="client-reply" className="visually-hidden">
            Reply to ODYX
          </label>
          <textarea
            id="client-reply"
            rows={2}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply to ODYX…"
            required
          />
          {error ? <p className="mail-compose-error">{error}</p> : null}
          <button
            type="submit"
            className="btn btn-send-scan mail-reply-send"
            disabled={busy || !reply.trim()}
          >
            {busy ? 'Sending…' : 'Send'}
          </button>
        </form>
      ) : null}

      {isGuest && designFiles.length > 0 ? (
        <p className="mail-demo-note">
          Demo conversation — <Link href="/register?role=dentist">register</Link> to send and
          download.
        </p>
      ) : null}
    </div>
  );
}
