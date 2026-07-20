export type ShopCategory = 'scanner' | 'printer' | 'curing' | 'resin' | 'design';

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  desc: string;
  /** Unit price in EGP */
  price: number;
  image: string;
  category: ShopCategory;
  unit?: string;
  /** Product detail page path */
  href?: string;
  /** Short feature chips shown on store cards */
  highlights?: string[];
};

/** Display labels for shop category filters and card badges */
export const SHOP_CATEGORY_LABEL: Record<ShopCategory, string> = {
  scanner: 'Scanner',
  printer: 'Printer',
  curing: 'Curing Machine',
  resin: 'Resin',
  design: 'Design service',
};

export const SHOP_CATEGORIES: { id: ShopCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'printer', label: SHOP_CATEGORY_LABEL.printer },
  { id: 'curing', label: SHOP_CATEGORY_LABEL.curing },
  { id: 'scanner', label: SHOP_CATEGORY_LABEL.scanner },
  { id: 'resin', label: SHOP_CATEGORY_LABEL.resin },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'printer-p1-26',
    slug: 'odyx-p1-26',
    name: 'ODYX P1-26',
    desc: 'Desktop 3D printer for chairside and lab production — crowns, guides, models and dentures with validated resin profiles.',
    price: 4999,
    image: '/img/feat-printer.jpg',
    category: 'printer',
    unit: '1 unit',
    href: '/products/3d-printers',
    highlights: ['Chairside ready', 'Validated resins', 'In-house production'],
  },
  {
    id: 'curing-odyx-cure',
    slug: 'odyx-cure',
    name: 'ODYX Cure',
    desc: 'Standard clinic and lab curing unit with resin-specific presets for consistent, biocompatible outcomes.',
    price: 2499,
    image: '/img/feat-curing.jpg',
    category: 'curing',
    unit: '1 unit',
    href: '/products/curing-machines',
    highlights: ['Resin presets', 'Full strength', 'Biocompatible'],
  },
  {
    id: 'scanner-s1',
    slug: 'odyx-s1',
    name: 'ODYX-S1',
    desc: 'Intraoral scanner for full-arch color impressions with real-time mesh preview and open STL / PLY / OBJ export.',
    price: 8999,
    image: '/img/feat-scanner.jpg',
    category: 'scanner',
    unit: '1 unit',
    href: '/products/intraoral-scanner',
    highlights: ['Full-arch color', 'Open export', 'Real-time mesh'],
  },
  {
    id: 'resin-odyx',
    slug: 'odyx-resin',
    name: 'ODYX Resin',
    desc: 'Clinical resin lines for permanent crowns, ceramic aesthetics, provisionals, models and surgical guides — validated for ODYX print and cure.',
    price: 899,
    image: '/img/feat-resin.jpg',
    category: 'resin',
    unit: '1 bottle',
    href: '/products/Resin',
    highlights: ['5 clinical lines', 'Workflow-validated', 'Biocompatible'],
  },
];

export const FREE_SHIPPING_THRESHOLD = 5000;
export const FLAT_SHIPPING_EGP = 150;

export function getProductById(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function formatMoney(amount: number, currency: 'EGP' = 'EGP'): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function calcShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_EGP;
}

/** Category order for grouped "All" views */
export const SHOP_CATEGORY_ORDER: ShopCategory[] = [
  'printer',
  'curing',
  'scanner',
  'resin',
];

export function groupShopProducts(
  products: ShopProduct[],
): { category: ShopCategory; label: string; items: ShopProduct[] }[] {
  return SHOP_CATEGORY_ORDER.map((category) => ({
    category,
    label: SHOP_CATEGORY_LABEL[category],
    items: products.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0);
}
