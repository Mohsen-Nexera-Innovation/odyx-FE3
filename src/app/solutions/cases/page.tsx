import type { Metadata } from 'next';
import CasesPage from '@/app/cases/components/CasesPage';
import { CASES_META } from '@/content/real-case-library';
import {
  buildApplicationsFromLibrary,
  buildProductsFromLibrary,
  fetchCaseLibrary,
} from '@/app/cases/lib/load-case-library';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: CASES_META.title,
  description: CASES_META.description,
};

export default async function Page() {
  const library = await fetchCaseLibrary();

  return (
    <CasesPage
      applications={buildApplicationsFromLibrary(library)}
      products={buildProductsFromLibrary(library)}
    />
  );
}
