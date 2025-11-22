import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceReviewsSection } from './ServiceReviewsSection';

const meta: Meta<typeof ServiceReviewsSection> = {
  title: 'features/services/ServiceReviewsSection',
  component: ServiceReviewsSection,
};

export default meta;
type Story = StoryObj<typeof ServiceReviewsSection>;

const mockReviews = [
  {
    id: '1',
    userName: 'KofiBeats',
    userImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    rating: 5,
    date: 'Il y a 2 jours',
    comment: "Excellent travail ! Mon beat sonne incroyable après le mastering. Très professionnel et à l'écoute.",
  },
  {
    id: '2',
    userName: 'NaijaVibes',
    userImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Rapide, efficace, résultat au top. Je recommande vivement pour vos projets Afrobeat.',
  },
];

export const Default: Story = {
  args: {
    reviews: mockReviews,
    onSeeAll: () => console.log('See all pressed'),
  },
};

export const WithoutSeeAll: Story = {
  args: {
    reviews: mockReviews,
  },
};
