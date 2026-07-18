/**
 * Client-side cart (localStorage). Replace with real API in production.
 */

import { getDesignServiceById } from '@/content/design-services';
import { getProductById, type ShopProduct } from '@/content/shop';

function resolveProduct(id: string): ShopProduct | undefined {
  return getProductById(id) ?? getDesignServiceById(id);
}

export const CART_STORAGE_KEY = 'odyx_cart';

export type CartLine = {
  productId: string;
  qty: number;
};

export type CartLineResolved = CartLine & {
  product: ShopProduct;
  lineTotal: number;
};

export function notifyCartChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('odyx-cart-change'));
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => typeof l.productId === 'string' && typeof l.qty === 'number' && l.qty > 0,
    );
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  notifyCartChange();
}

export function getCart(): CartLine[] {
  return readCart();
}

export function getResolvedCart(): CartLineResolved[] {
  return readCart()
    .map((line) => {
      const product = resolveProduct(line.productId);
      if (!product) return null;
      return {
        ...line,
        product,
        lineTotal: product.price * line.qty,
      };
    })
    .filter((l): l is CartLineResolved => l !== null);
}

export function cartCount(): number {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

export function cartSubtotal(): number {
  return getResolvedCart().reduce((sum, l) => sum + l.lineTotal, 0);
}

export function addItem(productId: string, qty = 1): void {
  if (typeof window === 'undefined') return;
  if (!resolveProduct(productId)) return;
  const cart = readCart();
  const existing = cart.find((l) => l.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  writeCart(cart);
}

export function updateQty(productId: string, qty: number): void {
  if (typeof window === 'undefined') return;
  const cart = readCart();
  if (qty <= 0) {
    writeCart(cart.filter((l) => l.productId !== productId));
    return;
  }
  const line = cart.find((l) => l.productId === productId);
  if (!line) return;
  line.qty = qty;
  writeCart(cart);
}

export function removeItem(productId: string): void {
  if (typeof window === 'undefined') return;
  writeCart(readCart().filter((l) => l.productId !== productId));
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  writeCart([]);
}
