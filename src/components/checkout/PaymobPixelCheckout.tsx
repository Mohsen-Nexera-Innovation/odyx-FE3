'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type PaymobPixelCheckoutProps = {
  publicKey: string;
  clientSecret: string;
  onComplete: () => void;
  onCancel?: () => void;
};

declare global {
  interface Window {
    Pixel?: new (config: Record<string, unknown>) => unknown;
  }
}

const PIXEL_CSS = [
  'https://cdn.jsdelivr.net/npm/paymob-pixel@1.2.7/styles.css',
  'https://cdn.jsdelivr.net/npm/paymob-pixel@1.2.7/main.css',
];
const PIXEL_JS = 'https://cdn.jsdelivr.net/npm/paymob-pixel@1.2.7/main.js';

function ensureStyles() {
  for (const href of PIXEL_CSS) {
    if (document.querySelector(`link[data-paymob-pixel="${href}"]`)) continue;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.paymobPixel = href;
    document.head.appendChild(link);
  }
}

/** Embeds Paymob Pixel card checkout inside the page. */
export default function PaymobPixelCheckout({
  publicKey,
  clientSecret,
  onComplete,
  onCancel,
}: PaymobPixelCheckoutProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState('');
  const mounted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onCancelRef = useRef(onCancel);
  onCompleteRef.current = onComplete;
  onCancelRef.current = onCancel;

  useEffect(() => {
    ensureStyles();
  }, []);

  useEffect(() => {
    if (!scriptReady || !publicKey || !clientSecret || mounted.current) return;
    if (typeof window.Pixel !== 'function') {
      setError('Paymob Pixel SDK failed to load.');
      return;
    }

    mounted.current = true;
    const el = document.getElementById('paymob-pixel');
    if (el) el.innerHTML = '';

    try {
      // eslint-disable-next-line no-new
      new window.Pixel({
        publicKey,
        clientSecret,
        paymentMethods: ['card'],
        elementId: 'paymob-pixel',
        showSaveCard: false,
        afterPaymentComplete: async () => {
          onCompleteRef.current();
        },
        onPaymentCancel: async () => {
          onCancelRef.current?.();
        },
      });
    } catch (err) {
      mounted.current = false;
      setError(err instanceof Error ? err.message : 'Could not start Paymob Pixel');
    }
  }, [scriptReady, publicKey, clientSecret]);

  return (
    <div className="paymob-pixel-wrap">
      <Script
        src={PIXEL_JS}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setError('Could not load Paymob Pixel script')}
      />
      {error ? <p className="co-form-error">{error}</p> : null}
      <div id="paymob-pixel" className="paymob-pixel-host" />
      <p className="paymob-pixel-note">
        Card details are entered securely via Paymob. ODYX never sees your full card number.
      </p>
    </div>
  );
}
