/**
 * Model Resin — detail page content.
 * Matched to client mock (model-resign / user reference).
 */

import type { ResinDetailContent } from '@/components/pages/ResinDetailPage';
import { MODEL_RESIN_FEATURE_ICONS } from '@/components/model-resin/FeatureIcons';
import {
  RESIN_DETAIL_CASES_CTA,
  RESIN_DETAIL_COMPATIBLE,
} from '@/content/resin-detail-shared';

export const MODEL_RESIN_SLUG = 'model-resin';

export const MODEL_RESIN_META = {
  title: 'Model Resin | ODYX',
  description:
    'ODYX Model Resin — high accuracy and exceptional detail for diagnostic, working, prosthetic, and thermoforming models.',
};

export const MODEL_RESIN_CONTENT: ResinDetailContent = {
  featuresAriaLabel: 'Model Resin features',
  appColumns: 6,
  hero: {
    kicker: 'PREMIUM DENTAL RESIN',
    titleLines: ['Model Resin'],
    tagline: 'High Accuracy. Exceptional Detail.',
    body: 'Designed for diagnostic, working, prosthetic, and thermoforming models with outstanding dimensional stability.',
    img: '/images/hero-model-resin.png',
    imgAlt: 'ODYX Model Resin bottle with a 3D-printed dental arch model',
    imgWidth: 2320,
    imgHeight: 1120,
    primaryCta: { label: 'Request a Demo', href: '/support' },
    secondaryCta: {
      label: 'Download Datasheet',
      href: 'mailto:info@odyx.dental?subject=Document%20request%3A%20Model%20Resin',
    },
  },
  applications: [
    {
      id: 'diagnostic',
      label: 'Diagnostic Models',
      img: '/images/app-model-diagnostic.png',
      imgAlt: '3D-printed diagnostic model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'working',
      label: 'Working Models',
      img: '/images/app-model-working.png',
      imgAlt: '3D-printed working model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'crown-bridge',
      label: 'Crown & Bridge Models',
      img: '/images/app-model-crown-bridge.png',
      imgAlt: '3D-printed crown and bridge model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'implant',
      label: 'Implant Models',
      img: '/images/app-model-implant.png',
      imgAlt: '3D-printed implant model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'thermoforming',
      label: 'Thermoforming Models',
      img: '/images/app-model-thermoforming.png',
      imgAlt: '3D-printed thermoforming model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'clear-aligner',
      label: 'Clear Aligner Models',
      img: '/images/app-model-clear-aligner.png',
      imgAlt: '3D-printed clear aligner model',
      href: '/solutions/clinical-applications',
    },
  ],
  features: [
    { id: 'accuracy', label: 'High Dimensional Accuracy' },
    { id: 'surface', label: 'Smooth Matte Surface' },
    { id: 'scan', label: 'Easy Scanning' },
    { id: 'detail', label: 'Excellent Detail Reproduction' },
    { id: 'shrinkage', label: 'Low Shrinkage' },
    { id: 'fast', label: 'Fast Printing' },
  ],
  featureIcons: MODEL_RESIN_FEATURE_ICONS,
  specs: [
    { property: 'Hardness', value: '85–90 Shore D' },
    { property: 'Flexural Strength', value: '80–95 MPa' },
    { property: 'Tensile Strength', value: '40–50 MPa' },
    { property: 'Heat Deflection Temperature', value: '75–85 °C' },
    { property: 'Elongation at Break', value: '10–15 %' },
    { property: 'Applicable Light Source', value: '385–405 nm' },
  ],
  compatible: [...RESIN_DETAIL_COMPATIBLE],
  cases: [
    {
      id: 'case-1',
      img: '/images/case-model-1.jpg',
      imgAlt: 'Clinical case — printed dental model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-2',
      img: '/images/case-model-2.jpg',
      imgAlt: 'Clinical case — upper arch model',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-3',
      img: '/images/case-model-3.jpg',
      imgAlt: 'Clinical case — model with restoration',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-4',
      img: '/images/case-model-4.jpg',
      imgAlt: 'Clinical case — clear guide on model',
      href: '/solutions/clinical-applications',
    },
  ],
  casesCta: RESIN_DETAIL_CASES_CTA,
};
