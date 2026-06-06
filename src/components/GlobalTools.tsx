'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';

type Locale = 'en' | 'ar' | 'fr';

export type { Locale };

interface GlobalToolsCtx {
  openSearch: () => void;
  closeSearch: () => void;
  toggleAi: () => void;
  openAi: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const GlobalToolsContext = createContext<GlobalToolsCtx | null>(null);

export function useGlobalTools() {
  const ctx = useContext(GlobalToolsContext);
  if (!ctx) throw new Error('useGlobalTools must be used within GlobalToolsProvider');
  return ctx;
}

const SEARCH_ITEMS = [
  { label: 'Workflow Hub', href: '/workflows' },
  { label: 'Scan step', href: '/workflows/scan' },
  { label: 'Intraoral Scanner', href: '/products/intraoral-scanner' },
  { label: '3D Printers', href: '/products/3d-printers' },
  { label: 'Resins & Materials', href: '/products/resins' },
  { label: 'For Dentists', href: '/solutions/dentists' },
  { label: 'For Dental Labs', href: '/solutions/labs' },
  { label: 'Support Hub', href: '/support' },
  { label: 'Register your device', href: '/#register' },
  { label: 'Learning Center', href: '/learning' },
  { label: 'Request a Demo', href: '/#cta' },
];

const AI_SUGGESTIONS = [
  'Which resin do I use for crowns?',
  'What printer suits a small clinic?',
  'How does the workflow work?',
  "I'm a dentist - where to start?",
  'How do I register my device?',
];

const AI_ANSWERS: Record<string, string> = {
  'Which resin do I use for crowns?':
    'For permanent crowns use the ODYX Permanent Crown & Bridge resin, or Ceramic Crown resin for higher aesthetics. For provisionals, the Temporary Restoration line fits best.',
  'What printer suits a small clinic?':
    'A compact ODYX desktop printer paired with a curing machine covers chairside crowns and guides. Visit Featured Products or request a demo for a tailored setup.',
  'How does the workflow work?':
    'ODYX runs Scan, Design, Print, Cure, Finish and Deliver as one connected flow. See the Ecosystem section on this page to walk each step.',
  "I'm a dentist - where to start?":
    'Start with Choose Your Path (Dentist), then explore Solutions and the Guided Workflow. Book a demo when you are ready to go digital chairside.',
  'How do I register my device?':
    'Scroll to Device Registration, enter your serial number and clinic details, or check status with your serial. Registration unlocks warranty, updates and academy access.',
};

const LOCALE_LABEL: Record<Locale, string> = { en: 'EN', ar: 'AR', fr: 'FR' };

const WA_URL = 'https://wa.me/9718000ODYX?text=Hello%20ODYX%20support';

function matchAiAnswer(q: string) {
  const key = Object.keys(AI_ANSWERS).find((k) => k.toLowerCase() === q.toLowerCase());
  if (key) return AI_ANSWERS[key];
  const lower = q.toLowerCase();
  if (lower.includes('resin') || lower.includes('crown')) return AI_ANSWERS['Which resin do I use for crowns?'];
  if (lower.includes('printer') || lower.includes('clinic')) return AI_ANSWERS['What printer suits a small clinic?'];
  if (lower.includes('workflow') || lower.includes('scan')) return AI_ANSWERS['How does the workflow work?'];
  if (lower.includes('dentist') || lower.includes('start')) return AI_ANSWERS["I'm a dentist - where to start?"];
  if (lower.includes('register') || lower.includes('serial') || lower.includes('warranty')) return AI_ANSWERS['How do I register my device?'];
  return 'Good question. For pricing, custom orders or clinical advice our team can help - use WhatsApp or Request a Demo and a specialist will follow up.';
}

export function GlobalToolsProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hi! I can help you pick a product, walk the workflow, register a device, or reach support. What are you working on?' },
  ]);
  const [aiInput, setAiInput] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const aiBodyRef = useRef<HTMLDivElement>(null);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => { setSearchOpen(false); setQuery(''); }, []);
  const toggleAi = useCallback(() => setAiOpen((o) => !o), []);
  const openAi = useCallback(() => setAiOpen(true), []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    const root = document.documentElement;
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const askAi = useCallback((q: string) => {
    const text = q.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setAiInput('');
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: matchAiAnswer(text) }]);
    }, 420);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (aiBodyRef.current) aiBodyRef.current.scrollTop = aiBodyRef.current.scrollHeight;
  }, [messages, aiOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setAiOpen(false);
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : SEARCH_ITEMS;

  const submitAi = (e: FormEvent) => {
    e.preventDefault();
    askAi(aiInput);
  };

  return (
    <GlobalToolsContext.Provider value={{ openSearch, closeSearch, toggleAi, openAi, locale, setLocale }}>
      {children}

      <div className={`search-ov${searchOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }} role="dialog" aria-modal="true" aria-label="Site search">
        <div className="search-box">
          <input ref={searchRef} type="search" placeholder="Search products, workflows, cases, learning, support..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="search-hint">
            {(filtered.length ? filtered : [{ label: 'No matches - try Featured Products', href: '#featured' }]).map((i) => (
              <a key={i.label} href={i.href} onClick={closeSearch}>{i.label}</a>
            ))}
          </div>
          <p className="search-kbd">Press <kbd>Esc</kbd> to close &middot; <kbd>Cmd</kbd>+<kbd>K</kbd> to open</p>
        </div>
      </div>

      <div className={`ai-panel${aiOpen ? ' open' : ''}`} role="dialog" aria-label="ODYX Smart Assistant">
        <div className="ai-head">
          <h4>ODYX Smart Assistant</h4>
          <p>Product and workflow guidance</p>
          <button type="button" className="ai-close" onClick={() => setAiOpen(false)} aria-label="Close assistant">&times;</button>
        </div>
        <div className="ai-body" ref={aiBodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>
          ))}
        </div>
        <div className="ai-suggest">
          {AI_SUGGESTIONS.map((q) => (
            <button key={q} type="button" onClick={() => askAi(q)}>{q}</button>
          ))}
        </div>
        <form className="ai-foot" onSubmit={submitAi}>
          <input type="text" placeholder="Ask about products, workflow, support..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} aria-label="Message to assistant" />
          <button type="submit" className="btn btn-sm">Send</button>
        </form>
      </div>

      <div className="fabs">
        <button type="button" className="fab wa" title="WhatsApp - ODYX Customer Care" aria-label="WhatsApp customer care" onClick={() => window.open(WA_URL, '_blank', 'noopener')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.486 2 2 6.486 2 12c0 1.768.46 3.433 1.267 4.882L2 22l5.233-1.237A9.956 9.956 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18.2a8.18 8.18 0 0 1-4.178-1.146l-.3-.178-3.1.737.737-3.023-.195-.312A8.2 8.2 0 0 1 3.8 12c0-4.535 3.665-8.2 8.2-8.2s8.2 3.665 8.2 8.2-3.665 8.2-8.2 8.2z"/></svg>
        </button>
        <button type="button" className="fab ai" title="Smart AI Assistant" aria-label="Open Smart AI Assistant" aria-expanded={aiOpen} onClick={toggleAi}>
          <span className="ring" aria-hidden />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 8a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0" /></svg>
        </button>
      </div>
    </GlobalToolsContext.Provider>
  );
}

export { LOCALE_LABEL };
