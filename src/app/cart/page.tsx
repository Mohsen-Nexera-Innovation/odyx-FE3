import type { Metadata } from 'next';
import CartPage from '@/components/pages/CartPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Cart | ODYX',
  description: 'Review items in your ODYX Store cart.',
};

export default function Page() {
  return (
    <>
      <CartPage />
      <InnerPageMotion />
    </>
  );
}
