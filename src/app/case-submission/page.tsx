import type { Metadata } from 'next';
import CaseSubmissionPage from '@/components/case-submission/CaseSubmissionPage';

export const metadata: Metadata = {
  title: 'Submit a Case | ODYX',
  description: 'Submit a new digital dentistry case to the ODYX clinical team.',
};

export default function Page() {
  return <CaseSubmissionPage />;
}
