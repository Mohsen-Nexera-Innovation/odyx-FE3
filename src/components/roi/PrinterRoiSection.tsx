import SecHead from '@/components/SecHead';
import RoiCalculator from '@/components/roi/RoiCalculator';
import RoiPillars from '@/components/roi/RoiPillars';
import { ROI_COPY_BY_SCOPE } from '@/content/roi';

const COPY = ROI_COPY_BY_SCOPE.printer;

export default function PrinterRoiSection() {
  return (
    <section className="sec roi-section" id="roi">
      <div className="wrap">
        <SecHead
          eyebrow="ROI"
          h2={COPY.lead}
        />
        <RoiPillars scope="printer" />
        <RoiCalculator scope="printer" />
      </div>
    </section>
  );
}
