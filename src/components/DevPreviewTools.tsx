'use client';

import { useEffect, useState } from 'react';
import BackgroundPicker from '@/components/BackgroundPicker';
import EcosystemShadowPicker from '@/components/EcosystemShadowPicker';
import FontPicker from '@/components/FontPicker';

export const DEV_TOOLS_COLLAPSED_KEY = 'odyx-dev-tools-collapsed';

function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" strokeLinecap="round" />
      <circle cx="4" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="20" cy="16" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DevPreviewTools() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(DEV_TOOLS_COLLAPSED_KEY);
    setCollapsed(saved === 'true');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.toggleAttribute('data-dev-tools-collapsed', collapsed);
    if (collapsed) localStorage.setItem(DEV_TOOLS_COLLAPSED_KEY, 'true');
    else localStorage.removeItem(DEV_TOOLS_COLLAPSED_KEY);
  }, [collapsed, mounted]);

  const toggle = () => setCollapsed((v) => !v);
  const isCollapsed = mounted && collapsed;

  return (
    <div
      className={`dev-preview-tools${isCollapsed ? ' is-collapsed' : ''}`}
      aria-label="Preview tools"
    >
      <div id="dev-preview-tools-panels" className="dev-preview-tools-panels" hidden={isCollapsed}>
        <EcosystemShadowPicker />
        <FontPicker />
        <BackgroundPicker />
      </div>
      <button
        type="button"
        className="dev-preview-tools-toggle"
        onClick={toggle}
        aria-expanded={!isCollapsed}
        aria-controls="dev-preview-tools-panels"
        aria-label={isCollapsed ? 'Show preview tools' : 'Hide preview tools'}
        title={isCollapsed ? 'Show preview tools' : 'Hide preview tools'}
      >
        {isCollapsed ? <SlidersIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
}
