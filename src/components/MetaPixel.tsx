'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getMetaPixelId, trackMeta } from '@/lib/meta-pixel';

function shouldTrackPath(pathname: string | null): boolean {
  if (!pathname) return true;
  return !pathname.startsWith('/admin');
}

/** SPA PageView after the base pixel in `layout.tsx` has already fired once. */
export default function MetaPixel() {
  const pathname = usePathname();
  const pixelId = getMetaPixelId();
  const isFirstView = useRef(true);

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }
    if (!pixelId || !shouldTrackPath(pathname)) return;
    trackMeta('PageView');
  }, [pathname, pixelId]);

  return null;
}
