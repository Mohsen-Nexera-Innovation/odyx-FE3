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
    slug: "odyx-s1-intraoral-scanner",
    name: "ODYX-S1",
    category: "Intraoral Scanner",
    layout: "cinematic",
    tagline: "Chairside 3D impressions in seconds.",
    overview:
      "The ODYX-S1 intraoral scanner captures full-arch color scans with real-time mesh preview. Open export formats connect directly to design and lab workflows without proprietary lock-in.",
    img: "/img/scanner/s1-hero.png",
    heroImg: "/img/scanner/s1-hero-cutout.png",
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
    category: "Digital Products",
    layout: "cinematic",
    tagline: "CAD built for ODYX print and cure parameters.",
    overview:
      "Design crowns, guides, models and dentures with libraries validated for ODYX materials. Export print-ready files with supports and nesting optimized for ODYX printers.",
    img: "/img/odyx/design.webp",
    heroImg: "/img/cutouts/feat-design-cutout.png",
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
    // 036 · 3D Printers — family page with its own layout (PrintersFamilyPage).
    // This entry feeds nav/overview/shop surfaces; every value below traces to
    // knowledge_base/ODYX Products - 18.7.26.pdf via screens/036 content.md §7.
    slug: "3d-printers",
    name: "ODYX P1-26",
    category: "3D Printers",
    layout: "cinematic",
    tagline: "The dental printer — for the work that goes in the mouth.",
    overview:
      "The ODYX P1-26 dental 3D printer: 18 µm X-Y accuracy on a 6.8″ 9K monochrome LCD, for definitive restorations, models and appliances. Open-material 405 nm system.",
    img: "/img/feat-printer.jpg",
    heroImg: "/img/cutouts/feat-printer-cutout.png",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Crowns & bridges",
      "Veneers, inlays & onlays",
      "Temporary restorations",
      "Study & orthodontic models",
      "Implant surgical guides",
    ],
    models: [
      { name: "ODYX P1-26", tagline: "The dental printer — for the work that goes in the mouth", shopProductId: "printer-p1-26" },
    ],
    specs: [
      { label: "Technology", value: "405 nm monochrome LCD" },
      { label: "X-Y accuracy", value: "18 µm" },
      { label: "Build volume", value: "153 × 77 × 160 mm" },
      { label: "Max print speed", value: "60 mm/h" },
      { label: "Materials", value: "Open material system" },
      { label: "Connectivity", value: "USB / WiFi, cloud printing" },
    ],
    downloads: [
      { name: "Datasheets — available on request", type: "PDF", href: "/support" },
      { name: "Setup & calibration", type: "PDF", href: "/support#manuals" },
      { name: "Maintenance schedule", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "In-house production",
      "Open material system",
      "Published consumable schedule",
      "Cure times per application",
    ],
    stats: [
      {
        value: "18µm",
        label: "X-Y accuracy",
        desc: "Precision for definitive restorations.",
      },
      {
        value: "9K",
        label: "6.8″ LCD",
        desc: "8520 × 4320 px monochrome screen.",
      },
      {
        value: "6.6 kg",
        label: "Operatory footprint",
        desc: "221 × 221 × 404 mm — clinic, not just lab.",
      },
    ],
  },
  {
    // Dedicated P1-26 marketing page (P126Page) — attached UI implementation.
    slug: "odyx-p1-26",
    name: "ODYX P1-26",
    category: "3D Printers",
    layout: "cinematic",
    tagline: "Precision Printing. Better Dentistry.",
    overview:
      "Ultra-high precision resin printing engineered for definitive dental work — 18 µm X-Y accuracy on a 6.8″ 9K LCD with an open material workflow.",
    img: "/img/printers/p126/hero-packshot.png",
    heroImg: "/img/cutouts/feat-printer-cutout.png",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Crowns & bridges",
      "Surgical guides",
      "Dentures",
      "Models",
      "Splints & night guards",
      "Temporary restorations",
    ],
    models: [
      { name: "ODYX P1-26", tagline: "The dental printer — for the work that goes in the mouth", shopProductId: "printer-p1-26" },
    ],
    specs: [
      { label: "Printing Technology", value: "405 nm monochrome LCD" },
      { label: "XY Resolution", value: "18 µm" },
      { label: "Build Volume", value: "153 × 77 × 160 mm" },
      { label: "Max Print Speed", value: "60 mm/h" },
      { label: "Layer Thickness", value: "0.01 – 0.1 mm" },
      { label: "Screen", value: "6.8″ 9K monochrome LCD" },
    ],
    downloads: [
      { name: "Datasheets — available on request", type: "PDF", href: "/support" },
      { name: "Setup & calibration", type: "PDF", href: "/support#manuals" },
    ],
    benefits: [
      "18 µm X-Y accuracy",
      "Open material system",
      "Clinic-ready footprint",
      "ACF release film",
    ],
    stats: [
      {
        value: "18µm",
        label: "X-Y accuracy",
        desc: "Precision for definitive restorations.",
      },
      {
        value: "9K",
        label: "6.8″ LCD",
        desc: "8520 × 4320 monochrome screen.",
      },
      {
        value: "60",
        label: "mm/h",
        desc: "Quoted max print speed.",
      },
    ],
  },
  {
    slug: "curing-machines",
    name: "ODYX Cure",
    category: "Curing Machines",
    layout: "cinematic",
    tagline: "Powerful Curing. Perfect Results.",
    overview:
      "The ODYX Cure delivers uniform, reliable, and efficient curing for all your dental 3D printed applications.",
    img: "/img/cure-uv02/hero/machine-cutout.png?v=18",
    heroImg: "/img/cure-uv02/hero/machine-cutout.png?v=18",
    accent: "teal",
    workflowStep: "cure",
    applications: [
      "Crown & Bridge Resin",
      "Surgical Guide Pro materials",
      "Denture bases",
      "Model 2.0 Resin",
    ],
    models: [
      { name: "ODYX Cure", tagline: "Clinic and lab curing station", shopProductId: "curing-odyx-cure" },
    ],
    specs: [
      { label: "Light source", value: "Multi-angle LED array" },
      { label: "Wavelength", value: "385 nm + 405 nm" },
      { label: "Chamber heat", value: "Regulated ≤ 45°C" },
      { label: "Curing modes", value: "Material-validated presets" },
      { label: "Power", value: "110-240V" },
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
        value: "360°",
        label: "Matched light",
        desc: "Uniform exposure across the chamber.",
      },
      {
        value: "≤45°C",
        label: "Heat ceiling",
        desc: "Regulated chamber for clinical materials.",
      },
      {
        value: "1 tap",
        label: "Guided cycles",
        desc: "Material-specific presets for daily use.",
      },
    ],
  },
  {
    slug: "resins",
    name: "Resins",
    category: "Resin",
    layout: "cinematic",
    tagline: "Five clinical lines validated for the ODYX workflow.",
    overview:
      "Ceramic Resin 51%, Crown & Bridge, Temporary Restoration, Model 2.0 and Surgical Guide Pro — each with datasheets, cure profiles and safety documentation. The materials layer that makes the ecosystem clinically complete.",
    img: "/img/resins/all-resins-cutout.png",
    heroImg: "/img/resins/all-resins-cutout.png",
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
      { name: "Ceramic Resin 51%", tagline: "High-ceramic esthetic restorations" },
      {
        name: "Crown & Bridge Resin",
        tagline: "Long-term restorative",
        shopProductId: "resin-odyx",
      },
      { name: "Temporary Restoration Resin", tagline: "Fast provisionals" },
      { name: "Model 2.0 Resin", tagline: "Stable, accurate models" },
      { name: "Surgical Guide Pro Resin", tagline: "Guided surgery" },
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
        desc: "Ceramic 51%, Crown & Bridge, Temporary, Model 2.0 and Surgical Guide Pro.",
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
  {
    slug: "temporary-restoration-resin",
    name: "Temporary Restoration Resin",
    category: "Resin",
    layout: "classic",
    tagline: "Fast. Strong. Esthetic. Provisionals for crowns, bridges and long-span restorations.",
    overview:
      "ODYX Temporary Restoration Resin for temporary crowns, bridges and provisional restorations — strength, comfort and esthetics for chairside and lab workflows.",
    img: "/images/resin-hero-temporary-restoration-v2.png",
    heroImg: "/images/resin-hero-temporary-restoration-v2.png",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Temporary crowns",
      "Temporary bridges",
      "Long-span provisionals",
    ],
    models: [
      { name: "Temporary Restoration Resin", tagline: "Fast provisionals", shopProductId: "resin-odyx" },
    ],
    specs: [
      { label: "Hardness", value: "85–90 Shore D" },
      { label: "Flexural Strength", value: "100–140 MPa" },
      { label: "Tensile Strength", value: "65–85 MPa" },
      { label: "Water Absorption", value: "< 1.5 %" },
      { label: "Elongation at Break", value: "10–15 %" },
      { label: "Applicable Light Source", value: "385–405 nm" },
    ],
    downloads: [
      {
        name: "Product datasheet",
        type: "PDF",
        href: "/docs/resins/resin-flyer.pdf",
      },
    ],
    benefits: [
      "Excellent strength",
      "Comfortable wear",
      "Low shrinkage",
      "Multiple tooth shades",
    ],
  },
  {
    slug: "ceramic-crown-resin",
    name: "Ceramic Crown Resin",
    category: "Resin",
    layout: "classic",
    tagline: "Permanent strength. Natural esthetics. Crowns, inlays, onlays, veneers, bridges and denture teeth.",
    overview:
      "ODYX Ceramic Crown Resin for permanent single units and bridges — high hardness, low shrinkage, and natural tooth shades.",
    img: "/images/resin-hero-ceramic-crown-v2.png",
    heroImg: "/images/resin-hero-ceramic-crown-v2.png",
    accent: "teal",
    workflowStep: "print",
    applications: [
      "Crowns",
      "Inlays",
      "Onlays",
      "Veneers",
      "Bridges",
      "Denture teeth",
    ],
    models: [
      { name: "Ceramic Crown Resin", tagline: "Permanent restorations", shopProductId: "resin-odyx" },
    ],
    specs: [
      { label: "Hardness", value: "93–95 Shore D" },
      { label: "Flexural Strength", value: "110–140 MPa" },
      { label: "Tensile Strength", value: "70–80 MPa" },
      { label: "Heat Deflection Temperature", value: "100–110 °C" },
      { label: "Elongation at Break", value: "5–8 %" },
      { label: "Applicable Light Source", value: "385–405 nm" },
    ],
    downloads: [
      {
        name: "Product datasheet",
        type: "PDF",
        href: "/docs/resins/resin-flyer.pdf",
      },
    ],
    benefits: [
      "High hardness",
      "Low shrinkage",
      "Natural tooth shades",
      "385–405nm compatibility",
    ],
  },
  {
    slug: "crown-bridge-resin",
    name: "Crown & Bridge Resin",
    category: "Resin",
    layout: "classic",
    tagline: "Strong. Precise. Reliable. Crowns, bridges, veneers, inlays and onlays.",
    overview:
      "ODYX Crown & Bridge Resin for long-term restorations — high hardness, impact resistance, and excellent marginal accuracy.",
    img: "/images/resin-hero-crown-bridge-v2.png",
    heroImg: "/images/resin-hero-crown-bridge-v2.png",
    accent: "teal",
    workflowStep: "print",
    applications: ["Crowns", "Bridges", "Veneers", "Inlays", "Onlays"],
    models: [
      { name: "Crown & Bridge Resin", tagline: "Long-term restorations", shopProductId: "resin-odyx" },
    ],
    specs: [
      { label: "Hardness", value: "92–94 Shore D" },
      { label: "Flexural Strength", value: "140–160 MPa" },
      { label: "Tensile Strength", value: "80–90 MPa" },
      { label: "Heat Deflection Temperature", value: "100–110 °C" },
      { label: "Elongation at Break", value: "8–10 %" },
      { label: "Applicable Light Source", value: "385–405 nm" },
    ],
    downloads: [
      {
        name: "Product datasheet",
        type: "PDF",
        href: "/docs/resins/resin-flyer.pdf",
      },
    ],
    benefits: [
      "High hardness",
      "Impact resistant",
      "Excellent marginal accuracy",
      "Tooth shade options",
    ],
  },
  {
    slug: "model-resin",
    name: "Model Resin",
    category: "Resin",
    layout: "classic",
    tagline: "High Accuracy. Exceptional Detail. Diagnostic, working, prosthetic and thermoforming models.",
    overview:
      "ODYX Model Resin for high-accuracy dental models — smooth matte surface, low shrinkage, and fast printing.",
    img: "/images/resin-hero-model-v2.png",
    heroImg: "/images/resin-hero-model-v2.png",
    accent: "orange",
    workflowStep: "print",
    applications: [
      "Diagnostic models",
      "Working models",
      "Crown & bridge models",
      "Implant models",
      "Thermoforming models",
      "Clear aligner models",
    ],
    models: [
      { name: "Model Resin", tagline: "High-accuracy models", shopProductId: "resin-odyx" },
    ],
    specs: [
      { label: "Hardness", value: "85–90 Shore D" },
      { label: "Flexural Strength", value: "80–95 MPa" },
      { label: "Tensile Strength", value: "40–50 MPa" },
      { label: "Heat Deflection Temperature", value: "75–85 °C" },
      { label: "Elongation at Break", value: "10–15 %" },
      { label: "Applicable Light Source", value: "385–405 nm" },
    ],
    downloads: [
      {
        name: "Product datasheet",
        type: "PDF",
        href: "/docs/resins/resin-flyer.pdf",
      },
    ],
    benefits: [
      "High dimensional accuracy",
      "Smooth matte surface",
      "Excellent detail reproduction",
      "Fast printing",
    ],
  },
  {
    slug: "surgical-guide-resin-pro",
    name: "Surgical Guide Resin Pro",
    category: "Resin",
    layout: "classic",
    tagline: "Confidence in every implant surgery. Highly transparent biocompatible resin for accurate surgical guides.",
    overview:
      "ODYX Surgical Guide Resin Pro — transparent, sterilizable, and biocompatible for implant surgical guides.",
    img: "/images/resin-hero-surgical-guide-pro-v2.png",
    heroImg: "/images/resin-hero-surgical-guide-pro-v2.png",
    accent: "teal",
    workflowStep: "print",
    applications: ["Implant guides", "Surgical templates", "Orthopedic guides"],
    models: [
      { name: "Surgical Guide Resin Pro", tagline: "Transparent guides", shopProductId: "resin-odyx" },
    ],
    specs: [
      { label: "Transparency", value: "High" },
      { label: "Hardness", value: "75–80 Shore D" },
      { label: "Flexural Strength", value: ">40 MPa" },
      { label: "Elongation at Break", value: "110–140 %" },
      { label: "Sterilization Temperature", value: "135 °C" },
      { label: "Applicable Light Source", value: "385–405 nm" },
    ],
    downloads: [
      {
        name: "Product datasheet",
        type: "PDF",
        href: "/docs/resins/resin-flyer.pdf",
      },
    ],
    benefits: [
      "High transparency",
      "Sterilizable up to 135°C",
      "Excellent flexibility",
      "Biocompatible",
    ],
  },
];

/** Sitemap product family order */
export const PRODUCT_CATEGORY_ORDER = [
  'Intraoral Scanner',
  'Digital Products',
  '3D Printers',
  'Curing Machines',
  'Resin',
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
