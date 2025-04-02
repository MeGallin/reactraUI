import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Slider, SliderProps } from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta;

// Basic Slider Example
export const Basic: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState(50);

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as number)} />
      <div style={{ marginTop: '20px' }}>Value: {value}</div>
    </div>
  );
};

// Range Slider Example
export const Range: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as [number, number])} />
      <div style={{ marginTop: '20px' }}>
        Range: {value[0]} - {value[1]}
      </div>
    </div>
  );
};

// With Labels
export const WithLabels: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState(50);

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        showLabels
      />
    </div>
  );
};

// Custom Steps and Range
export const CustomStepsAndRange: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        min={-50}
        max={50}
        step={10}
        showLabels
      />
    </div>
  );
};

// Custom Label Formatting
export const CustomLabels: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState(50);

  const formatLabel = (value: number) => `${value}%`;

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        showLabels
        formatLabel={formatLabel}
      />
    </div>
  );
};

// Disabled State
export const Disabled: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        disabled
        showLabels
      />
    </div>
  );
};

// Price Range Example
export const PriceRange: StoryFn<SliderProps> = () => {
  const [value, setValue] = useState<[number, number]>([200, 800]);

  const formatPrice = (value: number) => `$${value}`;

  return (
    <div style={{ padding: '50px', maxWidth: '400px' }}>
      <h3>Price Range Filter</h3>
      <Slider
        value={value}
        onChange={(v) => setValue(v as [number, number])}
        min={0}
        max={1000}
        step={50}
        showLabels
        formatLabel={formatPrice}
      />
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>Min: ${value[0]}</div>
        <div>Max: ${value[1]}</div>
      </div>
    </div>
  );
};

// Multiple Sliders Example
export const MultipleSliders: StoryFn<SliderProps> = () => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(60);

  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div style={{ padding: '50px', maxWidth: '300px' }}>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Volume</label>
        <Slider
          value={volume}
          onChange={(v) => setVolume(v as number)}
          showLabels
          formatLabel={formatPercentage}
        />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Brightness
        </label>
        <Slider
          value={brightness}
          onChange={(v) => setBrightness(v as number)}
          showLabels
          formatLabel={formatPercentage}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Contrast
        </label>
        <Slider
          value={contrast}
          onChange={(v) => setContrast(v as number)}
          showLabels
          formatLabel={formatPercentage}
        />
      </div>
    </div>
  );
};
