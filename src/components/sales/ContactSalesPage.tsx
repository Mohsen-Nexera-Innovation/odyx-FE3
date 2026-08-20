import { SalesHero } from './SalesHero';
import { DirectContactSection } from './DirectContactSection';
import { QuoteSection } from './QuoteSection';
import { SalesContactBar } from './SalesContactBar';
import './contact-sales.css';

export default function ContactSalesPage() {
  return (
    <div className="cs-page bg-white w-full min-h-screen flex flex-col gap-3 md:gap-4 pb-4">
      <SalesHero />
      <DirectContactSection />
      <QuoteSection />
      <SalesContactBar />
    </div>
  );
}
