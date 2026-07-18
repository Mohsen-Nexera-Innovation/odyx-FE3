'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { FREE_SHIPPING_THRESHOLD, calcShipping, formatMoney } from '@/content/shop';
import { useCart } from '@/hooks/useCart';
import { readSession } from '@/lib/auth';
import { isDesignCart, isMixedCart, removeItemAsync } from '@/lib/commerce';
import { isApiMode } from '@/lib/config';
import { placeOrderFacade, previewShipping, type OrderShipping } from '@/lib/orders';

type FormState = OrderShipping & {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  line1: '',
  city: '',
  country: '',
  postal: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

function digitsOnly(v: string) {
  return v.replace(/\D/g, '');
}

function formatCardNumber(v: string) {
  const d = digitsOnly(v).slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(v: string) {
  const d = digitsOnly(v).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidExpiry(expiry: string) {
  const m = /^(\d{2})\/(\d{2})$/.exec(expiry);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const exp = new Date(year, month, 0, 23, 59, 59);
  return exp >= new Date();
}

type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';

function cardBrand(num: string): CardBrand {
  const d = digitsOnly(num);
  if (/^4/.test(d)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'mastercard';
  if (/^3[47]/.test(d)) return 'amex';
  return 'generic';
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

function BrandMark({ brand }: { brand: CardBrand }) {
  if (brand === 'visa') return <span className="pay-brand pay-brand-visa">VISA</span>;
  if (brand === 'amex') return <span className="pay-brand pay-brand-amex">AMEX</span>;
  if (brand === 'mastercard') {
    return (
      <span className="pay-brand pay-brand-mc" aria-label="Mastercard">
        <i /><i />
      </span>
    );
  }
  return <span className="pay-brand pay-brand-generic">ODYX</span>;
}

export default function CheckoutPage() {
  const router = useRouter();
  const apiMode = isApiMode();
  const { lines, count, loading: cartLoading } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [cvcFocus, setCvcFocus] = useState(false);
  const [payMethod, setPayMethod] = useState<'ONLINE' | 'CASH'>('ONLINE');
  const [apiShipping, setApiShipping] = useState<number | null>(null);
  const [payIframe, setPayIframe] = useState<string | null>(null);

  useEffect(() => {
    setReady(true);
    if (apiMode) {
      const session = readSession();
      if (session) {
        setForm((f) => ({
          ...f,
          name: f.name || session.name,
          email: f.email || session.email,
          country: f.country || session.country || 'Egypt',
        }));
      }
    }
  }, [apiMode]);

  const digital = isDesignCart(lines);
  const mixed = isMixedCart(lines);

  useEffect(() => {
    if (!ready || cartLoading) return;
    if (apiMode && !readSession()) {
      router.replace('/login');
      return;
    }
    if (count === 0 && !payIframe) {
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
  }, [ready, cartLoading, count, router, apiMode, payIframe, digital]);

  useEffect(() => {
    if (digital) {
      setPayMethod('ONLINE');
      setApiShipping(0);
      return;
    }
    if (!apiMode || !form.city.trim()) {
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
  }, [apiMode, form.city, payMethod, digital]);

  useEffect(() => {
    if (!apiMode || !digital || count === 0) return;
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
  }, [apiMode, digital, count]);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shippingFee = digital
    ? 0
    : apiMode
      ? (apiShipping ?? 0)
      : calcShipping(subtotal);
  const total = subtotal + shippingFee;

  const contactDone =
    form.name.trim() !== '' && isValidEmail(form.email) && digitsOnly(form.phone).length >= 8;
  const shippingDone = digital
    ? true
    : apiMode
      ? form.line1.trim() !== '' && form.city.trim() !== ''
      : form.line1.trim() !== '' &&
        form.city.trim() !== '' &&
        form.country.trim() !== '' &&
        form.postal.trim() !== '';
  const paymentDone = apiMode
    ? true
    : form.cardName.trim() !== '' &&
      digitsOnly(form.cardNumber).length >= 15 &&
      isValidExpiry(form.expiry) &&
      digitsOnly(form.cvc).length >= 3;

  const brand = cardBrand(form.cardNumber);

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
    if (!form.phone.trim() || digitsOnly(form.phone).length < 8) next.phone = 'Valid phone required';
    if (!digital) {
      if (!form.line1.trim()) next.line1 = 'Required';
      if (!form.city.trim()) next.city = apiMode ? 'Governorate / city required (Bosta)' : 'Required';
      if (!apiMode) {
        if (!form.country.trim()) next.country = 'Required';
        if (!form.postal.trim()) next.postal = 'Required';
      }
    }
    if (!apiMode) {
      if (!form.cardName.trim()) next.cardName = 'Required';
      if (digitsOnly(form.cardNumber).length < 15) next.cardNumber = 'Enter a valid card number';
      if (!isValidExpiry(form.expiry)) next.expiry = 'Use MM/YY';
      if (digitsOnly(form.cvc).length < 3) next.cvc = 'Invalid CVC';
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
        paymentMethod: apiMode ? (digital ? 'ONLINE' : payMethod) : 'ONLINE',
      });

      if ('iframeUrl' in result && result.iframeUrl) {
        setPayIframe(result.iframeUrl);
        setSubmitting(false);
        return;
      }

      const orderId =
        'order' in result && result.order ? result.order.id : (result as { id: string }).id;
      router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not place order.');
      setSubmitting(false);
    }
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

  if (!ready || cartLoading || count === 0) {
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
            ? 'Pay for your design case, then upload your scan in the inbox.'
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
                    autoComplete="tel"
                    full
                    value={form.phone}
                    onChange={(v) => setField('phone', v)}
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
                    label={apiMode ? 'Governorate / city (Bosta)' : 'City'}
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(v) => setField('city', v)}
                    error={errors.city}
                  />
                  {!apiMode ? (
                    <>
                      <Field
                        id="co-country"
                        label="Country"
                        autoComplete="country-name"
                        value={form.country}
                        onChange={(v) => setField('country', v)}
                        error={errors.country}
                      />
                      <Field
                        id="co-postal"
                        label="Postal code"
                        autoComplete="postal-code"
                        full
                        value={form.postal}
                        onChange={(v) => setField('postal', v)}
                        error={errors.postal}
                      />
                    </>
                  ) : null}
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
                        ? apiMode
                          ? 'Online payment required for design services'
                          : 'Demo mode — no real charges are made'
                        : apiMode
                          ? 'Paymob card checkout or cash on delivery (Bosta COD)'
                          : 'Demo mode — no real charges are made'}
                    </p>
                  </div>
                </div>

                {apiMode ? (
                  <div className="pay-methods" role="radiogroup" aria-label="Payment method">
                    <button
                      type="button"
                      className={`pay-method${payMethod === 'ONLINE' ? ' on' : ''}`}
                      role="radio"
                      aria-checked={payMethod === 'ONLINE'}
                      onClick={() => setPayMethod('ONLINE')}
                    >
                      <LockIcon /> Paymob (card)
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
                ) : (
                  <>
                    <div className="pay-methods" role="radiogroup" aria-label="Payment method">
                      <button type="button" className="pay-method on" role="radio" aria-checked="true">
                        <LockIcon /> Card
                      </button>
                      <button type="button" className="pay-method" role="radio" aria-checked="false" disabled>
                        Bank transfer <em>Soon</em>
                      </button>
                      <button type="button" className="pay-method" role="radio" aria-checked="false" disabled>
                        Pay on delivery <em>Soon</em>
                      </button>
                    </div>

                    <div className={`pay-card${cvcFocus ? ' flip' : ''}`} aria-hidden>
                      <div className="pay-card-inner">
                        <div className="pay-card-front">
                          <div className="pay-card-top">
                            <span className="pay-chip" />
                            <BrandMark brand={brand} />
                          </div>
                          <p className="pay-card-num">{form.cardNumber || '•••• •••• •••• ••••'}</p>
                          <div className="pay-card-bottom">
                            <span>
                              <em>Card holder</em>
                              <strong>{form.cardName.toUpperCase() || 'YOUR NAME'}</strong>
                            </span>
                            <span>
                              <em>Expires</em>
                              <strong>{form.expiry || 'MM/YY'}</strong>
                            </span>
                          </div>
                        </div>
                        <div className="pay-card-back">
                          <span className="pay-card-stripe" />
                          <span className="pay-card-sig">
                            <i>{form.cvc || '•••'}</i>
                          </span>
                          <BrandMark brand={brand} />
                        </div>
                      </div>
                    </div>

                    <div className="co-fields">
                      <Field
                        id="co-card-name"
                        label="Name on card"
                        autoComplete="cc-name"
                        full
                        value={form.cardName}
                        onChange={(v) => setField('cardName', v)}
                        error={errors.cardName}
                      />
                      <Field
                        id="co-card-num"
                        label="Card number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        full
                        value={form.cardNumber}
                        onChange={(v) => setField('cardNumber', formatCardNumber(v))}
                        error={errors.cardNumber}
                      />
                      <Field
                        id="co-expiry"
                        label="Expiry (MM/YY)"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={form.expiry}
                        onChange={(v) => setField('expiry', formatExpiry(v))}
                        error={errors.expiry}
                      />
                      <Field
                        id="co-cvc"
                        label="CVC"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={form.cvc}
                        onChange={(v) => setField('cvc', digitsOnly(v).slice(0, 4))}
                        onFocus={() => setCvcFocus(true)}
                        onBlur={() => setCvcFocus(false)}
                        error={errors.cvc}
                      />
                    </div>
                  </>
                )}
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
                <LockIcon /> Encrypted demo checkout · No real charge
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
