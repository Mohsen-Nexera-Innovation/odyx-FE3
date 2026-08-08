import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SupportCTA({
  title,
  description,
  ctaLabel = 'Contact Support',
  ctaHref = '/sales',
}: {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px] border border-[#E5E7EB] bg-[#F7F9FB] px-5 py-5 sm:px-6">
      <div>
        <h3 className="text-[15px] font-bold text-[#0A1020]">{title}</h3>
        {description && <p className="mt-1 text-[13px] font-medium text-[#6B7280]">{description}</p>}
      </div>
      <Link
        href={ctaHref}
        className="inline-flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#0050D8] px-5 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors hover:bg-[#0040B0]"
      >
        {ctaLabel}
        <ArrowRight size={14} aria-hidden />
      </Link>
    </div>
  );
}

export default SupportCTA;
