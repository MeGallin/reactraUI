import React from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
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
    placeholder: 'Outlined Input',
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    placeholder: 'Filled Input',
  },
};

export const Standard = {
  args: {
    variant: 'standard',
    placeholder: 'Standard Input',
  },
};

export const WithLabel = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
  },
};

export const WithHelperText = {
  args: {
    label: 'Input Label',
    helperText: 'This is a helper text',
    placeholder: 'Enter text...',
  },
};

export const WithError = {
  args: {
    label: 'Input Label',
    error: true,
    helperText: 'This field is required',
    placeholder: 'Enter text...',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'You cannot edit this',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
  },
};

export const WithStartAdornment = {
  args: {
    label: 'With Start Adornment',
    startAdornment: '$',
    placeholder: 'Enter amount',
  },
};

export const WithEndAdornment = {
  args: {
    label: 'With End Adornment',
    endAdornment: '.com',
    placeholder: 'Enter domain',
  },
};

export const WithBothAdornments = {
  args: {
    label: 'With Both Adornments',
    startAdornment: 'https://',
    endAdornment: '.com',
    placeholder: 'Enter domain',
  },
};
