import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseFilters } from './PurchaseFilters';

const meta: Meta<typeof PurchaseFilters> = {
  title: 'Features/Purchases/PurchaseFilters',
  component: PurchaseFilters,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onFilterChange: { action: 'onFilterChange' },
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseFilters>;

export const Default: Story = {
  args: {
    selectedFilter: 'all',
    // Actions handled by argTypes
  },
};

export const SelectedBeats: Story = {
  args: {
    selectedFilter: 'beats',
    // Actions handled by argTypes
  },
};

export const SelectedKits: Story = {
  args: {
    selectedFilter: 'kits',
    // Actions handled by argTypes
  },
};
