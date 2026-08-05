import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { sectionVariants } from './layout.tokens';

type SectionVariantsOptions = NonNullable<Parameters<typeof sectionVariants>[0]>;
type SectionSpacing = NonNullable<SectionVariantsOptions['spacing']>;
type SectionBackground = NonNullable<SectionVariantsOptions['background']>;

export type SectionProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * Vertical spacing density.
     * - `comfortable`: py-8 md:py-12
     * - `compact`: py-4 md:py-6
     * - `none`: py-0
     * @default "comfortable"
     */
    spacing?: SectionSpacing;
    /**
     * Semantic background color token.
     * @default "transparent"
     */
    background?: SectionBackground;
  }
>;

const SectionInner = <C extends ElementType = 'section'>(
  { as, className, spacing = 'comfortable', background = 'transparent', ...props }: SectionProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'section';

  return (
    <Component
      ref={ref}
      className={cn(sectionVariants({ spacing, background }), className)}
      {...props}
    />
  );
};

export type SectionComponent = <C extends ElementType = 'section'>(
  props: SectionProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Section: SectionComponent = forwardRef(SectionInner) as unknown as SectionComponent;

(Section as any).displayName = 'Section';
