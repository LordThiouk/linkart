import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { NotificationTabs, NotificationFilter } from './NotificationTabs';

const meta: Meta<typeof NotificationTabs> = {
  title: 'Features/Notifications/NotificationTabs',
  component: NotificationTabs,
  args: {
    filter: 'all',
    unreadCount: 3,
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationTabs>;

export const Default: Story = {};

const InteractiveWrapper = () => {
  const [filter, setFilter] = useState<NotificationFilter>('all');
  return <NotificationTabs filter={filter} unreadCount={4} onChange={setFilter} />;
};

export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
  args: {
    onChange: undefined,
  },
};
