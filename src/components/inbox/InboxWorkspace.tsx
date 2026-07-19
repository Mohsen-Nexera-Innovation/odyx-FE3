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
import { useSearchParams } from 'next/navigation';
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
  isAwaitingReply,
  isSupportThread,
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
  if (folder === 'awaiting') {
    return threads.filter((t) => isAwaitingReply(t));
  }
  if (folder === 'designs') {
    return threads.filter((t) => hasDesignAttachment(t));
  }
  if (folder === 'support') {
    return threads.filter((t) => isSupportThread(t));
  }
  // Inbox: every conversation
  return threads;
}

function unreadFromThreads(threads: InboxThread[]) {
  return threads.reduce((n, t) => n + unreadCount(t), 0);
}

const FOLDER_EMPTY_COPY: Record<InboxFolder, { title: string; hint: string }> = {
  inbox: {
    title: 'Your inbox is empty',
    hint: 'Start a design case or send the team a support message.',
  },
  designs: {
    title: 'No design files yet',
    hint: 'Finished design files from the ODYX team will land here, ready to download.',
  },
  support: {
    title: 'No support messages',
    hint: 'Questions about an order, your account, or an existing case? Write to the team.',
  },
  awaiting: {
    title: 'Nothing waiting on ODYX',
    hint: 'Conversations where you sent the last message show up here until the team replies.',
  },
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'OX';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

type IconProps = { className?: string };

const svgBase = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 7.4 5.2a1 1 0 0 0 1.2 0L20 7.5" />
    </svg>
  );
}

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.1-3.1" />
    </svg>
  );
}

function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** 3D cube — evokes STL / printable design files. */
function CubeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <path d="M12 2.6 3.5 7v10L12 21.4 20.5 17V7z" />
      <path d="M3.7 7.2 12 12l8.3-4.8M12 12v9.2" />
    </svg>
  );
}

function PaperclipIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <path d="M20.4 11.5 12 19.9a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />
    </svg>
  );
}

/** Life-buoy — support / help. */
function SupportIcon({ className }: IconProps) {
  return (
    <svg className={className} {...svgBase}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="m5.3 5.3 3.3 3.3m6.8 6.8 3.3 3.3m0-13.4-3.3 3.3M8.6 15.4l-3.3 3.3" />
    </svg>
  );
}

