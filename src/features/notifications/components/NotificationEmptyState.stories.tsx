import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { NotificationEmptyState } from './NotificationEmptyState';

const meta: Meta<typeof NotificationEmptyState> = {
  title: 'Features/Notifications/NotificationEmptyState',
  component: NotificationEmptyState,
  args: {
    filter: 'all',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationEmptyState>;

export const Default: Story = {};

export const UnreadEmpty: Story = {
  args: {
    filter: 'unread',
  },
};
