import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CheckoutInfoBanner } from './CheckoutInfoBanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof CheckoutInfoBanner> = {
  title: 'Features/Checkout/CheckoutInfoBanner',
  component: CheckoutInfoBanner,
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
type Story = StoryObj<typeof CheckoutInfoBanner>;

export const Default: Story = {};
