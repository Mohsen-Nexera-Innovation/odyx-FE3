/**
 * Commerce facade: demo localStorage vs Nest API (products/cart/orders/Paymob).
 */

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
import {
  addItem as demoAdd,
  cartCount as demoCount,
  clearCart as demoClear,
  getResolvedCart as demoResolved,
  removeItem as demoRemove,
  updateQty as demoUpdateQty,
  notifyCartChange,
  type CartLineResolved,
} from '@/lib/cart-store';
import { isApiMode } from '@/lib/config';

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
  if (!isApiMode()) {
    const { SHOP_PRODUCTS } = await import('@/content/shop');
    return category && category !== 'all'
      ? SHOP_PRODUCTS.filter((p) => p.category === category)
      : [...SHOP_PRODUCTS];
  }
  const products = await listProducts(
    category && category !== 'all' ? category : undefined,
  );
  cachedProducts = products.map(apiProductToShop);
  return cachedProducts;
}

export async function getResolvedCartAsync(): Promise<CartLineResolved[]> {
  if (!isApiMode()) return demoResolved();
  const cart = await getCartApi();
  return cartToResolved(cart);
}

export async function cartCountAsync(): Promise<number> {
  if (!isApiMode()) return demoCount();
  const lines = await getResolvedCartAsync();
  return lines.reduce((s, l) => s + l.qty, 0);
}

export async function addItemAsync(productId: string, qty = 1): Promise<void> {
  if (!isApiMode()) {
    demoAdd(productId, qty);
    return;
  }
  const cart = await getCartApi();
  const existing = cart.items.find((i) => i.productId === productId);
  const nextQty = (existing?.quantity ?? 0) + qty;
  await upsertCartItemApi(productId, nextQty);
  notifyCartChange();
}

export async function updateQtyAsync(
  productId: string,
  qty: number,
): Promise<void> {
  if (!isApiMode()) {
    demoUpdateQty(productId, qty);
    return;
  }
  if (qty <= 0) {
    await removeCartItemApi(productId);
  } else {
    await upsertCartItemApi(productId, qty);
  }
  notifyCartChange();
}

export async function removeItemAsync(productId: string): Promise<void> {
  if (!isApiMode()) {
    demoRemove(productId);
    return;
  }
  await removeCartItemApi(productId);
  notifyCartChange();
}

export async function clearCartAsync(): Promise<void> {
  if (!isApiMode()) {
    demoClear();
    return;
  }
  await clearCartApi();
  notifyCartChange();
}

/** Map FE demo product ids → API slugs. */
const LEGACY_ID_TO_SLUG: Record<string, string> = {
  'printer-p1-26': 'odyx-p1-26',
  'curing-odyx-cure': 'odyx-cure',
  'scanner-s1': 'odyx-s1',
};

/** Resolve a product id usable with the cart (API cuid or demo id). */
export async function resolveCartProductId(
  legacyOrSlugOrId: string,
): Promise<string | null> {
  if (!isApiMode()) return legacyOrSlugOrId;
  const products = await fetchShopProducts();
  const slug = LEGACY_ID_TO_SLUG[legacyOrSlugOrId] ?? legacyOrSlugOrId;
  const match = products.find(
    (p) => p.id === legacyOrSlugOrId || p.slug === slug || p.slug === legacyOrSlugOrId,
  );
  return match?.id ?? null;
}

export { notifyCartChange } from '@/lib/cart-store';
