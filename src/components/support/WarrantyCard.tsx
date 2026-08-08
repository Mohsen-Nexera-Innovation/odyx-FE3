import { ShieldCheck, XCircle, CalendarDays } from 'lucide-react';

export function WarrantyCoverageCard({
  title,
  description,
  tone,
}: {
  title: string;
  description: string;
  tone: 'covered' | 'not-covered';
}) {
  const isCovered = tone === 'covered';
  const Icon = isCovered ? ShieldCheck : XCircle;

  return (
    <div className="flex items-start gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-5">
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
          isCovered ? 'border-[#0050D8] bg-transparent text-[#0050D8]' : 'border-[#DC2626] bg-transparent text-[#DC2626]'
        }`}
      >
        <Icon size={24} strokeWidth={1.5} aria-hidden />
      </span>
      <div>
        <h3 className="text-[15px] font-bold text-[#0A1020]">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed font-medium text-[#6B7280] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WarrantyPeriodCard({ months = 12 }: { months?: number }) {
  return (
    <div className="flex items-start gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-5">
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] border border-[#0050D8] bg-transparent text-[#0050D8]">
        <CalendarDays size={26} strokeWidth={1.5} aria-hidden className="mb-[2px]" />
        <span className="absolute mt-[6px] text-[10px] font-bold">{months}</span>
      </span>
      <div>
        <h3 className="text-[15px] font-bold text-[#0A1020]">Warranty Period</h3>
        <p className="mt-2 text-[13px] leading-relaxed font-medium text-[#6B7280] whitespace-pre-line">
          {months} Months of coverage on all{'\n'}products from the date of{'\n'}purchase.
        </p>
      </div>
    </div>
  );
}

export default WarrantyCoverageCard;
