import React, { useState } from 'react';
import Form from './Form';
import Input from '../Input';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Select from '../Select';
import Button from '../Button';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    spacing: 'medium',
    fullWidth: false,
    children: (
      <>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Button>Submit</Button>
      </>
    ),
  },
};

export const WithDifferentSpacing = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <h3>Small Spacing</h3>
      <Form spacing="small">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Button>Submit</Button>
      </Form>
    </div>
    <div>
      <h3>Medium Spacing</h3>
      <Form spacing="medium">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Button>Submit</Button>
      </Form>
    </div>
    <div>
      <h3>Large Spacing</h3>
      <Form spacing="large">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Button>Submit</Button>
      </Form>
    </div>
  </div>
);

export const FullWidthForm = () => (
  <div style={{ width: '500px' }}>
    <Form fullWidth>
      <Input label="Name" placeholder="Enter your name" fullWidth />
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        fullWidth
      />
      <Textarea label="Message" placeholder="Enter your message" fullWidth />
      <Button fullWidth>Submit</Button>
    </Form>
  </div>
);

export const ContactForm = () => (
  <div style={{ width: '400px' }}>
    <Form>
      <Input label="Name" placeholder="Enter your name" fullWidth />
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        fullWidth
      />
      <Select
        label="Subject"
        placeholder="Select a subject"
        fullWidth
        options={[
          { value: 'general', label: 'General Inquiry' },
          { value: 'support', label: 'Technical Support' },
          { value: 'billing', label: 'Billing Question' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <Textarea
        label="Message"
        placeholder="Enter your message"
        fullWidth
        minRows={5}
      />
      <Checkbox label="Subscribe to newsletter" />
      <Button fullWidth>Send Message</Button>
    </Form>
  </div>
);

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (validate()) {
      alert('Form submitted successfully!');
      // In a real app, you would submit the form data to your backend here
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
        </div>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />
        <Checkbox
          label="I agree to the terms and conditions"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          error={!!errors.agreeTerms}
          helperText={errors.agreeTerms}
        />
        <Button type="submit" fullWidth>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert(`Logging in with: ${formData.email}`);
    // In a real app, you would submit the form data to your backend here
  };

  return (
    <div style={{ width: '350px' }}>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth>
          Log In
        </Button>
      </Form>
    </div>
  );
};
