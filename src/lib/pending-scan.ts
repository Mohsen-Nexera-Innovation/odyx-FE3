/**
 * Holds the STL chosen on the design request form until after checkout.
 * Uses IndexedDB so Paymob redirects / remounts do not lose the file.
 */

const DB_NAME = 'odyx_design_scan';
const STORE = 'pending';
const KEY = 'stl';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
  });
}

export async function savePendingScan(file: File): Promise<void> {
  if (typeof window === 'undefined') return;
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(
      { name: file.name, type: file.type, size: file.size, blob: file },
      KEY,
    );
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Failed to save scan'));
  });
  db.close();
}

export async function readPendingScan(): Promise<{
  name: string;
  size: number;
  file: File;
} | null> {
  if (typeof window === 'undefined') return null;
  const db = await openDb();
  const row = await new Promise<{
    name: string;
    type: string;
    size: number;
    blob: Blob;
  } | null>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve((req.result as typeof row) ?? null);
    req.onerror = () => reject(req.error ?? new Error('Failed to read scan'));
  });
  db.close();
  if (!row?.blob) return null;
  const file = new File([row.blob], row.name, {
    type: row.type || 'model/stl',
  });
  return { name: row.name, size: row.size, file };
}

export async function clearPendingScan(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('Failed to clear scan'));
    });
    db.close();
  } catch {
    /* ignore */
  }
}
