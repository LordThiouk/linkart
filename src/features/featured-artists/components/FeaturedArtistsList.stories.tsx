import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FeaturedArtistsList } from './FeaturedArtistsList';
import { mockArtists } from '../mockData';

const meta: Meta<typeof FeaturedArtistsList> = {
  title: 'features/featured-artists/FeaturedArtistsList',
  component: FeaturedArtistsList,
};

export default meta;
type Story = StoryObj<typeof FeaturedArtistsList>;

export const All: Story = {
  args: {
    artists: mockArtists,
    activeCategory: 'all',
    onArtistPress: artistId => console.log('Artist pressed:', artistId),
    onPlaylistPress: playlistId => console.log('Playlist pressed:', playlistId),
  },
};

export const Beatmakers: Story = {
  args: {
    artists: mockArtists,
    activeCategory: 'beatmaker',
    onArtistPress: artistId => console.log('Artist pressed:', artistId),
    onPlaylistPress: playlistId => console.log('Playlist pressed:', playlistId),
  },
};

export const Mixers: Story = {
  args: {
    artists: mockArtists,
    activeCategory: 'mixer',
    onArtistPress: artistId => console.log('Artist pressed:', artistId),
    onPlaylistPress: playlistId => console.log('Playlist pressed:', playlistId),
  },
};

export const Empty: Story = {
  args: {
    artists: [],
    activeCategory: 'all',
    onArtistPress: () => {},
    onPlaylistPress: () => {},
  },
};
