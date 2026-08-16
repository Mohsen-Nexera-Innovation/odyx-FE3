import type { Metadata } from 'next';
import ClinicalIndicationPage from '@/components/pages/ClinicalIndicationPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { CLINICAL_INDICATION_META, CLINICAL_INDICATIONS } from '@/content/clinical-indications';

export const metadata: Metadata = {
  title: CLINICAL_INDICATION_META['same-day-crown'].title,
  description: CLINICAL_INDICATION_META['same-day-crown'].description,
};

/** Kept for stable URL; content served from shared ClinicalIndicationPage. */
export default function Page() {
  return (
    <>
      <ClinicalIndicationPage data={CLINICAL_INDICATIONS['same-day-crown']} />
      <InnerPageMotion />
    </>
  );
}
