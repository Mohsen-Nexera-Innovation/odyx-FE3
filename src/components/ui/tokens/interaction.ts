export const interactionTokens = {
  hover: 'hover:bg-opacity-90 hover:shadow-md transition-all',
  active: 'active:scale-95 active:shadow-sm',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  cursor: {
    default: 'cursor-default',
    pointer: 'cursor-pointer',
    text: 'cursor-text',
    notAllowed: 'cursor-not-allowed',
  },
  pointerEvents: {
    auto: 'pointer-events-auto',
    none: 'pointer-events-none',
  }
} as const;
