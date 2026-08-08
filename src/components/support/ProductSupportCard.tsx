import Link from 'next/link';
import type { ProductQuickLink, SupportProduct } from './data';

export function ProductSupportCard({ product, links }: { product: SupportProduct; links: ProductQuickLink[] }) {
  return (
    <div className="flex flex-col rounded-[12px] border border-[#E5E7EB] bg-white p-5">
      <div className="flex h-[110px] items-center justify-center rounded-[10px] bg-[#F7F9FB]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-[80px] w-auto object-contain" loading="lazy" />
      </div>
      <h3 className="mt-4 text-[14px] font-bold text-[#0A1020]">{product.name}</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13px] font-medium text-[#6B7280] transition-colors hover:text-[#0050D8]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSupportCard;
