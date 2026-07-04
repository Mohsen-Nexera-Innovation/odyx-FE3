import {
  DEFAULT_FONT_FAMILY_ID,
  DEFAULT_FONT_SIZE_ID,
  getFontFamilyOption,
  getFontSizeOption,
} from '@/content/font-options';

export function applyFontFamily(id: string) {
  const option = getFontFamilyOption(id);
  const root = document.documentElement;

  if (!option || option.id === DEFAULT_FONT_FAMILY_ID || !option.display || !option.body) {
    root.removeAttribute('data-font-family');
    root.style.removeProperty('--font-display');
    root.style.removeProperty('--font-body');
    return;
  }

  root.setAttribute('data-font-family', id);
  root.style.setProperty('--font-display', option.display);
  root.style.setProperty('--font-body', option.body);
}

export function applyFontSize(id: string) {
  const option = getFontSizeOption(id);
  const root = document.documentElement;

  if (!option || option.id === DEFAULT_FONT_SIZE_ID || !option.scale) {
    root.removeAttribute('data-font-size');
    root.style.removeProperty('font-size');
    return;
  }

  root.setAttribute('data-font-size', id);
  root.style.fontSize = option.scale;
}
