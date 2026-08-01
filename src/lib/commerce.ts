/**
 * Commerce facade — Nest API (products, cart, checkout).
 */

import { getDesignServiceById } from '@/content/design-services';
import type { ShopProduct } from '@/content/shop';
import {
  clearCartApi,
  getCartApi,
  listProducts,
  removeCartItemApi,
  type ApiCart,
  type ApiProduct,
  upsertCartItemApi,
} from '@/lib/api/commerce';
import { notifyCartChange, type CartLineResolved } from '@/lib/cart-events';

function isDesignProduct(
  productId: string,
  category?: string | null,
): boolean {
  if (category === 'design') return true;
  return Boolean(getDesignServiceById(productId));
}

export function apiProductToShop(p: ApiProduct): ShopProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    desc: p.description,
    price: p.price,
    image: p.imageUrl,
    category: p.category,
    unit: p.unit ?? undefined,
    href: p.href ?? undefined,
    highlights: p.highlights,
  };
}

export function isDesignCart(lines: CartLineResolved[]): boolean {
  return lines.length > 0 && lines.every((l) => l.product.category === 'design');
}

export function isMixedCart(lines: CartLineResolved[]): boolean {
  const hasDesign = lines.some((l) => l.product.category === 'design');
  const hasPhysical = lines.some((l) => l.product.category !== 'design');
  return hasDesign && hasPhysical;
}

function cartToResolved(cart: ApiCart): CartLineResolved[] {
  return cart.items.map((item) => {
    const product = apiProductToShop(item.product);
    return {
      productId: item.productId,
      qty: item.quantity,
      product,
      lineTotal: product.price * item.quantity,
    };
  });
}

let cachedProducts: ShopProduct[] | null = null;

export async function fetchShopProducts(
  category?: string,
): Promise<ShopProduct[]> {
  if (category === 'design') {
    const products = await listProducts('design');
    return products.map(apiProductToShop);
  }
  const products = await listProducts(
    category && category !== 'all' ? category : undefined,
  );
  const mapped = products
    .map(apiProductToShop)
    .filter((p) => p.category !== 'design');
  cachedProducts = mapped;
  return mapped;
}

export async function getResolvedCartAsync(): Promise<CartLineResolved[]> {
  const cart = await getCartApi();
  return cartToResolved(cart);
}

export async function cartCountAsync(): Promise<number> {
  const lines = await getResolvedCartAsync();
  return lines.reduce((s, l) => s + l.qty, 0);
}

export async function addItemAsync(productId: string, qty = 1): Promise<void> {
  const resolvedId = (await resolveCartProductId(productId)) ?? productId;
  const cart = await getCartApi();
  const existing = cart.items.find((i) => i.productId === resolvedId);
  const nextQty = isDesignProduct(
    productId,
    existing?.product.category,
  )
    ? 1
    : (existing?.quantity ?? 0) + qty;
  await upsertCartItemApi(resolvedId, nextQty);
  notifyCartChange();
}

export async function updateQtyAsync(
  productId: string,
  qty: number,
): Promise<void> {
  if (qty <= 0) {
    await removeCartItemApi(productId);
  } else {
    const cart = await getCartApi();
    const existing = cart.items.find((i) => i.productId === productId);
    const capped = isDesignProduct(productId, existing?.product.category)
      ? 1
      : qty;
    await upsertCartItemApi(productId, capped);
  }
  notifyCartChange();
}

export async function removeItemAsync(productId: string): Promise<void> {
  await removeCartItemApi(productId);
  notifyCartChange();
}

export async function clearCartAsync(): Promise<void> {
  await clearCartApi();
  notifyCartChange();
}

/** Map legacy FE product ids → API slugs. */
const LEGACY_ID_TO_SLUG: Record<string, string> = {
  'printer-p1-26': 'odyx-p1-26',
  'curing-odyx-cure': 'odyx-cure',
  'scanner-s1': 'odyx-s1',
  'resin-odyx': 'odyx-resin',
  'design-single-unit': 'design-single-unit',
  'design-dsd-veneers': 'design-dsd-veneers',
  'design-rpd': 'design-rpd',
  'design-occlusal-splint': 'design-occlusal-splint',
  'design-surgical-guide': 'design-surgical-guide',
};

/** Resolve a product id usable with the cart API. */
export async function resolveCartProductId(
  legacyOrSlugOrId: string,
): Promise<string | null> {
  const slug = LEGACY_ID_TO_SLUG[legacyOrSlugOrId] ?? legacyOrSlugOrId;
  const products = cachedProducts ?? (await listProducts());
  const match = products.find(
    (p) => p.id === legacyOrSlugOrId || p.slug === slug || p.slug === legacyOrSlugOrId,
  );
  return match?.id ?? null;
}

export { notifyCartChange };
export type { CartLineResolved };
