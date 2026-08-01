import type { ShopProduct } from '@/content/shop';

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
