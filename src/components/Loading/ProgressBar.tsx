import React from 'react';
import styled from '@emotion/styled';

export interface ProgressBarProps {
  /**
   * The current progress value (0-100)
   */
  value: number;
  /**
   * The color of the progress bar
   */
  color?: string;
  /**
   * The height of the progress bar in pixels
   */
  height?: number;
  /**
   * Whether to show the progress value as text
   */
  showValue?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BarContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: #e0e0e0;
  border-radius: ${({ height }) => height / 2}px;
  overflow: hidden;
`;

const Bar = styled.div<{ value: number; color: string }>`
  width: ${({ value }) => Math.min(Math.max(value, 0), 100)}%;
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: inherit;
  transition: width 0.3s ease-in-out;
`;

const ValueText = styled.span`
  font-size: 14px;
  color: #666;
  text-align: right;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = '#4285f4',
  height = 4,
  showValue = false,
  className,
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  return (
    <Container className={className}>
      <BarContainer
        height={height}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <Bar value={normalizedValue} color={color} />
      </BarContainer>
      {showValue && <ValueText>{Math.round(normalizedValue)}%</ValueText>}
    </Container>
  );
};

export default ProgressBar;
