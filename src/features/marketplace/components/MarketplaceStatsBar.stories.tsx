import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceStatsBar } from './MarketplaceStatsBar';

const meta: Meta<typeof MarketplaceStatsBar> = {
  title: 'Features/Marketplace/MarketplaceStatsBar',
  component: MarketplaceStatsBar,
};

export default meta;
type Story = StoryObj<typeof MarketplaceStatsBar>;

export const Default: Story = {
  args: {
    count: 24,
    onSort: () => {},
  },
};

export const SingleItem: Story = {
  args: {
    count: 1,
    onSort: () => {},
  },
};

export const CustomLabel: Story = {
  args: {
    count: 12,
    label: 'service',
    sortLabel: 'Trier par note',
    onSort: () => {},
  },
};

export const WithoutSort: Story = {
  args: {
    count: 5,
    label: 'résultat',
  },
};
