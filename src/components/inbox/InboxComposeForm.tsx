'use client';

import { type FormEvent, useState } from 'react';
import StlUploadZone from '@/components/inbox/StlUploadZone';
import {
  DESIGN_TEAM_EMAIL,
  INDICATION_LABEL,
  PRINTER_OPTIONS,
  RESIN_OPTIONS,
  SLA_LABEL,
  type CaseIndication,
  type SlaTier,
} from '@/content/inbox';
import { createThreadFromComposeApi } from '@/lib/inbox-api';
import { sendScanToDesignTeam, scheduleDesignReply, type AccountSession } from '@/lib/inbox-store';
import { isApiMode } from '@/lib/config';

const INDICATIONS = Object.keys(INDICATION_LABEL) as CaseIndication[];

type InboxComposeFormProps = {
  session: AccountSession;
  onSent: (threadId: string) => void;
  onCancel?: () => void;
  variant?: 'inline' | 'modal';
  disabled?: boolean;
};

/** Email-style form — send STL scan to ODYX design team. */
export default function InboxComposeForm({
  session,
  onSent,
  onCancel,
  variant = 'inline',
  disabled = false,
}: InboxComposeFormProps) {
  const isLab = session.role === 'lab';
  const apiMode = isApiMode();
  const [indication, setIndication] = useState<CaseIndication>('crown');
  const [patientRef, setPatientRef] = useState('');
  const [tooth, setTooth] = useState('');
  const [notes, setNotes] = useState('');
  const [sla, setSla] = useState<SlaTier>('same_day');
  const [resin, setResin] = useState<string>(RESIN_OPTIONS[0]);
  const [printer, setPrinter] = useState<string>(PRINTER_OPTIONS[0]);
  const [batchRef, setBatchRef] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setError('');

    // Demo mode still requires a scan file. API mode allows message-only chat.
    if (!apiMode && !file) {
      setError('Attach your STL or ZIP scan file before sending.');
      return;
    }
    if (apiMode && !file && !notes.trim()) {
      setError('Write a message or attach a scan file.');
      return;
    }
    if (isLab && !batchRef.trim() && file) {
      setError('Batch reference is required for lab submissions.');
      return;
    }

    setBusy(true);
    try {
      const subject = file
        ? `Scan upload — ${INDICATION_LABEL[indication]}${tooth.trim() ? ` ${tooth.trim()}` : ''}${patientRef.trim() ? ` (${patientRef.trim()})` : ''}`
        : `Message — ${INDICATION_LABEL[indication]}${patientRef.trim() ? ` (${patientRef.trim()})` : ''}`;
      const body =
        notes.trim() ||
        (file
          ? `Please process the attached scan. Turnaround: ${sla === 'same_day' ? 'same day' : '24 hours'}.` +
            (isLab && batchRef.trim()
              ? `\nBatch: ${batchRef.trim()}. Resin: ${resin}. Printer: ${printer}.`
              : '')
          : 'Hello ODYX team — I need help with my case.');

      if (apiMode) {
        const thread = await createThreadFromComposeApi(session, {
          subject,
          body,
          attachmentName: file?.name,
        });
        onSent(thread.id);
      } else {
        const thread = sendScanToDesignTeam(session, {
          indication,
          patientRef: patientRef.trim() || undefined,
          tooth: tooth.trim() || undefined,
          notes: notes.trim() || undefined,
          sla,
          resin: isLab ? resin : undefined,
          printer: isLab ? printer : undefined,
          batchRef: isLab ? batchRef.trim() : undefined,
          stlFile: { name: file!.name, size: file!.size },
        });
        scheduleDesignReply(session, thread.id);
        onSent(thread.id);
      }
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
          <span className="mail-compose-email-hint">ODYX Design Team · partner lab</span>
        </span>
      </div>
      <div className="mail-compose-email-row">
        <span className="mail-compose-email-label">From</span>
        <span className="mail-compose-email-value">
          {session.name} &lt;{session.email || 'your@clinic.com'}&gt;
        </span>
      </div>

      <div className="mail-compose-row">
        <div className="mail-compose-field">
          <label htmlFor="cmp-indication">Case type</label>
          <select
            id="cmp-indication"
            value={indication}
            disabled={disabled}
            onChange={(e) => setIndication(e.target.value as CaseIndication)}
          >
            {INDICATIONS.map((id) => (
              <option key={id} value={id}>
                {INDICATION_LABEL[id]}
              </option>
            ))}
          </select>
        </div>
        <div className="mail-compose-field">
          <label htmlFor="cmp-sla">Turnaround</label>
          <select
            id="cmp-sla"
            value={sla}
            disabled={disabled}
            onChange={(e) => setSla(e.target.value as SlaTier)}
          >
            {(Object.keys(SLA_LABEL) as SlaTier[]).map((tier) => (
              <option key={tier} value={tier}>
                {SLA_LABEL[tier]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mail-compose-row">
        <div className="mail-compose-field">
          <label htmlFor="cmp-patient">Patient ref</label>
          <input
            id="cmp-patient"
            placeholder="PT-204 (optional, anonymized)"
            value={patientRef}
            disabled={disabled}
            onChange={(e) => setPatientRef(e.target.value)}
          />
        </div>
        <div className="mail-compose-field">
          <label htmlFor="cmp-tooth">Tooth / site</label>
          <input
            id="cmp-tooth"
            placeholder="#14"
            value={tooth}
            disabled={disabled}
            onChange={(e) => setTooth(e.target.value)}
          />
        </div>
      </div>

      {isLab ? (
        <div className="mail-compose-row">
          <div className="mail-compose-field">
            <label htmlFor="cmp-batch">Batch ref</label>
            <input
              id="cmp-batch"
              placeholder="BATCH-04"
              value={batchRef}
              disabled={disabled}
              onChange={(e) => setBatchRef(e.target.value)}
              required
            />
          </div>
          <div className="mail-compose-field">
            <label htmlFor="cmp-resin">Target resin</label>
            <select
              id="cmp-resin"
              value={resin}
              disabled={disabled}
              onChange={(e) => setResin(e.target.value)}
            >
              {RESIN_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mail-compose-field">
            <label htmlFor="cmp-printer">Printer</label>
            <select
              id="cmp-printer"
              value={printer}
              disabled={disabled}
              onChange={(e) => setPrinter(e.target.value)}
            >
              {PRINTER_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      <div className="mail-compose-field">
        <label htmlFor="cmp-body">Message to design team</label>
        <textarea
          id="cmp-body"
          rows={4}
          disabled={disabled}
          placeholder="Margin line, contacts, material notes, urgency…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="mail-compose-field">
        <span className="mail-compose-label">
          Attach scan (STL or ZIP){apiMode ? ' — optional' : ' — required'}
        </span>
        <StlUploadZone
          file={file}
          onFile={disabled ? () => {} : setFile}
          error={error && !file && !apiMode ? error : undefined}
        />
      </div>

      {error ? <p className="mail-compose-error">{error}</p> : null}

      <footer className="mail-compose-foot">
        {onCancel ? (
          <button type="button" className="btn-ghost btn btn-sm" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn btn-send-scan" disabled={busy || disabled}>
          {busy ? 'Sending…' : apiMode ? 'Send to ODYX' : 'Send scan to design team'}
        </button>
      </footer>
    </form>
  );
}
