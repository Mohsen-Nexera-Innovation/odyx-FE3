/**
 * Orders facade: demo localStorage vs Nest checkout + Paymob.
 */

import {
  checkoutApi,
  createPaymentIntentApi,
  getOrderByNumberApi,
  previewOrderApi,
  simulatePaymentApi,
  type ApiOrder,
  type PricingQuote,
} from '@/lib/api/commerce';
import { isApiMode } from '@/lib/config';
import {
  getOrderById as demoGetOrder,
  placeOrder as demoPlaceOrder,
  type OrderShipping,
  type StoredOrder,
} from '@/lib/order-store';
import { notifyCartChange } from '@/lib/cart-store';

export type { OrderShipping, StoredOrder };

export function mapApiOrder(order: ApiOrder): StoredOrder {
  return {
    id: order.orderNumber,
    items: order.items.map((i) => ({
      productId: i.productId,
      name: i.productName,
      price: i.unitPrice,
      qty: i.quantity,
      image: '',
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
    status: 'confirmed',
  };
}

export async function previewShipping(input: {
  shippingGovernorate: string;
  paymentMethod: 'CASH' | 'ONLINE';
}): Promise<PricingQuote | null> {
  if (!isApiMode()) return null;
  return previewOrderApi(input);
}

export type ApiCheckoutResult = {
  order: StoredOrder;
  apiOrder: ApiOrder;
  iframeUrl?: string;
  simulated?: boolean;
};

export async function placeOrderFacade(input: {
  shipping: OrderShipping;
  paymentMethod: 'CASH' | 'ONLINE';
}): Promise<ApiCheckoutResult | StoredOrder> {
  if (!isApiMode()) {
    return demoPlaceOrder({ shipping: input.shipping });
  }

  const apiOrder = await checkoutApi({
    shippingAddress: input.shipping.line1,
    shippingGovernorate: input.shipping.city,
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
      return {
        order: mapApiOrder(apiOrder),
        apiOrder,
        iframeUrl: intent.iframeUrl,
      };
    } catch {
      // Paymob not configured — simulate paid for local API mode
      await simulatePaymentApi(apiOrder.id);
      return {
        order: mapApiOrder(apiOrder),
        apiOrder,
        simulated: true,
      };
    }
  }

  return { order: mapApiOrder(apiOrder), apiOrder };
}

export async function getOrderFacade(
  orderNumber: string,
): Promise<StoredOrder | undefined> {
  if (!isApiMode()) return demoGetOrder(orderNumber);
  try {
    const order = await getOrderByNumberApi(orderNumber);
    return mapApiOrder(order);
  } catch {
    return undefined;
  }
}
