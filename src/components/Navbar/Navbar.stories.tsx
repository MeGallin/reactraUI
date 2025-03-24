import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Navbar from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof Navbar>;

export const Default: StoryFn<typeof Navbar> = () => <Navbar />;

export const WithCustomLinks: StoryFn<typeof Navbar> = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Navbar Example</h1>
        <p>
          This example shows the navbar with custom links. Try resizing the
          window to see the responsive behavior.
        </p>
        <p>
          On mobile devices, the navbar collapses into a hamburger menu that
          opens a drawer when clicked.
        </p>
      </div>
    </div>
  );
};
