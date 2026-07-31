// design-sync shim for `next/navigation`.
//
// Components read the current route to drive active-nav state. Outside Next
// there is no route, so we pin the pathname to "/" — the home screen. That is
// deliberate, not a placeholder: the design system's approved chrome is the
// header/footer treatment as it appears on Home, so pinning "/" makes every
// preview render exactly that state.
const HOME_PATHNAME = '/';

export function usePathname(): string {
  return HOME_PATHNAME;
}

export function useRouter() {
  const noop = () => {};
  return { push: noop, replace: noop, back: noop, forward: noop, refresh: noop, prefetch: noop };
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams(): Record<string, string | string[]> {
  return {};
}

export function useSelectedLayoutSegment(): string | null {
  return null;
}

export function useSelectedLayoutSegments(): string[] {
  return [];
}

export function redirect(_url: string): void {}
export function permanentRedirect(_url: string): void {}
export function notFound(): void {}
