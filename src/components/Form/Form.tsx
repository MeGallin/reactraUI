import React, { FormHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Form content
   */
  children: React.ReactNode;
  /**
   * Callback fired when the form is submitted
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  /**
   * Spacing between form elements
   */
  spacing?: 'small' | 'medium' | 'large';
  /**
   * Full width form
   */
  fullWidth?: boolean;
}

interface StyledFormProps {
  $spacing: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
}

const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Apply spacing between form elements */
  & > * + * {
    margin-top: ${({ theme, $spacing }) =>
      $spacing === 'small'
        ? theme.spacing.unit * 1
        : $spacing === 'medium'
        ? theme.spacing.unit * 2
        : theme.spacing.unit * 3}px;
  }
`;

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    { children, onSubmit, spacing = 'medium', fullWidth = false, ...props },
    ref,
  ) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(event);
      }
    };

    return (
      <StyledForm
        ref={ref}
        onSubmit={handleSubmit}
        $spacing={spacing}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledForm>
    );
  },
);

Form.displayName = 'Form';

export default Form;
