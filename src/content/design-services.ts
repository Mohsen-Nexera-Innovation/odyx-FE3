import type { CaseIndication } from '@/content/inbox';
import type { ShopProduct } from '@/content/shop';

/** Design-as-a-service SKUs (dummy EGP prices; mirrored in API seed). */
export type DesignServiceSlug =
  | 'design-single-unit'
  | 'design-dsd-veneers'
  | 'design-rpd'
  | 'design-occlusal-splint'
  | 'design-surgical-guide';

export const DESIGN_SERVICE_INDICATION: Record<DesignServiceSlug, CaseIndication> = {
  'design-single-unit': 'single_unit',
  'design-dsd-veneers': 'digital_smile_design',
  'design-rpd': 'removable_partial_denture',
  'design-occlusal-splint': 'occlusal_splint',
  'design-surgical-guide': 'surgical_guide',
};

export const DESIGN_SERVICES: ShopProduct[] = [
  {
    id: 'design-single-unit',
    slug: 'design-single-unit',
    name: 'Single Unit',
    desc: 'Digital design for crown, overlay, or endocrown — upload your scan after checkout.',
    price: 150,
    image: '/img/crowns.jpg',
    category: 'design',
    unit: 'per unit',
    href: '/design-services',
    highlights: ['Crown / overlay / endocrown', 'Digital delivery', 'Inbox handoff'],
  },
  {
    id: 'design-dsd-veneers',
    slug: 'design-dsd-veneers',
    name: 'Digital Smile Design (Veneers)',
    desc: 'Full smile design workflow for veneer cases — aesthetic planning delivered digitally.',
    price: 800,
    image: '/img/ortho.jpg',
    category: 'design',
    unit: 'per case',
    href: '/design-services',
    highlights: ['Veneer smile design', 'Digital delivery', 'Inbox handoff'],
  },
  {
    id: 'design-rpd',
    slug: 'design-rpd',
    name: 'Removable Partial Denture',
    desc: 'Design service for removable partial dentures from your intraoral or model scan.',
    price: 500,
    image: '/img/denture.jpg',
    category: 'design',
    unit: 'per case',
    href: '/design-services',
    highlights: ['RPD framework design', 'Digital delivery', 'Inbox handoff'],
  },
  {
    id: 'design-occlusal-splint',
    slug: 'design-occlusal-splint',
    name: 'Occlusal Splint',
    desc: 'Occlusal / night-guard design from your scan — ready for print after delivery.',
    price: 250,
    image: '/img/temp.jpg',
    category: 'design',
    unit: 'per case',
    href: '/design-services',
    highlights: ['Splint design', 'Digital delivery', 'Inbox handoff'],
  },
  {
    id: 'design-surgical-guide',
    slug: 'design-surgical-guide',
    name: 'Surgical Guide',
    desc: 'Implant surgical guide design from CBCT and intraoral scans.',
    price: 400,
    image: '/img/implant.jpg',
    category: 'design',
    unit: 'per case',
    href: '/design-services',
    highlights: ['Guide design', 'Digital delivery', 'Inbox handoff'],
  },
];

export function getDesignServiceById(id: string): ShopProduct | undefined {
  return DESIGN_SERVICES.find((p) => p.id === id || p.slug === id);
}

export function isDesignServiceSlug(v: string | null | undefined): v is DesignServiceSlug {
  return (
    v === 'design-single-unit' ||
    v === 'design-dsd-veneers' ||
    v === 'design-rpd' ||
    v === 'design-occlusal-splint' ||
    v === 'design-surgical-guide'
  );
}

export function indicationFromServiceSlug(
  slug: string | null | undefined,
): CaseIndication | null {
  if (!isDesignServiceSlug(slug)) return null;
  return DESIGN_SERVICE_INDICATION[slug];
}

const INDICATION_TO_SLUG = Object.fromEntries(
  (Object.entries(DESIGN_SERVICE_INDICATION) as [DesignServiceSlug, CaseIndication][]).map(
    ([slug, indication]) => [indication, slug],
  ),
) as Partial<Record<CaseIndication, DesignServiceSlug>>;

export function serviceSlugFromIndication(
  indication: CaseIndication,
): DesignServiceSlug | null {
  return INDICATION_TO_SLUG[indication] ?? null;
}

export function getDesignServiceByIndication(
  indication: CaseIndication,
): ShopProduct | undefined {
  const slug = serviceSlugFromIndication(indication);
  return slug ? getDesignServiceById(slug) : undefined;
}

/** Catalog price for an unpaid inbox design request (0 for support / other). */
export function quoteDesignIndication(indication: CaseIndication): number {
  return getDesignServiceByIndication(indication)?.price ?? 0;
}
