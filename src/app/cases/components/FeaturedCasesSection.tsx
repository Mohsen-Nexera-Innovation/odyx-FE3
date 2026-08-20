'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowIcon } from '@/components/cases/CasesIcons';
import { CASES_TEXT_LINK } from '@/components/cases/casesChrome';
import type { FeaturedCase, FeaturedSectionData } from '@/content/cases';

import 'swiper/css';
import 'swiper/css/navigation';

function CaseMedia({ item }: { item: FeaturedCase }) {
  const before = item.before;
  const after = item.after;

  if (before && after) {
    return (
      <div className="relative h-[140px] sm:h-[150px] w-full shrink-0 overflow-hidden bg-gray-100 grid grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.img} alt={before.alt} className="h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.img} alt={after.alt} className="h-full w-full object-cover" />
        <span
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]"
          aria-hidden
        />
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#0A1020]/78 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          {item.badge}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-[140px] sm:h-[150px] w-full shrink-0 overflow-hidden bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.img} alt={item.imgAlt} className="w-full h-full object-cover" />
      <span className="absolute top-3 left-3 z-10 rounded-full bg-[#0A1020]/78 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
        {item.badge}
      </span>
    </div>
  );
}

export function FeaturedCasesSection({
  data,
}: {
  data: FeaturedSectionData;
}) {
  return (
    <section
      id="featured-cases"
      className="w-full px-[clamp(20px,4vw,56px)] scroll-mt-28"
      aria-labelledby="featured-cases-title"
    >
      <div className="w-full bg-[#F8F9FA]/60 rounded-[16px] overflow-hidden py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/40">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3! mb-6!">
          <div>
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
              {data.kicker}
            </p>
            <h2
              id="featured-cases-title"
              className="text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight max-w-xl"
            >
              {data.title}
            </h2>
          </div>
          {data.viewAll ? (
            <Link href={data.viewAll.href} className={CASES_TEXT_LINK}>
              {data.viewAll.label}
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>

        <div className="relative">
          <style jsx global>{`
            .cases-featured-swiper .swiper-wrapper {
              align-items: stretch;
            }
            .cases-featured-swiper .swiper-slide {
              height: auto;
              display: flex;
              box-sizing: border-box;
            }
          `}</style>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.12}
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 18 },
              1280: { slidesPerView: 3.2, spaceBetween: 18 },
            }}
            navigation={{
              prevEl: '.cases-featured-prev',
              nextEl: '.cases-featured-next',
            }}
            className="cases-featured-swiper"
          >
            {data.items.length === 0 ? (
              <SwiperSlide className="!h-auto !flex">
                <p className="w-full rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-[14px] text-[#667085]">
                  Clinical cases are coming soon.
                </p>
              </SwiperSlide>
            ) : (
              data.items.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto !flex">
                  <article className="flex flex-col w-full h-full min-h-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                    <CaseMedia item={item} />

                    <div className="flex flex-col flex-1 p-4 lg:p-5 gap-3! min-h-0">
                      <h3 className="text-[14px] lg:text-[15px] font-extrabold text-[#0A1020] leading-snug m-0! line-clamp-2 min-h-[2.6em]">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5! min-h-[28px]">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-[11px] font-semibold text-[#475467]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <span className="block text-[11px] font-semibold text-[#667085] mb-2">
                          Products Used
                        </span>
                        <div className="flex items-center gap-2! min-h-7">
                          {item.products.map((p) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={p.id}
                              src={p.img}
                              alt={p.alt}
                              className="w-7 h-7 object-contain rounded-md border border-gray-100 bg-[#F5F8FC] p-0.5"
                            />
                          ))}
                          {item.moreProducts > 0 ? (
                            <span className="min-w-7 h-7 px-1.5 rounded-md bg-[#EEF3FF] text-[#0050D8] text-[11px] font-bold flex items-center justify-center">
                              +{item.moreProducts}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={item.href}
                          className="mt-3 inline-flex items-center gap-1.5 !text-[#0050D8] text-[12px] font-bold hover:gap-2 transition-all"
                        >
                          View Case
                          <ArrowIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <button
            type="button"
            className="cases-featured-prev hidden sm:flex absolute left-1 lg:-left-2 top-[42%] -translate-y-1/2 z-10 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] items-center justify-center text-[#0050D8] hover:scale-105 transition-transform disabled:opacity-35"
            aria-label="Previous cases"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="cases-featured-next hidden sm:flex absolute right-1 lg:-right-2 top-[42%] -translate-y-1/2 z-10 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] items-center justify-center text-[#0050D8] hover:scale-105 transition-transform disabled:opacity-35"
            aria-label="Next cases"
          >
            <ChevronRight className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
