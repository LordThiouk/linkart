import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FeaturedArtistsScreenFigma } from './FeaturedArtistsScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FeaturedArtistsScreenFigma> = {
  title: 'features/featured-artists/FeaturedArtistsScreenFigma',
  component: FeaturedArtistsScreenFigma,
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
type Story = StoryObj<typeof FeaturedArtistsScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    onArtistPress: artistId => console.log('Artist pressed:', artistId),
    onPlaylistPress: playlistId => console.log('Playlist pressed:', playlistId),
  },
};
