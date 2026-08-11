import {
  REQUEST_DEMO_STEPS,
  type DemoStepId,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import { CheckIcon } from './DemoIcons';
import { shellClass } from './formStyles';

export function RequestDemoProgress({
  activeStep,
  stepState,
  onStepClick,
}: {
  activeStep: DemoStepId;
  stepState: Record<DemoStepId, boolean>;
  onStepClick: (id: DemoStepId) => void;
}) {
  return (
    <nav aria-label="Demo request progress" className="bg-[#F5F7FB] pt-4 sm:pt-5">
      <div className={cn(shellClass, 'min-w-0')}>
        <ol className="m-0 grid list-none grid-cols-3 items-start gap-0 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-4 sm:flex sm:items-center sm:px-6 sm:py-5">
          {REQUEST_DEMO_STEPS.map((step, index) => {
            const active = activeStep === step.id;
            const complete = stepState[step.id] && !active;
            const isLast = index === REQUEST_DEMO_STEPS.length - 1;

            return (
              <li
                key={step.id}
                className={cn(
                  'relative flex min-w-0 flex-col items-center sm:flex-row sm:items-center',
                  isLast ? 'sm:shrink-0' : 'sm:flex-1',
                )}
              >
                <button
                  type="button"
                  className="relative z-[1] flex w-full max-w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-0 bg-transparent p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#0050D8]/35 focus-visible:ring-offset-2 sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:text-start"
                  aria-current={active ? 'step' : undefined}
                  onClick={() => onStepClick(step.id)}
                >
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors',
                      active || complete
                        ? 'bg-[#0050D8] text-white'
                        : 'border border-[#93C5FD] bg-white text-[#0050D8]',
                    )}
                    aria-hidden
                  >
                    {complete ? (
                      <CheckIcon className="h-3.5 w-3.5" />
                    ) : (
                      step.number
                    )}
                  </span>

                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[12px] font-bold leading-tight text-[#0A1020] sm:hidden">
                      {step.shortTitle}
                    </span>
                    <span className="hidden truncate text-[13px] font-bold leading-tight text-[#0A1020] sm:block sm:text-sm">
                      {step.title}
                    </span>
                    <span className="hidden truncate text-[11px] font-medium leading-tight text-[#6B7280] sm:block sm:text-xs">
                      {step.subtitle}
                    </span>
                  </span>
                </button>

                {!isLast ? (
                  <>
                    {/* Mobile connector between circles */}
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute start-[calc(50%+18px)] top-5 z-0 h-px w-[calc(100%-36px)] sm:hidden',
                        stepState[step.id] ? 'bg-[#0050D8]' : 'bg-[#DBEAFE]',
                      )}
                    />
                    {/* Desktop connector */}
                    <span
                      aria-hidden
                      className={cn(
                        'mx-3 hidden h-px min-w-4 flex-1 sm:mx-4 sm:block',
                        stepState[step.id] ? 'bg-[#0050D8]' : 'bg-[#DBEAFE]',
                      )}
                    />
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
