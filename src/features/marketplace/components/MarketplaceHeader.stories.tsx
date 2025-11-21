import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceHeader } from './MarketplaceHeader';

const meta: Meta<typeof MarketplaceHeader> = {
  title: 'Features/Marketplace/MarketplaceHeader',
  component: MarketplaceHeader,
};

export default meta;
type Story = StoryObj<typeof MarketplaceHeader>;

export const Default: Story = {
  args: {
    title: 'Marketplace',
    subtitle: 'Beats, kits & samples',
    showFilters: false,
    onSearch: () => {},
    onToggleFilters: () => {},
  },
};

export const WithFiltersActive: Story = {
  args: {
    title: 'Marketplace',
    subtitle: 'Services professionnels',
    showFilters: true,
    onSearch: () => {},
    onToggleFilters: () => {},
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'Marketplace',
    subtitle: 'Découvrez notre catalogue',
  },
};
