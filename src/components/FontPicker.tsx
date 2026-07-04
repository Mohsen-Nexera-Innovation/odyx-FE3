'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_FONT_FAMILY_ID,
  DEFAULT_FONT_SIZE_ID,
  FONT_FAMILY_OPTIONS,
  FONT_FAMILY_STORAGE_KEY,
  FONT_SIZE_OPTIONS,
  FONT_SIZE_STORAGE_KEY,
  getFontFamilyOption,
  getFontSizeOption,
} from '@/content/font-options';
import { applyFontFamily, applyFontSize } from '@/lib/font-preview';

export default function FontPicker() {
  const [family, setFamily] = useState(DEFAULT_FONT_FAMILY_ID);
  const [size, setSize] = useState(DEFAULT_FONT_SIZE_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedFamily = localStorage.getItem(FONT_FAMILY_STORAGE_KEY);
    const initialFamily =
      savedFamily && getFontFamilyOption(savedFamily) ? savedFamily : DEFAULT_FONT_FAMILY_ID;
    const savedSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    const initialSize =
      savedSize && getFontSizeOption(savedSize) ? savedSize : DEFAULT_FONT_SIZE_ID;

    setFamily(initialFamily);
    setSize(initialSize);
    applyFontFamily(initialFamily);
    applyFontSize(initialSize);
    setReady(true);
  }, []);

  const onFamilyChange = (id: string) => {
    setFamily(id);
    applyFontFamily(id);
    if (id === DEFAULT_FONT_FAMILY_ID) localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);
    else localStorage.setItem(FONT_FAMILY_STORAGE_KEY, id);
  };

  const onSizeChange = (id: string) => {
    setSize(id);
    applyFontSize(id);
    if (id === DEFAULT_FONT_SIZE_ID) localStorage.removeItem(FONT_SIZE_STORAGE_KEY);
    else localStorage.setItem(FONT_SIZE_STORAGE_KEY, id);
  };

  return (
    <div className="font-picker" aria-label="Font preview tool">
      <label className="font-picker-label" htmlFor="font-picker-family">
        Font
      </label>
      <select
        id="font-picker-family"
        className="font-picker-select"
        value={family}
        onChange={(e) => onFamilyChange(e.target.value)}
        suppressHydrationWarning
        disabled={!ready}
        aria-label="Font family"
      >
        {FONT_FAMILY_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <select
        id="font-picker-size"
        className="font-picker-select font-picker-select--size"
        value={size}
        onChange={(e) => onSizeChange(e.target.value)}
        suppressHydrationWarning
        disabled={!ready}
        aria-label="Font size"
      >
        {FONT_SIZE_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
