import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PaymentSuccessScreenFigma } from './PaymentSuccessScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PaymentSuccessScreenFigma> = {
  title: 'Features/Payments/PaymentSuccessScreenFigma',
  component: PaymentSuccessScreenFigma,
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
type Story = StoryObj<typeof PaymentSuccessScreenFigma>;

export const Default: Story = {
  args: {
    transactionId: 'tx_1234567890_abc123',
    productTitle: 'Midnight Vibes',
    licenseType: 'Premium License',
    amount: 47250,
    onGoHome: () => console.log('Go home'),
    onViewPurchases: () => console.log('View purchases'),
    onDownload: () => console.log('Download'),
  },
};
