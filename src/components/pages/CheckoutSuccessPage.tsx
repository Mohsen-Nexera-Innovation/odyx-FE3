'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import { isDesignServiceSlug } from '@/content/design-services';
import { formatMoney } from '@/content/shop';
import { isApiMode } from '@/lib/config';
import { designInboxHandoffHref, finalizeDesignCaseAfterPayment } from '@/lib/design-case-draft';
import { getOrderFacade, type StoredOrder } from '@/lib/orders';
import { readSession } from '@/lib/auth';

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);

function isDigitalOrder(order: StoredOrder): boolean {
  return (
    order.fulfillmentType === 'DIGITAL' ||
    order.items.every((i) => i.category === 'design')
  );
}

function SuccessBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);
  const [redirectingDesign, setRedirectingDesign] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }
    void getOrderFacade(orderId).then((o) => setOrder(o ?? null));
  }, [orderId]);

  const isDigital = Boolean(order && isDigitalOrder(order));

  // Design orders: submit pre-checkout scan, then open inbox thread.
  useEffect(() => {
    if (!order || !isDigitalOrder(order) || redirectingDesign) return;
    let cancelled = false;
    setRedirectingDesign(true);
    void (async () => {
      const slug =
        order.items.map((i) => i.slug).find((s) => isDesignServiceSlug(s)) ??
        order.items.map((i) => i.productId).find((s) => isDesignServiceSlug(s));
      const session = readSession();
      let href = designInboxHandoffHref({
        orderNumber: order.id,
        serviceSlug: slug,
        confirmed: true,
      });
      if (session && session.role !== 'guest') {
        try {
          href = await finalizeDesignCaseAfterPayment(session, order.id);
        } catch {
          /* keep fallback href */
        }
      }
      if (!cancelled) router.replace(href);
    })();
    return () => {
      cancelled = true;
    };
  }, [order, router, redirectingDesign]);

  if (order === undefined || (order && isDigital) || redirectingDesign) {
    return (
      <section className="sec store-sec">
        <div className="wrap">
          <p className="checkout-loading">
            {order && isDigital
              ? 'Order confirmed — opening your design case in the inbox…'
              : 'Loading confirmation…'}
          </p>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Store', href: '/shop' },
          { label: 'Order', href: '/checkout/success' },
        ]}
        title="Order not found"
        lead="We could not find that confirmation. Your cart may still have items, or the link expired."
        action={
          <PageActions>
            <Link className="btn" href="/shop">
              Back to store <Arrow />
            </Link>
          </PageActions>
        }
      />
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="sec store-sec co-sec suc-sec">
      <div className="wrap">
        <div className="suc-hero">
          <span className="suc-badge" aria-hidden>
            <span className="suc-badge-ring" />
            <span className="suc-badge-ring suc-badge-ring-2" />
            <svg viewBox="0 0 52 52" className="suc-check" aria-hidden>
              <circle className="suc-check-circle" cx="26" cy="26" r="24" fill="none" />
              <path className="suc-check-mark" fill="none" d="M14 27l8 8 16-17" />
            </svg>
          </span>
          <h1>Order confirmed</h1>
          <p>
            {isDigital ? (
              <>
                Thank you{order.shipping.name ? `, ${order.shipping.name.split(' ')[0]}` : ''} —
                your design service is paid. Opening your design conversation in the inbox…
              </>
            ) : (
              <>
                Thank you, {order.shipping.name.split(' ')[0]} — your gear is being prepared.
                A confirmation was sent to <strong>{order.shipping.email}</strong>.
              </>
            )}
          </p>
          <p className="suc-demo-note">
            {isApiMode()
              ? 'Order saved on ODYX API · Paymob / Bosta when configured'
              : 'Demo checkout · No real charge was made'}
          </p>
        </div>

        <div className="suc-receipt">
          <div className="suc-receipt-head">
            <div>
              <em>Order</em>
              <strong>{order.id}</strong>
            </div>
            <div>
              <em>Date</em>
              <strong>{orderDate}</strong>
            </div>
            <div>
              <em>{isDigital ? 'Delivery' : 'Ship to'}</em>
              <strong>
                {isDigital
                  ? 'Inbox (digital)'
                  : `${order.shipping.city}, ${order.shipping.country}`}
              </strong>
            </div>
            <div>
              <em>Status</em>
              <strong className="suc-status">
                <CheckIcon size={11} /> Confirmed
              </strong>
            </div>
          </div>

          {isDigital ? (
            <ol className="suc-timeline" aria-label="Design progress">
              <li className="done">
                <i />
                <span>Paid</span>
              </li>
              <li className="done">
                <i />
                <span>Case submitted</span>
              </li>
              <li>
                <i />
                <span>In design</span>
              </li>
              <li>
                <i />
                <span>Delivered</span>
              </li>
            </ol>
          ) : (
            <ol className="suc-timeline" aria-label="Order progress">
              <li className="done">
                <i />
                <span>Confirmed</span>
              </li>
              <li>
                <i />
                <span>Preparing</span>
              </li>
              <li>
                <i />
                <span>Shipped</span>
              </li>
              <li>
                <i />
                <span>Delivered</span>
              </li>
            </ol>
          )}

          <ul className="co-items suc-items">
            {order.items.map((item) => (
              <li key={item.productId}>
                <span className="co-item-thumb">
                  <img src={item.image || '/img/crowns.jpg'} alt="" />
                  <i>{item.qty}</i>
                </span>
                <span className="co-item-info">
                  <strong>{item.name}</strong>
                  <em>{formatMoney(item.price)} each</em>
                </span>
                <span className="co-item-total">{formatMoney(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="co-sum-row">
            <span>Subtotal</span>
            <span>{formatMoney(order.subtotal)}</span>
          </div>
          {!isDigital ? (
            <div className="co-sum-row">
              <span>Shipping</span>
              <span>{order.shippingFee === 0 ? 'Free' : formatMoney(order.shippingFee)}</span>
            </div>
          ) : null}
          <div className="co-sum-row co-sum-total">
            <span>Total paid</span>
            <span>{formatMoney(order.total)}</span>
          </div>

          <div className="suc-actions">
            <Link className="btn" href="/shop">
              Continue shopping <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="sec store-sec">
          <div className="wrap">
            <p className="checkout-loading">Loading confirmation…</p>
          </div>
        </section>
      }
    >
      <SuccessBody />
    </Suspense>
  );
}
