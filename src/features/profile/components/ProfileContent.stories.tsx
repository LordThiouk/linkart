import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProfileContent } from './ProfileContent';

const products = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat' as const,
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
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat' as const,
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
];

const stats = [
  { label: 'Revenus', value: '342 500 F', change: '+12%', positive: true },
  { label: 'Vues', value: '3.2K', change: '+24%', positive: true },
  { label: 'Ventes', value: '12', change: '+8', positive: true },
  { label: 'Taux de conversion', value: '3.7%', change: '-0.3%', positive: false },
];

const meta: Meta<typeof ProfileContent> = {
  title: 'Features/Profile/ProfileContent',
  component: ProfileContent,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 600 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileContent>;

export const BeatsTab: Story = {
  args: {
    activeTab: 'beats',
    products,
    onProductPress: id => console.log('Product pressed:', id),
  },
};

export const ServicesTab: Story = {
  args: {
    activeTab: 'services',
    onCreateService: () => console.log('Create service pressed'),
  },
};

export const StatsTab: Story = {
  args: {
    activeTab: 'stats',
    stats,
  },
};

export const EmptyBeats: Story = {
  args: {
    activeTab: 'beats',
    products: [],
  },
};
