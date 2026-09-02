'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SupportPagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#0050D8] hover:text-[#0050D8] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft size={16} aria-hidden />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-colors ${
            p === page ? 'bg-[#0050D8] text-white' : 'text-[#374151] hover:bg-[#F3F7FF] hover:text-[#0050D8]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#0050D8] hover:text-[#0050D8] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  );
}

export default SupportPagination;
