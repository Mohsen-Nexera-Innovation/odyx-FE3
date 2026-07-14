import type { Metadata } from 'next';
import CheckoutPage from '@/components/pages/CheckoutPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Checkout | ODYX',
  description: 'Complete your ODYX Store order.',
};

export default function Page() {
  return (
    <>
      <CheckoutPage />
      <InnerPageMotion />
    </>
  );
}
