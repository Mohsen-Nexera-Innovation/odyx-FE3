import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
}

export function QuickAccessCard({ icon: Icon, title, description, linkLabel, href }: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[12px] border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#0050D8]/30 hover:shadow-[0_8px_24px_rgba(10,16,32,0.08)]"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#E8F0FE] text-[#0050D8]">
        <Icon size={20} strokeWidth={2} aria-hidden />
      </span>
      <h3 className="mt-4 text-[15px] font-bold text-[#0A1020]">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B7280] font-medium flex-1">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0050D8] transition-transform group-hover:translate-x-0.5">
        {linkLabel}
        <ArrowRight size={14} aria-hidden />
      </span>
    </Link>
  );
}

export default QuickAccessCard;
