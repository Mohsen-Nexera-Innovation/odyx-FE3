import Link from 'next/link';
import type { ProductQuickLink, SupportProduct } from '@/content/support';
import { FlaskConical } from 'lucide-react';

export function ProductSupportCard({ product, links }: { product: SupportProduct; links: ProductQuickLink[] }) {
  return (
    <div className="flex flex-row gap-5 rounded-[12px] border border-gray-100/60 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:border-[#0050D8]/30 hover:shadow-[0_12px_40px_rgba(0,80,216,0.08)]">
      <div className="flex w-[80px] shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="max-h-[110px] w-auto object-contain mix-blend-multiply" loading="lazy" />
      </div>
      <div className="flex flex-col flex-1 min-w-0 justify-center">
        <h3 className="text-[15px] font-bold leading-tight text-[#0A1020] mb-4">{product.name}</h3>
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group flex items-center gap-2.5 text-[13px] font-semibold !text-[#6B7280] transition-colors hover:text-[#0050D8]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#F0F5FF] text-[#0050D8]">
                  <FlaskConical size={12} strokeWidth={2.5} aria-hidden />
                </span>
                <span className="whitespace-normal leading-tight">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductSupportCard;
