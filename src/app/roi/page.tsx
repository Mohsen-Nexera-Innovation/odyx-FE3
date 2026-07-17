import type { Metadata } from 'next';
import RoiPage from '@/components/pages/RoiPage';

export const metadata: Metadata = {
  title: 'ODYX Ecosystem ROI Calculator',
  description:
    'Estimate cost savings and payback for the full ODYX digital dentistry stack — scanner, printer, and curing.',
};

export default function Page() {
  return <RoiPage />;
}
