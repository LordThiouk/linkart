import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistBeatList } from './PlaylistBeatList';

const meta: Meta<typeof PlaylistBeatList> = {
  title: 'features/playlists/PlaylistBeatList',
  component: PlaylistBeatList,
};

export default meta;
type Story = StoryObj<typeof PlaylistBeatList>;

const mockBeats = [
  {
    id: '1',
    position: 1,
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    duration: '3:24',
    price: 25000,
    isPurchased: false,
    isFavorite: false,
  },
  {
    id: '2',
    position: 2,
    title: 'Dark Trap Energy',
    artist: 'BeatKing',
    duration: '2:45',
    price: 30000,
    isPurchased: true,
    isFavorite: true,
  },
  {
    id: '3',
    position: 3,
    title: 'Summer Vibes',
    artist: 'Producer X',
    duration: '3:10',
    price: 20000,
    isPurchased: false,
    isFavorite: false,
  },
];

export const Default: Story = {
  args: {
    beats: mockBeats,
    currentBeatId: '2',
    isPlaying: true,
    onBeatPress: beatId => console.log('Beat pressed:', beatId),
    onToggleFavorite: beatId => console.log('Toggle favorite:', beatId),
    onBuy: beatId => console.log('Buy:', beatId),
  },
};

export const Empty: Story = {
  args: {
    beats: [],
    onBeatPress: () => {},
  },
};
