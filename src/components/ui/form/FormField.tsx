import React, { useId, ReactElement } from 'react';
import { Stack, StackProps } from '../layout/Stack';

export interface FormFieldProps extends StackProps<'div'> {
  invalid?: boolean;
  required?: boolean;
}

interface ComponentWithType {
  displayName?: string;
  name?: string;
  render?: {
    displayName?: string;
    name?: string;
  };
}

function hasComponentType(type: unknown): type is ComponentWithType {
  return typeof type === 'function' || (typeof type === 'object' && type !== null);
}

function getComponentName(child: ReactElement): string | undefined {
  if (typeof child.type === 'string') return child.type;
  if (hasComponentType(child.type)) {
    return child.type.displayName || child.type.name || child.type.render?.displayName || child.type.render?.name;
  }
  return undefined;
}

type FormElementProps = {
  id?: string;
  'aria-describedby'?: string;
  invalid?: boolean;
  required?: boolean;
};

export const FormField = ({
  children,
  invalid,
  required,
  className,
  gap = 'sm',
  ...props
}: FormFieldProps) => {
  const generatedId = useId();
  
  let hintId: string | undefined;
  let errorId: string | undefined;

  // First pass: identify if we have hints or errors to generate IDs
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const name = getComponentName(child);
      if (name === 'FormHint') hintId = `${generatedId}-hint`;
      if (name === 'FormError') errorId = `${generatedId}-error`;
    }
  });

  const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // Second pass: clone children to inject props
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const name = getComponentName(child);

    if (name === 'Label') {
      return child;
    }

    const element = child as ReactElement<FormElementProps>;

    if (name === 'FormHint') {
      return React.cloneElement(element, {
        id: hintId,
      });
    }

    if (name === 'FormError') {
      return React.cloneElement(element, {
        id: errorId,
      });
    }

    // Assume any other valid element is the interactive control (Input, Textarea, Select, etc)
    const childProps = element.props;
    
    return React.cloneElement(element, {
      'aria-describedby': ariaDescribedBy,
      invalid: invalid !== undefined ? invalid : childProps.invalid,
      required: required !== undefined ? required : childProps.required,
    });
  });

  return (
    <Stack gap={gap} className={className} {...props}>
      {clonedChildren}
    </Stack>
  );
};

FormField.displayName = 'FormField';
