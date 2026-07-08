'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_ECO_INACTIVE_OPACITY,
  DEFAULT_ECO_SHADOW_ID,
  ECOSYSTEM_SHADOW_OPTIONS,
  ECO_CUSTOM_COLOR_STORAGE_KEY,
  ECO_INACTIVE_OPACITY_STORAGE_KEY,
  ECO_SHADOW_STORAGE_KEY,
  getEcosystemShadowOption,
} from '@/content/ecosystem-shadow-options';
import { applyEcosystemShadowPreview } from '@/lib/ecosystem-shadow-preview';

const DEFAULT_CUSTOM_COLOR = '#085082';

function persistState(shadowId: string, customColor: string, inactiveOpacity: number) {
  const isDefault =
    shadowId === DEFAULT_ECO_SHADOW_ID &&
    inactiveOpacity === DEFAULT_ECO_INACTIVE_OPACITY;

  if (isDefault) {
    localStorage.removeItem(ECO_SHADOW_STORAGE_KEY);
    localStorage.removeItem(ECO_INACTIVE_OPACITY_STORAGE_KEY);
    localStorage.removeItem(ECO_CUSTOM_COLOR_STORAGE_KEY);
    return;
  }

  localStorage.setItem(ECO_SHADOW_STORAGE_KEY, shadowId);
  localStorage.setItem(ECO_INACTIVE_OPACITY_STORAGE_KEY, String(inactiveOpacity));
  if (shadowId === 'custom') {
    localStorage.setItem(ECO_CUSTOM_COLOR_STORAGE_KEY, customColor);
  } else {
    localStorage.removeItem(ECO_CUSTOM_COLOR_STORAGE_KEY);
  }
}

function applyAll(shadowId: string, customColor: string, inactiveOpacity: number) {
  applyEcosystemShadowPreview({
    shadowId,
    customColor: shadowId === 'custom' ? customColor : undefined,
    inactiveOpacity,
  });
}

export default function EcosystemShadowPicker() {
  const [shadowId, setShadowId] = useState(DEFAULT_ECO_SHADOW_ID);
  const [customColor, setCustomColor] = useState(DEFAULT_CUSTOM_COLOR);
  const [inactiveOpacity, setInactiveOpacity] = useState(DEFAULT_ECO_INACTIVE_OPACITY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedShadow = localStorage.getItem(ECO_SHADOW_STORAGE_KEY);
    const savedOpacity = localStorage.getItem(ECO_INACTIVE_OPACITY_STORAGE_KEY);
    const savedColor = localStorage.getItem(ECO_CUSTOM_COLOR_STORAGE_KEY);

    const initialShadow =
      savedShadow && getEcosystemShadowOption(savedShadow) ? savedShadow : DEFAULT_ECO_SHADOW_ID;
    const initialOpacity = savedOpacity ? parseFloat(savedOpacity) : DEFAULT_ECO_INACTIVE_OPACITY;
    const initialColor = savedColor ?? DEFAULT_CUSTOM_COLOR;

    setShadowId(initialShadow);
    setInactiveOpacity(Number.isFinite(initialOpacity) ? initialOpacity : DEFAULT_ECO_INACTIVE_OPACITY);
    setCustomColor(initialColor);
    applyAll(initialShadow, initialColor, initialOpacity);
    setReady(true);
  }, []);

  const onShadowChange = (id: string) => {
    setShadowId(id);
    applyAll(id, customColor, inactiveOpacity);
    persistState(id, customColor, inactiveOpacity);
  };

  const onCustomColorChange = (color: string) => {
    setCustomColor(color);
    const id = 'custom';
    setShadowId(id);
    applyAll(id, color, inactiveOpacity);
    persistState(id, color, inactiveOpacity);
  };

  const onOpacityChange = (value: number) => {
    setInactiveOpacity(value);
    applyAll(shadowId, customColor, value);
    persistState(shadowId, customColor, value);
  };

  const current = getEcosystemShadowOption(shadowId);
  const swatchColor =
    shadowId === 'custom'
      ? customColor
      : current?.swatch ?? 'transparent';

  return (
    <div className="eco-shadow-picker" aria-label="Ecosystem shadow preview tool">
      <label className="eco-shadow-picker-label" htmlFor="eco-shadow-select">
        Eco shadow
      </label>
      <select
        id="eco-shadow-select"
        className="eco-shadow-picker-select"
        value={shadowId}
        onChange={(e) => onShadowChange(e.target.value)}
        suppressHydrationWarning
        disabled={!ready}
      >
        {ECOSYSTEM_SHADOW_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <input
        type="color"
        className="eco-shadow-picker-color"
        value={customColor}
        onChange={(e) => onCustomColorChange(e.target.value)}
        disabled={!ready}
        aria-label="Custom shadow color"
        title="Pick a custom shadow tint"
      />
      <span
        className="eco-shadow-picker-swatch"
        style={{ background: swatchColor }}
        aria-hidden
      />
      <label className="eco-shadow-picker-opacity-label" htmlFor="eco-shadow-opacity">
        Fade
      </label>
      <input
        id="eco-shadow-opacity"
        type="range"
        className="eco-shadow-picker-range"
        min={0.3}
        max={1}
        step={0.02}
        value={inactiveOpacity}
        onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
        disabled={!ready}
        aria-label="Inactive slide fade"
      />
      <span className="eco-shadow-picker-opacity-val" aria-live="polite">
        {Math.round(inactiveOpacity * 100)}%
      </span>
    </div>
  );
}
