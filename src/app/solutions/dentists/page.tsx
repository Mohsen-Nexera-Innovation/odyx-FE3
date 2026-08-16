import type { Metadata } from 'next';
import SolutionPathPage from '@/components/pages/SolutionPathPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'For Dentists | ODYX Solutions',
  description: 'Same-day restorations, implant guides and chairside digital workflows for clinics.',
};

export default function Page() {
  return (
    <>
      <SolutionPathPage slug="dentists" />
      <InnerPageMotion />
    </>
  );
}
