import Link from 'next/link';

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-5 py-6 sm:px-6">
      <div className="flex flex-col justify-center">
        <h3 className="text-[14px] font-bold text-[#0A1020]">{title}</h3>
        {description && <p className="mt-0.5 text-[13px] font-medium text-[#6B7280]">{description}</p>}
      </div>
      <Link
        href={ctaHref}
        className="inline-flex h-[38px] shrink-0 items-center justify-center rounded-[8px] border border-[#0050D8]/20 bg-white px-5 text-[13px] font-bold !text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default SupportCTA;
