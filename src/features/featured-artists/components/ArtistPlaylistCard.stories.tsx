import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ArtistPlaylistCard } from './ArtistPlaylistCard';
import { mockArtists } from '../mockData';

const meta: Meta<typeof ArtistPlaylistCard> = {
  title: 'features/featured-artists/ArtistPlaylistCard',
  component: ArtistPlaylistCard,
};

export default meta;
type Story = StoryObj<typeof ArtistPlaylistCard>;

export const BoostedBeatmaker: Story = {
  args: {
    artist: mockArtists[0], // DJ Shadow (beatmaker, produits uniquement)
    onPress: () => console.log('Card pressed'),
  },
};

export const MixerWithServices: Story = {
  args: {
    artist: mockArtists[1], // Audio Engineer Pro (mixer, services uniquement)
    onPress: () => console.log('Card pressed'),
  },
};

export const CompleteArtist: Story = {
  args: {
    artist: mockArtists[2], // Producer X (artist, produits + services)
    onPress: () => console.log('Card pressed'),
  },
};

export const Studio: Story = {
  args: {
    artist: mockArtists[3], // Premium Sound Studio (studio, services uniquement)
    onPress: () => console.log('Card pressed'),
  },
};
