import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Alert, AlertProps } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    severity: {
      control: {
        type: 'select',
        options: ['success', 'info', 'warning', 'error'],
      },
    },
    dismissible: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  severity: 'info',
  children: 'This is an informational alert message.',
};

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  children: 'Operation completed successfully!',
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  children: 'Please review your input before proceeding.',
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  children: 'An error occurred while processing your request.',
};

export const Dismissible: StoryFn<AlertProps> = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <button onClick={() => setVisible(true)}>Show Alert</button>;
  }

  return (
    <Alert severity="info" dismissible onDismiss={() => setVisible(false)}>
      This is a dismissible alert. Click the X to dismiss it.
    </Alert>
  );
};
