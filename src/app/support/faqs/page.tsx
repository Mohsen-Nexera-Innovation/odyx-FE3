import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FAQsPage } from '@/components/support/FAQsPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'FAQs | ODYX Support',
  description: 'Answers to the most common questions about ODYX scanners, printers, curing units and resins.',
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <FAQsPage />
      </Suspense>
      <InnerPageMotion />
    </>
  );
}
