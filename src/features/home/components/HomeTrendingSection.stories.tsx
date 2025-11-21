import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeTrendingSection } from './HomeTrendingSection';
import type { HomeProduct } from '../types';

const products: HomeProduct[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `product-${index + 1}`,
  title: `Produit ${index + 1}`,
  artist: 'BeatMaker',
  coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
  price: 20000 + index * 2000,
  type: 'beat',
  bpm: 120 + index * 5,
  genre: 'Trap',
  likes: 500 + index * 100,
}));

const meta: Meta<typeof HomeTrendingSection> = {
  title: 'Features/Home/HomeTrendingSection',
  component: HomeTrendingSection,
};

export default meta;
type Story = StoryObj<typeof HomeTrendingSection>;

export const Default: Story = {
  args: {
    products,
    playingProductId: 'product-1',
    likedProductIds: new Set(['product-2']),
    onProductPress: () => {},
    onToggleFavorite: () => {},
    onTogglePlay: () => {},
  },
};
