import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Popover, PopoverProps } from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
    },
    trigger: {
      control: {
        type: 'radio',
        options: ['click', 'hover'],
      },
    },
  },
} as Meta;

// Basic Popover Example
export const Basic: StoryFn<PopoverProps> = () => (
  <div style={{ padding: '100px', textAlign: 'center' }}>
    <Popover content="This is a basic popover">
      <button>Click me</button>
    </Popover>
  </div>
);

// Placement Examples
export const Placements: StoryFn<PopoverProps> = () => (
  <div
    style={{
      padding: '100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      placeItems: 'center',
    }}
  >
    <div />
    <Popover content="Top popover" placement="top">
      <button>Top</button>
    </Popover>
    <div />
    <Popover content="Left popover" placement="left">
      <button>Left</button>
    </Popover>
    <div style={{ visibility: 'hidden' }}>
      <button>Center</button>
    </div>
    <Popover content="Right popover" placement="right">
      <button>Right</button>
    </Popover>
    <div />
    <Popover content="Bottom popover" placement="bottom">
      <button>Bottom</button>
    </Popover>
    <div />
  </div>
);

// Trigger Examples
export const Triggers: StoryFn<PopoverProps> = () => (
  <div
    style={{
      padding: '50px',
      display: 'flex',
      gap: '24px',
      justifyContent: 'center',
    }}
  >
    <Popover content="Click to toggle" trigger="click">
      <button>Click Trigger</button>
    </Popover>
    <Popover content="Hover to show" trigger="hover">
      <button>Hover Trigger</button>
    </Popover>
  </div>
);

// Rich Content Example
export const RichContent: StoryFn<PopoverProps> = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Popover
      content={
        <div style={{ padding: '8px' }}>
          <h4 style={{ margin: '0 0 8px' }}>Rich Content</h4>
          <p style={{ margin: '0 0 8px' }}>
            Popovers can contain formatted text, links, and other elements.
          </p>
          <button onClick={() => alert('Action from popover!')}>
            Click me!
          </button>
        </div>
      }
    >
      <button>Show Rich Content</button>
    </Popover>
  </div>
);

// Menu Example
export const MenuPopover: StoryFn<PopoverProps> = () => {
  const [open, setOpen] = useState(false);

  const handleAction = (action: string) => {
    alert(`Selected: ${action}`);
    setOpen(false);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minWidth: '150px',
            }}
          >
            <button
              onClick={() => handleAction('Edit')}
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleAction('Duplicate')}
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Duplicate
            </button>
            <button
              onClick={() => handleAction('Delete')}
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#ea4335',
              }}
            >
              Delete
            </button>
          </div>
        }
      >
        <button>Actions ▾</button>
      </Popover>
    </div>
  );
};

// User Profile Example
export const UserProfile: StoryFn<PopoverProps> = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Popover
      content={
        <div style={{ padding: '8px', minWidth: '200px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
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
              JD
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 500 }}>John Doe</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                john.doe@example.com
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              View Profile
            </button>
            <button
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              Settings
            </button>
            <button
              style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                borderTop: '1px solid #e0e0e0',
                color: '#ea4335',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      }
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        JD
      </div>
    </Popover>
  </div>
);
