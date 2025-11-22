import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistDetailHeader } from './PlaylistDetailHeader';

const meta: Meta<typeof PlaylistDetailHeader> = {
  title: 'features/playlists/PlaylistDetailHeader',
  component: PlaylistDetailHeader,
};

export default meta;
type Story = StoryObj<typeof PlaylistDetailHeader>;

export const Default: Story = {
  args: {
    title: 'Trap Hits 2025',
    description: 'Les meilleurs trap beats du moment',
    beatCount: 15,
    duration: '45 min',
    typebeat: 'Trap',
    ambiance: 'Énergique',
    onBack: () => console.log('Back pressed'),
    onPlayAll: () => console.log('Play all pressed'),
    onShuffle: () => console.log('Shuffle pressed'),
    onShare: () => console.log('Share pressed'),
  },
};

export const WithCover: Story = {
  args: {
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    title: 'Afrobeat Vibes',
    description: 'Les meilleurs afrobeat beats',
    beatCount: 20,
    duration: '60 min',
    typebeat: 'Afrobeat',
    ambiance: 'Chill',
    onBack: () => console.log('Back pressed'),
    onPlayAll: () => console.log('Play all pressed'),
    onShuffle: () => console.log('Shuffle pressed'),
    onShare: () => console.log('Share pressed'),
  },
};
