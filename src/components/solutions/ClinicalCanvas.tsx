'use client';

import { useLayoutEffect } from 'react';

/** Paints body / main / site-bg the same solid canvas color the old clinical CSS used. */
export default function ClinicalCanvas({ color }: { color: string }) {
  useLayoutEffect(() => {
    const nodes = [document.body, document.querySelector('main'), document.querySelector('.site-bg')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    const prev = nodes.map((el) => el.style.getPropertyValue('background'));
    for (const el of nodes) el.style.setProperty('background', color);
    return () => {
      nodes.forEach((el, i) => {
        const value = prev[i];
        if (value) el.style.setProperty('background', value);
        else el.style.removeProperty('background');
      });
    };
  }, [color]);

  return null;
}
