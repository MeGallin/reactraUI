import React, { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ToastContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: calc(100% - 32px);

  @media (max-width: 600px) {
    top: auto;
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
`;

const ToastItem = styled.div<{ type: ToastType }>`
  padding: 12px 16px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  line-height: 1.5;
  min-width: 300px;
  max-width: 100%;
  animation: slideIn 0.2s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  ${({ type }) => {
    switch (type) {
      case 'success':
        return 'background-color: #34a853;';
      case 'info':
        return 'background-color: #4285f4;';
      case 'warning':
        return 'background-color: #fbbc04;';
      case 'error':
        return 'background-color: #ea4335;';
      default:
        return '';
    }
  }}

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    min-width: 0;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 5000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const portalElement = document.body;

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {portalElement &&
        createPortal(
          <ToastContainer role="alert" aria-live="polite">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} type={toast.type}>
                {toast.message}
              </ToastItem>
            ))}
          </ToastContainer>,
          portalElement,
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
