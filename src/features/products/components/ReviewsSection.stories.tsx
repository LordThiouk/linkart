import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ReviewsSection } from './ReviewsSection';

const reviews = [
  {
    id: '1',
    user: 'MC Flow',
    userImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    rating: 5,
    date: '2 jours',
    comment: 'Beat incroyable ! La qualité est top et les 808s claquent vraiment. Parfait pour mon projet.',
    helpful: 12,
  },
  {
    id: '2',
    user: 'RapArtist',
    userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    rating: 4,
    date: '5 jours',
    comment: "Très bon beat, l'ambiance est vraiment sombre comme décrit. Juste un peu répétitif.",
    helpful: 8,
  },
  {
    id: '3',
    user: 'ProducerX',
    userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    rating: 5,
    date: '1 semaine',
    comment: 'Production de qualité professionnelle. Le mastering est impeccable.',
    helpful: 15,
  },
];

const meta: Meta<typeof ReviewsSection> = {
  title: 'Features/Products/ReviewsSection',
  component: ReviewsSection,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 800 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewsSection>;

export const Default: Story = {
  args: {
    rating: 4.8,
    reviewCount: 87,
    reviews,
    hasPurchased: false,
    onSeeAll: () => console.log('See all pressed'),
    onAddReview: () => console.log('Add review pressed'),
    onHelpful: id => console.log('Helpful pressed:', id),
    onReply: id => console.log('Reply pressed:', id),
  },
};

export const Purchased: Story = {
  args: {
    rating: 4.8,
    reviewCount: 87,
    reviews,
    hasPurchased: true,
    onSeeAll: () => console.log('See all pressed'),
    onAddReview: () => console.log('Add review pressed'),
    onHelpful: id => console.log('Helpful pressed:', id),
    onReply: id => console.log('Reply pressed:', id),
  },
};

export const EmptyReviews: Story = {
  args: {
    rating: 0,
    reviewCount: 0,
    reviews: [],
    hasPurchased: false,
    onAddReview: () => console.log('Add review pressed'),
  },
};
