/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Pill } from './Pill';
import { View } from 'react-native';
import React from 'react';
import { Music, Radio, Package, Zap } from 'lucide-react-native';

const meta: Meta<typeof Pill> = {
  title: 'Atoms/Pill',
  component: Pill,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
  args: {
    label: 'Pill',
    selected: false,
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    label: 'Tout',
    icon: Music,
  },
};

export const Selected: Story = {
  args: {
    label: 'Beats',
    icon: Radio,
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Kits',
    icon: Package,
  },
};

export const AllCategories: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Pill label="Tout" icon={Music} selected={true} onPress={() => {}} />
      <Pill label="Beats" icon={Radio} selected={false} onPress={() => {}} />
      <Pill label="Kits" icon={Package} selected={false} onPress={() => {}} />
      <Pill label="Samples" icon={Zap} selected={false} onPress={() => {}} />
    </View>
  ),
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Pill label="Non sélectionné" icon={Music} selected={false} onPress={() => {}} />
      <Pill label="Sélectionné" icon={Music} selected={true} onPress={() => {}} />
      <Pill label="Avec icône" icon={Package} selected={false} onPress={() => {}} />
      <Pill label="Sélectionné avec icône" icon={Radio} selected={true} onPress={() => {}} />
    </View>
  ),
};
