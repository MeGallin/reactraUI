import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Label for the radio button
   */
  label?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Helper text to display below the radio button
   */
  helperText?: string;
  /**
   * Size of the radio button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color of the radio button
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /**
   * Callback fired when the state is changed
   */
  onToggle?: (checked: boolean) => void;
}

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const RadioWrapper = styled.div`
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

const StyledRadio = styled.div<{
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
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
  border-radius: 50%;
  border: 2px solid;
  border-color: ${({ theme, checked, error, color, disabled }) => {
    if (disabled) return theme.colors.grey[400];
    if (error) return theme.colors.error.main;
    if (checked) {
      return theme.colors[color].main;
    }
    return theme.colors.grey[500];
  }};
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-right: ${({ theme }) => theme.spacing.unit}px;

  &::after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    width: ${({ size }) =>
      size === 'small' ? '8px' : size === 'medium' ? '10px' : '12px'};
    height: ${({ size }) =>
      size === 'small' ? '8px' : size === 'medium' ? '10px' : '12px'};
    border-radius: 50%;
    background-color: ${({ theme, error, color, disabled }) => {
      if (disabled) return theme.colors.grey[400];
      if (error) return theme.colors.error.main;
      return theme.colors[color].main;
    }};
  }
`;

const RadioLabel = styled.label<{ disabled?: boolean }>`
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

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    console.log('Radio render:', { checked, internalChecked, label });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    const handleToggle = () => {
      if (disabled) return;

      console.log(
        'Radio handleToggle called, current checked:',
        internalChecked,
      );

      // For radio buttons, we only toggle to true (can't uncheck a radio)
      // Update internal state
      setInternalChecked(true);

      // Call onToggle if provided
      if (onToggle) {
        console.log('Calling onToggle with: true');
        onToggle(true);
      }

      // Also call onChange for backward compatibility
      if (onChange) {
        console.log('Calling onChange with: true');
        const event = {
          target: {
            checked: true,
            name: props.name,
            value: props.value,
          },
          currentTarget: {
            checked: true,
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
      <RadioContainer>
        <RadioWrapper>
          <HiddenInput
            type="radio"
            ref={resolvedRef}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          <StyledRadio
            checked={internalChecked}
            disabled={disabled}
            error={error}
            size={size}
            color={color}
            onClick={handleToggle}
          />
          {label && (
            <RadioLabel disabled={disabled} onClick={handleToggle}>
              {label}
            </RadioLabel>
          )}
        </RadioWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </RadioContainer>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
