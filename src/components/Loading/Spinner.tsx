import React from 'react';
import styled from '@emotion/styled';

export interface SpinnerProps {
  /**
   * The size of the spinner in pixels
   */
  size?: number;
  /**
   * The color of the spinner
   */
  color?: string;
  /**
   * The thickness of the spinner ring
   */
  thickness?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const SpinnerContainer = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${({ size = 24 }) => size}px;
  height: ${({ size = 24 }) => size}px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: ${({ size = 24 }) => size}px;
    height: ${({ size = 24 }) => size}px;
    border-radius: 50%;
    border: ${({ thickness = 2 }) => thickness}px solid currentColor;
    border-color: ${({ color = 'currentColor' }) => color} transparent
      ${({ color = 'currentColor' }) => color} transparent;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = 'currentColor',
  thickness = 2,
  className,
}) => {
  return (
    <SpinnerContainer
      size={size}
      color={color}
      thickness={thickness}
      className={className}
      role="progressbar"
      aria-label="Loading"
    />
  );
};

export default Spinner;
