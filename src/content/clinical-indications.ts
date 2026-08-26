/**
 * Clinical indication detail content — one entry per hub subtype.
 * Chrome is shared (ClinicalIndicationPage); only copy/images differ.
 */
import {
  ECOSYSTEM_PRODUCTS,
  SHARED_TL,
  tlIcons,
  type ClinicalIndicationContent,
  type ClinicalIndicationMeta,
} from '@/content/clinical-indication-types';

const { scanner, cad, printer, cure } = ECOSYSTEM_PRODUCTS;

/** Current resin packshots (720×1400 transparent PNGs) — not the legacy square JPGs. */
const RESIN_IMG = {
  ceramic: '/img/resins/card-ceramic.png',
  surgical: '/img/resins/card-surgical.png',
  model: '/img/resins/card-model.png',
  temporary: '/img/resins/card-temporary.png',
} as const;

function resin(
  name: string,
  sub: string,
  img: string,
  href = '/products/resins',
): ClinicalIndicationContent['products'][number] {
  return { id: 'resin', name, sub, img, href, layout: 'stack' };
}

function products(
  resinCard: ClinicalIndicationContent['products'][number],
): ClinicalIndicationContent['products'] {
  return [scanner, cad, resinCard, printer, cure];
}

function defaultWhy(items: ClinicalIndicationContent['why']['items']): ClinicalIndicationContent['why'] {
  return { title: 'Why ODYX?', items };
}

function defaultParams(resinName: string): ClinicalIndicationContent['params'] {
  return {
    title: 'Printing Parameters (P1-26)',
    rows: [
      { label: 'Layer Thickness', value: '50 μm' },
      { label: 'Exposure Time', value: '2.5 – 3.0 s' },
      { label: 'Bottom Exposure', value: '25 – 30 s' },
      { label: 'Bottom Layers', value: '5' },
      { label: 'Build Plate Temp.', value: '30 – 35 °C' },
      { label: 'Resin', value: resinName },
    ],
  };
}

function tl(
  slug: string,
  steps: Omit<ClinicalIndicationContent['timeline']['steps'][number], 'icon' | 'n'>[],
  total: string,
): ClinicalIndicationContent['timeline'] {
  const icons = tlIcons(slug);
  const keys = ['scan', 'design', 'print', 'cure', 'finish'] as const;
  return {
    title: 'Workflow Timeline',
    total,
    steps: steps.map((s, i) => ({
      n: i + 1,
      ...s,
      icon: icons[keys[i]],
    })),
  };
}

/* ---------- Same-Day Crown (migrated; keeps clinical-sdc assets) ---------- */

