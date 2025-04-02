import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta;

// Basic Modal Example
export const Basic: StoryFn<ModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
        <p>This is a basic modal with a title and close button.</p>
      </Modal>
    </>
  );
};

// Confirmation Dialog Example
export const ConfirmationDialog: StoryFn<ModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Confirmation</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button
              onClick={() => {
                alert('Action confirmed!');
                setOpen(false);
              }}
              style={{
                background: '#4285f4',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Confirm
            </button>
          </>
        }
      >
        <p>Are you sure you want to perform this action?</p>
      </Modal>
    </>
  );
};

// Form Modal Example
export const FormModal: StoryFn<ModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Form</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="User Information"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button
              onClick={() => {
                alert('Form submitted!');
                setOpen(false);
              }}
              style={{
                background: '#4285f4',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Submit
            </button>
          </>
        }
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              htmlFor="name"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

// Long Content Example
export const LongContent: StoryFn<ModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Long Content</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Scrollable Content"
      >
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1} demonstrating scrollable content in the
            modal. The modal has a max height and will scroll when content
            exceeds it.
          </p>
        ))}
      </Modal>
    </>
  );
};

// Custom Width Example
export const CustomWidth: StoryFn<ModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Wide Modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Wide Modal"
        maxWidth="800px"
      >
        <p>
          This modal has a custom width of 800px (except on mobile where it
          takes full width).
        </p>
      </Modal>
    </>
  );
};
