import Link from 'next/link';
import { CheckCircle2, Monitor, Cpu, Calendar, ArrowRight } from 'lucide-react';
import type { StatusCardData } from '@/content/support';

export function StatusCard({ status }: { status: StatusCardData }) {
  const isOk = status.tone === 'ok';
  
  let Icon = Monitor;
  if (status.id === 'system-status') Icon = CheckCircle2;
  else if (status.id === 'latest-software') Icon = Monitor;
  else if (status.id === 'latest-firmware') Icon = Cpu;
  else if (status.id === 'last-update') Icon = Calendar;

  const iconRadius = isOk ? 'rounded-full' : 'rounded-[10px]';
  const iconColors = isOk ? 'bg-[#E7F8EE] text-[#16A34A]' : 'bg-[#F4F7FC] text-[#0050D8]';

  return (
    <div className="flex flex-row items-center gap-4 px-6 py-7 bg-white">
      <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center ${iconRadius} ${iconColors}`}>
        <Icon size={22} strokeWidth={2.5} aria-hidden />
      </span>
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-[#0A1020] leading-tight mb-1">{status.label}</span>
        <span className="text-[13px] font-medium text-[#6B7280]">{status.value}</span>
        {status.linkLabel && (
          <Link href={status.href} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-bold !text-[#0050D8] transition-colors hover:text-[#0040B0] group">
            {status.linkLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}

export default StatusCard;
