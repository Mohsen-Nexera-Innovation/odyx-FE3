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
        href: "/about#who-we-are",
        desc: "Our story and what drives us",
      },
      {
        label: "Vision & Mission",
        href: "/about#vision-mission",
        desc: "Where we are headed",
      },
      {
        label: "Values & Beliefs",
        href: "/about#values",
        desc: "The principles behind ODYX",
      },
      {
        label: "Our Team",
        href: "/about#team",
        desc: "The people building ODYX",
      },
      {
        label: "News",
        href: "/#news",
        desc: "Latest announcements and press",
      },
    ],
    columns: [
      {
        title: "Company",
        href: "/about",
        items: [
          {
            label: "Who We Are",
            href: "/about#who-we-are",
            desc: "Our story and what drives us",
          },
          {
            label: "Vision & Mission",
            href: "/about#vision-mission",
            desc: "Where we are headed",
          },
          {
            label: "Values & Beliefs",
            href: "/about#values",
            desc: "The principles behind ODYX",
          },
        ],
      },
      {
        title: "People & News",
        items: [
          {
            label: "Our Team",
            href: "/about#team",
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
      {
        label: "Intraoral Scanner",
        href: "/products/intraoral-scanner",
        desc: "ODYX-S1",
      },
      {
        label: "Digital Products",
        href: "/products/design",
        desc: "Design software",
      },
      {
        label: "3D Printers",
        href: "/products/3d-printers",
        desc: "ODYX P1-26",
      },
      {
        label: "Curing Machines",
        href: "/products/curing-machines",
        desc: "ODYX Cure",
      },
      {
        label: "Resins",
        href: "/products/Resin",
        desc: "Clinical resin lines",
      },
    ],
    columns: [
      {
        title: "Intraoral Scanner",
        href: "/products/intraoral-scanner",
        items: [
          {
            label: "ODYX-S1",
            href: "/products/intraoral-scanner",
            desc: "Chairside 3D impressions in seconds",
          },
        ],
      },
      {
        title: "3D Printing",
        href: "/products",
        groups: [
          {
            label: "Printers",
            items: [
              {
                label: "ODYX P1-26",
                href: "/products/3d-printers",
                desc: "Desktop production for clinic and lab",
              },
            ],
          },
          {
            label: "Curing",
            items: [
              {
                label: "ODYX Cure",
                href: "/products/curing-machines",
                desc: "Validated light dose every time",
              },
            ],
          },
          {
            label: "Resins",
            items: [
              {
                label: "Resin lines",
                href: "/products/Resin",
                desc: "Five clinical lines, workflow-validated",
              },
            ],
          },
        ],
      },
      {
        title: "Digital Products",
        href: "/products/design",
        items: [
          {
            label: "Design Software",
            href: "/products/design",
            desc: "CAD built for ODYX print parameters",
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
        title: "Workflow",
        items: [
          {
            label: "Hub overview",
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
        href: "/learning#beginner",
        desc: "Guided onboarding track",
      },
      {
        label: "Clinical Courses",
        href: "/learning#courses",
        desc: "Deep-dive training",
      },
      {
        label: "Articles",
        href: "/learning#articles",
        desc: "Tips, guides and insights",
      },
      {
        label: "Videos & Tutorials",
        href: "/learning#videos",
        desc: "Watch and follow along",
      },
      {
        label: "ROI Calculator",
        href: "/roi",
        desc: "Full ecosystem — scanner, printer & cure",
      },
    ],
    columns: [
      {
        title: "Paths",
        href: "/learning",
        items: [
          {
            label: "Beginner Path",
            href: "/learning#beginner",
            desc: "Guided onboarding track",
          },
          {
            label: "Clinical Courses",
            href: "/learning#courses",
            desc: "Deep-dive training",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            label: "Articles",
            href: "/learning#articles",
            desc: "Tips, guides and insights",
          },
          {
            label: "Videos & Tutorials",
            href: "/learning#videos",
            desc: "Watch and follow along",
          },
          {
            label: "ROI Calculator",
            href: "/roi",
            desc: "Full ecosystem — scanner, printer & cure",
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
        label: "Product Manuals",
        href: "/support#manuals",
        desc: "Guides and datasheets",
      },
      {
        label: "Troubleshooting",
        href: "/support#troubleshooting",
        desc: "Fix common issues",
      },
      {
        label: "Software Updates",
        href: "/support#updates",
        desc: "Latest firmware and apps",
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
        label: "Community",
        href: "/support#community",
        desc: "Connect with other users",
      },
      {
        label: "Live Chat",
        href: "/support#chat",
        desc: "Talk to our team now",
      },
    ],
    columns: [
      {
        title: "Help",
        href: "/support",
        items: [
          { label: "Support Hub", href: "/support", desc: "Get help fast" },
          {
            label: "Product Manuals",
            href: "/support#manuals",
            desc: "Guides and datasheets",
          },
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
        title: "Service",
        items: [
          {
            label: "Software Updates",
            href: "/support#updates",
            desc: "Latest firmware and apps",
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
            label: "Community",
            href: "/support#community",
            desc: "Connect with other users",
          },
        ],
      },
    ],
  },
];
