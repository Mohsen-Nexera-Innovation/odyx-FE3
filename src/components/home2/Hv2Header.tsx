import Link from "next/link";

// Screen-scoped header matching the mock: logo · centered nav with carets ·
// single blue "Request a Demo" CTA. The global site header (#hdr) is hidden
// on this screen via home-v2.css.

const Caret = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const NAV = [
  { label: "About ODYX", href: "/about", caret: true },
  { label: "Products", href: "/products", caret: true },
  { label: "Workflows", href: "/workflows", caret: true },
  { label: "Learning", href: "/learning", caret: true },
  { label: "Support", href: "/support", caret: true },
  { label: "Store", href: "/shop", caret: false },
] as const;

export default function Hv2Header() {
  return (
    <header className="hv2-hdr">
      <div className="hv2-hdr-in">
        <Link href="/" className="hv2-logo" aria-label="ODYX home">
          <img src="/brand/odyx-company.png" alt="ODYX" />
        </Link>
        <nav className="hv2-hdr-nav" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="hv2-hdr-link">
              {n.label}
              {n.caret ? <Caret /> : null}
            </Link>
          ))}
        </nav>
        <Link className="hv2-btn hv2-btn-sm" href="/support">
          Request a Demo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
