import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input variant
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Start adornment (icon or text at the start of the input)
   */
  startAdornment?: React.ReactNode;
  /**
   * End adornment (icon or text at the end of the input)
   */
  endAdornment?: React.ReactNode;
  /**
   * Full width input
   */
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 0.5}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInput = styled.input<{
  variant: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  hasStartAdornment?: boolean;
  hasEndAdornment?: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: 1.5;
  padding: ${({ theme }) => theme.spacing.unit * 1.5}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  box-sizing: border-box;
  min-height: 48px; /* Mobile-friendly touch target */

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

  /* Handle adornments padding */
  padding-left: ${({ hasStartAdornment, theme }) =>
    hasStartAdornment ? theme.spacing.unit * 5 : theme.spacing.unit * 1.5}px;
  padding-right: ${({ hasEndAdornment, theme }) =>
    hasEndAdornment ? theme.spacing.unit * 5 : theme.spacing.unit * 1.5}px;

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

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StartAdornment = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.unit}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EndAdornment = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.unit}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outlined',
      error = false,
      helperText,
      label,
      startAdornment,
      endAdornment,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <InputLabel>{label}</InputLabel>}
        <InputWrapper>
          {startAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
          <StyledInput
            ref={ref}
            variant={variant}
            error={error}
            hasStartAdornment={!!startAdornment}
            hasEndAdornment={!!endAdornment}
            {...props}
          />
          {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
        </InputWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </InputContainer>
    );
  },
);

Input.displayName = 'Input';

export default Input;
