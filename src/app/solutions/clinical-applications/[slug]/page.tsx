import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ClinicalIndicationPage from '@/components/pages/ClinicalIndicationPage';
import ClinicalCasesListingPage from '@/components/pages/ClinicalCasesListingPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import {
  CLINICAL_INDICATION_META,
  CLINICAL_INDICATION_SLUGS,
  getClinicalIndication,
} from '@/content/clinical-indications';
import {
  ALL_CLINICAL_CASES_SLUG,
  CLINICAL_CASE_LISTING_META,
  CLINICAL_CASE_LISTING_SLUGS,
  getClinicalCaseListing,
} from '@/content/clinical-case-listings';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const indicationSlugs = CLINICAL_INDICATION_SLUGS.filter((slug) => slug !== 'same-day-crown');
  return [...indicationSlugs, ...CLINICAL_CASE_LISTING_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === ALL_CLINICAL_CASES_SLUG) {
    return { title: 'Real Case Library | ODYX' };
  }
  const caseMeta = CLINICAL_CASE_LISTING_META[slug];
  if (caseMeta) return { title: caseMeta.title, description: caseMeta.description };
  const meta = CLINICAL_INDICATION_META[slug];
  if (!meta) return { title: 'Clinical Application | ODYX' };
  return { title: meta.title, description: meta.description };
}

export default async function ClinicalIndicationRoute({ params }: Props) {
  const { slug } = await params;

  // Old all-cases gallery → Real Case Library
  if (slug === ALL_CLINICAL_CASES_SLUG) {
    permanentRedirect('/cases');
  }

  const listing = getClinicalCaseListing(slug);
  if (listing) {
    return (
      <>
        <ClinicalCasesListingPage data={listing} />
        <InnerPageMotion />
      </>
    );
  }

  const data = getClinicalIndication(slug);
  if (!data) notFound();

  return (
    <>
      <ClinicalIndicationPage data={data} />
      <InnerPageMotion />
    </>
  );
}
