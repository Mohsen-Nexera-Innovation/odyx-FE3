import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopPage from '@/components/pages/ShopPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Store | ODYX',
  description: 'Buy ODYX P1-26, ODYX Cure, and ODYX-S1 from the ODYX Store.',
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <ShopPage />
      </Suspense>
      <InnerPageMotion />
    </>
  );
}
