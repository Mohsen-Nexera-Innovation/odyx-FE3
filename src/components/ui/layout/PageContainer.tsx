import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { pageContainerVariants } from './layout.tokens';

type PageContainerVariantsOptions = NonNullable<Parameters<typeof pageContainerVariants>[0]>;
type PageContainerSize = NonNullable<PageContainerVariantsOptions['size']>;

export type PageContainerProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * Determines the maximum width of the container.
     * - `content`: Standard project width (mapped to max-w-7xl)
     * - `wide`: Extended width for complex layouts
     * - `full`: 100% fluid width
     * @default "content"
     */
    size?: PageContainerSize;
  }
>;

const PageContainerInner = <C extends ElementType = 'div'>(
  { as, className, size = 'content', ...props }: PageContainerProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      className={cn(pageContainerVariants({ size }), className)}
      {...props}
    />
  );
};

export type PageContainerComponent = <C extends ElementType = 'div'>(
  props: PageContainerProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const PageContainer: PageContainerComponent = forwardRef(PageContainerInner) as unknown as PageContainerComponent;

(PageContainer as any).displayName = 'PageContainer';
