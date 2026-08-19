import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationCasesListing from '@/components/solutions/cases/applications/ApplicationCasesListing';
import InnerPageMotion from '@/components/InnerPageMotion';
import { fetchCaseLibrary } from '@/app/cases/lib/load-case-library';
import {
  APPLICATION_CASE_META,
  APPLICATION_CASE_SLUGS,
  isApplicationCaseSlug,
} from '@/content/application-cases';
import { buildProductCases } from '@/content/product-cases';

type Props = { params: Promise<{ applicationSlug: string }> };

export function generateStaticParams() {
  return APPLICATION_CASE_SLUGS.map((applicationSlug) => ({ applicationSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { applicationSlug } = await params;
  if (!isApplicationCaseSlug(applicationSlug)) return { title: 'Cases by Application | ODYX' };
  const meta = APPLICATION_CASE_META[applicationSlug];
  return { title: meta.title, description: meta.description };
}

export default async function ApplicationCasesFamilyPage({ params }: Props) {
  const { applicationSlug } = await params;
  if (!isApplicationCaseSlug(applicationSlug)) notFound();

  const library = await fetchCaseLibrary();
  const cases = buildProductCases(library);

  return (
    <>
      <ApplicationCasesListing cases={cases} family={applicationSlug} />
      <InnerPageMotion />
    </>
  );
}
