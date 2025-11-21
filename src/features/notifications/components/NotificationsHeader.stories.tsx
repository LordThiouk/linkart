import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { NotificationsHeader } from './NotificationsHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof NotificationsHeader> = {
  title: 'Features/Notifications/NotificationsHeader',
  component: NotificationsHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onFilterChange: { action: 'onFilterChange' },
    onMarkAllAsRead: { action: 'onMarkAllAsRead' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof NotificationsHeader>;

export const Default: Story = {
  args: {
    unreadCount: 5,
    filter: 'all',
    onBack: () => {},
    onFilterChange: () => {},
    onMarkAllAsRead: () => {},
  },
};

export const NoUnread: Story = {
  args: {
    unreadCount: 0,
    filter: 'all',
    onBack: () => {},
    onFilterChange: () => {},
    onMarkAllAsRead: () => {},
  },
};

export const ManyUnread: Story = {
  args: {
    unreadCount: 42,
    filter: 'unread',
    onBack: () => {},
    onFilterChange: () => {},
    onMarkAllAsRead: () => {},
  },
};

export const NoBackButton: Story = {
  args: {
    unreadCount: 3,
    filter: 'all',
    onFilterChange: () => {},
    onMarkAllAsRead: () => {},
  },
};
