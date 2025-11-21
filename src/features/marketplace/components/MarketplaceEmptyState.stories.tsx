import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceEmptyState } from './MarketplaceEmptyState';
import { Package, Headphones } from 'lucide-react-native';

const meta: Meta<typeof MarketplaceEmptyState> = {
  title: 'Features/Marketplace/MarketplaceEmptyState',
  component: MarketplaceEmptyState,
};

export default meta;
type Story = StoryObj<typeof MarketplaceEmptyState>;

export const Default: Story = {
  args: {
    title: 'Aucun produit trouvé',
    subtitle: 'Essayez de modifier vos filtres',
  },
};

export const ServicesEmpty: Story = {
  args: {
    title: 'Aucun service trouvé',
    subtitle: 'Essayez de modifier vos critères de recherche',
    icon: Headphones,
  },
};

export const KitsEmpty: Story = {
  args: {
    title: 'Aucun kit trouvé',
    subtitle: "Explorez d'autres catégories",
    icon: Package,
  },
};
