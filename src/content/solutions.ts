export interface SolutionPath {
  slug: "dentists" | "labs";
  title: string;
  eyebrow: string;
  lead: string;
  img: string;
  accent: "teal" | "orange";
  challenges: string[];
  recommendedProducts: {
    name: string;
    href: string;
    why: string;
    img: string;
  }[];
  workflowEmphasis: string[];
  outcomes: { stat: string; label: string }[];
  cases: { title: string; href: string }[];
  training: { label: string; href: string }[];
}

export const SOLUTION_PATHS: SolutionPath[] = [
  {
    slug: "dentists",
    title: "Digital dentistry for the clinic",
    eyebrow: "For Dentists",
    lead: "Same-day restorations, implant guides and chairside workflows - without the complexity.",
    img: "/img/paths/dentist.jpg",
    accent: "teal",
    challenges: [
      "Patients expect faster turnaround and fewer appointments",
      "Traditional impressions are uncomfortable and slow",
      "Disconnected devices create compatibility risk",
      "Team needs training, not just hardware",
    ],
    recommendedProducts: [
      {
        name: "ODYX-S1",
        href: "/products/intraoral-scanner",
        why: "Start digital with chairside scans",
        img: "/img/feat-scanner.jpg",
      },
      {
        name: "Design Software",
        href: "/products/design",
        why: "Design crowns and guides in-house",
        img: "/img/odyx/design.webp",
      },
      {
        name: "ODYX P1-26",
        href: "/products/3d-printers",
        why: "Print provisionals and finals same-day",
        img: "/img/feat-printer.jpg",
      },
      {
        name: "ODYX Cure",
        href: "/products/curing-machines",
        why: "Validated cure for safe delivery",
        img: "/img/feat-curing.jpg",
      },
      {
        name: "Clinical Resin",
        href: "/products/Resin",
        why: "Materials matched to each indication",
        img: "/img/feat-resin.jpg",
      },
    ],
    workflowEmphasis: [
      "Scan chairside",
      "Design while patient waits",
      "Print & cure in-clinic",
      "Deliver same visit",
    ],
    outcomes: [
      { stat: "1", label: "Visit potential for many cases" },
      { stat: "99", label: "% target first-fit accuracy" },
      { stat: "24/7", label: "Support when you need it" },
    ],
    cases: [
      { title: "Same-day posterior crown", href: "/cases" },
      { title: "Chairside surgical guide", href: "/cases" },
    ],
    training: [
      { label: "Beginner clinic path", href: "/learning" },
      { label: "Book hands-on training", href: "/support" },
    ],
  },
  {
    slug: "labs",
    title: "Production-ready digital lab workflow",
    eyebrow: "For Dental Labs",
    lead: "Throughput, accuracy and validated materials - from scan intake to shipped restoration.",
    img: "/img/paths/lab.jpg",
    accent: "orange",
    challenges: [
      "Margins pressure requires faster production cycles",
      "Remakes erode profit and client trust",
      "Multiple vendor stacks are hard to support",
      "Materials must be traceable and consistent",
    ],
    recommendedProducts: [
      {
        name: "Design Software",
        href: "/products/design",
        why: "Batch design and nesting",
        img: "/img/odyx/design.webp",
      },
      {
        name: "ODYX P1-26",
        href: "/products/3d-printers",
        why: "High-volume print capacity",
        img: "/img/feat-printer.jpg",
      },
      {
        name: "ODYX Cure",
        href: "/products/curing-machines",
        why: "QA-friendly cure profiles",
        img: "/img/feat-curing.jpg",
      },
      {
        name: "Resin & Materials",
        href: "/products/Resin",
        why: "Full indication coverage",
        img: "/img/feat-resin.jpg",
      },
    ],
    workflowEmphasis: [
      "Intake digital files",
      "Design at scale",
      "Print production runs",
      "Finish, QC and ship",
    ],
    outcomes: [
      { stat: "6", label: "Connected workflow steps" },
      { stat: "5", label: "Clinical resin lines" },
      { stat: "Fewer", label: "Remakes with validated chain" },
    ],
    cases: [
      { title: "Full-arch production run", href: "/cases" },
      { title: "Implant guide batch", href: "/cases" },
    ],
    training: [
      { label: "Lab production courses", href: "/learning/courses" },
      { label: "Talk to a lab specialist", href: "/support" },
    ],
  },
];

export function getSolution(slug: string) {
  return SOLUTION_PATHS.find((s) => s.slug === slug);
}
