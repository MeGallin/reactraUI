import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  open: boolean;
  /**
   * Callback fired when the drawer is closed
   */
  onClose: () => void;
  /**
   * The placement of the drawer
   */
  placement?: DrawerPlacement;
  /**
   * The size of the drawer
   */
  size?: DrawerSize;
  /**
   * The title of the drawer
   */
  title?: React.ReactNode;
  /**
   * The content of the drawer
   */
  children: React.ReactNode;
  /**
   * The footer content of the drawer
   */
  footer?: React.ReactNode;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const sizes = {
  small: '320px',
  medium: '400px',
  large: '600px',
  full: '100%',
};

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1200;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const DrawerContainer = styled.div<{
  open: boolean;
  placement: DrawerPlacement;
  size: DrawerSize;
}>`
  position: fixed;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  ${({ placement, size }) => {
    switch (placement) {
      case 'left':
        return `
          top: 0;
          left: 0;
          bottom: 0;
          width: ${sizes[size]};
        `;
      case 'right':
        return `
          top: 0;
          right: 0;
          bottom: 0;
          width: ${sizes[size]};
        `;
      case 'top':
        return `
          top: 0;
          left: 0;
          right: 0;
          height: ${sizes[size]};
        `;
      case 'bottom':
        return `
          bottom: 0;
          left: 0;
          right: 0;
          height: ${sizes[size]};
        `;
    }
  }}

  ${({ open, placement }) => {
    const transform = open
      ? 'translate(0)'
      : {
          left: 'translateX(-100%)',
          right: 'translateX(100%)',
          top: 'translateY(-100%)',
          bottom: 'translateY(100%)',
        }[placement];
    return `transform: ${transform};`;
  }}

  @media (max-width: 600px) {
    ${({ placement }) => {
      if (placement === 'left' || placement === 'right') {
        return 'width: 100%;';
      }
    }}
  }
`;

const Header = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #1f1f1f;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #1f1f1f;
  }

  &:focus {
    outline: 2px solid #4285f4;
    outline-offset: 2px;
  }
`;

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
`;

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  size = 'medium',
  title,
  children,
  footer,
  showCloseButton = true,
  className,
}) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const focusTrapRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(focusTrapRef, open);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay open={open} onClick={handleOverlayClick}>
      <DrawerContainer
        ref={drawerRef}
        open={open}
        placement={placement}
        size={size}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {(title || showCloseButton) && (
          <Header>
            {title && <Title id="drawer-title">{title}</Title>}
            {showCloseButton && (
              <CloseButton onClick={onClose} aria-label="Close drawer">
                ✕
              </CloseButton>
            )}
          </Header>
        )}
        <Content ref={focusTrapRef} tabIndex={-1}>
          {children}
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </DrawerContainer>
    </Overlay>,
    document.body,
  );
};

export default Drawer;
