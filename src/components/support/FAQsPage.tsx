'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SupportContainer } from './SupportContainer';
import { SupportBreadcrumb } from './SupportBreadcrumb';
import { SupportPageHeader } from './SupportPageHeader';
import { SupportSearchBar } from './SupportSearchBar';
import { FilterPills } from './FilterPills';
import { CategorySidebar } from './CategorySidebar';
import { FAQAccordion } from './FAQAccordion';
import { SupportCTA } from './SupportCTA';
import { FAQS, FAQ_CATEGORIES } from './data';

export function FAQsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? 'all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((faq) => {
      if (category !== 'all' && faq.category !== category) return false;
      if (q && !faq.question.toLowerCase().includes(q) && !faq.answer.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category]);

  const filterPills = [
    { id: 'all', label: 'All' },
    ...FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  const sidebarItems = FAQ_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    count: FAQS.filter((f) => f.category === c.id).length,
  }));

  return (
    <div className="support-page bg-white pt-[80px] lg:pt-[85px] pb-4 overflow-x-hidden">
      <SupportContainer className="flex flex-col gap-6 min-w-0 max-w-full">

        <div className="flex flex-col gap-4">
          <SupportBreadcrumb crumbs={[{ label: 'Support', href: '/support' }, { label: 'FAQs' }]} />
          <SupportPageHeader title="FAQs" description="Find answers to the most common questions." />
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div className="w-full max-w-[420px]">
            <SupportSearchBar value={query} onChange={setQuery} placeholder="Search FAQs..." />
          </div>
          <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterPills items={filterPills} activeId={category} onSelect={setCategory} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 lg:gap-6 items-start min-w-0">
          <div className="hidden lg:block lg:sticky lg:top-[100px]">
            <CategorySidebar title="Categories" items={sidebarItems} activeId={category} onSelect={setCategory} />
          </div>

          <div className="min-w-0 max-w-full">
            <FAQAccordion faqs={filtered} />
          </div>
        </div>

        <SupportCTA
          title="Can't find your answer?"
          description="Our support team is here to help."
        />
      </SupportContainer>
    </div>
  );
}

export default FAQsPage;
