import type { Metadata } from 'next';
import InboxWorkspace from '@/components/inbox/InboxWorkspace';

export const metadata: Metadata = {
  title: 'Design inbox | ODYX',
  description: 'Send STL scans to the ODYX design team and receive design files — all in one inbox.',
};

export default function InboxPage() {
  return <InboxWorkspace />;
}
