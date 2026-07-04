'use client';

import { useEffect, useState } from 'react';
import {
  BACKGROUND_GROUPS,
  BG_PREVIEW_STORAGE_KEY,
  DEFAULT_BG_ID,
  getBackgroundOption,
} from '@/content/background-options';
import { applyBackgroundPreview } from '@/lib/background-preview';

export default function BackgroundPicker() {
  const [selected, setSelected] = useState(DEFAULT_BG_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(BG_PREVIEW_STORAGE_KEY);
    const initial = saved && getBackgroundOption(saved) ? saved : DEFAULT_BG_ID;
    setSelected(initial);
    applyBackgroundPreview(initial);
    setReady(true);
  }, []);

  const onChange = (id: string) => {
    setSelected(id);
    applyBackgroundPreview(id);
    if (id === DEFAULT_BG_ID) localStorage.removeItem(BG_PREVIEW_STORAGE_KEY);
    else localStorage.setItem(BG_PREVIEW_STORAGE_KEY, id);
  };

  const current = getBackgroundOption(selected);

  return (
    <div className="bg-picker" aria-label="Background preview tool">
      <label className="bg-picker-label" htmlFor="bg-picker-select">
        Background
      </label>
      <select
        id="bg-picker-select"
        className="bg-picker-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        suppressHydrationWarning
        disabled={!ready}
      >
        {BACKGROUND_GROUPS.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {current && current.id !== DEFAULT_BG_ID && (
        <span
          className="bg-picker-swatch"
          style={{ background: current.value ?? undefined }}
          aria-hidden
        />
      )}
    </div>
  );
}
