import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProfileHeader } from './ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Features/Profile/ProfileHeader',
  component: ProfileHeader,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {
  args: {
    onShare: () => console.log('Share pressed'),
    onSettings: () => console.log('Settings pressed'),
  },
};

export const ShareOnly: Story = {
  args: {
    onShare: () => console.log('Share pressed'),
  },
};

export const SettingsOnly: Story = {
  args: {
    onSettings: () => console.log('Settings pressed'),
  },
};
