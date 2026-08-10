import type { Metadata } from 'next';
import { REQUEST_DEMO_META } from '@/content/request-demo';
import InnerPageMotion from '@/components/InnerPageMotion';
import RequestDemoPage from './components/RequestDemoPage';

export const metadata: Metadata = {
  title: REQUEST_DEMO_META.title,
  description: REQUEST_DEMO_META.description,
};

export default function Page() {
  return (
    <>
      <RequestDemoPage />
      <InnerPageMotion />
    </>
  );
}
