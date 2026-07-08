export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}
export interface NavGroup {
  label: string;
  href: string;
  items: NavLink[];
}

export const HEADER_MENUS: NavGroup[] = [
  {
    label: "About ODYX",
    href: "/about",
    items: [
      {
        label: "Who We Are",
        href: "/about",
        desc: "Our story and what drives us",
      },
      {
        label: "Vision & Mission",
        href: "/about",
        desc: "Where we are headed",
      },
      {
        label: "Values & Beliefs",
        href: "/about",
        desc: "The principles behind ODYX",
      },
      {
        label: "Why ODYX",
        href: "/#why",
        desc: "What sets our ecosystem apart",
      },
      { label: "Our Team", href: "/about", desc: "The people building ODYX" },
      { label: "News", href: "/#news", desc: "Latest announcements and press" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      {
        label: "Products Overview",
        href: "/products",
        desc: "The full connected lineup",
      },
      {
        label: "Intraoral Scanners",
        href: "/products/intraoral-scanner",
        desc: "Fast, accurate digital impressions",
      },
      {
        label: "Design Software",
        href: "/products/design",
        desc: "Model and plan every case",
      },
      {
        label: "3D Printers",
        href: "/products/3d-printers",
        desc: "Desktop production for clinic and lab",
      },
      {
        label: "Curing Machines",
        href: "/products/curing-machines",
        desc: "Perfect post-processing cures",
      },
      {
        label: "Resin",
        href: "/products/Resin",
        desc: "Certified dental materials",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/dentists",
    items: [
      {
        label: "For Dentists",
        href: "/solutions/dentists",
        desc: "Same-day chairside dentistry",
      },
      {
        label: "For Dental Labs",
        href: "/solutions/labs",
        desc: "Scale production with confidence",
      },
      {
        label: "Clinical Applications",
        href: "/#clinical",
        desc: "Crowns, aligners, guides and more",
      },
      {
        label: "Solutions Overview",
        href: "/solutions/dentists",
        desc: "Find the right fit for you",
      },
    ],
  },
  {
    label: "Workflows",
    href: "/workflows",
    items: [
      {
        label: "Workflow Hub",
        href: "/workflows",
        desc: "The end-to-end digital flow",
      },
      {
        label: "Scan",
        href: "/workflows/scan",
        desc: "Capture the patient in minutes",
      },
      {
        label: "Design",
        href: "/workflows/design",
        desc: "Plan the restoration",
      },
      {
        label: "Print",
        href: "/workflows/print",
        desc: "Produce with precision",
      },
      {
        label: "Cure",
        href: "/workflows/cure",
        desc: "Finalize material properties",
      },
      { label: "Finish", href: "/workflows/finish", desc: "Polish and refine" },
      {
        label: "Deliver",
        href: "/workflows/deliver",
        desc: "Seat the final result",
      },
    ],
  },
  {
    label: "Learning",
    href: "/learning",
    items: [
      {
        label: "Learning Center",
        href: "/learning",
        desc: "Everything to get started",
      },
      {
        label: "Beginner Path",
        href: "/learning",
        desc: "Guided onboarding track",
      },
      {
        label: "Clinical Courses",
        href: "/learning",
        desc: "Deep-dive training",
      },
      {
        label: "Articles",
        href: "/learning",
        desc: "Tips, guides and insights",
      },
      {
        label: "Videos & Tutorials",
        href: "/learning",
        desc: "Watch and follow along",
      },
    ],
  },
  {
    label: "Support",
    href: "/support",
    items: [
      { label: "Support Hub", href: "/support", desc: "Get help fast" },
      {
        label: "Troubleshooting",
        href: "/support#troubleshooting",
        desc: "Fix common issues",
      },
      {
        label: "Product Manuals",
        href: "/support#manuals",
        desc: "Guides and datasheets",
      },
      {
        label: "Software Updates",
        href: "/support#updates",
        desc: "Latest firmware and apps",
      },
      {
        label: "Knowledge Base",
        href: "/support#educate",
        desc: "Searchable how-tos",
      },
      {
        label: "Warranty & Service",
        href: "/support#warranty",
        desc: "Coverage and repairs",
      },
      {
        label: "Register Device",
        href: "/#register",
        desc: "Activate your warranty",
      },
      {
        label: "Live Chat",
        href: "/support#chat",
        desc: "Talk to our team now",
      },
    ],
  },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Scanners", href: "/products/intraoral-scanner" },
      { label: "3D Printers", href: "/products/3d-printers" },
      { label: "Curing", href: "/products/curing-machines" },
      { label: "Resin", href: "/products/Resin" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Dentists", href: "/solutions/dentists" },
      { label: "Labs", href: "/solutions/labs" },
      { label: "Clinical", href: "/#clinical" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Academy", href: "/learning" },
      { label: "Workflows", href: "/workflows" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Sign in", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Contact", href: "/support" },
    ],
  },
];
