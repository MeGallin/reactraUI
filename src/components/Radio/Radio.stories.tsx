import React, { useState } from 'react';
import Radio from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
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
    label: 'Radio Button',
  },
};

export const Checked = {
  args: {
    label: 'Checked Radio Button',
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
    label: 'Small Radio Button',
    size: 'small',
  },
};

export const Medium = {
  args: {
    label: 'Medium Radio Button',
    size: 'medium',
  },
};

export const Large = {
  args: {
    label: 'Large Radio Button',
    size: 'large',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled Checked Radio Button',
    disabled: true,
    checked: true,
  },
};

export const ColorVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Radio label="Primary Color" color="primary" checked />
    <Radio label="Secondary Color" color="secondary" checked />
    <Radio label="Error Color" color="error" checked />
    <Radio label="Warning Color" color="warning" checked />
    <Radio label="Info Color" color="info" checked />
    <Radio label="Success Color" color="success" checked />
  </div>
);

export const Interactive = () => {
  const [selected, setSelected] = useState('option1');

  console.log('Radio story render, selected:', selected);

  const handleToggle = (option: string) => {
    console.log('Radio story handleToggle called with option:', option);
    setSelected(option);
  };

  return (
    <div>
      <div>Current selection: {selected}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Radio
          label="Option 1"
          checked={selected === 'option1'}
          onToggle={() => handleToggle('option1')}
          value="option1"
          name="interactive-demo"
        />
        <Radio
          label="Option 2"
          checked={selected === 'option2'}
          onToggle={() => handleToggle('option2')}
          value="option2"
          name="interactive-demo"
        />
        <Radio
          label="Option 3"
          checked={selected === 'option3'}
          onToggle={() => handleToggle('option3')}
          value="option3"
          name="interactive-demo"
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleToggle('option1')}>Select Option 1</button>
        <button onClick={() => handleToggle('option2')}>Select Option 2</button>
        <button onClick={() => handleToggle('option3')}>Select Option 3</button>
      </div>
    </div>
  );
};

export const RadioGroup = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Radio
        label="Option 1"
        checked={selected === 'option1'}
        onToggle={() => setSelected('option1')}
        value="option1"
        name="radio-group-demo"
      />
      <Radio
        label="Option 2"
        checked={selected === 'option2'}
        onToggle={() => setSelected('option2')}
        value="option2"
        name="radio-group-demo"
      />
      <Radio
        label="Option 3"
        checked={selected === 'option3'}
        onToggle={() => setSelected('option3')}
        value="option3"
        name="radio-group-demo"
      />
    </div>
  );
};
