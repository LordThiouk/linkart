import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServicePlaylistCard } from './ServicePlaylistCard';
import { mockServices } from '../mockData';

const meta: Meta<typeof ServicePlaylistCard> = {
  title: 'features/featured-services/ServicePlaylistCard',
  component: ServicePlaylistCard,
};

export default meta;
type Story = StoryObj<typeof ServicePlaylistCard>;

export const BoostedTop: Story = {
  args: {
    service: mockServices[0], // Audio Engineer Pro - Mixing (boosted + top)
    onPress: () => console.log('Card pressed'),
  },
};

export const TopOnly: Story = {
  args: {
    service: mockServices[2], // Mastering Studio (top only)
    onPress: () => console.log('Card pressed'),
  },
};

export const BoostedOnly: Story = {
  args: {
    service: mockServices[3], // Sound Lab Pro - Mastering (boosted only)
    onPress: () => console.log('Card pressed'),
  },
};

export const Recording: Story = {
  args: {
    service: mockServices[4], // Premium Sound Studio - Recording
    onPress: () => console.log('Card pressed'),
  },
};
