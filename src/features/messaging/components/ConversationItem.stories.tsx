import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ConversationItem } from './ConversationItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ConversationItem> = {
  title: 'Features/Messaging/ConversationItem',
  component: ConversationItem,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ConversationItem>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Audio Engineer Pro',
    image: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    lastMessage: 'Parfait, je commence le mixage demain !',
    time: 'Il y a 10 min',
    unread: 2,
    online: true,
    onPress: () => {},
  },
};

export const NoUnread: Story = {
  args: {
    id: '2',
    name: 'KofiBeats',
    image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    lastMessage: 'Merci pour le beat 🔥',
    time: 'Il y a 2h',
    unread: 0,
    online: false,
    onPress: () => {},
  },
};

export const Offline: Story = {
  args: {
    id: '3',
    name: 'Studio Master',
    image: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    lastMessage: 'Quand peux-tu passer au studio ?',
    time: 'Hier',
    unread: 1,
    online: false,
    onPress: () => {},
  },
};
