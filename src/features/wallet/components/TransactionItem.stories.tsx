import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { TransactionItem } from './TransactionItem';
import { colors } from '@/theme';

const meta: Meta<typeof TransactionItem> = {
  title: 'Features/Wallet/TransactionItem',
  component: TransactionItem,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TransactionItem>;

export const IncomeCompleted: Story = {
  args: {
    id: '1',
    type: 'income',
    title: 'Vente - Afrobeat Summer',
    amount: 24000,
    date: "Aujourd'hui",
    status: 'completed',
  },
};

export const IncomePending: Story = {
  args: {
    id: '2',
    type: 'income',
    title: 'Vente - Lagos Nights',
    amount: 49000,
    date: 'Hier',
    status: 'pending',
  },
};

export const WithdrawCompleted: Story = {
  args: {
    id: '3',
    type: 'withdraw',
    title: 'Retrait vers compte bancaire',
    amount: -150000,
    date: 'Il y a 2 jours',
    status: 'completed',
  },
};

export const WithdrawPending: Story = {
  args: {
    id: '4',
    type: 'withdraw',
    title: 'Retrait en attente',
    amount: -50000,
    date: 'Il y a 3 jours',
    status: 'pending',
  },
};
