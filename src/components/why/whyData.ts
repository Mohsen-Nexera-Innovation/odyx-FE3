export interface WhyReason {
  id: string;
  tab: string;
  rail: string;
  title: string;
  desc: string;
  outcome: string;
  count: string;
  suf: string;
  lbl: string;
  img: string;
  bg: string;
  alt: string;
}

export const WHY_SWAP_MS = 320;

export const WHY_REASONS: WhyReason[] = [
  {
    id: 'precision',
    tab: 'Precision',
    rail: 'Precision',
    title: 'Precision',
    desc: 'Accurate scans and prints that fit the first time — less chair time, fewer remakes.',
    outcome: 'Fits the first time — fewer remakes.',
    count: '99',
    suf: '%',
    lbl: 'first-fit accuracy',
    img: '/img/why/why-precision-cutout.png',
    bg: '/img/why/why-precision.png',
    alt: 'Precise digital dental scan and restoration workflow',
  },
  {
    id: 'integrated',
    tab: 'Integrated workflow',
    rail: 'Integrated workflow',
    title: 'Integrated workflow',
    desc: 'ODYX connects every step of your digital workflow. Our open, integrated system brings your scan-to-smile journey together—seamlessly.',
    outcome: 'One connected scan-to-smile system.',
    count: '6',
    suf: '',
    lbl: 'connected steps',
    img: '/img/why/why-integrated-cutout.png',
    bg: '/img/why/why-integrated.png',
    alt: 'Connected ODYX scanner, design software and 3D printer in a clinic',
  },
  {
    id: 'training',
    tab: 'Training',
    rail: 'Training',
    title: 'Training & support',
    desc: 'An academy and a team that grow with your practice, from first scan to advanced cases.',
    outcome: 'An academy that grows with your practice.',
    count: '24',
    suf: '/7',
    lbl: 'support access',
    img: '/img/why/why-training-cutout.png',
    bg: '/img/why/why-training.png',
    alt: 'ODYX training and clinical support',
  },
  {
    id: 'clinical',
    tab: 'Clinical confidence',
    rail: 'Clinical confidence',
    title: 'Clinical confidence',
    desc: 'Proven materials and validated curing for safe, durable, biocompatible results.',
    outcome: 'Validated materials for durable results.',
    count: '5',
    suf: '',
    lbl: 'clinical resin lines',
    img: '/img/why/why-clinical-cutout.png',
    bg: '/img/why/why-clinical.png',
    alt: 'Clinically validated ODYX materials and curing',
  },
];
