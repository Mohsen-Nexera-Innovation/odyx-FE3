import React from 'react';
import Link from 'next/link';
import { ArrowIcon, ProgressRing, BTN_OUTLINE, BTN_LINK } from './LearningShared';
import { PlayIcon, StatIcon } from './LearningIcons';
import {
  LEARNING_CARD,
  LEARNING_CARD_PAD,
  LEARNING_GUTTER,
  LEARNING_KICKER,
} from './learningChrome';
import type { ImpactSectionData } from '@/content/learning';

export function ImpactSection({ data }: { data: ImpactSectionData }) {
  return (
    <section className={LEARNING_GUTTER}>
      <div className={`w-full ${LEARNING_CARD} ${LEARNING_CARD_PAD}`}>
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-10">
          <div className="xl:w-[300px] shrink-0 xl:border-r xl:border-gray-100 xl:pr-8">
            <p className={`${LEARNING_KICKER} mb-3`}>
              {data.continue.kicker}
            </p>
            <h2 className="text-[20px] lg:text-[22px] font-extrabold text-[#0A1020] leading-snug mb-4">
              {data.continue.heading}
            </h2>

            <div className="rounded-[16px] border border-gray-100/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-3.5">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-[112px] h-[78px] rounded-[10px] overflow-hidden shrink-0 bg-[#E8EEF6]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.continue.img}
                    alt={data.continue.imgAlt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-white/90 text-[#0050D8] flex items-center justify-center shadow-sm">
                      <PlayIcon className="w-3 h-3" />
                    </span>
                  </span>
                </div>
                <ProgressRing percent={data.continue.percent} size={56} stroke={4} />
              </div>

              <strong className="block text-[14px] font-extrabold text-[#0A1020] mb-1">
                {data.continue.title}
              </strong>
              <span className="block text-[12px] text-[#667085] font-medium mb-2.5">
                {data.continue.meta}
              </span>
              <Link href={data.continue.href} className={BTN_LINK}>
                {data.continue.ctaLabel}
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-6">
              <p className={`${LEARNING_KICKER} mb-3`}>
                {data.impact.kicker}
              </p>
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#0A1020] leading-snug max-w-lg">
                {data.impact.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
              {data.impact.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-start">
                  <div className="mb-3 text-[#0050D8] w-12 h-12 flex items-center justify-center rounded-full bg-[#F0F6FA]">
                    <StatIcon id={stat.icon} className="w-5 h-5" />
                  </div>
                  <strong className="block text-[24px] lg:text-[28px] font-extrabold text-[#0050D8] leading-none mb-1.5">
                    {stat.value}
                  </strong>
                  <span className="block text-[13px] font-extrabold text-[#0A1020] mb-0.5">
                    {stat.label}
                  </span>
                  <span className="block text-[12px] text-[#667085] font-medium">{stat.detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex justify-end">
              <Link href={data.impact.cta.href} className={BTN_OUTLINE}>
                {data.impact.cta.label}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
