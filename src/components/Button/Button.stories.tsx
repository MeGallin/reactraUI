import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['contained', 'outlined', 'text'] },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    color: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'error',
          'warning',
          'info',
          'success',
        ],
      },
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
  },
};

export const Contained = {
  args: {
    variant: 'contained',
    children: 'Contained Button',
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Text = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const WithStartIcon = {
  args: {
    startIcon: '→',
    children: 'Button with Start Icon',
  },
};

export const WithEndIcon = {
  args: {
    endIcon: '→',
    children: 'Button with End Icon',
  },
};
