import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistDetailScreenFigma } from './PlaylistDetailScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PlaylistDetailScreenFigma> = {
  title: 'features/playlists/PlaylistDetailScreenFigma',
  component: PlaylistDetailScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PlaylistDetailScreenFigma>;

const mockPlaylist = {
  id: '1',
  title: 'Trap Hits 2025',
  description: 'Les meilleurs trap beats du moment',
  beatCount: 15,
  duration: '45 min',
  typebeat: 'Trap',
  ambiance: 'Énergique',
};

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
    playlist: mockPlaylist,
    beats: mockBeats,
    onBack: () => console.log('Back pressed'),
    onBeatPress: beatId => console.log('Beat pressed:', beatId),
    onToggleFavorite: beatId => console.log('Toggle favorite:', beatId),
    onBuy: beatId => console.log('Buy:', beatId),
    onPlayAll: () => console.log('Play all'),
    onShuffle: () => console.log('Shuffle'),
    onShare: () => console.log('Share'),
  },
};
