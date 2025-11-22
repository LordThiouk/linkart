import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistBeatItem } from './PlaylistBeatItem';

const meta: Meta<typeof PlaylistBeatItem> = {
  title: 'features/playlists/PlaylistBeatItem',
  component: PlaylistBeatItem,
};

export default meta;
type Story = StoryObj<typeof PlaylistBeatItem>;

export const Default: Story = {
  args: {
    position: 1,
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    duration: '3:24',
    price: 25000,
    isPurchased: false,
    isFavorite: false,
    onPress: () => console.log('Beat pressed'),
    onToggleFavorite: () => console.log('Toggle favorite'),
    onBuy: () => console.log('Buy pressed'),
  },
};

export const CurrentBeat: Story = {
  args: {
    position: 2,
    title: 'Dark Trap Energy',
    artist: 'BeatKing',
    duration: '2:45',
    price: 30000,
    isPurchased: true,
    isFavorite: true,
    isCurrentBeat: true,
    isPlaying: true,
    onPress: () => console.log('Beat pressed'),
    onToggleFavorite: () => console.log('Toggle favorite'),
  },
};

export const Purchased: Story = {
  args: {
    position: 3,
    title: 'Summer Vibes',
    artist: 'Producer X',
    duration: '3:10',
    price: 20000,
    isPurchased: true,
    isFavorite: false,
    onPress: () => console.log('Beat pressed'),
    onToggleFavorite: () => console.log('Toggle favorite'),
  },
};
