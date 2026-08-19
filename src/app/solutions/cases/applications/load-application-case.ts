import {
  fetchCaseLibrary,
  fetchShowcaseCaseBySlug,
} from '@/app/cases/lib/load-case-library';
import {
  isApplicationCaseSlug,
} from '@/content/application-cases';
import {
  buildProductCases,
  findProductCase,
  productCaseFromShowcase,
  staticProductCases,
  type ProductCaseCard,
} from '@/content/product-cases';

export async function resolveApplicationCase(
  applicationSlug: string,
  caseSlug: string,
): Promise<ProductCaseCard | null> {
  if (!isApplicationCaseSlug(applicationSlug)) return null;

  const belongs = (card: ProductCaseCard) => card.applicationSlug === applicationSlug;

  const library = await fetchCaseLibrary();
  const fromLibrary = findProductCase(buildProductCases(library), caseSlug);
  if (fromLibrary) return belongs(fromLibrary) ? fromLibrary : null;

  const fromPhotos = findProductCase(staticProductCases(), caseSlug);
  if (fromPhotos) return belongs(fromPhotos) ? fromPhotos : null;

  const cms = await fetchShowcaseCaseBySlug(caseSlug);
  if (!cms) return null;
  const fromCms = productCaseFromShowcase(cms);
  return belongs(fromCms) ? fromCms : null;
}

export function fallbackProductSlug(card: ProductCaseCard) {
  return card.productKeys[0] ?? 'scanner';
}
