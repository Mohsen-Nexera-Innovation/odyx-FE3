import type { ReactNode } from 'react';

const WHY_SRC: Record<string, string> = {
  accuracy: '/img/scanner/icons/why-accuracy.png',
  ai: '/img/scanner/icons/why-ai.png',
  weight: '/img/scanner/icons/why-weight.png',
  arch: '/img/scanner/icons/why-arch.png',
  open: '/img/scanner/icons/why-open.png',
};

/** Extracted from product-design-refrences/intraoral scanne-odyxs1.jpeg */
export const WHY_ICONS: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(WHY_SRC).map(([id, src]) => [
    id,
    // eslint-disable-next-line @next/next/no-img-element
    <img key={id} src={`${src}?v=sky1`} alt="" width={256} height={256} draggable={false} />,
  ]),
);

/**
 * Application icons — same shapes as the design mock Applications card,
 * regenerated at 512px for crisp display (source mock JPEG is too soft to upscale).
 */
const APP_SRC: Record<string, string> = {
  crowns: '/img/scanner/icons/app-crowns.png',
  veneers: '/img/scanner/icons/app-veneers.png',
  implant: '/img/scanner/icons/app-implant.png',
  ortho: '/img/scanner/icons/app-ortho.png',
};

export const APP_ICONS: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(APP_SRC).map(([id, src]) => [
    id,
    // eslint-disable-next-line @next/next/no-img-element
    <img key={id} src={`${src}?v=hq1`} alt="" width={512} height={512} draggable={false} />,
  ]),
);

/** Filled blue circle + white check — matches S1 design mock */
export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="s1l-check-svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.2 12.2l3.1 3.1 6.5-6.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
