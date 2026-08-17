/**
 * Orders facade — Nest checkout + Paymob.
 */

import { ApiError } from '@/lib/api/client';
import {
  checkoutApi,
  createPaymentIntentApi,
  getOrderByNumberApi,
  previewOrderApi,
  simulatePaymentApi,
  type ApiOrder,
  type PricingQuote,
} from '@/lib/api/commerce';
import { notifyCartChange } from '@/lib/cart-events';
import type { OrderShipping, StoredOrder } from '@/lib/order-types';

export type { OrderShipping, StoredOrder };

function mapOrderStatus(status: string): StoredOrder['status'] {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return 'pending';
    case 'PAID':
      return 'paid';
    case 'SHIPPED':
      return 'shipped';
    case 'DELIVERED':
      return 'delivered';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'confirmed';
  }
}

export function mapApiOrder(order: ApiOrder): StoredOrder {
  return {
    id: order.orderNumber,
    items: order.items.map((i) => ({
      productId: i.productId,
      name: i.productName,
      price: i.unitPrice,
      qty: i.quantity,
      image: '',
      slug: i.product?.slug,
      category: i.product?.category,
    })),
    shipping: {
      name: order.contactName || '',
      email: '',
      phone: order.contactPhone,
      line1: order.shippingAddress,
      city: order.shippingGovernorate,
      country: 'Egypt',
      postal: '',
    },
    subtotal: order.subtotal,
    shippingFee: order.shipping,
    total: order.total,
    createdAt: new Date().toISOString(),
    status: mapOrderStatus(order.status),
    fulfillmentType: order.fulfillmentType,
    paymentMethod: order.paymentMethod,
  };
}

export async function previewShipping(input: {
  shippingGovernorate?: string;
  paymentMethod: 'CASH' | 'ONLINE';
}): Promise<PricingQuote | null> {
  return previewOrderApi(input);
}

export type ApiCheckoutResult = {
  order: StoredOrder;
  apiOrder: ApiOrder;
  /** Paymob Pixel embedded checkout */
  pixel?: { clientSecret: string; publicKey: string };
  /** Legacy Paymob iframe */
  iframeUrl?: string;
  simulated?: boolean;
};

export async function placeOrderFacade(input: {
  shipping: OrderShipping;
  paymentMethod: 'CASH' | 'ONLINE';
}): Promise<ApiCheckoutResult> {
  const apiOrder = await checkoutApi({
    shippingAddress: input.shipping.line1 || undefined,
    shippingGovernorate: input.shipping.city || undefined,
    paymentMethod: input.paymentMethod,
    contactPhone: input.shipping.phone,
    contactName: input.shipping.name,
    idempotencyKey:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `odyx-${Date.now()}`,
  });
  notifyCartChange();

  if (input.paymentMethod === 'ONLINE') {
    try {
      const intent = await createPaymentIntentApi(apiOrder.id);
      if (
        intent.mode === 'pixel' &&
        intent.clientSecret &&
        intent.publicKey
      ) {
        return {
          order: mapApiOrder(apiOrder),
          apiOrder,
          pixel: {
            clientSecret: intent.clientSecret,
            publicKey: intent.publicKey,
          },
        };
      }
      if (intent.iframeUrl) {
        return {
          order: mapApiOrder(apiOrder),
          apiOrder,
          iframeUrl: intent.iframeUrl,
        };
      }
      throw new Error('Paymob intent missing pixel or iframe payload');
    } catch (err) {
      const canSimulate = err instanceof ApiError && err.status === 503;
      if (canSimulate) {
        try {
          await simulatePaymentApi(apiOrder.id);
          return {
            order: mapApiOrder({ ...apiOrder, status: 'PAID' }),
            apiOrder: { ...apiOrder, status: 'PAID' },
            simulated: true,
          };
        } catch {
          throw err;
        }
      }
      throw err;
    }
  }

  return { order: mapApiOrder(apiOrder), apiOrder };
}

export async function getOrderFacade(
  orderNumber: string,
): Promise<StoredOrder | undefined> {
  try {
    const order = await getOrderByNumberApi(orderNumber);
    return mapApiOrder(order);
  } catch {
    return undefined;
  }
}

export function isSettledOnline(status: StoredOrder['status']): boolean {
  return (
    status === 'paid' ||
    status === 'confirmed' ||
    status === 'shipped' ||
    status === 'delivered'
  );
}

export async function waitForOrderPaid(
  orderNumber: string,
  options?: { timeoutMs?: number; intervalMs?: number },
): Promise<StoredOrder | undefined> {
  const timeoutMs = options?.timeoutMs ?? 45_000;
  const intervalMs = options?.intervalMs ?? 1_500;
  const started = Date.now();
  let last: StoredOrder | undefined;
  while (Date.now() - started < timeoutMs) {
    last = await getOrderFacade(orderNumber);
    if (last && isSettledOnline(last.status)) return last;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return last;
}
