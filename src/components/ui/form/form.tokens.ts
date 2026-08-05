export const formTokens = {
  heights: {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  },
  padding: {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  },
  borderRadius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  },
  typography: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-action focus-visible:ring-offset-2 focus-visible:border-sky-action',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  invalid: 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 text-red-900',
  placeholder: 'placeholder:text-gray-400',
  transition: 'transition-all duration-200',
  cursor: {
    text: 'cursor-text',
    pointer: 'cursor-pointer',
    default: 'cursor-default',
  },
} as const;