export default function InboxWorkspace() {
  const { session } = useAuthSession();
  const searchParams = useSearchParams();
  const paidOrderNumber = searchParams.get('order');
  const orderConfirmed = searchParams.get('confirmed') === '1';
  const handoffThreadId = searchParams.get('thread');
  const openSupportCompose =
    !handoffThreadId &&
    !orderConfirmed &&
    searchParams.get('compose') === '1';

  const [folder, setFolder] = useState<InboxFolder>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(handoffThreadId);
  const [paneMode, setPaneMode] = useState<PaneMode>(
    handoffThreadId || orderConfirmed
      ? 'read'
      : openSupportCompose
        ? 'compose'
        : 'read',
  );
  const [search, setSearch] = useState('');
  // On narrow screens the list and conversation share one column; this tracks
  // which of the two is visible so we can present a proper master–detail flow.
  const [mobileView, setMobileView] = useState<'list' | 'detail'>(
    handoffThreadId || orderConfirmed ? 'detail' : 'list',
  );
  const [tick, setTick] = useState(0);
  const [apiThreads, setApiThreads] = useState<InboxThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const apiMode = isApiMode();
  const selectedIdRef = useRef<string | null>(null);
  const hasLoadedRef = useRef(false);

  selectedIdRef.current = selectedId;

  useEffect(() => {
    if (handoffThreadId) {
      setSelectedId(handoffThreadId);
      setPaneMode('read');
      return;
    }
    if (orderConfirmed && paidOrderNumber) {
      setPaneMode('read');
      return;
    }
    if (openSupportCompose) {
      setPaneMode('compose');
      setSelectedId(null);
    }
  }, [openSupportCompose, paidOrderNumber, handoffThreadId, orderConfirmed]);

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

  // Default empty inbox to compose — but never override a paid-order handoff.
  useEffect(() => {
    if (!session || isGuest) return;
    if (handoffThreadId || orderConfirmed) return;
    if (threads.length === 0 && !loading) setPaneMode('compose');
  }, [session, isGuest, threads.length, loading, handoffThreadId, orderConfirmed]);

  // After checkout: open the thread for this order if URL has thread or we find it by order #.
  useEffect(() => {
    if (!orderConfirmed || !paidOrderNumber || handoffThreadId) return;
    if (loading || threads.length === 0) return;
    const match = threads.find(
      (t) => t.orderNumber === paidOrderNumber || t.ref === paidOrderNumber,
    );
    if (match) {
      setSelectedId(match.id);
      setPaneMode('read');
    }
  }, [orderConfirmed, paidOrderNumber, handoffThreadId, loading, threads]);

  const openCompose = () => {
    setSelectedId(null);
    setPaneMode('compose');
    setMobileView('detail');
  };

  const startDesignCase = () => {
    window.location.href = '/design-services';
  };

  const backToList = () => setMobileView('list');

  const goToFolder = (target: InboxFolder) => {
    setFolder(target);
    setMobileView('list');
  };

  const selectThread = (id: string) => {
    setSelectedId(id);
    setPaneMode('read');
    setMobileView('detail');
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
    setMobileView('detail');
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
  const supportCount = threads.filter((t) => isSupportThread(t)).length;
  const awaitingCount = threads.filter((t) => isAwaitingReply(t)).length;

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
                  <button
                    type="button"
                    className="mail-hero-stat"
                    onClick={() => goToFolder('inbox')}
                    title="Show all conversations"
                  >
                    <strong>{threads.length}</strong>
                    <span>Conversations</span>
                  </button>
                  <button
                    type="button"
                    className="mail-hero-stat"
                    onClick={() => goToFolder('inbox')}
                    title="Show all conversations"
                  >
                    <strong>{unread}</strong>
                    <span>Unread</span>
                  </button>
                  <button
                    type="button"
                    className="mail-hero-stat"
                    onClick={() => goToFolder('designs')}
                    title="Show conversations with design files"
                  >
                    <strong>{designsReady}</strong>
                    <span>Designs ready</span>
                  </button>
                </div>
              </div>
              <ol className="mail-flow-steps" aria-label="How it works">
                <li>
                  <span>1</span>
                  <div>
                    <b>{apiMode ? 'Request a design' : 'Attach scan'}</b>
                    <small>{apiMode ? 'Service → form → checkout' : 'STL file'}</small>
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
            <Link
              href="/design-services"
              className="btn btn-send-scan mail-action-primary"
              title="Opens the Design services page to request a new case"
              aria-label="New design case — opens the Design services page"
            >
              <span className="mail-action-plus" aria-hidden>
                <PlusIcon />
              </span>
              <span className="mail-action-primary-text">
                New design case
                <small>
                  Request on Design services
                  <ArrowUpRightIcon className="mail-action-ext" />
                </small>
              </span>
            </Link>
            <button
              type="button"
              className="btn btn-sm mail-action-support"
              onClick={openCompose}
            >
              <SupportIcon className="mail-action-icon" />
              Support message
            </button>
            <div className="mail-action-divider" aria-hidden />
            <nav className="mail-action-folders" aria-label="Folders">
              {(
                [
                  ['inbox', 'Inbox', unread],
                  ['designs', 'Designs', designsReady],
                  ['support', 'Support', supportCount],
                  ['awaiting', 'Awaiting reply', awaitingCount],
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
                    <span
                      className={`mail-action-badge${id === 'support' || id === 'awaiting' ? ' mail-action-badge--neutral' : ''}`}
                    >
                      {badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>
            <p className="mail-action-greeting">
              Hi, <strong>{session.name.split(' ')[0] || session.name}</strong>
            </p>
          </div>

          <div className="mail-panels" data-mobile-view={mobileView}>
            <section className="mail-list-pane" aria-label="Conversations">
              <div className="mail-list-toolbar">
                <div className="mail-list-toolbar-top">
                  <h2 className="mail-list-title">
                    {
                      {
                        inbox: 'Conversations',
                        designs: 'Design files',
                        support: 'Support',
                        awaiting: 'Awaiting reply',
                      }[folder]
                    }
                  </h2>
                  <span className="mail-list-count">{filtered.length}</span>
                </div>
                <label className="mail-search-wrap">
                  <span className="mail-search-icon" aria-hidden>
                    <SearchIcon />
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
                  <li className="mail-list-skeleton" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="mail-skel-row">
                        <span className="mail-skel-avatar" />
                        <span className="mail-skel-body">
                          <span className="mail-skel-line mail-skel-line--sm" />
                          <span className="mail-skel-line" />
                          <span className="mail-skel-line mail-skel-line--md" />
                        </span>
                      </div>
                    ))}
                    <span className="visually-hidden">Loading conversations…</span>
                  </li>
                ) : filtered.length === 0 && search.trim() ? (
                  <li className="mail-list-empty">
                    <div className="mail-empty-glyph" aria-hidden>
                      <SearchIcon />
                    </div>
                    <p>
                      No matches for “<strong>{search.trim()}</strong>”.
                    </p>
                    <div className="mail-empty-actions">
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        onClick={() => setSearch('')}
                      >
                        Clear search
                      </button>
                    </div>
                  </li>
                ) : filtered.length === 0 ? (
                  <li className="mail-list-empty">
                    <div className="mail-empty-glyph" aria-hidden>
                      {folder === 'designs' ? (
                        <CubeIcon />
                      ) : folder === 'support' ? (
                        <SupportIcon />
                      ) : (
                        <MailIcon />
                      )}
                    </div>
                    <p className="mail-empty-title">{FOLDER_EMPTY_COPY[folder].title}</p>
                    <p className="mail-empty-hint">{FOLDER_EMPTY_COPY[folder].hint}</p>
                    {canSend ? (
                      <div className="mail-empty-actions">
                        {folder === 'support' ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-send-scan"
                            onClick={openCompose}
                          >
                            Write to the team
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-send-scan mail-goto-design"
                              onClick={startDesignCase}
                              title="Opens the Design services page"
                            >
                              New design case
                              <ArrowUpRightIcon className="mail-action-ext" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-ghost"
                              onClick={openCompose}
                            >
                              Support message
                            </button>
                          </>
                        )}
                      </div>
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
                              {t.orderNumber ? (
                                <span className="mail-row-tag mail-row-tag--billing-paid">
                                  Paid · {t.orderNumber}
                                </span>
                              ) : null}
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
                    <button
                      type="button"
                      className="mail-back-btn"
                      onClick={backToList}
                    >
                      <span aria-hidden>‹</span> Conversations
                    </button>
                    <p className="mail-compose-kicker">Support</p>
                    <h2>Support message</h2>
                    <p>
                      Ask the ODYX team about an order, account, or existing
                      case. For a new paid design,{' '}
                      <a href="/design-services">start from Design services</a>.
                    </p>
                  </div>
                  {canSend ? (
                    <InboxComposeForm
                      session={session}
                      onSent={onSent}
                      onCancel={
                        threads.length > 0
                          ? () => {
                              setPaneMode('read');
                            }
                          : undefined
                      }
                      variant="inline"
                    />
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
                  onBack={backToList}
                  onReplied={onReplied}
                  onDownload={() => {
                    markDesignDownloaded(session, selected.id);
                    reload();
                  }}
                />
              ) : handoffThreadId || orderConfirmed ? (
                <div className="mail-read-empty">
                  <h3>
                    {orderConfirmed
                      ? 'Opening your confirmed order…'
                      : 'Loading conversation…'}
                  </h3>
                  <p>
                    {paidOrderNumber
                      ? `Order ${paidOrderNumber} is confirmed. Your design case will appear here shortly.`
                      : 'Fetching your design conversation.'}
                  </p>
                </div>
              ) : (
                <div className="mail-read-empty">
                  <div className="mail-empty-glyph" aria-hidden>
                    <MailIcon />
                  </div>
                  <h3>Pick a conversation</h3>
                  <p>Select a thread from the left, or start a new message to ODYX.</p>
                  <div className="mail-empty-actions">
                    <button
                      type="button"
                      className="btn btn-send-scan mail-goto-design"
                      onClick={startDesignCase}
                      title="Opens the Design services page"
                    >
                      New design case
                      <ArrowUpRightIcon className="mail-action-ext" />
                    </button>
                    {canSend ? (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={openCompose}
                      >
                        Support message
                      </button>
                    ) : null}
                  </div>
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
  onBack,
  onReplied,
  onDownload,
}: {
  session: AccountSession;
  thread: InboxThread;
  isGuest: boolean;
  apiMode: boolean;
  onCompose: () => void;
  onBack: () => void;
  onReplied: (thread: InboxThread) => void;
  onDownload: () => void;
}) {
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLTextAreaElement>(null);

  const designFiles = thread.messages.flatMap((m) =>
    m.attachments.filter((a) => a.kind === 'design'),
  );
  const awaitingDesign = !hasDesignAttachment(thread);

  useEffect(() => {
    const el = conversationRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [thread.id, thread.messages.length]);

  const autoSize = useCallback(() => {
    const el = replyRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    autoSize();
  }, [reply, autoSize]);

  const submitReply = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      if (!reply.trim() || isGuest || !apiMode || busy) return;
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
    },
    [reply, isGuest, apiMode, busy, session, thread.id, onReplied],
  );

  return (
    <div className="mail-thread">
      <div className="mail-thread-head">
        <button type="button" className="mail-back-btn" onClick={onBack}>
          <span aria-hidden>‹</span> Conversations
        </button>
        <div className="mail-thread-head-row">
          <div className="mail-thread-heading">
            <p className="mail-thread-kicker">Conversation · {thread.ref}</p>
            <h2>{threadSubject(thread)}</h2>
          </div>
          {!isGuest ? (
            <button type="button" className="btn-ghost btn btn-sm" onClick={onCompose}>
              Support
            </button>
          ) : null}
        </div>
        <div className="mail-thread-chips">
          <span className="mail-chip">{INDICATION_LABEL[thread.indication]}</span>
          <span className="mail-chip">{SLA_LABEL[thread.sla]}</span>
          <span className={`mail-chip mail-chip--${thread.status}`}>
            {THREAD_STATUS_LABEL[thread.status]}
          </span>
          {thread.orderNumber ? (
            <span className="mail-chip mail-chip--billing-paid">
              Paid · {thread.orderNumber}
            </span>
          ) : null}
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
                          {att.kind === 'design' ? <CubeIcon /> : <PaperclipIcon />}
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
            ref={replyRef}
            rows={1}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void submitReply();
              }
            }}
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
          <span className="mail-reply-hint" aria-hidden>
            <kbd>Enter</kbd> to send · <kbd>Shift</kbd>+<kbd>Enter</kbd> for a new line
          </span>
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
