import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['circular', 'rounded', 'square'],
      },
    },
  },
} as Meta;

// Basic Avatar Examples
export const Basic: StoryFn<AvatarProps> = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
    <Avatar fallback="John Doe" />
    <Avatar src="invalid-image.jpg" fallback="Jane Smith" />
  </div>
);

// Size Variants
export const Sizes: StoryFn<AvatarProps> = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar size="small" fallback="JS" />
    <Avatar size="medium" fallback="JS" />
    <Avatar size="large" fallback="JS" />
  </div>
);

// Shape Variants
export const Shapes: StoryFn<AvatarProps> = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Avatar
      variant="circular"
      src="https://i.pravatar.cc/150?img=2"
      alt="Circular"
    />
    <Avatar
      variant="rounded"
      src="https://i.pravatar.cc/150?img=3"
      alt="Rounded"
    />
    <Avatar
      variant="square"
      src="https://i.pravatar.cc/150?img=4"
      alt="Square"
    />
  </div>
);

// Fallback Examples
export const Fallbacks: StoryFn<AvatarProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Single letter */}
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="Alice" />
      <Avatar fallback="Bob" backgroundColor="#34a853" />
      <Avatar fallback="Charlie" backgroundColor="#fbbc04" />
    </div>

    {/* Two letters */}
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="John Doe" />
      <Avatar fallback="Jane Smith" backgroundColor="#ea4335" />
      <Avatar fallback="Robert Johnson" backgroundColor="#4285f4" />
    </div>

    {/* With different sizes */}
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="small" fallback="Small Size" />
      <Avatar size="medium" fallback="Medium Size" />
      <Avatar size="large" fallback="Large Size" />
    </div>
  </div>
);

// Group Example
export const AvatarGroup: StoryFn<AvatarProps> = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {[1, 2, 3, 4].map((index) => (
      <div
        key={index}
        style={{
          marginLeft: index === 0 ? 0 : '-8px',
          borderRadius: '50%',
          border: '2px solid white',
        }}
      >
        <Avatar
          src={`https://i.pravatar.cc/150?img=${index + 4}`}
          alt={`User ${index}`}
          size="medium"
        />
      </div>
    ))}
    <div
      style={{
        marginLeft: '-8px',
        borderRadius: '50%',
        border: '2px solid white',
      }}
    >
      <Avatar fallback="+3" backgroundColor="#9aa0a6" size="medium" />
    </div>
  </div>
);
