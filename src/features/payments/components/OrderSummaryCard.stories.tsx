import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OrderSummaryCard } from './OrderSummaryCard';

const meta: Meta<typeof OrderSummaryCard> = {
  title: 'Features/Payments/OrderSummaryCard',
  component: OrderSummaryCard,
  args: {
    productTitle: 'Midnight Vibes',
    licenseLabel: 'Licence Exclusive',
    basePrice: 50000,
    commission: 2500,
    total: 52500,
    currency: 'F',
  },
};

export default meta;

type Story = StoryObj<typeof OrderSummaryCard>;

export const Default: Story = {};

export const WithoutBreakdown: Story = {
  args: {
    basePrice: undefined,
    commission: undefined,
  },
};

export const DollarCurrency: Story = {
  args: {
    currency: 'USD',
    total: 99,
    basePrice: 95,
    commission: 4,
  },
};
