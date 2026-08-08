import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function SupportBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={13} className="text-[#C9D1DC]" aria-hidden />}
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="text-[#6B7280] hover:text-[#0050D8] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-[#0A1020] font-semibold">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default SupportBreadcrumb;
