import { CheckCircle2, XCircle } from 'lucide-react';
import type { WarrantyCoverageItem } from './data';

export function WarrantyCoverageCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: WarrantyCoverageItem[];
  tone: 'covered' | 'not-covered';
}) {
  const isCovered = tone === 'covered';
  const Icon = isCovered ? CheckCircle2 : XCircle;

  return (
    <div className="flex flex-col rounded-[12px] border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
            isCovered ? 'bg-[#E7F8EE] text-[#16A34A]' : 'bg-[#FCE9E9] text-[#DC2626]'
          }`}
        >
          <Icon size={18} aria-hidden />
        </span>
        <h3 className="text-[15px] font-bold text-[#0A1020]">{title}</h3>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2 text-[13px] font-medium text-[#374151]">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isCovered ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}
              aria-hidden
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WarrantyPeriodCard({ months = 12 }: { months?: number }) {
  return (
    <div className="flex items-center gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-5">
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F0FE] text-[18px] font-extrabold text-[#0050D8]">
        {months}
      </span>
      <div>
        <h3 className="text-[15px] font-bold text-[#0A1020]">Warranty Period</h3>
        <p className="mt-1 text-[13px] font-medium text-[#6B7280]">
          {months} months standard coverage from purchase date.
        </p>
      </div>
    </div>
  );
}

export default WarrantyCoverageCard;
