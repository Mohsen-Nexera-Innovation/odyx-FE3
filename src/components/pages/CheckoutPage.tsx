'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHero from '@/components/PageHero';
import PaymobPixelCheckout from '@/components/checkout/PaymobPixelCheckout';
import { FREE_SHIPPING_THRESHOLD, formatMoney } from '@/content/shop';
import { useCart } from '@/hooks/useCart';
import { readSession } from '@/lib/auth';
import { isDesignCart, isMixedCart, removeItemAsync } from '@/lib/commerce';
import { placeOrderFacade, previewShipping, type OrderShipping } from '@/lib/orders';
import {
  isValidPhoneNumber,
  PHONE_MAX_LENGTH,
  sanitizePhoneInput,
} from '@/lib/phone';

type FormState = OrderShipping;

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  line1: '',
  city: '',
  country: '',
  postal: '',
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12.5l5.5 5.5L20 6.5" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="11" width="16" height="10" rx="2.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

function Field({
  id,
  label,
  value,
  onChange,
  error,
  full = false,
  ...inputProps
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  full?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>) {
  return (
    <div className={`co-field${full ? ' full' : ''}${error ? ' err' : ''}`}>
      <input
        id={id}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        {...inputProps}
      />
      <label htmlFor={id}>{label}</label>
      {error ? <span className="co-err">{error}</span> : null}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, count, loading: cartLoading } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [payMethod, setPayMethod] = useState<'ONLINE' | 'CASH'>('ONLINE');
  const [apiShipping, setApiShipping] = useState<number | null>(null);
  const [payIframe, setPayIframe] = useState<string | null>(null);
  const [payPixel, setPayPixel] = useState<{
    clientSecret: string;
    publicKey: string;
    orderNumber: string;
  } | null>(null);
  const awaitingPaymob = Boolean(payIframe || payPixel);

  useEffect(() => {
    setReady(true);
    const session = readSession();
    if (session) {
      setForm((f) => ({
        ...f,
        name: f.name || session.name,
        email: f.email || session.email,
        country: f.country || session.country || 'Egypt',
      }));
    }
  }, []);

  const digital = isDesignCart(lines);
  const mixed = isMixedCart(lines);
  const [leavingCheckout, setLeavingCheckout] = useState(false);

  useEffect(() => {
    if (!ready || cartLoading) return;
    if (!readSession()) {
      router.replace('/login');
      return;
    }
    // Don't bounce to catalog while we create the inbox thread after payment.
    if (count === 0 && !awaitingPaymob && !leavingCheckout) {
      // Prefer design catalog when this checkout was opened from Buy now there.
      const fromDesign =
        typeof window !== 'undefined' &&
        (sessionStorage.getItem('odyx_checkout_from') === 'design' ||
          document.referrer.includes('/design-services'));
      try {
        sessionStorage.removeItem('odyx_checkout_from');
      } catch {
        /* ignore */
      }
      router.replace(digital || fromDesign ? '/design-services' : '/shop');
      return;
    }
    if (count > 0) {
      try {
        sessionStorage.removeItem('odyx_checkout_from');
      } catch {
        /* ignore */
      }
    }
  }, [ready, cartLoading, count, router, awaitingPaymob, digital, leavingCheckout]);

  useEffect(() => {
    if (digital) {
      setPayMethod('ONLINE');
      setApiShipping(0);
      return;
    }
    if (!form.city.trim()) {
      setApiShipping(null);
      return;
    }
    let cancelled = false;
    void previewShipping({
      shippingGovernorate: form.city.trim(),
      paymentMethod: payMethod,
    })
      .then((q) => {
        if (!cancelled && q) setApiShipping(q.shipping);
      })
      .catch(() => {
        if (!cancelled) setApiShipping(null);
      });
    return () => {
      cancelled = true;
    };
  }, [form.city, payMethod, digital]);

  useEffect(() => {
    if (!digital || count === 0) return;
    let cancelled = false;
    void previewShipping({ paymentMethod: 'ONLINE' })
      .then((q) => {
        if (!cancelled && q) setApiShipping(q.shipping);
      })
      .catch(() => {
        if (!cancelled) setApiShipping(0);
      });
    return () => {
      cancelled = true;
    };
  }, [digital, count]);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shippingFee = digital ? 0 : (apiShipping ?? 0);
  const total = subtotal + shippingFee;

  const contactDone =
    form.name.trim() !== '' && isValidEmail(form.email) && isValidPhoneNumber(form.phone);
  const shippingDone = digital
    ? true
    : form.line1.trim() !== '' && form.city.trim() !== '';
  const paymentDone = true;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.email.trim() || !isValidEmail(form.email)) next.email = 'Valid email required';
    if (!form.phone.trim() || !isValidPhoneNumber(form.phone)) next.phone = 'Valid phone required';
    if (!digital) {
      if (!form.line1.trim()) next.line1 = 'Required';
      if (!form.city.trim()) next.city = 'Governorate / city required (Bosta)';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (mixed) {
      setFormError(
        'Cannot mix design services and hardware in one order. Checkout separately.',
      );
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    setLeavingCheckout(true);
    try {
      const shipping = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        line1: digital ? 'Digital delivery' : form.line1.trim(),
        city: digital ? 'N/A' : form.city.trim(),
        country: form.country.trim() || 'Egypt',
        postal: digital ? '-' : form.postal.trim() || '-',
      };
      const result = await placeOrderFacade({
        shipping,
        paymentMethod: digital ? 'ONLINE' : payMethod,
      });

      if ('pixel' in result && result.pixel) {
        setLeavingCheckout(false);
        setPayPixel({
          clientSecret: result.pixel.clientSecret,
          publicKey: result.pixel.publicKey,
          orderNumber: result.order.id,
        });
        setSubmitting(false);
        return;
      }

      if ('iframeUrl' in result && result.iframeUrl) {
        setLeavingCheckout(false);
        setPayIframe(result.iframeUrl);
        setSubmitting(false);
        return;
      }

      const orderId = result.order.id;
      router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
    } catch (err) {
      setLeavingCheckout(false);
      setFormError(err instanceof Error ? err.message : 'Could not place order.');
      setSubmitting(false);
    }
  }

  if (payPixel) {
    return (
      <section className="sec store-sec co-sec">
        <div className="wrap">
          <PageHero
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Checkout', href: '/checkout' },
            ]}
            title="Pay with card"
            lead="Enter your card details below. Payment is processed securely by Paymob Pixel."
          />
          <PaymobPixelCheckout
            publicKey={payPixel.publicKey}
            clientSecret={payPixel.clientSecret}
            onComplete={() => {
              setLeavingCheckout(true);
              router.push(
                `/checkout/success?order=${encodeURIComponent(payPixel.orderNumber)}`,
              );
            }}
            onCancel={() => setPayPixel(null)}
          />
          <p style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setPayPixel(null)}
            >
              Cancel payment
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (payIframe) {
    return (
      <section className="sec store-sec co-sec">
        <div className="wrap">
          <PageHero
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Checkout', href: '/checkout' },
            ]}
            title="Complete payment"
            lead="Pay securely with Paymob. After payment you will return to the confirmation page."
          />
          <iframe
            title="Paymob checkout"
            src={payIframe}
            style={{ width: '100%', minHeight: '720px', border: 0, borderRadius: 12 }}
          />
          <p style={{ marginTop: '1rem' }}>
            <Link href="/shop">Back to store</Link>
          </p>
        </div>
      </section>
    );
  }

  if (leavingCheckout) {
    return (
      <section className="sec store-sec">
        <div className="wrap">
          <p className="checkout-loading">
            Confirming your payment…
          </p>
        </div>
      </section>
    );
  }

  if (!ready || cartLoading || (count === 0 && !awaitingPaymob)) {
    return (
      <section className="sec store-sec">
        <div className="wrap">
          <p className="checkout-loading">Loading checkout…</p>
        </div>
      </section>
    );
  }

  const freeShipPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          digital
            ? { label: 'Design services', href: '/design-services' }
            : { label: 'Store', href: '/shop' },
          { label: 'Checkout', href: '/checkout' },
        ]}
        title="Secure checkout"
        lead={
          digital
            ? 'Pay for your design case. Your conversation opens in the inbox after payment.'
            : 'A few details and your ODYX gear is on its way.'
        }
      />

      <section className="sec store-sec co-sec">
        <div className="wrap">
          <ol className="co-progress" aria-label="Checkout progress">
            <li className="done">
              <span className="co-dot"><CheckIcon /></span>
              <Link href={digital ? '/design-services' : '/shop'}>
                {digital ? 'Design' : 'Store'}
              </Link>
            </li>
            <li className="done">
              <span className="co-dot"><CheckIcon /></span>
              <Link href="/cart">Cart</Link>
            </li>
            <li className="on">
              <span className="co-dot">3</span>
              <span>Checkout</span>
            </li>
          </ol>

          {mixed ? (
            <p className="co-form-error" style={{ marginBottom: '1.5rem' }}>
              Your cart mixes design services and hardware. Remove one type before checkout.
            </p>
          ) : null}

          <form className="co-shell" onSubmit={onSubmit} noValidate>
            <div className="co-main">
              <section className={`co-step${contactDone ? ' done' : ''}`}>
                <div className="co-step-head">
                  <span className="co-step-num">{contactDone ? <CheckIcon /> : '1'}</span>
                  <div>
                    <h2>Contact</h2>
                    <p>Where we send your order updates</p>
                  </div>
                </div>
                <div className="co-fields">
                  <Field
                    id="co-name"
                    label="Full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(v) => setField('name', v)}
                    error={errors.name}
                  />
                  <Field
                    id="co-email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(v) => setField('email', v)}
                    error={errors.email}
                  />
                  <Field
                    id="co-phone"
                    label="Phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    full
                    value={form.phone}
                    onChange={(v) => setField('phone', sanitizePhoneInput(v))}
                    error={errors.phone}
                  />
                </div>
              </section>

              {!digital ? (
              <section className={`co-step${shippingDone ? ' done' : ''}`}>
                <div className="co-step-head">
                  <span className="co-step-num">{shippingDone ? <CheckIcon /> : '2'}</span>
                  <div>
                    <h2>Shipping</h2>
                    <p>Where your equipment will be delivered</p>
                  </div>
                </div>
                <div className="co-fields">
                  <Field
                    id="co-line1"
                    label="Street address"
                    autoComplete="street-address"
                    full
                    value={form.line1}
                    onChange={(v) => setField('line1', v)}
                    error={errors.line1}
                  />
                  <Field
                    id="co-city"
                    label="Governorate / city (Bosta)"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(v) => setField('city', v)}
                    error={errors.city}
                  />
                </div>
              </section>
              ) : (
              <section className="co-step done">
                <div className="co-step-head">
                  <span className="co-step-num"><CheckIcon /></span>
                  <div>
                    <h2>Delivery</h2>
                    <p>Digital — design files are delivered in your inbox after you upload a scan</p>
                  </div>
                </div>
              </section>
              )}

              <section className={`co-step${paymentDone ? ' done' : ''}`}>
                <div className="co-step-head">
                  <span className="co-step-num">{paymentDone ? <CheckIcon /> : digital ? '2' : '3'}</span>
                  <div>
                    <h2>Payment</h2>
                    <p>
                      {digital
                        ? 'Paymob Pixel — enter your card on this page'
                        : 'Paymob Pixel (card) or cash on delivery (Bosta COD)'}
                    </p>
                  </div>
                </div>

                <div className="pay-methods" role="radiogroup" aria-label="Payment method">
                  <button
                    type="button"
                    className={`pay-method${payMethod === 'ONLINE' ? ' on' : ''}`}
                    role="radio"
                    aria-checked={payMethod === 'ONLINE'}
                    onClick={() => setPayMethod('ONLINE')}
                  >
                    <LockIcon /> Paymob Pixel (card)
                  </button>
                  {!digital ? (
                    <button
                      type="button"
                      className={`pay-method${payMethod === 'CASH' ? ' on' : ''}`}
                      role="radio"
                      aria-checked={payMethod === 'CASH'}
                      onClick={() => setPayMethod('CASH')}
                    >
                      Cash on delivery
                    </button>
                  ) : null}
                </div>
              </section>

              {formError ? <p className="co-form-error">{formError}</p> : null}
            </div>

            <aside className="co-summary">
              <h2>Order summary</h2>
              <ul className="co-items">
                {lines.map((line) => (
                  <li key={line.productId}>
                    <span className="co-item-thumb">
                      <img src={line.product.image} alt="" />
                      <i>{line.qty}</i>
                    </span>
                    <span className="co-item-info">
                      <strong>{line.product.name}</strong>
                      <em>{formatMoney(line.product.price)} each</em>
                    </span>
                    <span className="co-item-total">{formatMoney(line.lineTotal)}</span>
                    <button
                      type="button"
                      className="co-item-x"
                      onClick={() => void removeItemAsync(line.productId)}
                      aria-label={`Remove ${line.product.name}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              {!digital && shippingFee > 0 ? (
                <div className="co-freeship">
                  <span>
                    Add {formatMoney(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </span>
                  <span className="co-freeship-bar">
                    <i style={{ width: `${freeShipPct}%` }} />
                  </span>
                </div>
              ) : !digital ? (
                <p className="co-freeship-done">
                  <CheckIcon /> Free shipping unlocked
                </p>
              ) : (
                <p className="co-freeship-done">
                  <CheckIcon /> Digital delivery — no shipping
                </p>
              )}

              <div className="co-sum-row">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              {!digital ? (
                <div className="co-sum-row">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatMoney(shippingFee)}</span>
                </div>
              ) : null}
              <div className="co-sum-row co-sum-total">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>

              <button type="submit" className="co-pay-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="co-spin" aria-hidden /> Processing…
                  </>
                ) : (
                  <>
                    <LockIcon /> Pay {formatMoney(total)}
                  </>
                )}
              </button>

              <p className="co-trust">
                <LockIcon /> Paymob encrypted checkout · ODYX never stores your card
              </p>
              <Link className="co-back" href="/cart">
                Back to cart
              </Link>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}
