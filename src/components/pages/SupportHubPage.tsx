'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Book, Download, Headphones, HelpCircle, ShieldCheck } from 'lucide-react';
import { SupportContainer } from '@/components/support/SupportContainer';
import { SupportBreadcrumb } from '@/components/support/SupportBreadcrumb';
import { SupportSearchBar } from '@/components/support/SupportSearchBar';
import { QuickAccessCard } from '@/components/support/QuickAccessCard';
import { ProductSupportCard } from '@/components/support/ProductSupportCard';
import { StatusCard } from '@/components/support/StatusCard';
import { PRODUCT_QUICK_LINKS, STATUS_CARDS, SUPPORT_PRODUCTS } from '@/components/support/data';

const QUICK_ACCESS = [
  {
    icon: Book,
    title: 'Manuals',
    description: 'Step-by-step guides and product manuals',
    linkLabel: 'View Manuals',
    href: '/support/manuals',
    theme: 'blue' as const,
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Software, firmware and other resources',
    linkLabel: 'View Downloads',
    href: '/support/downloads',
    theme: 'purple' as const,
  },
  {
    icon: HelpCircle,
    title: 'FAQs',
    description: 'Find answers to the most common questions',
    linkLabel: 'Browse FAQs',
    href: '/support/faqs',
    theme: 'green' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Warranty',
    description: 'Check coverage and submit a claim',
    linkLabel: 'Warranty Details',
    href: '/support/warranty',
    theme: 'orange' as const,
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Contact our technical support team',
    linkLabel: 'Contact Support',
    href: '/sales',
    theme: 'indigo' as const,
  },
];

export default function SupportHubPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const search = () => {
    router.push(query ? `/support/manuals?q=${encodeURIComponent(query)}` : '/support/manuals');
  };

  return (
    <div className="min-h-dvh bg-white pb-4">
      <div className="w-full bg-[url('/img/hv2-section-bg.jpg')] bg-no-repeat bg-[center_top] bg-cover pt-[100px] lg:pt-[140px] pb-20 lg:pb-28">
        <SupportContainer className="flex flex-col items-center gap-6">
          <SupportPageHero />
          <SupportSearchBar
            value={query}
            onChange={setQuery}
            onSubmit={search}
            size="lg"
            placeholder="Search manuals, FAQs, downloads, or support articles..."
            className="max-w-[640px] w-full"
          />
        </SupportContainer>
      </div>

      <SupportContainer className="flex flex-col gap-3 md:gap-4">
        <section aria-labelledby="quick-access-heading" className="flex flex-col gap-0 pt-5">
          <div className="flex items-center justify-between">
            <h2 id="quick-access-heading" className="text-2xl font-bold text-[#0A1020]">
              Quick Access
            </h2>
            <Link
              href="/support/manuals"
              className="inline-flex items-center gap-1 text-sm font-bold !text-[#0050D8] hover:underline"
            >
              View all
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {QUICK_ACCESS.map((item) => (
              <QuickAccessCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="support-by-product-heading" className="flex flex-col gap-0">
          <div className="flex items-center justify-between">
            <h2 id="support-by-product-heading" className="text-2xl font-bold text-[#0A1020]">
              Support by Product
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-bold !text-[#0050D8] hover:underline"
            >
              View all products
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUPPORT_PRODUCTS.map((product) => (
              <ProductSupportCard key={product.id} product={product} links={PRODUCT_QUICK_LINKS[product.id]} />
            ))}
          </div>
        </section>

        <section aria-label="Service status" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[12px] border border-gray-100/60 shadow-[0_4px_40px_rgba(0,0,0,0.02)] divide-y sm:divide-y-0 sm:divide-x divide-gray-100/60 overflow-hidden bg-white">
          {STATUS_CARDS.map((status) => (
            <StatusCard key={status.id} status={status} />
          ))}
        </section>
      </SupportContainer>
    </div>
  );
}

function SupportPageHero() {
  return (
    <div className="text-center max-w-[640px]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1020] leading-[1.15]">
        How can we help you?
      </h1>
      <p className="mt-3 text-base sm:text-lg text-[#6B7280] font-medium leading-relaxed">
        Search our help center for answers, FAQs, downloads and more.
      </p>
    </div>
  );
}
