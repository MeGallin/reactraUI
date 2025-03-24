import React, {
  forwardRef,
  SelectHTMLAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled from '@emotion/styled';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Options for the select
   */
  options: SelectOption[];
  /**
   * Variant of the select
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Full width select
   */
  fullWidth?: boolean;
  /**
   * Size of the select
   */
  size?: 'small' | 'medium' | 'large';
}

const SelectContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
  position: relative;
`;

const SelectLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.unit * 0.5}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface StyledSelectProps {
  $variant: 'outlined' | 'filled' | 'standard';
  $error?: boolean;
  $size: 'small' | 'medium' | 'large';
  $hasPlaceholder: boolean;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: 1.5;
  padding: ${({ theme, $size }) =>
    $size === 'small'
      ? `${theme.spacing.unit}px ${theme.spacing.unit * 4}px ${
          theme.spacing.unit
        }px ${theme.spacing.unit * 2}px`
      : $size === 'medium'
      ? `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 4}px ${
          theme.spacing.unit * 1.5
        }px ${theme.spacing.unit * 2}px`
      : `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${
          theme.spacing.unit * 2
        }px ${theme.spacing.unit * 2}px`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  box-sizing: border-box;
  min-height: ${({ $size }) =>
    $size === 'small' ? '32px' : $size === 'medium' ? '40px' : '48px'};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.spacing.unit * 2}px center;
  background-size: 16px;
  cursor: pointer;
  color: ${({ $hasPlaceholder, theme }) =>
    $hasPlaceholder ? theme.colors.text.secondary : theme.colors.text.primary};

  /* Handle different variants */
  ${({ $variant, theme, $error }) => {
    if ($variant === 'outlined') {
      return `
        border: 1px solid ${
          $error ? theme.colors.error.main : theme.colors.divider
        };
        background-color: transparent;
        &:focus {
          outline: none;
          border-color: ${
            $error ? theme.colors.error.main : theme.colors.primary.main
          };
          box-shadow: 0 0 0 2px ${
            $error ? theme.colors.error.light : theme.colors.primary.light
          }40;
        }
      `;
    }
    if ($variant === 'filled') {
      return `
        border: none;
        background-color: ${
          $error ? theme.colors.error.light : theme.colors.grey[200]
        };
        &:focus {
          outline: none;
          background-color: ${
            $error ? theme.colors.error.light : theme.colors.grey[300]
          };
          box-shadow: 0 0 0 2px ${
            $error ? theme.colors.error.light : theme.colors.primary.light
          }40;
        }
      `;
    }
    return `
      border: none;
      border-bottom: 1px solid ${
        $error ? theme.colors.error.main : theme.colors.divider
      };
      border-radius: 0;
      background-color: transparent;
      padding-left: 0;
      padding-right: ${theme.spacing.unit * 5}px;
      background-position: right ${theme.spacing.unit * 2}px center;
      &:focus {
        outline: none;
        border-bottom: 2px solid ${
          $error ? theme.colors.error.main : theme.colors.primary.main
        };
      }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  /* Hide default arrow in IE */
  &::-ms-expand {
    display: none;
  }
`;

const HelperText = styled.div<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-top: ${({ theme }) => theme.spacing.unit * 0.5}px;
  color: ${({ theme, error }) =>
    error ? theme.colors.error.main : theme.colors.text.secondary};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      variant = 'outlined',
      error = false,
      helperText,
      label,
      placeholder,
      fullWidth = false,
      size = 'medium',
      value,
      onChange,
      id,
      ...props
    },
    ref,
  ) => {
    const [hasValue, setHasValue] = useState(!!value);
    const innerRef = useRef<HTMLSelectElement>(null);
    const resolvedRef = ref || innerRef;
    const selectId =
      id || `select-${Math.random().toString(36).substring(2, 9)}`;

    // Update hasValue when value changes
    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <SelectContainer fullWidth={fullWidth}>
        {label && (
          <SelectLabel htmlFor={selectId} id={`${selectId}-label`}>
            {label}
          </SelectLabel>
        )}
        <StyledSelect
          ref={resolvedRef}
          $variant={variant}
          $error={error}
          $size={size}
          $hasPlaceholder={!hasValue && !!placeholder}
          id={selectId}
          value={value}
          onChange={handleChange}
          aria-labelledby={label ? selectId + '-label' : undefined}
          aria-label={!label ? 'Select' : undefined}
          title={label || 'Select'}
          name={props.name || selectId}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </SelectContainer>
    );
  },
);

Select.displayName = 'Select';

export default Select;
