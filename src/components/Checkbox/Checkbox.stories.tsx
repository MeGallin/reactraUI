import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    helperText: {
      control: 'text',
    },
    indeterminate: {
      control: 'boolean',
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
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    label: 'Checkbox',
  },
};

export const Checked = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const WithHelperText = {
  args: {
    label: 'With Helper Text',
    helperText: 'This is a helper text',
  },
};

export const WithError = {
  args: {
    label: 'Error State',
    error: true,
    helperText: 'This field is required',
  },
};

export const Indeterminate = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const Small = {
  args: {
    label: 'Small Checkbox',
    size: 'small',
  },
};

export const Medium = {
  args: {
    label: 'Medium Checkbox',
    size: 'medium',
  },
};

export const Large = {
  args: {
    label: 'Large Checkbox',
    size: 'large',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled Checked Checkbox',
    disabled: true,
    checked: true,
  },
};

export const ColorVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Checkbox label="Primary Color" color="primary" checked />
    <Checkbox label="Secondary Color" color="secondary" checked />
    <Checkbox label="Error Color" color="error" checked />
    <Checkbox label="Warning Color" color="warning" checked />
    <Checkbox label="Info Color" color="info" checked />
    <Checkbox label="Success Color" color="success" checked />
  </div>
);

export const Interactive = () => {
  const [checked, setChecked] = useState(false);

  console.log('Checkbox story render, checked:', checked);

  const handleToggle = (newValue: boolean) => {
    console.log('Checkbox story handleToggle called with:', newValue);
    setChecked(newValue);
  };

  return (
    <div>
      <div>Current state: {checked ? 'CHECKED' : 'UNCHECKED'}</div>
      <Checkbox
        label="Interactive Checkbox"
        checked={checked}
        onToggle={handleToggle}
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setChecked(!checked)}>
          Toggle Checkbox Manually
        </button>
      </div>
    </div>
  );
};

export const CheckboxGroup = () => {
  const [state, setState] = useState({
    option1: true,
    option2: false,
    option3: false,
  });

  const handleToggle = (option: keyof typeof state, value: boolean) => {
    setState({
      ...state,
      [option]: value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Checkbox
        label="Option 1"
        checked={state.option1}
        onToggle={(value) => handleToggle('option1', value)}
        name="option1"
      />
      <Checkbox
        label="Option 2"
        checked={state.option2}
        onToggle={(value) => handleToggle('option2', value)}
        name="option2"
      />
      <Checkbox
        label="Option 3"
        checked={state.option3}
        onToggle={(value) => handleToggle('option3', value)}
        name="option3"
      />
    </div>
  );
};
