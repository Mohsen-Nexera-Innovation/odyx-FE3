import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { cardVariants, CardVariant, CardPadding, CardElevation } from './card.tokens';

export type CardProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    variant?: CardVariant;
    padding?: CardPadding;
    elevation?: CardElevation;
    interactive?: boolean;
    hoverable?: boolean;
  }
>;

const CardInner = <C extends ElementType = 'div'>(
  { as, className, variant, padding, elevation, interactive = false, hoverable = false, ...props }: CardProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      className={cn(
        cardVariants({
          variant,
          padding,
          elevation,
          interactiveState: interactive ? 'true' : 'false',
          hoverable: hoverable ? 'true' : 'false',
        }),
        className
      )}
      {...props}
    />
  );
};

export type CardComponent = <C extends ElementType = 'div'>(
  props: CardProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Card: CardComponent = forwardRef(CardInner) as unknown as CardComponent;

(Card as any).displayName = 'Card';