const sameDayCrown: ClinicalIndicationContent = {
  slug: 'same-day-crown',
  category: 'restorative',
  hero: {
    badge: 'Restorative',
    title: 'Same-Day Crown',
    subtitle: 'From scan to cementation in one visit.',
    body: 'Deliver strong, esthetic crowns in a single appointment with the ODYX digital workflow.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Same-Day%20Crown%20Workflow%20PDF',
    },
    img: '/img/clinical-sdc/hero-model-cutout.png',
    imgAlt: 'Dental model with crowns being seated',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Ceramic Crown Resin', 'High strength. Natural esthetics.', RESIN_IMG.ceramic, '/products/ceramic-crown-resin')),
  timeline: {
    title: 'Workflow Timeline',
    total: 'Total Time: ~30–45 min',
    steps: [
      { n: 1, title: 'Scan', body: 'Full arch or quadrant scan with ODYX S1.', time: '~30 sec', icon: SHARED_TL.scan },
      { n: 2, title: 'Design', body: 'Design the crown with your preferred CAD software.', time: '~3 min', icon: '/img/clinical-sdc/tl/tl-design.png' },
      { n: 3, title: 'Print', body: 'Print the crown with ODYX P1-26 using Ceramic Crown Resin.', time: '~18 min', icon: SHARED_TL.print },
      { n: 4, title: 'Cure', body: 'Cure with ODYX Cure for optimal strength and esthetics.', time: '~5 min', icon: SHARED_TL.cure },
      { n: 5, title: 'Finish & Cement', body: 'Simple finishing and polishing. Ready to cement.', time: '~5 min', icon: '/img/clinical-sdc/tl/tl-finish.png' },
    ],
  },
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/printers/p126/case-before.png', alt: 'Prepared tooth before restoration' },
        after: { img: '/img/printers/p126/case-final.png', alt: 'Seated same-day crown' },
      },
      {
        before: { img: '/img/printers/p126/case-printed.png', alt: 'Printed crown before finishing' },
        after: { img: '/img/printers/p126/case-final.png', alt: 'Finished restoration' },
      },
      {
        before: { img: '/img/hv2-cases/restorative.webp', alt: 'Seven-unit ceramic bridge restoration' },
        after: { img: '/img/printers/p126/case-crown-strip.png', alt: 'Completed crown case' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'One-Visit Dentistry', body: 'Increase patient satisfaction and practice efficiency.' },
    { id: 'strength', title: 'High Strength & Esthetics', body: 'Ceramic-like results with long-lasting durability.' },
    { id: 'connected', title: 'Seamless Workflow', body: 'All ODYX products work together perfectly.' },
    { id: 'roi', title: 'Cost-Effective', body: 'In-house production reduces costs and turnaround time.' },
  ]),
  params: defaultParams('Ceramic Crown Resin'),
  tips: {
    title: 'Clinical Tips',
    items: [
      'Ensure proper isolation and shade selection.',
      'Minimal adjustments needed after try-in.',
      'Use fine diamonds and polishing kit for best results.',
      'Follow recommended curing time for maximum properties.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Single molar crown. Completed in one visit.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/hv2-cases/restorative.webp',
    thumbAlt: 'Seven-unit ceramic bridge clinical case',
  },
};

/* ---------- Restorative ---------- */

const veneers: ClinicalIndicationContent = {
  slug: 'veneers',
  category: 'restorative',
  hero: {
    badge: 'Restorative',
    title: 'Veneers',
    subtitle: 'Esthetic veneers in a single visit.',
    body: 'Print thin, highly esthetic veneers chairside with the ODYX digital workflow — precise fit, natural translucency.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Veneers%20Workflow%20PDF',
    },
    img: '/img/clinical/veneers/hero-cutout.png',
    imgAlt: 'Ceramic veneers held over a dental model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Ceramic Crown Resin', 'Thin. Esthetic. Strong.', RESIN_IMG.ceramic, '/products/ceramic-crown-resin')),
  timeline: tl(
    'veneers',
    [
      { title: 'Scan', body: 'Capture prep and antagonist with ODYX S1.', time: '~45 sec' },
      { title: 'Design', body: 'Design veneer morphology and emergence in CAD.', time: '~5 min' },
      { title: 'Print', body: 'Print veneers on P1-26 with Ceramic Crown Resin.', time: '~15 min' },
      { title: 'Cure', body: 'Post-cure for strength and optical properties.', time: '~5 min' },
      { title: 'Finish & Bond', body: 'Polish and bond with conventional protocols.', time: '~8 min' },
    ],
    'Total Time: ~35–50 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/printers/p126/case-before.png', alt: 'Prepared teeth before veneers' },
        after: { img: '/img/clinical/veneers/ba-after.png', alt: 'Seated ceramic veneers' },
      },
      {
        before: { img: '/img/hv2-cases/restorative.webp', alt: 'Seven-unit ceramic bridge restoration' },
        after: { img: '/img/printers/p126/case-final.png', alt: 'Finished veneer case' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Same-Day Esthetics', body: 'Deliver veneers without lab wait times.' },
    { id: 'strength', title: 'Natural Translucency', body: 'Ceramic-filled resin for lifelike shade match.' },
    { id: 'connected', title: 'Open Design', body: 'Works with your preferred CAD tools.' },
    { id: 'roi', title: 'Chairside Control', body: 'Keep high-value esthetic cases in-house.' },
  ]),
  params: defaultParams('Ceramic Crown Resin'),
  tips: {
    title: 'Clinical Tips',
    items: [
      'Verify shade under multiple light sources before bonding.',
      'Keep veneer thickness within material indications.',
      'Use a calibrated try-in paste for shade confirmation.',
      'Polish margins carefully to preserve enamel seal.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Four anterior veneers. Designed and delivered same day.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/veneers/case-thumb.jpg',
    thumbAlt: 'Veneers clinical case',
  },
};

