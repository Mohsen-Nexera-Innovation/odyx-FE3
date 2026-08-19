import type { Metadata } from 'next';
import ApplicationCasesListing from '@/components/solutions/cases/applications/ApplicationCasesListing';
import InnerPageMotion from '@/components/InnerPageMotion';
import { fetchCaseLibrary } from '@/app/cases/lib/load-case-library';
import { APPLICATION_CASES_META } from '@/content/application-cases';
import { buildProductCases } from '@/content/product-cases';

export const metadata: Metadata = {
  title: APPLICATION_CASES_META.title,
  description: APPLICATION_CASES_META.description,
};

export default async function ApplicationCasesAllPage() {
  const library = await fetchCaseLibrary();
  const cases = buildProductCases(library);

  return (
    <>
      <ApplicationCasesListing cases={cases} family="all" />
      <InnerPageMotion />
    </>
  );
}
