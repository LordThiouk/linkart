import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeFeaturedSection } from './HomeFeaturedSection';
import type { HomeProduct } from '../types';

const products: HomeProduct[] = [
  {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29000,
    type: 'beat',
    bpm: 140,
    genre: 'Trap',
    likes: 1243,
    downloads: 847,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: '2',
    title: 'Afro Percussion Kit',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 15000,
    type: 'kit',
    genre: 'Afrobeat',
    likes: 654,
    rating: 4.7,
    reviewCount: 56,
  },
];

const meta: Meta<typeof HomeFeaturedSection> = {
  title: 'Features/Home/HomeFeaturedSection',
  component: HomeFeaturedSection,
};

export default meta;
type Story = StoryObj<typeof HomeFeaturedSection>;

export const Default: Story = {
  args: {
    products,
    playingProductId: '1',
    likedProductIds: new Set(['1']),
    onProductPress: () => {},
    onToggleFavorite: () => {},
    onTogglePlay: () => {},
  },
};
