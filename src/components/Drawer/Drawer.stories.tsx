import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Drawer, DrawerProps } from './Drawer';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ['left', 'right', 'top', 'bottom'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', 'full'],
      },
    },
  },
} as Meta;

// Basic Drawer Example
export const Basic: StoryFn<DrawerProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Basic Drawer">
        <p>This is a basic drawer with a title and close button.</p>
      </Drawer>
    </div>
  );
};

// Placement Examples
export const Placements: StoryFn<DrawerProps> = () => {
  const [placement, setPlacement] = useState<
    'left' | 'right' | 'top' | 'bottom'
  >('right');
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => {
            setPlacement('left');
            setOpen(true);
          }}
        >
          Left Drawer
        </button>
        <button
          onClick={() => {
            setPlacement('right');
            setOpen(true);
          }}
        >
          Right Drawer
        </button>
        <button
          onClick={() => {
            setPlacement('top');
            setOpen(true);
          }}
        >
          Top Drawer
        </button>
        <button
          onClick={() => {
            setPlacement('bottom');
            setOpen(true);
          }}
        >
          Bottom Drawer
        </button>
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title={`${
          placement.charAt(0).toUpperCase() + placement.slice(1)
        } Drawer`}
      >
        <p>This drawer slides in from the {placement}.</p>
      </Drawer>
    </div>
  );
};

// Size Examples
export const Sizes: StoryFn<DrawerProps> = () => {
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'full'>(
    'medium',
  );
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => {
            setSize('small');
            setOpen(true);
          }}
        >
          Small Drawer
        </button>
        <button
          onClick={() => {
            setSize('medium');
            setOpen(true);
          }}
        >
          Medium Drawer
        </button>
        <button
          onClick={() => {
            setSize('large');
            setOpen(true);
          }}
        >
          Large Drawer
        </button>
        <button
          onClick={() => {
            setSize('full');
            setOpen(true);
          }}
        >
          Full Drawer
        </button>
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={`${size.charAt(0).toUpperCase() + size.slice(1)} Drawer`}
      >
        <p>This is a {size} drawer.</p>
      </Drawer>
    </div>
  );
};

// Form Example
export const FormDrawer: StoryFn<DrawerProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setOpen(true)}>Edit Profile</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button
              onClick={() => {
                alert('Profile updated!');
                setOpen(false);
              }}
              style={{
                background: '#4285f4',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Save Changes
            </button>
          </>
        }
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              htmlFor="name"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="John Doe"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              defaultValue="Software engineer with a passion for UI/UX design."
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
};

// Navigation Example
export const NavigationDrawer: StoryFn<DrawerProps> = () => {
  const [open, setOpen] = useState(false);

  const MenuItem = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        padding: '12px 0',
        cursor: 'pointer',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setOpen(true)}>Open Menu</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        size="small"
      >
        <nav>
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Help</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </nav>
      </Drawer>
    </div>
  );
};
