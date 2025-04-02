import React from 'react';
import styled from '@emotion/styled';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  /**
   * The severity level of the alert
   */
  severity?: AlertSeverity;
  /**
   * The content of the alert
   */
  children: React.ReactNode;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback fired when the alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const severityColors = {
  success: {
    bg: '#e6f4ea',
    border: '#34a853',
    text: '#1e4620',
  },
  info: {
    bg: '#e8f0fe',
    border: '#4285f4',
    text: '#174ea6',
  },
  warning: {
    bg: '#fef7e0',
    border: '#fbbc04',
    text: '#8c6d1f',
  },
  error: {
    bg: '#fce8e6',
    border: '#ea4335',
    text: '#931a0f',
  },
};

const AlertContainer = styled.div<{ severity: AlertSeverity }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  border-left: 4px solid ${({ severity }) => severityColors[severity].border};
  background-color: ${({ severity }) => severityColors[severity].bg};
  color: ${({ severity }) => severityColors[severity].text};
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.5;

  @media (max-width: 600px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  margin-left: 16px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid ${({ color }) => color};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    padding: 6px;
    margin-left: 12px;
  }
`;

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  children,
  dismissible = false,
  onDismiss,
  className,
}) => {
  return (
    <AlertContainer severity={severity} className={className}>
      <div role="alert">{children}</div>
      {dismissible && onDismiss && (
        <DismissButton
          onClick={onDismiss}
          aria-label="Dismiss alert"
          color={severityColors[severity].border}
        >
          ✕
        </DismissButton>
      )}
    </AlertContainer>
  );
};

export default Alert;
