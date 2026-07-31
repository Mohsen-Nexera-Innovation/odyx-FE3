/**
 * Real clinical case photos from `src/content/clinical cases/`
 * (served from `/img/clinical-cases/`).
 *
 * Drop classification (56 images, one full-mouth aesthetic rehab):
 * - Veneers — upper-arch smile makeover (majority)
 * - Same-day crown — lower anterior crowns + single-unit match
 * - Try-ins — printed prep model → fabricated units / prosthetic check
 * - No photos yet for inlays, surgical-guide, implant-model,
 *   aligners, retainers, or dentures
 */

import type { ClinicalBaSlide } from '@/content/clinical-indication-types';

const BASE = '/img/clinical-cases';

function img(file: string) {
  return `${BASE}/${file}`;
}

function pair(
  beforeFile: string,
  afterFile: string,
  beforeAlt: string,
  afterAlt: string,
): ClinicalBaSlide {
  return {
    before: { img: img(beforeFile), alt: beforeAlt },
    after: { img: img(afterFile), alt: afterAlt },
  };
}

/** A gallery card on Clinical Cases listing pages (real photos, not applications). */
export type RealClinicalCase = {
  id: string;
  /** Short clinical tag shown on the card */
  tag: string;
  title: string;
  before: { img: string; alt: string; focus?: 'smile' };
  after: { img: string; alt: string; focus?: 'smile' };
};

function realCase(
  id: string,
  tag: string,
  title: string,
  beforeFile: string,
  afterFile: string,
  beforeAlt: string,
  afterAlt: string,
  focus?: { before?: 'smile'; after?: 'smile' },
): RealClinicalCase {
  return {
    id,
    tag,
    title,
    before: { img: img(beforeFile), alt: beforeAlt, focus: focus?.before },
    after: { img: img(afterFile), alt: afterAlt, focus: focus?.after },
  };
}

/** Before/after slides keyed by clinical indication slug (detail pages). */
export const CLINICAL_CASE_BA: Record<string, ClinicalBaSlide[]> = {
  'same-day-crown': [
    pair(
      '_DSC0187_2.JPG',
      '_DSC0245.JPG',
      'Lower anterior teeth prepared for crowns',
      'Seated lower anterior crowns — final result',
    ),
    pair(
      '_DSC0187_2.JPG',
      '_DSC0244.JPG',
      'Lower crown preparations with cervical staining',
      'Finished lower anterior crown restorations',
    ),
    pair(
      '_DSC0248.JPG',
      '_DSC0250_2.JPG',
      'Discolored upper canine before single-unit crown',
      'Matched crown restorations after seating',
    ),
    pair(
      '_DSC0238_1.JPG',
      '_DSC0241.JPG',
      'Lower arch newly restored against natural upper teeth',
      'Retractor view of completed lower crown arch',
    ),
  ],

  veneers: [
    pair(
      '_DSC0173_1.JPG',
      '_DSC0262_2.JPG',
      'Pre-treatment smile — worn, discolored teeth',
      'Post-veneer smile — completed upper aesthetic restoration',
    ),
    pair(
      '_DSC0175_1.JPG',
      '_DSC0259_2.JPG',
      'Pre-treatment retractor view — decay and staining',
      'Upper veneers seated; lower arch unrestored for contrast',
    ),
    pair(
      '_DSC0108_1.JPG',
      '_DSC0255_1.JPG',
      'Close-up natural smile before treatment',
      'Natural smile after upper veneer delivery',
    ),
    pair(
      '_DSC0185_5.JPG',
      '_DSC0200_3.JPG',
      'Upper anterior preparations with retraction cord',
      'Veneers bonded under rubber-dam isolation',
    ),
    pair(
      '_DSC0186_2.JPG',
      '_DSC0202_3.JPG',
      'Prepared upper anteriors before bonding',
      'Anterior veneers seated under isolation',
    ),
    pair(
      '_DSC0112_1.JPG',
      '_DSC0253_1.JPG',
      'Pre-treatment smile with chipped, worn incisors',
      'Portrait after upper veneer restoration',
    ),
  ],

  'try-ins': [
    pair(
      '_DSC0192_2.JPG',
      '_DSC0197_4.JPG',
      '3D-printed prep model for restorative try-in',
      'Fabricated ceramic units ready for clinical try-in',
    ),
    pair(
      '_DSC0193_2.JPG',
      '_DSC0246.JPG',
      'Printed model in occlusion before prosthetic check',
      'Prosthetic try-in evaluated in occlusion',
    ),
  ],
};

