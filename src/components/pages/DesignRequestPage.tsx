'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import {
  DESIGN_SERVICES,
  getDesignServiceById,
  indicationFromServiceSlug,
  isDesignServiceSlug,
} from '@/content/design-services';
import { INDICATION_LABEL, SLA_LABEL, type SlaTier } from '@/content/inbox';
import { formatMoney, type ShopProduct } from '@/content/shop';
import { useAuthSession } from '@/hooks/useAuthSession';
import { addItemAsync, clearCartAsync, fetchShopProducts } from '@/lib/commerce';
import { isApiMode } from '@/lib/config';
import { saveDesignCaseDraft } from '@/lib/design-case-draft';
import { savePendingScan } from '@/lib/pending-scan';
import {
  createPatient,
  listPatients,
  patientLabel,
  type Patient,
  type PatientSex,
} from '@/lib/patients';
import StlUploadZone from '@/components/inbox/StlUploadZone';
import ToothChartSelector from '@/components/ToothChartSelector';

type PatientMode = 'existing' | 'new';

const SLA_DETAIL: Record<SlaTier, string> = {
  same_day: 'Priority queue — design delivered by end of day.',
  '24h': 'Standard queue — delivered within one business day.',
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

function DesignRequestBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, ready } = useAuthSession();
  const serviceParam = searchParams.get('service') ?? '';

  const [catalog, setCatalog] = useState<ShopProduct[]>(DESIGN_SERVICES);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientMode, setPatientMode] = useState<PatientMode>('existing');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patientRef, setPatientRef] = useState('');
  const [sex, setSex] = useState<PatientSex>('UNSPECIFIED');
  const [tooth, setTooth] = useState('');
  const [notes, setNotes] = useState('');
  const [sla, setSla] = useState<SlaTier>('same_day');
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [loadingPatients, setLoadingPatients] = useState(true);

  const service = useMemo(() => {
    if (isDesignServiceSlug(serviceParam)) {
      return (
        catalog.find((p) => p.slug === serviceParam || p.id === serviceParam) ??
        getDesignServiceById(serviceParam)
      );
    }
    return (
      catalog.find((p) => p.slug === serviceParam || p.id === serviceParam) ??
      getDesignServiceById(serviceParam)
    );
  }, [catalog, serviceParam]);

  const indication = service
    ? indicationFromServiceSlug(service.slug ?? service.id)
    : null;

  useEffect(() => {
    // Wait until session is read from storage — otherwise logged-in users get bounced.
    if (!ready) return;
    if (isApiMode() && !session) {
      router.replace(
        `/login?next=${encodeURIComponent(`/design-services/request?service=${serviceParam}`)}`,
      );
    }
  }, [ready, session, router, serviceParam]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!session || session.role === 'guest') {
      setPatients([]);
      setLoadingPatients(false);
      return;
    }
    let cancelled = false;
    setLoadingPatients(true);
    void listPatients(session)
      .then((list) => {
        if (cancelled) return;
        setPatients(list);
        setPatientMode(list.length ? 'existing' : 'new');
        if (list[0]) setSelectedPatientId(list[0].id);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load patients');
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingPatients(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, session]);

  if (!ready) {
    return (
      <section className="sec store-sec">
        <div className="wrap">
          <p className="checkout-loading">Loading…</p>
        </div>
      </section>
    );
  }

  if (isApiMode() && !session) {
    return (
      <section className="sec store-sec">
        <div className="wrap">
          <p className="checkout-loading">Redirecting to login…</p>
        </div>
      </section>
    );
  }

  async function onContinue(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!session || session.role === 'guest') {
      router.push('/login');
      return;
    }
    if (!service) {
      setError('Choose a design service first.');
      return;
    }
    if (!scanFile) {
      setError('Attach your STL scan before checkout.');
      return;
    }

    setBusy(true);
    try {
      let patient: Patient;
      if (patientMode === 'new') {
        if (!firstName.trim() || !lastName.trim()) {
          setError('Patient first and last name are required.');
          setBusy(false);
          return;
        }
        patient = await createPatient(session, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          ref: patientRef.trim() || undefined,
          sex,
        });
      } else {
        const found = patients.find((p) => p.id === selectedPatientId);
        if (!found) {
          setError('Select an existing patient, or add a new one.');
          setBusy(false);
          return;
        }
        patient = found;
      }

      await savePendingScan(scanFile);

      const slug = service.slug ?? service.id;
      saveDesignCaseDraft({
        serviceSlug: slug,
        serviceName: service.name,
        productId: service.id,
        patientId: patient.id,
        patientLabel: patientLabel(patient),
        tooth: tooth.trim() || undefined,
        notes: notes.trim() || undefined,
        sla,
        attachmentName: scanFile.name,
        attachmentSize: scanFile.size,
        createdAt: new Date().toISOString(),
      });

      await clearCartAsync();
      await addItemAsync(service.id, 1);
      try {
        sessionStorage.setItem('odyx_checkout_from', 'design');
      } catch {
        /* ignore */
      }
      router.push('/checkout');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not continue to checkout');
      setBusy(false);
    }
  }

  if (!serviceParam || !service) {
    return (
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design services', href: '/design-services' },
          { label: 'Request', href: '/design-services/request' },
        ]}
        title="Choose a service first"
        lead="Pick a design service from the catalog, then fill the patient and case form."
        action={
          <PageActions>
            <Link className="btn" href="/design-services">
              Design services <Arrow />
            </Link>
          </PageActions>
        }
      />
    );
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design services', href: '/design-services' },
          { label: service.name, href: `/design-services/request?service=${service.slug ?? service.id}` },
        ]}
        title="Case details"
        lead="Add or select a patient, attach your STL scan, then checkout. After payment we open your design case in the inbox."
        action={
          <PageActions>
            <Link className="btn btn-ghost" href="/design-services">
              Change service <Arrow />
            </Link>
          </PageActions>
        }
      />

      <section className="sec store-sec">
        <div className="wrap dr-wrap">
          <aside className="dr-summary" aria-label="Selected service">
            {service.image ? (
              <div className="dr-summary-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt="" loading="lazy" />
              </div>
            ) : null}
            <div className="dr-summary-body">
              <p className="dr-summary-kicker">Selected service</p>
              <h2>{service.name}</h2>
              {indication ? (
                <span className="dr-summary-chip">{INDICATION_LABEL[indication]}</span>
              ) : null}
              <p>{service.desc}</p>
              <div className="dr-summary-pricing">
                <strong>{formatMoney(service.price)}</strong>
                {service.unit ? <span>{service.unit}</span> : null}
              </div>
              <Link className="dr-summary-change" href="/design-services">
                Change service <Arrow />
              </Link>
            </div>
            <ol className="dr-steps" aria-label="Request steps">
              <li className="done">
                <span className="dr-step-dot">
                  <CheckIcon />
                </span>
                <span className="dr-step-label">Choose service</span>
              </li>
              <li className="current" aria-current="step">
                <span className="dr-step-dot">2</span>
                <span className="dr-step-label">
                  Patient, case &amp; scan
                  <small>You are here</small>
                </span>
              </li>
              <li>
                <span className="dr-step-dot">3</span>
                <span className="dr-step-label">Checkout</span>
              </li>
              <li>
                <span className="dr-step-dot">4</span>
                <span className="dr-step-label">Case opened in inbox</span>
              </li>
            </ol>
          </aside>

          <form className="dr-form" onSubmit={onContinue}>
            <fieldset className="dr-fieldset dr-card">
              <legend className="dr-card-head">
                <span className="dr-card-num" aria-hidden>
                  1
                </span>
                <span className="dr-card-title">
                  Patient
                  <small>Who is this design for?</small>
                </span>
              </legend>

              <div className="dr-mode-tabs" role="tablist" aria-label="Patient mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={patientMode === 'existing'}
                  className={patientMode === 'existing' ? 'is-active' : ''}
                  disabled={loadingPatients || patients.length === 0}
                  onClick={() => setPatientMode('existing')}
                >
                  Existing patient
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={patientMode === 'new'}
                  className={patientMode === 'new' ? 'is-active' : ''}
                  onClick={() => setPatientMode('new')}
                >
                  New patient
                </button>
              </div>

              {patientMode === 'existing' ? (
                <div className="mail-compose-field">
                  <label htmlFor="dr-patient">Select patient</label>
                  <select
                    id="dr-patient"
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    required
                    disabled={loadingPatients || patients.length === 0}
                  >
                    {patients.length === 0 ? (
                      <option value="">No patients yet</option>
                    ) : (
                      patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {patientLabel(p)}
                        </option>
                      ))
                    )}
                  </select>
                  {patients.length === 0 ? (
                    <p className="dr-hint">No patients yet — switch to New patient.</p>
                  ) : null}
                </div>
              ) : (
                <div className="mail-compose-row">
                  <div className="mail-compose-field">
                    <label htmlFor="dr-first">First name</label>
                    <input
                      id="dr-first"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mail-compose-field">
                    <label htmlFor="dr-last">Last name</label>
                    <input
                      id="dr-last"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mail-compose-field">
                    <label htmlFor="dr-ref">Patient ref</label>
                    <input
                      id="dr-ref"
                      placeholder="PT-204 (optional)"
                      value={patientRef}
                      onChange={(e) => setPatientRef(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mail-compose-field">
                    <label htmlFor="dr-sex">Sex</label>
                    <select
                      id="dr-sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value as PatientSex)}
                    >
                      <option value="UNSPECIFIED">Prefer not to say</option>
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                    </select>
                  </div>
                </div>
              )}
            </fieldset>

            <fieldset className="dr-fieldset dr-card">
              <legend className="dr-card-head">
                <span className="dr-card-num" aria-hidden>
                  2
                </span>
                <span className="dr-card-title">
                  Case details
                  <small>Site, turnaround and clinical guidance</small>
                </span>
              </legend>

              <div className="mail-compose-field">
                <label htmlFor="dr-tooth">Tooth / site</label>
                <ToothChartSelector value={tooth} onChange={setTooth} />
                <input
                  id="dr-tooth"
                  placeholder="e.g. #14, upper arch…"
                  value={tooth}
                  onChange={(e) => setTooth(e.target.value)}
                />
                <p className="dr-hint">
                  Tap teeth on the chart, or type a site description manually.
                </p>
              </div>

              <div className="mail-compose-field">
                <span className="mail-compose-label" id="dr-sla-label">
                  Turnaround
                </span>
                <div className="dr-sla-grid" role="radiogroup" aria-labelledby="dr-sla-label">
                  {(Object.keys(SLA_LABEL) as SlaTier[]).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      role="radio"
                      aria-checked={sla === tier}
                      className={`dr-sla-card${sla === tier ? ' is-selected' : ''}`}
                      onClick={() => setSla(tier)}
                    >
                      <span className="dr-sla-radio" aria-hidden />
                      <span className="dr-sla-copy">
                        <strong>{SLA_LABEL[tier]}</strong>
                        <small>{SLA_DETAIL[tier]}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mail-compose-field">
                <label htmlFor="dr-notes">Clinical notes</label>
                <textarea
                  id="dr-notes"
                  rows={4}
                  placeholder="Margin, contacts, material, occlusion, urgency…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <p className="dr-hint">
                  The more context you share, the fewer revision rounds you&apos;ll need.
                </p>
              </div>
            </fieldset>

            <fieldset className="dr-fieldset dr-card">
              <legend className="dr-card-head">
                <span className="dr-card-num" aria-hidden>
                  3
                </span>
                <span className="dr-card-title">
                  Scan upload
                  <small>Attach the intraoral or model scan (STL, required)</small>
                </span>
              </legend>
              <StlUploadZone
                file={scanFile}
                onFile={setScanFile}
                error={error && !scanFile ? error : undefined}
              />
            </fieldset>

            {error ? <p className="mail-compose-error">{error}</p> : null}

            <footer className="dr-form-foot">
              <div className="dr-foot-total">
                <span>Total due at checkout</span>
                <strong>{formatMoney(service.price)}</strong>
              </div>
              <div className="dr-foot-actions">
                <Link className="btn btn-ghost" href="/design-services">
                  Back
                </Link>
                <button type="submit" className="btn" disabled={busy || !scanFile}>
                  {busy ? 'Preparing checkout…' : 'Continue to checkout'}
                  {!busy ? <Arrow /> : null}
                </button>
              </div>
            </footer>
          </form>
        </div>
      </section>
    </>
  );
}

export default function DesignRequestPage() {
  return (
    <Suspense
      fallback={
        <section className="sec store-sec">
          <div className="wrap">
            <p className="checkout-loading">Loading request form…</p>
          </div>
        </section>
      }
    >
      <DesignRequestBody />
    </Suspense>
  );
}
