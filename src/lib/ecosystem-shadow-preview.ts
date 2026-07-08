import {
  buildCustomShadow,
  DEFAULT_ECO_INACTIVE_OPACITY,
  DEFAULT_ECO_SHADOW_ID,
  getEcosystemShadowOption,
  hexToRgb,
} from '@/content/ecosystem-shadow-options';

export type EcosystemShadowPreviewState = {
  shadowId: string;
  customColor?: string;
  inactiveOpacity?: number;
};

function resolveShadow(state: EcosystemShadowPreviewState): string | null {
  const { shadowId, customColor } = state;

  if (shadowId === 'custom' && customColor) {
    const rgb = hexToRgb(customColor);
    if (rgb) return buildCustomShadow(rgb.r, rgb.g, rgb.b);
    return null;
  }

  const option = getEcosystemShadowOption(shadowId);
  return option?.shadow ?? null;
}

export function applyEcosystemShadowPreview(state: EcosystemShadowPreviewState) {
  const root = document.documentElement;
  const shadow = resolveShadow(state);
  const inactiveOpacity =
    state.inactiveOpacity ?? DEFAULT_ECO_INACTIVE_OPACITY;

  const isDefault =
    state.shadowId === DEFAULT_ECO_SHADOW_ID &&
    inactiveOpacity === DEFAULT_ECO_INACTIVE_OPACITY;

  if (isDefault) {
    clearEcosystemShadowPreview();
    return;
  }

  root.setAttribute('data-eco-shadow-preview', state.shadowId);
  if (shadow) {
    root.style.setProperty('--eco-preview-shadow', shadow);
  } else {
    root.style.removeProperty('--eco-preview-shadow');
  }
  root.style.setProperty('--eco-preview-inactive-opacity', String(inactiveOpacity));
}

export function clearEcosystemShadowPreview() {
  const root = document.documentElement;
  root.removeAttribute('data-eco-shadow-preview');
  root.style.removeProperty('--eco-preview-shadow');
  root.style.removeProperty('--eco-preview-inactive-opacity');
}
