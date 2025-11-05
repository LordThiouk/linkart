/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistCardFigma } from './PlaylistCardFigma';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof PlaylistCardFigma> = {
  title: 'Molecules/PlaylistCardFigma',
  component: PlaylistCardFigma,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 300 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    type: { control: 'select', options: ['beats', 'kits', 'samples'] },
    itemCount: { control: 'number' },
    onPress: { action: 'pressed' },
  },
  args: {
    id: '1',
    title: 'Trap Hits 2025',
    type: 'beats',
    description: 'Les meilleurs trap beats de 2025',
    itemCount: 15,
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
  },
};

export default meta;

type Story = StoryObj<typeof PlaylistCardFigma>;

export const Default: Story = {
  args: {},
};

export const Kits: Story = {
  args: {
    type: 'kits',
    title: 'Amapiano Essentials',
    description: 'Collection de kits Amapiano',
    itemCount: 20,
  },
};

export const Samples: Story = {
  args: {
    type: 'samples',
    title: 'Vocal Chops Collection',
    description: 'Collection de samples vocaux',
    itemCount: 30,
  },
};

export const HorizontalScroll: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <PlaylistCardFigma
        id="1"
        title="Trap Hits 2025"
        type="beats"
        description="Les meilleurs trap beats de 2025"
        itemCount={15}
        coverImage="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400"
        onPress={() => {}}
      />
      <PlaylistCardFigma
        id="2"
        title="Afrobeat Vibes"
        type="beats"
        description="Collection de beats Afrobeat"
        itemCount={22}
        coverImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400"
        onPress={() => {}}
      />
      <PlaylistCardFigma
        id="3"
        title="Lo-fi Chill"
        type="beats"
        description="Collection de beats Lo-fi"
        itemCount={18}
        coverImage="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400"
        onPress={() => {}}
      />
    </View>
  ),
};
