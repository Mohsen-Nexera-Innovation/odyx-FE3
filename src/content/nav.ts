export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}

/** Nested group inside a mega column (e.g. "3D Printers") */
export interface MegaGroup {
  label?: string;
  items: NavLink[];
}

/** SprintRay-style mega column */
export interface MegaColumn {
  title: string;
  href?: string;
  groups?: MegaGroup[];
  items?: NavLink[];
}

export interface MegaFeatured {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items: NavLink[];
  /** Full-width multi-column mega (SprintRay-inspired) */
  columns?: MegaColumn[];
  featured?: MegaFeatured;
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
    columns: [
      {
        title: "Company",
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
        ],
      },
      {
        title: "Explore",
        items: [
          {
            label: "Why ODYX",
            href: "/#why",
            desc: "What sets our ecosystem apart",
          },
          {
            label: "Our Team",
            href: "/about",
            desc: "The people building ODYX",
          },
          {
            label: "News",
            href: "/#news",
            desc: "Latest announcements and press",
          },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "All Products", href: "/products", desc: "Full ODYX lineup" },
      { label: "ODYX P1-26", href: "/products/3d-printers" },
      { label: "ODYX-S1", href: "/products/intraoral-scanner" },
      { label: "Design Software", href: "/products/design" },
      { label: "ODYX Cure", href: "/products/curing-machines" },
      { label: "Resin", href: "/products/Resin" },
      { label: "Design Services", href: "/design-services" },
      { label: "Store", href: "/shop" },
    ],
    columns: [
      {
        title: "3D Printing Products",
        href: "/products",
        groups: [
          {
            label: "Dental 3D Printers",
            items: [
              {
                label: "ODYX P1-26",
                href: "/products/3d-printers",
                desc: "Desktop production for clinic and lab",
              },
            ],
          },
          {
            label: "Post-Processing",
            items: [
              {
                label: "ODYX Cure",
                href: "/products/curing-machines",
                desc: "Validated light dose every time",
              },
            ],
          },
          {
            label: "Scanners",
            items: [
              {
                label: "ODYX-S1",
                href: "/products/intraoral-scanner",
                desc: "Chairside 3D impressions in seconds",
              },
            ],
          },
        ],
      },
      {
        title: "Software & Materials",
        groups: [
          {
            label: "Design",
            items: [
              {
                label: "Design Software",
                href: "/products/design",
                desc: "CAD built for ODYX print parameters",
              },
            ],
          },
          {
            label: "Materials",
            items: [
              {
                label: "Resin",
                href: "/products/Resin",
                desc: "Five clinical lines, workflow-validated",
              },
            ],
          },
        ],
      },
      {
        title: "Services",
        items: [
          {
            label: "Design Services",
            href: "/design-services",
            desc: "On-demand design, delivered as STL",
          },
          {
            label: "Store",
            href: "/shop",
            desc: "Order materials and accessories",
          },
          {
            label: "All Products",
            href: "/products",
            desc: "Explore the full ODYX ecosystem",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Flagship",
      title: "ODYX P1-26",
      desc: "The dental production workhorse — validated profiles for crowns, guides, models and more.",
      href: "/products/3d-printers",
      cta: "Explore P1-26",
    },
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
    columns: [
      {
        title: "By Role",
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
        ],
      },
      {
        title: "Applications",
        items: [
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
    columns: [
      {
        title: "Overview",
        items: [
          {
            label: "Workflow Hub",
            href: "/workflows",
            desc: "The end-to-end digital flow",
          },
        ],
      },
      {
        title: "Steps",
        groups: [
          {
            items: [
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
            ],
          },
        ],
      },
      {
        title: "Finish & Deliver",
        items: [
          {
            label: "Cure",
            href: "/workflows/cure",
            desc: "Finalize material properties",
          },
          {
            label: "Finish",
            href: "/workflows/finish",
            desc: "Polish and refine",
          },
          {
            label: "Deliver",
            href: "/workflows/deliver",
            desc: "Seat the final result",
          },
        ],
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
      {
        label: "ROI Calculator",
        href: "/roi",
        desc: "Full ecosystem — scanner, printer & cure",
      },
      {
        label: "P1-26 product ROI",
        href: "/products/3d-printers#roi",
        desc: "Printer-focused ROI on the P1-26 page",
      },
    ],
    columns: [
      {
        title: "Learning Center",
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
        ],
      },
      {
        title: "Resources",
        items: [
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
        title: "Tools",
        items: [
          {
            label: "ROI Calculator",
            href: "/roi",
            desc: "Full ecosystem — scanner, printer & cure",
          },
          {
            label: "P1-26 product ROI",
            href: "/products/3d-printers#roi",
            desc: "Printer-focused ROI on the P1-26 page",
          },
        ],
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
    columns: [
      {
        title: "Get Help",
        href: "/support",
        items: [
          { label: "Support Hub", href: "/support", desc: "Get help fast" },
          {
            label: "Troubleshooting",
            href: "/support#troubleshooting",
            desc: "Fix common issues",
          },
          {
            label: "Live Chat",
            href: "/support#chat",
            desc: "Talk to our team now",
          },
        ],
      },
      {
        title: "Documentation",
        items: [
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
        ],
      },
      {
        title: "Service",
        items: [
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
        ],
      },
    ],
  },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "ODYX P1-26", href: "/products/3d-printers" },
      { label: "ODYX-S1", href: "/products/intraoral-scanner" },
      { label: "Design Software", href: "/products/design" },
      { label: "ODYX Cure", href: "/products/curing-machines" },
      { label: "Resin", href: "/products/Resin" },
      { label: "Store", href: "/shop" },
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
      { label: "ROI Calculator", href: "/roi" },
      { label: "P1-26 product ROI", href: "/products/3d-printers#roi" },
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
