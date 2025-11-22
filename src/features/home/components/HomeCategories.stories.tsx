import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeCategories } from './HomeCategories';
import { Sparkles, Music2, Package, Zap, TrendingUp } from 'lucide-react-native';
import type { HomeCategory } from '../types';

const categories: HomeCategory[] = [
  { id: 'all', label: 'Tout', icon: Sparkles },
  { id: 'beats', label: 'Beats', icon: Music2 },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
  { id: 'trending', label: 'Tendances', icon: TrendingUp },
];

const meta: Meta<typeof HomeCategories> = {
  title: 'Features/Home/HomeCategories',
  component: HomeCategories,
};

export default meta;
type Story = StoryObj<typeof HomeCategories>;

export const Default: Story = {
  args: {
    categories,
    selectedCategory: 'all',
    onSelect: () => {},
  },
};
