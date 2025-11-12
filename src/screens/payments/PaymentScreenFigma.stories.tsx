import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PaymentScreenFigma } from './PaymentScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PaymentScreenFigma> = {
  title: 'Screens/Payments/PaymentScreenFigma',
  component: PaymentScreenFigma,
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
type Story = StoryObj<typeof PaymentScreenFigma>;

export const Default: Story = {
  args: {
    checkoutData: {
      productId: 'p1',
      licenseType: 'Premium License',
      basePrice: 45000,
      commission: 2250,
      total: 47250,
    },
    productTitle: 'Midnight Vibes',
    accessToken: 'mock_token',
    onBack: () => console.log('Back pressed'),
    onPaymentSuccess: (transactionId: string) => console.log('Payment success:', transactionId),
  },
};
