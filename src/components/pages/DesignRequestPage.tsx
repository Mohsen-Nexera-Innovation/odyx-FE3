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

type PatientMode = 'existing' | 'new';

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
            <p className="dr-summary-kicker">Selected service</p>
            <h2>{service.name}</h2>
            <p>{service.desc}</p>
            <p className="dr-summary-price">{formatMoney(service.price)}</p>
            {indication ? (
              <p className="dr-summary-meta">{INDICATION_LABEL[indication]}</p>
            ) : null}
            <ol className="dr-steps" aria-label="Request steps">
              <li className="done">Choose service</li>
              <li className="current">Patient, case &amp; scan</li>
              <li>Checkout</li>
              <li>Case opened in inbox</li>
            </ol>
          </aside>

          <form className="dr-form" onSubmit={onContinue}>
            <fieldset className="dr-fieldset">
              <legend>Patient</legend>
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

            <fieldset className="dr-fieldset">
              <legend>Case details</legend>
              <div className="mail-compose-row">
                <div className="mail-compose-field">
                  <label htmlFor="dr-tooth">Tooth / site</label>
                  <input
                    id="dr-tooth"
                    placeholder="#14"
                    value={tooth}
                    onChange={(e) => setTooth(e.target.value)}
                  />
                </div>
                <div className="mail-compose-field">
                  <label htmlFor="dr-sla">Turnaround</label>
                  <select
                    id="dr-sla"
                    value={sla}
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
              <div className="mail-compose-field">
                <label htmlFor="dr-notes">Clinical notes</label>
                <textarea
                  id="dr-notes"
                  rows={4}
                  placeholder="Margin, contacts, material, urgency…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </fieldset>

            <fieldset className="dr-fieldset">
              <legend>Scan (STL) — required</legend>
              <StlUploadZone
                file={scanFile}
                onFile={setScanFile}
                error={error && !scanFile ? error : undefined}
              />
            </fieldset>

            {error ? <p className="mail-compose-error">{error}</p> : null}

            <footer className="dr-form-foot">
              <Link className="btn btn-ghost" href="/design-services">
                Back
              </Link>
              <button
                type="submit"
                className="btn"
                disabled={busy || !scanFile}
              >
                {busy
                  ? 'Preparing checkout…'
                  : `Continue to checkout · ${formatMoney(service.price)}`}
              </button>
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
