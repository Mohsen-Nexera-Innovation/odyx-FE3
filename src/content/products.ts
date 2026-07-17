export interface ProductModel {
  name: string;
  tagline: string;
  /** When set, model card shows Add to cart / Buy now for this shop SKU */
  shopProductId?: string;
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

export type ProductLayout =
  | "print-line"
  | "cinematic"
  | "classic"
  | "signature";

export interface ProductContent {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  img: string;
  heroImg?: string;
  accent: "teal" | "orange";
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
    slug: "intraoral-scanner",
    name: "ODYX-S1",
    category: "Scanner",
    layout: "cinematic",
    tagline: "Chairside 3D impressions in seconds.",
    overview:
      "The ODYX-S1 intraoral scanner captures full-arch color scans with real-time mesh preview. Open export formats connect directly to design and lab workflows without proprietary lock-in.",
    img: "/img/feat-scanner.jpg",
    accent: "teal",
    workflowStep: "scan",
    applications: [
      "Crowns & bridges",
      "Implant guides",
      "Orthodontic models",
      "Dentures",
      "Provisionals",
    ],
    models: [
      { name: "ODYX-S1", tagline: "Full-arch color scans with open export", shopProductId: "scanner-s1" },
    ],
    specs: [
      { label: "Scan time (full arch)", value: "Under 60 seconds" },
      { label: "Accuracy", value: "High-precision optical engine" },
      { label: "Export formats", value: "STL, PLY, OBJ" },
      { label: "Connectivity", value: "USB-C / Wi-Fi" },
      { label: "Tip sterilization", value: "Autoclavable tips" },
    ],
    downloads: [
      { name: "Product brochure", type: "PDF", href: "#" },
      { name: "Quick start guide", type: "PDF", href: "/support#manuals" },
      { name: "IFU / User manual", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "No impressions",
      "Instant preview",
      "Open CAD export",
      "Patient comfort",
    ],
    stats: [
      {
        value: "<60s",
        label: "Full-arch capture",
        desc: "Complete digital impressions in under a minute.",
      },
      {
        value: "3",
        label: "Export formats",
        desc: "STL, PLY and OBJ for open CAD workflows.",
      },
      {
        value: "1",
        label: "Flagship scanner",
        desc: "ODYX-S1 for clinic and lab chairside capture.",
      },
    ],
  },
  {
    slug: "design",
    name: "Design Software",
    category: "Digital",
    layout: "cinematic",
    tagline: "CAD built for ODYX print and cure parameters.",
    overview:
      "Design crowns, guides, models and dentures with libraries validated for ODYX materials. Export print-ready files with supports and nesting optimized for ODYX printers.",
    img: "/img/odyx/design.webp",
    accent: "teal",
    workflowStep: "design",
    applications: [
      "Restorative design",
      "Surgical guides",
      "Model production",
      "Denture setup",
    ],
    models: [
      {
        name: "ODYX Design Studio",
        tagline: "Full restorative and guide toolkit",
      },
      { name: "ODYX Design Chairside", tagline: "Simplified clinic workflow" },
    ],
    specs: [
      { label: "Indications", value: "Crown, guide, model, denture" },
      { label: "Import formats", value: "STL, PLY, OBJ" },
      { label: "Export", value: "Print-ready STL" },
      { label: "Libraries", value: "ODYX-validated tooth sets" },
      { label: "License", value: "Clinic or lab seats" },
    ],
    downloads: [
      { name: "Software overview", type: "PDF", href: "#" },
      { name: "Installation guide", type: "PDF", href: "/support#manuals" },
      { name: "Release notes", type: "PDF", href: "/support#updates" },
    ],
    benefits: [
      "Validated parameters",
      "Fast design paths",
      "Dentist + lab modes",
      "Training included",
    ],
    stats: [
      {
        value: "4",
        label: "Indications",
        desc: "Crown, guide, model and denture design paths.",
      },
      {
        value: "2",
        label: "Editions",
        desc: "Design Studio for labs, Chairside for clinics.",
      },
      {
        value: "1-click",
        label: "Print-ready export",
        desc: "Validated parameters baked into every STL.",
      },
    ],
  },
  {
    slug: "3d-printers",
    name: "ODYX P1-26",
    category: "Printer",
    layout: "cinematic",
    tagline: "Desktop production for clinic and lab.",
    overview:
      "The ODYX P1-26 delivers crowns, guides, models and dentures with validated resin profiles. Compact footprint, simple maintenance and workflow-linked presets keep production predictable.",
    img: "/img/feat-printer.jpg",
    heroImg: "/img/feat-printer-cutout.png",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Permanent crowns",
      "Surgical guides",
      "Models",
      "Denture bases",
      "Provisionals",
    ],
    models: [
      { name: "ODYX P1-26", tagline: "Chairside and small lab production", shopProductId: "printer-p1-26" },
    ],
    specs: [
      { label: "Technology", value: "LCD / DLP" },
      { label: "Build volume", value: "See datasheet" },
      { label: "Layer thickness", value: "25-100 microns" },
      { label: "Resin compatibility", value: "ODYX validated line" },
      { label: "Connectivity", value: "USB / Network" },
    ],
    downloads: [
      { name: "Product brochure", type: "PDF", href: "#" },
      { name: "Setup & calibration", type: "PDF", href: "/support#manuals" },
      { name: "Maintenance schedule", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "In-house production",
      "Validated profiles",
      "Small footprint",
      "Same-day cases",
    ],
    stats: [
      {
        value: "25µm",
        label: "Layer precision",
        desc: "Validated profiles for clinical-grade detail.",
      },
      {
        value: "P1-26",
        label: "Desktop printer",
        desc: "Built for chairside and small-lab throughput.",
      },
      {
        value: "5+",
        label: "Indications",
        desc: "Crowns, guides, models, dentures and more.",
      },
    ],
  },
  {
    slug: "curing-machines",
    name: "ODYX Cure",
    category: "Curing Machine",
    layout: "cinematic",
    tagline: "Full-strength, biocompatible cure every time.",
    overview:
      "ODYX Cure applies validated light dose and time per resin type. Presets link to the workflow so clinic and lab teams get consistent mechanical properties without guesswork.",
    img: "/img/feat-curing.jpg",
    accent: "orange",
    workflowStep: "cure",
    applications: [
      "Crown & bridge Resin",
      "Surgical guide materials",
      "Denture bases",
      "Model Resin",
    ],
    models: [
      { name: "ODYX Cure", tagline: "Standard clinic and lab unit", shopProductId: "curing-odyx-cure" },
    ],
    specs: [
      { label: "Cure profiles", value: "Resin-specific presets" },
      { label: "Chamber", value: "Multi-part batch capable" },
      { label: "Display", value: "Guided timer + status" },
      { label: "Power", value: "110-240V" },
      { label: "Compliance", value: "Validated for ODYX Resin" },
    ],
    downloads: [
      { name: "Product brochure", type: "PDF", href: "#" },
      { name: "Cure profile guide", type: "PDF", href: "/support#manuals" },
      { name: "Safety & IFU", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "Validated presets",
      "Biocompatible outcomes",
      "Simple operation",
      "QA-friendly",
    ],
    stats: [
      {
        value: "5+",
        label: "Resin presets",
        desc: "Validated light dose and time per resin type.",
      },
      {
        value: "1",
        label: "Clinic & lab unit",
        desc: "ODYX Cure for consistent biocompatible outcomes.",
      },
      {
        value: "QA",
        label: "Repeatable results",
        desc: "Guided timers and status for every batch.",
      },
    ],
  },
  {
    slug: "staining-glazing",
    name: "Staining & Glazing",
    category: "Finishing",
    layout: "cinematic",
    tagline: "Lifelike characterization for restorative cases.",
    overview:
      "Complete the aesthetic layer with ODYX-compatible stains and glaze systems. From monolithic convenience to full layering, match patient shade and surface texture with predictable results.",
    img: "/img/feat-finishing.jpg",
    accent: "orange",
    workflowStep: "finish",
    applications: [
      "Anterior esthetics",
      "Posterior characterization",
      "Denture teeth",
      "Premium lab cases",
    ],
    models: [
      { name: "ODYX Finish Kit", tagline: "Essential stain and glaze set" },
      { name: "ODYX Finish Pro", tagline: "Extended shade and tool kit" },
    ],
    specs: [
      { label: "Compatible materials", value: "ODYX restorative Resin" },
      { label: "Shade range", value: "VITA-oriented set" },
      { label: "Application", value: "Brush and spray options" },
      { label: "Cure after glaze", value: "Per kit instructions" },
    ],
    downloads: [
      { name: "Finishing guide", type: "PDF", href: "/support#manuals" },
      { name: "Shade protocol", type: "PDF", href: "#" },
    ],
    benefits: [
      "Natural esthetics",
      "Shade matching",
      "Lab-grade results",
      "Training resources",
    ],
    stats: [
      {
        value: "VITA",
        label: "Shade range",
        desc: "Oriented shade set for predictable matching.",
      },
      {
        value: "2",
        label: "Kit options",
        desc: "Finish Kit essentials or Finish Pro extended.",
      },
      {
        value: "2×",
        label: "Application",
        desc: "Brush and spray techniques for every case.",
      },
    ],
  },
  {
    slug: "Resin",
    name: "Resin & Materials",
    category: "Materials",
    layout: "cinematic",
    tagline: "Five clinical lines validated for the ODYX workflow.",
    overview:
      "Permanent crown, ceramic crown, temporary, model and surgical guide Resin - each with datasheets, cure profiles and safety documentation. The materials layer that makes the ecosystem clinically complete.",
    img: "/img/feat-resin.jpg",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Permanent restorations",
      "Provisionals",
      "Guides",
      "Models",
      "Dentures",
    ],
    models: [
      {
        name: "Permanent Crown & Bridge",
        tagline: "Long-term restorative",
        shopProductId: "resin-odyx",
      },
      { name: "Ceramic Crown", tagline: "Higher esthetics" },
      { name: "Temporary Restoration", tagline: "Fast provisionals" },
      { name: "Model Resin", tagline: "Stable models" },
      { name: "Surgical Guide", tagline: "Guided surgery" },
    ],
    specs: [
      { label: "Lines", value: "5 clinical Resin" },
      { label: "Biocompatibility", value: "Indication-specific certification" },
      { label: "Shelf life", value: "See SDS per product" },
      { label: "Storage", value: "Light-safe, sealed bottles" },
    ],
    downloads: [
      { name: "Resin catalog", type: "PDF", href: "#" },
      {
        name: "Safety data sheets (SDS)",
        type: "PDF",
        href: "/support#manuals",
      },
      { name: "Processing guides", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "Workflow-validated",
      "Clear indications",
      "Safety docs included",
      "Shop reorder path",
    ],
    stats: [
      {
        value: "5",
        label: "Clinical lines",
        desc: "Crown, ceramic, temporary, model and guide Resin.",
      },
      {
        value: "100%",
        label: "Workflow-validated",
        desc: "Every line tested with ODYX print and cure.",
      },
      {
        value: "SDS",
        label: "Safety docs",
        desc: "Full datasheets and processing guides included.",
      },
    ],
  },
];

/** Workflow-aligned product family order */
export const PRODUCT_CATEGORY_ORDER = [
  'Printer',
  'Curing Machine',
  'Scanner',
  'Digital',
  'Finishing',
  'Materials',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORY_ORDER)[number];

export function groupProductsByCategory(
  products: ProductContent[] = PRODUCTS,
): { category: string; items: ProductContent[] }[] {
  const map = new Map<string, ProductContent[]>();
  for (const p of products) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  const ordered: { category: string; items: ProductContent[] }[] = PRODUCT_CATEGORY_ORDER
    .filter((c) => map.has(c))
    .map((category) => ({
      category,
      items: map.get(category)!,
    }));
  const known = new Set<string>(PRODUCT_CATEGORY_ORDER);
  for (const [category, items] of map) {
    if (!known.has(category)) {
      ordered.push({ category, items });
    }
  }
  return ordered;
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
