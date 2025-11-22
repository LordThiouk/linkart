import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ChatScreenFigma } from './ChatScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ChatScreenFigma> = {
  title: 'Features/Messaging/ChatScreenFigma',
  component: ChatScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
  },
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
    onBack: () => {},
  },
};

export const EmptyChat: Story = {
  args: {
    conversationId: 'conv_2',
    otherUserName: 'KofiBeats',
    otherUserImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    accessToken: 'mock_token',
    onBack: () => {},
  },
};

export const NoAccessToken: Story = {
  args: {
    conversationId: 'conv_3',
    otherUserName: 'Studio Master',
    otherUserImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    onBack: () => {},
  },
};
