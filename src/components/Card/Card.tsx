import React from 'react';
import styled from '@emotion/styled';

export type CardVariant = 'outlined' | 'flat' | 'elevated';

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  header?: React.ReactNode;
  actions?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

interface StyledCardProps {
  $variant: CardVariant;
  $fullWidth: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  /* Mobile-first: full width on small screens */
  width: 100%;

  /* Responsive width for larger screens */
  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  }

  /* Variant styles */
  ${(props) => {
    if (props.$variant === 'elevated') {
      return `
        box-shadow: ${props.theme.shadows[2]};
        &:hover {
          box-shadow: ${props.theme.shadows[4]};
        }
      `;
    } else if (props.$variant === 'outlined') {
      return `
        border: 1px solid ${props.theme.colors.divider};
      `;
    } else {
      return `
        /* Flat card has no border or shadow */
      `;
    }
  }}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.unit * 2}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing.unit}px`};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => `${theme.spacing.unit * 2}px`};
  flex: 1 1 auto;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`};

  /* Add spacing between action items */
  & > * + * {
    margin-left: ${({ theme }) => `${theme.spacing.unit}px`};
  }
`;

const Card = ({
  variant = 'elevated',
  children,
  header,
  actions,
  fullWidth = false,
  className,
  ...props
}: CardProps) => {
  return (
    <StyledCard
      $variant={variant}
      $fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </StyledCard>
  );
};

export default Card;
