'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download } from 'lucide-react';
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
    <div className="min-h-dvh bg-white pt-[90px] pb-16 font-[var(--font-tajawal),Tajawal,sans-serif]">
      <SupportContainer className="flex flex-col gap-6">
        <SupportBreadcrumb
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Support', href: '/support' }, { label: 'Downloads' }]}
        />

        <SupportPageHeader title="Downloads" description="Download the latest software, firmware, drivers and resources." />

        <div className="flex flex-col gap-3">
          <SupportSearchBar value={query} onChange={setQuery} placeholder="Search downloads..." />
          <FilterPills items={FILTERS} activeId={category} onSelect={setCategory} />
        </div>

        <div className="overflow-x-auto rounded-[12px] border border-[#E5E7EB]">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F7F9FB]">
                {['Name', 'Category', 'Version', 'Release Date', 'Size', ''].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-[12px] font-bold uppercase tracking-wide text-[#6B7280] whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className={i !== filtered.length - 1 ? 'border-b border-[#F1F2F4]' : ''}>
                  <td className="px-4 py-3.5">
                    <p className="text-[13px] font-bold text-[#0A1020]">{item.name}</p>
                    <p className="mt-0.5 text-[12px] font-medium text-[#6B7280]">{item.description}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#374151] whitespace-nowrap">
                    {DOWNLOAD_CATEGORIES.find((c) => c.id === item.category)?.label}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#374151] whitespace-nowrap">{item.version}</td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#374151] whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3.5 text-[13px] font-medium text-[#374151] whitespace-nowrap">{item.size}</td>
                  <td className="px-4 py-3.5 text-right">
                    <a
                      href={item.downloadHref}
                      aria-label={`Download ${item.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#0050D8] transition-colors hover:border-[#0050D8] hover:bg-[#F3F7FF]"
                    >
                      <Download size={15} aria-hidden />
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[13px] font-medium text-[#6B7280]">
                    No downloads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <SupportCTA
          title="Need help installing or using downloads?"
          description="Our support team can help you install and configure any software or firmware update."
          ctaLabel="Contact Support"
          ctaHref="/sales"
        />
      </SupportContainer>
    </div>
  );
}

export default DownloadsPage;
