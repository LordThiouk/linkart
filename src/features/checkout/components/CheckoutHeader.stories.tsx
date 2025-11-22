import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CheckoutHeader } from './CheckoutHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof CheckoutHeader> = {
  title: 'Features/Checkout/CheckoutHeader',
  component: CheckoutHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutHeader>;

export const Default: Story = {
  args: {
    onBack: () => {},
  },
};
