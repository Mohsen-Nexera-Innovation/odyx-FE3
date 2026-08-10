'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { SearchSectionData } from '../types';

export function SearchSection({ data }: { data: SearchSectionData }) {
  const [query, setQuery] = useState('');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById('beginner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full px-[clamp(20px,4vw,56px)]">
      <div className="w-full bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-5 lg:py-6 px-4 lg:px-6 border border-gray-100/50">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4">
          <form
            className="flex items-center gap-3 flex-1 min-h-[50px] px-4 rounded-full bg-[#F7F9FC] border border-gray-200/80"
            onSubmit={onSearch}
            role="search"
          >
            <Search className="w-[18px] h-[18px] text-[#98A2B3] shrink-0" strokeWidth={1.5} aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={data.placeholder}
              aria-label="Search learning content"
              className="flex-1 min-w-0 border-0 outline-none bg-transparent text-[14px] font-medium text-[#0A1020] placeholder:text-[#98A2B3] placeholder:font-normal"
            />
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold text-[#0A1020] me-1">
              {data.popularLabel}
            </span>
            {data.tags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="inline-flex items-center rounded-full bg-[#F1F5F9] hover:bg-[#E8EEF6] !text-[#0A1020] text-[13px] font-semibold px-3.5 py-1.5 transition-colors"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
