import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { AdminDashboard } from './AdminDashboard';
import { AdminDashboard as AdminDashboardType } from '../hooks/useAdmin';

const meta: Meta<typeof AdminDashboard> = {
  title: 'Features/Admin/AdminDashboard',
  component: AdminDashboard,
  decorators: [
    Story => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    dashboard: { control: 'object' },
    loading: { control: 'boolean' },
    onProductPress: { action: 'products pressed' },
    onTransactionPress: { action: 'transactions pressed' },
    onWithdrawalPress: { action: 'withdrawals pressed' },
    onRatingPress: { action: 'ratings pressed' },
  },
};

export default meta;

type Story = StoryObj<typeof AdminDashboard>;

const mockDashboard: AdminDashboardType = {
  stats: {
    totalUsers: 120,
    totalProducts: 250,
    totalTransactions: 500,
    totalRevenue: 150000,
    pendingProducts: 5,
    pendingWithdrawals: 2,
    flaggedRatings: 1,
  },
  recentProducts: [
    {
      id: '1',
      title: 'Beat 1',
      type: 'beat',
      created_at: new Date().toISOString(),
      status: 'pending',
      price: 10000,
      license: 'Standard',
      file_key: null,
      preview_key: null,
      metadata: { genre: 'Trap' },
      updated_at: null,
      deleted_at: null,
      user_id: 'user1',
    },
  ],
  pendingWithdrawals: [
    {
      id: '1',
      amount: 25000,
      provider_ref: 'Wave_771234567',
      created_at: new Date().toISOString(),
      status: 'pending',
      updated_at: new Date().toISOString(),
      user_id: 'user1',
    },
  ],
  flaggedRatings: [
    {
      id: 1,
      score: 1,
      comment: 'Abusif',
      created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(), // Not in type definition
      status: 'flagged',
      target_id: 'prod1',
      target_type: 'beat',
      tx_id: 'tx1',
      user_id: 'user1',
    },
  ],
  recentTransactions: [
    {
      id: '1',
      gross_amount: 10000,
      type: 'boost',
      net_amount: 8000,
      commission_amount: 2000,
      contract_url: 'https://example.com/contract.pdf',
      product_id: 'prod1',
      seller_id: 'user1',
      buyer_id: 'user2',
      provider_payload: { provider: 'Wave', ref: '771234567' },
      created_at: new Date().toISOString(),
      status: 'pending',
      updated_at: new Date().toISOString(),
    },
  ],
};

export const Default: Story = {
  args: {
    dashboard: mockDashboard,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    dashboard: {
      stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalTransactions: 0,
        totalRevenue: 0,
        pendingProducts: 0,
        pendingWithdrawals: 0,
        flaggedRatings: 0,
      },
      recentProducts: [],
      pendingWithdrawals: [],
      flaggedRatings: [],
      recentTransactions: [],
    },
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    dashboard: {
      stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalTransactions: 0,
        totalRevenue: 0,
        pendingProducts: 0,
        pendingWithdrawals: 0,
        flaggedRatings: 0,
      },
      recentProducts: [],
      pendingWithdrawals: [],
      flaggedRatings: [],
      recentTransactions: [],
    },
    loading: false,
  },
};
