import type { Metadata } from 'next';
import SolutionPathPage from '@/components/pages/SolutionPathPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'For Dental Labs | ODYX Solutions',
  description: 'Production-ready 3D print workflows, materials and finishing for dental laboratories.',
};

export default function Page() {
  return (
    <>
      <SolutionPathPage slug="labs" />
      <InnerPageMotion />
    </>
  );
}
