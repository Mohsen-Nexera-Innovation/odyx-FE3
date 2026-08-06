import type { SalesBenefit } from '@/content/contact-sales';
import { CONTACT_SALES_BENEFITS } from '@/content/contact-sales';
import { BenefitIconBadge } from './SalesIcons';

function BenefitItem({ item, isLast }: { item: SalesBenefit; isLast?: boolean }) {
  return (
    <li className="flex items-start gap-4">
      <BenefitIconBadge icon={item.icon} />
      <div className={`min-w-0 pt-0 ${isLast ? 'mb-0' : 'mb-6'}`}>
        <h3 className="text-[14px] font-bold text-[#0A1020] mb-1">{item.title}</h3>
        <p className="text-[13px] leading-relaxed text-[#6B7280] font-medium whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </li>
  );
}

export function BenefitsSidebar() {
  const { title, items } = CONTACT_SALES_BENEFITS;

  return (
    <div className="h-full rounded-[12px] bg-white p-4 lg:p-6 shadow-[0_0_12px_rgba(0,0,0,0.06)]">
      <aside
        className="rounded-[12px] bg-[#F8FAFC] p-6 mt-6"
        aria-labelledby="sales-benefits-title"
      >
        <h2
          id="sales-benefits-title"
          className="text-[16px] lg:text-[17px] font-bold text-[#0A1020] mb-6"
        >
          {title}
        </h2>
        <ul className="flex flex-col gap-8 cs-grid">
          {items.map((item, index) => (
            <BenefitItem key={item.id} item={item} isLast={index === items.length - 1} />
          ))}
        </ul>
      </aside>
    </div>
  );
}
