import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  decorators: [
    Story => (
      <View style={{ width: '100%', height: 100 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
    },
    showBackButton: {
      control: 'boolean',
    },
    userName: {
      control: 'text',
    },
    userAvatar: {
      control: 'text',
    },
    onBackPress: { action: 'back pressed' },
    onProfilePress: { action: 'profile pressed' },
    onNotificationPress: { action: 'notifications pressed' },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

const mockUser = {
  name: 'John Doe',
  avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const Default: Story = {
  args: {
    title: 'Accueil',
  },
};

export const WithBackAndUser: Story = {
  args: {
    title: 'Profil',
    showBackButton: true,
    userName: mockUser.name,
    userAvatar: mockUser.avatar_url,
  },
};

export const LoggedOut: Story = {
  args: {
    title: 'Découvrir',
    showBackButton: false,
    userName: undefined,
    userAvatar: undefined,
  },
};
