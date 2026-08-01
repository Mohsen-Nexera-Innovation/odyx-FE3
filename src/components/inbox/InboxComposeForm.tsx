'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { DESIGN_TEAM_EMAIL, type InboxThread } from '@/content/inbox';
import { createThreadFromComposeApi } from '@/lib/inbox-api';
import type { AccountSession } from '@/lib/auth-session';

type InboxComposeFormProps = {
  session: AccountSession;
  onSent: (threadId: string, thread?: InboxThread) => void;
  onCancel?: () => void;
  variant?: 'inline' | 'modal';
  disabled?: boolean;
};

/** Support message to ODYX. Paid design cases start from /design-services. */
export default function InboxComposeForm({
  session,
  onSent,
  onCancel,
  variant = 'inline',
  disabled = false,
}: InboxComposeFormProps) {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setError('');

    if (!notes.trim()) {
      setError('Write a message before sending.');
      return;
    }

    setBusy(true);
    try {
      const preview = notes.trim().slice(0, 72);
      const thread = await createThreadFromComposeApi(session, {
        subject: preview.length < notes.trim().length
          ? `Support — ${preview}…`
          : `Support — ${preview}`,
        body: notes.trim(),
      });
      onSent(thread.id, thread);
      setBusy(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send.');
      setBusy(false);
    }
  };

  return (
    <form
      className={`mail-compose-form mail-compose-form--${variant}${disabled ? ' is-disabled' : ''}`}
      onSubmit={submit}
    >
      <div className="mail-compose-email-row">
        <span className="mail-compose-email-label">To</span>
        <span className="mail-compose-email-value mail-compose-email-value--to">
          {DESIGN_TEAM_EMAIL}
          <span className="mail-compose-email-hint">ODYX Team</span>
        </span>
      </div>
      <div className="mail-compose-email-row">
        <span className="mail-compose-email-label">From</span>
        <span className="mail-compose-email-value">
          {session.name} &lt;{session.email || 'your@clinic.com'}&gt;
        </span>
      </div>

      <label htmlFor="inbox-compose-body" className="mail-compose-label">
        Message
      </label>
      <textarea
        id="inbox-compose-body"
        rows={6}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Describe your question or issue…"
        disabled={disabled || busy}
        required
      />

      {error ? <p className="mail-compose-error">{error}</p> : null}

      <div className="mail-compose-actions">
        {onCancel ? (
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn btn-send-scan" disabled={disabled || busy || !notes.trim()}>
          {busy ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
