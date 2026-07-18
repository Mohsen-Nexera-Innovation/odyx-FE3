import type { Metadata } from 'next';
import { Suspense } from 'react';
import InboxWorkspace from '@/components/inbox/InboxWorkspace';

export const metadata: Metadata = {
  title: 'Design inbox | ODYX',
  description: 'Send STL scans to the ODYX design team and receive design files — all in one inbox.',
};

export default function InboxPage() {
  return (
    <Suspense fallback={null}>
      <InboxWorkspace />
    </Suspense>
  );
}
