import type { Metadata } from 'next';
import { WarrantyPage } from '@/components/support/WarrantyPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Warranty | ODYX Support',
  description: 'Warranty coverage details, warranty periods by product, and how to submit a claim.',
};

export default function Page() {
  return (
    <>
      <WarrantyPage />
      <InnerPageMotion />
    </>
  );
}
