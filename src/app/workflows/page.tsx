import type { Metadata } from 'next';
import WorkflowHubPage from '@/components/pages/WorkflowHubPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Guided Workflows | ODYX',
  description: 'Scan, design, print, cure, finish and deliver - the connected ODYX digital dentistry workflow.',
};

export default function Page() {
  return (
    <>
      <WorkflowHubPage />
      <InnerPageMotion />
    </>
  );
}
