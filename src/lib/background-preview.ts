import { DEFAULT_BG_ID, getBackgroundOption } from '@/content/background-options';

export type BackgroundTone = 'light' | 'dark';

const DARK_BG_PATTERN =
  /navy|dark|slate|aurora|ocean|sunset|noise-dark|vignette|mesh-site|linear-navy-depth|radial-navy/i;

export function inferBackgroundTone(id: string): BackgroundTone {
  if (id === DEFAULT_BG_ID) return 'light';
  return DARK_BG_PATTERN.test(id) ? 'dark' : 'light';
}

export function applyBackgroundPreview(id: string) {
  const option = getBackgroundOption(id);
  const root = document.documentElement;

  if (!option || option.value === null) {
    root.removeAttribute('data-bg-preview');
    root.removeAttribute('data-bg-pattern');
    root.removeAttribute('data-bg-tone');
    root.style.removeProperty('--bg-preview');
    root.style.removeProperty('--bg-preview-size');
    return;
  }

  const isPattern = id.startsWith('pattern-');
  const bgSize = isPattern
    ? id === 'pattern-dot-grid'
      ? '24px 24px'
      : id === 'pattern-line-grid'
        ? '48px 48px'
        : undefined
    : undefined;

  root.setAttribute('data-bg-preview', id);
  root.setAttribute('data-bg-tone', inferBackgroundTone(id));
  if (isPattern) root.setAttribute('data-bg-pattern', 'true');
  else root.removeAttribute('data-bg-pattern');
  root.style.setProperty('--bg-preview', option.value);
  if (bgSize) root.style.setProperty('--bg-preview-size', bgSize);
  else root.style.removeProperty('--bg-preview-size');
}
