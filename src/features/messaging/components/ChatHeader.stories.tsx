import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ChatHeader } from './ChatHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ChatHeader> = {
  title: 'Features/Messaging/ChatHeader',
  component: ChatHeader,
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
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {
  args: {
    otherUserName: 'Audio Engineer Pro',
    otherUserImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    subtitle: 'Service - Chat privé',
    onBack: () => {},
  },
};

export const NoImage: Story = {
  args: {
    otherUserName: 'KofiBeats',
    subtitle: 'Service - Chat privé',
    onBack: () => {},
  },
};

export const NoBackButton: Story = {
  args: {
    otherUserName: 'Studio Master',
    otherUserImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    subtitle: 'Service - Chat privé',
  },
};
