/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InputField } from './InputField';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Atoms/InputField',
  component: InputField,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    secureTextEntry: { control: 'boolean' },
    keyboardType: {
      control: 'select',
      options: ['default', 'email-address', 'numeric', 'phone-pad'],
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    value: '',
    error: '',
    secureTextEntry: false,
    keyboardType: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Numéro de téléphone',
    placeholder: '+221 77 123 45 67',
    keyboardType: 'phone-pad',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    keyboardType: 'email-address',
  },
};

export const WithError: Story = {
  args: {
    label: 'Mot de passe',
    value: '123',
    error: 'Le mot de passe doit contenir au moins 8 caractères',
    secureTextEntry: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Champ désactivé',
    value: 'Valeur non modifiable',
    editable: false,
  },
};

export const Password: Story = {
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    secureTextEntry: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <InputField label="Normal" placeholder="Texte normal" />
      <InputField label="Avec valeur" value="Valeur pré-remplie" />
      <InputField label="Avec erreur" value="123" error="Erreur de validation" />
      <InputField label="Désactivé" value="Valeur figée" editable={false} />
      <InputField label="Mot de passe" placeholder="••••••••" secureTextEntry />
    </View>
  ),
};
