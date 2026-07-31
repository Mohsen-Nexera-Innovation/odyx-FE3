import ClinicalIndicationPage from '@/components/pages/ClinicalIndicationPage';
import { CLINICAL_INDICATIONS } from '@/content/clinical-indications';

/** @deprecated Prefer ClinicalIndicationPage + CLINICAL_INDICATIONS[slug] */
export default function SameDayCrownPage() {
  return <ClinicalIndicationPage data={CLINICAL_INDICATIONS['same-day-crown']} />;
}
