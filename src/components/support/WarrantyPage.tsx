import { SupportContainer } from './SupportContainer';
import { SupportBreadcrumb } from './SupportBreadcrumb';
import { SupportPageHeader } from './SupportPageHeader';
import { SupportCTA } from './SupportCTA';
import { WarrantyCoverageCard, WarrantyPeriodCard } from './WarrantyCard';
import { WarrantyClaimForm } from './WarrantyClaimForm';
import { WARRANTY_COVERED, WARRANTY_NOT_COVERED, WARRANTY_PERIODS } from './data';

export function WarrantyPage() {
  return (
    <div className="min-h-dvh bg-white pt-[90px] pb-16 font-[var(--font-tajawal),Tajawal,sans-serif]">
      <SupportContainer className="flex flex-col gap-8">
        <SupportBreadcrumb
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Support', href: '/support' }, { label: 'Warranty' }]}
        />

        <SupportPageHeader title="Warranty" description="Learn about our warranty coverage and how to submit a claim." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WarrantyCoverageCard title="What's Covered" items={WARRANTY_COVERED} tone="covered" />
          <WarrantyCoverageCard title="What's Not Covered" items={WARRANTY_NOT_COVERED} tone="not-covered" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 items-start">
          <WarrantyPeriodCard months={12} />

          <div className="flex flex-col gap-2.5">
            <h2 className="text-[15px] font-bold text-[#0A1020]">Warranty Period by Product</h2>
            <div className="overflow-x-auto rounded-[12px] border border-[#E5E7EB]">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F7F9FB]">
                    <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wide text-[#6B7280]">Product</th>
                    <th className="px-4 py-3 text-[12px] font-bold uppercase tracking-wide text-[#6B7280]">
                      Warranty Period
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WARRANTY_PERIODS.map((row, i) => (
                    <tr key={row.product} className={i !== WARRANTY_PERIODS.length - 1 ? 'border-b border-[#F1F2F4]' : ''}>
                      <td className="px-4 py-3.5 text-[13px] font-bold text-[#0A1020]">{row.product}</td>
                      <td className="px-4 py-3.5 text-[13px] font-semibold text-[#374151]">{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <WarrantyClaimForm />

        <SupportCTA
          title="Need help?"
          description="Questions about coverage or your claim status? Our team can help."
          ctaLabel="Contact Support"
          ctaHref="/sales"
        />
      </SupportContainer>
    </div>
  );
}

export default WarrantyPage;
