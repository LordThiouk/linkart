import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';
import { NotificationItem } from './NotificationItem';
import { spacing } from '@/theme';

const meta: Meta<typeof NotificationItem> = {
  title: 'Features/Notifications/NotificationItem',
  component: NotificationItem,
  args: {
    type: 'purchase',
    userName: 'Marcus Johnson',
    userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    message: 'a acheté votre beat "Midnight Vibes"',
    time: 'Il y a 5 min',
    read: false,
    amount: 29900,
  },
  parameters: {
    docs: {
      description: {
        component: 'Notification individuelle alignée sur le style Figma avec avatar, message et état lu/non lu.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Purchase: Story = {};

export const Like: Story = {
  args: {
    type: 'like',
    message: 'a aimé votre beat "Summer Dreams"',
    amount: undefined,
  },
};

export const Comment: Story = {
  args: {
    type: 'comment',
    message: 'a commenté: "Fire beat! 🔥"',
    beatTitle: 'Dark Energy',
    amount: undefined,
  },
};

export const Follow: Story = {
  args: {
    type: 'follow',
    message: 'a commencé à vous suivre',
    amount: undefined,
  },
};

export const System: Story = {
  args: {
    type: 'system',
    userName: undefined,
    userImage: undefined,
    message: 'Votre beat "Electric Wave" a atteint 1000 écoutes !',
    amount: undefined,
  },
};

const NotificationFeed = () => (
  <View style={{ gap: spacing.md }}>
    <NotificationItem
      type="purchase"
      userName="Chris Davis"
      userImage="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100"
      message='a acheté la licence "Exclusive"'
      time="Il y a 15 min"
      amount={49900}
    />
    <NotificationItem
      type="like"
      userName="Sarah Miller"
      userImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
      message='et 12 autres ont aimé "Urban Flow"'
      time="Il y a 30 min"
      read
    />
    <NotificationItem
      type="comment"
      userName="BeatMaker Pro"
      userImage="https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100"
      message='a commenté: "On collab ?"'
      time="Il y a 2 h"
      read
    />
  </View>
);

export const Feed: Story = {
  render: () => <NotificationFeed />,
  args: {},
};
