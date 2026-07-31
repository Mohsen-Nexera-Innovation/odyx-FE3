// design-sync shim for `next/link`.
//
// The design-system bundle runs outside Next: there is no router, so Link's
// client-side navigation, prefetching and route announcing have nothing to
// talk to. Every ODYX component uses Link purely as "an anchor that points
// somewhere", so rendering a real <a> is behaviourally faithful for a design
// surface and keeps href/className/aria-* intact for the design agent.
import * as React from 'react';

type NextLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | { pathname?: string; hash?: string; query?: unknown };
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string | false;
};

function hrefToString(href: NextLinkProps['href']): string {
  if (typeof href === 'string') return href;
  if (href && typeof href === 'object') return `${href.pathname ?? ''}${href.hash ?? ''}` || '#';
  return '#';
}

export default function Link({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  passHref,
  legacyBehavior,
  locale,
  children,
  ...rest
}: NextLinkProps) {
  return (
    <a href={hrefToString(href)} {...rest}>
      {children}
    </a>
  );
}
