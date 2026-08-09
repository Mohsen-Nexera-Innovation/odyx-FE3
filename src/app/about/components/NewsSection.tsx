'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { NewsData } from '../types';

export function NewsSection({ data }: { data: NewsData }) {
  return (
    <section id="news" className="w-full px-[clamp(20px,4vw,56px)] scroll-mt-[96px]">
      <div className="w-full bg-[#F8F9FA]/50 rounded-[16px] overflow-hidden pt-6 lg:pt-8 pb-2 lg:pb-2 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Left Column (Text & CTA) */}
          <div className="w-full lg:w-[25%] flex flex-col items-start pr-0 lg:pr-6 shrink-0">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-[36px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight mb-4">
              {data.title.split('Ahead.').map((part, i, arr) => 
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <span className="text-[#0050D8]">Ahead.</span>
                  </React.Fragment>
                ) : part
              )}
            </h2>

            {/* Body Text */}
            <p className="text-[#0A1020] text-[14px] lg:text-[15px] leading-relaxed mb-8 font-medium">
              {data.description}
            </p>

            {data.cta && (
              <Link
                href={data.cta.href}
                className="news-cta-btn inline-flex items-center gap-2 font-bold text-[13px] lg:text-[14px] px-6 py-2.5 rounded-[10px] transition-colors"
              >
                {data.cta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
              </Link>
            )}
        </div>

        {/* Right Column (Slider) */}
        <div className="w-full lg:w-[75%] relative min-w-0">
          {/* Swiper Custom Styles */}
          <style jsx global>{`
            .news-swiper .swiper-pagination-bullet {
              background: #CBD5E1;
              opacity: 1;
              width: 8px;
              height: 8px;
              transition: all 0.3s ease;
            }
            .news-swiper .swiper-pagination-bullet-active {
              background: #0050D8;
              width: 10px;
              height: 10px;
            }
            .news-swiper .swiper-pagination {
              position: relative;
              margin-top: 16px;
            }
            .news-cta-btn {
              border: 1.5px solid #DCE6F7;
              color: #0050D8;
              background-color: white;
            }
            .news-cta-btn:hover {
              background-color: #0050D8;
              color: white;
              border-color: #0050D8;
            }
            .swiper-button-lock {
              display: flex !important;
            }
            .swiper-pagination-lock {
              display: block !important;
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
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              navigation={{ nextEl: '.news-next-btn' }}
              className="news-swiper"
            >
              {data.news.map((item, i) => (
                <SwiperSlide key={i} className="!h-auto flex">
                  <Link href={item.href} className="group flex flex-col w-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                    
                    {/* Image Container */}
                    <div className="relative h-[130px] sm:h-[150px] w-full overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      {item.category && (
                        <div className="absolute top-3 left-3 z-10 bg-[#0050D8] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                          {item.category}
                        </div>
                      )}
                    </div>
                    
                    {/* Content Container */}
                    <div className="flex flex-col flex-1 p-4 lg:p-5">
                      <div className="text-gray-500 text-[11px] font-medium mb-2">
                        {item.date}
                      </div>
                      
                      <h3 className="text-[13px] lg:text-[14px] font-bold text-[#0A1020] mb-2 group-hover:text-[#0050D8] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      
                      <p className="text-[12px] text-gray-500 font-medium leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      
                      {/* Read More Link */}
                      <div className="mt-auto inline-flex items-center gap-1.5 text-[#0050D8] text-[12px] font-bold group-hover:gap-2 transition-all">
                        Read More
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Button (floating right) */}
            <button 
              className="news-next-btn hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] items-center justify-center text-[#0050D8] hover:scale-105 transition-transform"
              aria-label="Next news"
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
