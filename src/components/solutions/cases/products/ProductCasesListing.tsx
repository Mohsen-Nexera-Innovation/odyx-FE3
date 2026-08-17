'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCaseCard from '@/components/solutions/cases/products/ProductCaseCard';
import {
  PRODUCT_FAMILY_META,
  PRODUCT_FAMILY_SLUGS,
  filterProductCases,
  productCasesPath,
  type ProductCaseCard as ProductCaseCardData,
  type ProductCaseFamily,
  type ProductFamilySlug,
} from '@/content/product-cases';

import 'swiper/css';
import 'swiper/css/navigation';

const GUTTER = 'w-full px-[clamp(20px,4vw,56px)]';

const TABS: { id: ProductCaseFamily; label: string }[] = [
  { id: 'all', label: 'All' },
  ...PRODUCT_FAMILY_SLUGS.map((id) => ({ id, label: PRODUCT_FAMILY_META[id].label })),
];

const NAV_BTN =
  'absolute top-[42%] z-10 box-border flex size-10 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border border-[#D5D9E2] bg-white p-0 text-[#3A4150] shadow-[0_2px_8px_rgba(15,23,42,0.08)] hover:border-[#C5CAD6] hover:text-[#1F2937] disabled:cursor-default disabled:opacity-35';

function NavChevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === 'next' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

type Props = {
  cases: ProductCaseCardData[];
  family: ProductCaseFamily;
};

function CaseGrid({
  items,
  listingFamily,
}: {
  items: ProductCaseCardData[];
  listingFamily: ProductCaseFamily;
}) {
  return (
    <ul className="m-0 p-0 list-none [display:grid] grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <ProductCaseCard item={item} listingFamily={listingFamily} />
        </li>
      ))}
    </ul>
  );
}

function CaseSwiper({
  items,
  listingFamily,
  navId,
}: {
  items: ProductCaseCardData[];
  listingFamily: ProductFamilySlug;
  navId: string;
}) {
  const prevClass = `product-cases-prev-${navId}`;
  const nextClass = `product-cases-next-${navId}`;
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDir(root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr');
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['dir'] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="relative min-w-0">
      <Swiper
        dir={dir}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        watchOverflow
        observer
        observeParents
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        className="[&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:box-border [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto [&_.swiper-slide]:min-w-0"
        key={`${navId}-${dir}-${items.map((item) => item.id).join('|')}`}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto !flex min-w-0">
            <ProductCaseCard item={item} listingFamily={listingFamily} />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            className={`${prevClass} ${NAV_BTN} left-0 -translate-y-1/2 lg:-left-2`}
            aria-label="Previous cases"
          >
            <NavChevron dir="prev" />
          </button>
          <button
            type="button"
            className={`${nextClass} ${NAV_BTN} right-0 -translate-y-1/2 lg:-right-2`}
            aria-label="Next cases"
          >
            <NavChevron dir="next" />
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function ProductCasesListing({ cases, family }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim();
  const isAll = family === 'all';

  const sections = useMemo(() => {
    const families: ProductFamilySlug[] = isAll ? [...PRODUCT_FAMILY_SLUGS] : [family];
    return families
      .map((id) => ({
        id,
        title: `${PRODUCT_FAMILY_META[id].label} cases`,
        items: filterProductCases(cases, id, q),
      }))
      .filter((s) => s.items.length > 0);
  }, [cases, family, isAll, q]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#F3F6FA] w-full min-h-dvh overflow-x-clip pb-12" data-hero-light>
      <div className={`${GUTTER} pt-[calc(var(--hdr-h)+20px)] sm:pt-[calc(var(--hdr-h)+28px)] lg:pt-[calc(var(--hdr-h)+40px)]`}>
        <div className="flex flex-col items-center text-center mb-7 md:mb-10 min-w-0">
          <p className="m-0 text-[#0050D8] text-[13px] md:text-[14px] font-bold uppercase tracking-[0.14em] mb-3">
            Featured clinical cases
          </p>
          <h1
            id="product-cases-title"
            className="m-0 w-full max-w-[22ch] text-[26px] sm:text-[34px] lg:text-[40px] font-bold text-[#0F2744] leading-[1.2] tracking-tight break-words"
          >
            Explore real results from dental professionals.
          </h1>

          <form
            className="mt-6 sm:mt-7 flex items-center gap-3 w-full max-w-[560px] min-h-12 sm:min-h-[52px] px-4 sm:px-5 rounded-xl bg-white border border-[#E5EAF1] shadow-[0_8px_24px_rgba(15,40,80,0.04)]"
            onSubmit={onSearch}
            role="search"
          >
            <Search className="w-[18px] h-[18px] text-[#9CA3AF] shrink-0" strokeWidth={1.8} aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a specific clinical case..."
              aria-label="Search for a specific clinical case"
              className="flex-1 min-w-0 border-0 outline-none bg-transparent text-[16px] text-[#0F2744] placeholder:text-[#9CA3AF]"
            />
          </form>

          <div
            className="mt-5 flex flex-wrap justify-center gap-2 w-full max-w-full"
            role="tablist"
            aria-label="Product families"
          >
            {TABS.map((tab) => {
              const selected = tab.id === family;
              return (
                <Link
                  key={tab.id}
                  href={productCasesPath(tab.id)}
                  role="tab"
                  aria-selected={selected}
                  className={`shrink-0 inline-flex items-center justify-center min-h-11 rounded-full px-3.5 sm:px-5 text-[13px] font-semibold no-underline transition-colors ${
                    selected
                      ? 'bg-[#0050D8] !text-white'
                      : 'bg-white !text-[#1E3A5F] border border-[#D5DCE6] hover:border-[#0050D8] hover:!text-[#0050D8]'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        {sections.length === 0 ? (
          <p className="w-full rounded-2xl border border-dashed border-[#D5DCE6] bg-white px-6 py-12 text-center text-[14px] text-[#6B7280]">
            {q
              ? 'No cases match this search in the selected product family.'
              : 'No clinical cases are tagged with this product family yet.'}
          </p>
        ) : (
          <div className="flex flex-col gap-8 md:gap-9">
            {sections.map((section) => (
              <section key={section.id} className="min-w-0" aria-labelledby={`product-cases-${section.id}`}>
                <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 min-w-0">
                  <h2
                    id={`product-cases-${section.id}`}
                    className="m-0 min-w-0 text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#0F2744] break-words"
                  >
                    {section.title}
                  </h2>
                  {isAll ? (
                    <Link
                      href={productCasesPath(section.id)}
                      className="inline-flex items-center gap-1 shrink-0 text-[14px] sm:text-[15px] font-medium !text-[#6B7280] no-underline hover:!text-[#0050D8]"
                    >
                      View all
                      <svg className="w-3.5 h-3.5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  ) : null}
                </div>
                {isAll ? (
                  <CaseSwiper items={section.items} listingFamily={section.id} navId={section.id} />
                ) : (
                  <CaseGrid items={section.items} listingFamily={family} />
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
