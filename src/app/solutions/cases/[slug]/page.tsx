import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClinicalCasesListingPage from '@/components/solutions/cases/ClinicalCasesListingPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import {
  CLINICAL_CASE_LISTING_META,
  CLINICAL_CASE_LISTING_SLUGS,
  getClinicalCaseListing,
} from '@/content/clinical-case-listings';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLINICAL_CASE_LISTING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = CLINICAL_CASE_LISTING_META[slug];
  if (!meta) return { title: 'Clinical Cases | ODYX' };
  return { title: meta.title, description: meta.description };
}

export default async function ClinicalCasesRoute({ params }: Props) {
  const { slug } = await params;
  const listing = getClinicalCaseListing(slug);
  if (!listing) notFound();

  return (
    <>
      <ClinicalCasesListingPage data={listing} />
      <InnerPageMotion />
    </>
  );
}
