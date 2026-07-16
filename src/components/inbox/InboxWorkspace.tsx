'use client';

import Link from 'next/link';
import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
  getThreadApi,
  listThreadsApi,
  markThreadReadApi,
  replyToThreadApi,
} from '@/lib/inbox-api';
import {
  listThreads,
  markDesignDownloaded,
  markThreadRead,
  unreadTotal,
  type AccountSession,
} from '@/lib/inbox-store';
import { isApiMode } from '@/lib/config';
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
  // Inbox: conversations with activity (all client threads)
  return threads;
}

function unreadFromThreads(threads: InboxThread[]) {
  return threads.reduce((n, t) => n + unreadCount(t), 0);
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
      return;
    }
    let cancelled = false;
    setLoading(true);
    void listThreadsApi(session)
      .then((list) => {
        if (cancelled) return;
        setApiThreads(list);
        setLoadError('');
      })
      .catch((err) => {
        if (cancelled) return;
        setApiThreads([]);
        setLoadError(err instanceof Error ? err.message : 'Could not load conversations.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session, apiMode, tick]);

  // Poll for staff replies in API mode
  useEffect(() => {
    if (!session || !apiMode || session.role === 'guest') return;
    const id = window.setInterval(() => reload(), 20000);
    return () => window.clearInterval(id);
  }, [session, apiMode, reload]);

  const threads = useMemo(() => {
    void tick;
    if (!session) return [];
    if (apiMode && session.role !== 'guest') return apiThreads;
    return listThreads(session);
  }, [session, tick, apiMode, apiThreads]);

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
          await markThreadReadApi(id);
          const full = await getThreadApi(session, id);
          if (full) {
            setApiThreads((prev) => {
              const rest = prev.filter((t) => t.id !== id);
              return [full, ...rest].sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
              );
            });
          } else {
            reload();
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

  const onSent = (threadId: string) => {
    setSelectedId(threadId);
    setPaneMode('read');
    setFolder('sent');
    reload();
  };

  const onReplied = (thread: InboxThread) => {
    setApiThreads((prev) => {
      const rest = prev.filter((t) => t.id !== thread.id);
      return [thread, ...rest].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    });
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
                <p className="mail-eyebrow">
                  {apiMode ? 'Client inbox' : 'Design inbox'}
                </p>
                <h1 className="mail-title">
                  {apiMode ? (
                    <>
                      Message <span className="mail-title-brand">ODYX</span>. Track your cases.
                    </>
                  ) : (
                    'Send scans. Receive designs.'
                  )}
                </h1>
                <p className="mail-sub">
                  {apiMode ? (
                    <>
                      Chat with the ODYX team, upload scan files, and get replies in the same
                      conversation.
                    </>
                  ) : (
                    <>
                      Email your STL scan to the ODYX design team at{' '}
                      <strong>{DESIGN_TEAM_EMAIL}</strong> — finished design files arrive back in
                      this inbox, in the same conversation.
                    </>
                  )}
                </p>
              </div>
              <ol className="mail-flow-steps" aria-label="How it works">
                <li>
                  <span>1</span> {apiMode ? 'Message or attach scan' : 'Attach STL scan'}
                </li>
                <li>
                  <span>2</span> {apiMode ? 'ODYX team replies' : 'Design team works'}
                </li>
                <li>
                  <span>3</span> {apiMode ? 'Continue in this thread' : 'Download design'}
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
              {apiMode ? 'New message' : 'Send scan to design team'}
            </button>
            <div className="mail-action-divider" aria-hidden />
            <nav className="mail-action-folders" aria-label="Folders">
              {(
                [
                  ['inbox', 'Inbox', unread],
                  ['designs', 'Designs ready', designsReady],
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
          </div>

          <div className="mail-panels">
            <section className="mail-list-pane" aria-label="Conversations">
              <div className="mail-list-toolbar">
                <input
                  type="search"
                  className="mail-search"
                  placeholder="Search conversations…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ul className="mail-list">
                {loading ? (
                  <li className="mail-list-empty">
                    <p>Loading conversations…</p>
                  </li>
                ) : filtered.length === 0 ? (
                  <li className="mail-list-empty">
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
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          className={`mail-row${active ? ' is-active' : ''}${unreadT ? ' is-unread' : ''}`}
                          onClick={() => selectThread(t.id)}
                        >
                          <span
                            className={`mail-row-icon mail-row-icon--${last?.direction ?? 'sent'}`}
                            aria-hidden
                          >
                            {last?.direction === 'received' ? '↓' : '↑'}
                          </span>
                          <span className="mail-row-body">
                            <span className="mail-row-top">
                              <span className="mail-row-from">
                                {last?.direction === 'received'
                                  ? 'ODYX Team'
                                  : 'You → ODYX'}
                              </span>
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
                            <span className="mail-row-unread" aria-label="Unread" />
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
                  <p>Select a conversation or start a new message.</p>
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

  const designFiles = thread.messages.flatMap((m) =>
    m.attachments.filter((a) => a.kind === 'design'),
  );
  const awaitingDesign = !hasDesignAttachment(thread);

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
          <h2>{threadSubject(thread)}</h2>
          {!isGuest ? (
            <button type="button" className="btn-ghost btn btn-sm" onClick={onCompose}>
              + New
            </button>
          ) : null}
        </div>
        <div className="mail-thread-chips">
          <span className="mail-chip">{thread.ref}</span>
          <span className="mail-chip">{INDICATION_LABEL[thread.indication]}</span>
          <span className="mail-chip">{SLA_LABEL[thread.sla]}</span>
          <span className={`mail-chip mail-chip--${thread.status}`}>
            {THREAD_STATUS_LABEL[thread.status]}
          </span>
        </div>
        {awaitingDesign ? (
          <p className="mail-thread-wait">
            {apiMode
              ? 'Message sent — the ODYX team will reply in this thread.'
              : `Scan sent — design team is working on your case. You'll receive the design file here when ready (${SLA_LABEL[thread.sla]}).`}
          </p>
        ) : null}
      </div>

      <div className="mail-conversation">
        {thread.messages.map((msg) => (
          <article key={msg.id} className={`mail-message mail-message--${msg.direction}`}>
            <div className="mail-message-head">
              <div className="mail-message-avatars" aria-hidden>
                {msg.direction === 'sent' ? 'You' : 'OX'}
              </div>
              <div className="mail-message-meta">
                <div className="mail-message-line">
                  <strong>
                    {msg.direction === 'sent'
                      ? 'You'
                      : msg.fromLabel || 'ODYX Team'}
                  </strong>
                  <time>{formatMessageDate(msg.at)}</time>
                </div>
                <div className="mail-message-line mail-message-line--sub">
                  <span>
                    <b>From</b> {msg.from}
                  </span>
                </div>
              </div>
            </div>
            <div className="mail-message-body">
              <p>{msg.body}</p>
              {msg.attachments.length > 0 ? (
                <ul className="mail-attachments">
                  {msg.attachments.map((att) => (
                    <li key={att.id} className={`mail-attachment mail-attachment--${att.kind}`}>
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
                        <button type="button" className="mail-attachment-dl" onClick={onDownload}>
                          Download
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
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
          <label htmlFor="client-reply" className="mail-compose-label">
            Reply to ODYX
          </label>
          <textarea
            id="client-reply"
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a follow-up message…"
            required
          />
          {error ? <p className="mail-compose-error">{error}</p> : null}
          <div className="mail-compose-foot">
            <button type="submit" className="btn btn-sm" disabled={busy || !reply.trim()}>
              {busy ? 'Sending…' : 'Send reply'}
            </button>
          </div>
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
