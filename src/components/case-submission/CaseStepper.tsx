import { Check } from 'lucide-react';

const STEPS = [
  'Doctor Information',
  'Case Details',
  'Send Method',
  'Review & Submit',
] as const;

type CaseStepperProps = {
  currentStep: number;
  onStepSelect?: (step: number) => void;
};

export default function CaseStepper({ currentStep, onStepSelect }: CaseStepperProps) {
  return (
    <nav className="case-stepper" aria-label="Case submission progress">
      <ol>
        {STEPS.map((label, index) => {
          const number = index + 1;
          const complete = number < currentStep;
          const active = number === currentStep;
          const selectable = Boolean(onStepSelect) && number <= currentStep;

          return (
            <li
              key={label}
              className={`${complete ? 'is-complete' : ''}${active ? ' is-active' : ''}`}
            >
              <button
                type="button"
                disabled={!selectable}
                aria-current={active ? 'step' : undefined}
                aria-label={`Step ${number}: ${label}`}
                onClick={() => onStepSelect?.(number)}
              >
                <span className="case-stepper__dot" aria-hidden>
                  {complete ? <Check size={14} strokeWidth={3} /> : number}
                </span>
                <span className="case-stepper__label">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