const inlays: ClinicalIndicationContent = {
  slug: 'inlays',
  category: 'restorative',
  hero: {
    badge: 'Restorative',
    title: 'Inlays & Onlays',
    subtitle: 'Precise partial restorations, chairside.',
    body: 'Restore cusps and proximal anatomy with accurately printed inlays and onlays — conservative prep, excellent margins.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Inlays%20Onlays%20Workflow%20PDF',
    },
    img: '/img/clinical/inlays/hero-cutout.png',
    imgAlt: 'Printed inlay seated on a molar model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Ceramic Crown Resin', 'Precise. Durable. Esthetic.', RESIN_IMG.ceramic, '/products/ceramic-crown-resin')),
  timeline: tl(
    'inlays',
    [
      { title: 'Scan', body: 'Quadrant scan with clear prep margins.', time: '~30 sec' },
      { title: 'Design', body: 'Design inlay/onlay contacts and occlusion.', time: '~4 min' },
      { title: 'Print', body: 'Print on P1-26 at recommended layer height.', time: '~16 min' },
      { title: 'Cure', body: 'Fully cure before try-in and cementation.', time: '~5 min' },
      { title: 'Finish & Cement', body: 'Adjust contacts lightly, then cement.', time: '~6 min' },
    ],
    'Total Time: ~30–45 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/printers/p126/case-before.png', alt: 'Prepared cavity before inlay' },
        after: { img: '/img/clinical/inlays/ba-after.png', alt: 'Seated inlay restoration' },
      },
      {
        before: { img: '/img/printers/p126/case-printed.png', alt: 'Printed inlay before seating' },
        after: { img: '/img/printers/p126/case-final.png', alt: 'Finished onlay case' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Conservative Restorations', body: 'Preserve tooth structure with precise fits.' },
    { id: 'strength', title: 'Reliable Margins', body: 'Accurate prints support long-term seal.' },
    { id: 'connected', title: 'Digital Continuity', body: 'Scan → design → print without remakes.' },
    { id: 'roi', title: 'Fewer Remakes', body: 'In-house control reduces lab remake costs.' },
  ]),
  params: defaultParams('Ceramic Crown Resin'),
  tips: {
    title: 'Clinical Tips',
    items: [
      'Capture sharp prep margins with powder-free scanning.',
      'Check proximal contacts on a solid model before cementation.',
      'Avoid over-thinning occlusal tables beyond material limits.',
      'Use dual-cure resin cement for deep preparations.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Molar onlay. Printed and cemented in one appointment.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/inlays/case-thumb.jpg',
    thumbAlt: 'Inlay onlay clinical case',
  },
};

/* ---------- Implant ---------- */

