import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { MarketplaceProductsGrid, type MarketplaceProduct } from './MarketplaceProductsGrid';

const sampleProducts: MarketplaceProduct[] = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'KofiBeats',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat',
    bpm: 112,
    genre: 'Afrobeat',
    likes: 892,
    downloads: 456,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: '2',
    title: 'Lagos Nights',
    artist: 'NaijaVibes',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat',
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
  {
    id: '3',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit',
    genre: 'Amapiano',
    likes: 2104,
    rating: 4.8,
    reviewCount: 89,
  },
];

const meta: Meta<typeof MarketplaceProductsGrid> = {
  title: 'Features/Marketplace/MarketplaceProductsGrid',
  component: MarketplaceProductsGrid,
};

export default meta;
type Story = StoryObj<typeof MarketplaceProductsGrid>;

const InteractiveWrapper = ({ products = sampleProducts }: { products?: MarketplaceProduct[] }) => {
  const [playingProductId, setPlayingProductId] = useState<string | null>(null);
  const [likedProductIds, setLikedProductIds] = useState<Set<string>>(new Set());

  const handleTogglePlay = (productId: string) => {
    setPlayingProductId(current => (current === productId ? null : productId));
  };

  const handleToggleFavorite = (productId: string) => {
    setLikedProductIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <MarketplaceProductsGrid
      products={products}
      playingProductId={playingProductId}
      likedProductIds={likedProductIds}
      onProductPress={id => console.log('Product pressed:', id)}
      onTogglePlay={handleTogglePlay}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export const Default: Story = {
  render: () => <InteractiveWrapper />,
};

export const Empty: Story = {
  render: () => <InteractiveWrapper products={[]} />,
};

export const SingleProduct: Story = {
  render: () => <InteractiveWrapper products={[sampleProducts[0]]} />,
};
