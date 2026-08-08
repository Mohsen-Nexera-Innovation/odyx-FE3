import { Check } from 'lucide-react';

const STEPS = ['Doctor Information', 'Case Details', 'Send Method', 'Review & Submit'] as const;

type CaseStepperProps = {
  currentStep: number;
  onStepSelect?: (step: number) => void;
};

export default function CaseStepper({ currentStep, onStepSelect }: CaseStepperProps) {
  return (
    <nav aria-label="Case submission progress" className="w-[min(1040px,100%)] mx-auto">
      <ol className="grid grid-cols-4 list-none p-0 m-0">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const complete = number < currentStep;
          const active = number === currentStep;
          const selectable = Boolean(onStepSelect) && number <= currentStep;

          return (
            <li key={label} className="relative text-center">
              {/* connector line */}
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute z-0 top-4 start-1/2 w-full h-0.5 rounded-sm transition-colors duration-300 ${
                    complete ? 'bg-[#0050D8]' : 'bg-[#E5E7EB]'
                  }`}
                />
              )}

              <button
                type="button"
                disabled={!selectable}
                aria-current={active ? 'step' : undefined}
                aria-label={`Step ${number}: ${label}`}
                onClick={() => onStepSelect?.(number)}
                className="relative z-10 w-full border-0 bg-transparent font-[inherit] cursor-default px-2 flex flex-col items-center gap-2 disabled:cursor-default not-disabled:cursor-pointer focus-visible:outline-none"
              >
                {/* dot */}
                <span
                  aria-hidden
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[13px] font-bold transition-all duration-200 ${
                    active
                      ? 'bg-[#0050D8] border-[#0050D8] text-white shadow-[0_0_0_4px_rgba(0,80,216,0.15)]'
                      : complete
                      ? 'bg-[#0050D8] border-[#0050D8] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  {complete ? <Check size={14} strokeWidth={3} /> : number}
                </span>

                {/* label */}
                <span
                  className={`hidden sm:block text-[12px] mt-1 leading-tight transition-all duration-200 ${
                    active ? 'text-[#0A1020] font-bold' : complete ? 'text-[#0050D8] font-semibold' : 'text-[#6B7280] font-medium'
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
