/**
 * Digital Workflow strip destinations — product pages (not /workflows/*).
 * Used on Cure, P1-26, printers family, about spine, etc.
 *
 * Deliver is intentionally omitted from product workflow cards.
 * Design is visible but dimmed / non-navigable until that page is ready.
 */
export const DIGITAL_WORKFLOW_LINKS = {
  scan: '/products/odyx-s1',
  design: '/products/design',
  print: '/products/odyx-p1-26',
  cure: '/products/curing-machines',
  /** Finish / materials used to produce the restoration */
  finish: '/products/resins',
} as const;

export type DigitalWorkflowStepId = keyof typeof DIGITAL_WORKFLOW_LINKS;

/** Steps shown as visible-but-blocked in Digital Workflow strips */
export const DIGITAL_WORKFLOW_DIMMED: Partial<Record<DigitalWorkflowStepId, true>> = {
  design: true,
};

export function digitalWorkflowHref(id: DigitalWorkflowStepId | string): string {
  return DIGITAL_WORKFLOW_LINKS[id as DigitalWorkflowStepId] ?? '/products';
}

export function isDigitalWorkflowDimmed(id: DigitalWorkflowStepId | string): boolean {
  return DIGITAL_WORKFLOW_DIMMED[id as DigitalWorkflowStepId] === true;
}
