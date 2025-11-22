import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { RatingList } from './RatingList';
import { RatingData } from '../hooks/useRatings';

const meta: Meta<typeof RatingList> = {
  title: 'Features/Ratings/RatingList',
  component: RatingList,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    ratings: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof RatingList>;

const mockRatings: RatingData[] = [
  {
    id: '1',
    buyer: { name: 'Utilisateur 1', avatar_url: 'https://i.pravatar.cc/150?u=1' },
    buyerId: 'buyer1',
    transactionId: 'tx1',
    product: { title: 'Afrobeat Masterpiece' },
    productId: 'prod1',
    sellerId: 'seller1',
    rating: 5,
    comment: 'Excellent produit, je recommande vivement !',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'visible',
  },
  {
    id: '2',
    buyer: { name: 'Utilisateur 2', avatar_url: 'https://i.pravatar.cc/150?u=2' },
    buyerId: 'buyer2',
    transactionId: 'tx2',
    product: { title: 'Trap Anthem Kit' },
    productId: 'prod2',
    sellerId: 'seller2',
    rating: 4,
    comment: 'Bonne qualité, mais pourrait être amélioré.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'visible',
  },
  {
    id: '3',
    buyer: { name: 'Artiste Anonyme' }, // Pas d'avatar_url
    buyerId: 'buyer3',
    transactionId: 'tx3',
    product: { title: 'Sample Pack Vol. 3' },
    productId: 'prod3',
    sellerId: 'seller3',
    rating: 3,
    comment: 'Pas mal.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'flagged',
  },
];

export const Default: Story = {
  args: {
    ratings: mockRatings,
  },
};

export const Empty: Story = {
  args: {
    ratings: [],
  },
};
