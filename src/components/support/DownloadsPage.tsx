'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, FileText } from 'lucide-react';
import { SupportContainer } from './SupportContainer';
import { SupportBreadcrumb } from './SupportBreadcrumb';
import { SupportPageHeader } from './SupportPageHeader';
import { SupportSearchBar } from './SupportSearchBar';
import { FilterPills } from './FilterPills';
import { SupportCTA } from './SupportCTA';
import { DOWNLOAD_CATEGORIES, DOWNLOADS } from './data';

const FILTERS = [{ id: 'all', label: 'All' }, ...DOWNLOAD_CATEGORIES];

export function DownloadsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<string>(searchParams.get('category') ?? 'all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOWNLOADS.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (q && !item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category]);

  return (
    <div className="support-page bg-white pt-[80px] lg:pt-[85px] pb-4">
      <SupportContainer className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <SupportBreadcrumb crumbs={[{ label: 'Support', href: '/support' }, { label: 'Downloads' }]} />
          <SupportPageHeader title="Downloads" description="Download the latest software, firmware, drivers and resources." />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full sm:w-[320px] shrink-0">
            <SupportSearchBar value={query} onChange={setQuery} placeholder="Search downloads..." />
          </div>
          <div className="flex-none">
            <FilterPills items={FILTERS} activeId={category} onSelect={setCategory} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-[12px] border border-gray-100/80 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead className="bg-[#F9FAFB]">
              <tr className="border-b border-gray-100/80">
                {['Name', 'Category', 'Version', 'Release Date', 'Size', 'Action'].map((head, idx) => (
                  <th
                    key={head}
                    className={`py-4 text-sm font-medium text-[#6B7280] whitespace-nowrap ${idx === 0 ? 'pl-4 sm:pl-6 pr-4' : 'px-4 sm:px-6'} ${idx === 5 ? 'text-right' : ''}`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((item, i) => {
                const isLast = i === filtered.length - 1;
                return (
                  <tr key={item.id} className={`group ${isLast ? '' : 'border-b border-[#F1F2F4]'}`}>
                    <td className="pl-4 sm:pl-6 pr-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#F4F8FD] text-[#0050D8]">
                          <FileText size={20} strokeWidth={2} aria-hidden />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0A1020]">{item.name}</p>
                          <p className="mt-0.5 text-xs font-medium text-[#6B7280]">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#374151] whitespace-nowrap">
                      {DOWNLOAD_CATEGORIES.find((c) => c.id === item.category)?.label}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#374151] whitespace-nowrap">{item.version}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#374151] whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#374151] whitespace-nowrap">{item.size}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={item.downloadHref}
                        aria-label={`Download ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E5E7EB] !text-[#4B5563] transition-colors hover:border-[#0050D8] hover:text-[#0050D8] hover:bg-[#F3F7FF] ml-auto"
                      >
                        <Download size={16} strokeWidth={2} aria-hidden />
                      </a>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm font-medium text-[#6B7280]">
                    No downloads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <SupportCTA
          title="Need help installing or using these downloads?"
          ctaLabel="Contact Support"
          ctaHref="/sales"
        />
      </SupportContainer>
    </div>
  );
}

export default DownloadsPage;
