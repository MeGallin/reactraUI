import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /**
   * The content to be displayed in the tooltip
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;
  /**
   * The placement of the tooltip relative to the children
   */
  placement?: TooltipPlacement;
  /**
   * The delay before showing the tooltip (in ms)
   */
  showDelay?: number;
  /**
   * The delay before hiding the tooltip (in ms)
   */
  hideDelay?: number;
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const TooltipContainer = styled.div<{
  placement: TooltipPlacement;
  visible: boolean;
  x: number;
  y: number;
}>`
  position: fixed;
  z-index: 1100;
  background-color: #1f1f1f;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  max-width: 200px;
  word-wrap: break-word;
  pointer-events: none;
  transform-origin: ${({ placement }) => {
    switch (placement) {
      case 'top':
        return 'bottom center';
      case 'right':
        return 'left center';
      case 'bottom':
        return 'top center';
      case 'left':
        return 'right center';
    }
  }};

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible, placement }) => {
    const scale = visible ? 'scale(1)' : 'scale(0.8)';
    const translate = visible
      ? '0'
      : {
          top: '4px',
          right: '-4px',
          bottom: '-4px',
          left: '4px',
        }[placement];
    return `translate(${translate}) ${scale}`;
  }};
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;

  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);

    ${({ placement }) => {
      switch (placement) {
        case 'top':
          return `
            bottom: -4px;
            left: calc(50% - 4px);
          `;
        case 'right':
          return `
            left: -4px;
            top: calc(50% - 4px);
          `;
        case 'bottom':
          return `
            top: -4px;
            left: calc(50% - 4px);
          `;
        case 'left':
          return `
            right: -4px;
            top: calc(50% - 4px);
          `;
      }
    }}
  }
`;

const Trigger = styled.div`
  display: inline-block;
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  showDelay = 200,
  hideDelay = 150,
  disabled = false,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const isTouchDevice = useRef(false);

  const clearTimeouts = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let x = 0;
    let y = 0;

    switch (placement) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top - tooltipRect.height - spacing;
        break;
      case 'right':
        x = triggerRect.right + spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + spacing;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Prevent tooltip from going off screen
    const padding = 8;
    x = Math.max(
      padding,
      Math.min(x, window.innerWidth - tooltipRect.width - padding),
    );
    y = Math.max(
      padding,
      Math.min(y, window.innerHeight - tooltipRect.height - padding),
    );

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (disabled || isTouchDevice.current) return;
    clearTimeouts();
    showTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, showDelay);
  };

  const handleMouseLeave = () => {
    if (disabled || isTouchDevice.current) return;
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  };

  const handleTouchStart = () => {
    isTouchDevice.current = true;
    if (disabled) return;
    clearTimeouts();
    showTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, showDelay);
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  };

  useEffect(() => {
    if (visible) {
      calculatePosition();
      const handleScroll = () => setVisible(false);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [visible]);

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <>
      <Trigger
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={className}
      >
        {children}
      </Trigger>
      {createPortal(
        <TooltipContainer
          ref={tooltipRef}
          placement={placement}
          visible={visible}
          x={position.x}
          y={position.y}
          role="tooltip"
        >
          {content}
        </TooltipContainer>,
        document.body,
      )}
    </>
  );
};

export default Tooltip;
