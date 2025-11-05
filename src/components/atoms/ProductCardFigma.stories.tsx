/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductCardFigma } from './ProductCardFigma';
import { View } from 'react-native';
import React from 'react';

const meta: Meta<typeof ProductCardFigma> = {
  title: 'Atoms/ProductCardFigma',
  component: ProductCardFigma,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: '#0A0A0A', minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    artist: { control: 'text' },
    price: { control: 'number' },
    type: {
      control: 'select',
      options: ['beat', 'kit', 'sample'],
    },
    isPlaying: { control: 'boolean' },
    isFavorited: { control: 'boolean' },
    onPress: { action: 'pressed' },
    onPlay: { action: 'played' },
    onToggleFavorite: { action: 'favorited' },
  },
  args: {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29000,
    type: 'beat',
    bpm: 140,
    genre: 'Trap',
    likes: 1243,
    downloads: 847,
    rating: 4.8,
    reviewCount: 87,
    isPlaying: false,
    isFavorited: false,
  },
};

export default meta;

type Story = StoryObj<typeof ProductCardFigma>;

export const Default: Story = {
  args: {},
};

export const Playing: Story = {
  args: {
    isPlaying: true,
  },
};

export const Favorited: Story = {
  args: {
    isFavorited: true,
  },
};

export const Kit: Story = {
  args: {
    type: 'kit',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
  },
};

export const Sample: Story = {
  args: {
    type: 'sample',
    title: 'Vocal Chops Sample',
    artist: 'VocalPro',
  },
};

export const HighMetrics: Story = {
  args: {
    likes: 10000,
    downloads: 5000,
    rating: 5.0,
    reviewCount: 500,
  },
};

export const GridLayout: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <View style={{ width: '48%' }}>
        <ProductCardFigma
          id="1"
          title="Afrobeat Summer"
          artist="KofiBeats"
          artistImage="https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100"
          coverImage="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400"
          price={24000}
          type="beat"
          bpm={112}
          genre="Afrobeat"
          likes={892}
          downloads={456}
          rating={4.7}
          reviewCount={64}
          isFavorited={false}
          onPress={() => {}}
          onToggleFavorite={() => {}}
        />
      </View>
      <View style={{ width: '48%' }}>
        <ProductCardFigma
          id="2"
          title="Lagos Nights"
          artist="NaijaVibes"
          artistImage="https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100"
          coverImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400"
          price={29000}
          type="beat"
          bpm={128}
          genre="Afrobeat"
          likes={1543}
          downloads={789}
          rating={4.9}
          reviewCount={102}
          isFavorited={true}
          isPlaying={true}
          onPress={() => {}}
          onPlay={() => {}}
          onToggleFavorite={() => {}}
        />
      </View>
    </View>
  ),
};
