import React, { ElementType, forwardRef } from 'react';
import { Section, SectionProps } from './Section';
import { PageContainer, PageContainerProps } from './PageContainer';
import { PolymorphicProps } from '../types';

export type PageSectionProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * Vertical spacing density, passed down to the Section wrapper.
     * @default "comfortable"
     */
    spacing?: SectionProps<'section'>['spacing'];
    /**
     * Semantic background color token, passed down to the Section wrapper.
     * @default "transparent"
     */
    background?: SectionProps<'section'>['background'];
    /**
     * Maximum width of the inner container, passed down to PageContainer.
     * @default "content"
     */
    containerSize?: PageContainerProps<'div'>['size'];
    /**
     * Optional custom classes applied to the inner PageContainer.
     */
    containerClassName?: string;
  }
>;

const PageSectionInner = <C extends ElementType = 'section'>(
  {
    children,
    className,
    containerClassName,
    as,
    spacing = 'comfortable',
    background = 'transparent',
    containerSize = 'content',
    ...props
  }: PageSectionProps<C>,
  ref: React.Ref<any>
) => {
  return (
    <Section
      as={as}
      ref={ref}
      spacing={spacing}
      background={background}
      className={className}
      {...(props as React.ComponentPropsWithoutRef<C>)}
    >
      <PageContainer size={containerSize} className={containerClassName}>
        {children as React.ReactNode}
      </PageContainer>
    </Section>
  );
};

export type PageSectionComponent = <C extends ElementType = 'section'>(
  props: PageSectionProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const PageSection: PageSectionComponent = forwardRef(PageSectionInner) as unknown as PageSectionComponent;

(PageSection as any).displayName = 'PageSection';
