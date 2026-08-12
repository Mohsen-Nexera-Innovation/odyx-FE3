'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import CaseDetailsStep from './CaseDetailsStep';
import CaseStepper from './CaseStepper';
import CaseSuccess from './CaseSuccess';
import { NeedHelp, SecureConfidential } from './CaseSupportCards';
import DoctorInformationStep from './DoctorInformationStep';
import OrderSummary from './OrderSummary';
import PaymentMethodStep from './PaymentMethodStep';
import ReviewSubmitStep from './ReviewSubmitStep';
import SendMethodStep from './SendMethodStep';
import {
  caseDetailsSchema,
  doctorInfoSchema,
  paymentMethodSchema,
  sendMethodSchema,
} from './schemas';
import { INITIAL_CASE_DATA, type CaseSubmissionData } from './types';

const TOTAL_STEPS = 5;

const STEP_COPY = [
  { title: 'Doctor Information',               description: <>Tell us about you and your clinic.</> },
  { title: 'Case Details',                     description: <>Provide the details of your case and design requirements.</> },
  { title: 'How would you like to send your case?', description: <>We will not collect your files on our website.<br className="hidden sm:block" /><span className="block sm:inline sm:mt-0 mt-1">After submitting, please send your scan files using your selected method.</span></> },
  { title: 'Payment Method',                   description: <>Choose how you prefer to pay. Final amount is confirmed after our team reviews your case.</> },
  { title: 'Review & Submit',                  description: <>Please review your case details before submitting.</> },
] as const;

const MOCK_SUBMISSION_RESULT = { caseId: 'ODYX-20260503-0125' };

export default function CaseSubmissionPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CaseSubmissionData>(INITIAL_CASE_DATA);
  const [submissionResult, setSubmissionResult] = useState<{ caseId: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const moveToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(TOTAL_STEPS, step)));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitCase = (event: React.FormEvent) => {
    event.preventDefault();
    if (!data.confirmed) return;
    setSubmissionResult(MOCK_SUBMISSION_RESULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (submissionResult) {
    return (
      <div className="min-h-dvh bg-[#F4F8FD] flex items-center justify-center pt-[calc(var(--hdr-h)+12px)] pb-14" data-hero-light>
        <CaseSuccess sendMethod={data.sendMethod} caseId={submissionResult.caseId} />
      </div>
    );
  }

  const copy = STEP_COPY[currentStep - 1];

  return (
    <div className="min-h-dvh bg-white pt-[calc(var(--hdr-h)+22px)] pb-14" data-hero-light>
      <div className="w-[min(1240px,calc(100%-24px))] sm:w-[min(1240px,calc(100%-clamp(40px,8vw,112px)))] mx-auto flex flex-col gap-5">

        {/* ── Stepper ──────────────────────────────────── */}
        <div className="py-3 lg:py-5">
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
                  onChange={(sendMethod) => {
                    setData((c) => ({ ...c, sendMethod }));
                    clearError('sendMethod');
                  }}
                  errors={errors}
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
                    disabled={!data.confirmed}
                    className="inline-flex items-center justify-center gap-2.5 min-w-[154px] min-h-[42px] px-5 py-2.5 rounded-[6px] bg-[#16A34A] text-white text-sm font-bold cursor-pointer transition-all hover:bg-[#15803d] disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[rgba(22,163,74,.2)] focus-visible:outline-offset-2 active:translate-y-px"
                  >
                    Submit Case
                    <Check size={16} strokeWidth={2.5} aria-hidden />
                  </button>
                )}
              </div>

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
