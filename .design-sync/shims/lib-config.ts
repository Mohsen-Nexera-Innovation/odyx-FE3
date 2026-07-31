// design-sync shim for `@/lib/config`.
//
// The real module reads NEXT_PUBLIC_* from `process.env` at module scope. The
// design-system bundle is a plain browser IIFE with no `process`, so loading it
// threw a ReferenceError before any component could mount — one bad module took
// down all 13 exports.
//
// Pinning API mode off is the faithful answer rather than a stub: a design
// surface has no Nest backend to call, so components take exactly the branch
// they take in the demo build (local stores, no live cart/inbox counts, no
// Google sign-in button).

export function isApiMode(): boolean {
  return false;
}

export function getApiBaseUrl(): string {
  return '';
}

export function getGoogleClientId(): string {
  return '';
}

export function isGoogleSignInEnabled(): boolean {
  return false;
}
