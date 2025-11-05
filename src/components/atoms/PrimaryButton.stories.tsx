/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PrimaryButton } from './PrimaryButton';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Atoms/PrimaryButton',
  component: PrimaryButton,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
  args: {
    children: 'Bouton',
    variant: 'primary',
    fullWidth: false,
    disabled: false,
    loading: false,
  },
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    children: 'Acheter maintenant',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Annuler',
    variant: 'ghost',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Bouton pleine largeur',
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Bouton désactivé',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Chargement...',
    loading: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <PrimaryButton onPress={() => {}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 20, height: 20, backgroundColor: '#F5F5F5', borderRadius: 10 }} />
        <View style={{ backgroundColor: '#F5F5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
          <View style={{ width: 60, height: 16, backgroundColor: '#6366F1' }} />
        </View>
      </View>
    </PrimaryButton>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <PrimaryButton onPress={() => {}}>Primary Button</PrimaryButton>
      <PrimaryButton variant="ghost" onPress={() => {}}>
        Ghost Button
      </PrimaryButton>
      <PrimaryButton fullWidth onPress={() => {}}>
        Full Width Button
      </PrimaryButton>
      <PrimaryButton disabled onPress={() => {}}>
        Disabled Button
      </PrimaryButton>
      <PrimaryButton loading onPress={() => {}}>
        Loading Button
      </PrimaryButton>
    </View>
  ),
};
