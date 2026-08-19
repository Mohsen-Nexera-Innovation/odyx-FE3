import {
  fetchCaseLibrary,
  fetchShowcaseCaseBySlug,
} from '@/app/cases/lib/load-case-library';
import {
  buildProductCases,
  findProductCase,
  isProductFamilySlug,
  productCaseFromShowcase,
  type ProductCaseCard,
  type ProductFamilySlug,
} from '@/content/product-cases';

export async function resolveProductCase(
  productSlug: string,
  caseSlug: string,
): Promise<ProductCaseCard | null> {
  if (!isProductFamilySlug(productSlug)) return null;

  const belongs = (card: ProductCaseCard) =>
    card.productKeys.includes(productSlug as ProductFamilySlug);

  const library = await fetchCaseLibrary();
  const fromLibrary = findProductCase(buildProductCases(library), caseSlug);
  if (fromLibrary) return belongs(fromLibrary) ? fromLibrary : null;

  const cms = await fetchShowcaseCaseBySlug(caseSlug);
  if (!cms) return null;
  const fromCms = productCaseFromShowcase(cms);
  return belongs(fromCms) ? fromCms : null;
}
