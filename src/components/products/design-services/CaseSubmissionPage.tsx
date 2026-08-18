'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ApiError } from '@/lib/api/client';
import {
  ensureDraftCase,
  loadCaseLookups,
  submitDesignCaseWizard,
} from '@/lib/cases';
import type { ApiCountry, ApiDesignType, ApiMaterial } from '@/lib/api/lookups';
import CaseDetailsStep from './steps/CaseDetailsStep';
import CaseStepper from './CaseStepper';
import CaseSuccess from './CaseSuccess';
import { NeedHelp, SecureConfidential } from './CaseSupportCards';
import DoctorInformationStep from './steps/DoctorInformationStep';
import OrderSummary from './OrderSummary';
import PaymentMethodStep from './steps/PaymentMethodStep';
import ReviewSubmitStep from './steps/ReviewSubmitStep';
import SendMethodStep from './steps/SendMethodStep';
import {
  caseDetailsSchema,
  doctorInfoSchema,
  paymentMethodSchema,
  sendMethodSchema,
} from './schemas';
import { clearFormDraft, readFormDraft, saveFormDraft } from './formPersistence';
import { INITIAL_CASE_DATA, type CaseSubmissionData, type DoctorInformation } from './types';

const TOTAL_STEPS = 5;

const STEP_COPY = [
  { title: 'Doctor Information',               description: <>Tell us about you and your clinic.</> },
  { title: 'Case Details',                     description: <>Provide the details of your case and design requirements.</> },
  { title: 'How would you like to receive the design/communication?', description: <>Choose WhatsApp or email for design delivery and case updates.</> },
  { title: 'Payment Method',                   description: <>Choose how you prefer to pay. Final amount is confirmed after our team reviews your case.</> },
  { title: 'Review & Submit',                  description: <>Please review your case details before submitting.</> },
] as const;

const LOGIN_NEXT = '/products/design-services';

function doctorFromSession(
  session: { name: string; email: string; phone?: string; org?: string; country?: string },
  current: DoctorInformation,
): DoctorInformation {
  const digits = (session.phone ?? '').replace(/\D/g, '');
  const whatsapp =
    current.whatsapp ||
    (digits.startsWith('20') && digits.length > 2 ? digits.slice(2) : digits);
  return {
    ...current,
    fullName: current.fullName || session.name || '',
    email: current.email || session.email || '',
    clinicName: current.clinicName || session.org || '',
    country: current.country || session.country || '',
    whatsapp,
  };
}

function submitErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 403) {
      return 'Cases can only be submitted from a client account (dentist or lab), not a staff login.';
    }
    if (err.status === 409) {
      return 'This case was already submitted. Start a new case to continue.';
    }
    if (err.missing?.length) {
      return `${err.message} (missing: ${err.missing.join(', ')})`;
    }
    return err.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return 'Could not submit the case. Please try again.';
}

