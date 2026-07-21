const STASH_KEY = 'odyx_google_id_token';

export function stashGoogleIdToken(idToken: string) {
  try {
    sessionStorage.setItem(STASH_KEY, idToken);
  } catch {
    // ignore quota / private mode
  }
}

export function peekGoogleIdToken(): string | null {
  try {
    return sessionStorage.getItem(STASH_KEY);
  } catch {
    return null;
  }
}

export function clearGoogleIdToken() {
  try {
    sessionStorage.removeItem(STASH_KEY);
  } catch {
    // ignore
  }
}

/** Decode GIS ID token payload for display only — server still verifies the token. */
export function decodeGoogleIdToken(idToken: string): {
  email?: string;
  name?: string;
  picture?: string;
} | null {
  try {
    const parts = idToken.split('.');
    if (parts.length < 2) return null;
    const json = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(json) as {
      email?: string;
      name?: string;
      picture?: string;
    };
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch {
    return null;
  }
}

type GisCredentialResponse = { credential?: string };

type GisAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GisCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'large' | 'medium' | 'small';
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
      shape?: 'rectangular' | 'pill' | 'circle' | 'square';
      width?: number;
      logo_alignment?: 'left' | 'center';
    },
  ) => void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GisAccountsId } };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadGoogleIdentityScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Identity requires a browser.'));
  }
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-odyx-gis="1"]',
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Google Identity.')),
      );
      if (window.google?.accounts?.id) resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.odyxGis = '1';
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Failed to load Google Identity.'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function renderGoogleButton(
  parent: HTMLElement,
  options: {
    clientId: string;
    text?: 'signin_with' | 'signup_with' | 'continue_with';
    onCredential: (idToken: string) => void;
    onError?: (message: string) => void;
  },
): Promise<void> {
  await loadGoogleIdentityScript();
  const gis = window.google?.accounts?.id;
  if (!gis) {
    options.onError?.('Google Identity is unavailable.');
    return;
  }

  parent.innerHTML = '';
  gis.initialize({
    client_id: options.clientId,
    callback: (response) => {
      const token = response.credential?.trim();
      if (!token) {
        options.onError?.('Google did not return a credential.');
        return;
      }
      options.onCredential(token);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });

  const width = Math.min(400, Math.max(240, parent.clientWidth || 320));
  gis.renderButton(parent, {
    theme: 'outline',
    size: 'large',
    text: options.text ?? 'continue_with',
    shape: 'rectangular',
    width,
    logo_alignment: 'left',
  });
}
