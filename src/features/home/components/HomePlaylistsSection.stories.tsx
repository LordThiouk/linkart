import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomePlaylistsSection } from './HomePlaylistsSection';
import type { HomePlaylist } from '../types';

const playlists: HomePlaylist[] = [
  {
    id: 'p1',
    title: 'Top Beats Afrobeat',
    description: 'Les meilleurs beats afrobeat du moment',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'beats',
    itemCount: 24,
    totalPlays: 45000,
  },
  {
    id: 'p2',
    title: 'Drum Kits Essentiels',
    description: 'Collection complète de kits pour producteurs',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    type: 'kits',
    itemCount: 15,
    totalPlays: 28000,
  },
];

const meta: Meta<typeof HomePlaylistsSection> = {
  title: 'Features/Home/HomePlaylistsSection',
  component: HomePlaylistsSection,
};

export default meta;
type Story = StoryObj<typeof HomePlaylistsSection>;

export const Default: Story = {
  args: {
    playlists,
    onPlaylistPress: () => {},
    onSeeAll: () => {},
  },
};
