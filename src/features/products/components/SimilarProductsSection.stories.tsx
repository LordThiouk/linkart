import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { SimilarProductsSection } from './SimilarProductsSection';

import type { SimilarProduct } from './SimilarProductsSection';

const similarProducts: SimilarProduct[] = [
  {
    id: '2',
    title: 'Dark Energy',
    artist: 'BeatMaker',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24000,
    type: 'beat',
    bpm: 138,
    genre: 'Trap',
    likes: 892,
    downloads: 456,
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: '3',
    title: 'Night Drive',
    artist: 'SoundWave',
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 27000,
    type: 'beat',
    bpm: 142,
    genre: 'Trap',
    likes: 654,
    downloads: 321,
    rating: 4.5,
    reviewCount: 28,
  },
];

const meta: Meta<typeof SimilarProductsSection> = {
  title: 'Features/Products/SimilarProductsSection',
  component: SimilarProductsSection,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 600 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SimilarProductsSection>;

export const Default: Story = {
  args: {
    products: similarProducts,
    likedProductIds: new Set(['2']),
    onProductPress: id => console.log('Product pressed:', id),
    onTogglePlay: id => console.log('Toggle play:', id),
    onToggleFavorite: id => console.log('Toggle favorite:', id),
  },
};

export const Empty: Story = {
  args: {
    products: [],
    likedProductIds: new Set(),
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Vous pourriez aussi aimer',
    products: similarProducts,
    likedProductIds: new Set(),
    onProductPress: id => console.log('Product pressed:', id),
  },
};
