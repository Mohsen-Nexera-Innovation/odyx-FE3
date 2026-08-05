import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Lightbulb, Globe } from 'lucide-react';
import { AboutHeroData } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  'shield-check': ShieldCheck,
  'users': Users,
  'lightbulb': Lightbulb,
  'globe': Globe,
};

export function AboutHero({ data }: { data: AboutHeroData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)] pt-[65px] lg:pt-[85px]">
      <div 
        className="w-full bg-[#F4F8FD] rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 relative"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col xl:flex-row items-center py-6 lg:py-8 px-4 lg:px-6 gap-8 lg:gap-6">

          {/* ── Left Column: Text ──────────────────────────── */}
          <div className="w-full xl:w-[35%] flex flex-col justify-center">

            {/* Kicker */}
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            {/* Main Heading */}
            <h1 className="text-[36px] lg:text-[44px] font-extrabold text-[#0A1020] leading-[1.15] tracking-tight mb-5">
              Built to Transform
              <br />
              <span className="text-[#1D4ED8]">Digital Dentistry.</span>
            </h1>

            {/* Body Text */}
            <p className="text-[#0A1020] text-[15px] lg:text-[16px] leading-relaxed mb-8 max-w-[95%] font-medium">
              {data.subtitle}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center gap-2 bg-[#0050D8] hover:bg-[#0040B0] text-white text-[14px] lg:text-[15px] font-semibold px-7 py-3 rounded-[10px] transition-colors shadow-[0_4px_14px_rgba(0,80,216,0.35)]"
              >
                {data.primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* ── Right Column: 4 Features ────────────────────────── */}
          <div className="w-full xl:w-[65%]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0">
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
                    <div className="mb-4 text-[#0050D8] w-14 h-14 rounded-full bg-gradient-to-b from-white to-[#F1F5F9] border border-white/60 shadow-[0_8px_16px_rgba(0,80,216,0.06)] flex items-center justify-center">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    {/* Title */}
                    <h3 className="text-[13px] lg:text-[14px] font-extrabold text-[#0A1020] mb-2">
                      {feature.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[12px] lg:text-[13px] text-[#0A1020] font-medium leading-relaxed px-1">
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
