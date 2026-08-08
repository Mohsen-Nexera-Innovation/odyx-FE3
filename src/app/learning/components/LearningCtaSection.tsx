import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { ArrowIcon, BTN_ON_BLUE } from './LearningShared';
import type { LearningCtaBannerData } from '../types';

export function LearningCtaSection({ data }: { data: LearningCtaBannerData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)]">
      <div className="w-full rounded-[16px] overflow-hidden bg-gradient-to-r from-[#002D9C] via-[#0050D8] to-[#002D9C] shadow-[0_8px_40px_rgba(0,80,216,0.28)] py-5 lg:py-6 px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
          <div className="w-[88px] h-[88px] lg:w-[104px] lg:h-[104px] shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shadow-[0_0_32px_rgba(255,255,255,0.18)]">
            {data.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.img}
                alt={data.imgAlt}
                className="w-[70%] h-[70%] object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
              />
            ) : (
              <GraduationCap className="w-12 h-12 text-white" strokeWidth={1.5} aria-hidden />
            )}
          </div>

          <div className="flex-1 text-center lg:text-start min-w-0">
            <h2 className="text-white text-[20px] lg:text-[26px] font-extrabold leading-[1.25] tracking-tight mb-1.5">
              {data.title}
            </h2>
            <p className="text-white/85 text-[14px] lg:text-[15px] font-medium italic leading-relaxed m-0">
              {data.body}
            </p>
          </div>

          <Link href={data.cta.href} className={BTN_ON_BLUE}>
            {data.cta.label}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
