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

export interface ProductContent {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  img: string;
  accent: 'teal' | 'orange';
  workflowStep: string;
  applications: string[];
  models: ProductModel[];
  specs: ProductSpec[];
  downloads: ProductDownload[];
  benefits: string[];
}

export const PRODUCTS: ProductContent[] = [
  {
    slug: 'intraoral-scanner',
    name: 'Intraoral Scanner',
    category: 'Scanning',
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
  },
  {
    slug: 'design',
    name: 'Design Software',
    category: 'Digital',
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
  },
  {
    slug: '3d-printers',
    name: '3D Printers',
    category: 'Printing',
    tagline: 'Desktop production for clinic and lab.',
    overview:
      'ODYX printers deliver crowns, guides, models and dentures with validated resin profiles. Compact footprint, simple maintenance and workflow-linked presets keep production predictable.',
    img: '/img/feat-printer.jpg',
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
  },
  {
    slug: 'curing-machines',
    name: 'Curing Machines',
    category: 'Post-processing',
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
  },
  {
    slug: 'staining-glazing',
    name: 'Staining & Glazing',
    category: 'Finishing',
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
  },
  {
    slug: 'resins',
    name: 'Resins & Materials',
    category: 'Materials',
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
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
