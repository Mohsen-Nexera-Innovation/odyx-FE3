export function notifyInboxChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('odyx-inbox-change'));
}
