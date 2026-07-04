'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  listThreads,
  markDesignDownloaded,
  markThreadRead,
  unreadTotal,
  type AccountSession,
} from '@/lib/inbox-store';
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
  return threads;
}

export default function InboxWorkspace() {
  const { session } = useAuthSession();
  const [folder, setFolder] = useState<InboxFolder>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paneMode, setPaneMode] = useState<PaneMode>('compose');
  const [search, setSearch] = useState('');
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    const onInboxChange = () => reload();
    window.addEventListener('odyx-inbox-change', onInboxChange);
    return () => window.removeEventListener('odyx-inbox-change', onInboxChange);
  }, [reload]);

  const threads = useMemo(() => {
    void tick;
    return session ? listThreads(session) : [];
  }, [session, tick]);

  const filtered = useMemo(() => {
    let list = filterThreads(threads, folder);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.ref.toLowerCase().includes(q) ||
          threadSubject(t).toLowerCase().includes(q) ||
          t.patientRef?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [threads, folder, search]);

  const selected = useMemo(
    () => threads.find((t) => t.id === selectedId) ?? null,
    [threads, selectedId],
  );

  const isGuest = session?.role === 'guest';
  const canSend = !isGuest;

  useEffect(() => {
    if (!session || isGuest) return;
    if (threads.length === 0) setPaneMode('compose');
  }, [session, isGuest, threads.length]);

  const openCompose = () => {
    setSelectedId(null);
    setPaneMode('compose');
  };

  const selectThread = (id: string) => {
    setSelectedId(id);
    setPaneMode('read');
    if (session) {
      markThreadRead(session, id);
      reload();
    }
  };

  const onSent = (threadId: string) => {
    setSelectedId(threadId);
    setPaneMode('read');
    setFolder('sent');
    reload();
  };

  if (!session) return null;

  const unread = unreadTotal(session);
  const designsReady = threads.filter((t) => hasDesignAttachment(t) && t.status === 'design_delivered').length;

  return (
    <InboxGate>
      <div className="mail-workspace" data-role={session.role}>
        <div className="wrap mail-wrap">
          {/* Business header */}
          <header className="mail-hero">
            <div className="mail-hero-text">
              <p className="eyebrow mail-eyebrow">Design inbox</p>
              <h1 className="mail-title">Send scans. Receive designs.</h1>
              <p className="mail-sub">
                Email your STL scan to the ODYX design team at{' '}
                <strong>{DESIGN_TEAM_EMAIL}</strong> — finished design files arrive back in this
                inbox, in the same conversation.
              </p>
            </div>
            <ol className="mail-flow-steps" aria-label="How it works">
              <li>
                <span>1</span> Attach STL scan
              </li>
              <li>
                <span>2</span> Design team works
              </li>
              <li>
                <span>3</span> Download design
              </li>
            </ol>
          </header>

          {isGuest ? (
            <div className="mail-banner mail-banner--guest">
              <div>
                <strong>Preview mode</strong>
                <p>
                  You&apos;re browsing demo conversations. Register as a Dentist or Lab to send
                  scans and receive design files.
                </p>
              </div>
              <Link href="/register?role=dentist" className="btn btn-sm">
                Create account
              </Link>
            </div>
          ) : null}

          {/* Always-visible action bar — primary business action */}
          <div className="mail-action-bar">
            <button
              type="button"
              className="btn btn-send-scan mail-action-primary"
              onClick={openCompose}
            >
              Send scan to design team
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
            {/* Thread list */}
            <section className="mail-list-pane" aria-label="Conversations">
              <div className="mail-list-toolbar">
                <input
                  type="search"
                  className="mail-search"
                  placeholder="Search cases…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ul className="mail-list">
                {filtered.length === 0 ? (
                  <li className="mail-list-empty">
                    <p>No conversations in this folder.</p>
                    {canSend ? (
                      <button type="button" className="btn btn-sm" onClick={openCompose}>
                        Send your first scan
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
                                  ? 'Design Team'
                                  : 'You → Design Team'}
                              </span>
                              <span className="mail-row-date">{formatMessageDate(t.updatedAt)}</span>
                            </span>
                            <span className="mail-row-subject">{threadSubject(t)}</span>
                            <span className="mail-row-preview">{threadPreview(t)}</span>
                            <span className="mail-row-meta">
                              <span className="mail-row-ref">{t.ref}</span>
                              {hasDesignAttachment(t) ? (
                                <span className="mail-row-tag mail-row-tag--design">Design file</span>
                              ) : (
                                <span className="mail-row-tag">{THREAD_STATUS_LABEL[t.status]}</span>
                              )}
                            </span>
                          </span>
                          {unreadT > 0 ? <span className="mail-row-unread" aria-label="Unread" /> : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>

            {/* Right pane: compose OR read conversation */}
            <section className="mail-read-pane" aria-label={paneMode === 'compose' ? 'Send scan' : 'Conversation'}>
              {paneMode === 'compose' ? (
                <div className="mail-compose-pane">
                  <header className="mail-compose-pane-head">
                    <h2>Send scan to design team</h2>
                    <p>
                      This works like email — your scan is sent to{' '}
                      <a href={`mailto:${DESIGN_TEAM_EMAIL}`}>{DESIGN_TEAM_EMAIL}</a>. The design
                      file comes back in this same thread.
                    </p>
                  </header>
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
                        <p>Register to send scans to the design team.</p>
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
                  isGuest={isGuest}
                  onCompose={openCompose}
                  onDownload={() => {
                    markDesignDownloaded(session, selected.id);
                    reload();
                  }}
                />
              ) : (
                <div className="mail-read-empty">
                  <p>Select a conversation or send a new scan.</p>
                  <button type="button" className="btn btn-send-scan" onClick={openCompose}>
                    Send scan to design team
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
  onCompose,
  onDownload,
}: {
  session: AccountSession;
  thread: InboxThread;
  isGuest: boolean;
  onCompose: () => void;
  onDownload: () => void;
}) {
  const designFiles = thread.messages.flatMap((m) =>
    m.attachments.filter((a) => a.kind === 'design'),
  );
  const awaitingDesign = !hasDesignAttachment(thread);

  return (
    <div className="mail-thread">
      <header className="mail-thread-head">
        <div className="mail-thread-head-row">
          <h2>{threadSubject(thread)}</h2>
          {!isGuest ? (
            <button type="button" className="btn-ghost btn btn-sm" onClick={onCompose}>
              + New scan
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
            Scan sent — design team is working on your case. You&apos;ll receive the design file
            here when ready ({SLA_LABEL[thread.sla]}).
          </p>
        ) : null}
      </header>

      <div className="mail-conversation">
        {thread.messages.map((msg) => (
          <article key={msg.id} className={`mail-message mail-message--${msg.direction}`}>
            <header className="mail-message-head">
              <div className="mail-message-avatars" aria-hidden>
                {msg.direction === 'sent' ? 'You' : 'DT'}
              </div>
              <div className="mail-message-meta">
                <div className="mail-message-line">
                  <strong>
                    {msg.direction === 'sent'
                      ? `You sent scan to ${msg.toLabel}`
                      : `${msg.fromLabel} replied`}
                  </strong>
                  <time>{formatMessageDate(msg.at)}</time>
                </div>
                <div className="mail-message-line mail-message-line--sub">
                  <span>
                    <b>To</b> {msg.to}
                  </span>
                  <span>
                    <b>From</b> {msg.from}
                  </span>
                </div>
              </div>
            </header>
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
                      <span className="mail-attachment-size">{formatFileSize(att.size)}</span>
                      <span className="mail-attachment-type">
                        {att.kind === 'design' ? 'Design file' : 'Scan upload'}
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

      {isGuest && designFiles.length > 0 ? (
        <p className="mail-demo-note">
          Demo conversation — <Link href="/register?role=dentist">register</Link> to send and
          download.
        </p>
      ) : null}
    </div>
  );
}
