'use client';

import Link from 'next/link';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import QtyStepper from '@/components/shop/QtyStepper';
import {
  FREE_SHIPPING_THRESHOLD,
  SHOP_CATEGORY_LABEL,
  calcShipping,
  formatMoney,
} from '@/content/shop';
import { useCart } from '@/hooks/useCart';
import { removeItem, updateQty } from '@/lib/cart-store';

export default function CartPage() {
  const { lines, count } = useCart();
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;
  const shipProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
  const toFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Store', href: '/shop' },
          { label: 'Cart', href: '/cart' },
        ]}
        title="Your cart"
        lead={
          lines.length === 0
            ? 'Your cart is empty. Add a printer, curing unit, or scanner to get started.'
            : `${count} item${count === 1 ? '' : 's'} ready for checkout.`
        }
        action={
          lines.length > 0 ? (
            <PageActions>
              <Link className="btn btn-ghost" href="/shop">
                Continue shopping
              </Link>
              <Link className="btn" href="/checkout">
                Checkout <Arrow />
              </Link>
            </PageActions>
          ) : undefined
        }
      />

      <section className="sec store-sec cart-sec">
        <div className="wrap">
          <ol className="co-progress cart-progress" aria-label="Checkout progress">
            <li className="done">
              <span className="co-dot" aria-hidden>✓</span>
              <Link href="/shop">Store</Link>
            </li>
            <li className="on">
              <span className="co-dot" aria-hidden>2</span>
              <span>Cart</span>
            </li>
            <li>
              <span className="co-dot" aria-hidden>3</span>
              <span>Checkout</span>
            </li>
          </ol>

          {lines.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <path d="M6 6l-1-3H2" />
                  <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h2>Your cart is empty</h2>
              <p>Browse the ODYX Store for the P1-26, Cure, and S1 — then check out in minutes.</p>
              <div className="cart-empty-actions">
                <Link className="btn" href="/shop">
                  Browse store <Arrow />
                </Link>
                <Link className="btn btn-ghost" href="/products">
                  View products
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-main">
                <div className="cart-panel-head">
                  <h2>Items</h2>
                  <p>{lines.length} line{lines.length === 1 ? '' : 's'}</p>
                </div>

                <div className="cart-lines">
                  {lines.map((line, i) => (
                    <article
                      key={line.productId}
                      className="cart-line"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <Link
                        href={line.product.href ?? '/shop'}
                        className="cart-thumb"
                        tabIndex={-1}
                        aria-hidden
                      >
                        <img src={line.product.image} alt="" />
                      </Link>

                      <div className="cart-info">
                        <span className="cart-cat">
                          {SHOP_CATEGORY_LABEL[line.product.category]}
                        </span>
                        <h3>
                          {line.product.href ? (
                            <Link href={line.product.href} className="store-title-link">
                              {line.product.name}
                            </Link>
                          ) : (
                            line.product.name
                          )}
                        </h3>
                        <p className="cart-meta">
                          {formatMoney(line.product.price)} each
                          {line.product.unit ? ` · ${line.product.unit}` : ''}
                        </p>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeItem(line.productId)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="cart-qty-wrap">
                        <span className="cart-qty-label">Qty</span>
                        <QtyStepper
                          value={line.qty}
                          onChange={(q) => updateQty(line.productId, q)}
                          label={`Quantity for ${line.product.name}`}
                        />
                      </div>

                      <div className="cart-line-total">
                        <span className="cart-qty-label">Total</span>
                        <strong>{formatMoney(line.lineTotal)}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="cart-summary">
                <p className="cart-summary-kicker">Order summary</p>
                <h2>Ready to checkout</h2>

                <div className="cart-ship-note">
                  {shipping === 0 ? (
                    <p className="cart-ship-ok">Free shipping unlocked</p>
                  ) : (
                    <p>
                      Add <strong>{formatMoney(toFreeShip)}</strong> more for free shipping
                    </p>
                  )}
                  <div
                    className="cart-ship-bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(shipProgress * 100)}
                    aria-label="Progress toward free shipping"
                  >
                    <span style={{ width: `${shipProgress * 100}%` }} />
                  </div>
                </div>

                <div className="cart-sum-rows">
                  <div className="cart-sum-row">
                    <span>Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                  <div className="cart-sum-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatMoney(shipping)}</span>
                  </div>
                  <div className="cart-sum-row cart-sum-total">
                    <span>Total</span>
                    <span>{formatMoney(total)}</span>
                  </div>
                </div>

                <Link className="btn cart-checkout-btn" href="/checkout">
                  Proceed to checkout <Arrow />
                </Link>
                <Link className="cart-keep-shopping" href="/shop">
                  Keep shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
