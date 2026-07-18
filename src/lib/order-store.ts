/**
 * Simulated orders (localStorage). Replace with real API in production.
 */

import { calcShipping, type ShopProduct } from '@/content/shop';
import { clearCart, getResolvedCart, type CartLineResolved } from '@/lib/cart-store';

export const ORDERS_STORAGE_KEY = 'odyx_orders';

export type OrderShipping = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  country: string;
  postal: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  unit?: string;
  slug?: string;
  category?: ShopProduct['category'];
};

export type StoredOrder = {
  id: string;
  items: OrderItem[];
  shipping: OrderShipping;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  status: 'confirmed';
  fulfillmentType?: 'PHYSICAL' | 'DIGITAL';
};

export type PlaceOrderInput = {
  shipping: OrderShipping;
};

function readOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: StoredOrder[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function nextOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `ODYX-${n}`;
}

function toOrderItem(line: CartLineResolved): OrderItem {
  const p: ShopProduct = line.product;
  return {
    productId: p.id,
    name: p.name,
    price: p.price,
    qty: line.qty,
    image: p.image,
    unit: p.unit,
    slug: p.slug,
    category: p.category,
  };
}

/** Simulate payment + persist order. Clears cart on success. */
export async function placeOrder(input: PlaceOrderInput): Promise<StoredOrder> {
  const lines = getResolvedCart();
  if (lines.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const hasDesign = lines.some((l) => l.product.category === 'design');
  const hasPhysical = lines.some((l) => l.product.category !== 'design');
  if (hasDesign && hasPhysical) {
    throw new Error(
      'Cannot mix design services and hardware in one order. Checkout separately.',
    );
  }

  // Mock payment processing delay
  await new Promise((r) => setTimeout(r, 900));

  const digital = hasDesign && !hasPhysical;
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shippingFee = digital ? 0 : calcShipping(subtotal);
  const order: StoredOrder = {
    id: nextOrderId(),
    items: lines.map(toOrderItem),
    shipping: input.shipping,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    fulfillmentType: digital ? 'DIGITAL' : 'PHYSICAL',
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  clearCart();
  return order;
}

export function getOrderById(id: string): StoredOrder | undefined {
  return readOrders().find((o) => o.id === id);
}
