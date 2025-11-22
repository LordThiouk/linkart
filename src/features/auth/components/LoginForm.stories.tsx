import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'features/auth/LoginForm',
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Phone: Story = {
  render: () => {
    const [contact, setContact] = useState('');
    return (
      <LoginForm
        contactType="phone"
        contact={contact}
        onContactChange={setContact}
        onSubmit={() => console.log('Submit:', contact)}
      />
    );
  },
};

export const Email: Story = {
  render: () => {
    const [contact, setContact] = useState('');
    return (
      <LoginForm
        contactType="email"
        contact={contact}
        onContactChange={setContact}
        onSubmit={() => console.log('Submit:', contact)}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [contact, setContact] = useState('');
    return (
      <LoginForm
        contactType="phone"
        contact={contact}
        error="Numéro de téléphone invalide"
        onContactChange={setContact}
        onSubmit={() => console.log('Submit:', contact)}
      />
    );
  },
};
