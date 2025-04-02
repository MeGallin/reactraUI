import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useClickOutside } from '../../hooks/useClickOutside';

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';
export type PopoverTrigger = 'click' | 'hover';

export interface PopoverProps {
  /**
   * The content to be displayed in the popover
   */
  content: React.ReactNode;
  /**
   * The element that triggers the popover
   */
  children: React.ReactNode;
  /**
   * The placement of the popover relative to the trigger
   */
  placement?: PopoverPlacement;
  /**
   * How the popover is triggered
   */
  trigger?: PopoverTrigger;
  /**
   * Whether the popover is open (controlled mode)
   */
  open?: boolean;
  /**
   * Callback fired when the popover's open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The offset between the popover and the trigger element
   */
  offset?: number;
  /**
   * Whether to show an arrow pointing to the trigger
   */
  showArrow?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const PopoverContainer = styled.div<{
  placement: PopoverPlacement;
  visible: boolean;
  x: number;
  y: number;
}>`
  position: fixed;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 120px;
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
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
`;

const Arrow = styled.div<{ placement: PopoverPlacement }>`
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
`;

const Trigger = styled.div`
  display: inline-block;
`;

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  offset = 8,
  showArrow = true,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpen = (value: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      trigger === 'click' &&
      triggerRef.current &&
      popoverRef.current &&
      !triggerRef.current.contains(event.target as Node) &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      handleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, trigger]);

  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const totalOffset = offset + (showArrow ? 4 : 0);

    let x = 0;
    let y = 0;

    switch (placement) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        y = triggerRect.top - popoverRect.height - totalOffset;
        break;
      case 'right':
        x = triggerRect.right + totalOffset;
        y = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        y = triggerRect.bottom + totalOffset;
        break;
      case 'left':
        x = triggerRect.left - popoverRect.width - totalOffset;
        y = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        break;
    }

    // Prevent popover from going off screen
    const padding = 8;
    x = Math.max(
      padding,
      Math.min(x, window.innerWidth - popoverRect.width - padding),
    );
    y = Math.max(
      padding,
      Math.min(y, window.innerHeight - popoverRect.height - padding),
    );

    setPosition({ x, y });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleScroll = () => handleOpen(false);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen]);

  const handleClick = () => {
    if (trigger === 'click') {
      handleOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      handleOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      handleOpen(false);
    }
  };

  return (
    <>
      <Trigger
        ref={triggerRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </Trigger>
      {createPortal(
        <PopoverContainer
          ref={popoverRef}
          placement={placement}
          visible={isOpen}
          x={position.x}
          y={position.y}
          role="dialog"
          aria-modal="false"
          onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
        >
          {showArrow && <Arrow placement={placement} />}
          {content}
        </PopoverContainer>,
        document.body,
      )}
    </>
  );
};

export default Popover;
