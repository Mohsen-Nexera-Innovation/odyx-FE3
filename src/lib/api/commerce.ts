import { apiFetch } from '@/lib/api/client';

export type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'scanner' | 'printer' | 'curing';
  unit?: string | null;
  href?: string | null;
  highlights: string[];
  stock: number;
};

export type ApiCartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: ApiProduct;
};

export type ApiCart = {
  id: string;
  items: ApiCartItem[];
};

export type ApiOrder = {
  id: string;
  orderNumber: string;
  status: string;
  shippingAddress: string;
  shippingGovernorate: string;
  paymentMethod: 'CASH' | 'ONLINE';
  subtotal: number;
  tax: number;
  shipping: number;
  cod: number;
  total: number;
  contactPhone: string;
  contactName?: string | null;
  items: {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
  }[];
  payments: { method: string; status: string; amount: number }[];
  shipments: { trackingNumber: string; status: string }[];
};

export type PricingQuote = {
  subtotal: number;
  tax: number;
  shipping: number;
  cod: number;
  total: number;
  currency: string;
};

export function listProducts(category?: string) {
  const q = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch<ApiProduct[]>(`/products${q}`);
}

export function getCartApi() {
  return apiFetch<ApiCart>('/cart', { auth: true });
}

export function upsertCartItemApi(productId: string, quantity: number) {
  return apiFetch<ApiCart>('/cart/items', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify({ productId, quantity }),
  });
}

export function removeCartItemApi(productId: string) {
  return apiFetch<ApiCart>(`/cart/items/${productId}`, {
    method: 'DELETE',
    auth: true,
  });
}

export function clearCartApi() {
  return apiFetch<ApiCart>('/cart', { method: 'DELETE', auth: true });
}

export function previewOrderApi(input: {
  shippingGovernorate: string;
  paymentMethod: 'CASH' | 'ONLINE';
}) {
  return apiFetch<PricingQuote>('/orders/preview', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function checkoutApi(input: {
  shippingAddress: string;
  shippingGovernorate: string;
  paymentMethod: 'CASH' | 'ONLINE';
  contactPhone: string;
  contactName?: string;
  idempotencyKey?: string;
}) {
  return apiFetch<ApiOrder>('/orders/checkout', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(input),
  });
}

export function getOrderByNumberApi(orderNumber: string) {
  return apiFetch<ApiOrder>(
    `/orders/by-number/${encodeURIComponent(orderNumber)}`,
    { auth: true },
  );
}

export function createPaymentIntentApi(orderId: string) {
  return apiFetch<{
    iframeUrl: string;
    paymentKey: string;
    orderId: string;
    orderNumber: string;
  }>('/payments/intent', {
    method: 'POST',
    auth: true,
    body: JSON.stringify({ orderId }),
  });
}

export function simulatePaymentApi(orderId: string) {
  return apiFetch<{ ok: boolean; orderId: string; status: string }>(
    '/payments/simulate',
    {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ orderId }),
    },
  );
}
