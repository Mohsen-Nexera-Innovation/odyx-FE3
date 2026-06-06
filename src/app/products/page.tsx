import type { Metadata } from 'next';
import ProductsOverviewPage from '@/components/pages/ProductsOverviewPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Products | ODYX',
  description: 'Intraoral scanners, design software, 3D printers, curing, finishing and clinical resins - one ecosystem.',
};

export default function Page() {
  return (
    <>
      <ProductsOverviewPage />
      <InnerPageMotion />
    </>
  );
}
