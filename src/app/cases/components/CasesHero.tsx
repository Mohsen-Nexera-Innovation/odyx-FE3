'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { CaseCompareSlider } from './CaseCompareSlider';
import { ArrowIcon, HeroActionIcon } from './CasesIcons';
import { CASES_BTN_OUTLINE, CASES_BTN_PRIMARY } from './cases-buttons';
import type { CasesHeroData } from '../types';

export function CasesHero({ data }: { data: CasesHeroData }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById('featured-cases')?.scrollIntoView({ behavior: 'smooth' });
    if (query.trim()) {
      router.replace(`/cases?q=${encodeURIComponent(query.trim())}#featured-cases`, {
        scroll: false,
      });
    }
  };

  return (
    <section
      className="w-full px-[clamp(20px,4vw,56px)] pt-[65px] lg:pt-[85px]"
      data-hero-light
      aria-labelledby="cases-hero-title"
    >
      <div className="w-full bg-[#F4F8FD] rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
        <div className="relative z-10 flex flex-col xl:flex-row items-center py-6 lg:py-8 px-4 lg:px-6 gap-8 lg:gap-8">
          <div className="w-full xl:w-[48%] flex flex-col justify-center">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            <h1
              id="cases-hero-title"
              className="text-[36px] lg:text-[44px] font-extrabold text-[#0A1020] leading-[1.15] tracking-tight mb-5"
            >
              {data.titleLead}
              <span className="text-[#0050D8]">{data.titleRest}</span>
            </h1>

            <p className="text-[#0A1020] text-[15px] lg:text-[16px] leading-relaxed mb-6 max-w-[95%] font-medium">
              {data.body}
            </p>

            <form
              className="flex items-center gap-3! w-full max-w-[34rem] min-h-[50px] mb-5! px-4 rounded-full bg-white border border-gray-200/80 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              onSubmit={onSearch}
              role="search"
            >
              <Search
                className="w-[18px] h-[18px] text-[#98A2B3] shrink-0"
                strokeWidth={1.8}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={data.searchPlaceholder}
                aria-label="Search clinical cases"
                className="flex-1 min-w-0 border-0 outline-none bg-transparent text-[14px] font-medium text-[#0A1020] placeholder:text-[#98A2B3] placeholder:font-normal"
              />
            </form>

            <div className="flex flex-wrap items-center gap-3!">
              {data.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={action.variant === 'primary' ? CASES_BTN_PRIMARY : CASES_BTN_OUTLINE}
                >
                  <HeroActionIcon id={action.icon} className="w-4 h-4 shrink-0" />
                  {action.label}
                  <ArrowIcon className="w-3.5 h-3.5 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-[52%]">
            <CaseCompareSlider before={data.before} after={data.after} />
          </div>
        </div>
      </div>
    </section>
  );
}
