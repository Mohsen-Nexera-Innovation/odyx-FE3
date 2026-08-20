import { QuoteForm } from './QuoteForm';
import { BenefitsSidebar } from './BenefitsSidebar';
import { SALES_GUTTER } from './salesChrome';

export function QuoteSection() {
  return (
    <section
      className={SALES_GUTTER}
      aria-label="Request a quote"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)] gap-6 lg:gap-8 items-start">
        <div className="rounded-[12px] bg-white p-6 sm:p-8 shadow-[0_0_12px_rgba(0,0,0,0.06)] h-full">
          <QuoteForm />
        </div>
        <div className="h-full">
          <BenefitsSidebar />
        </div>
      </div>
    </section>
  );
}
