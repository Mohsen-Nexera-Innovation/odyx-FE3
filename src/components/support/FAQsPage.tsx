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
    { id: 'all', label: 'All', count: FAQS.length },
    ...FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: c.count })),
  ];

  return (
    <div className="min-h-dvh bg-white pt-[90px] pb-16 font-[var(--font-tajawal),Tajawal,sans-serif]">
      <SupportContainer className="flex flex-col gap-6">
        <SupportBreadcrumb
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Support', href: '/support' }, { label: 'FAQs' }]}
        />

        <SupportPageHeader title="FAQs" description="Answers to the most common questions." />

        <div className="flex flex-col gap-3">
          <SupportSearchBar value={query} onChange={setQuery} placeholder="Search FAQs..." />
          <FilterPills items={filterPills} activeId={category} onSelect={setCategory} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
          <div className="lg:sticky lg:top-[100px]">
            <CategorySidebar title="Categories" items={FAQ_CATEGORIES} activeId={category} onSelect={setCategory} />
          </div>

          <div className="min-w-0">
            <FAQAccordion faqs={filtered} />
          </div>
        </div>

        <SupportCTA
          title="Can't find your answer?"
          description="Our support team is here to help."
          ctaLabel="Contact Support"
          ctaHref="/sales"
        />
      </SupportContainer>
    </div>
  );
}

export default FAQsPage;
