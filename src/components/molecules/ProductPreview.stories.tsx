import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductPreview } from './ProductPreview';

const meta: Meta<typeof ProductPreview> = {
  title: 'Molecules/ProductPreview',
  component: ProductPreview,
  parameters: {
    docs: {
      description: {
        component: 'Aperçu de produit avec informations complètes et actions.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    price: {
      control: { type: 'number' },
    },
    creator: {
      control: { type: 'object' },
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    isBoosted: {
      control: { type: 'boolean' },
    },
    onPress: {
      action: 'onPress',
    },
    onPlayPreview: {
      action: 'onPlayPreview',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductPreview>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Afrobeat Instrumental',
    price: 15000,
    currency: 'FCFA',
    creator: {
      name: 'Beatmaker Pro',
      avatarUri: 'https://via.placeholder.com/100',
      rating: 4.5,
      isVerified: true,
    },
    tags: ['Afrobeat', 'Instrumental'],
    genre: 'Afrobeat',
    bpm: 120,
    license: 'Standard',
    previewUri: 'https://example.com/preview.mp3',
    isBoosted: false,
    rating: 4.2,
    onPress: () => console.log('Product pressed'),
    onPlayPreview: () => console.log('Play preview'),
  },
};

export const Boosted: Story = {
  args: {
    id: '2',
    title: 'Trap Beat Premium',
    price: 25000,
    currency: 'FCFA',
    creator: {
      name: 'Studio Master',
      avatarUri: 'https://via.placeholder.com/100',
      rating: 4.8,
      isVerified: true,
    },
    tags: ['Trap', 'Premium'],
    genre: 'Trap',
    bpm: 140,
    license: 'Exclusive',
    previewUri: 'https://example.com/preview.mp3',
    isBoosted: true,
    rating: 4.7,
    onPress: () => console.log('Product pressed'),
    onPlayPreview: () => console.log('Play preview'),
  },
};

export const Service: Story = {
  args: {
    id: '3',
    title: 'Service de Mixage',
    price: 50000,
    currency: 'FCFA',
    creator: {
      name: 'Audio Engineer',
      avatarUri: 'https://via.placeholder.com/100',
      rating: 4.9,
      isVerified: true,
    },
    tags: ['Service', 'Mixage'],
    genre: 'Service',
    license: 'Standard',
    isBoosted: false,
    rating: 4.8,
    onPress: () => console.log('Service pressed'),
  },
};

export const LowRating: Story = {
  args: {
    id: '4',
    title: 'Beat Basique',
    price: 5000,
    currency: 'FCFA',
    creator: {
      name: 'Débutant',
      avatarUri: 'https://via.placeholder.com/100',
      rating: 2.1,
      isVerified: false,
    },
    tags: ['Basique'],
    genre: 'Hip-Hop',
    bpm: 90,
    license: 'Standard',
    isBoosted: false,
    rating: 2.3,
    onPress: () => console.log('Product pressed'),
  },
};

export const NoPreview: Story = {
  args: {
    id: '5',
    title: 'Sample Pack',
    price: 10000,
    currency: 'FCFA',
    creator: {
      name: 'Sample Creator',
      avatarUri: 'https://via.placeholder.com/100',
      rating: 3.5,
      isVerified: false,
    },
    tags: ['Samples', 'Pack'],
    genre: 'Various',
    license: 'Standard',
    isBoosted: false,
    rating: 3.2,
    onPress: () => console.log('Product pressed'),
  },
};
