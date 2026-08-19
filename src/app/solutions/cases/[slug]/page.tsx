import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { LEGACY_APPLICATION_LISTING, applicationCasesPath } from '@/content/application-cases';
import {
  CLINICAL_CASE_LISTING_META,
  CLINICAL_CASE_LISTING_SLUGS,
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

/** Legacy `/solutions/cases/{listing}` URLs → Case By Application listings. */
export default async function ClinicalCasesRoute({ params }: Props) {
  const { slug } = await params;
  const applicationSlug = LEGACY_APPLICATION_LISTING[slug];
  if (!applicationSlug) notFound();
  permanentRedirect(applicationCasesPath(applicationSlug));
}
