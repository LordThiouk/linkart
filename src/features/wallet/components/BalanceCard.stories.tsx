import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { BalanceCard } from './BalanceCard';
import { colors } from '@/theme';

const meta: Meta<typeof BalanceCard> = {
  title: 'Features/Wallet/BalanceCard',
  component: BalanceCard,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: {
    balance: 1247480,
    showBalance: true,
    onToggleBalance: () => console.log('Toggle balance'),
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
  },
};

export const BalanceHidden: Story = {
  args: {
    balance: 1247480,
    showBalance: false,
    onToggleBalance: () => console.log('Toggle balance'),
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
  },
};

export const LargeBalance: Story = {
  args: {
    balance: 5000000,
    showBalance: true,
    onToggleBalance: () => console.log('Toggle balance'),
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
  },
};
