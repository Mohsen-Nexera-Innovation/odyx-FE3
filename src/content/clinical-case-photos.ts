/**
 * Real clinical case photos served from `/img/clinical-cases/`.
 *
 * Batch A — existing aesthetic rehab set (veneers / crowns / try-ins).
 * Batch B — imported from Downloads/real cases (posterior restorative / endo /
 * amalgam replacement / onlay / crown sequences + radiographs).
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
      '_DSC0804_4.jpg',
      '_DSC0809_2.jpg',
      'Posterior restoration under rubber-dam isolation',
      'Seated posterior crown in occlusion',
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
      '_DSC0558.jpg',
      '_DSC0562_2.jpg',
      'Prepared abutment with ceramic restorations ready to bond',
      'Fiber reinforcement placed inside the preparation',
    ),
    pair(
      '_DSC0193_2.JPG',
      '_DSC0246.JPG',
      'Printed model in occlusion before prosthetic check',
      'Prosthetic try-in evaluated in occlusion',
    ),
  ],

  inlays: [
    pair(
      '_DSC0441_1.jpg',
      '_DSC0452_1.jpg',
      'Failing amalgam restoration under rubber dam',
      'Amalgam removed — cavity preparation for bonded restoration',
    ),
    pair(
      '_DSC0263_2.jpg',
      '_DSC0272_2.jpg',
      'Distal caries on posterior molar',
      'Matrix isolation during posterior composite preparation',
    ),
  ],
};

const RESTORATIVE_REAL_CASES: RealClinicalCase[] = [
  // Batch B — posterior restorative / endo from Downloads
  realCase(
    'molar-deep-caries-endo',
    'Endo',
    'Deep molar caries to canal fill',
    '_DSC0184_4.jpg',
    '_DSC0199_3.jpg',
    'Severely carious molar before treatment',
    'Root canal orifices obturated under rubber-dam isolation',
  ),
  realCase(
    'molar-access-obturation',
    'Endo',
    'Access cavity and obturation',
    '_DSC0185_4.jpg',
    '_DSC0198_3.jpg',
    'Carious molar before endodontic access',
    'Pulp chamber with gutta-percha canal fills',
  ),
  realCase(
    'distal-caries-matrix',
    'Composite',
    'Distal caries to matrix prep',
    '_DSC0263_2.jpg',
    '_DSC0272_2.jpg',
    'Posterior molar with distal caries',
    'Rubber-dam isolation with matrix band and wedge',
  ),
  realCase(
    'amalgam-removal-prep',
    'Inlay',
    'Amalgam removal and prep',
    '_DSC0441_1.jpg',
    '_DSC0452_1.jpg',
    'Failing occlusal amalgam under rubber dam',
    'Old amalgam removed — cavity prepared for bonded restoration',
  ),
  realCase(
    'posterior-composite-finish',
    'Composite',
    'Isolated posterior composite',
    '_DSC0802_3.jpg',
    '_DSC0804_4.jpg',
    'Posterior tooth under rubber-dam isolation',
    'Finished occlusal composite restoration',
  ),
  realCase(
    'posterior-crown-seat',
    'Crowns',
    'Posterior crown seating',
    '_DSC0804_4.jpg',
    '_DSC0809_2.jpg',
    'Restored posterior tooth before crown delivery',
    'Seated posterior crown in the arch',
  ),
  realCase(
    'buccal-restoration',
    'Composite',
    'Buccal composite restoration',
    '_DSC0667_1.jpg',
    '_DSC0681_4.jpg',
    'Isolated teeth during restorative build-up',
    'Finished buccal composite restoration',
  ),
  realCase(
    'radiograph-diagnostic',
    'Radiograph',
    'Periapical diagnostic pair',
    'IMG-20260121-WA0000.jpg',
    'IMG-20260121-WA0016.jpg',
    'Pre-treatment periapical radiograph',
    'Follow-up periapical radiograph',
  ),
  // Batch A — aesthetic set
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
    'onlay-fiber-reinforce',
    'Onlay',
    'Ceramic onlay and fiber core',
    '_DSC0558.jpg',
    '_DSC0562_2.jpg',
    'Prepared tooth with ceramic restorations ready to bond',
    'Fiber reinforcement seated inside the preparation',
  ),
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
  const preferred = [
    img('_DSC0809_2.jpg'),
    img('_DSC0681_4.jpg'),
    img('_DSC0255_1.JPG'),
    img('_DSC0245.JPG'),
    img('_DSC0199_3.jpg'),
  ];
  const ordered = [...preferred.filter((p) => afters.includes(p)), ...afters];
  return Array.from(new Set(ordered)).slice(0, 4);
}
