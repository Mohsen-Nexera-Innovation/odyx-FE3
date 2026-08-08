import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  theme?: 'blue' | 'purple' | 'green' | 'orange' | 'indigo';
}

const THEMES = {
  blue: 'bg-[#F0F5FF] text-[#0050D8]',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-500',
  indigo: 'bg-indigo-50 text-indigo-600',
};

export function QuickAccessCard({ icon: Icon, title, description, linkLabel, href, theme = 'blue' }: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[12px] border border-gray-100/60 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:border-[#0050D8]/30 hover:shadow-[0_12px_40px_rgba(0,80,216,0.08)]"
    >
      <span className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${THEMES[theme]}`}>
        <Icon size={26} strokeWidth={2} aria-hidden />
      </span>
      <h3 className="mt-5 text-[17px] font-bold text-[#0A1020]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280] font-medium flex-1">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0050D8] transition-transform group-hover:translate-x-1">
        {linkLabel}
        <ArrowRight size={15} aria-hidden />
      </span>
    </Link>
  );
}

export default QuickAccessCard;
