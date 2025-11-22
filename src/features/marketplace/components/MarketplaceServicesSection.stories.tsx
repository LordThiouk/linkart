import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MarketplaceServicesSection, type MarketplaceService } from './MarketplaceServicesSection';

const sampleServices: MarketplaceService[] = [
  {
    id: '1',
    title: 'Professional Mixing & Mastering',
    provider: 'Audio Engineer Pro',
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=400',
    price: 49000,
    rating: 4.9,
    reviewCount: 127,
    deliveryTime: '3 jours',
    category: 'Mixing',
    isPro: true,
  },
  {
    id: '2',
    title: 'Vocal Recording & Production',
    provider: 'Studio Master',
    providerImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    price: 39000,
    rating: 4.8,
    reviewCount: 89,
    deliveryTime: '2 jours',
    category: 'Recording',
    isPro: true,
  },
];

const meta: Meta<typeof MarketplaceServicesSection> = {
  title: 'Features/Marketplace/MarketplaceServicesSection',
  component: MarketplaceServicesSection,
};

export default meta;
type Story = StoryObj<typeof MarketplaceServicesSection>;

export const Default: Story = {
  args: {
    title: 'Services populaires',
    services: sampleServices,
    onServicePress: id => console.log('Service pressed:', id),
  },
};

export const SingleService: Story = {
  args: {
    title: 'Services recommandés',
    services: [sampleServices[0]],
    onServicePress: id => console.log('Service pressed:', id),
  },
};

export const EmptyServices: Story = {
  args: {
    title: 'Services disponibles',
    services: [],
    onServicePress: id => console.log('Service pressed:', id),
  },
};