const surgicalGuide: ClinicalIndicationContent = {
  slug: 'surgical-guide',
  category: 'implant',
  hero: {
    badge: 'Implant',
    title: 'Surgical Guide',
    subtitle: 'Accurate implant placement, digitally planned.',
    body: 'Print rigid, precise surgical guides from CBCT-driven plans — transfer the digital plan to the chair with confidence.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Surgical%20Guide%20Workflow%20PDF',
    },
    img: '/img/clinical/surgical-guide/hero-cutout.png',
    imgAlt: 'Clear implant surgical guide with metal sleeve',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Surgical Guide Resin', 'Rigid. Precise. Autoclavable class.', RESIN_IMG.surgical, '/products/surgical-guide-resin-pro')),
  timeline: tl(
    'surgical-guide',
    [
      { title: 'Scan & CBCT', body: 'Merge IOS and CBCT for implant planning.', time: '~2 min' },
      { title: 'Design', body: 'Plan implants and design the guide sleeves.', time: '~10 min' },
      { title: 'Print', body: 'Print guide on P1-26 with Surgical Guide Resin.', time: '~25 min' },
      { title: 'Cure', body: 'Wash and fully cure for clinical rigidity.', time: '~8 min' },
      { title: 'Verify', body: 'Check fit on model, then sterilize per protocol.', time: '~5 min' },
    ],
    'Total Time: ~45–60 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/hv2-cases/implant.webp', alt: 'Four-unit ceramic posterior bridge' },
        after: { img: '/img/clinical/surgical-guide/ba-after.png', alt: 'Guide seated on model' },
      },
      {
        before: { img: '/img/printers/p126/app-guide.png', alt: 'Clear surgical guide with metal and colored sleeves' },
        after: { img: '/img/clinical-hub/foot-implant.png', alt: 'Guide on implant model' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Predictable Placement', body: 'Transfer digital plans to surgery accurately.' },
    { id: 'strength', title: 'Clinical Rigidity', body: 'Guide resin built for drilling stability.' },
    { id: 'connected', title: 'Open Planning', body: 'Compatible with leading implant planning tools.' },
    { id: 'roi', title: 'In-House Guides', body: 'Cut outsourcing time and cost for guided surgery.' },
  ]),
  params: {
    title: 'Printing Parameters (P1-26)',
    rows: [
      { label: 'Layer Thickness', value: '50 – 100 μm' },
      { label: 'Exposure Time', value: '2.0 – 2.8 s' },
      { label: 'Bottom Exposure', value: '25 – 35 s' },
      { label: 'Bottom Layers', value: '5 – 6' },
      { label: 'Build Plate Temp.', value: '30 – 35 °C' },
      { label: 'Resin', value: 'Surgical Guide Resin' },
    ],
  },
  tips: {
    title: 'Clinical Tips',
    items: [
      'Validate guide fit on the printed model before surgery.',
      'Confirm sleeve diameter against the surgical kit.',
      'Follow wash/cure protocols for biocompatible resins.',
      'Inspect for supports residue near sleeve openings.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Fully guided single implant. Guide printed in-house same day.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/surgical-guide/case-thumb.jpg',
    thumbAlt: 'Clear printed implant surgical guide',
  },
};

