import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { MarketplaceCategoryPills } from './MarketplaceCategoryPills';
import { Music, Radio, Package, Zap } from 'lucide-react-native';

const categories = [
  { id: 'all', label: 'Tout', icon: Music },
  { id: 'beats', label: 'Beats', icon: Radio },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
];

const meta: Meta<typeof MarketplaceCategoryPills> = {
  title: 'Features/Marketplace/MarketplaceCategoryPills',
  component: MarketplaceCategoryPills,
};

export default meta;
type Story = StoryObj<typeof MarketplaceCategoryPills>;

const InteractiveWrapper = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <MarketplaceCategoryPills
      categories={categories}
      selectedCategory={selectedCategory}
      onSelect={setSelectedCategory}
    />
  );
};

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};
