import type { Metadata } from 'next';
import CasesPage from './components/CasesPage';
import { CASES_META } from '@/content/real-case-library';
import { getAllClinicalCaseSections } from '@/content/clinical-case-listings';
import {
  buildApplicationsFromLibrary,
  buildFeaturedFromLibrary,
  buildProductsFromLibrary,
  fetchCaseLibrary,
} from './lib/load-case-library';
import {
  applicationThumbsFromClinical,
  featuredFromClinicalPhotos,
} from './lib/clinical-media';

export const metadata: Metadata = {
  title: CASES_META.title,
  description: CASES_META.description,
};

const PRODUCT_TITLES: Record<string, string> = {
  scanner: 'Scanner',
  printer: 'Printer',
  curing: 'Curing Machine',
  resin: 'Resin',
};

type PageProps = {
  searchParams: Promise<{ product?: string; q?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const productFilter =
    params.product && PRODUCT_TITLES[params.product] ? params.product : undefined;

  const library = await fetchCaseLibrary();
  const sections = getAllClinicalCaseSections();
  const clinicalFeatured = featuredFromClinicalPhotos();
  const thumbs = applicationThumbsFromClinical(sections);

  const featured = buildFeaturedFromLibrary(library, clinicalFeatured);
  if (productFilter) {
    featured.items = featured.items.filter((item) =>
      (item.productKeys ?? item.products.map((p) => p.id)).includes(productFilter),
    );
    featured.title = `${PRODUCT_TITLES[productFilter]} cases`;
    featured.kicker = 'CASES BY PRODUCT';
    featured.viewAll = { label: 'Clear filter', href: '/cases#featured-cases' };
  }

  return (
    <CasesPage
      applications={buildApplicationsFromLibrary(library, thumbs)}
      products={buildProductsFromLibrary(library, clinicalFeatured)}
      featured={featured}
      productFilter={productFilter}
    />
  );
}
