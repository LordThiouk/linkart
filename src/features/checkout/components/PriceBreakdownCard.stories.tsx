import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PriceBreakdownCard } from './PriceBreakdownCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PriceBreakdownCard> = {
  title: 'Features/Checkout/PriceBreakdownCard',
  component: PriceBreakdownCard,
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
type Story = StoryObj<typeof PriceBreakdownCard>;

export const Default: Story = {
  args: {
    basePrice: 45000,
    discount: 0,
    total: 45000,
    showCommissionInfo: true,
  },
};

export const WithDiscount: Story = {
  args: {
    basePrice: 45000,
    discount: 4500,
    total: 40500,
    showCommissionInfo: true,
  },
};

export const NoCommissionInfo: Story = {
  args: {
    basePrice: 25000,
    discount: 0,
    total: 25000,
    showCommissionInfo: false,
  },
};
