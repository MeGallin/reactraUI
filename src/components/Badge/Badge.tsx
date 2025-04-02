import React from 'react';
import styled from '@emotion/styled';

export type BadgeVariant = 'standard' | 'dot';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface BadgeProps {
  /**
   * The content to be displayed in the badge
   */
  content?: React.ReactNode;
  /**
   * The variant of the badge
   */
  variant?: BadgeVariant;
  /**
   * The color of the badge
   */
  color?: BadgeColor;
  /**
   * Maximum count to show
   */
  max?: number;
  /**
   * Whether the badge should be visible
   */
  invisible?: boolean;
  /**
   * Whether to show zero value
   */
  showZero?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The element to wrap with the badge
   */
  children?: React.ReactNode;
}

const colors = {
  primary: {
    background: '#4285f4',
    color: '#ffffff',
  },
  secondary: {
    background: '#757575',
    color: '#ffffff',
  },
  success: {
    background: '#34a853',
    color: '#ffffff',
  },
  error: {
    background: '#ea4335',
    color: '#ffffff',
  },
  warning: {
    background: '#fbbc04',
    color: '#000000',
  },
  info: {
    background: '#4285f4',
    color: '#ffffff',
  },
};

const BadgeContainer = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

const BadgeContent = styled.span<{
  color: BadgeColor;
  variant: BadgeVariant;
  invisible?: boolean;
}>`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0%;
  display: flex;
  flex-flow: row wrap;
  place-content: center;
  align-items: center;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 12px;
  min-width: ${({ variant }) => (variant === 'dot' ? '8px' : '20px')};
  height: ${({ variant }) => (variant === 'dot' ? '8px' : '20px')};
  border-radius: ${({ variant }) => (variant === 'dot' ? '4px' : '10px')};
  padding: ${({ variant }) => (variant === 'dot' ? '0' : '0 6px')};
  background-color: ${({ color }) => colors[color].background};
  color: ${({ color }) => colors[color].color};
  opacity: ${({ invisible }) => (invisible ? 0 : 1)};
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  @media (max-width: 600px) {
    font-size: 11px;
    min-width: ${({ variant }) => (variant === 'dot' ? '6px' : '18px')};
    height: ${({ variant }) => (variant === 'dot' ? '6px' : '18px')};
  }
`;

export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'standard',
  color = 'primary',
  max = 99,
  invisible = false,
  showZero = false,
  className,
  children,
}) => {
  const shouldDisplay = () => {
    if (variant === 'dot') return true;
    if (invisible) return false;
    if (content === 0) return showZero;
    return !!content;
  };

  const displayContent = () => {
    if (variant === 'dot') return null;
    if (typeof content === 'number' && content > max) {
      return `${max}+`;
    }
    return content;
  };

  return (
    <BadgeContainer className={className}>
      {children}
      {shouldDisplay() && (
        <BadgeContent
          color={color}
          variant={variant}
          invisible={invisible}
          role="status"
          aria-label={
            variant === 'dot' ? 'Status indicator' : `Count: ${content}`
          }
        >
          {displayContent()}
        </BadgeContent>
      )}
    </BadgeContainer>
  );
};

export default Badge;
