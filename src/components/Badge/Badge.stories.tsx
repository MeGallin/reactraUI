import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Badge, BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'success',
          'error',
          'warning',
          'info',
        ],
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['standard', 'dot'],
      },
    },
  },
} as Meta;

// Basic Badge Examples
export const Basic: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Badge content={4}>
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={12} color="secondary">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={100} max={99}>
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
  </div>
);

// Color Variants
export const Colors: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Badge content={4} color="primary">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={4} color="secondary">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={4} color="success">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={4} color="error">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={4} color="warning">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge content={4} color="info">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
  </div>
);

// Dot Variant
export const DotVariant: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Badge variant="dot" color="primary">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge variant="dot" color="success">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
    <Badge variant="dot" color="error">
      <div style={{ width: '40px', height: '40px', background: '#e0e0e0' }} />
    </Badge>
  </div>
);

// Common Use Cases
export const UseCases: StoryFn<BadgeProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Notification Badge */}
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge content={5} color="error">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
        </svg>
      </Badge>

      {/* Message Badge */}
      <Badge content={3} color="primary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </Badge>

      {/* Status Badge */}
      <Badge variant="dot" color="success">
        <div
          style={{
            width: '32px',
            height: '32px',
            background: '#e0e0e0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>JS</span>
        </div>
      </Badge>
    </div>

    {/* Cart Badge */}
    <div>
      <Badge content={2} color="secondary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </Badge>
    </div>
  </div>
);
