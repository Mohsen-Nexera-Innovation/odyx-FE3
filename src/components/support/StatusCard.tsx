import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { StatusCardData } from './data';

export function StatusCard({ status }: { status: StatusCardData }) {
  const isOk = status.tone === 'ok';
  return (
    <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-4">
      {isOk && (
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F8EE] text-[#16A34A]">
          <CheckCircle2 size={18} aria-hidden />
        </span>
      )}
      <div className="flex flex-col">
        <span className="text-[12px] font-semibold text-[#6B7280]">{status.label}</span>
        <span className="text-[14px] font-bold text-[#0A1020]">{status.value}</span>
        {status.linkLabel && (
          <Link href={status.href} className="mt-0.5 text-[12px] font-bold text-[#0050D8] hover:underline">
            {status.linkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export default StatusCard;
