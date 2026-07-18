'use client';

import Link from 'next/link';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import StlUploadZone from '@/components/inbox/StlUploadZone';
import {
  DESIGN_SERVICES,
  getDesignServiceByIndication,
  quoteDesignIndication,
  serviceSlugFromIndication,
} from '@/content/design-services';
import {
  DESIGN_TEAM_EMAIL,
  INDICATION_LABEL,
  PRINTER_OPTIONS,
  RESIN_OPTIONS,
  SLA_LABEL,
  isPaidDesignIndication,
  type CaseIndication,
  type InboxThread,
  type SlaTier,
} from '@/content/inbox';
import { formatMoney, type ShopProduct } from '@/content/shop';
import { createThreadFromComposeApi } from '@/lib/inbox-api';
import { sendScanToDesignTeam, scheduleDesignReply, type AccountSession } from '@/lib/inbox-store';
import { fetchShopProducts } from '@/lib/commerce';
import { isApiMode } from '@/lib/config';

const INDICATIONS = Object.keys(INDICATION_LABEL) as CaseIndication[];

type InboxComposeFormProps = {
  session: AccountSession;
  onSent: (threadId: string, thread?: InboxThread) => void;
  onCancel?: () => void;
  variant?: 'inline' | 'modal';
  disabled?: boolean;
  /** Prefill + lock case type (paid design checkout handoff). */
  lockedIndication?: CaseIndication | null;
  paidOrderNumber?: string | null;
};