export default function CaseSubmissionPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { session, ready } = useAuthSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CaseSubmissionData>(INITIAL_CASE_DATA);
  const [caseId, setCaseId] = useState<string | undefined>();
  const [draftReady, setDraftReady] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ caseId: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const lookupsRef = useRef<{
    countries: ApiCountry[];
    designTypes: ApiDesignType[];
    materials: ApiMaterial[];
  } | null>(null);

  const loginHref = `/login?next=${encodeURIComponent(pathname || LOGIN_NEXT)}`;
  const isStaff = session?.accountType === 'STAFF' || session?.role === 'admin';
  const isClient = session?.accountType === 'CLIENT';

  useEffect(() => {
    let cancelled = false;
    void readFormDraft()
      .then((draft) => {
        if (cancelled) return;
        if (draft) {
          setCurrentStep(draft.currentStep);
          setData(draft.data);
          if (draft.caseId) setCaseId(draft.caseId);
        }
        setDraftReady(true);
      })
      .catch(() => {
        if (!cancelled) setDraftReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !draftReady || !session || isStaff) return;
    setData((current) => ({
      ...current,
      doctor: doctorFromSession(session, current.doctor),
    }));
  }, [ready, draftReady, session, isStaff]);

  useEffect(() => {
    if (!ready) return;
    if (!session || session.role === 'guest') {
      router.replace(loginHref);
    }
  }, [ready, session, router, loginHref]);

  useEffect(() => {
    if (!ready || !isClient) return;
    let cancelled = false;
    void loadCaseLookups()
      .then((lookups) => {
        if (!cancelled) lookupsRef.current = lookups;
      })
      .catch(() => {
        /* submit will retry / surface the error */
      });
    return () => {
      cancelled = true;
    };
  }, [ready, isClient]);

  useEffect(() => {
    if (!draftReady || submissionResult) return;
    void saveFormDraft(currentStep, data, caseId);
  }, [draftReady, currentStep, data, caseId, submissionResult]);

  const moveToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(TOTAL_STEPS, step)));
    setErrors({});
    setSubmitError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitCase = (event: React.FormEvent) => {
    event.preventDefault();
    if (!data.confirmed || submitting) return;
    if (!data.attachments.stlFile && !data.attachments.intraoralFile) {
      setSubmitError('Attach at least one scan file before submitting.');
      return;
    }

    void (async () => {
      setSubmitting(true);
      setSubmitError('');
      try {
        const draft = await ensureDraftCase(caseId);
        setCaseId(draft.id);
        await saveFormDraft(currentStep, data, draft.id);
        const lookups = lookupsRef.current ?? (await loadCaseLookups());
        lookupsRef.current = lookups;
        const submitted = await submitDesignCaseWizard({
          caseId: draft.id,
          data: {
            doctor: data.doctor,
            caseDetails: data.caseDetails,
            attachments: data.attachments,
          },
          lookups,
        });
        await clearFormDraft();
        setCaseId(undefined);
        setSubmissionResult({ caseId: submitted.caseNumber || submitted.id });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.replace(loginHref);
          return;
        }
        setSubmitError(submitErrorMessage(err));
      } finally {
        setSubmitting(false);
      }
    })();
  };

  const continueToNextStep = () => {
    let result;
    if (currentStep === 1) result = doctorInfoSchema.safeParse(data.doctor);
    else if (currentStep === 2) result = caseDetailsSchema.safeParse(data.caseDetails);
    else if (currentStep === 3) result = sendMethodSchema.safeParse({ sendMethod: data.sendMethod });
    else if (currentStep === 4) result = paymentMethodSchema.safeParse({ paymentMethod: data.paymentMethod });

    if (result && !result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    if (currentStep === 3 && !data.attachments.stlFile && !data.attachments.intraoralFile) {
      setErrors({
        stlFile: 'Attach at least one file (STL, PLY, OBJ, ZIP, PDF, JPEG, or PNG).',
      });
      return;
    }

    setErrors({});
    moveToStep(currentStep + 1);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const pageShell = 'min-h-dvh bg-white pt-[calc(var(--hdr-h)+8px)] pb-14';

  if (!ready) {
    return <div className={pageShell} data-hero-light aria-busy="true" />;
  }

  if (!session || session.role === 'guest') {
    return <div className={pageShell} data-hero-light aria-busy="true" />;
  }

  if (isStaff) {
    return (
      <div className={pageShell} data-hero-light>
        <div className="w-[min(640px,calc(100%-24px))] mx-auto py-16 text-center">
          <h1 className="text-[22px] font-extrabold text-[#0A1020] m-0 mb-3">Client account required</h1>
          <p className="text-[14px] text-[#6B7280] m-0 mb-6">
            Design cases are submitted with a dentist or lab login. Staff accounts cannot create cases.
          </p>
          <Link href="/" className="text-[#0050D8] font-bold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (submissionResult) {
    return (
      <div className="min-h-dvh bg-[#F4F8FD] flex items-center justify-center pt-[calc(var(--hdr-h)+12px)] pb-14" data-hero-light>
        <CaseSuccess
          sendMethod={data.sendMethod}
          caseId={submissionResult.caseId}
          doctorName={data.doctor.fullName}
          onSubmitAnother={() => {
            void clearFormDraft();
            setSubmissionResult(null);
            setCaseId(undefined);
            setSubmitError('');
            setData(INITIAL_CASE_DATA);
            setCurrentStep(1);
            setErrors({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  const copy = STEP_COPY[currentStep - 1];

  return (
    <div className="min-h-dvh bg-white pt-[calc(var(--hdr-h)+8px)] pb-14" data-hero-light>
      <div className="w-[min(1240px,calc(100%-24px))] sm:w-[min(1240px,calc(100%-clamp(40px,8vw,112px)))] mx-auto flex flex-col gap-5">
        <h1 className="sr-only">Design Services</h1>

        <div className="pt-1 pb-3 lg:pt-2 lg:pb-4">
          <CaseStepper currentStep={currentStep} onStepSelect={moveToStep} />
        </div>

        {/* ── Main Layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-5 items-start">

          {/* Main column */}
          <div className="min-w-0">
            {/* Step heading */}
            <div className="mb-6">
              <span className="block text-[#0050D8] text-xs font-bold mb-2.5">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <h2 className="text-[clamp(22px,2.2vw,28px)] font-extrabold text-[#0A1020] tracking-tight leading-snug m-0">
                {copy.title}
              </h2>
              <p className="text-base font-medium text-[#6B7280] mt-1.5 leading-relaxed">
                {copy.description}
              </p>
            </div>

            <form ref={formRef} onSubmit={submitCase} noValidate>
              {currentStep === 1 && (
                <DoctorInformationStep
                  value={data.doctor}
                  onChange={(doctor) => setData((c) => ({ ...c, doctor }))}
                  errors={errors}
                  onClearError={clearError}
                />
              )}
              {currentStep === 2 && (
                <CaseDetailsStep
                  value={data.caseDetails}
                  onChange={(caseDetails) => setData((c) => ({ ...c, caseDetails }))}
                  errors={errors}
                  onClearError={clearError}
                />
              )}
              {currentStep === 3 && (
                <SendMethodStep
                  value={data.sendMethod}
                  attachments={data.attachments}
                  onChange={(sendMethod) => {
                    setData((c) => ({ ...c, sendMethod }));
                    clearError('sendMethod');
                  }}
                  onAttachmentsChange={(attachments) =>
                    setData((c) => ({ ...c, attachments }))
                  }
                  errors={errors}
                  onClearError={clearError}
                />
              )}
              {currentStep === 4 && (
                <PaymentMethodStep
                  value={data.paymentMethod}
                  onChange={(paymentMethod) => {
                    setData((c) => ({ ...c, paymentMethod }));
                    clearError('paymentMethod');
                  }}
                  errors={errors}
                />
              )}
              {currentStep === 5 && (
                <ReviewSubmitStep
                  data={data}
                  onEdit={moveToStep}
                  onConfirmedChange={(confirmed) => setData((c) => ({ ...c, confirmed }))}
                />
              )}

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 mt-5">
                {currentStep === 1 ? (
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 min-h-[42px] px-6 py-2.5 border-2 border-[#D1D5DB] rounded-[6px] bg-white !text-[#0A1020] text-sm font-bold transition-colors hover:bg-[#F7F9FB] hover:border-[#9AA7B8]"
                  >
                    Cancel
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => moveToStep(currentStep - 1)}
                    className="inline-flex items-center justify-center gap-2 min-h-[42px] px-6 py-2.5 border-2 border-[#D1D5DB] rounded-[6px] bg-white text-[#0A1020] text-sm font-bold cursor-pointer transition-colors hover:bg-[#F7F9FB] hover:border-[#9AA7B8] focus-visible:outline-2 focus-visible:outline-[rgba(0,80,216,.2)] focus-visible:outline-offset-2 active:translate-y-px"
                  >
                    <ArrowLeft size={16} aria-hidden />
                    Back
                  </button>
                )}

                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={continueToNextStep}
                    className="inline-flex items-center justify-center gap-2 min-w-[160px] min-h-[42px] px-6 py-2.5 rounded-[6px] bg-[#0A1020] text-white text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(10,16,32,.18)] transition-all hover:bg-[#1a2540] hover:shadow-[0_6px_18px_rgba(10,16,32,.22)] focus-visible:outline-2 focus-visible:outline-[rgba(0,80,216,.2)] focus-visible:outline-offset-2 active:translate-y-px"
                  >
                    Next Step
                    <ArrowRight size={16} aria-hidden />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!data.confirmed || submitting}
                    className="inline-flex items-center justify-center gap-2.5 min-w-[154px] min-h-[42px] px-5 py-2.5 rounded-[6px] bg-[#16A34A] text-white text-sm font-bold cursor-pointer transition-all hover:bg-[#15803d] disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[rgba(22,163,74,.2)] focus-visible:outline-offset-2 active:translate-y-px"
                  >
                    {submitting ? 'Submitting…' : 'Submit Case'}
                    {!submitting ? <Check size={16} strokeWidth={2.5} aria-hidden /> : null}
                  </button>
                )}
              </div>

              {currentStep === TOTAL_STEPS && submitError ? (
                <p className="text-center text-[#EF4444] text-sm font-medium mt-3" role="alert">
                  {submitError}
                </p>
              ) : null}

              {currentStep === TOTAL_STEPS && (
                <p className="text-center text-[#6B7280] text-xs mt-3">
                  By submitting, you agree to our{' '}
                  <Link href="/about#terms" className="text-[#0050D8] font-semibold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/about#privacy" className="text-[#0050D8] font-semibold hover:underline">Privacy Policy</Link>.
                </p>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className={`flex flex-col gap-4 xl:order-last order-last ${
            currentStep === 1 ? 'xl:mt-64' : ''
          }`}>
            {currentStep > 1 && <OrderSummary data={data} />}
            <NeedHelp />
            <SecureConfidential />
          </div>
        </div>

      </div>
    </div>
  );
}
