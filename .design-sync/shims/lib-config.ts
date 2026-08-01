// design-sync shim for `@/lib/config`.
//
// The real module reads NEXT_PUBLIC_* from `process.env` at module scope. The
// design-system bundle is a plain browser IIFE with no `process`, so loading it
// threw a ReferenceError before any component could mount.
//
// Design surfaces have no Nest backend — keep API URL empty so network calls
// are skipped in the isolated preview bundle.

export function getApiBaseUrl(): string {
  return '';
}

export function getGoogleClientId(): string {
  return '';
}

export function isGoogleSignInEnabled(): boolean {
  return false;
}
