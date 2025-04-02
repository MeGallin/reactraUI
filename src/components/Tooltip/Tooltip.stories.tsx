import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Tooltip, TooltipProps } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'],
      },
    },
    showDelay: {
      control: {
        type: 'number',
        min: 0,
        max: 1000,
        step: 50,
      },
    },
    hideDelay: {
      control: {
        type: 'number',
        min: 0,
        max: 1000,
        step: 50,
      },
    },
  },
} as Meta;

// Basic Tooltip Example
export const Basic: StoryFn<TooltipProps> = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Tooltip content="This is a basic tooltip">
      <button>Hover me</button>
    </Tooltip>
  </div>
);

// Placement Examples
export const Placements: StoryFn<TooltipProps> = () => (
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
    <Tooltip content="Top tooltip" placement="top">
      <button>Top</button>
    </Tooltip>
    <div />
    <Tooltip content="Left tooltip" placement="left">
      <button>Left</button>
    </Tooltip>
    <div style={{ visibility: 'hidden' }}>
      <button>Center</button>
    </div>
    <Tooltip content="Right tooltip" placement="right">
      <button>Right</button>
    </Tooltip>
    <div />
    <Tooltip content="Bottom tooltip" placement="bottom">
      <button>Bottom</button>
    </Tooltip>
    <div />
  </div>
);

// Rich Content Example
export const RichContent: StoryFn<TooltipProps> = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Tooltip
      content={
        <div>
          <strong>Rich Content</strong>
          <p style={{ margin: '8px 0 0' }}>
            Tooltips can contain formatted text, icons, and other elements.
          </p>
        </div>
      }
    >
      <button>Hover for rich content</button>
    </Tooltip>
  </div>
);

// Delay Example
export const WithDelays: StoryFn<TooltipProps> = () => (
  <div
    style={{
      padding: '50px',
      display: 'flex',
      gap: '24px',
      justifyContent: 'center',
    }}
  >
    <Tooltip content="Quick tooltip" showDelay={0} hideDelay={0}>
      <button>No delay</button>
    </Tooltip>
    <Tooltip content="Slow to appear" showDelay={500} hideDelay={150}>
      <button>Slow show (500ms)</button>
    </Tooltip>
    <Tooltip content="Slow to disappear" showDelay={200} hideDelay={500}>
      <button>Slow hide (500ms)</button>
    </Tooltip>
  </div>
);

// Disabled Example
export const Disabled: StoryFn<TooltipProps> = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Tooltip content="You won't see this" disabled>
      <button>Tooltip disabled</button>
    </Tooltip>
  </div>
);

// Interactive Elements Example
export const WithInteractiveElements: StoryFn<TooltipProps> = () => (
  <div
    style={{
      padding: '50px',
      display: 'flex',
      gap: '24px',
      justifyContent: 'center',
    }}
  >
    <Tooltip content="Click the button">
      <button onClick={() => alert('Button clicked!')}>
        Interactive button
      </button>
    </Tooltip>
    <Tooltip content="Type something">
      <input
        type="text"
        placeholder="Interactive input"
        style={{ padding: '8px' }}
      />
    </Tooltip>
    <Tooltip content="Select an option">
      <select style={{ padding: '8px' }} aria-label="Demo select">
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
    </Tooltip>
  </div>
);
