import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WalletScreenFigma } from './WalletScreenFigma';

const meta: Meta<typeof WalletScreenFigma> = {
  title: 'Features/Wallet/WalletScreenFigma',
  component: WalletScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WalletScreenFigma>;

export const Default: Story = {
  args: {
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
    onSeeAllTransactions: () => console.log('See all transactions pressed'),
  },
};

export const WithBalanceHidden: Story = {
  args: {
    showBalance: false,
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
    onSeeAllTransactions: () => console.log('See all transactions pressed'),
  },
};

export const WithCustomData: Story = {
  args: {
    balance: 2500000,
    stats: [
      { label: 'Ce mois', value: '500 000 F', change: '+25%' },
      { label: 'Ventes totales', value: '75', change: '+15' },
      { label: 'En attente', value: '200 000 F', change: '2' },
    ],
    transactions: [
      {
        id: '1',
        type: 'income',
        title: 'Vente - Custom Beat',
        amount: 50000,
        date: "Aujourd'hui",
        status: 'completed',
      },
    ],
    onWithdraw: () => console.log('Withdraw pressed'),
    onCardAction: () => console.log('Card action pressed'),
    onSeeAllTransactions: () => console.log('See all transactions pressed'),
  },
};
