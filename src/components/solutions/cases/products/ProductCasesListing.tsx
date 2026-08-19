'use client';

import ClinicalCasesBrowseListing from '@/components/solutions/cases/ClinicalCasesBrowseListing';
import {
  PRODUCT_FAMILY_META,
  PRODUCT_FAMILY_SLUGS,
  filterProductCases,
  productCaseCardHref,
  productCasesPath,
  type ProductCaseCard,
  type ProductCaseFamily,
  type ProductFamilySlug,
} from '@/content/product-cases';

const TABS: { id: ProductCaseFamily; label: string }[] = [
  { id: 'all', label: 'All' },
  ...PRODUCT_FAMILY_SLUGS.map((id) => ({ id, label: PRODUCT_FAMILY_META[id].label })),
];

type Props = {
  cases: ProductCaseCard[];
  family: ProductCaseFamily;
};

export default function ProductCasesListing({ cases, family }: Props) {
  return (
    <ClinicalCasesBrowseListing<ProductFamilySlug>
      cases={cases}
      activeId={family}
      tabs={TABS}
      pathFor={productCasesPath}
      sectionTitle={(id) => `${PRODUCT_FAMILY_META[id].label} cases`}
      filterItems={filterProductCases}
      cardHref={productCaseCardHref}
      tablistLabel="Product families"
    />
  );
}
