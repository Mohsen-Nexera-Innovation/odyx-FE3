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
  const [localError, setLocalError] = useState('');

  const accept = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith('.stl')) {
      setLocalError('STL files only');
      return false;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setLocalError(`Max ${MAX_MB} MB`);
      return false;
    }
    setLocalError('');
    return true;
  }, []);

  const pick = useCallback(
    (f: File | null) => {
      if (!f) {
        onFile(null);
        setLocalError('');
        return;
      }
      if (accept(f)) onFile(f);
    },
    [accept, onFile],
  );

  const showError = error || localError;

  return (
    <div
      className={`inbox-upload${drag ? ' is-dragover' : ''}${file ? ' has-file' : ''}${showError ? ' has-error' : ''}`}
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
        accept=".stl,model/stl,application/sla"
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
          <span className="inbox-upload-lead">Drop STL here</span>
          <span className="inbox-upload-hint">Max {MAX_MB} MB · .stl only</span>
        </label>
      )}
      {showError ? <p className="inbox-upload-error">{showError}</p> : null}
    </div>
  );
}
