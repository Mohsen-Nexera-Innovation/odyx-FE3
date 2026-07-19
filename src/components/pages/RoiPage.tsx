import Link from 'next/link';
import PageHero, { Arrow } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import InnerPageMotion from '@/components/InnerPageMotion';
import RoiCalculator from '@/components/roi/RoiCalculator';
import RoiPillars from '@/components/roi/RoiPillars';
import { ROI_COPY_BY_SCOPE } from '@/content/roi';

const COPY = ROI_COPY_BY_SCOPE.ecosystem;

export default function RoiPage() {
  return (
    <div className="roi-page">
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Learning', href: '/learning' },
          { label: 'ROI Calculator', href: '/roi' },
        ]}
        title={COPY.title}
        action={
          <Link className="btn" href="/products/3d-printers#roi">
            Printer-only ROI <Arrow />
          </Link>
        }
      />

      <section className="sec roi-section" id="roi">
        <div className="wrap">
          <SecHead
            eyebrow="ROI"
            h2={COPY.pitchHeadline}
          />
          <RoiPillars scope="ecosystem" />
          <RoiCalculator scope="ecosystem" />
        </div>
      </section>
      <InnerPageMotion />
    </div>
  );
}
