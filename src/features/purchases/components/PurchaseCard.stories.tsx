import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseCard } from './PurchaseCard';

const meta: Meta<typeof PurchaseCard> = {
  title: 'Features/Purchases/PurchaseCard',
  component: PurchaseCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onDownload: { action: 'onDownload' },
    onViewContract: { action: 'onViewContract' },
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseCard>;

export const Basic: Story = {
  args: {
    id: 'p1',
    type: 'beat',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Basic',
    purchaseDate: '2024-11-01',
    price: 15000,
    downloaded: false,
    hasReview: false,
    // Actions handled by argTypes
  },
};

export const Premium: Story = {
  args: {
    id: 'p2',
    type: 'beat',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Premium',
    purchaseDate: '2024-11-01',
    price: 49000,
    downloaded: true,
    hasReview: true,
    // Actions handled by argTypes
  },
};

export const Exclusive: Story = {
  args: {
    id: 'p3',
    type: 'beat',
    title: 'Summer Dreams',
    artist: 'Melodic Soul',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Exclusive',
    purchaseDate: '2024-10-15',
    price: 299000,
    downloaded: true,
    hasReview: false,
    // Actions handled by argTypes
  },
};

export const Kit: Story = {
  args: {
    id: 'p4',
    type: 'kit',
    title: 'Afro Percussion Kit',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    license: 'Basic',
    purchaseDate: '2024-10-28',
    price: 15000,
    downloaded: false,
    hasReview: false,
    // Actions handled by argTypes
  },
};
