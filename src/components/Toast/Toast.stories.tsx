import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ToastProvider, useToast, ToastType } from './ToastContext';

export default {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta;

const ToastDemo = () => {
  const { addToast } = useToast();

  const showToast = (type: ToastType) => {
    addToast(
      `This is a ${type} toast notification!`,
      type,
      type === 'error' ? 0 : 5000,
    );
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button onClick={() => showToast('success')}>Show Success Toast</button>
      <button onClick={() => showToast('info')}>Show Info Toast</button>
      <button onClick={() => showToast('warning')}>Show Warning Toast</button>
      <button onClick={() => showToast('error')}>
        Show Persistent Error Toast
      </button>
      <button
        onClick={() => addToast('Custom duration toast (2s)', 'info', 2000)}
      >
        Show 2s Toast
      </button>
      <button
        onClick={() => {
          ['success', 'info', 'warning', 'error'].forEach((type) => {
            addToast(`Multiple ${type} toasts stack!`, type as ToastType, 5000);
          });
        }}
      >
        Stack Multiple Toasts
      </button>
    </div>
  );
};

export const Default: StoryFn = () => <ToastDemo />;

export const ProgrammaticUsage: StoryFn = () => {
  const { addToast } = useToast();

  return (
    <div>
      <h3>Toast Usage Example</h3>
      <pre>
        {`
// 1. Wrap your app with ToastProvider
<ToastProvider>
  <App />
</ToastProvider>

// 2. Use the useToast hook in your components
const { addToast } = useToast();

// 3. Show toasts
addToast('Operation successful!', 'success');
addToast('Something went wrong!', 'error', 0); // Duration 0 = persistent
addToast('Custom duration message', 'info', 2000); // 2 seconds
        `}
      </pre>
    </div>
  );
};
