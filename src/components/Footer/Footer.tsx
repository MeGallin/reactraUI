import React from 'react';
import styled from '@emotion/styled';
import { useMediaQuery } from '../../hooks';

interface FooterProps {
  /** Array of navigation items */
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
  /** Optional copyright text */
  copyrightText?: string;
  /** Optional additional content */
  children?: React.ReactNode;
}

const StyledFooter = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FooterContent = styled.div<{ isDesktop: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  justify-content: space-between;
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};
  gap: 1.5rem;
`;

const NavSection = styled.nav<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  gap: ${({ isDesktop }) => (isDesktop ? '2rem' : '1rem')};
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Footer: React.FC<FooterProps> = ({
  navigationItems = [],
  copyrightText,
  children,
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <StyledFooter>
      <FooterContent isDesktop={isDesktop}>
        <NavSection isDesktop={isDesktop}>
          {navigationItems.map((item, index) => (
            <NavLink key={index} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </NavSection>

        {children}

        {copyrightText && <CopyrightText>{copyrightText}</CopyrightText>}
      </FooterContent>
    </StyledFooter>
  );
};
