import React from 'react';
import styled from '@emotion/styled';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $color: ButtonColor;
  $fullWidth: boolean;
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${(props) =>
    props.$size === 'small'
      ? '4px 10px'
      : props.$size === 'medium'
      ? '6px 16px'
      : '8px 22px'};
  border-radius: 4px;
  font-weight: 500;
  font-size: ${(props) =>
    props.$size === 'small'
      ? '0.8125rem'
      : props.$size === 'medium'
      ? '0.875rem'
      : '0.9375rem'};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  /* Variant styles */
  ${(props) => {
    if (props.$variant === 'contained') {
      return `
        background-color: ${
          props.$color === 'primary'
            ? '#007bff'
            : props.$color === 'secondary'
            ? '#6c757d'
            : props.$color === 'error'
            ? '#dc3545'
            : props.$color === 'warning'
            ? '#ffc107'
            : props.$color === 'info'
            ? '#17a2b8'
            : '#28a745'
        };
        color: ${props.$color === 'warning' ? '#212529' : '#ffffff'};
        border: none;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
        
        &:hover {
          background-color: ${
            props.$color === 'primary'
              ? '#0069d9'
              : props.$color === 'secondary'
              ? '#5a6268'
              : props.$color === 'error'
              ? '#c82333'
              : props.$color === 'warning'
              ? '#e0a800'
              : props.$color === 'info'
              ? '#138496'
              : '#218838'
          };
          box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
        }
      `;
    } else if (props.$variant === 'outlined') {
      return `
        background-color: transparent;
        color: ${
          props.$color === 'primary'
            ? '#007bff'
            : props.$color === 'secondary'
            ? '#6c757d'
            : props.$color === 'error'
            ? '#dc3545'
            : props.$color === 'warning'
            ? '#ffc107'
            : props.$color === 'info'
            ? '#17a2b8'
            : '#28a745'
        };
        border: 1px solid ${
          props.$color === 'primary'
            ? '#007bff'
            : props.$color === 'secondary'
            ? '#6c757d'
            : props.$color === 'error'
            ? '#dc3545'
            : props.$color === 'warning'
            ? '#ffc107'
            : props.$color === 'info'
            ? '#17a2b8'
            : '#28a745'
        };
        
        &:hover {
          background-color: ${
            props.$color === 'primary'
              ? 'rgba(0, 123, 255, 0.04)'
              : props.$color === 'secondary'
              ? 'rgba(108, 117, 125, 0.04)'
              : props.$color === 'error'
              ? 'rgba(220, 53, 69, 0.04)'
              : props.$color === 'warning'
              ? 'rgba(255, 193, 7, 0.04)'
              : props.$color === 'info'
              ? 'rgba(23, 162, 184, 0.04)'
              : 'rgba(40, 167, 69, 0.04)'
          };
        }
      `;
    } else {
      return `
        background-color: transparent;
        color: ${
          props.$color === 'primary'
            ? '#007bff'
            : props.$color === 'secondary'
            ? '#6c757d'
            : props.$color === 'error'
            ? '#dc3545'
            : props.$color === 'warning'
            ? '#ffc107'
            : props.$color === 'info'
            ? '#17a2b8'
            : '#28a745'
        };
        border: none;
        
        &:hover {
          background-color: ${
            props.$color === 'primary'
              ? 'rgba(0, 123, 255, 0.04)'
              : props.$color === 'secondary'
              ? 'rgba(108, 117, 125, 0.04)'
              : props.$color === 'error'
              ? 'rgba(220, 53, 69, 0.04)'
              : props.$color === 'warning'
              ? 'rgba(255, 193, 7, 0.04)'
              : props.$color === 'info'
              ? 'rgba(23, 162, 184, 0.04)'
              : 'rgba(40, 167, 69, 0.04)'
          };
        }
      `;
    }
  }}

  /* Disabled styles */
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    cursor: default;
    pointer-events: none;

    ${(props) => {
      if (props.$variant === 'contained') {
        return `
          background-color: rgba(0, 0, 0, 0.12);
          box-shadow: none;
        `;
      } else if (props.$variant === 'outlined') {
        return `
          border: 1px solid rgba(0, 0, 0, 0.12);
        `;
      }
      return '';
    }}
  }

  /* Icon styles */
  .button-start-icon {
    display: inherit;
    margin-right: 8px;
    margin-left: ${(props) => (props.$hasStartIcon ? '-4px' : '0')};
  }

  .button-end-icon {
    display: inherit;
    margin-right: ${(props) => (props.$hasEndIcon ? '-4px' : '0')};
    margin-left: 8px;
  }

  /* Loading styles */
  .button-loading-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.$loading &&
    `
    .button-content {
      visibility: hidden;
    }
  `}
`;

const Button = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  children,
  startIcon,
  endIcon,
  loading = false,
  onClick,
  ...props
}: ButtonProps) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $color={color}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      $hasStartIcon={hasStartIcon}
      $hasEndIcon={hasEndIcon}
      $loading={loading}
      onClick={onClick}
      {...props}
    >
      <span className="button-content">
        {startIcon && <span className="button-start-icon">{startIcon}</span>}
        {children}
        {endIcon && <span className="button-end-icon">{endIcon}</span>}
      </span>

      {loading && (
        <span className="button-loading-container">
          <span>Loading...</span>
        </span>
      )}
    </StyledButton>
  );
};

export default Button;
