import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileScreenFigma } from './ProfileScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ProfileScreenFigma> = {
  title: 'Features/Profile/ProfileScreenFigma',
  component: ProfileScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileScreenFigma>;

export const Default: Story = {
  args: {
    onMyPurchases: () => console.log('My purchases pressed'),
    onBoost: () => console.log('Boost pressed'),
    onFavorites: () => console.log('Favorites pressed'),
    onBookings: () => console.log('Bookings pressed'),
    onShare: () => console.log('Share pressed'),
    onSettings: () => console.log('Settings pressed'),
    onEdit: () => console.log('Edit pressed'),
    onCreateService: () => console.log('Create service pressed'),
    onProductPress: id => console.log('Product pressed:', id),
  },
};
