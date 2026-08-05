export type VariantConfig<V> = {
  base?: string;
  variants: V;
  defaultVariants?: Partial<{
    [K in keyof V]: keyof V[K];
  }>;
};

export type VariantProps<V> = Partial<{
  [K in keyof V]: keyof V[K];
}>;

export function defineVariants<V extends Record<string, Record<string, string>>>(
  config: VariantConfig<V>
) {
  return (options?: VariantProps<V>): string => {
    const classes: (string | undefined)[] = [config.base];

    if (config.variants) {
      const variantKeys = Object.keys(config.variants) as Array<keyof V>;
      
      for (const key of variantKeys) {
        const variantGroup = config.variants[key];
        const selectedVariant = options?.[key] ?? config.defaultVariants?.[key];
        
        if (selectedVariant !== undefined) {
          classes.push(variantGroup[selectedVariant as keyof typeof variantGroup] as string);
        }
      }
    }

    return classes.filter(Boolean).join(" ");
  };
}
