import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

export interface SliderProps {
  /**
   * The value(s) of the slider
   */
  value: number | [number, number];
  /**
   * Callback fired when the value changes
   */
  onChange: (value: number | [number, number]) => void;
  /**
   * The minimum value of the slider
   */
  min?: number;
  /**
   * The maximum value of the slider
   */
  max?: number;
  /**
   * The step value of the slider
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show value labels
   */
  showLabels?: boolean;
  /**
   * Format function for value labels
   */
  formatLabel?: (value: number) => string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const Container = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
`;

const Track = styled.div<{ disabled?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const FilledTrack = styled.div<{ left: number; width: number; color?: string }>`
  position: absolute;
  height: 100%;
  background-color: ${({ color }) => color || '#4285f4'};
  border-radius: inherit;
  left: ${({ left }) => left}%;
  width: ${({ width }) => width}%;
`;

const Thumb = styled.div<{
  position: number;
  disabled?: boolean;
  dragging?: boolean;
}>`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid #4285f4;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: ${({ position }) => position}%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'grab')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.2);
  }

  ${({ dragging }) =>
    dragging &&
    `
    cursor: grabbing;
    box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.2);
  `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.2);
  }
`;

const Label = styled.div<{ position: number }>`
  position: absolute;
  top: -24px;
  left: ${({ position }) => position}%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showLabels = false,
  formatLabel = (value) => value.toString(),
  className,
}) => {
  const isRange = Array.isArray(value);
  const [draggingThumb, setDraggingThumb] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValue = (percentage: number) => {
    const rawValue = (percentage / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(steppedValue, min), max);
  };

  const getValueFromPosition = (clientX: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    return getValue(percentage);
  };

  const handleTrackClick = (event: React.MouseEvent) => {
    if (disabled) return;
    const newValue = getValueFromPosition(event.clientX);

    if (isRange) {
      const [start, end] = value as [number, number];
      const distanceToStart = Math.abs(newValue - start);
      const distanceToEnd = Math.abs(newValue - end);
      if (distanceToStart < distanceToEnd) {
        onChange([newValue, end]);
      } else {
        onChange([start, newValue]);
      }
    } else {
      onChange(newValue);
    }
  };

  const handleThumbMouseDown = (index: number) => {
    if (disabled) return;
    setDraggingThumb(index);
  };

  useEffect(() => {
    if (draggingThumb === null) return;

    const handleMouseMove = (event: MouseEvent) => {
      const newValue = getValueFromPosition(event.clientX);

      if (isRange) {
        const values = [...(value as [number, number])];
        values[draggingThumb] = newValue;
        // Ensure values stay in order
        if (draggingThumb === 0) {
          values[0] = Math.min(values[0], values[1] - step);
        } else {
          values[1] = Math.max(values[1], values[0] + step);
        }
        onChange(values as [number, number]);
      } else {
        onChange(newValue);
      }
    };

    const handleMouseUp = () => {
      setDraggingThumb(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingThumb, value, onChange, min, max, step, isRange]);

  const renderThumbs = () => {
    if (isRange) {
      const [start, end] = value as [number, number];
      return (
        <>
          <Thumb
            position={getPercentage(start)}
            onMouseDown={() => handleThumbMouseDown(0)}
            dragging={draggingThumb === 0}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={end}
            aria-valuenow={start}
          />
          <Thumb
            position={getPercentage(end)}
            onMouseDown={() => handleThumbMouseDown(1)}
            dragging={draggingThumb === 1}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={start}
            aria-valuemax={max}
            aria-valuenow={end}
          />
        </>
      );
    }

    return (
      <Thumb
        position={getPercentage(value as number)}
        onMouseDown={() => handleThumbMouseDown(0)}
        dragging={draggingThumb === 0}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value as number}
      />
    );
  };

  const renderLabels = () => {
    if (!showLabels) return null;

    if (isRange) {
      const [start, end] = value as [number, number];
      return (
        <>
          <Label position={getPercentage(start)}>{formatLabel(start)}</Label>
          <Label position={getPercentage(end)}>{formatLabel(end)}</Label>
        </>
      );
    }

    return (
      <Label position={getPercentage(value as number)}>
        {formatLabel(value as number)}
      </Label>
    );
  };

  return (
    <Container ref={containerRef} className={className}>
      <Track onClick={handleTrackClick} disabled={disabled}>
        {isRange ? (
          <FilledTrack
            left={getPercentage((value as [number, number])[0])}
            width={
              getPercentage((value as [number, number])[1]) -
              getPercentage((value as [number, number])[0])
            }
          />
        ) : (
          <FilledTrack left={0} width={getPercentage(value as number)} />
        )}
      </Track>
      {renderThumbs()}
      {renderLabels()}
    </Container>
  );
};

export default Slider;
