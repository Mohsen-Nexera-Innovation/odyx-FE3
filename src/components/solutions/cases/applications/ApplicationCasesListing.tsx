'use client';

import ClinicalCasesBrowseListing from '@/components/solutions/cases/ClinicalCasesBrowseListing';
import {
  APPLICATION_CASE_META,
  APPLICATION_CASE_SLUGS,
  applicationCaseCardHref,
  applicationCasesPath,
  filterApplicationCases,
  type ApplicationCaseFamily,
  type ApplicationCaseSlug,
} from '@/content/application-cases';
import type { ProductCaseCard } from '@/content/product-cases';

const TABS: { id: ApplicationCaseFamily; label: string }[] = [
  { id: 'all', label: 'All' },
  ...APPLICATION_CASE_SLUGS.map((id) => ({ id, label: APPLICATION_CASE_META[id].label })),
];

type Props = {
  cases: ProductCaseCard[];
  family: ApplicationCaseFamily;
};

export default function ApplicationCasesListing({ cases, family }: Props) {
  return (
    <ClinicalCasesBrowseListing<ApplicationCaseSlug>
      cases={cases}
      activeId={family}
      tabs={TABS}
      pathFor={applicationCasesPath}
      sectionTitle={(id) => `${APPLICATION_CASE_META[id].label} cases`}
      filterItems={filterApplicationCases}
      cardHref={applicationCaseCardHref}
      tablistLabel="Clinical applications"
    />
  );
}
