import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback fired when the modal is closed
   */
  onClose: () => void;
  /**
   * The title of the modal
   */
  title?: React.ReactNode;
  /**
   * The content of the modal
   */
  children: React.ReactNode;
  /**
   * The footer content of the modal
   */
  footer?: React.ReactNode;
  /**
   * The maximum width of the modal
   */
  maxWidth?: string | number;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  @media (max-width: 600px) {
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div<{ open: boolean; maxWidth: string | number }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0.95)')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0;
    border-radius: 16px 16px 0 0;
    max-height: 85vh;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(100%)')};
  }
`;

const Header = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = '600px',
  showCloseButton = true,
  className,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const focusTrapRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(focusTrapRef, open);
  useClickOutside(modalRef, onClose);

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

  // Prevent body scroll when modal is open
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

  return createPortal(
    <Overlay open={open}>
      <ModalContainer
        ref={modalRef}
        open={open}
        maxWidth={maxWidth}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || showCloseButton) && (
          <Header>
            {title && <Title id="modal-title">{title}</Title>}
            {showCloseButton && (
              <CloseButton onClick={onClose} aria-label="Close modal">
                ✕
              </CloseButton>
            )}
          </Header>
        )}
        <Content ref={focusTrapRef} tabIndex={-1}>
          {children}
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
};

export default Modal;
