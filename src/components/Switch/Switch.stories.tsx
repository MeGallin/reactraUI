import React, { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
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
    label: 'Switch',
  },
};

export const Checked = {
  args: {
    label: 'Checked Switch',
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

export const Small = {
  args: {
    label: 'Small Switch',
    size: 'small',
  },
};

export const Medium = {
  args: {
    label: 'Medium Switch',
    size: 'medium',
  },
};

export const Large = {
  args: {
    label: 'Large Switch',
    size: 'large',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled Checked Switch',
    disabled: true,
    checked: true,
  },
};

export const ColorVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Switch label="Primary Color" color="primary" checked />
    <Switch label="Secondary Color" color="secondary" checked />
    <Switch label="Error Color" color="error" checked />
    <Switch label="Warning Color" color="warning" checked />
    <Switch label="Info Color" color="info" checked />
    <Switch label="Success Color" color="success" checked />
  </div>
);

export const Interactive = () => {
  const [checked, setChecked] = useState(false);

  console.log('Switch story render, checked:', checked);

  const handleToggle = (newValue: boolean) => {
    console.log('Switch story handleToggle called with:', newValue);
    setChecked(newValue);
  };

  return (
    <div>
      <div>Current state: {checked ? 'ON' : 'OFF'}</div>
      <Switch
        label={`Interactive Switch: ${checked ? 'On' : 'Off'}`}
        checked={checked}
        onToggle={handleToggle}
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setChecked(!checked)}>
          Toggle Switch Manually
        </button>
      </div>
    </div>
  );
};

export const SwitchGroup = () => {
  const [state, setState] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const handleToggle = (option: keyof typeof state, value: boolean) => {
    setState({
      ...state,
      [option]: value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Switch
        label="Enable Notifications"
        checked={state.notifications}
        onToggle={(value) => handleToggle('notifications', value)}
        name="notifications"
      />
      <Switch
        label="Dark Mode"
        checked={state.darkMode}
        onToggle={(value) => handleToggle('darkMode', value)}
        name="darkMode"
      />
      <Switch
        label="Auto Save"
        checked={state.autoSave}
        onToggle={(value) => handleToggle('autoSave', value)}
        name="autoSave"
      />
    </div>
  );
};
