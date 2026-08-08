import { SupportContainer } from './SupportContainer';
import { SupportBreadcrumb } from './SupportBreadcrumb';
import { SupportPageHeader } from './SupportPageHeader';
import { SupportCTA } from './SupportCTA';
import { WarrantyCoverageCard, WarrantyPeriodCard } from './WarrantyCard';
import { WarrantyClaimForm } from './WarrantyClaimForm';
import { WARRANTY_PERIODS } from './data';

export function WarrantyPage() {
  return (
    <div className="support-page bg-white pt-[80px] lg:pt-[85px] pb-4">
      <SupportContainer className="flex flex-col gap-4">


        <div className="flex flex-col gap-4">
          <SupportBreadcrumb crumbs={[{ label: 'Support', href: '/support' }, { label: 'Warranty' }]} />
          <SupportPageHeader title="Warranty" description="Learn about our warranty coverage and how to submit a claim." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WarrantyCoverageCard 
            title="What's Covered" 
            description={"Manufacturing defects, hardware\nfailures, and electronic components\nunder normal use."} 
            tone="covered" 
          />
          <WarrantyCoverageCard 
            title="What's Not Covered" 
            description={"Damage caused by misuse, accidents,\nunauthorized repairs or improper\nmaintenance."} 
            tone="not-covered" 
          />
          <WarrantyPeriodCard months={12} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 lg:gap-6 items-start">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white">
              <div className="flex py-6 flex-col justify-center bg-[#F9FAFB] border-b border-[#E5E7EB] px-5 sm:px-6">
                <h2 className="text-base font-bold text-[#0A1020]">Warranty Period by Product</h2>
              </div>
              <div className="overflow-x-auto p-5 sm:p-6 pt-4 sm:pt-5">
                <table className="w-full min-w-[320px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="py-4 pr-5 text-sm font-bold text-[#6B7280]">Product</th>
                      <th className="py-4 text-sm font-bold text-[#6B7280]">
                        Warranty Period
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WARRANTY_PERIODS.map((row, i) => (
                      <tr key={row.product} className={i !== WARRANTY_PERIODS.length - 1 ? 'border-b border-[#F1F2F4]' : ''}>
                        <td className="py-4 pr-5 text-sm font-bold text-[#0A1020]">{row.product}</td>
                        <td className="py-4 text-sm font-medium text-[#0A1020]">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:p-6">
              <h3 className="text-base font-bold text-[#0A1020]">Need help?</h3>
              <p className="mt-2 text-sm leading-relaxed font-medium text-[#6B7280]">
                Contact our support team for<br />assistance with your warranty claim.
              </p>
              <div className="mt-5">
                <a
                  href="/sales"
                  className="inline-flex h-[38px] items-center justify-center rounded-[8px] border border-[#0050D8]/20 bg-white px-6 text-sm font-bold !text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <WarrantyClaimForm />
          </div>
        </div>
      </SupportContainer>
    </div>
  );
}

export default WarrantyPage;
