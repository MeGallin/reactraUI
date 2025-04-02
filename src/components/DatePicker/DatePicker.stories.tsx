import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatePicker, DatePickerProps } from './DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
} as Meta;

// Basic DatePicker Example
export const Basic: StoryFn<DatePickerProps> = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div style={{ padding: '50px' }}>
      <DatePicker value={date} onChange={setDate} />
      <div style={{ marginTop: '20px' }}>
        Selected date: {date?.toLocaleDateString()}
      </div>
    </div>
  );
};

// With Min/Max Dates
export const WithMinMaxDates: StoryFn<DatePickerProps> = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  );
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
  );

  return (
    <div style={{ padding: '50px' }}>
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select date (±7 days)"
      />
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <div>Min date: {minDate.toLocaleDateString()}</div>
        <div>Max date: {maxDate.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

// With Initial Value
export const WithInitialValue: StoryFn<DatePickerProps> = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div style={{ padding: '50px' }}>
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
};

// Disabled State
export const Disabled: StoryFn<DatePickerProps> = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div style={{ padding: '50px' }}>
      <DatePicker
        value={date}
        onChange={setDate}
        disabled
        placeholder="Disabled date picker"
      />
    </div>
  );
};

// Form Integration Example
export const FormIntegration: StoryFn<DatePickerProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: undefined as Date | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Form submitted with:\nName: ${
        formData.name
      }\nDate: ${formData.date?.toLocaleDateString()}`,
    );
  };

  return (
    <div style={{ padding: '50px' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '300px',
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Name</label>
          <input
            type="text"
            value={formData.name}
            aria-label="Name input"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Date</label>
          <DatePicker
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            placeholder="Select date"
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: '8px',
            padding: '8px 16px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

// Multiple DatePickers Example
export const MultipleDatePickers: StoryFn<DatePickerProps> = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate}
          placeholder="Start date"
        />
        <span>to</span>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          minDate={startDate}
          placeholder="End date"
        />
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        {startDate && endDate && (
          <div>
            Selected range: {startDate.toLocaleDateString()} -{' '}
            {endDate.toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};
