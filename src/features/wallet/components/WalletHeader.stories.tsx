import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { WalletHeader } from './WalletHeader';
import { colors } from '@/theme';

const meta: Meta<typeof WalletHeader> = {
  title: 'Features/Wallet/WalletHeader',
  component: WalletHeader,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WalletHeader>;

export const Default: Story = {
  args: {
    title: 'Wallet',
    subtitle: 'Gérez vos revenus',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Mon Portefeuille',
    subtitle: 'Suivez vos transactions',
  },
};
