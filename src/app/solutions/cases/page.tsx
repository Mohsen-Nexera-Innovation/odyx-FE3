import type { Metadata } from 'next';
import CasesPage from '@/app/cases/components/CasesPage';
import { CASES_META } from '@/content/real-case-library';
import { getAllClinicalCaseSections } from '@/content/clinical-case-listings';
import {
  buildApplicationsFromLibrary,
  buildProductsFromLibrary,
  fetchCaseLibrary,
} from '@/app/cases/lib/load-case-library';
import {
  applicationThumbsFromClinical,
  featuredFromClinicalPhotos,
} from '@/app/cases/lib/clinical-media';

export const metadata: Metadata = {
  title: CASES_META.title,
  description: CASES_META.description,
};

export default async function Page() {
  const library = await fetchCaseLibrary();
  const sections = getAllClinicalCaseSections();
  const clinicalFeatured = featuredFromClinicalPhotos();
  const thumbs = applicationThumbsFromClinical(sections);

  return (
    <CasesPage
      applications={buildApplicationsFromLibrary(library, thumbs)}
      products={buildProductsFromLibrary(library, clinicalFeatured)}
    />
  );
}
