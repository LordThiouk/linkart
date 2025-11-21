import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { WalletStatsGrid } from './WalletStatsGrid';
import { colors } from '@/theme';

const stats = [
  { label: 'Ce mois', value: '342 500 F', change: '+12%' },
  { label: 'Ventes totales', value: '47', change: '+8' },
  { label: 'En attente', value: '150 000 F', change: '1' },
];

const meta: Meta<typeof WalletStatsGrid> = {
  title: 'Features/Wallet/WalletStatsGrid',
  component: WalletStatsGrid,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WalletStatsGrid>;

export const Default: Story = {
  args: {
    stats,
  },
};

export const TwoStats: Story = {
  args: {
    stats: stats.slice(0, 2),
    numColumns: 2,
  },
};

export const ThreeColumns: Story = {
  args: {
    stats,
    numColumns: 3,
  },
};
