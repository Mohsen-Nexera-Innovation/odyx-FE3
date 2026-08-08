'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, FileText, Download, ChevronDown } from 'lucide-react';
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
  ...SUPPORT_PRODUCTS.map((p) => {
    let label = p.name;
    if (p.id === 's1-scanner') label = 'Scanner';
    else if (p.id === 'p1-26-printer') label = 'Printer';
    else if (p.id === 'cure-unit') label = 'Cure';
    else if (p.id === 'resin-materials') label = 'Resin';
    return { id: p.id, label };
  }),
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="support-page bg-white pt-[80px] lg:pt-[85px] pb-4 font-[var(--font-tajawal),Tajawal,sans-serif]">
      <SupportContainer className="flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <SupportBreadcrumb crumbs={[{ label: 'Support', href: '/support' }, { label: 'Manuals' }]} />
          <SupportPageHeader title="Manuals" description="Access all product manuals and guides." />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full sm:w-[320px] shrink-0">
            <SupportSearchBar
              value={query}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
              placeholder="Search manuals..."
            />
          </div>
          <div className="flex-none">
            <FilterPills
              items={PRODUCT_FILTERS}
              activeId={product}
              onSelect={(id) => {
                setProduct(id);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 lg:gap-6 items-start">
          <div className="hidden lg:block lg:sticky lg:top-[100px]">
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
              <div ref={sortRef} className="relative flex items-center gap-2 text-[12px] font-semibold text-[#6B7280] rounded-[10px] border border-gray-100/60 bg-[#F9FAFB] px-3 py-1.5 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
                Sort by:
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1.5 rounded-[6px] border-none bg-transparent px-1.5 py-1 text-[12px] font-bold text-[#0A1020] outline-none transition-colors hover:bg-black/5"
                >
                  {SORT_OPTIONS.find(o => o.id === sort)?.label}
                  <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-[10px] border border-gray-100/60 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="flex flex-col p-1">
                      {SORT_OPTIONS.map((opt) => (
                        <li key={opt.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSort(opt.id);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-start px-3 py-2 text-[12px] font-semibold rounded-[6px] transition-colors ${sort === opt.id ? 'bg-[#0050D8] text-white' : 'text-[#4B5563] hover:bg-[#F4F8FD] hover:text-[#0050D8]'}`}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#F3F4F6] border border-[#F3F4F6] rounded-[12px] p-2 bg-white">
              {pageItems.map((manual) => (
                <ManualListItem key={manual.id} manual={manual} />
              ))}
              {pageItems.length === 0 && (
                <p className="px-4 py-10 text-center text-[13px] font-medium text-[#6B7280]">
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
  const productInfo = SUPPORT_PRODUCTS.find((p) => p.id === manual.product);
  const showImage = manual.product === 'p1-26-printer' || manual.product === 'cure-unit';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white px-3 py-4 transition-colors hover:bg-[#F9FAFB]">
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-[#F4F5F7] text-[#6B7280] overflow-hidden">
        {showImage && productInfo?.image ? (
          <img src={productInfo.image} alt="" className="h-10 w-10 object-contain mix-blend-multiply" />
        ) : (
          <FileText size={24} strokeWidth={1.5} aria-hidden />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-[14.5px] font-bold text-[#0A1020]">{manual.title}</h3>
        <p className="mt-0.5 text-[13px] font-medium text-[#6B7280]">{manual.description}</p>
        <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold text-[#9CA3AF]">
          <span>{manual.fileType}</span>
          <span>&middot;</span>
          <span>{manual.size}</span>
          <span>&middot;</span>
          <span>{manual.date}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:pl-2">
        <a
          href={manual.previewHref}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-4 text-[12.5px] font-bold !text-[#0050D8] transition-colors hover:border-[#0050D8]/40 hover:bg-[#F4F8FD]"
        >
          <Eye size={14} aria-hidden />
          Preview
        </a>
        <a
          href={manual.downloadHref}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] bg-[#0050D8] px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-[#0040B0]"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default ManualsPage;
