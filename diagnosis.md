# Root Cause Analysis

## 1. Root Cause
The alignment issue is caused by an architectural nesting conflict involving `PageContainer`. 

The UI Kit's `PageSection` primitive is an opinionated wrapper that already includes an internal `PageContainer` to constrain and align its content (`mx-auto max-w-7xl`). 

However, the composition root of the About page is currently wrapping all sections in an outer `PageContainer`. This double-nesting creates a redundant layout constraint. The outer `PageContainer` restricts the entire page to a fixed max-width, preventing the individual `PageSection` components from rendering their full-bleed backgrounds (like `bg-slate-50` in `AboutHero`). The inner containers then fight for alignment control, resulting in the structural layout conflict that shifts the visual center of the page.

## 2. Exact File Causing It
`/src/app/about/components/AboutPage.tsx`

The file is incorrectly using `<PageContainer as="main">` as the root wrapper for the page sections.

## 3. Minimal Fix
Remove the redundant `PageContainer` from the composition root and replace it with a standard `<main>` tag or React Fragment (`<>`), allowing each `PageSection` to control its own full-bleed background and centered container.

**In `src/app/about/components/AboutPage.tsx`:**

Change:
```tsx
import { PageContainer } from '@/components/ui/layout/PageContainer';
// ...
export default function AboutPage() {
  return (
    <PageContainer as="main">
      <AboutHero data={aboutData.hero} />
      {/* ... */}
    </PageContainer>
  );
}
```

To:
```tsx
export default function AboutPage() {
  return (
    <main>
      <AboutHero data={aboutData.hero} />
      {/* ... */}
    </main>
  );
}
```
