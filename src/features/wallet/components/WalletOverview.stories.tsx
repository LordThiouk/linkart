import type { Meta, StoryObj } from '@storybook/react-vite';
import { WalletOverview } from './WalletOverview';

const meta: Meta<typeof WalletOverview> = {
  title: 'Features/Wallet/WalletOverview',
  component: WalletOverview,
  parameters: {
    docs: {
      description: {
        component: "Vue d'ensemble du portefeuille avec statistiques et actions.",
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    onWithdrawPress: {
      action: 'onWithdrawPress',
    },
    onTransactionPress: {
      action: 'onTransactionPress',
    },
  },
};

export default meta;

type Story = StoryObj<typeof WalletOverview>;

const mockWalletData = {
  balance: 125000,
  pendingWithdrawals: 25000,
  totalEarnings: 500000,
  totalSpent: 75000,
  transactions: [
    {
      id: '1',
      buyer_id: 'buyer1',
      commission_amount: 750,
      contract_url: 'https://example.com/contract1.pdf',
      created_at: '2024-01-15T10:30:00Z',
      gross_amount: 15000,
      net_amount: 14250,
      product_id: 'prod1',
      provider_payload: { provider: 'Wave', ref: '123' },
      seller_id: 'seller1',
      type: 'sale',
      status: 'released',
      updated_at: '2024-01-15T10:30:00Z',
      user_id: 'user1',
    },
    {
      id: '2',
      buyer_id: 'buyer2',
      commission_amount: 1250,
      contract_url: 'https://example.com/contract2.pdf',
      created_at: '2024-01-14T15:45:00Z',
      gross_amount: 25000,
      net_amount: 23750,
      product_id: 'prod2',
      provider_payload: { provider: 'Wave', ref: '456' },
      seller_id: 'seller2',
      type: 'sale',
      status: 'released',
      updated_at: '2024-01-14T15:45:00Z',
    },
  ],
  platformEarnings: [
    {
      id: '1',
      amount: 50000,
      status: 'pending',
      method: 'wave',
      created_at: '2024-01-16T09:00:00Z',
    },
  ],
};

export const Default: Story = {
  args: {
    walletData: {
      ...mockWalletData,
      withdrawals: [],
      platformEarnings: [],
    },
    loading: false,
    onWithdrawPress: () => console.log('Withdraw pressed'),
    onTransactionPress: () => console.log('Transactions pressed'),
  },
};

export const Loading: Story = {
  args: {
    walletData: undefined,
    loading: true,
    onWithdrawPress: () => console.log('Withdraw pressed'),
    onTransactionPress: () => console.log('Transactions pressed'),
  },
};

export const EmptyWallet: Story = {
  args: {
    walletData: {
      balance: 0,
      pendingWithdrawals: 0,
      totalEarnings: 0,
      totalSpent: 0,
      transactions: [],
      withdrawals: [],
      platformEarnings: [],
    },
    loading: false,
    onWithdrawPress: () => console.log('Withdraw pressed'),
    onTransactionPress: () => console.log('Transactions pressed'),
  },
};

export const HighBalance: Story = {
  args: {
    walletData: {
      ...mockWalletData,
      balance: 500000,
      totalEarnings: 1000000,
      withdrawals: [],
      platformEarnings: [],
    },
    loading: false,
    onWithdrawPress: () => console.log('Withdraw pressed'),
    onTransactionPress: () => console.log('Transactions pressed'),
  },
};
