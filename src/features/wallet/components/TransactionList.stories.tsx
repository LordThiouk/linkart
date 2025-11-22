import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { TransactionList } from './TransactionList';
import type { TransactionItemProps } from './TransactionItem';
import { colors } from '@/theme';

const transactions: TransactionItemProps[] = [
  {
    id: '1',
    type: 'income',
    title: 'Vente - Afrobeat Summer',
    amount: 24000,
    date: "Aujourd'hui",
    status: 'completed',
  },
  {
    id: '2',
    type: 'income',
    title: 'Vente - Lagos Nights (Premium)',
    amount: 49000,
    date: 'Hier',
    status: 'completed',
  },
  {
    id: '3',
    type: 'withdraw',
    title: 'Retrait vers compte bancaire',
    amount: -150000,
    date: 'Il y a 2 jours',
    status: 'pending',
  },
];

const meta: Meta<typeof TransactionList> = {
  title: 'Features/Wallet/TransactionList',
  component: TransactionList,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: colors.background, minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TransactionList>;

export const Default: Story = {
  args: {
    transactions,
    onSeeAll: () => console.log('See all pressed'),
  },
};

export const WithoutSeeAll: Story = {
  args: {
    transactions,
    showSeeAll: false,
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
    onSeeAll: () => console.log('See all pressed'),
  },
};
