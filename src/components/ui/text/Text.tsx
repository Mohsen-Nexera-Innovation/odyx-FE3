import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { textVariants } from './text.tokens';

type TextVariantsOptions = NonNullable<Parameters<typeof textVariants>[0]>;
type TextVariant = NonNullable<TextVariantsOptions['variant']>;
type TextWeight = NonNullable<TextVariantsOptions['weight']>;

export type TextProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    variant?: TextVariant;
    weight?: TextWeight;
  }
>;

const TextInner = <C extends ElementType = 'p'>(
  { as, className, variant, weight, ...props }: TextProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'p';

  return (
    <Component
      ref={ref}
      className={cn(textVariants({ variant, weight }), className)}
      {...props}
    />
  );
};

export type TextComponent = <C extends ElementType = 'p'>(
  props: TextProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Text: TextComponent = forwardRef(TextInner) as unknown as TextComponent;

(Text as any).displayName = 'Text';