const implantModel: ClinicalIndicationContent = {
  slug: 'implant-model',
  category: 'implant',
  hero: {
    badge: 'Implant',
    title: 'Implant Model',
    subtitle: 'Detailed planning models for implant cases.',
    body: 'Print solid, accurate models with soft-tissue and analog options — ideal for prosthetic planning and patient communication.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Implant%20Model%20Workflow%20PDF',
    },
    img: '/img/clinical/implant-model/hero-cutout.png',
    imgAlt: 'Detailed 3D-printed implant planning model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Model Resin', 'Sharp detail. Stable geometry.', RESIN_IMG.model, '/products/model-resin')),
  timeline: tl(
    'implant-model',
    [
      { title: 'Scan', body: 'Capture arch and soft tissue with ODYX S1.', time: '~1 min' },
      { title: 'Design', body: 'Prepare model bases and analog sockets in CAD.', time: '~6 min' },
      { title: 'Print', body: 'Print models on P1-26 with Model Resin.', time: '~35 min' },
      { title: 'Cure', body: 'Wash and cure for dimensional stability.', time: '~8 min' },
      { title: 'Assemble', body: 'Seat analogs and verify soft-tissue fit.', time: '~5 min' },
    ],
    'Total Time: ~50–70 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/hv2-cases/implant.webp', alt: 'Four-unit ceramic posterior bridge' },
        after: { img: '/img/clinical/implant-model/ba-after.png', alt: 'Tan 3D-printed lower dental arch model' },
      },
      {
        before: { img: '/img/printers/p126/app-models.png', alt: 'Raw printed models' },
        after: { img: '/img/clinical-hub/foot-implant.png', alt: 'Finished planning model' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Clear Communication', body: 'Show patients and surgeons the plan in hand.' },
    { id: 'strength', title: 'Stable Geometry', body: 'Model resin holds contacts and soft tissue.' },
    { id: 'connected', title: 'Prosthetic Ready', body: 'Analog-ready models for restoration design.' },
    { id: 'roi', title: 'Faster Turnaround', body: 'Print overnight without lab shipping delays.' },
  ]),
  params: {
    title: 'Printing Parameters (P1-26)',
    rows: [
      { label: 'Layer Thickness', value: '50 μm' },
      { label: 'Exposure Time', value: '1.8 – 2.5 s' },
      { label: 'Bottom Exposure', value: '20 – 28 s' },
      { label: 'Bottom Layers', value: '4 – 5' },
      { label: 'Build Plate Temp.', value: '28 – 32 °C' },
      { label: 'Resin', value: 'Model Resin' },
    ],
  },
  tips: {
    title: 'Clinical Tips',
    items: [
      'Orient models to protect critical soft-tissue areas.',
      'Verify analog torque seating before wax-up or CAD.',
      'Label arches clearly for multi-unit cases.',
      'Store cured models away from direct light.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Full-arch implant model with soft tissue for prosthetic try-in.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/implant-model/case-thumb.jpg',
    thumbAlt: 'Four-unit ceramic posterior bridge clinical case',
  },
};

/* ---------- Orthodontics ---------- */

const aligners: ClinicalIndicationContent = {
  slug: 'aligners',
  category: 'orthodontics',
  hero: {
    badge: 'Orthodontics',
    title: 'Aligners',
    subtitle: 'Clear aligner workflows, end to end.',
    body: 'Print precise thermoforming models for clear aligner series — consistent staging, efficient batch production.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Aligners%20Workflow%20PDF',
    },
    img: '/img/clinical/aligners/hero-cutout.png',
    imgAlt: 'Clear aligner on a printed dental model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Model Resin', 'Batch-ready. Sharp cusps.', RESIN_IMG.model, '/products/model-resin')),
  timeline: tl(
    'aligners',
    [
      { title: 'Scan', body: 'Full-arch scan with ODYX S1 for staging.', time: '~1 min' },
      { title: 'Setup', body: 'Plan movements in your aligner software.', time: '~15 min' },
      { title: 'Print', body: 'Batch-print staging models on P1-26.', time: '~40 min' },
      { title: 'Cure', body: 'Wash and cure models before thermoforming.', time: '~10 min' },
      { title: 'Thermoform', body: 'Form, trim, and polish aligners.', time: '~20 min' },
    ],
    'Total Time: per series batch',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/clinical/aligners/ba-before.png', alt: 'Crowded teeth before clear aligner treatment' },
        after: { img: '/img/clinical/aligners/ba-after.png', alt: 'Aligned smile after clear aligner treatment' },
      },
      {
        before: { img: '/img/clinical/aligners/ba-before-2.png', alt: 'Misaligned teeth before clear aligner treatment' },
        after: { img: '/img/clinical/aligners/ba-after-2.png', alt: 'Straight teeth with clear aligners seated' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Faster Series', body: 'Print models in-house as staging advances.' },
    { id: 'strength', title: 'Cusp Fidelity', body: 'Sharp models improve thermoform fit.' },
    { id: 'connected', title: 'Open Software', body: 'Export STL stages from your aligner suite.' },
    { id: 'roi', title: 'Lower Cost/Unit', body: 'Batch printing reduces per-aligner overhead.' },
  ]),
  params: {
    title: 'Printing Parameters (P1-26)',
    rows: [
      { label: 'Layer Thickness', value: '50 – 100 μm' },
      { label: 'Exposure Time', value: '1.8 – 2.4 s' },
      { label: 'Bottom Exposure', value: '20 – 28 s' },
      { label: 'Bottom Layers', value: '4 – 5' },
      { label: 'Build Plate Temp.', value: '28 – 32 °C' },
      { label: 'Resin', value: 'Model Resin' },
    ],
  },
  tips: {
    title: 'Clinical Tips',
    items: [
      'Nest models efficiently to maximize build plate use.',
      'Fully dry models before thermoforming sheets.',
      'Inspect attachments on each staging model.',
      'Label stages clearly to avoid sequence errors.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: '20-stage aligner series. Models printed in two overnight batches.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/aligners/case-thumb.jpg',
    thumbAlt: 'Clear aligner seated on upper front teeth',
  },
};

