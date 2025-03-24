import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 2}px`};
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin-bottom: ${({ theme }) => theme.spacing.unit}px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.unit * 3}px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.unit * 2}px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.unit * 2}px 0;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  padding: ${({ theme }) => `${theme.spacing.unit}px`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) =>
      `rgba(${theme.colors.primary.main}, 0.04)`};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.unit}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  min-width: 48px;
  min-height: 48px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    display: block;
    position: absolute;
    top: ${({ theme }) => theme.spacing.unit * 1.5}px;
    right: ${({ theme }) => theme.spacing.unit * 2}px;
  }
`;

const Drawer = styled.div<DrawerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[4]};
  padding: ${({ theme }) => theme.spacing.unit * 2}px;
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  overflow-y: auto;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.unit * 3}px;
  padding-bottom: ${({ theme }) => theme.spacing.unit * 1.5}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.unit / 2}px;
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <Logo>ReactraUI</Logo>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#components">Components</NavLink>
          <NavLink href="#documentation">Documentation</NavLink>
          <NavLink href="#examples">Examples</NavLink>
          <Switch
            label="Dark Mode"
            size="small"
            onToggle={(checked) => {
              // Add theme toggle logic here
            }}
          />
        </NavLinks>
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle mobile menu">
          ☰
        </MobileMenuButton>
      </NavbarContainer>

      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />

      <Drawer isOpen={isMenuOpen}>
        <DrawerHeader>
          <Logo>ReactraUI</Logo>
          <CloseButton onClick={closeMenu} aria-label="Close menu">
            ×
          </CloseButton>
        </DrawerHeader>
        <MobileNavLinks>
          <NavLink href="#home" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink href="#components" onClick={closeMenu}>
            Components
          </NavLink>
          <NavLink href="#documentation" onClick={closeMenu}>
            Documentation
          </NavLink>
          <NavLink href="#examples" onClick={closeMenu}>
            Examples
          </NavLink>
          <div style={{ marginTop: '16px' }}>
            <Switch
              label="Dark Mode"
              size="small"
              onToggle={(checked) => {
                // Add theme toggle logic here
              }}
            />
          </div>
        </MobileNavLinks>
      </Drawer>
    </>
  );
};

export default Navbar;
