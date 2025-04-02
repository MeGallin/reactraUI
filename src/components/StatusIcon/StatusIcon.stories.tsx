import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { StatusIcon, StatusIconProps } from './StatusIcon';

export default {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['online', 'offline', 'away', 'busy', 'custom'],
      },
    },
    size: {
      control: {
        type: 'number',
        min: 4,
        max: 24,
      },
    },
    pulse: {
      control: 'boolean',
    },
    color: {
      control: 'color',
    },
  },
} as Meta;

// Basic Status Examples
export const Basic: StoryFn<StatusIconProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StatusIcon status="online" />
      <span>Online</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StatusIcon status="offline" />
      <span>Offline</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StatusIcon status="away" />
      <span>Away</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StatusIcon status="busy" />
      <span>Busy</span>
    </div>
  </div>
);

// Size Variants
export const Sizes: StoryFn<StatusIconProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <StatusIcon status="online" size={6} />
    <StatusIcon status="online" size={8} />
    <StatusIcon status="online" size={12} />
    <StatusIcon status="online" size={16} />
  </div>
);

// Pulse Animation
export const WithPulse: StoryFn<StatusIconProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <StatusIcon status="online" pulse />
    <StatusIcon status="busy" pulse />
    <StatusIcon status="custom" color="#9c27b0" pulse />
  </div>
);

// Custom Colors
export const CustomColors: StoryFn<StatusIconProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <StatusIcon status="custom" color="#9c27b0" />
    <StatusIcon status="custom" color="#2196f3" />
    <StatusIcon status="custom" color="#ff9800" />
  </div>
);

// Integration Examples
export const WithAvatar: StoryFn<StatusIconProps> = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    {/* Online User */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        JS
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <StatusIcon status="online" size={10} pulse />
      </div>
    </div>

    {/* Busy User */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        KM
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <StatusIcon status="busy" size={10} />
      </div>
    </div>

    {/* Away User */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        RJ
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <StatusIcon status="away" size={10} />
      </div>
    </div>
  </div>
);
