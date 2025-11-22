import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ProductPlayer } from './ProductPlayer';

const InteractiveWrapper: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ProductPlayer
      title="Midnight Vibes"
      artist="DJ Shadow"
      artistImage="https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100"
      isPlaying={isPlaying}
      duration="3:24"
      currentTime="1:15"
      onTogglePlay={() => setIsPlaying(!isPlaying)}
    />
  );
};

const meta: Meta<typeof ProductPlayer> = {
  title: 'Features/Products/ProductPlayer',
  component: ProductPlayer,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductPlayer>;

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};

export const Playing: Story = {
  args: {
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    isPlaying: true,
    duration: '3:24',
    currentTime: '1:15',
    onTogglePlay: () => console.log('Toggle play'),
  },
};

export const Paused: Story = {
  args: {
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    isPlaying: false,
    duration: '3:24',
    currentTime: '0:00',
    onTogglePlay: () => console.log('Toggle play'),
  },
};
