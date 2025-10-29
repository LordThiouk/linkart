import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistDetailScreen } from './PlaylistDetailScreen';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof PlaylistDetailScreen> = {
  title: 'Screens/PlaylistDetailScreen',
  component: PlaylistDetailScreen,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    playlistId: 'pl1',
  },
};
