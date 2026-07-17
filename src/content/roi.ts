import { SHOP_PRODUCTS } from '@/content/shop';

function shopPrice(slug: string): number {
  return SHOP_PRODUCTS.find((p) => p.slug === slug)?.price ?? 0;
}

export type RoiScope = 'printer' | 'ecosystem';

export const ROI_SCANNER = {
  key: 'scanner' as const,
  productId: 'scanner-s1',
  name: 'ODYX-S1',
  price: shopPrice('odyx-s1'),
  href: '/products/intraoral-scanner',
};

export const ROI_PRINTER = {
  key: 'printer' as const,
  productId: 'printer-p1-26',
  name: 'ODYX P1-26',
  price: shopPrice('odyx-p1-26'),
  href: '/products/3d-printers',
};

export const ROI_CURING = {
  key: 'curing' as const,
  productId: 'curing-odyx-cure',
  name: 'ODYX Cure',
  price: shopPrice('odyx-cure'),
  href: '/products/curing-machines',
};

export const ROI_ECOSYSTEM_BUNDLE = [ROI_SCANNER, ROI_PRINTER, ROI_CURING] as const;

/** Typical mill / lab capital reference used in the sales pitch (EGP). */
export const ROI_MILL_REFERENCE_EGP = 1_000_000;

export type RoiDefaults = {
  monthlyCrowns: number;
  labFeePerCrown: number;
  resinCostPerCrown: number;
  visitsSavedPerCrown: number;
  costPerAvoidedVisit: number;
  patientFeePerCrown: number;
  includeScanner: boolean;
  includePrinter: boolean;
  includeCuring: boolean;
};

export const ROI_DEFAULTS: RoiDefaults = {
  monthlyCrowns: 30,
  labFeePerCrown: 1500,
  resinCostPerCrown: 200,
  visitsSavedPerCrown: 1,
  costPerAvoidedVisit: 250,
  patientFeePerCrown: 3500,
  includeScanner: true,
  includePrinter: true,
  includeCuring: true,
};

export const ROI_PILLARS_PRINTER = [
  {
    id: 'lab-fee',
    title: 'Lab fee elimination',
    stat: 'Keep the markup',
    body: 'Every outsourced crown pays the lab twice — once for production, again for their margin. Print on the P1-26 and that fee stays in your clinic.',
  },
  {
    id: 'time',
    title: 'Time efficiency',
    stat: 'Fewer visits',
    body: 'Same-day print and seat. Cut courier waits, remake loops, and second appointments so chair time goes to productive dentistry.',
  },
  {
    id: 'materials',
    title: 'Material cost reduction',
    stat: 'Lower per-visit spend',
    body: 'Skip the recall visit and you skip another round of anesthesia and disposables — real savings on every crown you print in-house.',
  },
  {
    id: 'integration',
    title: 'Seamless integration',
    stat: 'Scanner + print + cure',
    body: 'You already scan. Add P1-26 and Cure to close the digital loop — no million-EGP mill, no new ecosystem rebuild.',
  },
] as const;

export const ROI_PILLARS_ECOSYSTEM = [
  {
    id: 'lab-fee',
    title: 'Lab fee elimination',
    stat: 'Keep the markup',
    body: 'Bring scanning, printing, and curing in-house so lab markups leave your P&L — not your patients.',
  },
  {
    id: 'time',
    title: 'Time efficiency',
    stat: 'Fewer visits',
    body: 'One connected workflow from scan to seat. Shorter chair time, fewer courier waits, more same-day cases.',
  },
  {
    id: 'materials',
    title: 'Material cost reduction',
    stat: 'Lower per-visit spend',
    body: 'Digital impressions and in-house production cut disposables, remakes, and the cost of every avoided visit.',
  },
  {
    id: 'integration',
    title: 'Full ODYX stack',
    stat: 'Scan · print · cure',
    body: 'ODYX-S1 + P1-26 + Cure as one ecosystem — open formats, validated materials, and a clear path to payback.',
  },
] as const;

/** @deprecated use ROI_PILLARS_PRINTER */
export const ROI_PILLARS = ROI_PILLARS_PRINTER;

export const ROI_COPY_BY_SCOPE = {
  printer: {
    title: 'ODYX P1-26 ROI Calculator',
    lead: 'Cost & profit of printing crowns in-house',
    pitchHeadline: 'Calculate your profit with the P1-26',
    digitalLabel: 'P1-26',
    resultsDigital: 'Profit with P1-26',
    costDigital: 'Cost with P1-26',
  },
  ecosystem: {
    title: 'ODYX Ecosystem ROI Calculator',
    lead: 'Cost & profit of the full digital dentistry workflow',
    pitchHeadline: 'Calculate your profit with the ODYX stack',
    digitalLabel: 'ODYX',
    resultsDigital: 'Profit with ODYX',
    costDigital: 'Cost with ODYX',
  },
} as const;

export const ROI_COPY = {
  title: ROI_COPY_BY_SCOPE.printer.title,
  lead: ROI_COPY_BY_SCOPE.printer.lead,
  pitchHeadline: ROI_COPY_BY_SCOPE.printer.pitchHeadline,
  disclaimer:
    'Estimates only — not a formal financial offer. Results vary by case mix, resin, and utilization.',
  labels: {
    stepCases: 'Add number of cases',
    stepFee: 'Add fee per patient',
    stepCosts: 'Lab vs in-house costs',
    stepInvest: 'Your investment',
    monthlyCrowns: 'Monthly crown & bridge cases',
    patientFeePerCrown: 'Patient fee / case',
    labFeePerCrown: 'Lab fee / case (outsourced)',
    resinCostPerCrown: 'Resin + finishing / case (in-house)',
    visitsSavedPerCrown: 'Visits saved / case',
    costPerAvoidedVisit: 'Anesthesia + disposables / avoided visit',
    investmentOverride: 'Investment override (optional)',
  },
  results: {
    breakEven: 'Break even',
    profitMonth: 'Gross profit increase / month',
    profitYear: 'Gross profit increase / year',
    revenueCompare: 'Revenue & cost comparison',
    profitAnalog: 'Profit with lab',
    costAnalog: 'Cost with lab',
  },
} as const;
