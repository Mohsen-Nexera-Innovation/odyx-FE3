'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import CaseDetailsStep from './CaseDetailsStep';
import CaseStepper from './CaseStepper';
import CaseSuccess from './CaseSuccess';
import { NeedHelp, SecureConfidential } from './CaseSupportCards';
import DoctorInformationStep from './DoctorInformationStep';
import OrderSummary from './OrderSummary';
import ReviewSubmitStep from './ReviewSubmitStep';
import SendMethodStep from './SendMethodStep';
import { INITIAL_CASE_DATA, type CaseSubmissionData } from './types';

const STEP_COPY = [
  {
    title: 'Doctor Information',
    description: 'Tell us about you and your clinic.',
  },
  {
    title: 'Case Details',
    description: 'Provide the details of your case and design requirements.',
  },
  {
    title: 'How would you like to send your case?',
    description: 'We will not collect your files on our website. After submitting, please send your scan files using your selected method.',
  },
  {
    title: 'Review & Submit',
    description: 'Please review your case details before submitting.',
  },
] as const;

const MOCK_SUBMISSION_RESULT = {
  caseId: 'ODYX-20260503-0125',
};

export default function CaseSubmissionPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CaseSubmissionData>(INITIAL_CASE_DATA);
  const [submissionResult, setSubmissionResult] = useState<{ caseId: string } | null>(null);

  const moveToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(4, step)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitCase = (event: React.FormEvent) => {
    event.preventDefault();
    if (!data.confirmed) return;
    setSubmissionResult(MOCK_SUBMISSION_RESULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const continueToNextStep = () => {
    if (!formRef.current?.reportValidity()) return;
    moveToStep(currentStep + 1);
  };

  if (submissionResult) {
    return (
      <div className="case-submission-page case-submission-page--success">
        <CaseSuccess sendMethod={data.sendMethod} caseId={submissionResult.caseId} />
      </div>
    );
  }

  const copy = STEP_COPY[currentStep - 1];

  return (
    <div className="case-submission-page">
      <div className="case-submission-shell">
        <CaseStepper currentStep={currentStep} onStepSelect={moveToStep} />

        <div className="case-layout">
          <div className="case-main">
            <div className="case-page-heading">
              <span>Step {currentStep} of 4</span>
              <h1>{copy.title}</h1>
              <p>{copy.description}</p>
            </div>

            <form ref={formRef} onSubmit={submitCase}>
              {currentStep === 1 ? (
                <DoctorInformationStep
                  value={data.doctor}
                  onChange={(doctor) => setData((current) => ({ ...current, doctor }))}
                />
              ) : null}
              {currentStep === 2 ? (
                <CaseDetailsStep
                  value={data.caseDetails}
                  onChange={(caseDetails) => setData((current) => ({ ...current, caseDetails }))}
                />
              ) : null}
              {currentStep === 3 ? (
                <SendMethodStep
                  value={data.sendMethod}
                  onChange={(sendMethod) => setData((current) => ({ ...current, sendMethod }))}
                />
              ) : null}
              {currentStep === 4 ? (
                <ReviewSubmitStep
                  data={data}
                  onEdit={moveToStep}
                  onConfirmedChange={(confirmed) => setData((current) => ({ ...current, confirmed }))}
                />
              ) : null}

              <div className="case-form-actions">
                {currentStep === 1 ? (
                  <a className="case-button case-button--ghost" href="/">
                    Cancel
                  </a>
                ) : (
                  <button
                    type="button"
                    className="case-button case-button--ghost"
                    onClick={() => moveToStep(currentStep - 1)}
                  >
                    <ArrowLeft size={16} aria-hidden />
                    Back
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="case-button case-button--primary"
                    onClick={continueToNextStep}
                  >
                    Next Step
                    <ArrowRight size={16} aria-hidden />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="case-button case-button--submit"
                    disabled={!data.confirmed}
                  >
                    Submit Case
                    <Check size={17} strokeWidth={2.5} aria-hidden />
                  </button>
                )}
              </div>
              {currentStep === 4 ? (
                <p className="case-terms">
                  By submitting, you agree to our <a href="/about#terms">Terms of Service</a> and{' '}
                  <a href="/about#privacy">Privacy Policy</a>.
                </p>
              ) : null}
            </form>
          </div>

          <div className="case-sidebar">
            {currentStep > 1 ? <OrderSummary data={data} /> : null}
            <NeedHelp />
            <SecureConfidential />
          </div>
        </div>
      </div>
    </div>
  );
}
