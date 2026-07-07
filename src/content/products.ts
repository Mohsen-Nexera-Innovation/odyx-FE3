export interface ProductModel {
  name: string;
  tagline: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDownload {
  name: string;
  type: string;
  href: string;
}

export interface ProductStat {
  value: string;
  label: string;
  desc: string;
}

export type ProductLayout = 'print-line' | 'cinematic' | 'classic' | 'signature';

export interface ProductContent {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  img: string;
  heroImg?: string;
  accent: 'teal' | 'orange';
  workflowStep: string;
  applications: string[];
  models: ProductModel[];
  specs: ProductSpec[];
  downloads: ProductDownload[];
  benefits: string[];
  stats?: ProductStat[];
  layout?: ProductLayout;
}

export const PRODUCTS: ProductContent[] = [
  {
    slug: 'intraoral-scanner',
    name: 'Intraoral Scanner',
    category: 'Scanning',
    layout: 'cinematic',
    tagline: 'Chairside 3D impressions in seconds.',
    overview:
      'The ODYX intraoral scanner captures full-arch color scans with real-time mesh preview. Open export formats connect directly to design and lab workflows without proprietary lock-in.',
    img: '/img/feat-scanner.jpg',
    accent: 'teal',
    workflowStep: 'scan',
    applications: ['Crowns & bridges', 'Implant guides', 'Orthodontic models', 'Dentures', 'Provisionals'],
    models: [
      { name: 'ODYX Scan Pro', tagline: 'Full-arch speed for busy clinics' },
      { name: 'ODYX Scan Compact', tagline: 'Small footprint, chairside ready' },
    ],
    specs: [
      { label: 'Scan time (full arch)', value: 'Under 60 seconds' },
      { label: 'Accuracy', value: 'High-precision optical engine' },
      { label: 'Export formats', value: 'STL, PLY, OBJ' },
      { label: 'Connectivity', value: 'USB-C / Wi-Fi' },
      { label: 'Tip sterilization', value: 'Autoclavable tips' },
    ],
    downloads: [
      { name: 'Product brochure', type: 'PDF', href: '#' },
      { name: 'Quick start guide', type: 'PDF', href: '/support#manuals' },
      { name: 'IFU / User manual', type: 'PDF', href: '/support#manuals' },
    ],
    benefits: ['No impressions', 'Instant preview', 'Open CAD export', 'Patient comfort'],
    stats: [
      { value: '<60s', label: 'Full-arch capture', desc: 'Complete digital impressions in under a minute.' },
      { value: '3', label: 'Export formats', desc: 'STL, PLY and OBJ for open CAD workflows.' },
      { value: '2', label: 'Configurations', desc: 'Scan Pro for speed, Scan Compact for chairside.' },
    ],
  },
  {
    slug: 'design',
    name: 'Design Software',
    category: 'Digital',
    layout: 'cinematic',
    tagline: 'CAD built for ODYX print and cure parameters.',
    overview:
      'Design crowns, guides, models and dentures with libraries validated for ODYX materials. Export print-ready files with supports and nesting optimized for ODYX printers.',
    img: '/img/odyx/design.webp',
    accent: 'teal',
    workflowStep: 'design',
    applications: ['Restorative design', 'Surgical guides', 'Model production', 'Denture setup'],
    models: [
      { name: 'ODYX Design Studio', tagline: 'Full restorative and guide toolkit' },
      { name: 'ODYX Design Chairside', tagline: 'Simplified clinic workflow' },
    ],
    specs: [
      { label: 'Indications', value: 'Crown, guide, model, denture' },
      { label: 'Import formats', value: 'STL, PLY, OBJ' },
      { label: 'Export', value: 'Print-ready STL' },
      { label: 'Libraries', value: 'ODYX-validated tooth sets' },
      { label: 'License', value: 'Clinic or lab seats' },
    ],
    downloads: [
      { name: 'Software overview', type: 'PDF', href: '#' },
      { name: 'Installation guide', type: 'PDF', href: '/support#manuals' },
      { name: 'Release notes', type: 'PDF', href: '/support#updates' },
    ],
    benefits: ['Validated parameters', 'Fast design paths', 'Dentist + lab modes', 'Training included'],
    stats: [
      { value: '4', label: 'Indications', desc: 'Crown, guide, model and denture design paths.' },
      { value: '2', label: 'Editions', desc: 'Design Studio for labs, Chairside for clinics.' },
      { value: '1-click', label: 'Print-ready export', desc: 'Validated parameters baked into every STL.' },
    ],
  },
  {
    slug: '3d-printers',
    name: '3D Printers',
    category: 'Printing',
    layout: 'cinematic',
    tagline: 'Desktop production for clinic and lab.',
    overview:
      'ODYX printers deliver crowns, guides, models and dentures with validated resin profiles. Compact footprint, simple maintenance and workflow-linked presets keep production predictable.',
    img: '/img/feat-printer.jpg',
    heroImg: '/img/feat-printer-cutout.png',
    accent: 'orange',
    workflowStep: 'print',
    applications: ['Permanent crowns', 'Surgical guides', 'Models', 'Denture bases', 'Provisionals'],
    models: [
      { name: 'ODYX Print One', tagline: 'Chairside and small lab' },
      { name: 'ODYX Print Pro', tagline: 'Higher throughput production' },
    ],
    specs: [
      { label: 'Technology', value: 'LCD / DLP (model dependent)' },
      { label: 'Build volume', value: 'See model datasheet' },
      { label: 'Layer thickness', value: '25-100 microns' },
      { label: 'Resin compatibility', value: 'ODYX validated line' },
      { label: 'Connectivity', value: 'USB / Network' },
    ],
    downloads: [
      { name: 'Product brochure', type: 'PDF', href: '#' },
      { name: 'Setup & calibration', type: 'PDF', href: '/support#manuals' },
      { name: 'Maintenance schedule', type: 'PDF', href: '/support#manuals' },
    ],
    benefits: ['In-house production', 'Validated profiles', 'Small footprint', 'Same-day cases'],
    stats: [
      { value: '25µm', label: 'Layer precision', desc: 'Validated profiles for clinical-grade detail.' },
      { value: '2×', label: 'Configurations', desc: 'Print One for chairside, Print Pro for production.' },
      { value: '5+', label: 'Indications', desc: 'Crowns, guides, models, dentures and more.' },
    ],
  },
  {
    slug: 'curing-machines',
    name: 'Curing Machines',
    category: 'Post-processing',
    layout: 'cinematic',
    tagline: 'Full-strength, biocompatible cure every time.',
    overview:
      'The ODYX curing unit applies validated light dose and time per resin type. Presets link to the workflow so clinic and lab teams get consistent mechanical properties without guesswork.',
    img: '/img/feat-curing.jpg',
    accent: 'orange',
    workflowStep: 'cure',
    applications: ['Crown & bridge resins', 'Surgical guide materials', 'Denture bases', 'Model resins'],
    models: [
      { name: 'ODYX Cure', tagline: 'Standard clinic and lab unit' },
      { name: 'ODYX Cure Plus', tagline: 'Extended capacity for labs' },
    ],
    specs: [
      { label: 'Cure profiles', value: 'Resin-specific presets' },
      { label: 'Chamber', value: 'Multi-part batch capable' },
      { label: 'Display', value: 'Guided timer + status' },
      { label: 'Power', value: '110-240V' },
      { label: 'Compliance', value: 'Validated for ODYX resins' },
    ],
    downloads: [
      { name: 'Product brochure', type: 'PDF', href: '#' },
      { name: 'Cure profile guide', type: 'PDF', href: '/support#manuals' },
      { name: 'Safety & IFU', type: 'PDF', href: '/support#manuals' },
    ],
    benefits: ['Validated presets', 'Biocompatible outcomes', 'Simple operation', 'QA-friendly'],
    stats: [
      { value: '5+', label: 'Resin presets', desc: 'Validated light dose and time per resin type.' },
      { value: '2', label: 'Configurations', desc: 'Cure for clinics, Cure Plus for lab throughput.' },
      { value: '100%', label: 'ODYX validated', desc: 'Every profile tested for biocompatible outcomes.' },
    ],
  },
  {
    slug: 'staining-glazing',
    name: 'Staining & Glazing',
    category: 'Finishing',
    layout: 'cinematic',
    tagline: 'Lifelike characterization for restorative cases.',
    overview:
      'Complete the aesthetic layer with ODYX-compatible stains and glaze systems. From monolithic convenience to full layering, match patient shade and surface texture with predictable results.',
    img: '/img/feat-finishing.jpg',
    accent: 'orange',
    workflowStep: 'finish',
    applications: ['Anterior esthetics', 'Posterior characterization', 'Denture teeth', 'Premium lab cases'],
    models: [
      { name: 'ODYX Finish Kit', tagline: 'Essential stain and glaze set' },
      { name: 'ODYX Finish Pro', tagline: 'Extended shade and tool kit' },
    ],
    specs: [
      { label: 'Compatible materials', value: 'ODYX restorative resins' },
      { label: 'Shade range', value: 'VITA-oriented set' },
      { label: 'Application', value: 'Brush and spray options' },
      { label: 'Cure after glaze', value: 'Per kit instructions' },
    ],
    downloads: [
      { name: 'Finishing guide', type: 'PDF', href: '/support#manuals' },
      { name: 'Shade protocol', type: 'PDF', href: '#' },
    ],
    benefits: ['Natural esthetics', 'Shade matching', 'Lab-grade results', 'Training resources'],
    stats: [
      { value: 'VITA', label: 'Shade range', desc: 'Oriented shade set for predictable matching.' },
      { value: '2', label: 'Kit options', desc: 'Finish Kit essentials or Finish Pro extended.' },
      { value: '2×', label: 'Application', desc: 'Brush and spray techniques for every case.' },
    ],
  },
  {
    slug: 'resins',
    name: 'Resins & Materials',
    category: 'Materials',
    layout: 'cinematic',
    tagline: 'Five clinical lines validated for the ODYX workflow.',
    overview:
      'Permanent crown, ceramic crown, temporary, model and surgical guide resins - each with datasheets, cure profiles and safety documentation. The materials layer that makes the ecosystem clinically complete.',
    img: '/img/feat-resin.jpg',
    accent: 'orange',
    workflowStep: 'print',
    applications: ['Permanent restorations', 'Provisionals', 'Guides', 'Models', 'Dentures'],
    models: [
      { name: 'Permanent Crown & Bridge', tagline: 'Long-term restorative' },
      { name: 'Ceramic Crown', tagline: 'Higher esthetics' },
      { name: 'Temporary Restoration', tagline: 'Fast provisionals' },
      { name: 'Model Resin', tagline: 'Stable models' },
      { name: 'Surgical Guide', tagline: 'Guided surgery' },
    ],
    specs: [
      { label: 'Lines', value: '5 clinical resins' },
      { label: 'Biocompatibility', value: 'Indication-specific certification' },
      { label: 'Shelf life', value: 'See SDS per product' },
      { label: 'Storage', value: 'Light-safe, sealed bottles' },
    ],
    downloads: [
      { name: 'Resin catalog', type: 'PDF', href: '#' },
      { name: 'Safety data sheets (SDS)', type: 'PDF', href: '/support#manuals' },
      { name: 'Processing guides', type: 'PDF', href: '/support#manuals' },
    ],
    benefits: ['Workflow-validated', 'Clear indications', 'Safety docs included', 'Shop reorder path'],
    stats: [
      { value: '5', label: 'Clinical lines', desc: 'Crown, ceramic, temporary, model and guide resins.' },
      { value: '100%', label: 'Workflow-validated', desc: 'Every line tested with ODYX print and cure.' },
      { value: 'SDS', label: 'Safety docs', desc: 'Full datasheets and processing guides included.' },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
