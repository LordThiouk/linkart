import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { ContactTypeSelector } from './ContactTypeSelector';

const meta: Meta<typeof ContactTypeSelector> = {
  title: 'features/auth/ContactTypeSelector',
  component: ContactTypeSelector,
};

export default meta;
type Story = StoryObj<typeof ContactTypeSelector>;

export const Default: Story = {
  render: () => {
    const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
    return <ContactTypeSelector contactType={contactType} onTypeChange={setContactType} />;
  },
};

export const EmailSelected: Story = {
  render: () => {
    const [contactType, setContactType] = useState<'phone' | 'email'>('email');
    return <ContactTypeSelector contactType={contactType} onTypeChange={setContactType} />;
  },
};
