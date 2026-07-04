'use client';

import { useCallback, useState } from 'react';

type StlUploadZoneProps = {
  file: File | null;
  onFile: (file: File | null) => void;
  error?: string;
};

const MAX_MB = 50;

export default function StlUploadZone({ file, onFile, error }: StlUploadZoneProps) {
  const [drag, setDrag] = useState(false);

  const accept = useCallback((f: File) => {
    const ok =
      f.name.toLowerCase().endsWith('.stl') ||
      f.name.toLowerCase().endsWith('.zip');
    if (!ok) return false;
    if (f.size > MAX_MB * 1024 * 1024) return false;
    return true;
  }, []);

  const pick = useCallback(
    (f: File | null) => {
      if (!f) {
        onFile(null);
        return;
      }
      if (accept(f)) onFile(f);
    },
    [accept, onFile],
  );

  return (
    <div
      className={`inbox-upload${drag ? ' is-dragover' : ''}${file ? ' has-file' : ''}${error ? ' has-error' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        pick(e.dataTransfer.files[0] ?? null);
      }}
    >
      <input
        type="file"
        id="stl-upload"
        accept=".stl,.zip"
        className="inbox-upload-input"
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />
      {file ? (
        <div className="inbox-upload-file">
          <strong>{file.name}</strong>
          <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          <button type="button" className="inbox-upload-clear" onClick={() => onFile(null)}>
            Remove
          </button>
        </div>
      ) : (
        <label htmlFor="stl-upload" className="inbox-upload-label">
          <span className="inbox-upload-icon" aria-hidden>
            ↑
          </span>
          <span className="inbox-upload-lead">Drop STL or ZIP here</span>
          <span className="inbox-upload-hint">Max {MAX_MB} MB · scan mesh or bundled intake</span>
        </label>
      )}
      {error ? <p className="inbox-upload-error">{error}</p> : null}
    </div>
  );
}
