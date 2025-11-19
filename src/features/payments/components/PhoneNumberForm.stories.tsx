import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { PhoneNumberForm } from './PhoneNumberForm';

const meta: Meta<typeof PhoneNumberForm> = {
  title: 'Features/Payments/PhoneNumberForm',
  component: PhoneNumberForm,
  args: {
    label: 'Numéro Wave',
    value: '+221 77 123 45 67',
    placeholder: '+221 77 123 45 67',
    hint: 'Vous recevrez une notification pour valider le paiement',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneNumberForm>;

export const Default: Story = {};

const InteractiveWrapper = () => {
  const [value, setValue] = useState('');
  return <PhoneNumberForm label="Numéro Orange Money" value={value} onChange={setValue} />;
};

export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
  args: {
    onChange: undefined,
  },
};
