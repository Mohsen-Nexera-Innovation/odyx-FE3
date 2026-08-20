import React from 'react';
import Link from 'next/link';
import { PathIcon, CertificateIcon } from './LearningIcons';
import {
  LEARNING_CARD,
  LEARNING_CARD_PAD,
  LEARNING_GUTTER,
  LEARNING_H2,
  LEARNING_KICKER,
} from './learningChrome';
import type { JourneySectionData } from '@/content/learning';

export function JourneySection({ data }: { data: JourneySectionData }) {
  return (
    <section id="journey" className={LEARNING_GUTTER}>
      <div className={`w-full ${LEARNING_CARD} ${LEARNING_CARD_PAD}`}>
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
          <div className="w-full lg:w-[28%] shrink-0">
            <p className={`${LEARNING_KICKER} mb-3`}>
              {data.kicker}
            </p>
            <h2 className={LEARNING_H2}>
              {data.titleLead}
              <br />
              <span className="text-[#1D4ED8]">{data.titleRest}</span>
            </h2>
          </div>

          <div className="w-full lg:w-[72%] flex items-start">
            {data.steps.map((step, i) => {
              const isLast = i === data.steps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <Link
                    href={step.href}
                    className="flex flex-col items-center text-center px-2 lg:px-3 no-underline flex-1 min-w-0"
                  >
                    <div className="relative mb-5 text-[#0050D8]">
                      <div className="w-16 h-16 rounded-full bg-[#EEF4FF] border border-[#D0E2FF] shadow-[0_4px_12px_rgba(0,80,216,0.10)] flex items-center justify-center">
                        <PathIcon id={step.id} className="w-7 h-7" />
                      </div>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0050D8] text-white text-[11px] font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(0,80,216,0.35)]">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-[13px] lg:text-[14px] font-extrabold text-[#0A1020] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[12px] lg:text-[13px] text-[#0A1020] font-medium leading-relaxed mb-2">
                      {step.description}
                    </p>
                    <p className="text-[12px] font-semibold text-[#0050D8] mb-3">{step.meta}</p>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#98A2B3]">
                      <CertificateIcon className="w-3.5 h-3.5" />
                      {step.certificate}
                    </span>
                  </Link>
                  {!isLast && (
                    <div className="flex items-start justify-center shrink-0 pt-[22px]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B0C4DE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="m5 12 14 0" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
