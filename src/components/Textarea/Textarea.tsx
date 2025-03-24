import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea variant
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Label for the textarea
   */
  label?: string;
  /**
   * Full width textarea
   */
  fullWidth?: boolean;
  /**
   * Minimum height of the textarea
   */
  minRows?: number;
  /**
   * Maximum height of the textarea (after which scrolling begins)
   */
  maxRows?: number;
}

const TextareaContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const TextareaLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 0.5}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledTextarea = styled.textarea<{
  variant: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  minRows?: number;
  maxRows?: number;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: 1.5;
  padding: ${({ theme }) => theme.spacing.unit * 1.5}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  box-sizing: border-box;
  min-height: ${({ minRows }) => (minRows ? `${minRows * 1.5}em` : '4.5em')};
  max-height: ${({ maxRows }) => (maxRows ? `${maxRows * 1.5}em` : 'none')};
  resize: vertical;

  /* Handle different variants */
  ${({ variant, theme, error }) => {
    if (variant === 'outlined') {
      return `
        border: 1px solid ${
          error ? theme.colors.error.main : theme.colors.divider
        };
        background-color: transparent;
        &:focus {
          outline: none;
          border-color: ${
            error ? theme.colors.error.main : theme.colors.primary.main
          };
          box-shadow: 0 0 0 2px ${
            error ? theme.colors.error.light : theme.colors.primary.light
          }40;
        }
      `;
    }
    if (variant === 'filled') {
      return `
        border: none;
        background-color: ${
          error ? theme.colors.error.light : theme.colors.grey[200]
        };
        &:focus {
          outline: none;
          background-color: ${
            error ? theme.colors.error.light : theme.colors.grey[300]
          };
          box-shadow: 0 0 0 2px ${
            error ? theme.colors.error.light : theme.colors.primary.light
          }40;
        }
      `;
    }
    return `
      border: none;
      border-bottom: 1px solid ${
        error ? theme.colors.error.main : theme.colors.divider
      };
      border-radius: 0;
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;
      &:focus {
        outline: none;
        border-bottom: 2px solid ${
          error ? theme.colors.error.main : theme.colors.primary.main
        };
      }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HelperText = styled.div<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-top: ${({ theme }) => theme.spacing.unit * 0.5}px;
  color: ${({ theme, error }) =>
    error ? theme.colors.error.main : theme.colors.text.secondary};
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'outlined',
      error = false,
      helperText,
      label,
      fullWidth = false,
      minRows = 3,
      maxRows,
      ...props
    },
    ref,
  ) => {
    return (
      <TextareaContainer fullWidth={fullWidth}>
        {label && <TextareaLabel>{label}</TextareaLabel>}
        <StyledTextarea
          ref={ref}
          variant={variant}
          error={error}
          minRows={minRows}
          maxRows={maxRows}
          {...props}
        />
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </TextareaContainer>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
