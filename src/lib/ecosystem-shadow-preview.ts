import {
  buildSectionBackground,
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

function resolveSectionBackground(state: EcosystemShadowPreviewState): string | null {
  const { shadowId, customColor } = state;
  const intensity = state.inactiveOpacity ?? DEFAULT_ECO_INACTIVE_OPACITY;

  if (shadowId === 'none') return 'transparent';

  if (shadowId === 'custom' && customColor) {
    const rgb = hexToRgb(customColor);
    if (rgb) return buildSectionBackground(rgb.r, rgb.g, rgb.b, intensity);
    return null;
  }

  const option = getEcosystemShadowOption(shadowId);
  if (!option?.tintRgb) return null;

  const { r, g, b } = option.tintRgb;
  return buildSectionBackground(r, g, b, intensity, option.deep);
}

export function applyEcosystemShadowPreview(state: EcosystemShadowPreviewState) {
  const root = document.documentElement;

  if (state.shadowId === DEFAULT_ECO_SHADOW_ID) {
    clearEcosystemShadowPreview();
    return;
  }

  const sectionBg = resolveSectionBackground(state);
  if (!sectionBg) {
    clearEcosystemShadowPreview();
    return;
  }

  const intensity = state.inactiveOpacity ?? DEFAULT_ECO_INACTIVE_OPACITY;
  root.setAttribute('data-eco-shadow-preview', state.shadowId);
  root.style.setProperty('--eco-preview-section-bg', sectionBg);
  root.style.setProperty('--eco-preview-intensity', String(intensity));
}

export function clearEcosystemShadowPreview() {
  const root = document.documentElement;
  root.removeAttribute('data-eco-shadow-preview');
  root.style.removeProperty('--eco-preview-section-bg');
  root.style.removeProperty('--eco-preview-intensity');
}
