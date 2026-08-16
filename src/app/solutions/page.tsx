import type { Metadata } from 'next';
import ClinicalApplicationsPage from '@/components/solutions/clinical-applications/ClinicalApplicationsPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { CLINICAL_APPS_META } from '@/content/clinical-applications';

export const metadata: Metadata = {
  title: 'Solutions | ODYX',
  description: CLINICAL_APPS_META.description,
};

export default function Page() {
  return (
    <>
      <ClinicalApplicationsPage />
      <InnerPageMotion />
    </>
  );
}
