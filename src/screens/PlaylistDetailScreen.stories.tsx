import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistDetailScreen } from './PlaylistDetailScreen';

const meta: Meta<typeof PlaylistDetailScreen> = {
  title: 'Screens/PlaylistDetailScreen',
  component: PlaylistDetailScreen,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PlaylistDetailScreen>;

export const Default: Story = {
  args: {
    playlistId: 'pl1',
  },
};
