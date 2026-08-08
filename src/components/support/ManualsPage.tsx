'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, FileText, Download } from 'lucide-react';
import { SupportContainer } from './SupportContainer';
import { SupportBreadcrumb } from './SupportBreadcrumb';
import { SupportPageHeader } from './SupportPageHeader';
import { SupportSearchBar } from './SupportSearchBar';
import { FilterPills } from './FilterPills';
import { CategorySidebar } from './CategorySidebar';
import { SupportPagination } from './SupportPagination';
import { MANUAL_CATEGORIES, MANUALS, SUPPORT_PRODUCTS, type ManualEntry } from './data';

const PRODUCT_FILTERS = [
  { id: 'all', label: 'All Products' },
  ...SUPPORT_PRODUCTS.map((p) => ({ id: p.id, label: p.name.replace('ODYX ', '').split(' ')[0] })),
];

const SORT_OPTIONS = [
  { id: 'latest', label: 'Latest' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'name', label: 'Name (A–Z)' },
] as const;

const PAGE_SIZE = 6;

export function ManualsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [product, setProduct] = useState<string>(searchParams.get('product') ?? 'all');
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? 'all');
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]['id']>('latest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MANUALS.filter((manual) => {
      if (product !== 'all' && manual.product !== product) return false;
      if (category !== 'all' && manual.category !== category) return false;
      if (q && !manual.title.toLowerCase().includes(q) && !manual.description.toLowerCase().includes(q)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'name') return a.title.localeCompare(b.title);
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === 'oldest' ? diff : -diff;
    });

    return list;
  }, [query, product, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const categoryItems = [
    { id: 'all', label: 'All Categories', count: MANUALS.length },
    ...MANUAL_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: MANUALS.filter((m) => m.category === c.id).length })),
  ];

  return (
    <div className="min-h-dvh bg-white pt-[90px] pb-16 font-[var(--font-tajawal),Tajawal,sans-serif]">
      <SupportContainer className="flex flex-col gap-6">
        <SupportBreadcrumb
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Support', href: '/support' }, { label: 'Manuals' }]}
        />

        <SupportPageHeader title="Manuals" description="Access all product manuals and guides." />

        <div className="flex flex-col gap-3">
          <SupportSearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search manuals..."
          />
          <FilterPills
            items={PRODUCT_FILTERS}
            activeId={product}
            onSelect={(id) => {
              setProduct(id);
              setPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
          <div className="lg:sticky lg:top-[100px]">
            <CategorySidebar
              title="Categories"
              items={categoryItems}
              activeId={category}
              onSelect={(id) => {
                setCategory(id);
                setPage(1);
              }}
            />
          </div>

          <div className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[16px] font-bold text-[#0A1020]">
                All Manuals ({filtered.length})
              </h2>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7280]">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="h-9 rounded-[8px] border border-[#E5E7EB] bg-white px-2.5 text-[13px] font-bold text-[#0A1020] outline-none focus:border-[#0050D8]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              {pageItems.map((manual) => (
                <ManualListItem key={manual.id} manual={manual} />
              ))}
              {pageItems.length === 0 && (
                <p className="rounded-[10px] border border-dashed border-[#E5E7EB] bg-white px-4 py-10 text-center text-[13px] font-medium text-[#6B7280]">
                  No manuals match your filters.
                </p>
              )}
            </div>

            <SupportPagination page={page} pageCount={pageCount} onChange={setPage} />
          </div>
        </div>
      </SupportContainer>
    </div>
  );
}

function ManualListItem({ manual }: { manual: ManualEntry }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-[10px] border border-[#E5E7EB] bg-white p-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#F3E9E9] text-[#DC2626]">
        <FileText size={20} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] font-bold text-[#0A1020]">{manual.title}</h3>
        <p className="mt-0.5 text-[13px] font-medium text-[#6B7280]">{manual.description}</p>
        <p className="mt-1.5 text-[12px] font-semibold text-[#9CA3AF]">
          {manual.fileType} · {manual.size} · {manual.date}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:pl-2">
        <a
          href={manual.previewHref}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] px-3.5 text-[12px] font-bold text-[#374151] transition-colors hover:border-[#0050D8] hover:text-[#0050D8]"
        >
          <Eye size={14} aria-hidden />
          Preview
        </a>
        <a
          href={manual.downloadHref}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] bg-[#0050D8] px-3.5 text-[12px] font-bold text-white transition-colors hover:bg-[#0040B0]"
        >
          <Download size={14} aria-hidden />
          Download
        </a>
      </div>
    </div>
  );
}

export default ManualsPage;
