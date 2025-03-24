import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Label for the switch
   */
  label?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the switch
   */
  helperText?: string;
  /**
   * Size of the switch
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color of the switch
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /**
   * Callback fired when the state is changed
   */
  onToggle?: (checked: boolean) => void;
}

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const SwitchWrapper = styled.div`
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

const SwitchTrack = styled.div<{
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  size: 'small' | 'medium' | 'large';
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}>`
  position: relative;
  width: ${({ size }) =>
    size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px'};
  height: ${({ size }) =>
    size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px'};
  background-color: ${({ theme, checked, error, color, disabled }) => {
    if (disabled) return theme.colors.grey[400];
    if (error) return theme.colors.error.light;
    if (checked) {
      return theme.colors[color].main;
    }
    return theme.colors.grey[400];
  }};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-right: ${({ theme }) => theme.spacing.unit}px;
`;

const SwitchThumb = styled.div<{
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  size: 'small' | 'medium' | 'large';
}>`
  position: absolute;
  top: 50%;
  left: ${({ checked, size }) => {
    if (checked) {
      return size === 'small'
        ? 'calc(100% - 14px)'
        : size === 'medium'
        ? 'calc(100% - 18px)'
        : 'calc(100% - 22px)';
    }
    return '2px';
  }};
  transform: translateY(-50%);
  width: ${({ size }) =>
    size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px'};
  height: ${({ size }) =>
    size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px'};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey[300] : theme.colors.common.white};
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const SwitchLabel = styled.label<{ disabled?: boolean }>`
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

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      error = false,
      helperText,
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

    // Log the checked state for debugging
    console.log('Switch render:', { checked, internalChecked, label });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const handleToggle = () => {
      if (disabled) return;

      console.log(
        'Switch handleToggle called, current checked:',
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
          },
          currentTarget: {
            checked: newChecked,
            name: props.name,
            value: props.value,
          },
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

    return (
      <SwitchContainer>
        <SwitchWrapper>
          <HiddenInput
            type="checkbox"
            ref={resolvedRef}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          <SwitchTrack
            checked={internalChecked}
            disabled={disabled}
            error={error}
            size={size}
            color={color}
            onClick={handleToggle}
          >
            <SwitchThumb
              checked={internalChecked}
              disabled={disabled}
              error={error}
              size={size}
            />
          </SwitchTrack>
          {label && (
            <SwitchLabel disabled={disabled} onClick={handleToggle}>
              {label}
            </SwitchLabel>
          )}
        </SwitchWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </SwitchContainer>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;
