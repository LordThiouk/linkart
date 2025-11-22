import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseStats } from './PurchaseStats';

const meta: Meta<typeof PurchaseStats> = {
  title: 'Features/Purchases/PurchaseStats',
  component: PurchaseStats,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseStats>;

export const Default: Story = {
  args: {
    stats: [
      { label: 'Total dépensé', value: '363,000 F', icon: '💰' },
      { label: 'Achats', value: '3', icon: '📦' },
      { label: 'Téléchargés', value: '2', icon: '⬇️' },
    ],
  },
};
