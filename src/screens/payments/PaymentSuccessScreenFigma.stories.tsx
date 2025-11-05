import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PaymentSuccessScreenFigma } from './PaymentSuccessScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof PaymentSuccessScreenFigma> = {
  title: 'Screens/Payments/PaymentSuccessScreenFigma',
  component: PaymentSuccessScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
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
