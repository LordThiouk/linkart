/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPField } from './OTPField';
import { View } from 'react-native';
import React, { useState } from 'react';

const meta: Meta<typeof OTPField> = {
  title: 'Atoms/OTPField',
  component: OTPField,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    length: { control: 'number' },
    error: { control: 'boolean' },
  },
  args: {
    length: 6,
    value: '',
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof OTPField>;

const InteractiveOTP = ({ length = 6, error = false }: { length?: number; error?: boolean }) => {
  const [value, setValue] = useState('');
  return <OTPField length={length} value={value} onChange={setValue} error={error} />;
};

export const Default: Story = {
  render: args => <InteractiveOTP {...args} />,
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('123456');
    return <OTPField length={6} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('123');
    return <OTPField length={6} value={value} onChange={setValue} error={true} />;
  },
};

export const FourDigits: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <OTPField length={4} value={value} onChange={setValue} />;
  },
};

export const EightDigits: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <OTPField length={8} value={value} onChange={setValue} />;
  },
};
