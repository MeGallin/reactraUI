import React from 'react';
import styled from '@emotion/styled';

export interface SkeletonProps {
  /**
   * The variant of the skeleton
   */
  variant?: 'text' | 'rectangular' | 'circular';
  /**
   * Width of the skeleton. Can be any CSS width value
   */
  width?: string | number;
  /**
   * Height of the skeleton. Can be any CSS height value
   */
  height?: string | number;
  /**
   * Animation type
   */
  animation?: 'pulse' | 'wave' | 'none';
  /**
   * Additional CSS class name
   */
  className?: string;
}

const pulseKeyframes = `
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

const waveKeyframes = `
  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkeletonRoot = styled.span<
  SkeletonProps & { cssWidth: string; cssHeight: string }
>`
  display: block;
  background-color: #e0e0e0;
  width: ${({ cssWidth }) => cssWidth};
  height: ${({ cssHeight }) => cssHeight};
  ${({ variant }) =>
    variant === 'circular' &&
    `
    border-radius: 50%;
  `}
  ${({ variant }) =>
    variant === 'text' &&
    `
    border-radius: 4px;
    margin-top: 0;
    margin-bottom: 0;
    transform-origin: 0 55%;
  `}
  ${({ variant }) =>
    variant === 'rectangular' &&
    `
    border-radius: 4px;
  `}
  
  ${({ animation }) =>
    animation === 'pulse' &&
    `
    ${pulseKeyframes}
    animation: pulse 1.5s ease-in-out 0.5s infinite;
  `}

  ${({ animation }) =>
    animation === 'wave' &&
    `
    position: relative;
    overflow: hidden;
    
    &::after {
      ${waveKeyframes}
      animation: wave 1.6s linear 0.5s infinite;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      content: '';
      position: absolute;
      transform: translateX(-100%);
      inset: 0;
    }
  `}
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
}) => {
  // Convert width and height to CSS values
  const cssWidth = typeof width === 'number' ? `${width}px` : width || '100%';
  const cssHeight =
    typeof height === 'number'
      ? `${height}px`
      : height || (variant === 'text' ? '1.2em' : '100px');

  return (
    <SkeletonRoot
      variant={variant}
      cssWidth={cssWidth}
      cssHeight={cssHeight}
      animation={animation}
      className={className}
      role="progressbar"
      aria-label="Loading"
    />
  );
};

export default Skeleton;
