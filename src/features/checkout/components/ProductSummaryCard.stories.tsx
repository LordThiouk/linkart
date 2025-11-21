import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductSummaryCard } from './ProductSummaryCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ProductSummaryCard> = {
  title: 'Features/Checkout/ProductSummaryCard',
  component: ProductSummaryCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ProductSummaryCard>;

export const Default: Story = {
  args: {
    productTitle: 'Midnight Vibes',
    artistName: 'KofiBeats',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: {
      name: 'Premium License',
      price: 45000,
      features: ['Distribution illimitée', 'Usage commercial', 'Lease exclusif 1 an', 'Stems inclus'],
    },
  },
};

export const BasicLicense: Story = {
  args: {
    productTitle: 'Summer Dreams',
    artistName: 'NaijaVibes',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    license: {
      name: 'Basic License',
      price: 25000,
      features: ['Usage non-commercial', 'Distribution limitée', 'Pas de stems'],
    },
  },
};
