import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    navigationItems: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Terms', href: '#terms' },
      { label: 'Privacy', href: '#privacy' },
    ],
    copyrightText: '© 2024 ReactraUI. All rights reserved.',
  },
};

export const WithCustomContent: Story = {
  args: {
    navigationItems: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    copyrightText: '© 2024 ReactraUI. All rights reserved.',
    children: (
      <div style={{ textAlign: 'center' }}>
        <p>Subscribe to our newsletter</p>
      </div>
    ),
  },
};

export const MinimalFooter: Story = {
  args: {
    navigationItems: [
      { label: 'Terms', href: '#terms' },
      { label: 'Privacy', href: '#privacy' },
    ],
  },
};
