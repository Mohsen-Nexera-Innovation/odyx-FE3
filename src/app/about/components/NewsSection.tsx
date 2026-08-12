'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { NewsData } from '../types';
import {
  ABOUT_BLUE,
  ABOUT_BODY,
  ABOUT_CARD_TITLE,
  ABOUT_CTA_OUTLINE,
  ABOUT_EYEBROW,
  ABOUT_H2,
} from '../aboutChrome';

export function NewsSection({ data }: { data: NewsData }) {
  return (
    <section id="news" className="w-full px-[clamp(20px,4vw,56px)] scroll-mt-[96px]">
      <div className="w-full bg-[#F8F9FA]/50 rounded-[16px] overflow-hidden pt-6 lg:pt-8 pb-2 lg:pb-2 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          
          {/* Left Column (Text & CTA) */}
          <div className="w-full lg:w-[25%] flex flex-col items-start pr-0 lg:pr-6 shrink-0">
            <p className={`${ABOUT_EYEBROW} mb-4!`}>
              {data.kicker}
            </p>

            <h2 className={`${ABOUT_H2} mb-4!`}>
              {data.title.split('Ahead.').map((part, i, arr) => 
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <span className={ABOUT_BLUE}>Ahead.</span>
                  </React.Fragment>
                ) : part
              )}
            </h2>

            {/* Body Text */}
            <p className={`${ABOUT_BODY} mb-8`}>
              {data.description}
            </p>

            {data.cta && (
              <Link
                href={data.cta.href}
                className={ABOUT_CTA_OUTLINE}
              >
                <span>{data.cta.label}</span>
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
            .swiper-button-lock {
              display: flex !important;
            }
            .swiper-pagination-lock {
              display: block !important;
            }
          `}</style>

          <div className="relative">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1.2}
              slidesPerGroup={1}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              className="news-swiper"
            >
              {data.news.map((item, i) => (
                <SwiperSlide key={i} className="!h-auto flex">
                  <article className="flex flex-col w-full bg-white rounded-2xl overflow-hidden border border-[rgba(10,40,90,.08)] cursor-default">
                    
                    {/* Image Container */}
                    <div className="relative h-[130px] sm:h-[150px] w-full overflow-hidden bg-[var(--hv2-surface,#F3F5FD)]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                      {item.category && (
                        <div className="absolute top-3 left-3 z-10 bg-[var(--hv2-blue)] text-white text-[12px] font-bold uppercase tracking-[.08em] rtl:tracking-normal rtl:normal-case py-1 px-2.5 rounded-full shadow-sm">
                          {item.category}
                        </div>
                      )}
                    </div>
                    
                    {/* Content Container */}
                    <div className="flex flex-col flex-1 p-4 lg:p-5">
                      <div className="text-[var(--hv2-body)] text-[12px] font-medium mb-2">
                        {item.date}
                      </div>
                      
                      <h3 className={`${ABOUT_CARD_TITLE} mb-2 line-clamp-2`}>
                        {item.title}
                      </h3>
                      
                      <p className="text-[length:clamp(12px,1vw,14.5px)] text-[var(--hv2-body)] font-normal leading-relaxed line-clamp-2 mb-0">
                        {item.description}
                      </p>
                    </div>

                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
