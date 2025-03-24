import React from 'react';
import Textarea from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['outlined', 'filled', 'standard'] },
    },
    error: {
      control: 'boolean',
    },
    helperText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    minRows: {
      control: { type: 'number', min: 1, max: 20 },
    },
    maxRows: {
      control: { type: 'number', min: 1, max: 20 },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    placeholder: 'Outlined Textarea',
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    placeholder: 'Filled Textarea',
  },
};

export const Standard = {
  args: {
    variant: 'standard',
    placeholder: 'Standard Textarea',
  },
};

export const WithLabel = {
  args: {
    label: 'Textarea Label',
    placeholder: 'Enter text...',
  },
};

export const WithHelperText = {
  args: {
    label: 'Textarea Label',
    helperText: 'This is a helper text',
    placeholder: 'Enter text...',
  },
};

export const WithError = {
  args: {
    label: 'Textarea Label',
    error: true,
    helperText: 'This field is required',
    placeholder: 'Enter text...',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Textarea',
    disabled: true,
    placeholder: 'You cannot edit this',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    label: 'Full Width Textarea',
    placeholder: 'This textarea takes full width',
  },
};

export const CustomRows = {
  args: {
    label: 'Custom Rows',
    minRows: 5,
    maxRows: 10,
    placeholder: 'This textarea has custom min and max rows',
  },
};
