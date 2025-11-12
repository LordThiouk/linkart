import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ChatScreenFigma } from './ChatScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ChatScreenFigma> = {
  title: 'Screens/Messaging/ChatScreenFigma',
  component: ChatScreenFigma,
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
type Story = StoryObj<typeof ChatScreenFigma>;

export const Default: Story = {
  args: {
    conversationId: 'conv_1',
    otherUserName: 'Audio Engineer Pro',
    otherUserImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    accessToken: 'mock_token',
    onBack: () => console.log('Back pressed'),
  },
};