const RESTORATIVE_REAL_CASES: RealClinicalCase[] = [
  realCase(
    'veneers-closeup',
    'Veneers',
    'Natural smile close-up',
    '_DSC0108_1.JPG',
    '_DSC0255_1.JPG',
    'Close-up natural smile before treatment',
    'Natural smile after upper veneer delivery',
    { before: 'smile', after: 'smile' },
  ),
  realCase(
    'veneers-smile',
    'Veneers',
    'Upper smile makeover',
    '_DSC0173_1.JPG',
    '_DSC0262_2.JPG',
    'Pre-treatment smile — worn, discolored teeth',
    'Post-veneer smile — completed upper aesthetic restoration',
  ),
  realCase(
    'veneers-retractor',
    'Veneers',
    'Retractor before & after',
    '_DSC0175_1.JPG',
    '_DSC0259_2.JPG',
    'Pre-treatment retractor view — decay and staining',
    'Upper veneers seated; lower arch unrestored for contrast',
  ),
  realCase(
    'veneers-bond',
    'Veneers',
    'Prep to bonding',
    '_DSC0185_5.JPG',
    '_DSC0200_3.JPG',
    'Upper anterior preparations with retraction cord',
    'Veneers bonded under rubber-dam isolation',
  ),
  realCase(
    'veneers-portrait',
    'Veneers',
    'Portrait result',
    '_DSC0112_1.JPG',
    '_DSC0253_1.JPG',
    'Pre-treatment smile with chipped, worn incisors',
    'Portrait after upper veneer restoration',
  ),
  realCase(
    'crown-lower',
    'Crowns',
    'Lower anterior crowns',
    '_DSC0187_2.JPG',
    '_DSC0245.JPG',
    'Lower anterior teeth prepared for crowns',
    'Seated lower anterior crowns — final result',
  ),
  realCase(
    'crown-lower-detail',
    'Crowns',
    'Lower crown detail',
    '_DSC0187_2.JPG',
    '_DSC0244.JPG',
    'Lower crown preparations with cervical staining',
    'Finished lower anterior crown restorations',
  ),
  realCase(
    'crown-match',
    'Crowns',
    'Single-unit shade match',
    '_DSC0248.JPG',
    '_DSC0250_2.JPG',
    'Discolored upper canine before single-unit crown',
    'Matched crown restorations after seating',
  ),
];

const PROSTHETIC_REAL_CASES: RealClinicalCase[] = [
  realCase(
    'tryin-units',
    'Try-in',
    'Model to fabricated units',
    '_DSC0192_2.JPG',
    '_DSC0197_4.JPG',
    '3D-printed prep model for restorative try-in',
    'Fabricated ceramic units ready for clinical try-in',
  ),
  realCase(
    'tryin-occlusion',
    'Try-in',
    'Occlusal prosthetic check',
    '_DSC0193_2.JPG',
    '_DSC0246.JPG',
    'Printed model in occlusion before prosthetic check',
    'Prosthetic try-in evaluated in occlusion',
  ),
];

/** Real cases keyed by Clinical Cases listing slug */
export const REAL_CASES_BY_LISTING: Record<string, RealClinicalCase[]> = {
  'restorative-cases': RESTORATIVE_REAL_CASES,
  'implant-cases': [],
  'ortho-cases': [],
  'prosthetic-cases': PROSTHETIC_REAL_CASES,
};

export function clinicalCaseBaSlides(slug: string): ClinicalBaSlide[] | undefined {
  return CLINICAL_CASE_BA[slug];
}

export function realCasesForListing(listingSlug: string): RealClinicalCase[] {
  return REAL_CASES_BY_LISTING[listingSlug] ?? [];
}

export function allRealClinicalCases(): { listingSlug: string; cases: RealClinicalCase[] }[] {
  return Object.entries(REAL_CASES_BY_LISTING)
    .filter(([, cases]) => cases.length > 0)
    .map(([listingSlug, cases]) => ({ listingSlug, cases }));
}

/** After-shot paths for hero collages (prefer results). */
export function heroCaseImages(listingSlug?: string): string[] {
  const pool = listingSlug
    ? realCasesForListing(listingSlug)
    : Object.values(REAL_CASES_BY_LISTING).flat();
  const afters = pool.map((c) => c.after.img);
  // Prefer smile/portrait results first when available
  const preferred = [
    img('_DSC0255_1.JPG'),
    img('_DSC0108_1.JPG'),
    img('_DSC0245.JPG'),
    img('_DSC0259_2.JPG'),
    img('_DSC0197_4.JPG'),
  ];
  const ordered = [...preferred.filter((p) => afters.includes(p)), ...afters];
  return Array.from(new Set(ordered)).slice(0, 4);
}
