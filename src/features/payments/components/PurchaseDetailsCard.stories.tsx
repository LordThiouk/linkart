import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseDetailsCard } from './PurchaseDetailsCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PurchaseDetailsCard> = {
  title: 'Features/Payments/PurchaseDetailsCard',
  component: PurchaseDetailsCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PurchaseDetailsCard>;

export const Default: Story = {
  args: {
    productTitle: 'Midnight Vibes',
    licenseType: 'Premium License',
    amount: 47250,
    transactionId: 'tx_1234567890_abcdef',
  },
};

export const BasicLicense: Story = {
  args: {
    productTitle: 'Summer Beat',
    licenseType: 'Basic License',
    amount: 15000,
    transactionId: 'tx_9876543210_xyz',
  },
};

export const CustomCurrency: Story = {
  args: {
    productTitle: 'Trap Anthem',
    licenseType: 'Exclusive License',
    amount: 150000,
    transactionId: 'tx_5555555555_abc123',
    currency: 'XOF',
  },
};