/** Email-style form — request a design case or send STL to ODYX design team. */
export default function InboxComposeForm({
  session,
  onSent,
  onCancel,
  variant = 'inline',
  disabled = false,
  lockedIndication = null,
  paidOrderNumber = null,
}: InboxComposeFormProps) {
  const isLab = session.role === 'lab';
  const apiMode = isApiMode();
  const [indication, setIndication] = useState<CaseIndication>(
    lockedIndication ?? 'single_unit',
  );
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
  const [catalog, setCatalog] = useState<ShopProduct[]>(DESIGN_SERVICES);
  const indicationLocked = Boolean(lockedIndication);
  const activeIndication = lockedIndication ?? indication;
  const isDesignRequest = isPaidDesignIndication(activeIndication);
  const isPaidCase = Boolean(paidOrderNumber);
  /** Design cases (paid or unpaid request) require an STL. Support ("other") can be message-only in API mode. */
  const scanRequired = isDesignRequest || isPaidCase;

  useEffect(() => {
    if (!apiMode) {
      setCatalog(DESIGN_SERVICES);
      return;
    }
    let cancelled = false;
    void fetchShopProducts('design')
      .then((list) => {
        if (!cancelled && list.length) setCatalog(list);
      })
      .catch(() => {
        if (!cancelled) setCatalog(DESIGN_SERVICES);
      });
    return () => {
      cancelled = true;
    };
  }, [apiMode]);

  const quotedService = useMemo(() => {
    if (!isDesignRequest) return undefined;
    const slug = serviceSlugFromIndication(activeIndication);
    if (!slug) return getDesignServiceByIndication(activeIndication);
    return (
      catalog.find((p) => p.slug === slug || p.id === slug) ??
      getDesignServiceByIndication(activeIndication)
    );
  }, [activeIndication, catalog, isDesignRequest]);

  const quotedPrice = quotedService?.price ?? quoteDesignIndication(activeIndication);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setError('');

    if (scanRequired && !file) {
      setError('Attach your STL scan file before sending.');
      return;
    }
    // Support / other: demo still needs a file; API allows message-only.
    if (!scanRequired && !apiMode && !file) {
      setError('Attach your STL scan file before sending.');
      return;
    }
    if (!scanRequired && apiMode && !file && !notes.trim()) {
      setError('Write a message or attach a scan file.');
      return;
    }
    if (isLab && !batchRef.trim() && file) {
      setError('Batch reference is required for lab submissions.');
      return;
    }

    setBusy(true);
    try {
      const priceNote =
        isDesignRequest && !isPaidCase && quotedPrice > 0
          ? `Quoted price: ${formatMoney(quotedPrice)}${quotedService?.unit ? ` (${quotedService.unit})` : ''}.`
          : '';
      const paidPrefix = paidOrderNumber
        ? `Paid order ${paidOrderNumber} — `
        : isDesignRequest
          ? `Design request (${formatMoney(quotedPrice)}) — `
          : '';
      const subject = file
        ? `${paidPrefix}Scan upload — ${INDICATION_LABEL[activeIndication]}${tooth.trim() ? ` ${tooth.trim()}` : ''}${patientRef.trim() ? ` (${patientRef.trim()})` : ''}`
        : `${paidPrefix}Message — ${INDICATION_LABEL[activeIndication]}${patientRef.trim() ? ` (${patientRef.trim()})` : ''}`;
      const defaultBody = file
        ? `Please process the attached scan. Turnaround: ${sla === 'same_day' ? 'same day' : '24 hours'}.` +
          (isLab && batchRef.trim()
            ? `\nBatch: ${batchRef.trim()}. Resin: ${resin}. Printer: ${printer}.`
            : '') +
          (priceNote ? `\n${priceNote}` : '')
        : 'Hello ODYX team — I need help with my case.';
      const body = notes.trim()
        ? `${notes.trim()}${priceNote ? `\n\n${priceNote}` : ''}`
        : defaultBody;

      if (apiMode) {
        const thread = await createThreadFromComposeApi(session, {
          subject,
          body,
          attachmentName: file?.name,
          orderNumber: paidOrderNumber ?? undefined,
        });
        onSent(thread.id, thread);
      } else {
        if (!file) {
          setError('Attach your STL scan file before sending.');
          setBusy(false);
          return;
        }
        const thread = sendScanToDesignTeam(session, {
          indication: activeIndication,
          patientRef: patientRef.trim() || undefined,
          tooth: tooth.trim() || undefined,
          notes: notes.trim() || undefined,
          sla,
          resin: isLab ? resin : undefined,
          printer: isLab ? printer : undefined,
          batchRef: isLab ? batchRef.trim() : undefined,
          orderNumber: paidOrderNumber ?? undefined,
          stlFile: { name: file.name, size: file.size },
        });
        scheduleDesignReply(session, thread.id);
        onSent(thread.id, thread);
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

      {isPaidCase ? (
        <p className="mail-compose-paid-banner" role="status">
          Paid design service — order <strong>{paidOrderNumber}</strong>
          {indicationLocked ? (
            <>
              {' '}
              · {INDICATION_LABEL[activeIndication]}
            </>
          ) : null}
        </p>
      ) : isDesignRequest ? (
        <p className="mail-compose-request-banner" role="status">
          Unpaid design request — quote updates with case type. Prefer to pay first?{' '}
          <Link href="/design-services">Buy design service</Link>
        </p>
      ) : null}

      <div className="mail-compose-row">
        <div className="mail-compose-field">
          <label htmlFor="cmp-indication">Case type</label>
          <select
            id="cmp-indication"
            value={activeIndication}
            disabled={disabled || indicationLocked}
            onChange={(e) => setIndication(e.target.value as CaseIndication)}
          >
            {INDICATIONS.map((id) => {
              const price = quoteDesignIndication(id);
              return (
                <option key={id} value={id}>
                  {INDICATION_LABEL[id]}
                  {price > 0 ? ` — ${formatMoney(price)}` : ''}
                </option>
              );
            })}
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

      {isDesignRequest && !isPaidCase && quotedPrice > 0 ? (
        <div className="mail-compose-quote" aria-live="polite">
          <div>
            <span className="mail-compose-quote-label">Estimated price</span>
            <strong className="mail-compose-quote-price">{formatMoney(quotedPrice)}</strong>
            {quotedService?.unit ? (
              <span className="mail-compose-quote-unit">{quotedService.unit}</span>
            ) : null}
          </div>
          <Link className="btn btn-ghost btn-sm" href="/design-services">
            Pay now
          </Link>
        </div>
      ) : null}

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
          Attach scan (STL)
          {scanRequired || !apiMode ? ' — required' : ' — optional'}
        </span>
        <StlUploadZone
          file={file}
          onFile={disabled ? () => {} : setFile}
          error={
            error && !file && (scanRequired || !apiMode) ? error : undefined
          }
        />
      </div>

      {error ? <p className="mail-compose-error">{error}</p> : null}

      <footer className="mail-compose-foot">
        {onCancel ? (
          <button type="button" className="btn-ghost btn btn-sm" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="btn btn-send-scan"
          disabled={busy || disabled || (scanRequired && !file)}
        >
          {busy
            ? 'Sending…'
            : isDesignRequest && !isPaidCase && quotedPrice > 0
              ? `Request design · ${formatMoney(quotedPrice)}`
              : isDesignRequest
                ? 'Request design'
                : apiMode
                  ? 'Send to ODYX'
                  : 'Send scan to design team'}
        </button>
      </footer>
    </form>
  );
}
