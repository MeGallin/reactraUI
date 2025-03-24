import React, { useState } from 'react';
import Select from './Select';
import { SelectOption } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
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
    placeholder: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

const defaultOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

export const Default = {
  args: {
    options: defaultOptions,
    label: 'Select',
  },
};

export const Outlined = {
  args: {
    options: defaultOptions,
    variant: 'outlined',
    label: 'Outlined Select',
  },
};

export const Filled = {
  args: {
    options: defaultOptions,
    variant: 'filled',
    label: 'Filled Select',
  },
};

export const Standard = {
  args: {
    options: defaultOptions,
    variant: 'standard',
    label: 'Standard Select',
  },
};

export const WithPlaceholder = {
  args: {
    options: defaultOptions,
    label: 'With Placeholder',
    placeholder: 'Select an option',
  },
};

export const WithHelperText = {
  args: {
    options: defaultOptions,
    label: 'With Helper Text',
    helperText: 'This is a helper text',
  },
};

export const WithError = {
  args: {
    options: defaultOptions,
    label: 'Error State',
    error: true,
    helperText: 'This field is required',
  },
};

export const Small = {
  args: {
    options: defaultOptions,
    label: 'Small Select',
    size: 'small',
  },
};

export const Medium = {
  args: {
    options: defaultOptions,
    label: 'Medium Select',
    size: 'medium',
  },
};

export const Large = {
  args: {
    options: defaultOptions,
    label: 'Large Select',
    size: 'large',
  },
};

export const Disabled = {
  args: {
    options: defaultOptions,
    label: 'Disabled Select',
    disabled: true,
  },
};

export const FullWidth = {
  args: {
    options: defaultOptions,
    label: 'Full Width Select',
    fullWidth: true,
  },
};

export const WithDisabledOptions = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ],
    label: 'With Disabled Options',
  },
};

export const Interactive = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ width: '300px' }}>
      <Select
        options={defaultOptions}
        label="Interactive Select"
        value={value}
        onChange={handleChange}
        placeholder="Select an option"
      />
      <div style={{ marginTop: '20px' }}>Selected value: {value || 'None'}</div>
    </div>
  );
};

export const MultipleSelects = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
  ];

  const cities: Record<string, SelectOption[]> = {
    us: [
      { value: 'nyc', label: 'New York' },
      { value: 'la', label: 'Los Angeles' },
      { value: 'chi', label: 'Chicago' },
    ],
    ca: [
      { value: 'tor', label: 'Toronto' },
      { value: 'van', label: 'Vancouver' },
      { value: 'mon', label: 'Montreal' },
    ],
    uk: [
      { value: 'lon', label: 'London' },
      { value: 'man', label: 'Manchester' },
      { value: 'bir', label: 'Birmingham' },
    ],
    au: [
      { value: 'syd', label: 'Sydney' },
      { value: 'mel', label: 'Melbourne' },
      { value: 'bri', label: 'Brisbane' },
    ],
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setCity(''); // Reset city when country changes
  };

  return (
    <div style={{ width: '300px' }}>
      <Select
        options={countries}
        label="Country"
        value={country}
        onChange={handleCountryChange}
        placeholder="Select a country"
        style={{ marginBottom: '20px' }}
      />
      <Select
        options={country ? cities[country] : []}
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Select a city"
        disabled={!country}
      />
    </div>
  );
};
