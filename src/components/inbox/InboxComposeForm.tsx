'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { DESIGN_TEAM_EMAIL, type InboxThread } from '@/content/inbox';
import { createThreadFromComposeApi } from '@/lib/inbox-api';
import type { AccountSession } from '@/lib/inbox-store';
import { isApiMode } from '@/lib/config';

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
  const apiMode = isApiMode();
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setError('');

    if (!apiMode) {
      setError('Register and use Design services to submit a paid design case.');
      return;
    }
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

      <div className="mail-compose-field">
        <label htmlFor="cmp-body">Your message</label>
        <textarea
          id="cmp-body"
          rows={6}
          disabled={disabled}
          placeholder="Describe your question — order help, account issue, or an existing case…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <p className="mail-compose-support-hint">
        Need a new design instead?{' '}
        <Link href="/design-services">Go to Design services</Link>
      </p>

      {error ? <p className="mail-compose-error">{error}</p> : null}

      <footer className="mail-compose-foot">
        {onCancel ? (
          <button
            type="button"
            className="btn-ghost btn btn-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="btn btn-send-scan"
          disabled={busy || disabled || !notes.trim()}
        >
          {busy ? 'Sending…' : 'Send support message'}
        </button>
      </footer>
    </form>
  );
}
