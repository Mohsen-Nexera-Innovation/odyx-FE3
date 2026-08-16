/**
 * Isolated Design Services payment helpers.
 *
 * BACKEND INTEGRATION REQUIRED
 * ----------------------------
 * Store checkout already talks to Paymob via `@/lib/orders` (`placeOrderFacade`
 * + `createPaymentIntentApi`). That path needs a cart order ID and is not used
 * here until a design-case order/intent endpoint exists.
 *
 * Do not call `simulatePaymentApi` from this flow — it would fake payment success.
 *
 * InstaPay: record the selected method and show transfer instructions. Confirm
 * receipt on the backend (IPA / reference), not in this UI.
 *
 * Paymob: record the selected method. Start Pixel or iframe checkout only after
 * the backend returns `clientSecret` + `publicKey` or an `iframeUrl`.
 */

import { createPaymentIntentApi } from '@/lib/api/commerce';

export const DESIGN_SERVICE_PAYMENT_COPY = {
  instapay: {
    title: 'InstaPay',
    description:
      'Transfer via InstaPay using the account details issued after your case is registered.',
    detail: 'Egyptian instant transfer',
  },
  paymob: {
    title: 'Paymob',
    description:
      'Pay by card through Paymob after the backend creates a payment intent for this case.',
    detail: 'Visa · Mastercard · Meeza',
  },
} as const;

export type DesignServicePaymentMethod = 'instapay' | 'paymob';

export type DesignServicePaymentStartResult =
  | {
      status: 'awaiting_backend';
      method: DesignServicePaymentMethod;
      message: string;
    }
  | {
      status: 'paymob_ready';
      clientSecret: string;
      publicKey: string;
    }
  | {
      status: 'paymob_iframe';
      iframeUrl: string;
    };

/**
 * Starts (or reports that we cannot yet start) payment for a design case.
 * Never reports success or failure of a charge.
 */
export async function startDesignServicePayment(
  method: DesignServicePaymentMethod,
  orderId?: string,
): Promise<DesignServicePaymentStartResult> {
  if (method === 'paymob' && orderId) {
    const intent = await createPaymentIntentApi(orderId);
    if (
      intent.mode === 'pixel' &&
      intent.clientSecret &&
      intent.publicKey
    ) {
      return {
        status: 'paymob_ready',
        clientSecret: intent.clientSecret,
        publicKey: intent.publicKey,
      };
    }
    if (intent.iframeUrl) {
      return { status: 'paymob_iframe', iframeUrl: intent.iframeUrl };
    }
  }

  return {
    status: 'awaiting_backend',
    method,
    message:
      method === 'instapay'
        ? 'InstaPay details will be issued after the case is registered. Payment is not marked complete in this form.'
        : 'Paymob checkout starts after the backend creates a design-case payment intent. Payment is not marked complete in this form.',
  };
}
