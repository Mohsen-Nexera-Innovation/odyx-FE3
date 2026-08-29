import type { Metadata } from 'next';
import { parseDemoProductParam, REQUEST_DEMO_META } from '@/content/request-demo';
import InnerPageMotion from '@/components/InnerPageMotion';
import RequestDemoPage from '@/components/request-demo/RequestDemoPage';

export const metadata: Metadata = {
  title: REQUEST_DEMO_META.title,
  description: REQUEST_DEMO_META.description,
};

type PageProps = {
  searchParams: Promise<{ product?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialProducts = parseDemoProductParam(params.product);

  return (
    <>
      <RequestDemoPage initialProducts={initialProducts} />
      <InnerPageMotion />
    </>
  );
}
