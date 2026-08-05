export const animationTokens = {
  transition: {
    default: 'transition-all duration-200 ease-in-out',
    fast: 'transition-all duration-150 ease-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
  motionSafe: 'motion-safe:transition-all',
  motionReduce: 'motion-reduce:transition-none',
} as const;