const retainers: ClinicalIndicationContent = {
  slug: 'retainers',
  category: 'orthodontics',
  hero: {
    badge: 'Orthodontics',
    title: 'Retainers',
    subtitle: 'Retention appliances, printed on demand.',
    body: 'Produce accurate models for clear retainers and retention appliances — fast replacements without new impressions.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Retainers%20Workflow%20PDF',
    },
    img: '/img/clinical/retainers/hero-cutout.png',
    imgAlt: 'Clear retainer on a printed model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Model Resin', 'Stable. Replacement-ready.', RESIN_IMG.model, '/products/model-resin')),
  timeline: tl(
    'retainers',
    [
      { title: 'Scan', body: 'Capture final occlusion with ODYX S1.', time: '~45 sec' },
      { title: 'Design', body: 'Prepare retainer model bases in CAD.', time: '~3 min' },
      { title: 'Print', body: 'Print models on P1-26 with Model Resin.', time: '~30 min' },
      { title: 'Cure', body: 'Wash and cure before thermoforming.', time: '~8 min' },
      { title: 'Thermoform', body: 'Form and trim the retainer.', time: '~12 min' },
    ],
    'Total Time: ~50–60 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/hv2-cases/orthodontic.webp', alt: 'Clear aligner tray on white background' },
        after: { img: '/img/clinical/retainers/ba-after.png', alt: 'Clear retainer delivered' },
      },
      {
        before: { img: '/img/printers/p126/app-splint.png', alt: 'Printed retainer model' },
        after: { img: '/img/clinical-hub/foot-orthodontics.png', alt: 'Finished retainer' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Quick Replacements', body: 'Reprint from stored scans anytime.' },
    { id: 'strength', title: 'Accurate Fit', body: 'Stable models for consistent retention.' },
    { id: 'connected', title: 'Digital Archive', body: 'Reuse scans for future retainers.' },
    { id: 'roi', title: 'No Re-impressions', body: 'Save chair time on remakes.' },
  ]),
  params: defaultParams('Model Resin'),
  tips: {
    title: 'Clinical Tips',
    items: [
      'Archive final scans for lifetime retainer remakes.',
      'Check occlusion contacts after thermoforming.',
      'Polish edges for patient comfort.',
      'Provide care instructions with every delivery.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Same-day replacement retainer from archived scan.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/retainers/case-thumb.jpg',
    thumbAlt: 'Retainer clinical case',
  },
};

/* ---------- Prosthetics ---------- */

