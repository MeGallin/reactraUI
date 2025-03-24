import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Label for the checkbox
   */
  label?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
  /**
   * Size of the checkbox
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color of the checkbox
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /**
   * Callback fired when the state is changed
   */
  onToggle?: (checked: boolean) => void;
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

const StyledCheckbox = styled.div<{
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  indeterminate?: boolean;
  size: 'small' | 'medium' | 'large';
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) =>
    size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
  height: ${({ size }) =>
    size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: 2px solid;
  border-color: ${({ theme, checked, error, color, disabled }) => {
    if (disabled) return theme.colors.grey[400];
    if (error) return theme.colors.error.main;
    if (checked) {
      return theme.colors[color].main;
    }
    return theme.colors.grey[500];
  }};
  background-color: ${({ theme, checked, error, color, disabled }) => {
    if (disabled) return 'transparent';
    if (checked) {
      return error ? theme.colors.error.main : theme.colors[color].main;
    }
    return 'transparent';
  }};
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-right: ${({ theme }) => theme.spacing.unit}px;

  &::after {
    content: '';
    display: ${({ checked, indeterminate }) =>
      checked || indeterminate ? 'block' : 'none'};
    width: ${({ size, indeterminate }) =>
      indeterminate
        ? size === 'small'
          ? '8px'
          : size === 'medium'
          ? '10px'
          : '12px'
        : size === 'small'
        ? '6px'
        : size === 'medium'
        ? '8px'
        : '10px'};
    height: ${({ size, indeterminate }) =>
      indeterminate
        ? '2px'
        : size === 'small'
        ? '6px'
        : size === 'medium'
        ? '8px'
        : '10px'};
    border-radius: ${({ indeterminate }) => (indeterminate ? '1px' : '1px')};
    background-color: ${({ theme }) => theme.colors.common.white};
    transform: ${({ indeterminate }) =>
      indeterminate ? 'none' : 'rotate(45deg) translate(-2px, -1px)'};
    transform-origin: center;
  }
`;

const CheckboxLabel = styled.label<{ disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.text.disabled : theme.colors.text.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

const HelperText = styled.div<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin-top: ${({ theme }) => theme.spacing.unit * 0.5}px;
  margin-left: ${({ theme }) => theme.spacing.unit * 3}px;
  color: ${({ theme, error }) =>
    error ? theme.colors.error.main : theme.colors.text.secondary};
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error = false,
      helperText,
      indeterminate = false,
      size = 'medium',
      color = 'primary',
      checked = false,
      disabled = false,
      onChange,
      onToggle,
      ...props
    },
    ref,
  ) => {
    // Create a new ref if none is provided
    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ||
      innerRef) as React.MutableRefObject<HTMLInputElement>;

    // Use internal state to track checked state
    const [internalChecked, setInternalChecked] = React.useState(checked);

    // Sync internal state with prop
    React.useEffect(() => {
      setInternalChecked(checked);
    }, [checked]);

    // Set indeterminate property on the input element (not a valid HTML attribute)
    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    // Log the checked state for debugging
    console.log('Checkbox render:', { checked, internalChecked, label });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const handleToggle = () => {
      if (disabled) return;

      console.log(
        'Checkbox handleToggle called, current checked:',
        internalChecked,
      );

      // Update internal state
      const newChecked = !internalChecked;
      setInternalChecked(newChecked);

      // Call onToggle if provided
      if (onToggle) {
        console.log('Calling onToggle with:', newChecked);
        onToggle(newChecked);
      }

      // Also call onChange for backward compatibility
      if (onChange) {
        console.log('Calling onChange with:', newChecked);
        const event = {
          target: {
            checked: newChecked,
            name: props.name,
            value: props.value,
            indeterminate,
          },
          currentTarget: {
            checked: newChecked,
            name: props.name,
            value: props.value,
            indeterminate,
          },
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

    return (
      <CheckboxContainer>
        <CheckboxWrapper>
          <HiddenInput
            type="checkbox"
            ref={resolvedRef}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          <StyledCheckbox
            checked={internalChecked}
            disabled={disabled}
            error={error}
            indeterminate={indeterminate}
            size={size}
            color={color}
            onClick={handleToggle}
          />
          {label && (
            <CheckboxLabel disabled={disabled} onClick={handleToggle}>
              {label}
            </CheckboxLabel>
          )}
        </CheckboxWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </CheckboxContainer>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
