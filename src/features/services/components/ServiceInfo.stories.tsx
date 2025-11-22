import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceInfo } from './ServiceInfo';

const meta: Meta<typeof ServiceInfo> = {
  title: 'features/services/ServiceInfo',
  component: ServiceInfo,
};

export default meta;
type Story = StoryObj<typeof ServiceInfo>;

export const Default: Story = {
  args: {
    title: 'Professional Mixing & Mastering',
    isPro: true,
    provider: {
      providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
      providerName: 'Audio Engineer Pro',
      location: 'Lagos, Nigeria',
    },
    rating: 4.9,
    reviewCount: 127,
    completedOrders: 342,
    responseTime: '2h',
    onContact: () => console.log('Contact pressed'),
  },
};

export const WithoutPro: Story = {
  args: {
    title: 'Basic Recording Service',
    isPro: false,
    provider: {
      providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
      providerName: 'Studio Master',
      location: 'Dakar, Senegal',
    },
    rating: 4.5,
    reviewCount: 45,
    completedOrders: 120,
    responseTime: '4h',
  },
};
