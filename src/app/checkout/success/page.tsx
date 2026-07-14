import type { Metadata } from 'next';
import CheckoutSuccessPage from '@/components/pages/CheckoutSuccessPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Order confirmed | ODYX',
  description: 'Your ODYX Store order confirmation.',
};

export default function Page() {
  return (
    <>
      <CheckoutSuccessPage />
      <InnerPageMotion />
    </>
  );
}