const dentures: ClinicalIndicationContent = {
  slug: 'dentures',
  category: 'prosthetics',
  hero: {
    badge: 'Prosthetics',
    title: 'Dentures',
    subtitle: 'Complete & partial dentures, digitally.',
    body: 'Print bases and try-in components for efficient full and partial denture workflows — predictable fit, fewer appointments.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Dentures%20Workflow%20PDF',
    },
    img: '/img/clinical/dentures/hero-cutout.png',
    imgAlt: 'Full-arch prosthetic teeth set in a pink gum base',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Denture Base Resin', 'Biocompatible. Esthetic pink.', RESIN_IMG.temporary)),
  timeline: tl(
    'dentures',
    [
      { title: 'Scan', body: 'Capture arches and bite with ODYX S1.', time: '~2 min' },
      { title: 'Design', body: 'Design base and tooth setup in CAD.', time: '~20 min' },
      { title: 'Print', body: 'Print bases/teeth on P1-26.', time: '~45 min' },
      { title: 'Cure', body: 'Wash and cure for biocompatibility.', time: '~12 min' },
      { title: 'Finish', body: 'Polish, characterize, and deliver.', time: '~15 min' },
    ],
    'Total Time: depends on case type',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/hv2-cases/surgical.webp', alt: 'Clear full-arch implant surgical guide' },
        after: { img: '/img/clinical/dentures/ba-after.png', alt: 'Full-arch prosthetic with pink gum base' },
      },
      {
        before: { img: '/img/printers/p126/app-denture.png', alt: 'Printed denture components' },
        after: { img: '/img/clinical-hub/foot-prosthetics.png', alt: 'Finished denture set' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Fewer Visits', body: 'Digital try-ins reduce remake appointments.' },
    { id: 'strength', title: 'Stable Bases', body: 'Denture resins for durable daily wear.' },
    { id: 'connected', title: 'Full Digital Chain', body: 'Scan to print without stone models.' },
    { id: 'roi', title: 'Remake Ready', body: 'Reprint from archived designs quickly.' },
  ]),
  params: {
    title: 'Printing Parameters (P1-26)',
    rows: [
      { label: 'Layer Thickness', value: '50 – 100 μm' },
      { label: 'Exposure Time', value: '2.2 – 3.2 s' },
      { label: 'Bottom Exposure', value: '28 – 40 s' },
      { label: 'Bottom Layers', value: '5 – 6' },
      { label: 'Build Plate Temp.', value: '30 – 35 °C' },
      { label: 'Resin', value: 'Denture Base Resin' },
    ],
  },
  tips: {
    title: 'Clinical Tips',
    items: [
      'Verify vertical dimension at try-in before final cure finish.',
      'Follow manufacturer wash/cure for mucosal contact resins.',
      'Check border extension for comfort and retention.',
      'Document shade and tooth mold for remakes.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Complete denture. Digital try-in approved, final printed in-house.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/dentures/case-thumb.jpg',
    thumbAlt: 'Full-arch prosthetic with pink gum base',
  },
};

const tryIns: ClinicalIndicationContent = {
  slug: 'try-ins',
  category: 'prosthetics',
  hero: {
    badge: 'Prosthetics',
    title: 'Try-ins',
    subtitle: 'Perfect try-ins for better fit & function.',
    body: 'Print inexpensive try-in appliances to validate esthetics, occlusion, and phonetics before committing to the final prosthesis.',
    cta: {
      label: 'Download Workflow PDF',
      href: 'mailto:info@odyx.dental?subject=Try-ins%20Workflow%20PDF',
    },
    img: '/img/clinical/try-ins/hero-cutout.png',
    imgAlt: 'Printed try-in prosthesis on a model',
  },
  productsTitle: 'Products Used in This Workflow',
  products: products(resin('Temporary Resin', 'Fast try-ins. Easy adjust.', RESIN_IMG.temporary, '/products/temporary-restoration-resin')),
  timeline: tl(
    'try-ins',
    [
      { title: 'Scan', body: 'Record arches and occlusal relationship.', time: '~2 min' },
      { title: 'Design', body: 'Design try-in from the proposed setup.', time: '~12 min' },
      { title: 'Print', body: 'Print try-in on P1-26 with Temporary Resin.', time: '~30 min' },
      { title: 'Cure', body: 'Cure enough for clinical try-in strength.', time: '~8 min' },
      { title: 'Evaluate', body: 'Assess fit, esthetics, and phonetics.', time: '~10 min' },
    ],
    'Total Time: ~60–75 min',
  ),
  beforeAfter: {
    title: 'Before & After',
    slides: [
      {
        before: { img: '/img/hv2-cases/surgical.webp', alt: 'Clear full-arch implant surgical guide' },
        after: { img: '/img/clinical/try-ins/ba-after.png', alt: 'Try-in seated for evaluation' },
      },
      {
        before: { img: '/img/printers/p126/app-denture.png', alt: 'Printed try-in' },
        after: { img: '/img/clinical-hub/foot-prosthetics.png', alt: 'Approved try-in' },
      },
    ],
  },
  why: defaultWhy([
    { id: 'one-visit', title: 'Approve Early', body: 'Catch esthetic issues before final materials.' },
    { id: 'strength', title: 'Adjustable', body: 'Temporary resin is easy to refine chairside.' },
    { id: 'connected', title: 'Design Feedback', body: 'Update CAD from clinical try-in notes.' },
    { id: 'roi', title: 'Fewer Remakes', body: 'Validate before expensive finals.' },
  ]),
  params: defaultParams('Temporary Resin'),
  tips: {
    title: 'Clinical Tips',
    items: [
      'Photograph try-in for lab or in-house design notes.',
      'Check midline, plane, and lip support carefully.',
      'Mark adjustments on the try-in before redesign.',
      'Do not use try-in resin as a long-term prosthesis.',
    ],
  },
  realCase: {
    title: 'Real Case',
    body: 'Full denture try-in. Esthetics approved before final print.',
    videoLabel: 'Watch the case video',
    videoHref: '/support',
    thumb: '/img/clinical/try-ins/case-thumb.jpg',
    thumbAlt: 'Tan temporary arch try-in restoration',
  },
};

/* ---------- Registry (detail workflows only; case listings are separate) ---------- */

export const CLINICAL_INDICATIONS: Record<string, ClinicalIndicationContent> = {
  'same-day-crown': sameDayCrown,
  veneers,
  inlays,
  'surgical-guide': surgicalGuide,
  'implant-model': implantModel,
  aligners,
  retainers,
  dentures,
  'try-ins': tryIns,
};

export const CLINICAL_INDICATION_SLUGS = Object.keys(CLINICAL_INDICATIONS);

export const CLINICAL_INDICATION_META: Record<string, ClinicalIndicationMeta> = {
  'same-day-crown': {
    title: 'Same-Day Crown | ODYX Clinical Applications',
    description:
      'Deliver strong, esthetic crowns in a single appointment with the ODYX digital workflow — from scan to cementation.',
  },
  veneers: {
    title: 'Veneers | ODYX Clinical Applications',
    description: 'Print thin, highly esthetic veneers chairside with the ODYX digital workflow.',
  },
  inlays: {
    title: 'Inlays & Onlays | ODYX Clinical Applications',
    description: 'Precise partial restorations printed chairside with the ODYX digital workflow.',
  },
  'surgical-guide': {
    title: 'Surgical Guide | ODYX Clinical Applications',
    description: 'Print rigid, precise surgical guides from CBCT-driven implant plans.',
  },
  'implant-model': {
    title: 'Implant Model | ODYX Clinical Applications',
    description: 'Detailed implant planning models printed in-house with ODYX.',
  },
  aligners: {
    title: 'Aligners | ODYX Clinical Applications',
    description: 'Clear aligner model workflows with ODYX scanning and printing.',
  },
  retainers: {
    title: 'Retainers | ODYX Clinical Applications',
    description: 'Retention appliances from archived scans — printed on demand.',
  },
  dentures: {
    title: 'Dentures | ODYX Clinical Applications',
    description: 'Complete and partial denture workflows with ODYX digital printing.',
  },
  'try-ins': {
    title: 'Try-ins | ODYX Clinical Applications',
    description: 'Validate fit and esthetics with printed prosthetic try-ins.',
  },
};

export function getClinicalIndication(slug: string): ClinicalIndicationContent | undefined {
  return CLINICAL_INDICATIONS[slug];
}
