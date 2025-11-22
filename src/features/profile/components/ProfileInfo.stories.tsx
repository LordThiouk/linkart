import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProfileInfo } from './ProfileInfo';
import { Award } from 'lucide-react-native';

const meta: Meta<typeof ProfileInfo> = {
  title: 'Features/Profile/ProfileInfo',
  component: ProfileInfo,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileInfo>;

export const Default: Story = {
  args: {
    avatarUrl: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200',
    name: 'DJ Producer Pro',
    handle: '@djproducer • Producteur & Beat Maker',
    bio: 'Producteur de beats Afrobeat, Amapiano & Trap 🎵',
    location: '📍 Lagos, Nigeria',
    stats: {
      followers: 892,
      following: 234,
    },
    badgeIcon: Award,
    onEdit: () => console.log('Edit pressed'),
  },
};

export const WithoutBadge: Story = {
  args: {
    avatarUrl: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200',
    name: 'DJ Producer Pro',
    handle: '@djproducer • Producteur & Beat Maker',
    bio: 'Producteur de beats Afrobeat, Amapiano & Trap 🎵',
    location: '📍 Lagos, Nigeria',
    stats: {
      followers: 892,
      following: 234,
    },
    onEdit: () => console.log('Edit pressed'),
  },
};

export const WithoutEdit: Story = {
  args: {
    avatarUrl: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200',
    name: 'DJ Producer Pro',
    handle: '@djproducer • Producteur & Beat Maker',
    bio: 'Producteur de beats Afrobeat, Amapiano & Trap 🎵',
    stats: {
      followers: 892,
      following: 234,
    },
  },
};
