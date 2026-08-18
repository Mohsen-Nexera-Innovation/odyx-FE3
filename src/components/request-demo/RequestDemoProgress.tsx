'use client';

import {
  REQUEST_DEMO_STEPS,
  type DemoStepId,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import { useLayoutEffect, useRef } from 'react';
import { CheckIcon } from './DemoIcons';
import { cardClass, shellClass } from './formStyles';

/** Clears the fixed header + a little air so sticky cards don't sit under the navbar */
export const RD_HEADER_OFFSET_PX = 80;

/** Keep the same air as `lg:gap-4` between stepper and the cards below when both are pinned */
export const RD_STICKY_STACK_GAP_PX = 16;

export function RequestDemoProgress({
  activeStep,
  stepState,
  onStepClick,
  onHeightChange,
}: {
  activeStep: DemoStepId;
  stepState: Record<DemoStepId, boolean>;
  onStepClick: (id: DemoStepId) => void;
  onHeightChange?: (height: number) => void;
}) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const publish = () => onHeightChange?.(el.getBoundingClientRect().height);

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <nav
      ref={navRef}
      aria-label="Demo request progress"
      className="sticky z-40 bg-white"
      style={{ top: RD_HEADER_OFFSET_PX }}
    >
      <div className={cn(shellClass, 'min-w-0')}>
        <ol
          className={cn(
            cardClass,
            'm-0 grid list-none grid-cols-3 items-start gap-0 px-2 py-3 shadow-[0_4px_18px_rgba(10,16,32,0.05)] sm:flex sm:items-center sm:px-5 sm:py-4',
          )}
        >
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
                  className="relative z-[1] flex min-h-11 w-full max-w-full cursor-pointer flex-col items-center gap-1 rounded-lg border-0 bg-transparent p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#0050D8]/35 focus-visible:ring-offset-2 sm:inline-flex sm:min-h-0 sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:text-start"
                  aria-current={active ? 'step' : undefined}
                  onClick={() => onStepClick(step.id)}
                >
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-[13px]',
                      active || complete
                        ? 'bg-[#0050D8] text-white'
                        : 'border border-[#E5E7EB] bg-[#F4F8FD] text-[#0050D8]',
                    )}
                    aria-hidden
                  >
                    {complete ? (
                      <CheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    ) : (
                      step.number
                    )}
                  </span>

                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="max-w-[4.8rem] truncate text-[11px] font-bold leading-tight text-[#0A1020] sm:hidden">
                      {step.shortTitle}
                    </span>
                    <span
                      className={cn(
                        'hidden truncate text-[13px] font-bold leading-tight sm:block sm:text-sm',
                        active ? 'text-[#0050D8]' : 'text-[#0A1020]',
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="hidden truncate text-[11px] font-medium leading-tight text-[#6B7280] md:block md:text-xs">
                      {step.subtitle}
                    </span>
                  </span>
                </button>

                {!isLast ? (
                  <>
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute start-[calc(50%+16px)] top-[1.15rem] z-0 h-px w-[calc(100%-32px)] sm:hidden',
                        stepState[step.id] ? 'bg-[#0050D8]' : 'bg-[#E5E7EB]',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'mx-2 hidden h-px min-w-3 flex-1 sm:mx-3 sm:block md:mx-4',
                        stepState[step.id] ? 'bg-[#0050D8]' : 'bg-[#E5E7EB]',
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
