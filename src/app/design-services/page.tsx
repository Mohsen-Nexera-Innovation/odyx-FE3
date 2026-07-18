import type { Metadata } from 'next';
import DesignServicesPage from '@/components/pages/DesignServicesPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Design Services | ODYX',
  description:
    'Buy ODYX design-as-a-service — single units, smile design, RPD, occlusal splints, and surgical guides.',
};

export default function Page() {
  return (
    <>
      <DesignServicesPage />
      <InnerPageMotion />
    </>
  );
}
