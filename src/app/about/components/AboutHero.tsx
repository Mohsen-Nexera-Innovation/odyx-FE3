import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Lightbulb } from 'lucide-react';
import { AboutHeroData } from '../types';
import {
  ABOUT_BLUE,
  ABOUT_BODY,
  ABOUT_BTN,
  ABOUT_BTN_SIZE,
  ABOUT_CARD_DESC,
  ABOUT_CARD_TITLE,
  ABOUT_EYEBROW,
  ABOUT_H1,
} from '../aboutChrome';

const ICON_MAP: Record<string, React.ElementType> = {
  'shield-check': ShieldCheck,
  'users': Users,
  'lightbulb': Lightbulb,
};

export function AboutHero({ data }: { data: AboutHeroData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)] pt-[var(--hdr-h)] lg:pt-[calc(var(--hdr-h)+17px)]" data-hero-light>
      <div 
        className="w-full bg-[#F4F8FD] rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 relative"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col xl:flex-row items-center py-6 lg:py-8 px-4 lg:px-6 gap-8 lg:gap-6">

          {/* ── Left Column: Text ──────────────────────────── */}
          <div className="w-full xl:w-[35%] flex flex-col justify-center">

            {/* Kicker */}
            <p className={`${ABOUT_EYEBROW} mb-4!`}>
              {data.kicker}
            </p>

            {/* Main Heading */}
            <h1 className={ABOUT_H1}>
              Built to Transform
              <br />
              <span className={ABOUT_BLUE}>Digital Dentistry.</span>
            </h1>

            {/* Body Text */}
            <p className={`${ABOUT_BODY} mb-8 max-w-[95%]`}>
              {data.subtitle}
            </p>

            {/* CTA Button — omitted when primaryCta is not set */}
            {data.primaryCta && (
              <div>
                <Link
                  href={data.primaryCta.href}
                  className={`${ABOUT_BTN} ${ABOUT_BTN_SIZE} px-7!`}
                >
                  <span>{data.primaryCta.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
                </Link>
              </div>
            )}
          </div>

          {/* ── Right Column: Mission / Focus / Innovation ────────────────────────── */}
          <div className="w-full xl:w-[65%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0">
              {data.features.map((feature, i) => {
                const Icon = ICON_MAP[feature.icon] || ShieldCheck;
                return (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center text-center px-3 lg:px-6 ${
                      i !== 0 ? 'md:border-l md:border-gray-200/60' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className="mb-4 text-[var(--hv2-blue)] w-14 h-14 rounded-full bg-gradient-to-b from-white to-[#F1F5F9] border border-white/60 shadow-[0_8px_16px_rgba(0,80,216,0.06)] flex items-center justify-center">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    {/* Title */}
                    <h3 className={`${ABOUT_CARD_TITLE} mb-2`}>
                      {feature.title}
                    </h3>
                    {/* Description */}
                    <p className={`${ABOUT_CARD_DESC} px-1`}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
