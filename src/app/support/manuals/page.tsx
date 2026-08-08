import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ManualsPage } from '@/components/support/ManualsPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Manuals | ODYX Support',
  description: 'Access all ODYX product manuals, quick start guides, installation and maintenance documents.',
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <ManualsPage />
      </Suspense>
      <InnerPageMotion />
    </>
  );
}
