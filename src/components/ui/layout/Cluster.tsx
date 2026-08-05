import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { clusterVariants } from './layout.tokens';

type ClusterVariantsOptions = NonNullable<Parameters<typeof clusterVariants>[0]>;
type ClusterGap = NonNullable<ClusterVariantsOptions['gap']>;
type ClusterAlign = NonNullable<ClusterVariantsOptions['align']>;
type ClusterJustify = NonNullable<ClusterVariantsOptions['justify']>;

export type ClusterProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * The gap between children.
     * @default "md"
     */
    gap?: ClusterGap;
    /**
     * The vertical alignment of children.
     * @default "center"
     */
    align?: ClusterAlign;
    /**
     * The horizontal distribution of children.
     * @default "start"
     */
    justify?: ClusterJustify;
    /**
     * Whether the children should wrap onto multiple lines.
     * @default true
     */
    wrap?: boolean;
  }
>;

const ClusterInner = <C extends ElementType = 'div'>(
  {
    as,
    className,
    gap = 'md',
    align = 'center',
    justify = 'start',
    wrap = true,
    ...props
  }: ClusterProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      className={cn(
        clusterVariants({
          gap,
          align,
          justify,
          wrap: wrap ? 'true' : 'false',
        }),
        className
      )}
      {...props}
    />
  );
};

export type ClusterComponent = <C extends ElementType = 'div'>(
  props: ClusterProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Cluster: ClusterComponent = forwardRef(ClusterInner) as unknown as ClusterComponent;

(Cluster as any).displayName = 'Cluster';
