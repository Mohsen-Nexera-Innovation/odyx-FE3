'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { TeamData } from '../types';

export function TeamSection({ data }: { data: TeamData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)]">
      <div className="w-full bg-[#F8F9FA]/50 rounded-[16px] overflow-hidden pt-6 lg:pt-8 pb-2 lg:pb-2 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Left Column (Text & CTA) */}
          <div className="w-full lg:w-[25%] flex flex-col items-start pr-0 lg:pr-6 shrink-0">
            <p className="text-[#0050D8] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-[36px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight mb-4">
              {data.title.split('Impact.').map((part, i, arr) => 
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <span className="text-[#0050D8]">Impact.</span>
                  </React.Fragment>
                ) : part
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-[#0A1020] text-[14px] lg:text-[15px] leading-relaxed mb-8 font-medium">
              {data.description}
            </p>

            <Link
              href={data.cta.href}
              className="team-cta-btn inline-flex items-center gap-2 font-bold text-[13px] lg:text-[14px] px-6 py-2.5 rounded-[10px] transition-colors"
            >
              {data.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Right Column (Slider) */}
          <div className="w-full lg:w-[75%] relative min-w-0">
            {/* Swiper Custom Styles */}
            <style jsx global>{`
              .team-swiper .swiper-pagination-bullet {
                background: #CBD5E1;
                opacity: 1;
                width: 8px;
                height: 8px;
                transition: all 0.3s ease;
              }
              .team-swiper .swiper-pagination-bullet-active {
                background: #0050D8;
                width: 10px;
                height: 10px;
              }
              .team-swiper .swiper-pagination {
                position: relative;
                margin-top: 16px;
              }
              .team-cta-btn {
                border: 1.5px solid #DCE6F7;
                color: #0050D8;
                background-color: white;
              }
              .team-cta-btn:hover {
                background-color: #0050D8;
                color: white;
                border-color: #0050D8;
              }
            `}</style>

            <div className="relative lg:pr-16">
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1.2}
                slidesPerGroup={1}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                navigation={{ nextEl: '.team-next-btn' }}
                className="team-swiper !pb-2"
              >
                {data.members.map((member, i) => (
                  <SwiperSlide key={i} className="!h-auto">
                    <div className="group relative h-[260px] sm:h-[280px] rounded-[16px] overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300">
                      
                      {/* Placeholder Background (Matches Design Mock) */}
                      <div className="absolute inset-0 w-full h-full bg-[#E8EDF2] flex flex-col items-center justify-start pt-10">
                        <div className="w-[84px] h-[84px] rounded-full bg-[#99A6B8] mb-3" />
                        <div className="w-[150px] h-[150px] rounded-t-full bg-[#99A6B8]" />
                      </div>
                      
                      {/* Smooth Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061129] from-[10%] via-[#061129]/70 via-[40%] to-transparent to-[70%] pointer-events-none" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                        <h3 className="text-[14px] lg:text-[15px] font-bold text-white mb-0.5">
                          {member.name}
                        </h3>
                        <p className="text-[#CBD5E1] text-[12px] lg:text-[13px] font-medium mb-3">
                          {member.role}
                        </p>
                        
                        {/* LinkedIn Icon */}
                        <a 
                          href={member.linkedin}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                          aria-label={`LinkedIn for ${member.name}`}
                        >
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                          </svg>
                        </a>
                      </div>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Next Button */}
              <button 
                className="team-next-btn hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] items-center justify-center text-[#0050D8] hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Next team member"
              >
                <ChevronRight className="w-6 h-6 ml-0.5" />
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
