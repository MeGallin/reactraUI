import React from 'react';
import styled from '@emotion/styled';

export type StatusType = 'online' | 'offline' | 'away' | 'busy' | 'custom';

export interface StatusIconProps {
  /**
   * The status to display
   */
  status: StatusType;
  /**
   * The size of the status icon in pixels
   */
  size?: number;
  /**
   * Whether to show a pulse animation (useful for 'online' status)
   */
  pulse?: boolean;
  /**
   * Custom color for the status icon (works with status="custom")
   */
  color?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const colors = {
  online: '#34a853', // green
  offline: '#9aa0a6', // grey
  away: '#fbbc04', // yellow
  busy: '#ea4335', // red
  custom: 'currentColor',
};

const pulseKeyframes = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const StatusDot = styled.div<{
  size: number;
  status: StatusType;
  color?: string;
  pulse?: boolean;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ status, color }) =>
    status === 'custom' ? color : colors[status]};
  position: relative;
  display: inline-block;

  ${({ pulse, status, color }) =>
    pulse &&
    `
    ${pulseKeyframes}
    
    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      background-color: ${status === 'custom' ? color : colors[status]};
      opacity: 0.4;
      animation: pulse 2s ease-in-out infinite;
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size = 8,
  pulse = false,
  color,
  className,
}) => {
  const statusTexts = {
    online: 'Online',
    offline: 'Offline',
    away: 'Away',
    busy: 'Busy',
    custom: 'Custom status',
  } as const;

  const statusText = statusTexts[status];

  return (
    <Container className={className}>
      <StatusDot
        size={size}
        status={status}
        color={color}
        pulse={pulse}
        role="status"
        aria-label={statusText}
      />
    </Container>
  );
};

export default StatusIcon;
