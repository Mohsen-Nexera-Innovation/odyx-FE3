import type { Metadata } from 'next';
import SupportHubPage from '@/components/support/SupportHubPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Support | ODYX',
  description: 'Troubleshooting, manuals, software updates, warranty and live customer care.',
};

export default function Page() {
  return (
    <>
      <SupportHubPage />
      <InnerPageMotion />
    </>
  );
}
