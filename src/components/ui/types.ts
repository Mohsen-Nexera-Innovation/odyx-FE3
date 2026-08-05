import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

// Semantic intents (if shared across alerts, toasts, etc)
export type Intent = 'info' | 'success' | 'warning' | 'error' | 'default';

// Component orientation
export type Orientation = 'horizontal' | 'vertical';

/**
 * A helper to build strongly typed polymorphic components.
 * 
 * @example
 * type TextProps<C extends ElementType> = PolymorphicProps<C, { weight?: 'bold' }>;
 */
export type PolymorphicProps<
  C extends ElementType,
  Props = {}
> = Props & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

/**
 * A helper to extract the correct ref type for a polymorphic component.
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];
