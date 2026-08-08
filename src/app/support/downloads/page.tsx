import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DownloadsPage } from '@/components/support/DownloadsPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Downloads | ODYX Support',
  description: 'Download the latest ODYX software, firmware, drivers and release notes.',
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <DownloadsPage />
      </Suspense>
      <InnerPageMotion />
    </>
  );
}
