import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MultiTierCard } from './MultiTierCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof MultiTierCard> = {
  title: 'Features/Uploads/MultiTierCard',
  component: MultiTierCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MultiTierCard>;

export const BasicTier: Story = {
  args: {
    tier: {
      name: 'Basic',
      price: '15000',
      features: 'Mixage de 1 track, 2 révisions',
      deliveryDays: '3 jours',
    },
    index: 0,
    onPriceChange: () => {},
    onFeaturesChange: () => {},
    onDeliveryDaysChange: () => {},
  },
};

export const StandardTier: Story = {
  args: {
    tier: {
      name: 'Standard',
      price: '35000',
      features: 'Mixage de 2 tracks, 3 révisions, mastering basique',
      deliveryDays: '5 jours',
    },
    index: 1,
    onPriceChange: () => {},
    onFeaturesChange: () => {},
    onDeliveryDaysChange: () => {},
  },
};
