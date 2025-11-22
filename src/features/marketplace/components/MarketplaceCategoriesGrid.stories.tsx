import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceCategoriesGrid, type MarketplaceCategoryItem } from './MarketplaceCategoriesGrid';
import { Mic, Headphones, Radio, Music } from 'lucide-react-native';
import { colors } from '@/theme';

const sampleCategories: MarketplaceCategoryItem[] = [
  {
    id: 'recording',
    label: 'Recording',
    icon: Mic,
    colors: [colors.accent, colors.secondary],
  },
  {
    id: 'mixing',
    label: 'Mixing',
    icon: Headphones,
    colors: [colors.cyan, colors.primary],
  },
  {
    id: 'mastering',
    label: 'Mastering',
    icon: Radio,
    colors: [colors.primaryDark, colors.accent],
  },
  {
    id: 'production',
    label: 'Production',
    icon: Music,
    colors: [colors.secondary, colors.cyan],
  },
];

const meta: Meta<typeof MarketplaceCategoriesGrid> = {
  title: 'Features/Marketplace/MarketplaceCategoriesGrid',
  component: MarketplaceCategoriesGrid,
};

export default meta;
type Story = StoryObj<typeof MarketplaceCategoriesGrid>;

export const Default: Story = {
  args: {
    title: 'Catégories',
    categories: sampleCategories,
    onCategoryPress: id => console.log('Category pressed:', id),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Services disponibles',
    categories: sampleCategories,
    onCategoryPress: id => console.log('Category pressed:', id),
  },
};

export const TwoCategories: Story = {
  args: {
    title: 'Top Catégories',
    categories: sampleCategories.slice(0, 2),
    onCategoryPress: id => console.log('Category pressed:', id),
  },
};
