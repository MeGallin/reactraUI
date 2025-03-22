import React from 'react';
import Card from './Card';
import Button from '../Button';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['elevated', 'outlined', 'flat'] },
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    children: 'Card Content',
  },
};

export const Elevated = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with shadow.',
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with border.',
  },
};

export const Flat = {
  args: {
    variant: 'flat',
    children: 'This is a flat card without shadow or border.',
  },
};

export const WithHeader = {
  args: {
    header: <h3 style={{ margin: 0 }}>Card Header</h3>,
    children: 'Card content with a header section.',
  },
};

export const WithActions = {
  args: {
    children: 'Card content with action buttons.',
    actions: (
      <>
        <Button variant="text" size="small">
          Cancel
        </Button>
        <Button size="small">Submit</Button>
      </>
    ),
  },
};

export const CompleteCard = {
  args: {
    header: <h3 style={{ margin: 0 }}>Complete Card</h3>,
    children: (
      <div>
        <p>This card demonstrates all sections:</p>
        <ul>
          <li>Header section at the top</li>
          <li>Content section in the middle</li>
          <li>Actions section at the bottom</li>
        </ul>
      </div>
    ),
    actions: (
      <>
        <Button variant="outlined" size="small">
          Cancel
        </Button>
        <Button size="small">Save</Button>
      </>
    ),
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    header: <h3 style={{ margin: 0 }}>Full Width Card</h3>,
    children: 'This card takes up the full width of its container.',
    actions: <Button size="small">Action</Button>,
  },
  parameters: {
    layout: 'padded',
  },
};

export const ResponsiveExample = () => (
  <div style={{ width: '100%', maxWidth: '800px' }}>
    <Card
      header={<h3 style={{ margin: 0 }}>Responsive Card</h3>}
      actions={
        <>
          <Button variant="outlined" size="small">
            Cancel
          </Button>
          <Button size="small">Submit</Button>
        </>
      }
    >
      <p>
        This card demonstrates responsive behavior. On mobile screens, it will
        take up the full width. On larger screens, it will respect its
        container's width.
      </p>
      <p>
        Try resizing your browser window to see how the card adapts to different
        screen sizes.
      </p>
    </Card>
  </div>
);
