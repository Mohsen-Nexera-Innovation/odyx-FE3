import type { Metadata } from 'next';
import CaseSubmissionPage from '@/components/products/design-services/CaseSubmissionPage';

export const metadata: Metadata = {
  title: 'Design Services | ODYX',
  description: 'Submit a new digital dentistry case to the ODYX clinical team.',
};

export default function Page() {
  return <CaseSubmissionPage />;
}
