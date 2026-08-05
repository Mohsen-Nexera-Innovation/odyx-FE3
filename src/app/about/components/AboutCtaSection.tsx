import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StatsData } from '../types';

export function AboutCtaSection({ data }: { data: StatsData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)] flex justify-center">
      <div className="w-full">
        <div className="bg-[#070F22] rounded-[8px] py-5 lg:py-6 px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-0 w-[150px] h-full bg-[#0050D8]/30 blur-[60px] pointer-events-none" />

          {/* Left Area: Glowing Orb & Text */}
          <div className="flex items-center gap-5 relative z-10 shrink-0 w-full lg:w-auto justify-center lg:justify-start">
            
            {/* Image Orb */}
            <div className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] shrink-0 flex items-center justify-center relative -ml-2 -my-2 lg:-my-4">
              <img 
                src="/images/about/future_of_dentistyry.png" 
                alt="Future of dentistry" 
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,100,255,0.6)] scale-[1.5] lg:scale-[1.7]"
              />
            </div>

            {/* Title Text */}
            <h2 className="text-white text-[18px] lg:text-[24px] font-medium leading-[1.3] tracking-wide min-w-[200px]">
              Together, we&apos;re shaping
              <br />
              the future of dentistry.
            </h2>
          </div>

          {/* Right Area: Stats & CTA Button */}
          <div className="flex flex-col xl:flex-row items-center gap-6 lg:gap-10 relative z-10 w-full lg:w-auto mt-4 lg:mt-0">
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 lg:gap-8">
              {data.stats.map((stat, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-start min-w-[80px]">
                    <span className="text-white text-[24px] lg:text-[30px] font-bold tracking-tight leading-none mb-1.5">
                      {stat.value}
                    </span>
                    <span className="text-white/80 text-[12px] lg:text-[14px] font-medium tracking-wide whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                  
                  {/* Vertical Divider */}
                  {i < data.stats.length - 1 && (
                    <div className="w-px h-12 bg-white/10" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={data.cta.href}
              // className="inline-flex items-center justify-center gap-2 bg-white text-[#2B49D8] hover:bg-gray-50 text-[14px] lg:text-[16px] font-bold px-8 py-3 rounded-[6px] transition-all duration-300 w-full lg:w-auto shrink-0"
              className="news-cta-btn inline-flex items-center gap-2 font-bold text-[13px] lg:text-[14px] px-6 py-2.5 rounded-[10px] transition-colors"
              
            >
              {data.cta.label}
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* <Link
              href={data.cta.href}
              className="news-cta-btn inline-flex items-center gap-2 font-bold text-[13px] lg:text-[14px] px-6 py-2.5 rounded-[10px] transition-colors"
            >
              {data.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
            </Link> */}
          </div>

        </div>
      </div>
    </section>
  );
}
