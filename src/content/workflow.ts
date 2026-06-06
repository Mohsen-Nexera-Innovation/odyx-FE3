export type WorkflowId = 'scan' | 'design' | 'print' | 'cure' | 'finish' | 'deliver';
export type Accent = 'teal' | 'orange';

export interface WorkflowStepContent {
  id: WorkflowId;
  no: string;
  label: string;
  accent: Accent;
  productSlug: string;
  productName: string;
  img: string;
  lead: string;
  whatHappens: string;
  benefits: string[];
  dentistNote: string;
  labNote: string;
  learning: { label: string; href: string }[];
}

export const WORKFLOW_STEPS: WorkflowStepContent[] = [
  {
    id: 'scan',
    no: '01',
    label: 'Scan',
    accent: 'teal',
    productSlug: 'intraoral-scanner',
    productName: 'Intraoral Scanner',
    img: '/img/feat-scanner.jpg',
    lead: 'Digital impressions in seconds - no molds, no mess, instant 3D data.',
    whatHappens:
      'A chairside intraoral scan captures the patient\'s anatomy in full color 3D. The file exports in open formats and flows directly into design - no manual steps, no compatibility guesswork.',
    benefits: ['No traditional impressions', 'Instant chairside preview', 'Open export to CAD', 'Patient comfort and speed'],
    dentistNote: 'Ideal for same-day starts: scan once, design and print without sending a case out.',
    labNote: 'Receive clean STL/PLY from clinics or pair with a desktop lab scanner for high-volume intake.',
    learning: [
      { label: 'Beginner: What is a scanner?', href: '/learning' },
      { label: 'Scan best practices', href: '/learning' },
    ],
  },
  {
    id: 'design',
    no: '02',
    label: 'Design',
    accent: 'teal',
    productSlug: 'design',
    productName: 'Design Software',
    img: '/img/odyx/design.webp',
    lead: 'Scan data becomes a precise restoration in validated CAD tools.',
    whatHappens:
      'Import the scan into ODYX-compatible design software. Crowns, guides, models and dentures are designed with libraries tuned for ODYX print and cure parameters.',
    benefits: ['Validated design libraries', 'Repeatable margins and contacts', 'Export ready for print', 'Dentist and lab workflows'],
    dentistNote: 'Chairside design paths keep the patient in the chair while the restoration is prepared.',
    labNote: 'Batch design and nesting for production runs with consistent parameters.',
    learning: [
      { label: 'CAD workflow overview', href: '/learning' },
      { label: 'Crown design course', href: '/learning/courses' },
    ],
  },
  {
    id: 'print',
    no: '03',
    label: 'Print',
    accent: 'orange',
    productSlug: '3d-printers',
    productName: '3D Printer',
    img: '/img/feat-printer.jpg',
    lead: 'Layer-by-layer production with ODYX-validated resins.',
    whatHappens:
      'The designed file is sent to the ODYX printer. Layer resolution, support strategy and material profile are matched to the indication - crown, guide, model or denture.',
    benefits: ['In-house production', 'Validated resin profiles', 'Compact footprint', 'Fast turnaround'],
    dentistNote: 'Print provisionals or finals chairside while the patient waits.',
    labNote: 'Run multiple units per day with consistent material performance.',
    learning: [
      { label: 'Printer setup guide', href: '/support#manuals' },
      { label: 'Resin selection', href: '/products/resins' },
    ],
  },
  {
    id: 'cure',
    no: '04',
    label: 'Cure',
    accent: 'orange',
    productSlug: 'curing-machines',
    productName: 'Curing Machine',
    img: '/img/feat-curing.jpg',
    lead: 'Controlled UV polymerization for full strength and biocompatibility.',
    whatHappens:
      'Printed parts move to the curing unit for a validated light dose and time profile. This completes polymerization so mechanical properties and biocompatibility meet clinical requirements.',
    benefits: ['Validated cure profiles', 'Consistent mechanical strength', 'Biocompatible outcomes', 'Workflow-linked presets'],
    dentistNote: 'One-button presets per resin type reduce error at chairside.',
    labNote: 'Batch curing with traceable profiles for production QA.',
    learning: [
      { label: 'Curing best practices', href: '/support#educate' },
      { label: 'Material safety docs', href: '/products/resins' },
    ],
  },
  {
    id: 'finish',
    no: '05',
    label: 'Finish',
    accent: 'orange',
    productSlug: 'staining-glazing',
    productName: 'Staining & Glazing',
    img: '/img/crowns.jpg',
    lead: 'Characterization and gloss for lifelike aesthetics.',
    whatHappens:
      'Stains and glaze bring natural chroma and surface texture to the restoration. For monolithic prints, finishing can be minimal; for high-aesthetic cases, layering matches the patient shade.',
    benefits: ['Natural esthetics', 'Shade matching', 'Durable surface finish', 'Lab-grade characterization'],
    dentistNote: 'Same-day cases can use pre-shaded resins; customize when aesthetics demand it.',
    labNote: 'Full characterization workflows for premium restorative cases.',
    learning: [
      { label: 'Finishing techniques', href: '/learning' },
      { label: 'Case: anterior crown', href: '/cases' },
    ],
  },
  {
    id: 'deliver',
    no: '06',
    label: 'Deliver',
    accent: 'orange',
    productSlug: '',
    productName: 'Finished Restoration',
    img: '/img/step-deliver.jpg',
    lead: 'Seat, verify and hand over - often same-day with one connected workflow.',
    whatHappens:
      'The finished restoration is tried in, adjusted if needed and delivered. Because scan, design, print and cure stayed in one ecosystem, fit and contacts are predictable - less chair time, fewer remakes.',
    benefits: ['Predictable fit', 'Same-day potential', 'Happy patients', 'One vendor support path'],
    dentistNote: 'Close the loop in a single visit for many indications.',
    labNote: 'Ship finished units with confidence - digital chain reduces remakes.',
    learning: [
      { label: 'Case library', href: '/cases' },
      { label: 'Request a demo', href: '/#cta' },
    ],
  },
];

export function getWorkflowStep(id: string) {
  return WORKFLOW_STEPS.find((s) => s.id === id);
}

export function getAdjacentSteps(id: WorkflowId) {
  const i = WORKFLOW_STEPS.findIndex((s) => s.id === id);
  return {
    prev: i > 0 ? WORKFLOW_STEPS[i - 1] : null,
    next: i < WORKFLOW_STEPS.length - 1 ? WORKFLOW_STEPS[i + 1] : null,
  };
}
